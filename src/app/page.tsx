import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import Comparison from "@/components/sections/Comparison";
import FoundingClient from "@/components/sections/FoundingClient";
import Compliance from "@/components/sections/Compliance";
import DigitalSignature from "@/components/sections/DigitalSignature";
import Modules from "@/components/sections/Modules";
import CurrentScope from "@/components/sections/CurrentScope";
import FinalCta from "@/components/sections/FinalCta";
import BackToTopButton from "@/components/ui/BackToTopButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <Comparison />
      <FoundingClient />
      <Compliance />
      <DigitalSignature />
      <Modules />
      <CurrentScope />
      <FinalCta />
      <BackToTopButton />
    </>
  );
}
