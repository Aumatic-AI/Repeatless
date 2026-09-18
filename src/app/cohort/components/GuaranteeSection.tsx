import Reveal from "@/Components/Reveal";

export default function GuaranteeSection() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">

        {/* Heading */}
        <Reveal
          as="h2"
          amount={0.5}
          y={30}
          duration={0.6}
          className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-5xl"
        >
          <span className="relative inline-block">
            Zero Risk.
            <Reveal
              as="span"
              variant="scalex"
              amount={0.6}
              delay={0.4}
              duration={0.5}
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-[6px] w-full origin-left bg-lime"
            />
          </span>
          <br />
          Here&apos;s Our Promise to You.
        </Reveal>

        {/* Paragraph */}
        <Reveal
          as="p"
          amount={0.4}
          y={30}
          duration={0.6}
          delay={0.15}
          className="mt-8 max-w-2xl text-center text-lg leading-relaxed text-slate sm:text-xl"
        >
          If you complete the cohort, follow the exact strategy, and don&apos;t
          make your first ₹1L,{" "}
          <span className="rounded bg-lime px-1.5 py-0.5 font-semibold text-ink">
            we refund every rupee.
          </span>{" "}
          No questions, no arguments.
        </Reveal>
      </div>
    </section>
  );
}
