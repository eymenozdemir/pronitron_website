import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import aboutBanner from "../images/pronitron_about.jpg"; // Make sure to add this image to your assets

const About = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });

  return (
    <>
      <Meta title={t("About Us")}/>
      <BreadCrumb title="About Us" />
      
      <Container class1="about-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="about-inner-wrapper">
              {/* Banner Image Section */}
              <div className="about-banner mb-5">
                <img 
                  src={aboutBanner} 
                  alt="Pronitron Laboratory" 
                  className="img-fluid rounded"
                />
                <div className="banner-overlay">
                  <h1>{t("Excellence in Analytical Solutions")}</h1>
                  <p>{t("Your Trusted Partner in Laboratory Technology")}</p>
                </div>
              </div>

              {/* Vision Section */}
              <div className="section mb-5">
                <h2 className="section-heading">{t("Our Vision")}</h2>
                <p className="section-text">
                  {t("vision text is this yay")}
                </p>
              </div>

              {/* Mission Section */}
              <div className="section mb-5">
                <h2 className="section-heading">{t("Our Mission")}</h2>
                <p className="section-text">
                  {t("mission text is this yay")}
                </p>
              </div>

              {/* Company Overview */}
              <div className="section mb-5">
                <h2 className="section-heading">{t("Company Overview")}</h2>
                <div className="overview-content">
                  <p className="section-text mb-4">
                      {t("overview text is this yay")}
                    </p>
                  <p className="section-text">
                    {t("overview text 2 is this yay")}
                  </p>
                </div>
              </div>

              {/* Key Features */}
              <div className="section mb-5">
                <h2 className="section-heading">{t("Why Choose Us")}</h2>
                <div className="features-grid">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-tools"></i>
                    </div>
                    <h4>{t("Technical Expertise")}</h4>
                    <p>{t("Highly trained technical team with years of experience")}</p>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-headset"></i>
                    </div>
                    <h4>{t("24/7 Support")}</h4>
                    <p>{t("Round-the-clock customer support and service")}</p>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-certificate"></i>
                    </div>
                    <h4>{t("Quality Assurance")}</h4>
                    <p>{t("Certified products meeting international standards")}</p>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-handshake"></i>
                    </div>
                    <h4>{t("Partnership Approach")}</h4>
                    <p>{t("Long-term relationship focus with our clients")}</p>
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

export default About;