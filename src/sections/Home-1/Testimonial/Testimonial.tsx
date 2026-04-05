import { useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useTestimonials } from "../../../hooks/useTestimonials";

const Testimonial = () => {
  const { testimonials, satisfiedClients, loading } = useTestimonials()
  const sliderRef = useRef<any>(null)
  const items = testimonials

  if (loading || items.length === 0) return null
  const satisfiedCount = satisfiedClients.length > 0 ? satisfiedClients.length : null

  const settings = {
    dots: false, infinite: true, slidesToShow: 1, slidesToScroll: 1,
    arrows: false, autoplay: true, speed: 1500, autoplaySpeed: 5000,
  }

  return (
    <div
      className="testimonial-area-1 home-one-testimonial overflow-hidden space bg-smoke shape-mockup-wrap background-image"
      style={{ backgroundImage: "url('/assets/img/bg/testimonial-bg1-1.png')" }}
    >
      <div className="testimonial_shape_1-1 shape-mockup jump d-xxl-block d-none" style={{ top: '0px', right: '4%' }}>
        <img src="/assets/img/shape/sec-bg-shape2.png" alt="img" />
      </div>
      <div className="container">
        <div className="row gx-100 gy-60 flex-row-reverse">
          <div className="col-xl-6">
            <div className="title-area">
              <span className="sub-title">
                <img src="/assets/img/icon/section-subtitle-icon.svg" alt="img" />
                Testimonials
              </span>
              <h2 className="sec-title">What Our Clients Say</h2>
            </div>

            <Slider {...settings} className="row global-carousel testi-slider1" ref={sliderRef}>
              {items.map(t => (
                <div key={t._id} className="col-lg-6">
                  <div className="testi-card">
                    <div className="quote-icon">
                      <img src="/assets/img/icon/quote.svg" alt="img" />
                    </div>
                    <div className="testi-card-thumb">
                      <img src={t.photo || '/assets/img/testimonial/testi_1_1.png'} alt={t.clientName} />
                    </div>
                    <div className="testi-card_content">
                      {t.title && <h4 className="testi-card_title">{t.title}</h4>}
                      <p className="testi-card_text">{t.text}</p>
                      <div className="testi-card-profile">
                        <h4 className="testi-profile-title">{t.clientName}</h4>
                        {t.designation && <span className="testi-profile-desig">{t.designation}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            <div className="btn-wrap mt-70">
              <div className="icon-box">
                <button onClick={() => sliderRef.current?.slickPrev()} className="slick-arrow style2 default">
                  <i className="ri-arrow-left-down-line" />
                </button>
                <button onClick={() => sliderRef.current?.slickNext()} className="slick-arrow style2 default">
                  <i className="ri-arrow-right-up-line" />
                </button>
              </div>
              {/* Satisfied clients group photos */}
              {satisfiedClients.length > 0 ? (
                <div className="client-group-thumb" style={{ display: 'flex', alignItems: 'center' }}>
                  {satisfiedClients.slice(0, 4).map((c, i) => (
                    <img
                      key={c._id}
                      src={c.photo || '/assets/img/testimonial/testi_1_1.png'}
                      alt={c.clientName}
                      style={{
                        width: 36, height: 36, borderRadius: '50%', objectFit: 'cover',
                        border: '2px solid #fff', marginLeft: i > 0 ? -10 : 0,
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="client-group-thumb">
                  <img src="/assets/img/normal/client_group_1-2.png" alt="img" />
                </div>
              )}
              <div className="testi-counter-wrap">
                <h3 className="testi-counter-number">
                  <span className="counter-number">
                    {satisfiedCount !== null ? satisfiedCount : '1.2k'}
                  </span>
                  {satisfiedCount === null ? '+' : ''}
                </h3>
                <p className="testi-counter-text">Satisfied Clients</p>
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <div
              className="testimonial-card background-image"
              style={{
                backgroundImage: "url('/assets/img/bg/testimonial-card-bg1-1.png')",
                backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center', overflow: 'hidden',
              }}
            >
              <h3 className="testimonial-card-title">Ready to Start Your Project?</h3>
              <p className="testimonial-card-text">
                Let's discuss your construction and engineering needs. Our team of experts is ready to deliver world-class solutions tailored to your requirements.
              </p>
              <div className="btn-group">
                <Link to="/contact" className="btn style6">
                  Contact Us Today <i className="ri-arrow-right-up-line" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonial
