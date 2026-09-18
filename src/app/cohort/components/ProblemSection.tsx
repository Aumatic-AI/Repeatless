import Image from "next/image";
import Reveal from "@/Components/Reveal";

const problems = [
  "You've seen 100+ reels of people flashing \"AI income\" screenshots but every time you try to start, you don't know what to actually do",
  "You've tried learning AI tools on YouTube ChatGPT, automation tools, AI agents but it's scattered, random, with no clear path to actual money",
  "Your job or college life doesn't pay enough, and every side hustle you've tried trading, dropshipping, blogging either needs capital you don't have or takes months to show any result",
  "You see people selling \"AI chatbot services\" online and think \"isn't this saturated already? Everyone's doing the same thing\"",
  "You assume AI automation is \"for coders and tech people\" so you talk yourself out of it before even trying",
  "You've bought courses before that overpromised and underdelivered generic content, no real support, no refund when it didn't work",
  "Every AI course you find online is built for a global/English-speaking audience nothing made for Telugu people, in a way that actually makes sense to you",
  "Meanwhile, time keeps passing another month, another \"I'll start next month\" and the gap between you and the people already earning keeps growing",
];

export default function ProblemSection() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-5 lg:gap-12">

          {/* Left: Cohort Image */}
          <Reveal as="div" amount={0.4} className="relative lg:col-span-2 lg:sticky lg:top-28">
            {/* Offset lime backdrop echoes the image's own path color and keeps
                the dark illustration from reading as a flat cutout on bg-paper. */}
            <div aria-hidden="true" className="absolute -bottom-4 -right-4 h-full w-full rounded-2xl bg-lime" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-ink/10 bg-surface2">
              <Image
                src="/images/marketing/cohort.webp"
                alt="AI automation cohort"
                fill
                sizes="(min-width: 1024px) 420px, calc(100vw - 3rem)"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Right: Problems */}
          <div className="lg:col-span-3">
            <Reveal
              as="h2"
              amount={0.4}
              className="font-display text-[50px] font-semibold leading-tight tracking-tight text-ink"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Tired of Watching Others Make Money With AI While You&apos;re
              Stuck Scrolling?
            </Reveal>

            <Reveal as="ul" variant="group" amount={0.15} y={12} duration={0.4} className="mt-12 flex flex-col gap-5">
              {problems.map((item, i) => (
                <li
                  key={item}
                  className="reveal-item flex items-start gap-3"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-sm bg-lime" />

                  <p className="text-lg leading-relaxed text-slate">
                    {item}
                  </p>
                </li>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Closer */}
        <Reveal
          as="p"
          amount={0.4}
          className="mx-auto mt-12 max-w-2xl border-t-2 border-sky pt-5 text-center text-lg font-medium leading-relaxed text-ink"
        >
          The problem isn&apos;t AI. The problem is nobody&apos;s shown you the
          exact, simple path built for a complete beginner, with zero risk if
          it doesn&apos;t work.
        </Reveal>
      </div>
    </section>
  );
}
