import { FiCheck, FiX } from "react-icons/fi";
import Reveal from "@/Components/Reveal";

const forYou = [
  "You've delivered at least one paid automation project",
  "You can build in n8n, Make or code",
  "You're stuck at ₹30-50k a month or earning in one-off gigs",
  "You're ready to niche down and reposition as an AI architect",
  "You're willing to do outbound and talk to real clients",
];

const notForYou = [
  "You're a complete beginner",
  "You've never worked with a paying client",
  "You want a get-rich-quick shortcut",
  "You don't want to do outbound or sales calls",
  "You won't pick one niche",
];

export default function WhoForSection() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal
          as="h2"
          amount={0.4}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
        >
          Who This Is For / Not For
        </Reveal>

        <Reveal as="div" amount={0.3} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-sky/30 bg-surface p-7">
            <h3 className="font-display text-xl font-semibold text-ink">This is for you if:</h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {forYou.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-skysoft">
                    <FiCheck className="h-3 w-3 text-sky" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-ink/10 bg-surface2 p-7">
            <h3 className="font-display text-xl font-semibold text-ink">This is NOT for you if:</h3>
            <ul className="mt-5 flex flex-col gap-3.5">
              {notForYou.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate2">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/10">
                    <FiX className="h-3 w-3 text-slate2" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
