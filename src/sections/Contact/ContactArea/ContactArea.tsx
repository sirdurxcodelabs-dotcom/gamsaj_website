import { Link } from "react-router-dom";
import { useCompanyInfo, formatAddress } from "../../../hooks/useCompanyInfo";

const ContactArea = () => {
  const { info } = useCompanyInfo();
  const addresses = info.addresses?.slice(0, 3) ?? [];

  // Fallback card images per slot
  const cardImages = [
    '/assets/img/normal/contact_page1-1.png',
    '/assets/img/normal/contact_page1-2.png',
    '/assets/img/normal/contact_page1-3.png',
  ];

  if (addresses.length === 0) return null;

  return (
    <section className="contact-page-area space">
      <div className="container">
        <div className="row gy-4 justify-content-center">
          {addresses.map((addr, index) => {
            const formatted = formatAddress(addr);
            return (
              <div key={addr._id || index} className="col-md-6 col-lg-4">
                <div className="contact-page-card bg-smoke">
                  <div className="contact-page-card-details">
                    <h4 className="contact-page-card_title">{addr.label || `Office ${index + 1}`}</h4>
                    {info.phone && (
                      <div className="contact-page-card-text">
                        <i className="ri-phone-line"></i>
                        <Link className="contact-page-card_link" to={`tel:${info.phone.replace(/\s/g, '')}`}>
                          {info.phone}
                        </Link>
                      </div>
                    )}
                    {info.email && (
                      <div className="contact-page-card-text">
                        <i className="ri-mail-line"></i>
                        <Link className="contact-page-card_link" to={`mailto:${info.email}`}>
                          {info.email}
                        </Link>
                      </div>
                    )}
                    {(info.workingDays || info.workingHours) && (
                      <div className="contact-page-card-text">
                        <i className="ri-time-line"></i>
                        {info.workingDays} {info.workingHours}
                      </div>
                    )}
                    {formatted && (
                      <div className="contact-page-card-text">
                        <i className="ri-map-pin-line"></i>
                        {formatted}
                      </div>
                    )}
                  </div>
                  <div className="contact-page-card-thumb">
                    <img src={cardImages[index]} alt={addr.label || `Office ${index + 1}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactArea;
