import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import CategoryCard from "@/components/home/CategoryCard";
import HomeAdBanner from "@/components/home/HomeAddBanner";
import RoadmapSection from "@/components/home/RoadmapSection";

export default function Home(){
  return(
    <div>
      <Navbar />
      <Hero />
      <HomeAdBanner/>
      <CategoryCard/>
      <RoadmapSection/>
    </div>
  );
}