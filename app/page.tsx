import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Products from '@/components/home/Products';
import Stats from '@/components/home/Stats';
import Gallery from '@/components/home/Gallery';
import Testimonials from '@/components/home/Testimonials';
import Contact from '@/components/home/Contact';
import ServiceAreas from '@/components/home/ServiceAreas';
import {
  HERO, TRUST_ITEMS, ABOUT, ACCORDION_ITEMS,
  PRODUCTS_SECTION, PRODUCTS, STATS,
  GALLERY_SECTION, GALLERY_ITEMS,
  TESTIMONIALS_SECTION, TESTIMONIALS,
  CONTACT_SECTION, PHONE, EMAIL, ADDRESS,
} from '@/lib/constants';

export default function Home() {
  return (
    <>
      <Hero data={HERO} trustItems={TRUST_ITEMS} />
      <About data={ABOUT} accordionItems={ACCORDION_ITEMS} />
      <Products section={PRODUCTS_SECTION} products={PRODUCTS} />
      <Stats stats={STATS} />
      <Gallery section={GALLERY_SECTION} items={GALLERY_ITEMS} />
      <Testimonials section={TESTIMONIALS_SECTION} testimonials={TESTIMONIALS} />
      <Contact section={CONTACT_SECTION} contactInfo={{ phone: PHONE, email: EMAIL, address: ADDRESS }} />
      <ServiceAreas areas={[]} />
    </>
  );
}
