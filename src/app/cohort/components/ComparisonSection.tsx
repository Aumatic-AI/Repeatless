import { FiCheck, FiX } from "react-icons/fi";
import Reveal from "@/Components/Reveal";

const rows = [
  {
    them: "Same generic chatbots for same 3 niches",
    us: "Unsaturated niches, custom workflows",
  },
  {
    them: "₹2K-5K commoditized bots",
    us: "₹30K-1L+ high-value automations",
  },
  {
    them: "Taught by tutorial guys, never sold it themselves",
    us: "Taught by me actively running an agency",
  },
  {
    them: "English course, translated for Telugu audience",
    us: "Built Telugu-first, from scratch",
  },
  {
    them: "No real accountability, just recorded videos",
    us: "Live & Pre-record cohort + weekly accountability calls",
  },
  {
    them: "Vague promises, no refund",
    us: "100% money-back guarantee if you don't hit ₹1L",
  },
];

export default function ComparisonSection() {
  return (
    <section className="bg-ink py-16 text-white sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <Reveal
          as="h2"
          amount={0.4}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
        >
          Why Different From Others
        </Reveal>

        {/* Desktop Table */}
        <Reveal
          as="div"
          amount={0.3}
          className="mt-10 hidden overflow-hidden rounded-2xl border border-white/10 md:block"
        >
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10">
                <th className="w-1/2 px-6 py-5 font-monoui text-[11px] uppercase tracking-wide text-white/50 lg:px-8">
                  What Others Do
                </th>

                <th className="w-1/2 border-l border-white/10 px-6 py-5 font-monoui text-[11px] uppercase tracking-wide text-lime lg:px-8">
                  What We Do
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.them}
                  className="border-b border-white/10 last:border-b-0"
                >
                  <td className="px-6 py-5 align-top text-sm leading-relaxed text-white/50 lg:px-8 lg:text-base">
                    <span className="flex items-start gap-3">
                      <FiX className="mt-0.5 h-4 w-4 shrink-0 text-white/30" />
                      <span>{row.them}</span>
                    </span>
                  </td>

                  <td className="border-l border-white/10 px-6 py-5 align-top text-sm leading-relaxed text-white/85 lg:px-8 lg:text-base">
                    <span className="flex items-start gap-3">
                      <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                      <span>{row.us}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Mobile Cards */}
        <Reveal as="div" amount={0.2} className="mt-8 flex flex-col gap-4 md:hidden">
          {rows.map((row) => (
            <div
              key={row.them}
              className="overflow-hidden rounded-2xl border border-white/10"
            >
              {/* Others */}
              <div className="border-b border-white/10 px-5 py-4">
                <p className="mb-2 font-monoui text-[10px] uppercase tracking-wide text-white/40">
                  What Others Do
                </p>

                <div className="flex items-start gap-3">
                  <FiX className="mt-0.5 h-4 w-4 shrink-0 text-white/30" />

                  <p className="text-sm leading-relaxed text-white/50">
                    {row.them}
                  </p>
                </div>
              </div>

              {/* Us */}
              <div className="bg-white/[0.02] px-5 py-4">
                <p className="mb-2 font-monoui text-[10px] uppercase tracking-wide text-lime">
                  What We Do
                </p>

                <div className="flex items-start gap-3">
                  <FiCheck className="mt-0.5 h-4 w-4 shrink-0 text-lime" />

                  <p className="text-sm leading-relaxed text-white/90">
                    {row.us}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
