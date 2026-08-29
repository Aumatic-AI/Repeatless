import type { Metadata } from "next";
import FounderStory from "./components/FounderStory";
import TeamRoster from "./components/TeamRoster";

export const metadata: Metadata = {
  title: "About Repeatless: Founder-Led, Team-Delivered AI Automation",
  description:
    "Meet the team behind Repeatless: founder Chandan Kumar and the specialist engineers who build, ship and maintain every AI automation system.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <FounderStory />
      <TeamRoster />
    </div>
  );
}
