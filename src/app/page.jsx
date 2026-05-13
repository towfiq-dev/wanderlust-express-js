import Banner from '@/components/homePage/banner/Banner';
import CTASection from '@/components/homePage/CTASection/CTASection';
import Testimonials from '@/components/homePage/testimonials/Testimonials';
import WhyChooseUs from '@/components/homePage/whyChooseUs/WhyChooseUs';
import React from 'react';

const Home = () => {
  return (
    <div className='mt-25'>
    <Banner/>
    <WhyChooseUs/>
    <Testimonials/>
    <CTASection/>
    </div>
  );
};

export default Home;