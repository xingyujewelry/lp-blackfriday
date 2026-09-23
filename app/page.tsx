import { Hero } from "./components/sections/Hero";
import { Benefits } from "./components/sections/Benefits";
import { EventStrip } from "./components/sections/EventStrip";
import { Selection } from "./components/sections/Selection";
import { Lives } from "./components/sections/Lives";
import { Footer } from "./components/sections/Footer";
import { ExclusiveMarquee } from "./components/ExclusiveMarquee";

export default function Home() {
  return (
    <div className="relative w-full overflow-x-hidden">
      <Hero />
      <Benefits />
      <EventStrip />
      <Selection />
      <ExclusiveMarquee />
      <Lives />
      <Footer />
    </div>
  );
}
