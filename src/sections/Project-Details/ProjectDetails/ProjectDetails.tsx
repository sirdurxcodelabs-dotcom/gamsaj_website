import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

interface UpdateImage { url: string }
interface ProjectUpdate {
  _id: string;
  title: string;
  description: string;
  type: string;
  images?: UpdateImage[];
  createdAt: string;
}

interface ProjectDetail {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: string;
  location: string;
  clientName: string;
  startDate?: string;
  endDate?: string;
  progressPercent: number;
  featuredImage: { url: string };
  galleryImages: { url: string }[];
  tags: string[];
  isFeatured: boolean;
  updates?: ProjectUpdate[];
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ProjectDetailsArea = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`${API_URL}/projects/public/${slug}`)
      .then(r => r.json())
      .then(data => {
        if (data.success) setProject(data.data);
        else setNotFound(true);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="text-center py-5 space">
      <div className="spinner-border text-primary" role="status" />
    </div>
  );

  if (notFound || !project) return (
    <div className="text-center py-5 space">
      <h3>Project not found</h3>
      <Link to="/project" className="btn btn-primary mt-3">Back to Projects</Link>
    </div>
  );

  return (
    <div>
      <div className="project-details-area space-top overflow-hidden">
        <div className="container">
          <div className="row gy-30 gx-30">
            <div className="col-12">
              <div className="single-page">
                <div className="project-page-thumb mb-50">
                  <img className="w-100" src={project.featuredImage?.url || '/assets/img/project/project_details1_1.png'}
                    alt={project.title} style={{ maxHeight: 480, objectFit: 'cover' }} />
                  <aside className="sidebar-area">
                    <div className="widget widget_project_info style2">
                      <h3 className="widget_title">Project Info</h3>
                      <ul className="project-info-list border-0 p-0 m-0">
                        {project.clientName && <li><strong>Client<span>:</span></strong><span>{project.clientName}</span></li>}
                        <li><strong>Category<span>:</span></strong><span style={{ textTransform: 'capitalize' }}>{project.category?.replace('-', ' ')}</span></li>
                        {project.location && <li><strong>Location<span>:</span></strong><span>{project.location}</span></li>}
                        {project.startDate && <li><strong>Start<span>:</span></strong><span>{new Date(project.startDate).toLocaleDateString()}</span></li>}
                        {project.endDate && <li><strong>Completed<span>:</span></strong><span>{new Date(project.endDate).toLocaleDateString()}</span></li>}
                        <li><strong>Status<span>:</span></strong><span>Completed</span></li>
                      </ul>
                    </div>
                  </aside>
                </div>

                <h2 className="sec-title mb-25">{project.title}</h2>
                {project.shortDescription && <p className="mb-30 lead">{project.shortDescription}</p>}
                {project.description && <p className="mb-50" style={{ whiteSpace: 'pre-wrap' }}>{project.description}</p>}

                {/* Tags */}
                {project.tags?.length > 0 && (
                  <div className="mb-40">
                    {project.tags.map(tag => (
                      <span key={tag} className="badge bg-light text-dark border me-1">{tag}</span>
                    ))}
                  </div>
                )}

                {/* Gallery */}
                {project.galleryImages?.length > 0 && (
                  <div className="mb-50">
                    <h4 className="mb-20">Project Gallery</h4>
                    <div className="row g-3">
                      {project.galleryImages.map((img, i) => (
                        <div key={i} className="col-md-4 col-sm-6">
                          <img src={img.url} alt={`Gallery ${i + 1}`}
                            className="w-100" style={{ height: 200, objectFit: 'cover', borderRadius: 8 }} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Project Updates */}
                {project.updates && project.updates.length > 0 && (
                  <div className="mb-50">
                    <h4 className="mb-20">Project Updates</h4>
                    <div className="d-flex flex-column gap-3">
                      {project.updates
                        .slice()
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .map(u => (
                          <div key={u._id} className="border rounded p-3">
                            <div className="d-flex align-items-center gap-2 mb-1">
                              <span className={`badge bg-${
                                u.type === 'milestone' ? 'success' :
                                u.type === 'issue' ? 'danger' :
                                u.type === 'note' ? 'secondary' : 'primary'
                              } text-capitalize`} style={{ fontSize: '0.7rem' }}>
                                {u.type.replace('-', ' ')}
                              </span>
                              <strong>{u.title}</strong>
                              <small className="text-muted ms-auto">
                                {new Date(u.createdAt).toLocaleDateString()}
                              </small>
                            </div>
                            {u.description && <p className="mb-2 text-muted" style={{ fontSize: '0.9rem' }}>{u.description}</p>}
                            {u.images && u.images.length > 0 && (
                              <div className="d-flex flex-wrap gap-2 mt-2">
                                {u.images.map((img, i) => (
                                  <a key={i} href={img.url} target="_blank" rel="noreferrer">
                                    <img src={img.url} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6 }} />
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <div className="mt-40">
                  <Link to="/project" className="btn btn-outline-primary">
                    <i className="ri-arrow-left-line me-1"></i>Back to Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsArea;
