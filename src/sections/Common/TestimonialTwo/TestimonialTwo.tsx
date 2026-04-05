import Slider from "react-slick";
import { useTestimonials } from "../../../hooks/useTestimonials";

const TestimonialTwo = () => {
  const { testimonials, satisfiedClients } = useTestimonials()
  const items = testimonials

  if (items.length === 0) return null

  const settings = {
    dots: true, infinite: true, speed: 1500, slidesToShow: 3, slidesToScroll: 1,
    autoplay: true, autoplaySpeed: 5000, focusOnSelect: true, arrows: false,
    centerMode: true, centerPadding: '0', initialSlide: 1,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2, dots: false } },
      { breakpoint: 576, settings: { slidesToShow: 1, dots: false } },
    ],
  }

  const Stars = ({ rating }: { rating: number }) => (
    <>
      {[1,2,3,4,5].map(i => (
        <i key={i} className={`ri-star-${i <= rating ? 'fill' : 'line'}`} />
      ))}
    </>
  )

  return (
    <div className="testimonial-area-3 overflow-hidden">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-7 testimonial-extra-padding">
            <div className="title-area text-lg-start text-center services-title-area testimonial-area-bottom-space-row content-text-extra-style service-testimonial-align">
              <span className="sub-title">
                <img src="/assets/img/icon/section-subtitle-icon.svg" alt="" />
                Testimonials
              </span>
              <h2 className="sec-title">What client saying about us</h2>
            </div>
          </div>
          <div className="col-lg-auto">
            <div className="sec-btn btn-wrap">
              {satisfiedClients.length > 0 ? (
                <div className="client-group-thumb" style={{ display: 'flex', alignItems: 'center' }}>
                  {satisfiedClients.slice(0, 4).map((c, i) => (
                    <img key={c._id} src={c.photo || '/assets/img/testimonial/testi_2_1.png'} alt={c.clientName}
                      style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', marginLeft: i > 0 ? -10 : 0 }} />
                  ))}
                </div>
              ) : (
                <div className="client-group-thumb">
                  <img src="/assets/img/normal/client_group_1-2.png" alt="img" />
                </div>
              )}
              <div className="testi-counter-wrap">
                <h3 className="testi-counter-number">
                  <span className="counter-number">{satisfiedClients.length > 0 ? satisfiedClients.length : 2}</span>
                  {satisfiedClients.length === 0 ? 'm+' : ''}
                </h3>
                <p className="testi-counter-text">Success Peoples</p>
              </div>
            </div>
          </div>
        </div>

        <Slider {...settings} className="row global-carousel testi-slider3 slider-shadow services-slider">
          {items.map(t => (
            <div key={t._id} className="col-lg-4">
              <div className="testi-card style3 client-click-slider-gap">
                <div className="testi-card-thumb">
                  <img src={t.photo || '/assets/img/testimonial/testi_2_1.png'} alt={t.clientName} />
                  <div className="media-body">
                    {t.title && <h4 className="testi-card_title">{t.title}</h4>}
                    <div className="testi-card_review">
                      <Stars rating={t.rating} />
                    </div>
                  </div>
                </div>
                <div className="testi-card_content">
                  <p className="testi-card_text">{t.text}</p>
                  <div className="testi-card-profile">
                    <h4 className="testi-profile-title">{t.clientName}</h4>
                    {t.designation && <span className="testi-profile-desig">{t.designation}</span>}
                  </div>
                </div>
                <div className="quote-icon">
                  <img src="/assets/img/icon/quote3.svg" alt="img" />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default TestimonialTwo
