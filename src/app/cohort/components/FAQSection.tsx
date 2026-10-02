"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import Reveal from "@/Components/Reveal";

type Block =
  | { t: "p"; v: string }
  | { t: "ul"; v: string[] }
  | { t: "table"; head: string[]; rows: string[][] };

type Item = { q: string; a: Block[] };
type Group = { title: string; items: Item[] };

const p = (v: string): Block => ({ t: "p", v });
const ul = (...v: string[]): Block => ({ t: "ul", v });
const table = (head: string[], rows: string[][]): Block => ({ t: "table", head, rows });

const groups: Group[] = [
  {
    title: "1. Who this course is for",
    items: [
      {
        q: "Who should join?",
        a: [
          ul(
            "Freelancers who already build chatbots, voice agents or automations and are stuck at low-priced, one-time projects.",
            "Agency owners who want to sell higher-value systems with a setup fee plus a monthly retainer.",
            "Working professionals or students who have some hands-on automation experience and want to turn it into a business.",
            "Business owners who understand automation and want to offer it as a service.",
            "People with a different skill (video editing, design, marketing, sales) who have tried automation tools and want to add AI systems to their existing work.",
          ),
        ],
      },
      {
        q: "Who is this course not for?",
        a: [
          ul(
            "Complete beginners who have never seen or built any automation.",
            "People looking for an AI engineering, machine learning or LLM fine-tuning course. We do not teach model training or fine-tuning.",
            "People looking for a job placement or a certificate.",
            "People who expect income without doing outreach and talking to clients every day.",
            "People joining only because of the refund guarantee. Join to learn the skill.",
          ),
        ],
      },
      {
        q: "I am a complete beginner. Can I join?",
        a: [
          p(
            "We do not recommend it. The course moves fast from niche and offer into building systems and getting clients. If you have never built a single automation, you will spend the 60 days just learning tools and will not reach the client-getting part. Learn the basics of one automation tool (n8n, Make or Zapier), build two or three small automations for yourself, then join.",
          ),
        ],
      },
      {
        q: "How do I know if I have enough knowledge?",
        a: [
          p("You are ready if most of these are true:"),
          ul(
            "You know what a trigger, an action and a workflow are.",
            "You have built at least one simple automation yourself, even by following a tutorial (for example, form submission to Google Sheet to email).",
            "You have used an AI tool like ChatGPT or Claude for real work.",
            "You are comfortable connecting apps like Gmail, Google Sheets, WhatsApp or a CRM.",
            "You can follow a technical video and repeat the steps on your own laptop.",
          ),
          p("If you tick fewer than three, build your basics first."),
        ],
      },
      {
        q: "Is this an LLM fine-tuning or machine learning course?",
        a: [
          p(
            "No. This is an agency-building course. You learn how to design AI systems (architecture), build them, create client documents, find clients through outreach, run sales calls and close deals. If your goal is an AI engineering job, this is not the right fit.",
          ),
        ],
      },
    ],
  },
  {
    title: "2. About the course",
    items: [
      {
        q: "What exactly is AI Architect Cohort?",
        a: [
          p(
            'A 60-day program that teaches you to build an AI automation agency. You pick one profitable niche, design and build a system that niche pays for, create professional client documents, and learn the exact outreach and sales process to land clients. You move from selling tools ("I build chatbots") to owning an outcome ("I recover missed-call revenue for dental clinics").',
          ),
        ],
      },
      {
        q: "What is the complete syllabus?",
        a: [
          p("Six modules, each ending with an assignment that you submit for personal feedback."),
          table(
            ["Module", "What you learn", "What you walk away with"],
            [
              [
                "01 Foundation",
                "Why selling tools keeps you at ₹30–50K projects, the 3-filter niche selection system, the offer formula, setup + retainer pricing",
                "One locked niche and one priced offer statement (Capstone One-Pager)",
              ],
              [
                "02 Positioning",
                "Offer vs positioning, the Feature → Outcome → Number formula, profile and content prompts",
                "Optimised LinkedIn and Instagram profiles, a Facebook Groups system, your first published posts",
              ],
              [
                "03 Architecture",
                "Turning a client requirement into a system design, the 8-stage AI Architect Blueprint, a real Customer Support Agent walkthrough, building with Claude Code and n8n",
                "A client-ready Architecture Document and a working system for your niche",
              ],
              [
                "04 Outbound",
                "Inbound, outbound, ads and referral lead sources, finding prospects, the DM framework (offer, mechanism, case study)",
                "A daily outreach system that books calls",
              ],
              [
                "05 Conversion",
                "Qualifying leads before the call, sales calls, pricing, proposals and closing",
                "Your sales call process and proposal template",
              ],
              [
                "06 Scale",
                "Moving beyond 1-on-1 delivery, templating systems, when to bring in help",
                "A plan to grow from your first client to many",
              ],
            ],
          ),
          p(
            "All the content is available as soon as you join. The course is updated every month with new material that helps the community, and every update is included in your access.",
          ),
        ],
      },
      {
        q: "Bonus: n8n Mastery Course",
        a: [p("A complete n8n course from beginner to advanced level is included free with the cohort.")],
      },
      {
        q: "Is it live or recorded?",
        a: [p("The course lessons are recorded, so you can learn at your own pace. On top of that, there is a 30-minute live class every 2 weeks.")],
      },
      { q: "How long do I get access?", a: [p("Lifetime access, including all future updates.")] },
      {
        q: "How long does it take to finish?",
        a: [
          p(
            "The program runs for 60 days. Each module has a deadline for its assignment. We recommend 1–2 hours a day for learning, plus time for daily outreach once you reach that module.",
          ),
        ],
      },
      { q: "What language is it taught in?", a: [p("Telugu, with English terms for tools and business concepts.")] },
      {
        q: "Can I do this alongside a full-time job or college?",
        a: [
          p(
            "Yes. Lessons are recorded, and live class timings are fixed after checking students' availability. You need 1–2 hours a day and the discipline to submit assignments on time.",
          ),
        ],
      },
      { q: "What if I miss a live class?", a: [p("Every live class is recorded and the recording is added to the course.")] },
      {
        q: "Can I see a demo or sample lesson before joining?",
        a: [p("There is no demo. To understand the course modules and how we teach, join our free webinar.")],
      },
      {
        q: "Do I get a certificate?",
        a: [p("No. There is no certificate. Your real proof is the system you build and the clients you land.")],
      },
      {
        q: "How is the course different from the free webinar?",
        a: [
          p(
            "The webinar gives a brief overview of the course and explains a few topics, roughly 1% of what the cohort covers. The course gives you the complete system, assignments with feedback, live classes and the community.",
          ),
        ],
      },
      {
        q: "Who teaches the course?",
        a: [p("All recorded lessons are taught by Chandan. The bi-weekly live classes are taken by Chandan or the team.")],
      },
      {
        q: "When can I join?",
        a: [p("Students are onboarded in cohorts. When you enroll, you are added to the current cohort.")],
      },
      {
        q: "Are all modules available at once?",
        a: [
          p(
            "Yes. All the content is already in the course when you join, so you can start immediately and move at your own pace within the 60 days.",
          ),
        ],
      },
      {
        q: "Where do I watch the course?",
        a: [
          p(
            "On our website. A mobile app is coming to the app store, and we will announce it in the community when it is live.",
          ),
        ],
      },
      {
        q: "Can I share my login or transfer my seat?",
        a: [p("No. Your access is personal. Seats cannot be transferred to another person.")],
      },
      {
        q: "Is the course only in Telugu?",
        a: [p("Yes. The course is made for the Telugu audience.")],
      },
      {
        q: "Does the course cover business setup like GST registration, contracts or invoicing?",
        a: [
          p(
            "No. The course focuses on building systems, positioning, outreach, sales and scaling. Business registration and legal setup are not covered.",
          ),
        ],
      },
    ],
  },
  {
    title: "3. Prerequisites and setup",
    items: [
      {
        q: "What are the prerequisites?",
        a: [
          ul(
            "Basic understanding of automations: triggers, actions, workflows (see the self-check in section 1).",
            "At least one automation built by you, even a simple one.",
            "Regular use of an AI tool like ChatGPT or Claude.",
            "Comfort with everyday business apps: Gmail, Google Sheets, WhatsApp, LinkedIn.",
            "A real interest in building an agency, including talking to clients every day.",
          ),
        ],
      },
      {
        q: "Do I need to know coding?",
        a: [
          p(
            "No. Systems are built with Claude Code, where you build by talking to it and giving prompts, and with n8n, which is a no-code tool. You do not write code by hand.",
          ),
        ],
      },
      {
        q: "Do I need a technical degree or IT background?",
        a: [
          p(
            "No. What matters is that you have already worked with automation tools and can learn new tools quickly.",
          ),
        ],
      },
      {
        q: "What setup do I need before starting?",
        a: [
          ul(
            "A decent laptop or desktop (Windows or Mac). No high-end machine is needed, but a phone is not enough for building.",
            "A stable internet connection.",
            "A paid Claude plan at $20 per month. This is required from day one.",
            "n8n: you can run it free on your own laptop (locally), or buy n8n cloud hosting or a VPS.",
            "LinkedIn and Instagram accounts.",
            "1–2 hours a day for 60 days.",
          ),
        ],
      },
      {
        q: "Are there any costs apart from the course fee?",
        a: [
          p(
            "Yes. The $20 per month Claude plan is required from day one. n8n can be run free locally; hosting or a VPS is an optional extra cost. When you work with paying clients, these tool costs can be included in your client pricing.",
          ),
        ],
      },
      {
        q: "I have some automation knowledge but I'm not confident. Will I cope?",
        a: [
          p(
            "Yes. That is exactly who the course is built for. The free n8n Mastery course (beginner to advanced) helps you strengthen your building skills alongside the main modules.",
          ),
        ],
      },
      {
        q: "I am from a different field (video editing, design, marketing). Is this useful for me?",
        a: [
          p(
            "Yes, as long as you have tried automation tools. Your existing field is an advantage: the first filter in our niche system is choosing an industry you already understand. A video editor, for example, already knows how creators and agencies work and can sell them systems for onboarding, content approvals or lead follow-up. This stacks on top of your current skill instead of replacing it.",
          ),
        ],
      },
    ],
  },
  {
    title: "4. Support, classes and community",
    items: [
      {
        q: "Are assignments reviewed individually?",
        a: [
          p(
            "Yes. Every assignment you submit gets personalised written feedback within 24 hours, telling you what is working, what is weak and exactly what to fix.",
          ),
        ],
      },
      {
        q: "How do the live classes work?",
        a: [
          p(
            "There is a 30-minute private live class every 2 weeks. Before each class, we check students' availability and fix a timing that works for the group. Every class is recorded and added to the course.",
          ),
        ],
      },
      {
        q: "Are there one-to-one calls?",
        a: [
          p(
            "No. There are no one-to-one calls. Support happens through the bi-weekly live classes, assignment feedback and the community.",
          ),
        ],
      },
      {
        q: "Is there a community?",
        a: [
          p(
            "Yes. When you join the cohort, you get access to a private community inside our course platform (LMS). You can post your questions there, reply to other members, share your progress and keep the community active.",
          ),
        ],
      },
      {
        q: "Are there community rules?",
        a: [
          p(
            "Yes. Be respectful, keep discussions relevant and do not spam or self-promote. If a member does not behave properly in the community, their access is removed.",
          ),
        ],
      },
      {
        q: "Where do I ask my doubts during the course?",
        a: [
          p(
            "Post them in the community. Other members can reply, and our team replies whenever possible. Asking in the community means everyone learns from the answer.",
          ),
        ],
      },
      {
        q: "Will you help with my client project or build the system for my client?",
        a: [
          p(
            "No. We do not work on your personal projects or your clients' projects, and we do not get involved in your private or client work. You can ask general doubts in the community, and we teach you the skills to deliver on your own.",
          ),
        ],
      },
      {
        q: "How do I contact the team?",
        a: [
          ul(
            "Community: inside the course platform.",
            "WhatsApp: +91 90325 50956 (the WhatsApp icon is on the website and in the community).",
            "Email: contact@repeatless.in",
          ),
        ],
      },
    ],
  },
  {
    title: "5. What you build and how you get clients",
    items: [
      {
        q: "Will I build a real AI system I can show clients?",
        a: [
          p(
            "Yes. In Module 3 you design a system for your chosen niche using the 8-stage AI Architect Blueprint, write a professional Architecture Document, and build it with Claude Code and n8n. That system becomes your demo and your first case study in outreach.",
          ),
        ],
      },
      {
        q: "What kind of systems will I learn to build?",
        a: [
          p(
            "Any type of system a business needs, built by prompting Claude Code and using n8n. Common examples: missed-call recovery, lead qualification, appointment booking and reminders, customer support agents, follow-up automation, and connecting business data that sits in separate tools.",
          ),
        ],
      },
      {
        q: "Which tools will I get hands-on with?",
        a: [
          table(
            ["Tool", "What you use it for"],
            [
              ["Claude Code", "Building systems by talking and giving prompts, no manual coding"],
              ["Claude (Projects)", "Designing systems, writing offers, documents, content and outreach"],
              ["n8n", "No-code automation workflows (run locally or on hosting/VPS)"],
              ["LinkedIn", "Positioning, content and outreach"],
              ["Instagram", "Positioning and content"],
              ["Facebook Groups", "Finding and engaging prospects"],
              ["Calendly", "Booking and pre-qualifying sales calls"],
            ],
          ),
        ],
      },
      {
        q: "Is client acquisition taught practically?",
        a: [
          p("Yes. It is the core of the course. You learn:"),
          ul(
            "Where leads come from: inbound, outbound, ads and referrals.",
            "How to find and shortlist prospects in your niche.",
            "The DM framework that books calls (offer, mechanism, optional case study), with a ready template.",
            "How to pre-qualify leads with booking-form questions, so you only talk to businesses that can afford you.",
            "How to run sales calls, present pricing, send proposals and close.",
          ),
        ],
      },
      {
        q: "Do you teach how to get high-ticket clients?",
        a: [
          p(
            "Yes. The whole system is built around setup fee plus monthly retainer pricing for businesses with real budgets, instead of cheap one-time gigs.",
          ),
        ],
      },
      {
        q: "Do you teach how to work with international clients?",
        a: [
          p(
            "Yes. Targeting international clients is the shift that took Chandan from ₹30–50K projects to ₹2–3L clients, and the positioning and outreach modules cover how to do it.",
          ),
        ],
      },
      {
        q: "Do you give me clients or leads?",
        a: [p("No. We teach you the system to get your own clients. You do the outreach.")],
      },
    ],
  },
  {
    title: "6. Results, guarantee and refunds",
    items: [
      {
        q: "Do you guarantee I will get high-ticket clients?",
        a: [
          p(
            "No one can honestly guarantee clients. Results depend on your niche, your daily outreach and how well you deliver. What we offer is the 60-day guarantee below, for students who do the work fully.",
          ),
        ],
      },
      {
        q: "What results are realistic?",
        a: [
          p("Most people do not charge ₹1 lakh on their first client. A typical path looks like this:"),
          table(
            ["Client", "Typical project value"],
            [
              ["1st client", "₹15,000–25,000"],
              ["2nd client", "₹45,000–50,000"],
              ["3rd client", "₹75,000–80,000"],
              ["4th or 5th client", "₹1,00,000+"],
            ],
          ),
          p("Your first clients build your case studies and confidence. Prices rise as your proof grows."),
        ],
      },
      {
        q: "The guarantee in short",
        a: [
          table(
            ["Term", "What it means"],
            [
              ["Promise", "Land ₹1,00,000 in client revenue within 60 days, or get your course fee back"],
              ["When the 60 days start", "From your purchase date"],
              [
                "What you must do",
                "Every assignment on time, 20 outreach messages a day, track replies, book calls, keep proof",
              ],
              ["What counts as revenue", "Money received in your account from new clients you landed during the 60 days"],
              ["What is refunded", "The course fee, after GST and taxes are deducted"],
              ["How to claim", "WhatsApp +91 90325 50956 within 60 days of purchase"],
              ["Review", "Our team reviews your proof within 7 days; the decision is final"],
              ["Refund timeline", "Within 30 days after approval"],
              ["After day 60", "No refund for any reason"],
            ],
          ),
          p(
            "Please don't join because of the guarantee. Join to learn the skill. The guarantee exists to protect students who execute everything properly, not to replace the work.",
          ),
        ],
      },
      {
        q: "What is the 60-day guarantee?",
        a: [
          p(
            "Implement everything we teach, exactly the way we show you, for 60 days from your purchase date: the system, the outreach, the sales calls. If you don't land your first ₹1,00,000 in client revenue within those 60 days, we refund your course fee (after GST and taxes).",
          ),
        ],
      },
      {
        q: 'What does "executed properly" mean?',
        a: [
          p("You are eligible only if you did all of these:"),
          ul(
            "Submitted every module assignment by its deadline.",
            "Sent at least 20 personalised outreach messages every day using the course DM framework, with a minimum of 200 messages in total. Outreach is done mainly on LinkedIn.",
            "Tested your messages and tracked replies to find your winning DM.",
            "Booked sales calls from your outreach.",
            "Kept proof of all of this: your outreach tracker, plus screenshots of your messages, the replies you received and the calls you booked.",
          ),
        ],
      },
      {
        q: "Is 20 messages a day on LinkedIn really possible?",
        a: [
          p(
            "Yes. 20 personalised messages a day on LinkedIn is feasible. Leads that come to you from your content (inbound) also count towards your client revenue.",
          ),
        ],
      },
      {
        q: 'What counts as "₹1,00,000 in client revenue"?',
        a: [
          ul(
            "Only money actually received in your account within the 60 days. A signed deal or a promised payment does not count until it is paid.",
            "Only revenue from new clients you landed during the 60 days. Income from clients you had before joining does not count.",
            "For a monthly retainer, only the amount paid within the 60 days counts.",
            "Payments from international clients count, converted to INR on the day you received them.",
          ),
        ],
      },
      {
        q: "How much is refunded?",
        a: [
          p(
            "The course fee, after deducting GST and taxes. Tool costs such as the Claude plan, n8n hosting or a VPS are not refunded.",
          ),
        ],
      },
      {
        q: "What happens to my access after a refund?",
        a: [p("Your access to the course, the community and the bonus n8n course is removed.")],
      },
      {
        q: "Examples: am I eligible for a refund?",
        a: [
          table(
            ["Situation", "Eligible for refund?"],
            [
              ["Did everything properly, booked calls, closed no deals", "Yes"],
              ["Did everything properly, earned ₹40,000 from new clients", "Yes"],
              ["Did everything properly, earned ₹1,00,000 or more", "No, the guarantee is met"],
              ["Sent 10 messages a day instead of 20", "No"],
              ["Submitted assignments late or skipped one", "No"],
              ["Did the outreach but kept no proof", "No"],
              ["Already earning ₹1L from old clients, got no new clients, did everything properly", "Yes"],
              ["Asked for a refund on day 75", "No, the claim window closed on day 60"],
              ["Changed your mind or didn't have time", "No"],
            ],
          ),
        ],
      },
      {
        q: "How do I claim the refund?",
        a: [
          p(
            "Within 60 days of your purchase date, message us on WhatsApp at +91 90325 50956 (use the WhatsApp icon on the website or in the community). Share your assignments, outreach tracker and screenshots of messages, replies and booked calls. Our team reviews everything within 7 days. If steps were missed or not done properly, we will show you the issues we found, and the refund will not apply. If you executed everything properly, your refund is processed within 30 days. The team's decision is final.",
          ),
        ],
      },
      {
        q: "Can I claim the refund after 60 days?",
        a: [
          p(
            "No. Refund requests are accepted only within the first 60 days from your purchase date. After day 60, no refund is given for any reason.",
          ),
        ],
      },
      {
        q: "Can you show proof of results?",
        a: [
          p(
            "Chandan's own results are public: from ₹30–50K projects last year to ₹2–3L clients in the last 6 months, recorded sales calls, and real booked-call screenshots shown in the webinar. The current cohort started recently and has not yet completed its 60 days, so we are not showing student results yet. We will share them once students complete the program.",
          ),
        ],
      },
    ],
  },
  {
    title: "7. Pricing and enrollment",
    items: [
      {
        q: "How much does the course cost?",
        a: [
          p(
            "₹4,999 for the cohort. You will also need the $20 per month Claude plan from day one (see section 3).",
          ),
        ],
      },
      {
        q: "What is included in the price?",
        a: [
          ul(
            "The full 6-module AI Architect system, recorded, with lifetime access.",
            "All future course updates.",
            "Personalised feedback on every assignment within 24 hours.",
            "A 30-minute live class every 2 weeks, with recordings added to the course.",
            "A private community inside the course platform.",
            "Real client case studies.",
            "n8n Mastery Course (beginner to advanced), free.",
            "The 60-day refund guarantee (conditions in section 6).",
          ),
        ],
      },
      {
        q: "How can I pay? Is there an EMI option?",
        a: [
          p(
            "No. There is no EMI option. The course is a one-time payment, and you can pay by UPI, card or other online payment methods.",
          ),
        ],
      },
      { q: "Do I get a GST invoice?", a: [p("Yes. A GST invoice is provided for your purchase.")] },
      {
        q: "What happens after I pay?",
        a: [
          p(
            "You receive an email confirming your purchase, with all the details you need to access the course and the community.",
          ),
        ],
      },
      {
        q: "I am going through a tough financial time. Should I join?",
        a: [
          p(
            "Please don't borrow money or add to your debt to join. This course builds a real business skill, but income takes time: first clients usually pay ₹15–25K, and you need consistent effort to get there. Join only if the fee and the monthly tool cost won't strain you. Until then, our free content on Instagram and YouTube (@chandancheripally) is a good place to start.",
          ),
        ],
      },
      {
        q: "I still have a question that isn't answered here.",
        a: [
          p("WhatsApp us at +91 90325 50956 or email contact@repeatless.in, and we will reply personally."),
        ],
      },
    ],
  },
];

