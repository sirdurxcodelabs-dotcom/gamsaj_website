import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogAPI } from "../../../services/api";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  featuredImage: { url: string };
  authorName: string;
  category: string;
  publishedAt: string;
  slug: string;
  views: number;
}

const BLOGS_PER_PAGE = 6;

const DynamicBlogList = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const result = await blogAPI.getBlogs({ page: currentPage, limit: BLOGS_PER_PAGE });
        setBlogs(result.blogs);
        setTotalPages(result.pagination?.pages || 1);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [currentPage]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      year: date.getFullYear(),
    };
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className="blog-area space-top space-extra-bottom">
        <div className="container">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading blogs...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-area space-top space-extra-bottom">
      <div className="container">
        <div className="row gy-40 justify-content-center">
          {blogs.length === 0 ? (
            <div className="col-12 text-center py-5">
              <h3>No Blog Posts Found</h3>
              <p className="text-muted">Check back later for new content!</p>
            </div>
          ) : (
            blogs.map((blog) => {
              const dateInfo = formatDate(blog.publishedAt);
              return (
                <div key={blog._id} className="col-md-6 col-lg-4">
                  <div className="blog-card">
                    <div className="blog-img">
                      <img src={blog.featuredImage.url} alt={blog.title} />
                      <div className="blog-date">
                        <Link to={`/blog-details/${blog.slug}`}>
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
                        <Link to={`/blog-details/${blog.slug}`}>{blog.title}</Link>
                      </h3>
                      <p className="blog-text">{blog.excerpt}</p>
                      <Link to={`/blog-details/${blog.slug}`} className="btn">
                        More Details <i className="ri-arrow-right-up-line"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {totalPages > 1 && (
          <div className="pagination justify-content-center">
            <ul>
              {currentPage > 1 && (
                <li>
                  <Link to="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}>
                    <i className="ri-arrow-left-line"></i>
                  </Link>
                </li>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li key={page}>
                  <Link
                    className={currentPage === page ? 'active' : ''}
                    to="#"
                    onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                  >
                    {page.toString().padStart(2, '0')}
                  </Link>
                </li>
              ))}
              {currentPage < totalPages && (
                <li>
                  <Link to="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}>
                    <i className="ri-arrow-right-line"></i>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicBlogList;
