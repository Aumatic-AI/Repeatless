"use client";

import {
  useEffect,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Database,
  MessageSquare,
  Mic2,
  Send,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

type Props = {
  scrollProgress: MotionValue<number>;
};

type CardProps = {
  children: ReactNode;
  className?: string;
  style?: Record<string, unknown>;
  delay?: number;
};

function FloatingCard({
  children,
  className = "",
  style,
  delay = 0,
}: CardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.86,
        y: 30,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={style}
      className={[
        "absolute",
        "rounded-[16px]",
        "border border-white/[0.12]",
        "bg-[#0d0d0d]",
        "shadow-[0_20px_55px_-30px_rgba(0,0,0,0.9)]",
        "will-change-transform",
        className,
      ].join(" ")}
    >
      {children}
    </motion.div>
  );
}

function CardHeader({
  icon,
  title,
  subtitle,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#CAFB00]/30 bg-[#CAFB00]/[0.07] text-[#CAFB00]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#CAFB00]">
          {title}
        </p>

        <p className="mt-0.5 text-[9px] leading-relaxed text-white/45">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function MiniBars() {
  return (
    <div className="mt-3 flex h-10 items-end gap-1">
      {[35, 50, 42, 72, 58, 88, 66, 100, 76, 92, 62, 82].map(
        (height, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{
              duration: 0.7,
              delay: 0.8 + index * 0.035,
              ease: "easeOut",
            }}
            className="flex-1 rounded-t-sm bg-[#CAFB00]/50"
          />
        ),
      )}
    </div>
  );
}

function MiniChart() {
  return (
    <div className="relative mt-3 h-12 overflow-hidden rounded-lg border border-white/[0.07] bg-black/40">
      <div className="absolute inset-x-2 top-1/2 h-px bg-white/[0.06]" />
      <div className="absolute inset-x-2 top-1/4 h-px bg-white/[0.04]" />
      <div className="absolute inset-x-2 top-3/4 h-px bg-white/[0.04]" />

      <svg
        viewBox="0 0 300 80"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0 63 C25 57 35 60 55 50 C75 40 82 53 100 42 C120 30 135 45 151 35 C170 24 180 37 197 26 C215 14 230 30 247 18 C267 6 280 18 300 5"
          fill="none"
          stroke="#CAFB00"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.8,
            delay: 0.5,
            ease: "easeOut",
          }}
        />
      </svg>
    </div>
  );
}

function MiniWorkflow() {
  return (
    <div className="mt-3 flex items-center gap-1">
      {[
        <Users key="users" size={11} />,
        <Bot key="bot" size={11} />,
        <Database key="database" size={11} />,
      ].map((icon, index) => (
        <div key={index} className="flex items-center">
          <div className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/[0.035] text-white/55">
            {icon}
          </div>

          {index < 2 && (
            <div className="mx-1 h-px w-3 bg-[#CAFB00]/30" />
          )}
        </div>
      ))}
    </div>
  );
}

function MiniWaveform() {
  const heights = [
    20,
    34,
    48,
    28,
    62,
    38,
    74,
    48,
    92,
    58,
    42,
    76,
    55,
    88,
    40,
    68,
    32,
    80,
    52,
    94,
    42,
    66,
    30,
    72,
    44,
    82,
    36,
    60,
    28,
    50,
    70,
    38,
    58,
    32,
    46,
    24,
  ];

  return (
    <div className="mt-3 flex h-8 items-center justify-center gap-[2px]">
      {heights.map((height, index) => (
        <motion.div
          key={index}
          initial={{ height: 2 }}
          animate={{
            height: height * 0.72,
          }}
          transition={{
            duration: 0.6,
            delay: 0.5 + index * 0.015,
          }}
          className="w-[1.5px] rounded-full bg-[#CAFB00]/65"
        />
      ))}
    </div>
  );
}

