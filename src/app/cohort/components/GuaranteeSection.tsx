import Reveal from "@/Components/Reveal";

const steps = [
  "Join the cohort and complete the program requirements",
  "Follow the system for 60 days: send outreach messages, do sales calls, submit your work for review",
  "If you haven't made your first ₹1L in that time, email us with proof of your work",
  "We refund 100%, no questions, no hassle",
];

export default function GuaranteeSection() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal
          as="h2"
          amount={0.5}
          y={30}
          duration={0.6}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Land your first ₹1L in 60 days, or get{" "}
          <span className="relative inline-block">
            100% of your money back.
            <Reveal
              as="span"
              variant="scalex"
              amount={0.6}
              delay={0.4}
              duration={0.5}
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-[6px] w-full origin-left bg-lime"
            />
          </span>
        </Reveal>

        <Reveal
          as="p"
          amount={0.4}
          y={30}
          duration={0.6}
          delay={0.15}
          className="mt-6 text-center text-lg leading-relaxed text-slate sm:text-xl"
        >
          You take the action. We take the risk.
        </Reveal>

        <Reveal
          as="ol"
          variant="group"
          amount={0.15}
          y={12}
          duration={0.4}
          className="mt-12 flex flex-col gap-4"
        >
          {steps.map((step, i) => (
            <li
              key={step}
              className="reveal-item flex items-start gap-4 rounded-2xl border border-ink/10 bg-surface p-5"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime font-monoui text-sm font-semibold text-ink">
                {i + 1}
              </span>
              <p className="pt-0.5 text-lg leading-relaxed text-slate">{step}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
