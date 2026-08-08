import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/hero/Hero";
import CategoryCard from "@/components/home/CategoryCard";

export default function Home(){
  return(
    <div>
      <Navbar />
      <Hero />
      <CategoryCard/>
    </div>
  );
}