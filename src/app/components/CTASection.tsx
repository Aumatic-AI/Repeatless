"use client";

import { useState } from "react";
import { FiArrowUpRight, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function CTASection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      company: formData.get("company"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-paper py-24 sm:py-32"
    >
      {/* Ambient accents */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-sky/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* LEFT — CTA COPY */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-sky">
              Let&apos;s talk
            </p>

            <h2
              className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Ready to stop doing work{" "}
              <span className="text-sky">AI should handle?</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
              Tell us what&apos;s slowing your team down. We&apos;ll figure out
              what can be automated first — no pitch, no commitment.
            </p>

            <div className="mt-8 flex flex-wrap gap-5">
              <a
                href="https://calendly.com/chandannetha/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-medium text-ink transition-colors hover:text-sky"
              >
                Book a strategy call
                <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="https://wa.me/919849884501"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-slate transition-colors hover:text-ink"
              >
                <FaWhatsapp className="h-4 w-4 text-sky" />
                WhatsApp us
              </a>
            </div>
          </motion.div>

          {/* RIGHT — CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl border border-black/5 bg-white/70 p-6 shadow-[0_20px_60px_-30px_rgba(8,18,26,0.25)] backdrop-blur-sm sm:p-8"
          >
            <div className="mb-7">
              <h3 className="font-display text-2xl font-semibold text-ink">
                Start a conversation
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate">
                Fill this out and we&apos;ll get back to you shortly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-ink"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-black/10 bg-paper px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate/60 focus:border-sky focus:ring-2 focus:ring-sky/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-ink"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-black/10 bg-paper px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate/60 focus:border-sky focus:ring-2 focus:ring-sky/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  Company
                  <span className="ml-1 font-normal text-slate">(optional)</span>
                </label>

                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your company"
                  className="w-full rounded-xl border border-black/10 bg-paper px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate/60 focus:border-sky focus:ring-2 focus:ring-sky/10"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-ink"
                >
                  What can we help automate?
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us a little about the repetitive work your team is dealing with..."
                  className="w-full resize-none rounded-xl border border-black/10 bg-paper px-4 py-3 text-sm leading-relaxed text-ink outline-none transition placeholder:text-slate/60 focus:border-sky focus:ring-2 focus:ring-sky/10"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-3.5 font-medium text-white shadow-[0_16px_34px_-16px_rgba(8,18,26,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-skydeep disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? (
                  "Sending..."
                ) : (
                  <>
                    Send message
                    <FiSend className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              {status === "success" && (
                <p className="text-center text-sm font-medium text-emerald-600">
                  Thanks! Your message has been sent.
                </p>
              )}

              {status === "error" && (
                <p className="text-center text-sm font-medium text-red-500">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 