import React from 'react';
import { Link } from 'react-router-dom';
import { BsLinkedin, BsInstagram, BsYoutube, BsFacebook, BsTwitter } from 'react-icons/bs';
import newsletter from "../images/newsletter.png";
import contact1 from "../images/contact-1.png";
import contact2 from "../images/contact-2.png";
import contact3 from "../images/contact-3.png";
import contact4 from "../images/contact-4.png";
import { createQuery } from '../features/contact/contactSlice';
import { useDispatch } from 'react-redux';
import {useState} from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

  function multiOnClick() {
    dispatch(createQuery({name: "", email: message, mobile: "", comment: "*MAIL LIST*", status: "MAIL LIST"}))
    setMessage('');
  }

  return (
    <>
      <>
        

        <footer className='py-4'>
          <div className="footer1-section container-xxl">
            {/* Social Media Icons - Moved to top */}
            <div className="row mb-4">
              <div className="col-12 d-flex justify-content-center">
                <div className="social-icons">
                  <a 
                    href="https://www.linkedin.com/company/your-company" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon"
                  >
                    <BsLinkedin />
                  </a>
                  <a 
                    href="https://www.instagram.com/your-handle" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon"
                  >
                    <BsInstagram />
                  </a>
                  <a 
                    href="https://www.facebook.com/your-page" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon"
                  >
                    <BsFacebook />
                  </a>
                  <a 
                    href="https://twitter.com/your-handle" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-icon"
                  >
                    <BsTwitter />
                  </a>
                </div>
              </div>
            </div>

            {/* Rest of the footer content */}
            <div className="row">
              <div className="col-1">
              </div>
              <div className="col-4">
                <h4 className='text-white mb-4'>{t("ContactUs")}</h4>
                <div>
                  <address className='text-white fs-6'>Koşuyolu, İsmail Paşa Sk. No:33 <br />34718 Kadıköy/İstanbul</address>
                  <a href="tel:+902164726956" className="mt-2 d-block mb-1 text-white"> <img className='me-2' src={contact2} alt='service-03' /> +90 216 472 6956</a>
                  <a href="fax:+902164726956" className="mt-2 d-block mb-1 text-white"> <img className='me-2' src={contact4} alt='service-03' /> +90 216 472 6958</a>
                  <a href="https://wa.me/905330515767" className="mt-2 d-block mb-1 text-white"> <img className='me-2' src={contact1} alt='service-03' /> +90 533 051 5767</a>
                  <a href="mailto:info@pronitron.com" className="mt-2 d-block mb-1 text-white"> <img className='me-2' src={contact3} alt='service-03' /> info@pronitron.com</a>
                </div>
              </div>
              <div className="col-4">
                <h4 className='text-white mb-4'>{t("Information")}</h4>
                <div className='footer-links d-flex flex-column'>
                  <Link to='/privacy-policy' className="text-white py-1 mb-1">{t("Guarantee")}</Link>
                  <Link to='/shipping-policy' className="text-white py-1 mb-1">{t("Warranties")}</Link>
                  <Link to='/refund-policy' className="text-white py-1 mb-1">{t("BroadScope")}</Link>
                  <Link to='/faq' className="text-white py-1 mb-1">{t("ServiceContracts")}</Link>
                  <Link to='/service-engineer' className="text-white py-1 mb-1">{t("ServiceEng")}</Link>
                  <Link to='/terms-conditions' className="text-white py-1 mb-1">{t("TermsOfService")}</Link>
                </div>
              </div>
              <div className="col-2">
                <h4 className='text-white mb-4'>{t("Account")}</h4>
                <div className='footer-links d-flex flex-column'>
                  <Link to='/my-profile' className="text-white py-1 mb-1">{t("Profile")}</Link>
                  <Link to='/wishlist' className="text-white py-1 mb-1">{t("Wishlist")}</Link>
                  <Link to='/my-profile' className="text-white py-1 mb-1">{t("Orders")}</Link>
                  <Link to="/offer" className="text-white py-1 mb-1">{t("NewOffer")}</Link>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <footer className='py-4'>
          <div className="container-xxl">
            <div className="row align-items-center">
              <div className="col-12">
                <div className="d-flex justify-content-center">
                  <p className="mb-0 text-white text-center">&copy; {new Date().getFullYear()}; {t("Powered By")} <a href="https://www.harmonitechnology.com" target="_blank" rel="noopener noreferrer" className="text-white">Harmoni Technology</a></p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </>

    </>
  );
};

export default Footer