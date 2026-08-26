"use client";

type Props = {
  color: "white" | "green" | "black";
  outline?: boolean;
};

const COLORS = {
  white: "#FFFFFF",
  green: "#00D084",
  black: "#0A0A0A",
};

const logoMask = {
  maskImage: "url('/images/logoSmall.svg')",
  WebkitMaskImage: "url('/images/logoSmall.svg')",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
  maskSize: "contain",
  WebkitMaskSize: "contain",
};

export default function HeroIntroLogo({
  color,
  outline = false,
}: Props) {
  const logoColor = COLORS[color];

  return (
    <div className="relative h-28 w-28 sm:h-28 sm:w-28 md:h-32 md:w-32">
      {/* Outline */}
      {outline && (
        <div
          className="absolute inset-[-4px]"
          style={{
            ...logoMask,
            backgroundColor: logoColor,
            opacity: 0.8,
          }}
        />
      )}

      {/* Main logo */}
      <div
        className="absolute inset-0"
        style={{
          ...logoMask,
          backgroundColor: logoColor,
        }}
      />
    </div>
  );
}