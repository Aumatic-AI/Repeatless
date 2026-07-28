"use client";

import { motion, Variants } from "framer-motion";
import CaseStudyAbstract from "../../components/CaseStudyAbstract";

type HeroProps = {
  title: string;
  description: string;
  meta: { solution: string; stat: string };
  video?: string;
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function BlogHero({ title, description, meta, video }: HeroProps) {
  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8 px-6 pt-16 sm:gap-12 sm:pt-20 lg:pt-24">
      {/* Title + Description */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex w-full flex-col gap-4 sm:gap-6"
      >
        <h1
          className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          {title}
        </h1>

        <p className="max-w-3xl text-base leading-relaxed text-slate sm:text-lg lg:text-xl">
          {description}
        </p>

        {/* Meta info — what we built, what it returned */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="eyebrow text-sky">{meta.solution}</span>
          <div className="h-1.5 w-1.5 rounded-full bg-ink/20" aria-hidden />
          <span className="eyebrow text-skydeep">{meta.stat}</span>
        </div>
      </motion.div>

      {/* Media: prefer video if provided, else image */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="h-[220px] w-full overflow-hidden rounded-2xl border border-ink/10 bg-[#0B0E1A] shadow-[0_34px_70px_-34px_rgba(8,18,26,0.5)] sm:h-[350px] lg:h-[510px]"
      >
        {typeof video === "string" && video.length > 0 ? (
          video.includes("youtube.com") || video.includes("youtu.be") ? (
            <iframe
              src={
                video.includes("embed")
                  ? video
                  : video.includes("watch?v=")
                  ? video.replace("watch?v=", "embed/")
                  : video.replace("youtu.be/", "www.youtube.com/embed/")
              }
              title="Hero Video"
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <video src={video} className="h-full w-full object-cover" controls />
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center p-8">
            <CaseStudyAbstract solution={meta.solution} active className="h-full w-full" />
          </div>
        )}
      </motion.div>
    </section>
  );
}
