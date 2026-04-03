import AboutThree from "../About/AboutThree/AboutThree";
import DynamicBlogThree from "../About/BlogThree/DynamicBlogThree";
import Breadcumb from "../About/Breadcumb/Breadcumb";
import ClientThree from "../About/ClientThree/ClientThree";
import CounterThree from "../About/CounterThree/CounterThree";
import ProcessThree from "../About/ProcessThree/ProcessThree";
import TeamThree from "../About/TeamThree/TeamThree";
import TestimonialThree from "../About/TestimonialThree/TestimonialThree";
import WhyChooseThree from "../About/WhyChooseThree/WhyChooseThree";
import FooterTwo from "../Common/Footer/FooterTwo";
import HeaderOne from "../Common/Header/HeaderOne";
import ScrollTopButton from "../Common/Scroll/Scroll";
import Wrapper from "../Common/Wrapper";
import Portfolio from "../Home-1/Portfolio/Portfolio";
import { useSEO } from "../../hooks/useSEO";

const About = () => {
  useSEO({
    title: 'About Us — Nigerian Construction & Engineering Company',
    description: 'Learn about GAMSAJ International Limited — an indigenous Nigerian construction, civil engineering, and real estate company established in 2011. RC: 965221. Trusted by clients across Nigeria.',
    keywords: 'about GAMSAJ, Nigerian construction company, indigenous engineering firm Nigeria, GAMSAJ International Limited history',
    canonical: '/about',
  })
  return (
    <Wrapper>
      <HeaderOne />
      <Breadcumb />
      <AboutThree />
      <WhyChooseThree />
      <ProcessThree />
      <Portfolio />
      <CounterThree />
      <TestimonialThree />
      <TeamThree />
      <ClientThree />
      <DynamicBlogThree />
      <FooterTwo />
      <ScrollTopButton />
    </Wrapper>
  );
};

export default About;