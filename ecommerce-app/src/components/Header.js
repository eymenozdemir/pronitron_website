import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import pronitronLogo from "../images/pronitron_logo.png";
import { useDispatch, useSelector } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAProduct, getProducts } from '../needed/product/productSlice';
import { getCategories } from '../needed/pcategory/pcategorySlice';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { FaBars } from 'react-icons/fa';

/*
<div>
                <Link to='/cart' className='d-flex align-items-center gap-10 text-white'>
                  <img src={cart} alt='cart' />
                  <div className='d-flex flex-column gap-10'>
                    <span className='badge bg-white text-dark'>{cartState?.length ? cartState?.length : 0}</span>
                    <p className='mb-0'>$ {total ? total : 0}</p>
                  </div>
                </Link>
              </div>
*/


const Header = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productState = useSelector(state => state?.product?.products);
  const categoryState = useSelector(state => state?.pCategory?.pCategories);
  const tempState = useSelector(state => state);
  const [productOpt, setProductOpt] = useState([]);
  const [paginate, setPaginate] = useState(true);
  //const options = range(0, 1000).map((o) => `Item ${o}`);
  const [total, setTotal] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); // i18n.language contains the language assigned to lng in i18n.js file.
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  console.log(categoryState);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
}, []);

  const chooseLanguage = (e) => {
    e.preventDefault();
    i18n.changeLanguage(e.target.value);   // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
    setSelectedLanguage(e.target.value);
    localStorage.setItem("lang", e.target.value);
}

  useEffect(() => {
    const calculateHeaderHeight = () => {
      const headerElement = document.querySelector('header');
      if (headerElement) {
        const height = headerElement.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    // Calculate initially
    calculateHeaderHeight();

    // Recalculate on window resize
    window.addEventListener('resize', calculateHeaderHeight);

    // Cleanup
    return () => {
      window.removeEventListener('resize', calculateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const headerUpper = document.querySelector('.header-upper');
      if (headerUpper) {
        if (window.scrollY > 0) {
          headerUpper.classList.add('scrolled');
        } else {
          headerUpper.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    dispatch(getAProduct(productId));
    setIsDropdownOpen(false);
  };

  return (
  <>
    {
    <>
      <header className="header-top-strip py-2" style={{borderBottom: "1px solid white"}}>
        <div className="container-xxl">
          <div className="row">
            <div className="col-6 d-flex align-items-center">
              <p className="text-white mb-0">{t("Quote")}</p>
            </div>
            <div className="d-flex align-items-center justify-content-end col-6">
              <select 
                className="text-white mb-0" 
                style={{
                  borderRadius: '4px',
                  padding: '4px 8px',
                  border: '1px solid rgba(255, 255, 255)',
                  background: 'rgba(85,166,120,0.9)',
                  fontSize: '0.9rem',
                  transition: 'all 0.2s ease',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  appearance: 'none',
                  backgroundImage: 'none',
                  backgroundPosition: 'right 6px center',
                  backgroundSize: '6px auto',
                  paddingRight: '24px'
                }}
                defaultValue={selectedLanguage} 
                onChange={chooseLanguage}
              >
                  <option value="en">🇬🇧 EN</option>
                  <option value="tr">🇹🇷 TR</option>
              </select>
              <p className="text-white mb-0">&nbsp; | &nbsp;</p>
              <p className="text-end text-white mb-0"> <a className="text-white" href="tel: +90 533 051 5767"> +90 533 051 5767</a></p>
            </div>
          </div>
        </div>
      </header>

      <header className="header-upper py-3">
        <div className="container-xxl">
          {/* Logo */}
          <div className="logo-column">
            <h2 className="mb-0">
              <Link to='/' className="text-white">
                <img src={pronitronLogo} alt='logo' className="img-fluid" />
              </Link>
            </h2>
          </div>

          {/* Navigation */}
          <div className="nav-column">
            <nav className="header-nav">
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/" className="nav-link">{t("Home")}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">{t("About Us")}</Link>
                </li>
                <li className="nav-item dropdown">
                  <span 
                    className="nav-link dropdown-toggle" 
                    onClick={toggleDropdown}
                    style={{ cursor: 'pointer' }}
                  >
                    {t("Products")}
                  </span>
                  <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                    {categoryState?.map((category) => (
                      <li key={category._id} className="dropdown-title">
                        {category.title}
                        <div className="submenu">
                          {productState?.filter(product => product.category === category.title).map((product) => (
                            <Link 
                              key={product._id} 
                              to={`/product/${product._id}`} 
                              className="dropdown-item"
                              onClick={() => handleProductClick(product._id)}
                            >
                              {product.title}
                            </Link>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="nav-item">
                  <Link to="/prolab" className="nav-link">{t("Prolab")}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/maritime" className="nav-link">{t("Maritime")}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/partnerships" className="nav-link">{t("Partnerships")}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/refurbished" className="nav-link">{t("Refurbished")}</Link>
                </li>
                <li className="nav-item">
                  <Link to="/contact" className="nav-link">{t("Contact")}</Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Search and Mobile Menu */}
          <div className="search-column">
            <div className="input-group">
              <Typeahead
                id='pagination-example'
                onPaginate={() => console.log("Results paginated")}
                onChange={(selected) => {
                  navigate(`/product/${selected[0]?.prod}`);
                  dispatch(getAProduct(selected[0]?.prod));
                }}
                options={productOpt}
                paginate={paginate}
                labelKey={'name'}
                minLength={2}
                placeholder={t("Search")}
                className="mobile-search"
              />
              <span className="input-group-text p-3" id="basic-addon2">
                <BsSearch className='fs-6' />
              </span>
            </div>
            <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
              <FaBars />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <nav className="header-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">{t("Home")}</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">{t("About Us")}</Link>
              </li>
              <li className="nav-item dropdown">
                <span className="nav-link dropdown-toggle">
                  {t("Products")}
                </span>
                <ul className="dropdown-menu">
                  {categoryState?.map((category) => (
                    <li key={category._id} className="dropdown-title">
                      {category.title}
                      <div className="submenu">
                        {productState?.filter(product => product.category === category.title).map((product) => (
                          <Link key={product._id} to={`/product/${product._id}`} className="dropdown-item">
                            {product.title}
                          </Link>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/prolab" className="nav-link">{t("Prolab")}</Link>
              </li>
              <li className="nav-item">
                <Link to="/maritime" className="nav-link">{t("Maritime")}</Link>
              </li>
              <li className="nav-item">
                <Link to="/partnerships" className="nav-link">{t("Partnerships")}</Link>
              </li>
              <li className="nav-item">
                <Link to="/refurbished" className="nav-link">{t("Refurbished")}</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">{t("Contact")}</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>}
    
  </>);
}

export default Header