import { FiCheck } from "react-icons/fi";
import Reveal from "@/Components/Reveal";

const discoveries = [
  "The #1 mistake beginners make when picking a niche and why it's killing their chances before they even start",
  "The exact type of AI automation businesses are paying ₹10K-₹50K+ for right now most people don't even know this exists",
  "A live demo watch a real automation get built in real-time",
  "The simple script I use to get replies from cold outreach most people get ignored because of this one mistake",
  "How to land your first paying client without any coding or technical background",
];

export default function DiscoverSection() {
  return (
    <section className="bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal
          as="h2"
          amount={0.4}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          What You&apos;ll Discover on This Live Training
        </Reveal>

        <Reveal as="ul" amount={0.3} className="mt-8 flex flex-col gap-4">
          {discoveries.map((d) => (
            <li key={d} className="flex items-start gap-3 text-lg leading-relaxed text-white/70">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime">
                <FiCheck className="h-3 w-3 text-ink" />
              </span>
              {d}
            </li>
          ))}
        </Reveal>

        <Reveal as="p" amount={0.4} className="mt-8 font-display text-xl italic text-white/80">
          This isn&apos;t a sales pitch disguised as a webinar it&apos;s a real, live breakdown of
          the system.
        </Reveal>
      </div>
    </section>
  );
}
