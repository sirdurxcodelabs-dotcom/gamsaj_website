 
import CountUp from "react-countup";
import { Link } from "react-router-dom";

const AboutThree = () => {
  return (
    <div className="about-area-2 space-top overflow-hidden">
      <div className="container">
        <div className="row gx-60 align-items-center flex-row-reverse">
          <div className="col-xl-6">
            <div className="about-thumb2 mb-60 mb-xl-0">
              <div className="about-img-1">
                <img src="/assets/img/normal/about_2-1.png" alt="img" />
              </div>
              <div className="about-counter-wrap style2 jump-reverse">
                <div className="about-counter-wrap-bg">
                  <img src="/assets/img/normal/about_shape_2-2.png" alt="img" />
                </div>
                <div className="about-counter-icon">
                  <img
                    src="/assets/img/hero/hero_experience_wrap_icon_1_1.png"
                    alt="img"
                  />
                </div>
                <h3 className="about-counter-number">
                  <span className="counter-number"><CountUp start={0} end={13} /></span>+
                </h3>
                <p className="about-counter-text">Years of Excellence</p>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="title-area mb-25">
              <span className="sub-title">
                <img src="/assets/img/icon/section-subtitle-icon.svg" alt="img" />
                ABOUT US
              </span>
              <h2 className="sec-title">
                WE BUILDING EVERYTHING THAT YOU NEEDED
              </h2>
              <p className="sec-text">
                GAMSAJ International Limited is a Nigerian indigenous construction, real estate, infrastructure, and industrial engineering company established in July 2011. We deliver comprehensive end-to-end construction solutions with strong technical capacity and proven track record across Nigeria.
              </p>
            </div>
            <div className="checklist mb-35">
              <ul>
                <li>
                  <img src="/assets/img/icon/about-checklsit-icon1-1.svg" alt="img" />
                  Multi-Disciplinary Construction & Engineering Firm
                </li>
                <li>
                  <img src="/assets/img/icon/about-checklsit-icon1-1.svg" alt="img" />
                  Over 1,100 Skilled Professionals Across Nigeria
                </li>
              </ul>
            </div>
            <div className="about-grid-wrap">
              <div className="icon">
                <img src="/assets/img/icon/about-grid-icon1-1.svg" alt="img" />
              </div>
              <div className="about-grid-details">
                <h4 className="title">Our Mission</h4>
                <p className="text">
                  To deliver world-class construction and engineering solutions with unwavering commitment to quality, safety, client satisfaction, and continuous improvement in all our projects.
                </p>
              </div>
            </div>
            <div className="about-grid-wrap">
              <div className="icon">
                <img src="/assets/img/icon/about-grid-icon1-2.svg" alt="img" />
              </div>
              <div className="about-grid-details">
                <h4 className="title">Our Vision</h4>
                <p className="text">
                  To become a leading construction and infrastructure company in Nigeria, recognized for excellence, innovation, sustainable development, and ethical business practices.
                </p>
              </div>
            </div>
            <div className="btn-group mt-60">
              <Link to="/about" className="btn style3">
                Explore Our Company <i className="ri-arrow-right-up-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutThree;
