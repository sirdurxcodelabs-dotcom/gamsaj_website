import DynamicBlogList from "../Blog/BlogFour/DynamicBlogList";
import BreadcumbTwo from "../Blog/BreadcumbTwo/BreadcumbTwo";
import FooterTwo from "../Common/Footer/FooterTwo";
import HeaderOne from "../Common/Header/HeaderOne";
import ScrollTopButton from "../Common/Scroll/Scroll";
import Wrapper from "../Common/Wrapper";
import { useSEO } from "../../hooks/useSEO";

const Blog = () => {
	useSEO({
		title: 'Construction News & Insights Nigeria',
		description: 'Read the latest construction, engineering, and real estate news and insights from GAMSAJ International Limited. Stay updated on Nigerian infrastructure developments.',
		keywords: 'construction news Nigeria, engineering blog Nigeria, real estate news Nigeria, GAMSAJ news, infrastructure Nigeria',
		canonical: '/blog',
	})
	return (
		<Wrapper>
			<HeaderOne />
			<BreadcumbTwo />
			<DynamicBlogList />
			<FooterTwo />
			<ScrollTopButton />
		</Wrapper>
	);
};

export default Blog;
