import Image from "next/image";

type PaymentBadgesProps = {
  className?: string;
  src?: string;
};

export default function PaymentBadges({
  className = "",
  src = "/images/paylogo.png",
}: PaymentBadgesProps) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Image
        src={src}
        alt="UPI, Visa, Mastercard, RuPay accepted · PCI compliant"
        width={866}
        height={288}
        className="h-20 w-auto"
      />
    </div>
  );
}