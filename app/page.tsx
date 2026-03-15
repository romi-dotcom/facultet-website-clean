import NavBar from "@/components/sections/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import TrustBar from "@/components/sections/TrustBar";
import DocumentsTimeline from "@/components/sections/DocumentsTimeline";
import WhyOnline from "@/components/sections/WhyOnline";
import Courses from "@/components/sections/Courses";
import CourseProgramme from "@/components/sections/CourseProgramme";
import Certifications from "@/components/sections/Certifications";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";
import SocialProofGallery from "@/components/sections/SocialProofGallery";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <TrustBar />
      <DocumentsTimeline />
      <WhyOnline />
      <CourseProgramme />
      <Certifications />
      <HowItWorks />
      <Testimonials />
      <SocialProofGallery />
      <Courses />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
