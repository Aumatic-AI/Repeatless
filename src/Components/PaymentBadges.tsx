import Image from "next/image";

type PaymentBadgesProps = {
  className?: string;
  src?: string;
  bgClassName?: string;
};

export default function PaymentBadges({
  className = "",
  src = "/images/paylogo.png",
  bgClassName = "bg-ink/90 backdrop-blur-sm",
}: PaymentBadgesProps) {
  return (
    <div
      className={`-mb-5 inline-flex items-center justify-center px-7 py-5 ${bgClassName} ${className}`}
    >
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
