import { Link } from "react-router-dom";

interface DynamicBreadcrumbProps {
  title: string;
}

const DynamicBreadcrumb = ({ title }: DynamicBreadcrumbProps) => {
  return (
    <div
      className="breadcumb-wrapper"
      style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}
    >
      <div
        className="section-animation-shape1-1 shape-mockup animation-infinite"
        data-top="0"
        style={{ backgroundImage: "url('/assets/img/shape/global-line-shape1.png')" }}
      ></div>
      <div className="container">
        <div className="breadcumb-content">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="breadcumb-title">
                {title}
              </h1>
            </div>
            <div className="col-12">
              <ul className="breadcumb-menu">
                <li>
                  <Link to="/">
                    <i className="ri-home-4-fill"></i> HOME
                  </Link>
                </li>
                <li>
                  <Link to="/blog">OUR BLOG</Link>
                </li>
                <li className="active">{title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicBreadcrumb;