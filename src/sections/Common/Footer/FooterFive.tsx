import { Link } from "react-router-dom";
import { useCompanyInfo } from "../../../hooks/useCompanyInfo";

const FooterFive = () => {
    const { info } = useCompanyInfo();
    const addr0 = info.addresses?.[0]
    const addr1 = info.addresses?.[1]
    const fmt = (a: typeof addr0) => a ? [a.fullAddress, a.city, a.state, a.country].filter(Boolean).join(', ') : ''

    return (
        <footer
            className="footer-wrapper footer-layout4 background-image"
            style={{ backgroundImage: "url('/assets/img/bg/footer-bg1-1.png')" }}
        >
            <div className="container">
                <div className="footer-top-1">
                    <div className="footer-logo">
                        <Link to="/">
                            <img src="/assets/img/GamSaj Logo.png" alt={info.companyName} style={{ maxHeight: '90px', width: 'auto' }} />
                        </Link>
                    </div>
                    <div className="subscribe-box">
                        <p className="subscribe-box_text">
                            Subscribe for project updates and construction industry insights.
                        </p>
                        <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
                            <input className="form-control" type="email" placeholder="Enter your email..." required />
                            <button type="submit" className="btn style2">
                                SUBSCRIBE <i className="ri-arrow-right-up-line" />
                            </button>
                        </form>
                    </div>
                </div>
                <div className="widget-area">
                    <div className="row justify-content-between">
                        <div className="col-md-6 col-xl-3">
                            <div className="widget widget-about footer-widget">
                                <h3 className="widget_title">About {info.companyName}</h3>
                                {info.aboutText && <p className="about-text">{info.aboutText}</p>}
                                {info.foundedYear && <h4 className="about-year">Since {info.foundedYear}</h4>}
                                {info.rcNumber && (
                                    <>
                                        <h5 className="about-subtitle">RC NUMBER</h5>
                                        <p className="about-text"><span className="text-theme">{info.rcNumber}</span></p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-auto">
                            <div className="widget widget_nav_menu footer-widget">
                                <h3 className="widget_title">Useful Links</h3>
                                <div className="menu-all-pages-container grid-style">
                                    <ul className="menu">
                                        <li><Link to="/about">About Us</Link></li>
                                        <li><Link to="/service">What We Do</Link></li>
                                        <li><Link to="/service">News & Article</Link></li>
                                        <li><Link to="/service">Success Story</Link></li>
                                        <li><Link to="/service">FAQ's</Link></li>
                                    </ul>
                                    <ul className="menu">
                                        <li><Link to="/team">Our Team</Link></li>
                                        <li><Link to="/service">Careers</Link></li>
                                        <li><Link to="/service">Testimonials</Link></li>
                                        <li><Link to="/contact">Privacy Policy</Link></li>
                                        <li><Link to="/contact">Terms of use</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-auto">
                            <div className="widget footer-widget widget-contact">
                                {addr0 && fmt(addr0) && (
                                    <>
                                        <h3 className="widget_title">{addr0.label || 'Headquarters'}</h3>
                                        <p className="contact-text">{fmt(addr0)}</p>
                                    </>
                                )}
                                {addr1 && fmt(addr1) && (
                                    <>
                                        <h3 className="widget_title">{addr1.label || 'Branch Office'}</h3>
                                        <p className="contact-text">{fmt(addr1)}</p>
                                    </>
                                )}
                                {info.email && (
                                    <>
                                        <h3 className="widget_title">Email Address</h3>
                                        <p className="footer-text">
                                            <Link to={`mailto:${info.email}`}>{info.email}</Link>
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-auto">
                            <div className="widget footer-widget">
                                {(info.phone || info.phoneSecondary) && (
                                    <>
                                        <h3 className="widget_title">Phone Number</h3>
                                        {info.phone && (
                                            <p className="footer-text">
                                                <Link to={`tel:${info.phone.replace(/\s/g, '')}`}>{info.phone}</Link>
                                            </p>
                                        )}
                                        {info.phoneSecondary && (
                                            <p className="footer-text">
                                                <Link to={`tel:${info.phoneSecondary.replace(/\s/g, '')}`}>{info.phoneSecondary}</Link>
                                            </p>
                                        )}
                                    </>
                                )}
                                {(info.facebook || info.twitter || info.instagram || info.linkedin) && (
                                    <>
                                        <h3 className="widget_title">Follow Us</h3>
                                        <div className="social-btn style2">
                                            {info.twitter && <Link to={info.twitter}><i className="ri-twitter-x-line" /></Link>}
                                            {info.instagram && <Link to={info.instagram}><i className="ri-instagram-line" /></Link>}
                                            {info.facebook && <Link to={info.facebook}><i className="ri-facebook-fill" /></Link>}
                                            {info.linkedin && <Link to={info.linkedin}><i className="ri-linkedin-fill" /></Link>}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="copyright-wrap">
                    <div className="row gy-3 justify-content-md-between justify-content-center">
                        <div className="col-auto align-self-center">
                            <p className="copyright-text text-center">
                                © {new Date().getFullYear()} <Link to="/">{info.companyName}</Link> | All rights reserved{info.rcNumber ? ` | RC: ${info.rcNumber}` : ''}
                            </p>
                        </div>
                        <div className="col-auto">
                            <div className="footer-links">
                                <Link to="/contact">Terms & Condition</Link>
                                <Link to="/contact">Privacy Policy</Link>
                                <Link to="/contact">Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterFive;
