import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import partnershipBanner from "../images/pronitron_about.jpg";

// Import partner logos
import nutech from "../images/nutech.png";
import uniphos from "../images/uniphos.png";
import markes from "../images/Picture1.png";
import restek from "../images/Picture2.png";

const Partnerships = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });

  const partners = [
    {
      name: "Nutech",
      logo: nutech,
      description: t("Nutech is a leading manufacturer of thermal desorption and air monitoring systems."),
      location: "Taiwan",
      website: "https://www.nutech-tpg.com/"
    },
    {
      name: "Uniphos",
      logo: uniphos,
      description: t("Uniphos specializes in detector tubes and related gas detection equipment."),
      location: "India",
      website: "https://www.uniphosenvirotronic.com/"
    },
    {
      name: "Markes International",
      logo: markes,
      description: t("Markes International is a global leader in thermal desorption technology and time-to-digital conversion."),
      location: "UK",
      website: "https://www.markes.com/"
    },
    {
      name: "Restek",
      logo: restek,
      description: t("Restek is a leading manufacturer of chromatography columns and accessories."),
      location: "USA",
      website: "https://www.restek.com/"
    }
  ];

  return (
    <>
      <Meta title={"Partnerships"} />
      <BreadCrumb title="Partnerships" />
      
      <Container class1="partnership-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="partnership-inner-wrapper">
              {/* Banner Image Section */}
              <div className="about-banner mb-5">
                <img 
                  src={partnershipBanner} 
                  alt="Global Partnerships" 
                  className="img-fluid"
                />
                <div className="banner-overlay">
                  <h1>{t("Global Technology Partners")}</h1>
                  <p>{t("Bringing World-Class Solutions to Turkey")}</p>
                </div>
              </div>

              {/* Introduction Section */}
              <div className="section mb-5">
                <h2 className="section-heading">{t("Our Global Network")}</h2>
                <p className="section-text">
                  {t("We have established strong partnerships with leading manufacturers worldwide to bring the best analytical solutions to our customers. Our partners are chosen for their innovation, quality, and commitment to excellence.")}
                </p>
              </div>

              {/* Partners Grid */}
              <div className="partners-grid">
                {partners.map((partner, index) => (
                  <div key={index} className="partner-card">
                    <div className="partner-logo">
                      <img src={partner.logo} alt={partner.name} />
                    </div>
                    <div className="partner-info">
                      <h3>{partner.name}</h3>
                      <span className="location">{partner.location}</span>
                      <p>{partner.description}</p>
                      <a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="partner-link"
                      >
                        {t("Visit Website")} →
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Partnership Benefits */}
              <div className="section mt-5">
                <h2 className="section-heading">{t("Partnership Benefits")}</h2>
                <div className="benefits-grid">
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <i className="fas fa-globe"></i>
                    </div>
                    <h4>{t("Global Expertise")}</h4>
                    <p>{t("Access to international technology and expertise")}</p>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <i className="fas fa-cogs"></i>
                    </div>
                    <h4>{t("Local Support")}</h4>
                    <p>{t("Immediate technical support and service")}</p>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">
                      <i className="fas fa-medal"></i>
                    </div>
                    <h4>{t("Quality Assurance")}</h4>
                    <p>{t("Guaranteed authentic products and solutions")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Partnerships; 