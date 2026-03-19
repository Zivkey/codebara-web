import Navbar from "@/components/Navbar";
import ScrollCapybaraStage from "@/components/ScrollCapybaraStage";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <Navbar />
      <ScrollCapybaraStage />
    </main>
  );
}
