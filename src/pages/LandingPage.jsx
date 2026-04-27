import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import SolutionSection from '../components/sections/SolutionSection';
import ModulesSection from '../components/sections/ModulesSection';
import UseCasesSection from '../components/sections/UseCasesSection';
import MetricsSection from '../components/sections/MetricsSection';
import VisionSection from '../components/sections/VisionSection';
import PricingSection from '../components/sections/PricingSection';
import FinalCTASection from '../components/sections/FinalCTASection';
import FooterSection from '../components/sections/FooterSection';

export default function LandingPage() {
  return (
    <>
      <main className="pt-32">
        <HeroSection />
        <SolutionSection />
        <ModulesSection />
        <UseCasesSection />
        <MetricsSection />
        <VisionSection />
        <PricingSection />
        <FinalCTASection />
      </main>
      <FooterSection />
    </>
  );
}
