import Reveal from "@/Components/Reveal";
import CohortCTAButton from "./CohortCTAButton";

const modules = [
  {
    title: "Foundation (Offer + Niche Selection)",
    bullets: [
      'Why "I sell voice bots" isn\'t an offer at all — it\'s a commodity, and it\'s quietly capping your income',
      "Pick one high-budget niche and build a real offer around it — setup fee + retainer, structured to scale to ₹1-2L+/month",
    ],
  },
  {
    title: "Positioning",
    bullets: [
      "The one shift that stops you from being compared to every other bot-seller on the market",
      'Reposition your brand, portfolio, and profile from "freelancer" to "AI architect" — infrastructure, not gadgets',
    ],
  },
  {
    title: "Architecture (Full Structure)",
    bullets: [
      "The step most builders skip before touching a single tool — and it's why their systems break under real use",
      "The complete 8-step build process from problem discovery to deployment, so every project runs on a blueprint, not guesswork",
    ],
  },
  {
    title: "Outbound",
    bullets: [
      'The messaging mistake that makes you sound like every other "I do AI automation" DM in their inbox',
      "A LinkedIn + cold outreach system built around your new positioning — designed to build a pipeline, not chase referrals",
    ],
  },
  {
    title: "Conversion",
    bullets: [
      "The moment on a call where clients decide you're worth the retainer — most people miss it completely",
      "How to demonstrate infrastructure value instead of pitching features, plus how to handle the objections killing your deals",
    ],
  },
  {
    title: "Scale",
    bullets: [
      "The pricing mistake that keeps skilled builders stuck charging project fees instead of retainers",
      "The exact close conversation, proposal structure, and path from your first client to scaling — before this shift saturates",
    ],
  },
];

export default function ModulesSection() {
  return (
    <section className="bg-surface2 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal
          as="h2"
          amount={0.4}
          className="mx-auto max-w-3xl text-center font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl"
        >
          Six modules. One path from ₹15k gigs to ₹1L retainers.
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2">
          {modules.map((m, i) => (
            <Reveal
              key={m.title}
              as="div"
              amount={0.15}
              className="rounded-2xl border border-ink/10 bg-surface p-5 sm:p-7"
            >
              <p className="font-monoui text-[11px] uppercase tracking-wide text-sky">
                Module {i + 1}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">
                {m.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {m.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm leading-relaxed text-slate sm:text-base"
                  >
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal as="div" amount={0.4} className="mt-10 flex flex-col items-center text-center sm:mt-12">
          <CohortCTAButton label="Join the cohort now" />
          <p className="mt-4 text-sm text-slate2">
            Instant access · Lifetime updates · 100% refund guarantee
          </p>
        </Reveal>
      </div>
    </section>
  );
}
