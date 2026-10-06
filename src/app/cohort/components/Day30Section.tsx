import Reveal from "@/Components/Reveal";

const outcomes = [
  "A high-budget niche and a priced offer (setup fee + retainer)",
  "A brand and portfolio that reads \"AI Architect,\" not \"freelancer\"",
  "A working multi-agent system built on a proven 8-step process",
  "A live LinkedIn outbound system starting real conversations",
  "A sales process that closes ₹1-2L/month retainers",
];

export default function Day30Section() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal
          as="h2"
          amount={0.4}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          In 30 days, you stop being a freelancer and start running an AI
          infrastructure business.
        </Reveal>

        <Reveal
          as="p"
          amount={0.4}
          className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-slate sm:text-xl"
        >
          Not more tools. A niche, an offer, a system and a sales process that
          close retainers.
        </Reveal>

        <div className="mt-12 rounded-2xl border border-ink/10 bg-surface p-6 sm:p-8">
          <h3 className="eyebrow text-ink">By day 30, you&apos;ll have:</h3>

          <Reveal
            as="ul"
            variant="group"
            amount={0.15}
            y={12}
            duration={0.4}
            className="mt-6 flex flex-col gap-4"
          >
            {outcomes.map((item, i) => (
              <li
                key={item}
                className="reveal-item flex items-start gap-3"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-sm bg-lime" />
                <p className="text-lg leading-relaxed text-slate">{item}</p>
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal
          as="p"
          amount={0.4}
          className="mx-auto mt-10 max-w-2xl border-t-2 border-sky pt-5 text-center text-lg font-medium leading-relaxed text-ink"
        >
          Same skills you have today. A completely different offer.
        </Reveal>
      </div>
    </section>
  );
}
