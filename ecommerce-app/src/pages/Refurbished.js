import React, { useRef, useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import refurbishedBanner from "../images/pronitron_about.jpg";
import { Link } from 'react-router-dom';
import { getRefurbisheds } from '../needed/refurbished/refurbishedSlice';
import { useDispatch, useSelector } from 'react-redux';
import pic1 from "../images/Picture1.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Refurbished = () => {
  const { t, i18n } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });
  const dispatch = useDispatch();
  
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const productSliderRef = useRef(null);
  const langSelection = i18n.language === 'en' ? 0 : 1; // 0 for English, 1 for other languages
  const productSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    fade: true,
    pauseOnHover: false,
    cssEase: 'cubic-bezier(0.87, 0, 0.13, 1)',
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.slickPlay();
    }
  }, []);

  useEffect(() => {
    dispatch(getRefurbisheds());
  }, []);


  const refurbishedState = useSelector(state => state?.refurbished?.refurbishedName);

  const refurbishedProducts = [
    {
      id: 1,
      name: "Nutech 3000 GC",
      condition: "Excellent",
      description: t("Fully refurbished gas chromatograph with 1-year warranty. Includes new consumables and full calibration."),
      features: [
        t("New detector installed"),
        t("Calibrated to factory specifications"),
        t("Complete maintenance history"),
        t("Performance guarantee")
      ],
      warranty: "12 months",
      savings: "40%"
    },
    {
      id: 2,
      name: "Thermal Desorber TD-100",
      condition: "Very Good",
      description: t("Professionally restored thermal desorption unit. Thoroughly tested and certified."),
      features: [
        t("Rebuilt pneumatics"),
        t("New electronic components"),
        t("Full system validation"),
        t("Technical support included")
      ],
      warranty: "9 months",
      savings: "35%"
    },
    // Add more refurbished products as needed
  ];

  return (
    <>
      <Meta title={"Refurbished Equipment"} />
      <BreadCrumb title="Refurbished Equipment" />
      
      <Container class1="refurbished-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="refurbished-inner-wrapper">
              {/* Banner Section */}
              <div className="about-banner mb-5">
                <img 
                  src={refurbishedBanner} 
                  alt="Refurbished Equipment" 
                  className="img-fluid"
                />
                <div className="banner-overlay">
                  <h1>{t("Certified Refurbished Equipment")}</h1>
                  <p>{t("Quality Instruments at Competitive Prices")}</p>
                </div>
              </div>

              {/* Introduction Section */}
              <div className="section mb-5">
                <h2 className="section-heading">{t("Why Choose Refurbished?")}</h2>
                <p className="section-text">
                  {t("Our refurbished analytical instruments offer an excellent value proposition, combining reliable performance with significant cost savings. Each instrument undergoes a thorough restoration process and rigorous testing to ensure optimal functionality.")}
                </p>
              </div>

              {/* Benefits Grid */}
              <div className="benefits-grid mb-5">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h4>{t("Quality Assured")}</h4>
                  <p>{t("Comprehensive testing and validation")}</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <h4>{t("Warranty Included")}</h4>
                  <p>{t("Extended warranty coverage")}</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">
                    <i className="fas fa-piggy-bank"></i>
                  </div>
                  <h4>{t("Cost Effective")}</h4>
                  <p>{t("Significant savings vs new equipment")}</p>
                </div>
              </div>

      {/* Featured Products */}
      <Container class1="featured-products bg-light py-5">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h2>{t("Refurbished Products")}</h2>
          </div>
          <div className="position-relative">
            <div className="product-navigation">
              <button 
                className="nav-button prev" 
                onClick={() => productSliderRef.current?.slickPrev()}
              >
                ←
              </button>
              <button 
                className="nav-button next" 
                onClick={() => productSliderRef.current?.slickNext()}
              >
                →
              </button>
            </div>
            <Slider ref={productSliderRef} {...productSliderSettings}>
              {refurbishedState?.map((product, index) => (
                <div key={index} className="product-slide">
                  <div className="product-card">
                    <img 
                      src={product.images[0]?.url} 
                      alt={product.title.split('[trTranslation]')[langSelection]} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = pic1; // Fallback image
                      }}
                    />
                    <div className="product-card-content">
                      <h3>{product.title.split('[trTranslation]')[langSelection]}</h3>
                      <p>{product.description.split('[trTranslation]')[langSelection]}</p>
                      <Link to={`/product/${product._id}`} className="learn-more">
                        {t("View Product")} →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </Container>

              {/* Call to Action */}
              <div className="cta-section text-center">
                <h2>{t("Interested in Our Refurbished Equipment?")}</h2>
                <p>{t("Contact us to learn more about our current inventory and special offers.")}</p>
                <a 
                  href="https://wa.me/905330515767" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="button"
                >
                  {t("Contact Us")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Refurbished; 