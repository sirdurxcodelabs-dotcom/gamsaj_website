 
import { useState } from "react";
import PopupVideo from "../../Common/PopupVideo/PopupVideo";

const Process = () => {
  const [popup, setPopup] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const openPopup = () => {
    setPopup(true);
    const iframe = document.getElementById("youtube-video") as HTMLIFrameElement;
    if (iframe) {
      iframe.src =
        "https://www.youtube.com/embed/Q5PG0rMXgvw";
    }
    setIsActive(true);
    document.body.style.overflow = 'hidden';
  };
 


  return (
    <>
      <section
        className="process-area-1 space-top bg-attachment process-bg-half shape-mockup-wrap background-image"
        data-overlay="title"
        data-opacity="8"
        style={{ backgroundImage: "url('/assets/img/bg/process-bg1-1.png')" }}
      >
        <div className="process_shape_1-1 movingX shape-mockup d-lg-block d-none"></div>
        <div className="process_shape_1-2 moving shape-mockup d-lg-block d-none"></div>
        <div
          className="process_shape_1-3 shape-mockup jump-reverse d-xl-block d-none"
          data-bottom="-50%"
          data-right="0"
          style={{ right: "0px", bottom: "-50%" }}
        >
          <img src="/assets/img/shape/sec-bg-shape1.png" alt="img" />
        </div>
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-4 col-md-6">
              <div className="title-area content-text-extra-style">
                <span className="sub-title text-white">
                  <img src="/assets/img/icon/section-subtitle-icon.svg" alt="img" />
                  Work Process
                </span>
                <h2 className="sec-title text-white">
                  Our proven project delivery process
                </h2>
              </div>
            </div>
            <div className="col-md-auto">
              <div className="sec-btn text-center">
                <a onClick={openPopup} className="play-btn-wrap">
                  Play Video
                  <span className="play-btn style2">
                    <i className="ri-play-fill"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="process-card-wrap">
            <div className="row gy-30 gx-30">
              <div className="col-xl-3 col-md-6">
                <div className="process-card process-fixed-height">
                  <div className="process-card-number">
                    <span>01</span>
                    STEP
                  </div>
                  <h4 className="process-card-title">
                    Consultation & Planning
                  </h4>
                  <p className="process-card-text">
                    Meet with our team to discuss project requirements, feasibility, and strategic planning
                  </p>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="process-card process-fixed-height">
                  <div className="process-card-number">
                    <span>02</span>
                    STEP
                  </div>
                  <h4 className="process-card-title">
                    Design & Engineering
                  </h4>
                  <p className="process-card-text">
                    Detailed design interpretation, engineering analysis, and technical documentation
                  </p>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="process-card process-fixed-height">
                  <div className="process-card-number">
                    <span>03</span>
                    STEP
                  </div>
                  <h4 className="process-card-title">
                    Construction & Supervision
                  </h4>
                  <p className="process-card-text">
                    Professional execution with continuous quality control and safety management
                  </p>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="process-card process-fixed-height">
                  <div className="process-card-number">
                    <span>04</span>
                    STEP
                  </div>
                  <h4 className="process-card-title">
                    Testing & Handover
                  </h4>
                  <p className="process-card-text">
                    Comprehensive testing, commissioning, and final project handover with documentation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PopupVideo
        popup={popup}
        setPopup={setPopup}
        isActive={isActive}
        setIsActive={setIsActive}
      ></PopupVideo>
    </>
  );
};

export default Process;
