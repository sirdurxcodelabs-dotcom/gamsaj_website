import FooterTwo from "../Common/Footer/FooterTwo";
import HeaderOne from "../Common/Header/HeaderOne";
import ScrollTopButton from "../Common/Scroll/Scroll";
import Wrapper from "../Common/Wrapper";
import BreadcumbSix from "../Contact/BreadcumbSix/BreadcumbSix";
import ContactArea from "../Contact/ContactArea/ContactArea";
import ContactAreaTwo from "../Contact/ContactAreaTwo/ContactAreaTwo";
import ContactMap from "../Contact/ContactMap/ContactMap";
import { useSEO } from "../../hooks/useSEO";

const Contact = () => {
	useSEO({
		title: 'Contact Us — Get a Construction Quote Nigeria',
		description: 'Contact GAMSAJ International Limited for construction, civil engineering, and real estate enquiries in Nigeria. Get a free project quote today. RC: 965221.',
		keywords: 'contact GAMSAJ, construction quote Nigeria, hire construction company Nigeria, civil engineering enquiry Nigeria',
		canonical: '/contact',
	})
	return (
		<Wrapper>
			<div style={{ overflow: "hidden" }}>
				<HeaderOne />
				<BreadcumbSix />
				<ContactArea />
				<ContactAreaTwo />
				<ContactMap />
				<FooterTwo />
				<ScrollTopButton />
			</div>
		</Wrapper>
	);
};

export default Contact;
