"use client";
import {
  LandingNavbar,
  HeroSection,
  PainPointsSection,
  FeaturesSection,
  HowItWorksSection,
  CTASection,
  Footer
} from "../components/landing"



import { ButtonScroll } from "../components/landing/ButtonScroll"
import { useRedirectUser } from "../lib/redirectUser";

export default function LandingPage() {

  useRedirectUser();

  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <HeroSection />
      <PainPointsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
      <ButtonScroll />
    </div>
  )
}
