import Image from "next/image";
import Reveal from "@/Components/Reveal";

const problems = [
  "Your work is solid, but invoices are still ₹10-20k.",
  "Every month starts at zero.",
  "You only earn when you deliver.",
  "Clients compare you to every other bot-seller.",
  "You have no niche, no premium offer, no outbound.",
  "Past courses taught tools you already know.",
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
              You can build it. So why is the income still stuck at ₹30-50k?
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
          The problem isn&apos;t your skill. It&apos;s your offer, your
          positioning and how you sell.
          <br />
          This cohort fixes that, with a 100% refund if it doesn&apos;t.
        </Reveal>
      </div>
    </section>
  );
}
