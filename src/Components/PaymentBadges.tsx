type PaymentBadgesProps = {
  className?: string;
};

function UpiMark() {
  return (
    <svg viewBox="0 0 52 24" className="h-5 w-auto" role="img" aria-label="UPI">
      <text
        x="0"
        y="18"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight={800}
        fontStyle="italic"
        fontSize="19"
        letterSpacing="-0.5"
        fill="#1F2937"
      >
        UPI
      </text>
      <path d="M42 5 L49 12 L42 19 Z" fill="#F16522" />
      <path d="M40 8 L45.5 12 L40 16 Z" fill="#0B7A3E" />
    </svg>
  );
}

function VisaMark() {
  return (
    <svg viewBox="0 0 46 24" className="h-5 w-auto" role="img" aria-label="Visa">
      <text
        x="0"
        y="18"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontWeight={800}
        fontStyle="italic"
        fontSize="20"
        letterSpacing="-0.5"
        fill="#1A1F71"
      >
        VISA
      </text>
    </svg>
  );
}

function MastercardMark() {
  return (
    <svg viewBox="0 0 40 24" className="h-6 w-auto" role="img" aria-label="Mastercard">
      <defs>
        <clipPath id="mc-left">
          <circle cx="15" cy="12" r="10" />
        </clipPath>
        <clipPath id="mc-right">
          <circle cx="25" cy="12" r="10" />
        </clipPath>
      </defs>
      <circle cx="15" cy="12" r="10" fill="#EB001B" />
      <circle cx="25" cy="12" r="10" fill="#F79E1B" />
      <g clipPath="url(#mc-left)">
        <rect x="0" y="0" width="40" height="24" fill="#FF5F00" clipPath="url(#mc-right)" />
      </g>
    </svg>
  );
}

function RuPayMark() {
  return (
    <svg viewBox="0 0 62 24" className="h-5 w-auto" role="img" aria-label="RuPay">
      <text
        x="0"
        y="18"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight={800}
        fontStyle="italic"
        fontSize="18"
        letterSpacing="-0.3"
        fill="#0B7A3E"
      >
        Ru
      </text>
      <text
        x="22"
        y="18"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight={800}
        fontStyle="italic"
        fontSize="18"
        letterSpacing="-0.3"
        fill="#F16522"
      >
        Pay
      </text>
      <path d="M52 5 L59 12 L52 19 Z" fill="#F16522" />
      <path d="M50 8 L55.5 12 L50 16 Z" fill="#0B7A3E" />
    </svg>
  );
}

function PciBadge() {
  return (
    <div className="flex items-center gap-1.5 rounded-md border border-ink/10 bg-surface2 px-2.5 py-1">
      <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" role="img" aria-hidden="true">
        <path
          d="M10 1.5 17 4.5V9c0 5-3 8.2-7 9.5C6 17.2 3 14 3 9V4.5Z"
          fill="none"
          stroke="#0284C7"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M6.7 10 9 12.3 13.3 8"
          fill="none"
          stroke="#0284C7"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[11px] font-semibold leading-none text-slate2">
        PCI
        <br />
        compliant
      </span>
    </div>
  );
}

export default function PaymentBadges({ className = "" }: PaymentBadgesProps) {
  return (
    <div
      className={`inline-flex flex-wrap items-center justify-center gap-5 rounded-xl bg-white px-5 py-3 shadow-sm ring-1 ring-black/5 sm:gap-6 ${className}`}
    >
      <UpiMark />
      <VisaMark />
      <MastercardMark />
      <RuPayMark />
      <PciBadge />
    </div>
  );
}
