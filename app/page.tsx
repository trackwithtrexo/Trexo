import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Developers from "@/components/shared/Developers";
import FAQ from "@/components/shared/FAQ";
import Features from "@/components/shared/Features";
import Hero from "@/components/shared/Hero";
import Navbar from "@/components/shared/Navbar";
import Reviews from "@/components/shared/Reviews";

export default function Home() {
  return (
    <>
      <Navbar />
      <MaxWidthWrapper>
        <Hero />
        <Features />
        <Reviews />
        <FAQ />
        <Developers />
      </MaxWidthWrapper>
    </>
  );
}
