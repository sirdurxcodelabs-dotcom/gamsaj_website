import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface PublicProject {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  category: string;
  location: string;
  featuredImage: { url: string };
  isFeatured: boolean;
  tags: string[];
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ProjectArea = () => {
  const [projects, setProjects] = useState<PublicProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState('');

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '9' });
    if (category) params.set('category', category);
    fetch(`${API_URL}/projects/public?${params}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) {
          setProjects(data.data);
          setTotalPages(data.pagination?.pages || 1);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [page, category]);

  const categories = ['', 'construction', 'infrastructure', 'real-estate', 'industrial', 'other'];

  return (
    <section className="project-page space-top space-extra-bottom">
      <div className="container">
        {/* Category Filter */}
        <div className="d-flex flex-wrap gap-2 justify-content-center mb-40">
          {categories.map(c => (
            <button key={c} onClick={() => { setCategory(c); setPage(1); }}
              className={`btn btn-sm ${category === c ? 'btn-primary' : 'btn-outline-secondary'}`}
              style={{ textTransform: 'capitalize' }}>
              {c || 'All'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">No completed projects to display yet.</p>
          </div>
        ) : (
          <div className="row gy-40 justify-content-center">
            {projects.map((p, index) => (
              <div className="col-md-6 col-lg-4" key={p._id}>
                <div className="portfolio-card style2">
                  <div className="portfolio-card-thumb">
                    <img
                      src={p.featuredImage?.url || '/assets/img/project/project2_1.png'}
                      alt={p.title}
                      style={{ width: '100%', height: 240, objectFit: 'cover' }}
                    />
                    <span className="portfolio-card-number">0{index + 1}</span>
                  </div>
                  <div className="portfolio-card-details">
                    <span className="portfolio-card-subtitle" style={{ textTransform: 'capitalize' }}>
                      {p.category?.replace('-', ' ')}
                    </span>
                    <h4 className="portfolio-card-title">
                      <Link to={`/project-details/${p.slug}`}>{p.title}</Link>
                    </h4>
                    {p.location && (
                      <p className="portofolio-card-text">
                        <i className="ri-map-pin-line me-1"></i>{p.location}
                      </p>
                    )}
                    <Link to={`/project-details/${p.slug}`} className="btn-with-icon">
                      VIEW DETAILS
                      <span className="btn-icon"><i className="ri-arrow-right-up-line"></i></span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination justify-content-center mt-40">
            <ul>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <li key={p}>
                  <button className={`btn btn-sm ${page === p ? 'active' : ''}`}
                    onClick={() => setPage(p)}
                    style={{ minWidth: 36 }}>
                    {String(p).padStart(2, '0')}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectArea;
