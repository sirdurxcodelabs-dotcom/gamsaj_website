import { useState } from "react";
import { Link } from "react-router-dom";
import { NavigationGroup } from "../../../hooks/useNavigation";

interface Props {
    isMenuOpen: boolean;
    setIsMenuOpen: (v: boolean) => void;
    navigation: NavigationGroup[];
    loading?: boolean;
}

const MultiPageMobileMenu = ({ isMenuOpen, setIsMenuOpen, navigation, loading }: Props) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    return (
        <div className={`mobile-menu-wrapper ${isMenuOpen ? 'body-visible' : ''}`}>
            <div className="mobile-menu-area">
                <div className="mobile-logo">
                    <Link to="/">
                        <img src="/assets/img/GamSaj Logo.png" alt="GamSaj" style={{ maxHeight: '60px', width: 'auto' }} />
                    </Link>
                    <button onClick={() => setIsMenuOpen(false)} className="menu-toggle">
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                <div className="mobile-menu">
                    {loading ? (
                        <ul><li><span>Loading...</span></li></ul>
                    ) : (
                        <ul>
                            {navigation.map((item, index) => (
                                item.type === 'single' ? (
                                    <li key={index}>
                                        <Link to={item.path || '/'} onClick={() => setIsMenuOpen(false)}>
                                            {item.title}
                                        </Link>
                                    </li>
                                ) : (
                                    <li key={index} className={`menu-item-has-children submenu-item-has-children ${openIndex === index ? 'active-class' : ''}`}>
                                        <Link to="#" onClick={() => toggle(index)}>
                                            {item.title} <span className="mean-expand-class"></span>
                                        </Link>
                                        <ul
                                            className={`sub-menu submenu-class ${openIndex === index ? 'menu-open' : ''}`}
                                            style={{
                                                display: openIndex === index ? 'block' : 'none',
                                                opacity: openIndex === index ? 1 : 0,
                                                transition: 'opacity 0.3s ease',
                                            }}
                                        >
                                            {item.items?.map((sub, si) => (
                                                <li key={si}>
                                                    <Link to={sub.path} onClick={() => setIsMenuOpen(false)}>
                                                        {sub.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                )
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MultiPageMobileMenu;
