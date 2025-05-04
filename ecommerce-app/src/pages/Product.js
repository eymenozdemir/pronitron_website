import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import MobileCard from '../components/MobileCard';
import ReactImageZoom from 'react-image-zoom';
import Container from '../components/Container';
import noImageIcon from "../images/no-image.png";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAProduct } from '../needed/product/productSlice';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';

const Product = () => {
    const isDesktop = useMediaQuery({ query: '(min-width: 1224px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 1223px)' });
    const [quantity, setQuantity] = useState(1);
    const [setup, setSetup] = useState(false);
    const [service, setService] = useState(false);
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const getProductId = location.pathname.split('/')[2];
    const dispatch = useDispatch();
    const [photoState, setPhotoState] = useState("");
    const { t, i18n } = useTranslation();
    const langSelection = i18n.language === 'en' ? 0 : 1; // 0 for English, 1 for other languages
    const [selectedImage, setSelectedImage] = useState(null);
    const [zoomProps, setZoomProps] = useState({
        width: 600,
        height: 500,
        zoomWidth: 600,
        img: noImageIcon
    });

    useEffect(() => {
        dispatch(getAProduct(getProductId));
    }, []);

    const productState = useSelector(state => state?.product?.productName);
    const tempState = useSelector(state => state);
    console.log(tempState);

    const [otherProduct, setOtherProduct] = useState([]);

    useEffect(() => {
        if (productState?.images?.length > 0) {
            setZoomProps(prev => ({
                ...prev,
                img: productState.images[0].url
            }));
        }
    }, [productState]);

    useEffect(() => {
        if (selectedImage) {
            setZoomProps(prev => ({
                ...prev,
                img: selectedImage.url
            }));
        }
    }, [selectedImage]);

    console.log(selectedImage);

    const getEmbedUrl = (url) => {
        if (!url) return null;
        
        // YouTube
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.includes('youtube.com') 
                ? url.split('v=')[1]?.split('&')[0]
                : url.split('youtu.be/')[1];
            return `https://www.youtube.com/embed/${videoId}`;
        }

        // If it's already an embed URL, return as is
        if (url.includes('embed')) {
            return url;
        }

        return null;
    };

    const handleDownload = async (fileUrl) => {
        try {
            // Check if it's a Google Drive URL
            if (fileUrl.includes('drive.google.com')) {
                // Extract file ID from Google Drive URL
                let fileId = '';
                if (fileUrl.includes('/d/')) {
                    fileId = fileUrl.split('/d/')[1].split('/')[0];
                } else if (fileUrl.includes('id=')) {
                    fileId = fileUrl.split('id=')[1].split('&')[0];
                }

                if (!fileId) {
                    throw new Error('Invalid Google Drive URL');
                }

                // Create direct download URL
                const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
                
                // Create a temporary anchor element
                const link = document.createElement('a');
                link.href = directDownloadUrl;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                
                // Add to document, click, and remove
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                // Handle non-Google Drive URLs
                window.open(fileUrl, '_blank');
            }
        } catch (error) {
            console.error('Download failed:', error);
            // You might want to show an error message to the user here
        }
    };


    return (
        <>
            <Meta title={productState?.title} />
            <BreadCrumb title={productState?.title} />
            
            <Container class1="product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="product-inner-wrapper">
                            {/* Video Section */}
                            {productState?.video && getEmbedUrl(productState.video) && (
                                <div className="video-section mb-5">
                                    <div className="video-container">
                                        <iframe
                                            width="100%"
                                            height="500"
                                            src={getEmbedUrl(productState.video)}
                                            title="Product Video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>
                            )}

                            <div className="row">
                                {/* Product Images Section */}
                                <div className="col-lg-6 col-12">
                                    <div className="product-image-section">
                                        <div className="main-image">
                                            <ReactImageZoom {...zoomProps} />
                                        </div>
                                        <div className="thumbnail-images">
                                            {productState?.images.map((item, index) => {
                                                return <div key={index}>
                                                    <img
                                                        src={item?.url}
                                                        className='img-fluid'
                                                        alt=""
                                                        onClick={() => setSelectedImage(item)}
                                                        style={{ objectFit: "contain", cursor: "pointer" }}
                                                    />
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Product Details Section */}
                                <div className="col-lg-6 col-12">
                                    <div className="product-details">
                                        <h1 className="product-title">{productState?.title.split('[trTranslation]')[langSelection]}</h1>
                                        <h5 className="product-category">{productState?.category.split('[trTranslation]')[langSelection]}</h5>
                                        
                                        <div className="product-meta">
                                            <div className="meta-item">
                                                <span className="label">{t("ID")}:</span>
                                                <span className="value">{productState?.itemID}</span>
                                            </div>
                                            <div className="meta-item">
                                                <span className="label">{t("Condition")}:</span>
                                                <span className="value condition-badge text-white">{productState?.condition.split('[trTranslation]')[langSelection]}</span>
                                            </div>
                                            <div className="meta-item">
                                                <span className="label">{t("Availability")}:</span>
                                                <span className="value availability-badge text-white">{productState?.availability.split('[trTranslation]')[langSelection]}</span>
                                            </div>
                                            <div className="meta-item">
                                                <span className="label">{t("Manufacturer")}:</span>
                                                <span className="value">{productState?.manufacturer.split('[trTranslation]')[langSelection]}</span>
                                            </div>
                                        </div>

                                        <div className="price-section">
                                            <h3>{productState?.price === 0 || productState?.price === "" || productState?.price === null || productState?.price === undefined ? t("RequestQuote") : "USD"} {productState?.price}</h3>
                                        </div>

                                        <div className="shipping-info">
                                            <h4>{t("Shipping")}:</h4>
                                            <p>{productState?.shipping.split('[trTranslation]')[langSelection]}</p>
                                        </div>

                                        <div className="action-buttons text-center">
                                            <a 
                                              href={`https://wa.me/905330515767?text=Hello, I'm interested in ${productState?.title.split('[trTranslation]')[langSelection]} - ${productState?.itemID}`} 
                                              target="_blank" 
                                              rel="noopener noreferrer"
                                              className="button inquiry-btn"
                                            >
                                              {t("Ask Product")}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Description Section */}
                            <div className="specifications-section mt-5">
                                <h2 className="section-heading">{t("Description")}</h2>
                                <div className="specs-table">
                                    {productState?.description.split('[trTranslation]')[langSelection]}
                                </div>
                            </div>

                            {/* Specifications Section */}
                            <div className="specifications-section mt-5">
                                <h2 className="section-heading">{t("Specifications")}</h2>
                                <div className="specs-table">
                                    {productState?.specifications.map((spec, index) => (
                                        <div key={index} className="spec-row">
                                            <div className="spec-type">{spec?.title.split('[trTranslation]')[langSelection]}</div>
                                            <div className="spec-value">{spec?.description.split('[trTranslation]')[langSelection]}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* System Includes Section */}
                            <div className="system-includes-section mt-5">
                                <h2 className="section-heading">{t("System Includes")}:</h2>
                                <ul className="includes-list">
                                    {productState?.systemIncludes.map((item, index) => (
                                        <li key={index}>{item.description.split('[trTranslation]')[langSelection]}</li>
                                    ))}
                                </ul>
                            </div>

                            {productState?.downloadables && productState.downloadables.length > 0 && (
                                <div className="downloadables-section mt-5">
                                    <h2 className="section-heading">{t("Download Documents")}</h2>
                                    <div className="download-buttons">
                                        <button
                                            className="download-btn"
                                            onClick={() => handleDownload(productState.downloadables)}
                                            >
                                                <i className="fas fa-download me-2"></i>
                                                {t("Download Documents")} 
                                            </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </Container>

            
        </>
    )
}

export default Product