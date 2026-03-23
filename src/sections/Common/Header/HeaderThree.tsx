import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MultiPageMobileMenu from "../MultiPageMobileMenu/MultiPageMobileMenu";
import { useNavigation } from "../../../hooks/useNavigation";
import { useCompanyInfo } from "../../../hooks/useCompanyInfo";

const HeaderThree = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const { navigation, loading } = useNavigation();
    const { info } = useCompanyInfo();

    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 500);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const primaryAddress = info.addresses?.[0]
    const fullAddress = primaryAddress
      ? [primaryAddress.fullAddress, primaryAddress.city, primaryAddress.state, primaryAddress.country].filter(Boolean).join(', ')
      : ''

    return (
        <div>
            <div className={`popup-search-box ${isPopupOpen ? 'show' : ''}`}>
                <button onClick={() => setIsPopupOpen(false)} className="searchClose"><i className="ri-close-line"></i></button>
                <form action="#"><input type="text" placeholder="Search Here.." /><button type="submit"><i className="ri-search-line"></i></button></form>
            </div>

            <div className={`sidemenu-wrapper ${isSideBarOpen ? 'show' : ''}`}>
                <div ref={sidebarRef} className="sidemenu-content">
                    <button onClick={() => setIsSideBarOpen(false)} className="closeButton sideMenuCls"><i className="ri-close-line"></i></button>
                    <div className="widget widget-about footer-widget">
                        <div className="footer-logo footer-img">
                            <Link to="/"><img src="/assets/img/GamSaj Logo.png" alt={info.companyName} width={100} height={50} style={{ objectFit: 'contain' }} /></Link>
                        </div>
                        {info.aboutText && <p className="about-text mb-4">{info.aboutText}</p>}
                        {info.phone && (
                            <p className="footer-text">
                                <Link to={`tel:${info.phone.replace(/\s/g, '')}`}><i className="ri-phone-line space-right-sidebar-icon"></i>{info.phone}</Link>
                            </p>
                        )}
                        {fullAddress && <p className="contact-text"><i className="ri-map-pin-line space-right-sidebar-icon"></i>{fullAddress}</p>}
                        {info.email && (
                            <p className="footer-text">
                                <Link to={`mailto:${info.email}`}><i className="ri-mail-line space-right-sidebar-icon"></i>{info.email}</Link>
                            </p>
                        )}
                        <div className="social-btn style3 mt-30">
                            {info.twitter && <Link to={info.twitter}><i className="ri-twitter-x-line"></i></Link>}
                            {info.instagram && <Link to={info.instagram}><i className="ri-instagram-line"></i></Link>}
                            {info.facebook && <Link to={info.facebook}><i className="ri-facebook-fill"></i></Link>}
                            {info.linkedin && <Link to={info.linkedin}><i className="ri-linkedin-fill"></i></Link>}
                        </div>
                    </div>
                </div>
            </div>

            <MultiPageMobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} navigation={navigation} loading={loading} />

            <header className="nav-header header-layout4">
                <div className={`sticky-wrapper ${isSticky ? 'sticky' : ''}`}>
                    <div className="menu-area">
                        <div className="logo-bg"></div>
                        <div className="container">
                            <div className="row align-items-center justify-content-lg-start justify-content-between">
                                <div className="col-auto">
                                    <div className="header-logo">
                                        <Link to="/"><img src="/assets/img/GamSaj Logo.png" alt={info.companyName} style={{ maxHeight: '90px', width: 'auto', marginTop: '-20px' }} /></Link>
                                    </div>
                                </div>
                                <div className="col-auto m-lg-auto">
                                    <nav className="main-menu d-none d-lg-inline-block">
                                        <ul>
                                            {loading ? <li><span>Loading...</span></li> : navigation.map((item, index) => (
                                                item.type === 'single' ? (
                                                    <li key={index}><Link to={item.path || '/'}>{item.title}</Link></li>
                                                ) : (
                                                    <li key={index} className="menu-item-has-children">
                                                        <Link to="#">{item.title}</Link>
                                                        <ul className="sub-menu">
                                                            {item.items?.map((sub, si) => <li key={si}><Link to={sub.path}>{sub.title}</Link></li>)}
                                                        </ul>
                                                    </li>
                                                )
                                            ))}
                                        </ul>
                                    </nav>
                                    <div className="navbar-right d-inline-flex d-lg-none">
                                        <button onClick={() => setIsMenuOpen(true)} type="button" className="menu-toggle icon-btn"><i className="ri-menu-line"></i></button>
                                    </div>
                                </div>
                                <div className="col-auto d-xl-block d-none">
                                    <div className="header-button">
                                        {info.phone && (
                                            <div className="navbar-right-desc">
                                                <div className="icon-btn"><i className="ri-phone-fill"></i></div>
                                                <div className="navbar-right-desc-details">
                                                    <h6 className="title">Call us any time</h6>
                                                    <Link className="link" to={`tel:${info.phone.replace(/\s/g, '')}`}>{info.phone}</Link>
                                                </div>
                                            </div>
                                        )}
                                        <Link to="/about" className="btn style2 d-xxl-flex d-none">GET IN TOUCH <i className="ri-arrow-right-up-line"></i></Link>
                                        <button onClick={() => setIsPopupOpen(true)} type="button" className="search-btn searchBoxToggler simple-icon"><i className="ri-search-line"></i></button>
                                        <button onClick={() => setIsSideBarOpen(true)} type="button" className="sidebar-btn sideMenuToggler simple-icon"><i className="ri-grid-fill"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default HeaderThree;
