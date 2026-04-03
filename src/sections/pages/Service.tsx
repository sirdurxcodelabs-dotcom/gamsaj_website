import FooterTwo from "../Common/Footer/FooterTwo";
import HeaderOne from "../Common/Header/HeaderOne";
import ScrollTopButton from "../Common/Scroll/Scroll";
import TestimonialTwo from "../Common/TestimonialTwo/TestimonialTwo";
import Wrapper from "../Common/Wrapper";
import BreadcumbNine from "../Service/BreadcumbNine/BreadcumbNine";
import ClientTwoSharedSection from "../Service/Client/Client";
import Contact from "../Service/Contact/Contact";
import Process from "../Service/Process/Process";
import ServiceArea from "../Service/Service/ServiceArea";
import { useSEO } from "../../hooks/useSEO";

const Service = () => {
	useSEO({
		title: 'Construction & Engineering Services Nigeria',
		description: 'GAMSAJ International Limited offers civil engineering, building construction, road construction, real estate development, and industrial infrastructure services across Nigeria.',
		keywords: 'construction services Nigeria, civil engineering services, building construction Nigeria, road construction Nigeria, real estate development Nigeria, industrial engineering Nigeria, GAMSAJ services',
		canonical: '/service',
	})
	return (
		<Wrapper>
			<div style={{ overflow: "hidden" }}>
				<HeaderOne />
				<BreadcumbNine />
				<ServiceArea />
				<Process />
				<TestimonialTwo />
				<ClientTwoSharedSection />
				<Contact />
				<FooterTwo />
				<ScrollTopButton />
			</div>
		</Wrapper>
	);
};

export default Service;
