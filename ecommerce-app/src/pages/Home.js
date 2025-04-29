import React, { useEffect, useState, useRef } from "react";
import Marquee from "react-fast-marquee";
import StoreCard from "../components/StoreCard";
import MobileCard from "../components/MobileCard";
import Container from "../components/Container";
import sellBanner from "../images/sell_banner.jpg";
import buyBanner from "../images/buy_banner.jpg";
import serviceBanner from "../images/service-banner.jpg";
import pic1 from "../images/Picture1.png";
import pic2 from "../images/Picture2.png";
import pic3 from "../images/Picture3.jpg";
import pic4 from "../images/Picture4.jpg";
import pic5 from "../images/Picture5.jpg";
import pic6 from "../images/Picture6.jpg";
import pic7 from "../images/Picture7.jpg";
import pic8 from "../images/Picture8.jpg";
import pic9 from "../images/Picture9.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from 'react-router-dom';
import { getProducts } from "../needed/product/productSlice";
import { getAllBanners } from "../needed/banner/bannerSlice";
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllNews } from "../needed/news/newsSlice";
import { getAllSolutions } from "../needed/solutions/solutionsSlice";

const Home = () => {
  const { t, i18n } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });
  const dispatch = useDispatch();
  const { state } = useLocation();
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

  useEffect(() => {
    dispatch(getAllBanners());
    dispatch(getProducts());
    dispatch(getAllNews());
    dispatch(getAllSolutions());
  }, []);

  const productState = useSelector((state) => state?.product?.products);
  const bannerState = useSelector((state) => state?.banner?.banners);
  const newsState = useSelector((state) => state?.news?.news);
  const solutionsState = useSelector((state) => state?.solutions?.solutions);

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

  const handleSlideChange = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
      sliderRef.current.slickPause();
      setTimeout(() => {
        sliderRef.current.slickPlay();
      }, 10000);
    }
  };

  return (
    <>
      <section className="hero-section">
        <Slider ref={sliderRef} {...sliderSettings}>
          {bannerState?.map((banner, index) => (
            <div key={index} className="hero-slide">
              <div className="hero-background">
                <img 
                  src={banner.images[0]?.url} 
                  alt={banner.title.split('[trTranslation]')[langSelection]} 
                  className="hero-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = sellBanner; // Fallback image
                  }}
                />
              </div>
              <div className="hero-content-wrapper">
                <div className="hero-content">
                  <h1 className="slide-title">
                    {banner.title.split('[trTranslation]')[langSelection]}
                  </h1>
                  <p className="slide-description">{banner.description.split('[trTranslation]')[langSelection]}</p>
                  <div className="cta-group">
                    <Link 
                      to={banner.link} 
                      className="cta-button primary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("Learn More")} <span className="arrow">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/*<div className="slider-navigation">
          {slides.map((slide, index) => (
            <button 
              key={index} 
              onClick={() => handleSlideChange(index)}
              className={`nav-item ${currentSlide === index ? 'active' : ''}`}
            >
              {slide.title}
            </button>
          ))}
        </div>

        <div className="quick-links">
          <Link to="/store" className="quick-link">
            <span className="icon">+</span>
            <span className="text">{t("EXPLORE THE NEW STORE")}</span>
          </Link>
          <Link to="/research" className="quick-link">
            <span className="icon">+</span>
            <span className="text">{t("MORE ON RESEARCH SOLUTIONS")}</span>
          </Link>
          <Link to="/biology" className="quick-link">
            <span className="icon">+</span>
            <span className="text">{t("MORE ON CELL BIOLOGY")}</span>
          </Link>
        </div>*/}
      </section>

      {/* Solutions Section */}
      <Container class1="solutions-section py-5">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h2>{t("Our Solutions")}</h2>
          </div>
          <div className="col-12">
            <div className={`row ${solutionsState?.length <= 4 ? 'justify-content-center' : ''}`}>
              {solutionsState?.map((solution) => (
                <div 
                  key={solution._id} 
                  className={`${solutionsState?.length <= 4 ? 'col-md-3 px-4' : 'col-md-4'}`}
                >
                  <div className="solution-card">
                    <img 
                      src={solution.images[0]?.url || "/placeholder-image.jpg"} 
                      alt={solution.title.split('[trTranslation]')[langSelection]} 
                    />
                    <div className="solution-card-content">
                      <h3>{solution.title.split('[trTranslation]')[langSelection]}</h3>
                      <p>{solution.description.split('[trTranslation]')[langSelection]}</p>
                      <Link to={`/solutions/${solution._id}`} className="learn-more">
                        {t("Learn More")} →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Featured Products */}
      <Container class1="featured-products bg-light py-5">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h2>{t("Featured Products")}</h2>
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
              {productState?.map((product, index) => (
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

      {/* News Section */}
      <Container class1="news-section py-5">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h2>{t("Latest News")}</h2>
          </div>
          {newsState?.slice(-4)?.map((news) => (
            <div key={news._id} className="col-md-3">
              <div className="news-card">
                <div className="news-image">
                  <img 
                    src={news.images[0]?.url} 
                    alt={news.title.split('[trTranslation]')[langSelection]}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = pic1; // Fallback image
                    }}
                  />
                  <div className="news-category">{news.category.split('[trTranslation]')[langSelection]}</div>
                </div>
                <div className="news-content">
                  <div className="news-date">{news.date}</div>
                  <h3>{news.title.split('[trTranslation]')[langSelection]}</h3>
                  <p>{news.description.split('[trTranslation]')[langSelection]}</p>
                  <Link to={`/news/${news._id}`} className="read-more">
                    {t("Read More")} →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Partners Section */}
      <Container class1="partners-section py-5">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h2>{t("Our Partners")}</h2>
          </div>
          <div className="col-12 marquee-wrapper">
            <Marquee 
              className="d-flex" 
              gradient={false} 
              speed={40}
              pauseOnHover={true}
              gap={10}
            >
              <div className="partner-logo-container">
                <img src={pic4} alt="partner" className="partner-logo" />
              </div>
              <div className="partner-logo-container">
                <img src={pic5} alt="partner" className="partner-logo" />
              </div>
              <div className="partner-logo-container">
                <img src={pic6} alt="partner" className="partner-logo" />
              </div>
              <div className="partner-logo-container">
                <img src={pic7} alt="partner" className="partner-logo" />
              </div>
              <div className="partner-logo-container">
                <img src={pic8} alt="partner" className="partner-logo" />
              </div>
              <div className="partner-logo-container">
                <img src={pic4} alt="partner" className="partner-logo" />
              </div>
              <div className="partner-logo-container">
                <img src={pic5} alt="partner" className="partner-logo" />
              </div>
            </Marquee>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
