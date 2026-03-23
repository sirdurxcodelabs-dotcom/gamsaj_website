import DynamicBlogList from "../Blog/BlogFour/DynamicBlogList";
import BreadcumbTwo from "../Blog/BreadcumbTwo/BreadcumbTwo";
import FooterTwo from "../Common/Footer/FooterTwo";
import HeaderOne from "../Common/Header/HeaderOne";
import ScrollTopButton from "../Common/Scroll/Scroll";
import Wrapper from "../Common/Wrapper";

const Blog = () => {
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
