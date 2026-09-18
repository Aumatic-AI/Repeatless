import Image from "next/image";

type PaymentBadgesProps = {
  className?: string;
  src?: string;
  priority?: boolean;
};

export default function PaymentBadges({
  className = "",
  src = "/images/paylogo.webp",
  priority = false,
}: PaymentBadgesProps) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Image
        src={src}
        alt="UPI, Visa, Mastercard, RuPay accepted · PCI compliant"
        width={480}
        height={160}
        priority={priority}
        className="h-20 w-auto"
      />
    </div>
  );
}