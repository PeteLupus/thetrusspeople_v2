import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Products from '@/components/home/Products';
import Stats from '@/components/home/Stats';
import Gallery from '@/components/home/Gallery';
import Testimonials from '@/components/home/Testimonials';
import Contact from '@/components/home/Contact';
import ServiceAreas from '@/components/home/ServiceAreas';
import { getHomePageData } from '@/lib/sanity/queries';

export default async function Home() {
  const data = await getHomePageData();

  return (
    <>
      <Hero data={data.hero} trustItems={data.trustItems} />
      <About data={data.about} accordionItems={data.accordionItems} />
      <Products section={data.productsSection} products={data.products} />
      <Stats stats={data.stats} />
      <Gallery section={data.gallerySection} items={data.galleryItems} />
      <Testimonials section={data.testimonialsSection} testimonials={data.testimonials} />
      <Contact section={data.contactSection} contactInfo={{
        phone: data.phone,
        email: data.email,
        address: data.address,
      }} />
      <ServiceAreas areas={data.serviceAreas} />
    </>
  );
}
