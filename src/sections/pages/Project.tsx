import FooterTwo from "../Common/Footer/FooterTwo";
import HeaderOne from "../Common/Header/HeaderOne";
import ScrollTopButton from "../Common/Scroll/Scroll";
import Wrapper from "../Common/Wrapper";
import BreadcumbSeven from "../Project/BreadcumbSeven/BreadcumbSeven";
import ProjectArea from "../Project/Project/Project";
import { useSEO } from "../../hooks/useSEO";

const Project = () => {
	useSEO({
		title: 'Construction Projects Portfolio Nigeria',
		description: 'Explore GAMSAJ International Limited\'s portfolio of completed construction, civil engineering, and real estate projects across Nigeria. Quality delivery since 2011.',
		keywords: 'construction projects Nigeria, GAMSAJ projects, civil engineering projects Nigeria, building projects Nigeria, infrastructure projects Nigeria',
		canonical: '/project',
	})
	return (
		<Wrapper>
			<HeaderOne />
			<BreadcumbSeven />
			<ProjectArea />
			<FooterTwo />
			<ScrollTopButton />
		</Wrapper>
	);
};

export default Project;
