import { Link } from "react-router-dom";

 
const TeamThree = () => {
  return (
    <div className="team-area-1 space shape-mockup-wrap">
      <div
        className="section-animation-shape1-1 shape-mockup animation-infinite background-image"
        style={{ backgroundImage: "url('/assets/img/shape/global-line-shape2.png')", bottom: '0px' }}
      ></div>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-7 col-md-7">
            <div className="title-area content-text-extra-style">
              <span className="sub-title">
                <img src="/assets/img/icon/section-subtitle-icon.svg" alt="img" />
                Our Team
              </span>
              <h2 className="sec-title">Meet our leadership</h2>
            </div>
          </div>
          <div className="col-md-auto">
            <div className="sec-btn">
              <Link to="/about" className="btn">
                View All Members <i className="ri-arrow-right-up-line"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="row gy-30 justify-content-center">
          <div className="col-lg-4 col-md-6">
            <div
              className="team-card"
              style={{ backgroundImage: "url('/assets/img/bg/team-card-bg1-1.png')" }}
            >
              <div className="team-card_content max-width-reset-team">
                <h4 className="team-card_title">
                  <Link to="/team-details">Alhaji Abdulahi Abdul Fatah Cosco</Link>
                </h4>
                <span className="team-card_desig">Chairman</span>
                <div className="team-social_wrap">
                  <div className="social-btn">
                    <Link to="https://facebook.com/">
                      <i className="ri-facebook-fill"></i>
                    </Link>
                    <Link to="https://www.twitter.com/">
                      <i className="ri-twitter-x-line"></i>
                    </Link>
                    <Link to="https://instagram.com/">
                      <i className="ri-instagram-line"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team-card_img team-card-white-space-none">
                <img src="/assets/img/team/team-1-1.png" alt="img" />
              </div>
              <Link to="tel:+2348000000000" className="contact-btn-wrap">
                <span className="number">+234 800 000 0000</span>
                <div className="icon-btn">
                  <i className="ri-phone-fill"></i>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div
              className="team-card"
              style={{ backgroundImage: "url('/assets/img/bg/team-card-bg1-1.png')" }}
            >
              <div className="team-card_content max-width-reset-team">
                <h4 className="team-card_title">
                  <Link to="/team-details">Alhaji Alabi Akeem Oyedele</Link>
                </h4>
                <span className="team-card_desig">Managing Director / CEO</span>
                <div className="team-social_wrap">
                  <div className="social-btn">
                    <Link to="https://facebook.com/">
                      <i className="ri-facebook-fill"></i>
                    </Link>
                    <Link to="https://www.twitter.com/">
                      <i className="ri-twitter-x-line"></i>
                    </Link>
                    <Link to="https://instagram.com/">
                      <i className="ri-instagram-line"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team-card_img team-card-white-space-none">
                <img src="/assets/img/team/team-1-2.png" alt="img" />
              </div>
              <Link to="tel:+2348000000000" className="contact-btn-wrap">
                <span className="number">+234 800 000 0000</span>
                <div className="icon-btn">
                  <i className="ri-phone-fill"></i>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div
              className="team-card"
              style={{ backgroundImage: "url('/assets/img/bg/team-card-bg1-1.png')" }}
            >
              <div className="team-card_content max-width-reset-team">
                <h4 className="team-card_title">
                  <Link to="/team-details">Mr. Ram Singh Yadav</Link>
                </h4>
                <span className="team-card_desig">Technical Director</span>
                <div className="team-social_wrap">
                  <div className="social-btn">
                    <Link to="https://facebook.com/">
                      <i className="ri-facebook-fill"></i>
                    </Link>
                    <Link to="https://www.twitter.com/">
                      <i className="ri-twitter-x-line"></i>
                    </Link>
                    <Link to="https://instagram.com/">
                      <i className="ri-instagram-line"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="team-card_img team-card-white-space-none">
                <img src="/assets/img/team/team-1-3.png" alt="img" />
              </div>
              <Link to="tel:+2348000000000" className="contact-btn-wrap">
                <span className="number">+234 800 000 0000</span>
                <div className="icon-btn">
                  <i className="ri-phone-fill"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamThree;