export default function HeroNetworkScene({
  scrollProgress,
}: Props) {
  const reduce = useReducedMotion() ?? false;

  /*
   * --------------------------------------------------------
   * POINTER PARALLAX
   * --------------------------------------------------------
   */

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 65,
    damping: 24,
    mass: 0.5,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 65,
    damping: 24,
    mass: 0.5,
  });

  useEffect(() => {
    if (reduce) return;

    const handlePointer = (event: PointerEvent) => {
      pointerX.set(
        (event.clientX / window.innerWidth - 0.5) * 2,
      );

      pointerY.set(
        (event.clientY / window.innerHeight - 0.5) * 2,
      );
    };

    window.addEventListener(
      "pointermove",
      handlePointer,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointer,
      );
    };
  }, [pointerX, pointerY, reduce]);

  /*
   * --------------------------------------------------------
   * SCROLL
   * --------------------------------------------------------
   */

  const sceneOpacity = useTransform(
    scrollProgress,
    [0, 0.58, 0.9],
    [1, 0.9, 0],
  );

  const sceneScale = useTransform(
    scrollProgress,
    [0, 1],
    [1, reduce ? 1 : 1.08],
  );

  const topLeftX = useTransform(
    scrollProgress,
    [0, 1],
    [0, reduce ? 0 : -85],
  );

  const topLeftY = useTransform(
    scrollProgress,
    [0, 1],
    [0, reduce ? 0 : -55],
  );

  const topLeftRotate = useTransform(
    scrollProgress,
    [0, 1],
    [-7, reduce ? -7 : -14],
  );

  const rightX = useTransform(
    scrollProgress,
    [0, 1],
    [0, reduce ? 0 : 125],
  );

  const rightY = useTransform(
    scrollProgress,
    [0, 1],
    [0, reduce ? 0 : 25],
  );

  const rightRotate = useTransform(
    scrollProgress,
    [0, 1],
    [8, reduce ? 8 : 16],
  );

  const topRightX = useTransform(
    scrollProgress,
    [0, 1],
    [0, reduce ? 0 : 90],
  );

  const topRightY = useTransform(
    scrollProgress,
    [0, 1],
    [0, reduce ? 0 : -45],
  );

  const topRightRotate = useTransform(
    scrollProgress,
    [0, 1],
    [6, reduce ? 6 : 13],
  );

  const leftX = useTransform(
    scrollProgress,
    [0, 1],
    [0, reduce ? 0 : -120],
  );

  const leftY = useTransform(
    scrollProgress,
    [0, 1],
    [0, reduce ? 0 : 30],
  );

  const leftRotate = useTransform(
    scrollProgress,
    [0, 1],
    [-8, reduce ? -8 : -16],
  );

  const bottomLeftX = useTransform(
    scrollProgress,
    [0, 1],
    [0, reduce ? 0 : -80],
  );

  const bottomLeftY = useTransform(
    scrollProgress,
    [0, 1],
    [0, reduce ? 0 : 70],
  );

  const bottomLeftRotate = useTransform(
    scrollProgress,
    [0, 1],
    [5, reduce ? 5 : 12],
  );

  const bottomRightX = useTransform(
    scrollProgress,
    [0, 1],
    [0, reduce ? 0 : 85],
  );

  const bottomRightY = useTransform(
    scrollProgress,
    [0, 1],
    [0, reduce ? 0 : 70],
  );

  const bottomRightRotate = useTransform(
    scrollProgress,
    [0, 1],
    [-5, reduce ? -5 : -12],
  );

  /*
   * --------------------------------------------------------
   * MOUSE PARALLAX PER CARD
   * --------------------------------------------------------
   */

  const tlParallaxX = useTransform(
    smoothX,
    [-1, 1],
    [reduce ? 0 : -14, reduce ? 0 : 14],
  );

  const tlParallaxY = useTransform(
    smoothY,
    [-1, 1],
    [reduce ? 0 : -10, reduce ? 0 : 10],
  );

  const trParallaxX = useTransform(
    smoothX,
    [-1, 1],
    [reduce ? 0 : -20, reduce ? 0 : 20],
  );

  const trParallaxY = useTransform(
    smoothY,
    [-1, 1],
    [reduce ? 0 : -14, reduce ? 0 : 14],
  );

  const leftParallaxX = useTransform(
    smoothX,
    [-1, 1],
    [reduce ? 0 : -12, reduce ? 0 : 12],
  );

  const rightParallaxX = useTransform(
    smoothX,
    [-1, 1],
    [reduce ? 0 : -16, reduce ? 0 : 16],
  );

  const bottomParallaxY = useTransform(
    smoothY,
    [-1, 1],
    [reduce ? 0 : -12, reduce ? 0 : 12],
  );

  return (
    <motion.div
      aria-hidden
      style={{
        opacity: sceneOpacity,
        scale: sceneScale,
      }}
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        hidden
        overflow-hidden
        lg:block
      "
    >
      {/* TOP LEFT — LEAD CAPTURE */}

      <FloatingCard
        delay={0.15}
        style={{
          x: useTransform(
            [topLeftX, tlParallaxX],
            ([scrollX, mouseX]) =>
              (scrollX as number) +
              (mouseX as number),
          ),
          y: useTransform(
            [topLeftY, tlParallaxY],
            ([scrollY, mouseY]) =>
              (scrollY as number) +
              (mouseY as number),
          ),
          rotate: topLeftRotate,
        }}
        className="
          left-[4%]
          top-[14%]
          w-[140px]
          p-2
          xl:left-[7%]
          xl:w-[155px]
        "
      >
        <CardHeader
          icon={<Users size={13} />}
          title="Lead capture"
          subtitle="Smart forms. Instant routing. More conversions."
        />

        <div className="mt-3 flex items-center justify-center">
          <div className="relative flex h-16 w-full items-center justify-center">
            {[
              "left-[15%] top-[20%]",
              "left-[42%] top-[5%]",
              "left-[68%] top-[28%]",
              "left-[30%] bottom-[5%]",
              "right-[8%] bottom-[8%]",
            ].map((position, index) => (
              <motion.div
                key={index}
                animate={
                  reduce
                    ? undefined
                    : {
                        y: [0, -3, 0],
                      }
                }
                transition={{
                  duration: 3 + index * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`absolute ${position} flex h-5 w-5 items-center justify-center rounded-full border border-[#CAFB00]/30 bg-black text-[#CAFB00]`}
              >
                <Users size={8} />
              </motion.div>
            ))}

            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#CAFB00]/50 bg-[#CAFB00]/10 text-[#CAFB00]">
              <Bot size={12} />
            </div>
          </div>
        </div>
      </FloatingCard>

      {/* RIGHT — AI OUTREACH */}

      <FloatingCard
        delay={0.25}
        style={{
          x: useTransform(
            [rightX, rightParallaxX],
            ([scrollX, mouseX]) =>
              (scrollX as number) +
              (mouseX as number),
          ),
          y: rightY,
          rotate: rightRotate,
        }}
        className="
          right-[1%]
          top-[43%]
          w-[130px]
          p-2
          xl:right-[4%]
          xl:w-[145px]
        "
      >
        <CardHeader
          icon={<Send size={13} />}
          title="AI outreach"
          subtitle="Personalized at scale. Replies that convert."
        />

        <MiniBars />

        <div className="mt-2 flex items-center justify-between text-[7px] uppercase tracking-[0.1em] text-white/30">
          <span>Messages</span>
          <span className="text-[#CAFB00]">
            +42.8%
          </span>
        </div>
      </FloatingCard>

      {/* TOP RIGHT — CRM */}

      <FloatingCard
        delay={0.35}
        style={{
          x: useTransform(
            [topRightX, trParallaxX],
            ([scrollX, mouseX]) =>
              (scrollX as number) +
              (mouseX as number),
          ),
          y: useTransform(
            [topRightY, trParallaxY],
            ([scrollY, mouseY]) =>
              (scrollY as number) +
              (mouseY as number),
          ),
          rotate: topRightRotate,
        }}
        className="
          right-[4%]
          top-[14%]
          w-[140px]
          p-2
          xl:right-[7%]
          xl:w-[155px]
        "
      >
        <CardHeader
          icon={<Database size={13} />}
          title="CRM sync"
          subtitle="Every lead. Every interaction. Always in sync."
        />

        <MiniChart />

        <div className="mt-2 flex items-center gap-1 text-[7px] uppercase tracking-[0.1em] text-white/30">
          <span className="h-1 w-1 rounded-full bg-[#CAFB00]" />
          Live pipeline
        </div>
      </FloatingCard>

      {/* LEFT — VOICE AI */}

      <FloatingCard
        delay={0.45}
        style={{
          x: useTransform(
            [leftX, leftParallaxX],
            ([scrollX, mouseX]) =>
              (scrollX as number) +
              (mouseX as number),
          ),
          y: leftY,
          rotate: leftRotate,
        }}
        className="
          left-[1%]
          top-[43%]
          w-[130px]
          p-2
          xl:left-[4%]
          xl:w-[145px]
        "
      >
        <CardHeader
          icon={<Mic2 size={13} />}
          title="Voice AI"
          subtitle="Calls handled. Appointments booked."
        />

        <MiniWaveform />

        <div className="mt-2 flex items-center justify-between">
          <span className="text-[7px] uppercase tracking-[0.1em] text-white/30">
            Call active
          </span>

          <span className="flex items-center gap-1 text-[7px] uppercase tracking-[0.1em] text-[#CAFB00]">
            <span className="h-1 w-1 animate-pulse rounded-full bg-[#CAFB00]" />
            Live
          </span>
        </div>
      </FloatingCard>

      {/* BOTTOM LEFT — WORKFLOWS */}

      <FloatingCard
        delay={0.65}
        style={{
          x: bottomLeftX,
          y: useTransform(
            [bottomLeftY, bottomParallaxY],
            ([scrollY, mouseY]) =>
              (scrollY as number) +
              (mouseY as number),
          ),
          rotate: bottomLeftRotate,
        }}
        className="
          bottom-[5%]
          left-[10%]
          w-[140px]
          p-2
          xl:left-[17%]
          xl:w-[150px]
        "
      >
        <CardHeader
          icon={<Workflow size={13} />}
          title="Workflows"
          subtitle="Automate complex systems. Scale effortlessly."
        />

        <MiniWorkflow />

        <div className="mt-2 flex items-center gap-1 text-[7px] uppercase tracking-[0.1em] text-white/30">
          <Sparkles
            size={8}
            className="text-[#CAFB00]"
          />
          14 processes automated
        </div>
      </FloatingCard>

      {/* BOTTOM RIGHT — ANALYTICS */}

      <FloatingCard
        delay={0.75}
        style={{
          x: bottomRightX,
          y: useTransform(
            [bottomRightY, bottomParallaxY],
            ([scrollY, mouseY]) =>
              (scrollY as number) +
              (mouseY as number),
          ),
          rotate: bottomRightRotate,
        }}
        className="
          bottom-[5%]
          right-[10%]
          w-[140px]
          p-2
          xl:right-[17%]
          xl:w-[150px]
        "
      >
        <CardHeader
          icon={<BarChart3 size={13} />}
          title="Analytics"
          subtitle="Real-time insights. Smarter decisions."
        />

        <MiniChart />

        <div className="mt-2 flex items-center justify-between text-[7px] uppercase tracking-[0.1em] text-white/30">
          <span>Pipeline</span>

          <span className="text-[#CAFB00]">
            +31.4%
          </span>
        </div>
      </FloatingCard>

      {/* SMALL FLOATING LABEL — LEFT */}

      <motion.div
        style={{
          x: useTransform(
            smoothX,
            [-1, 1],
            [
              reduce ? 0 : -8,
              reduce ? 0 : 8,
            ],
          ),
          y: useTransform(
            smoothY,
            [-1, 1],
            [
              reduce ? 0 : -6,
              reduce ? 0 : 6,
            ],
          ),
        }}
        className="
          absolute
          left-[25%]
          top-[36%]
          hidden
          items-center
          gap-1.5
          rounded-full
          border border-white/10
          bg-[#0d0d0d]
          px-2
          py-1
          text-[7px]
          uppercase
          tracking-[0.12em]
          text-white/40
          xl:flex
        "
      >
        <MessageSquare
          size={9}
          className="text-[#CAFB00]"
        />
        Lead qualified
      </motion.div>

      {/* SMALL FLOATING LABEL — RIGHT */}

      <motion.div
        style={{
          x: useTransform(
            smoothX,
            [-1, 1],
            [
              reduce ? 0 : -10,
              reduce ? 0 : 10,
            ],
          ),
          y: useTransform(
            smoothY,
            [-1, 1],
            [
              reduce ? 0 : -8,
              reduce ? 0 : 8,
            ],
          ),
        }}
        className="
          absolute
          right-[24%]
          top-[35%]
          hidden
          items-center
          gap-1.5
          rounded-full
          border border-white/10
          bg-[#0d0d0d]
          px-2
          py-1
          text-[7px]
          uppercase
          tracking-[0.12em]
          text-white/40
          xl:flex
        "
      >
        <ArrowUpRight
          size={9}
          className="text-[#CAFB00]"
        />
        Pipeline synced
      </motion.div>

      {/* CENTER ACCENT */}

      <motion.div
        style={{
          opacity: useTransform(
            scrollProgress,
            [0, 0.4],
            [0.45, 0],
          ),
          scale: useTransform(
            scrollProgress,
            [0, 0.4],
            [1, 0.8],
          ),
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-px
          w-20
          -translate-x-1/2
          bg-[#CAFB00]/20
        "
      />
    </motion.div>
  );
}