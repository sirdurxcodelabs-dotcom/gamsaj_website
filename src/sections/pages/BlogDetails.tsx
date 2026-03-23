 
import DynamicBlogDetails from '../BlogDetails/BlogFour/DynamicBlogDetails';
import DynamicBreadcrumb from '../BlogDetails/BreadcumbThree/DynamicBreadcrumb';
import FooterTwo from '../Common/Footer/FooterTwo';
import HeaderOne from '../Common/Header/HeaderOne';
import ScrollTopButton from '../Common/Scroll/Scroll';
import Wrapper from '../Common/Wrapper';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { blogAPI } from '../../services/api';

const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blogTitle, setBlogTitle] = useState('Blog Details');

  useEffect(() => {
    const fetchBlogTitle = async () => {
      if (!slug) return;
      
      try {
        const blogData = await blogAPI.getBlogBySlug(slug);
        if (blogData) {
          setBlogTitle(blogData.title);
        }
      } catch (error) {
        console.error('Error fetching blog title:', error);
      }
    };

    fetchBlogTitle();
  }, [slug]);

  return (
    <Wrapper>
      <HeaderOne />
      <DynamicBreadcrumb title={blogTitle} />
      <DynamicBlogDetails />
      <FooterTwo />
      <ScrollTopButton />
    </Wrapper>
  );
};

export default BlogDetails;