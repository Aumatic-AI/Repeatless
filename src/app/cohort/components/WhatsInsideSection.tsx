import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import Reveal from "@/Components/Reveal";

const heading = "What You Will Learn".split(" ");

export default function WhatsInsideSection() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        {/* Each word of the heading pops in on its own beat instead of the whole
            line fading up together. */}
        <Reveal
          as="h2"
          variant="group"
          amount={0.4}
          y={18}
          duration={0.45}
          className="flex flex-wrap justify-center gap-x-3 font-display text-4xl font-semibold leading-tight tracking-tight text-ink sm:text-6xl"
        >
          {heading.map((w, i) => (
            <span key={i} className="reveal-item" style={{ transitionDelay: `${i * 80}ms` }}>
              {w}
            </span>
          ))}
        </Reveal>

        <Reveal
          as="p"
          amount={0.4}
          className="mx-auto mt-6 max-w-2xl text-xl font-medium leading-relaxed sm:text-2xl"
        >
          Become an{" "}
          <span className="relative inline-block whitespace-nowrap text-ink">
            AI Architect
            <Reveal
              as="span"
              variant="scalex"
              amount={0.6}
              delay={0.35}
              duration={0.5}
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-[6px] w-full origin-left bg-lime"
            />
          </span>{" "}
          Not Another Automation Freelancer
        </Reveal>

        <Reveal as="div" amount={0.4} className="mt-8">
          <Link
            href="/ai-architect"
            className="group inline-flex items-center gap-1.5 rounded-xl bg-lime px-6 py-3.5 font-medium text-ink transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
          >
            See the 6-Module Breakdown
            <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
