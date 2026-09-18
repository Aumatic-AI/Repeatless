import Reveal from "@/Components/Reveal";

const steps = [
  {
    num: "01",
    label: "Niche",
    text: "We fix your niche first before you build anything. Because if you're solving a problem nobody's paying for, no automation will save you.",
  },
  {
    num: "02",
    label: "Build",
    text: "Then, we teach you how to build one simple workflow not 10 tools, not complex AI agents, just one automation that actually solves a business's pain point.",
  },
  {
    num: "03",
    label: "Sell",
    text: "Finally, we show you how to land your first paying client using content, outreach, and free demos that convert, not cold pitches into the void.",
  },
];

const frameworkWords = ["Niche.", "Build.", "Sell."];

export default function FrameworkSection() {
  return (
    <section className="bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal
          as="h2"
          amount={0.4}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          The Cohort That Takes You From Zero to Your First ₹1L
        </Reveal>

        <Reveal
          as="p"
          amount={0.4}
          className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-white/70"
        >
          A 48-day, beginner-first cohort teaching you to build and sell AI automation services
          with a{" "}
          <span className="font-semibold text-lime">100% money-back guarantee</span>{" "}
          if you don&apos;t hit ₹1L
        </Reveal>

        {/* Cards rise one after another instead of all at once. */}
        <Reveal
          as="div"
          variant="group"
          amount={0.2}
          y={28}
          duration={0.55}
          className="mt-14 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-3"
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="reveal-item flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-7 transition-colors duration-300 hover:border-lime/40"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="flex items-center gap-3">
                <span className="font-monoui text-sm text-lime">{step.num}</span>
                <h3 className="font-display text-xl font-semibold text-white">{step.label}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/70">{step.text}</p>
            </div>
          ))}
        </Reveal>

        <Reveal
          as="div"
          amount={0.4}
          className="mx-auto mt-16 flex max-w-2xl flex-col items-center gap-2 text-center"
        >
          <div className="h-px w-16 bg-white/15" />

          {/* Each word of the closing tagline pops in on its own beat. */}
          <Reveal
            as="p"
            variant="group"
            amount={0.6}
            scale={0.7}
            duration={0.45}
            className="mt-6 flex gap-3 font-display text-2xl font-semibold text-lime sm:text-3xl"
          >
            {frameworkWords.map((w, i) => (
              <span key={w} className="reveal-item-scale" style={{ transitionDelay: `${100 + i * 150}ms` }}>
                {w}
              </span>
            ))}
          </Reveal>
          <p className="text-white/60">That&apos;s the framework.</p>
          <p className="text-white/60">Not theory. Not tutorials. Not guesswork.</p>
        </Reveal>
      </div>
    </section>
  );
}
