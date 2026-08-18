import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Comparison from "@/components/sections/Comparison";
import Compliance from "@/components/sections/Compliance";
import DigitalSignature from "@/components/sections/DigitalSignature";
import WhyUs from "@/components/sections/WhyUs";
import Modules from "@/components/sections/Modules";
import CurrentScope from "@/components/sections/CurrentScope";
import TargetAudience from "@/components/sections/TargetAudience";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Comparison />
      <Compliance />
      <DigitalSignature />
      <WhyUs />
      <Modules />
      <CurrentScope />
      <TargetAudience />
      <FinalCta />
    </>
  );
}
