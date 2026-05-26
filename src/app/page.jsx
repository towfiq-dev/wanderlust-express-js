import { Metadata } from 'next';
import Banner from '@/components/homePage/banner/Banner';
import CTASection from '@/components/homePage/CTASection/CTASection';
import Featured from '@/components/homePage/featured/Featured';
import Testimonials from '@/components/homePage/testimonials/Testimonials';
import WhyChooseUs from '@/components/homePage/whyChooseUs/WhyChooseUs';

export const metadata = {
  title: 'Wanderlust — Explore the World',
  description: 'Discover breathtaking destinations and create unforgettable memories with our curated travel experiences.',
};

const Home = () => {
  return (
    <div>
      <Banner />
      <Featured />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </div>
  );
};

export default Home;
