import Hero from "../../components/Hero/Hero";
import SearchSection from "../../components/SearchSection/SearchSection";
import FeaturedCars from "../../components/FeaturedCars/FeaturedCars";
import WhyChooseUs from "../../components/WhyChooseUs/WhyChooseUs";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import Testimonials from "../../components/Testimonials/Testimonials";
import FAQ from "../../components/FAQ/FAQ";
import CTA from "../../components/CTA/CTA";

function Home() {
    return (
    // <h1>🏠 Home Page</h1>,
       <>
      <Hero />
      <SearchSection />
      <FeaturedCars />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
    );
}

export default Home;