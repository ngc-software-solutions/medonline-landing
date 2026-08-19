import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Comparison from "@/components/sections/Comparison";
import FoundingClient from "@/components/sections/FoundingClient";
import Compliance from "@/components/sections/Compliance";
import DigitalSignature from "@/components/sections/DigitalSignature";
import WhyUs from "@/components/sections/WhyUs";
import Modules from "@/components/sections/Modules";
import CurrentScope from "@/components/sections/CurrentScope";
import TargetAudience from "@/components/sections/TargetAudience";
import FinalCta from "@/components/sections/FinalCta";
import BackToTopButton from "@/components/ui/BackToTopButton";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Comparison />
      <FoundingClient />
      <Compliance />
      <DigitalSignature />
      <WhyUs />
      <Modules />
      <CurrentScope />
      <TargetAudience />
      <FinalCta />
      <BackToTopButton />
    </>
  );
}
