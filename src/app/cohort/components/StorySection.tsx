import Reveal from "@/Components/Reveal";

const story = [
  "When AI started replacing jobs, I decided to learn it and replace my own paycheck first.",
  "I learned automation on nights and weekends. No shortcuts.",
  "When I saw I could build something worth more than my salary, I quit.",
  "Today I run an AI automation agency in Hyderabad with a team of 5.",
  "I went from taking orders to giving work to others.",
  "When my parents went for my marriage proposal, they said \"my son runs his own business,\" not \"he has a job.\" That one line was worth more than any invoice.",
];

const missed = [
  "Even after I could build, I was stuck selling small projects.",
  "My income only moved when I changed my niche, my offer and how I sold.",
  "Not when I learned another tool.",
];

export default function StorySection() {
  return (
    <section className="bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal
          as="h2"
          amount={0.4}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          I&apos;m not a guru. I&apos;m a freelancer who made the same jump you&apos;re about to make.
        </Reveal>

        <div className="mt-10 border-l-2 border-lime pl-6 sm:pl-8">
          {/* Lede — the hook, set apart from the rest of the story */}
          <Reveal
            as="p"
            amount={0.4}
            className="font-display text-2xl font-medium leading-snug text-white sm:text-3xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            I was earning ₹70,000/month in a stable job.
          </Reveal>

          {/* Kept simple: no bullets, numbers or badges — this is a narrative,
              read top to bottom, not a list to scan. */}
          <Reveal as="div" variant="group" amount={0.2} y={14} duration={0.5} className="mt-8 flex flex-col gap-5">
            {story.map((s, i) => (
              <p
                key={s}
                className="reveal-item text-lg leading-relaxed text-white/70"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                {s}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal as="div" amount={0.3} className="mt-10">
          <h3 className="font-display text-2xl font-semibold text-white">
            The part most freelancers miss:
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            {missed.map((m) => (
              <li key={m} className="flex items-start gap-3 text-lg leading-relaxed text-white/70">
                <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-sm bg-lime" />
                {m}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="p" amount={0.4} className="mt-8 font-display text-xl italic text-white/80">
          This cohort is that path, shortened. It&apos;s what I did to go from project
          fees to retainers, so you don&apos;t need the years I took.
        </Reveal>
      </div>
    </section>
  );
}
