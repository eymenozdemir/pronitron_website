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
import { services } from "../utils/Data";
import { getAllProducts } from "../features/products/productSlice";
import { getBrands } from "../needed/brand/brandSlice";
import { getCategories } from "../needed/pcategory/pcategorySlice";
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });
  const productState = useSelector((state) => state?.product?.product);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loadCounter, setLoadCounter] = useState(1);
  const [tag, setTag] = useState(null);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);
  const [filtered, setFiltered] = useState([]);
  const [paged, setPaged] = useState([]);
  const [filterCat, setFilterCat] = useState([]);
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const productSliderRef = useRef(null);
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

  const slides = [
    {
      title: "HPLC Made for Tomorrow",
      image: sellBanner,
      link: "/hplc"
    },
    {
      title: "Battling Cancer",
      image: buyBanner,
      link: "/cancer-research"
    },
    {
      title: "World-class CDMO",
      image: serviceBanner,
      link: "/cdmo"
    },
    {
      title: "Sustainable Packaging",
      image: pic1,
      link: "/packaging"
    },
    {
      title: "Food Safety",
      image: pic2,
      link: "/food-safety"
    },
    {
      title: "Digital Lab",
      image: pic3,
      link: "/digital-lab"
    },
    {
      title: "Great Science",
      image: pic4,
      link: "/science"
    }
  ];

  const demoProducts = [
    {
      _id: "demo1",
      title: "High-Performance Mass Spectrometer",
      description: "Advanced mass spectrometry system for precise molecular analysis with high resolution and sensitivity.",
      images: [{ url: pic1 }]
    },
    {
      _id: "demo2",
      title: "Chromatography System",
      description: "Integrated chromatography solution for complex mixture separation and analysis.",
      images: [{ url: pic2 }]
    },
    {
      _id: "demo3",
      title: "NMR Spectrometer",
      description: "State-of-the-art Nuclear Magnetic Resonance spectrometer for molecular structure determination.",
      images: [{ url: pic3 }]
    },
    {
      _id: "demo4",
      title: "X-ray Diffractometer",
      description: "High-precision X-ray diffraction system for crystallographic analysis and material characterization.",
      images: [{ url: pic4 }]
    },
    {
      _id: "demo5",
      title: "Electron Microscope",
      description: "Advanced electron microscopy system for high-resolution imaging and analysis.",
      images: [{ url: pic5 }]
    },
    {
      _id: "demo6",
      title: "Thermal Analyzer",
      description: "Comprehensive thermal analysis system for material characterization and property measurement.",
      images: [{ url: pic6 }]
    },
    {
      _id: "demo7",
      title: "Optical Spectrometer",
      description: "High-performance optical spectroscopy system for molecular analysis and characterization.",
      images: [{ url: pic7 }]
    },
    {
      _id: "demo8",
      title: "Surface Analyzer",
      description: "Advanced surface analysis system for material characterization and property measurement.",
      images: [{ url: pic8 }]
    }
  ];

  const newsItems = [
    {
      id: 1,
      title: "Latest Innovation in Mass Spectrometry",
      date: "March 15, 2024",
      category: "Innovation",
      image: pic1,
      excerpt: "Breakthrough developments in mass spectrometry technology enabling higher precision and faster analysis.",
      link: "/news/mass-spectrometry-innovation"
    },
    {
      id: 2,
      title: "New Research Partnership Announced",
      date: "March 12, 2024",
      category: "Partnership",
      image: pic2,
      excerpt: "Strategic collaboration with leading research institutions to advance analytical capabilities.",
      link: "/news/research-partnership"
    },
    {
      id: 3,
      title: "Advancing Cancer Research",
      date: "March 10, 2024",
      category: "Research",
      image: pic3,
      excerpt: "New analytical tools and methods developed for cancer research applications.",
      link: "/news/cancer-research"
    },
    {
      id: 4,
      title: "Sustainability Initiative Launch",
      date: "March 8, 2024",
      category: "Sustainability",
      image: pic4,
      excerpt: "Launching new eco-friendly laboratory solutions and sustainable practices.",
      link: "/news/sustainability"
    }
  ];

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    let newBrands = [];
    let category = [];
    let newTags = [];
    setFilterCat("All Categories");
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      newBrands.push(element.brand);
      category.push(element.category);
      newTags.push(element.tags);
    }
    setBrands(newBrands);
    setCategories(category);
    setTags(newTags);
  }, [productState]);
  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  //console.log("farkli midir", brands, brandState);


  const pageFunc = (direction) => {
    let start = page * 10 - 10;
    let end = page * 10;

    if (direction === "previous" && page !== 1) {
      start -= 10;
      end -= 10;
      setPage(page - 1);
    } else if (direction === "next" && page !== Math.ceil(filtered.length / 10)) {
      start += 10;
      end += 10;
      setPage(page + 1);
    }

    setPaged(filtered.slice(start, end));
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
          {slides.map((slide, index) => (
            <div key={index} className="hero-slide">
              <div className="hero-background">
                <img src={slide.image} alt={slide.title} className="hero-image" />
              </div>
              <div className="hero-content-wrapper">
                <div className="hero-content">
                  <h1 className="slide-title">
                    {slide.title}
                  </h1>
                  <p className="slide-description">{t("Discover our cutting-edge analytical instruments")}</p>
                  <div className="cta-group">
                    <Link to={slide.link} className="cta-button primary">
                      {t("Explore Products")} <span className="arrow">→</span>
                    </Link>
                    <Link to="/contact" className="cta-button secondary">
                      {t("Learn More")} <span className="arrow">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <div className="slider-navigation">
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
        </div>
      </section>

      {/* Solutions Section */}
      <Container class1="solutions-section py-5">
        <div className="row">
          <div className="col-12 text-center mb-4">
            <h2>{t("Our Solutions")}</h2>
          </div>
          <div className="col-md-4">
            <div className="solution-card">
              <img src={pic1} alt="Analysis" />
              <div className="solution-card-content">
                <h3>{t("Chemical Analysis")}</h3>
                <p>{t("Advanced analytical solutions for precise chemical analysis")}</p>
                <Link to="/category/analysis" className="learn-more">
                  {t("Learn More")} →
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="solution-card">
              <img src={pic2} alt="Spectroscopy" />
              <div className="solution-card-content">
                <h3>{t("Spectroscopy")}</h3>
                <p>{t("Cutting-edge spectroscopy instruments for research")}</p>
                <Link to="/category/spectroscopy" className="learn-more">
                  {t("Learn More")} →
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="solution-card">
              <img src={pic3} alt="Life Sciences" />
              <div className="solution-card-content">
                <h3>{t("Life Sciences")}</h3>
                <p>{t("Solutions for life science research and development")}</p>
                <Link to="/category/life-sciences" className="learn-more">
                  {t("Learn More")} →
                </Link>
              </div>
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
              {[...(productState || []), ...demoProducts].map((product, index) => (
                <div key={index} className="product-slide">
                  <div className="product-card">
                    <img 
                      src={product.images[0]?.url} 
                      alt={product.title} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = pic1; // Fallback image
                      }}
                    />
                    <div className="product-card-content">
                      <h3>{product.title}</h3>
                      <p>{product.description}</p>
                      <Link to={`/product/${product._id}`} className="learn-more">
                        {t("View Details")} →
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
          {newsItems.map((news) => (
            <div key={news.id} className="col-md-3">
              <div className="news-card">
                <div className="news-image">
                  <img src={news.image} alt={news.title} />
                  <div className="news-category">{news.category}</div>
                </div>
                <div className="news-content">
                  <div className="news-date">{news.date}</div>
                  <h3>{news.title}</h3>
                  <p>{news.excerpt}</p>
                  <Link to={news.link} className="read-more">
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
