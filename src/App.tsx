import { SmoothScroll } from "@/components/SmoothScroll";
import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { WorkGrid } from "@/components/WorkGrid";
import { Record } from "@/components/Record";
import { FieldLog } from "@/components/FieldLog";
import { Footer } from "@/components/Footer";
import { SecretInbox } from "@/components/SecretInbox";

export default function App() {
  return (
    <SmoothScroll>
      <TopBar />
      <Hero />
      <Marquee items={["BUILDER", "RIDER", "COMPETITOR", "SAN JOSE, CA"]} />
      <WorkGrid />
      <Record />
      <FieldLog />
      <Footer />
      <SecretInbox />
    </SmoothScroll>
  );
}
