import ReserveSeatButton from "./ReserveSeatButton";
import PaymentBadges from "@/Components/PaymentBadges";
import Reveal from "@/Components/Reveal";

export default function FinalCTASection() {
  return (
    <section className="bg-ink py-20 text-white sm:py-28">
      <Reveal as="div" amount={0.4} className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <PaymentBadges />
        <ReserveSeatButton />
        <p className="text-sm text-white/60">September 27, 2026</p>
      </Reveal>
    </section>
  );
}
