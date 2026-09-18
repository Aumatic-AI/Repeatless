import Reveal from "@/Components/Reveal";

const skills = [
  <>
    It wasn&apos;t &quot;learning AI&quot; in general it was one specific, sellable skill:{" "}
    <span className="font-semibold text-ink">AI Automation as a Service</span>
  </>,
  <>
    Not prompt tricks. Not content creation. A real service businesses pay ₹10,000–₹50,000+ for
    because it saves them time and money daily
  </>,
  <>
    The market isn&apos;t saturated the approach is. Everyone sells the same chatbot to the same
    2-3 niches
  </>,
  <>
    The real opportunity is in thousands of untouched niches sweet shops, clinics, gyms, local
    businesses nobody&apos;s automating for them yet
  </>,
  <>
    This is exactly what I do in my agency every day and exactly what I&apos;ll teach you, step by
    step, from zero to your first ₹1L in 48 days
  </>,
];

export default function SkillSection() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal
          as="h2"
          amount={0.4}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          The One Skill That Changed My Life
        </Reveal>

        <Reveal as="div" amount={0.3} className="mt-10 rounded-2xl border border-ink/10 bg-surface p-8 sm:p-10">
          <Reveal
            as="ul"
            variant="group"
            amount={0.2}
            y={12}
            duration={0.4}
            className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2"
          >
            {skills.map((content, i) => (
              <li key={i} className="reveal-item flex items-start gap-3" style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-sm bg-lime" />
                <p className="text-base leading-relaxed text-slate">{content}</p>
              </li>
            ))}
          </Reveal>
        </Reveal>

        <Reveal as="p" amount={0.4} className="mt-8 border-l-2 border-sky pl-5 text-lg font-medium leading-relaxed text-ink">
          This is why I built this cohort the exact system I use, shortened into 48 days, so you
          don&apos;t take years to figure it out like I did.
        </Reveal>
      </div>
    </section>
  );
}
