import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import refurbishedBanner from "../images/pronitron_about.jpg";
import { Link } from 'react-router-dom';

const Refurbished = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });

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

              {/* Products Grid */}
              <div className="section mb-5">
                <h2 className="section-heading">{t("Available Equipment")}</h2>
                <div className="refurbished-products-grid">
                  {refurbishedProducts.map((product) => (
                    <div key={product.id} className="refurbished-product-card">
                      <div className="product-header">
                        <h3>{product.name}</h3>
                        <span className="condition-badge">{product.condition}</span>
                      </div>
                      <div className="product-body">
                        <p className="description">{product.description}</p>
                        <ul className="features-list">
                          {product.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                        <div className="product-footer">
                          <div className="warranty">
                            <i className="fas fa-shield-alt"></i>
                            <span>{product.warranty} {t("Warranty")}</span>
                          </div>
                          <div className="savings">
                            <i className="fas fa-tags"></i>
                            <span>{t("Save up to")} {product.savings}</span>
                          </div>
                        </div>
                      </div>
                      <Link to={`/contact`} className="inquiry-button">
                        {t("Request Information")}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="cta-section text-center">
                <h2>{t("Interested in Our Refurbished Equipment?")}</h2>
                <p>{t("Contact us to learn more about our current inventory and special offers.")}</p>
                <Link to="/contact" className="button">
                  {t("Contact Us")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Refurbished; 