function Answer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-3 px-6 pb-5 text-sm leading-relaxed text-slate">
      {blocks.map((b, i) => {
        if (b.t === "p") return <p key={i}>{b.v}</p>;
        if (b.t === "ul")
          return (
            <ul key={i} className="list-disc space-y-1.5 pl-5 marker:text-sky">
              {b.v.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          );
        return (
          <div key={i} className="overflow-x-auto rounded-lg border border-ink/10">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <thead className="bg-surface2 text-ink">
                <tr>
                  {b.head.map((h) => (
                    <th key={h} className="px-3 py-2 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row) => (
                  <tr key={row[0]} className="border-t border-ink/10 align-top">
                    {row.map((cell, ci) => (
                      <td key={ci} className={`px-3 py-2 ${ci === 0 ? "font-medium text-ink" : ""}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default function FAQSection() {
  const reduce = useReducedMotion();
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal
          as="h2"
          amount={0.4}
          className="text-center font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl"
        >
          AI Architect Cohort — Frequently Asked Questions
        </Reveal>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate2">
          Read this page fully before you enroll. Every question students have asked us is answered here.
        </p>

        <div className="mt-12 flex flex-col gap-10">
          {groups.map((group, gi) => (
            <div key={group.title}>
              <h3 className="eyebrow mb-4">{group.title}</h3>
              <div className="flex flex-col gap-3">
                {group.items.map((item, i) => {
                  const key = `${gi}-${i}`;
                  const isOpen = openKey === key;
                  return (
                    <div key={key} className="overflow-hidden rounded-xl border border-ink/10 bg-surface">
                      <button
                        type="button"
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium text-ink"
                      >
                        {item.q}
                        <FiChevronDown
                          className={`h-4 w-4 shrink-0 text-sky transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: reduce ? 0 : 0.3, ease: [0.4, 0, 0.2, 1] }}
                          >
                            <Answer blocks={item.a} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
