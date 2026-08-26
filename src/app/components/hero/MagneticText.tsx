"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  hoverText?: string;
  className?: string;
  textClassName?: string;
  hoverTextClassName?: string;
  /** Diameter of the reveal. Always a true circle — width and height match. */
  circleSize?: number;
};

export function MagneticText({
  text,
  hoverText = "EXPLORE",
  className = "",
  textClassName = "",
  hoverTextClassName = "",
  circleSize = 164,
}: Props) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const circleRef = useRef<HTMLSpanElement>(null);
  const innerTextRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      setContainerSize({
        width: container.offsetWidth,
        height: container.offsetHeight,
      });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      currentPos.current.x = lerp(
        currentPos.current.x,
        mousePos.current.x,
        0.15
      );

      currentPos.current.y = lerp(
        currentPos.current.y,
        mousePos.current.y,
        0.15
      );

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%)`;
      }

      if (innerTextRef.current) {
        innerTextRef.current.style.transform = `translate(${-currentPos.current.x}px, ${-currentPos.current.y}px)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      mousePos.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    },
    []
  );

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLSpanElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      const next = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };

      mousePos.current = next;
      currentPos.current = next;

      setIsHovered(true);
    },
    []
  );

  return (
    <span
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex cursor-none select-none items-center justify-center ${className}`}
    >
      {/* Normal text */}
      <span className={`relative z-0 ${textClassName}`}>
        {text}
      </span>

      {/* Magnetic reveal circle */}
      <span
        ref={circleRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 overflow-hidden rounded-full bg-ink"
        style={{
          width: isHovered ? circleSize : 0,
          height: isHovered ? circleSize : 0,
          transition:
            "width 0.5s cubic-bezier(0.33, 1, 0.68, 1), height 0.5s cubic-bezier(0.33, 1, 0.68, 1)",
          willChange: "transform, width, height",
        }}
      >
        <span
          ref={innerTextRef}
          className="absolute flex items-center justify-center"
          style={{
            width: containerSize.width,
            height: containerSize.height,
            left: "50%",
            top: "50%",
            willChange: "transform",
          }}
        >
          {/* Hover text */}
          <span
            className={`whitespace-nowrap ${hoverTextClassName}`}
          >
            {hoverText}
          </span>
        </span>
      </span>
    </span>
  );
}