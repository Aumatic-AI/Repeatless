import Image from "next/image";

type PaymentBadgesProps = {
  className?: string;
};

export default function PaymentBadges({ className = "" }: PaymentBadgesProps) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-sm ring-1 ring-black/5 ${className}`}
    >
      <Image
        src="/images/paymentlogos.png"
        alt="UPI, Visa, Mastercard, RuPay accepted · PCI compliant"
        width={422}
        height={24}
        className="h-3.5 w-auto"
      />
    </div>
  );
}
