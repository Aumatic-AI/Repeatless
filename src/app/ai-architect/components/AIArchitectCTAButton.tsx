"use client";

const PAYMENT_LINK = "https://rzp.io/rzp/d5ZXxLM";

type AIArchitectCTAButtonProps = {
  label: string;
  className?: string;
};

export default function AIArchitectCTAButton({ label, className = "" }: AIArchitectCTAButtonProps) {
  return (
    <a
      href={PAYMENT_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-sky px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-skydeep active:scale-[0.97] ${className}`}
    >
      {label}
    </a>
  );
}
