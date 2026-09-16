import Image from "next/image";

type PaymentBadgesProps = {
  className?: string;
};

export default function PaymentBadges({ className = "" }: PaymentBadgesProps) {
  return (
    <div
      className={`-mb-5 inline-flex items-center justify-center bg-ink/90 px-7 py-5 backdrop-blur-sm ${className}`}
    >
      <Image
        src="/images/paylogo.png"
        alt="UPI, Visa, Mastercard, RuPay accepted · PCI compliant"
        width={866}
        height={288}
        className="h-20 w-auto"
      />
    </div>
  );
}
