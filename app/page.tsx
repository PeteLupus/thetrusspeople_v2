import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Products from '@/components/home/Products';
import Stats from '@/components/home/Stats';
import Gallery from '@/components/home/Gallery';
import Testimonials from '@/components/home/Testimonials';
import Contact from '@/components/home/Contact';
import ServiceAreas from '@/components/home/ServiceAreas';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Products />
      <Stats />
      <Gallery />
      <Testimonials />
      <Contact />
      <ServiceAreas />
    </>
  );
}
