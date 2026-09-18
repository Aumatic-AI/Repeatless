import Reveal from "@/Components/Reveal";

const bonuses = [
  {
    title: "Bonus 1: Done-For-You Automation Templates",
    desc: "Pre-built, cloneable workflows (sweet shop + one more niche) just customize and deploy, no starting from scratch",
    value: "₹5,000",
  },
  {
    title: "Bonus 2: Outreach & DM Script Vault",
    desc: "Ready-to-use cold outreach, follow-up, and referral request scripts just personalize and send",
    value: "₹3,000",
  },
  {
    title: "Bonus 3: Reel Content Prompt Pack",
    desc: "AI prompts for generating reel ideas + scripts for IG/LinkedIn, tailored to your niche",
    value: "₹2,000",
  },
  {
    title: "Bonus 4: Private Community Access",
    desc: "Lifetime access to peer community lead-sharing, doubt-solving, accountability",
    value: "₹5,000",
  },
  {
    title: "Bonus 5: Proposal & Pricing Template",
    desc: "Ready-made client proposal + pricing sheet send professional quotes from Day 1",
    value: "₹2,000",
  },
  {
    title: "Bonus 6: Mid-Level Course Discount",
    desc: "Exclusive discounted access to our advanced automation course once you hit your first ₹1L",
    value: "₹10,000",
  },
];

export default function BonusesSection() {
  return (
    <section className="bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal
          as="h2"
          amount={0.4}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
        >
          Bonuses
        </Reveal>

        <Reveal as="div" amount={0.2} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {bonuses.map((b) => (
            <div key={b.title} className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="font-display text-lg font-semibold text-white">{b.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">{b.desc}</p>
              <p className="mt-4 font-monoui text-xs uppercase tracking-wide text-lime">
                Value: {b.value}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal as="p" amount={0.4} className="mt-10 text-center font-display text-xl italic text-lime">
          Total Bonus Value: ₹27,000 Free with your enrollment
        </Reveal>
      </div>
    </section>
  );
}
