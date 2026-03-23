import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { blogAPI } from "../../../services/api";
import "../../../styles/blog-reactions.css";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: {
    url: string;
  };
  authorName: string;
  category: string;
  publishedAt: string;
  views: number;
  tags: string[];
  slug: string;
  comments: Comment[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
  };
}

interface Comment {
  _id: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  isApproved: boolean;
  reactions: {
    like: number;
    heart: number;
    laugh: number;
    wow: number;
    sad: number;
    angry: number;
  };
  userReactions: Array<{
    userIP: string;
    reaction: string;
    createdAt: string;
  }>;
}

interface CategoryCount {
  category: string;
  count: number;
}

const DynamicBlogDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [recentBlogs, setRecentBlogs] = useState<BlogPost[]>([]);
  const [categoryStats, setCategoryStats] = useState<CategoryCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Comment form state
  const [commentForm, setCommentForm] = useState({
    author: '',
    email: '',
    content: ''
  });
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        
        // Fetch main blog
        const blogData = await blogAPI.getBlogBySlug(slug);
        
        if (blogData) {
          setBlog(blogData);
          // Update page title
          document.title = blogData.seo?.metaTitle || blogData.title;
        } else {
          setError('Blog post not found');
          return;
        }

        // Fetch recent blogs for sidebar
        const recentResult = await blogAPI.getBlogs({ limit: 4 });
        setRecentBlogs(recentResult.blogs || []);

        // Fetch all blogs to calculate category stats
        const allResult = await blogAPI.getBlogs({ limit: 100 });
        const allBlogsData = allResult.blogs || [];
        if (allBlogsData.length > 0) {
          const categoryMap = new Map<string, number>();
          allBlogsData.forEach((blog: BlogPost) => {
            categoryMap.set(blog.category, (categoryMap.get(blog.category) || 0) + 1);
          });
          
          const stats = Array.from(categoryMap.entries()).map(([category, count]) => ({
            category,
            count
          }));
          setCategoryStats(stats);
        }
        
      } catch (error) {
        console.error('Error fetching blog data:', error);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      year: date.getFullYear()
    };
  };

  const formatContent = (content: string) => {
    // Convert markdown-style content to HTML
    return content
      .replace(/^# (.*$)/gim, '<h3 class="blog-inner-title">$1</h3>')
      .replace(/^## (.*$)/gim, '<h4>$1</h4>')
      .replace(/^### (.*$)/gim, '<h5>$1</h5>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
  };

  const formatDateForRecent = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Handle comment form submission
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!blog || !commentForm.author || !commentForm.email || !commentForm.content) {
      alert('Please fill in all fields');
      return;
    }

    try {
      setSubmittingComment(true);
      const response = await blogAPI.addComment(blog._id, commentForm);
      
      if (response.success) {
        setBlog(response.data);
        setCommentForm({ author: '', email: '', content: '' });
        setCommentSuccess(true);
        setTimeout(() => setCommentSuccess(false), 3000);
      } else {
        alert(response.message || 'Failed to add comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  // Handle comment reaction
  const handleCommentReaction = async (commentId: string, reaction: string) => {
    if (!blog) return;

    try {
      const response = await blogAPI.addCommentReaction(blog._id, commentId, reaction);
      
      if (response.success) {
        // Update the blog state with new reaction data
        setBlog(prevBlog => {
          if (!prevBlog) return null;
          
          const updatedComments = prevBlog.comments.map(comment => 
            comment._id === commentId 
              ? { ...comment, reactions: response.data.reactions }
              : comment
          );
          
          return { ...prevBlog, comments: updatedComments };
        });
      }
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  // Format comment date
  const formatCommentDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get reaction emoji
  const getReactionEmoji = (reaction: string) => {
    const emojis: Record<string, string> = {
      like: '👍',
      heart: '❤️',
      laugh: '😂',
      wow: '😮',
      sad: '😢',
      angry: '😠'
    };
    return emojis[reaction] || '👍';
  };

  if (loading) {
    return (
      <section className="blog-area space-top space-extra-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading blog post...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !blog) {
    return (
      <section className="blog-area space-top space-extra-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="text-center py-5">
                <h2>Blog Post Not Found</h2>
                <p className="text-muted">{error || 'The requested blog post could not be found.'}</p>
                <Link to="/blog" className="btn">
                  Back to Blog <i className="ri-arrow-right-up-line"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const dateInfo = formatDate(blog.publishedAt);

  return (
    <section className="blog-area space-top space-extra-bottom">
      <div className="container">
        <div className="row gx-60">
          <div className="col-xxl-8 col-lg-7">
            <div className="blog-single">
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
                  <Link to="/blog">{blog.views} Views</Link>
                  <Link to="/blog">{blog.category}</Link>
                </div>
                <h3 className="blog-title">{blog.title}</h3>
                <p className="mb-20">{blog.excerpt}</p>
                
                <div 
                  className="blog-content-body"
                  dangerouslySetInnerHTML={{ 
                    __html: `<p>${formatContent(blog.content)}</p>` 
                  }}
                />
              </div>
              
              <div className="share-links clearfix">
                <div className="row justify-content-between">
                  <div className="col-md-auto">
                    <div className="tagcloud">
                      {blog.tags.map((tag, index) => (
                        <Link key={index} to="/blog">{tag}</Link>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-auto text-xl-end">
                    <div className="social-btn style3">
                      <Link to="https://www.twitter.com/">
                        <i className="ri-twitter-x-line"></i>
                      </Link>
                      <Link to="https://instagram.com/">
                        <i className="ri-instagram-line"></i>
                      </Link>
                      <Link to="https://facebook.com/">
                        <i className="ri-facebook-fill"></i>
                      </Link>
                      <Link to="https://linkedin.com/">
                        <i className="ri-linkedin-fill"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="blog-author bg-smoke">
                <div className="auhtor-img">
                  <img
                    src="/assets/img/blog/blog-author.png"
                    alt="Blog Author Image"
                  />
                </div>
                <div className="media-body">
                  <h3 className="author-name">
                    <Link to="/team-details">{blog.authorName}</Link>
                  </h3>
                  <span className="author-desig">GAMSAJ International Limited</span>
                  <p className="author-text">
                    Expert in construction, engineering, and project management with years of experience 
                    delivering quality projects across Nigeria.
                  </p>
                  <div className="social-btn style4">
                    <Link to="https://www.twitter.com/">
                      <i className="ri-twitter-x-line"></i>
                    </Link>
                    <Link to="https://instagram.com/">
                      <i className="ri-instagram-line"></i>
                    </Link>
                    <Link to="https://facebook.com/">
                      <i className="ri-facebook-fill"></i>
                    </Link>
                    <Link to="https://linkedin.com/">
                      <i className="ri-linkedin-fill"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Comment Form Section */}
            <div className="comments-wrap">
              <h3 className="blog-inner-title mt-n2 mb-15">Leave a Comment</h3>
              {commentSuccess && (
                <div className="alert alert-success">
                  Comment added successfully!
                </div>
              )}
              <p>
                Your email address will not be published. Required fields are marked *
              </p>
              <form onSubmit={handleCommentSubmit} className="comment-form mb-30 mt-30">
                <div className="row">
                  <div className="col-xl-6 form-group">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      className="form-control style-white"
                      value={commentForm.author}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, author: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="col-xl-6 form-group">
                    <input
                      type="email"
                      placeholder="Email Address *"
                      className="form-control style-white"
                      value={commentForm.email}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="col-12 form-group">
                    <textarea
                      placeholder="Your Comment... *"
                      className="form-control style-white"
                      rows={3}
                      value={commentForm.content}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, content: e.target.value }))}
                      required
                    ></textarea>
                  </div>
                  <div className="col-12 form-group mb-0">
                    <button 
                      type="submit" 
                      className="btn"
                      disabled={submittingComment}
                    >
                      {submittingComment ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Comment <i className="ri-arrow-right-up-line"></i>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-xxl-4 col-lg-5">
            <aside className="sidebar-area">
              <div className="widget widget_search">
                <h3 className="widget_title">Search Here</h3>
                <form className="search-form">
                  <input type="text" placeholder="Search..." />
                  <button type="submit">
                    <i className="ri-search-line"></i>
                  </button>
                </form>
              </div>

              <div className="widget widget_categories">
                <h3 className="widget_title">Categories</h3>
                <ul>
                  {categoryStats.map((stat, index) => (
                    <li key={index}>
                      <Link to="/blog">
                        {stat.category} <span>{stat.count}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="widget">
                <h3 className="widget_title">Recent Posts</h3>
                <div className="recent-post-wrap">
                  {recentBlogs.slice(0, 4).map((recentBlog, index) => (
                    <div key={index} className="recent-post">
                      <div className="media-img">
                        <Link to={`/blog-details/${recentBlog.slug}`}>
                          <img
                            src={recentBlog.featuredImage.url}
                            alt={recentBlog.title}
                          />
                        </Link>
                      </div>
                      <div className="media-body">
                        <h4 className="post-title">
                          <Link className="text-inherit" to={`/blog-details/${recentBlog.slug}`}>
                            {recentBlog.title}
                          </Link>
                        </h4>
                        <div className="recent-post-meta">
                          <Link to="/blog">By {recentBlog.authorName}</Link>
                          <Link to="/blog">{formatDateForRecent(recentBlog.publishedAt)}</Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="widget widget_categories">
                <h3 className="widget_title">Archives</h3>
                <ul>
                  <li>
                    <Link to="/blog">
                      January 2026 <span>3</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog">
                      December 2025 <span>2</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog">
                      November 2025 <span>1</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {blog && blog.tags && blog.tags.length > 0 && (
                <div className="widget widget_tag_cloud">
                  <h3 className="widget_title">Blog Tags</h3>
                  <div className="tagcloud">
                    {blog.tags.map((tag, index) => (
                      <Link key={index} to="/blog">{tag}</Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Compact Comments Section */}
              <div className="widget">
                <h3 className="widget_title">
                  Comments ({blog.comments?.filter(comment => comment.isApproved).length || 0})
                </h3>
                <div className="comments-container">
                  {blog.comments && blog.comments.length > 0 ? (
                    <div className="comments-scroll">
                      {blog.comments
                        .filter(comment => comment.isApproved)
                        .map((comment) => (
                        <div key={comment._id} className="compact-comment">
                          <div className="comment-header">
                            <img
                              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author)}&background=0d6efd&color=fff&size=32`}
                              alt={comment.author}
                              className="comment-avatar"
                            />
                            <div className="comment-meta">
                              <h5 className="comment-author">{comment.author}</h5>
                              <span className="comment-date">{formatCommentDate(comment.createdAt)}</span>
                            </div>
                          </div>
                          <p className="comment-text">{comment.content}</p>
                          
                          {/* Compact Reaction Buttons */}
                          <div className="compact-reactions">
                            {['like', 'heart', 'laugh', 'wow', 'sad', 'angry'].map((reaction) => (
                              <button
                                key={reaction}
                                className="compact-reaction-btn"
                                onClick={() => handleCommentReaction(comment._id, reaction)}
                                title={reaction}
                              >
                                {getReactionEmoji(reaction)}
                                <span className="reaction-count">
                                  {comment.reactions[reaction as keyof typeof comment.reactions] || 0}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-comments">No comments yet. Be the first to comment!</p>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicBlogDetails;