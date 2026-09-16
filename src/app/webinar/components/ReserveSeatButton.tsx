"use client";

import { FiArrowUpRight } from "react-icons/fi";

type ReserveSeatButtonProps = {
  className?: string;
};

export default function ReserveSeatButton({ className = "" }: ReserveSeatButtonProps) {
  return (
    <a
      href="https://rzp.io/rzp/aW1o6Sp"
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-sky px-7 py-4 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-skydeep active:scale-[0.97] ${className}`}
    >
      Reserve My Seat for ₹99
      <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
