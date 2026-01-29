import { HeroSection } from "@/components/features/home/HeroSection";
import { FeaturedMenu } from "@/components/features/home/FeaturedMenu";
import { Testimonials } from "@/components/features/home/Testimonials";
import { ContactSection } from "@/components/features/home/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedMenu />
      <Testimonials />
      <ContactSection />
    </>
  );
}
