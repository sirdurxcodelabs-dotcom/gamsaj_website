import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { blogAPI } from "../../../services/api";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  featuredImage: {
    url: string;
  };
  authorName: string;
  category: string;
  publishedAt: string;
  slug: string;
}

const DynamicBlog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsData = await blogAPI.getBlogs({ limit: 3, sort: '-publishedAt' });
        setBlogs(blogsData.blogs || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      year: date.getFullYear()
    };
  };

  const truncateTitle = (title: string, maxLength: number = 50) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength).trim() + '...';
  };

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <section className="blog-area-4 space" id="blog-sec">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading latest news...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-area-4 space" id="blog-sec">
      <div className="container">
        <div className="row justify-content-lg-between justify-content-center align-items-center">
          <div className="col-lg-6">
            <div className="title-area blog-area-content-text-extra-style">
              <span className="sub-title text-theme">
                Daily Update <i className="ri-arrow-right-down-line"></i>
              </span>
              <h2 className="sec-title">Our latest news and blog</h2>
            </div>
          </div>
          <div className="col-md-auto">
            <div className="sec-btn">
              <Link to="/blog" className="btn">
                View all post <i className="ri-arrow-right-up-line"></i>
              </Link>
            </div>
          </div>
        </div>

        {blogs.length > 0 ? (
          <Slider
            {...settings}
            className="row global-carousel blog-slider5 slider-shadow"
          >
            {blogs.map((blog) => {
              const dateInfo = formatDate(blog.publishedAt);
              return (
                <div key={blog._id} className="col-md-6 col-lg-4">
                  <div className="blog-card style5">
                    <div className="blog-img">
                      <img src={blog.featuredImage.url} alt={blog.title} />
                      <div className="blog-date">
                        <Link to="/blog">
                          <span>{dateInfo.day}</span>{dateInfo.month}
                        </Link>
                        <div className="year">{dateInfo.year}</div>
                      </div>
                    </div>
                    <div className="blog-content">
                      <div className="blog-meta">
                        <Link to="/blog">By {blog.authorName}</Link>
                        <Link to="/blog">{blog.category}</Link>
                      </div>
                      <h3 className="blog-title">
                        <Link to={`/blog-details/${blog.slug}`}>
                          {truncateTitle(blog.title)}
                        </Link>
                      </h3>
                      <Link
                        to={`/blog-details/${blog.slug}`}
                        className="btn style-border4"
                        tabIndex={0}
                      >
                        Read More <i className="ri-arrow-right-up-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <p>No blog posts available at the moment.</p>
              <Link to="/blog" className="btn">
                Check Back Later <i className="ri-arrow-right-up-line"></i>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicBlog;