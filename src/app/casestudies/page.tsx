"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import CTASection from "./components/CTA";
import { blogs } from "../../../public/data/blogs";
import CaseStudyVisual from "../components/CaseStudyVisual";

const PER_PAGE = 6;

export default function Page() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return blogs;
    return blogs.filter((b) =>
      [b.title, b.category, b.excerpt].some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const current = filtered.slice(start, start + PER_PAGE);

  return (
    <div className="bg-paper">
      <div className="mx-auto w-full max-w-6xl px-6 pb-20 pt-36">
        {/* Heading + search */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-sky">Case studies</p>
            <h1
              className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Every system we&apos;ve shipped.
            </h1>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              value={query}
              onChange={(e) => {
                setPage(1);
                setQuery(e.target.value);
              }}
              placeholder="Search"
              aria-label="Search case studies"
              className="w-full rounded-xl border border-ink/15 bg-surface py-2.5 pl-10 pr-3 text-sm text-ink placeholder:text-slate2 focus:border-sky focus:outline-none"
            />
            <FiSearch className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate2" aria-hidden />
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {current.map((b) => (
            <Link
              href={`/casestudies/${b.slug}`}
              key={b.slug}
              className="group block overflow-hidden rounded-none border border-ink/10 bg-surface shadow-[0_20px_50px_-32px_rgba(8,18,26,0.4)] transition-all duration-300 hover:-translate-y-1 hover:border-sky/40"
            >
              <CaseStudyVisual
                image={b.image}
                solution={b.hero.meta.solution}
                stat={b.hero.meta.stat}
                className="h-48 w-full"
              />
              <div className="p-5">
                <div className="eyebrow text-slate2">
                  {b.category} ·{" "}
                  {new Date(b.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="mt-2.5 font-display text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-sky">
                  {b.title}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-slate">{b.excerpt}</div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-slate">
            Nothing matches &ldquo;{query}&rdquo; — try another term.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-xl border border-ink/15 bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-sky/50 disabled:opacity-40"
              disabled={safePage === 1}
            >
              Prev
            </button>
            <span className="text-sm text-slate2">
              Page {safePage} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="rounded-xl border border-ink/15 bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-sky/50 disabled:opacity-40"
              disabled={safePage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <CTASection />
    </div>
  );
}
