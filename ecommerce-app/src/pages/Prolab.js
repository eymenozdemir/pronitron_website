import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import aboutBanner from "../images/pronitron_about.jpg"; // Make sure to add this image to your assets
import './Prolab.css'; // Add this import

const Prolab = () => {
  const { t } = useTranslation();
  const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });

  const handleDownload = (fileUrl) => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'ProLab_yazi.pdf'; // Set the download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Meta title={t("Prolab")}/>
      <BreadCrumb title="Prolab" />
      
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
                  <h1>{t("ProLab page title here")}</h1>
                  <p>{t("ProLab page quote here")}</p>
                </div>
              </div>

              {/* Vision Section */}
              <div className="section mb-5">
                <h2 className="section-heading">{t("Prolab")}</h2>
                <p className="section-text">
                  {t("prolab text is this yay 1")}
                </p>
                <p className="section-text">
                  {t("prolab text is this yay 2")}
                </p>
                <p className="section-text">
                  {t("prolab text is this yay 3")}
                </p>
                <p className="section-text">
                  {t("prolab text is this yay 4")}
                </p>
                <p className="section-text">
                  {t("prolab text is this yay 5")}
                </p>
                <p className="section-text">
                  {t("prolab text is this yay 6")}
                </p>
              </div>

              {/* Key Features */}
              <div className="section mb-5">
                <h2 className="section-heading">{t("Prolab Key Features")}</h2>
                <div className="features-grid">
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-tools"></i>
                    </div>
                    <h4>{t("Prolab Key Feature 1 here")}</h4>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-headset"></i>
                    </div>
                    <h4>{t("Prolab Key Feature 2 here")}</h4>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-certificate"></i>
                    </div>
                    <h4>{t("Prolab Key Feature 3 here")}</h4>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">
                      <i className="fas fa-handshake"></i>
                    </div>
                    <h4>{t("Prolab Key Feature 4 here")}</h4>
                  </div>
                </div>
              </div>

              {/* Download Section */}
              <div className="section mb-5">
                <h2 className="section-heading mb-4">{t("Download Documents")}</h2>
                <div className="download-buttons-container">
                  <button 
                    className="download-button text-center"
                    onClick={() => handleDownload('/documents/ProLab_yazi.pdf')}
                  >
                    <i className="fas fa-file-pdf"></i>
                    <span>{t("Download Button Text 1")}</span>
                  </button>
                  <button 
                    className="download-button text-center"
                    onClick={() => handleDownload('/documents/ProLab_yazi.pdf')}
                  >
                    <i className="fas fa-file-pdf"></i>
                    <span>{t("Download Button Text 5")}</span>
                  </button>
                  <button 
                    className="download-button text-center"
                    onClick={() => handleDownload('/documents/ProLab_yazi.pdf')}
                  >
                    <i className="fas fa-file-pdf"></i>
                    <span>{t("Download Button Text 3")}</span>
                  </button>
                  <button 
                    className="download-button text-center"
                    onClick={() => handleDownload('/documents/ProLab_yazi.pdf')}
                  >
                    <i className="fas fa-file-pdf"></i>
                    <span>{t("Download Button Text 4")}</span>
                  </button>
                  <button 
                    className="download-button text-center"
                    onClick={() => handleDownload('/documents/ProLab_yazi.pdf')}
                  >
                    <i className="fas fa-file-pdf"></i>
                    <span>{t("Download Button Text 2")}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Prolab;