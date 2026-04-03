import FooterTwo from "../Common/Footer/FooterTwo";
import HeaderOne from "../Common/Header/HeaderOne";
import ScrollTopButton from "../Common/Scroll/Scroll";
import Wrapper from "../Common/Wrapper";
import BreadcumbThirteen from "../Team/BreadcumbThirteen/BreadcumbThirteen";
import TeamFour from "../Team/TeamFour/TeamFour";
import { useSEO } from "../../hooks/useSEO";

const Team = () => {
	useSEO({
		title: 'Our Team — Leadership & Experts',
		description: 'Meet the GAMSAJ International Limited leadership team — experienced professionals in civil engineering, construction, real estate, and business development.',
		keywords: 'GAMSAJ team, construction team Nigeria, engineering leadership Nigeria, GAMSAJ management',
		canonical: '/team',
	})
	return (
		<Wrapper>
			<HeaderOne />
			<BreadcumbThirteen />
			<TeamFour />
			<FooterTwo />
			<ScrollTopButton />
		</Wrapper>
	);
};

export default Team;
