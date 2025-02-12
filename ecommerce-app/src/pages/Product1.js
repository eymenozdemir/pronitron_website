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
import { getAProduct, getAllProducts } from '../features/products/productSlice';
import { toast } from 'react-toastify';
import { addProdToCart, getUserCart, deleteUserCart } from '../features/user/userSlice';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import productImg1 from "../images/Picture1.png";
import productImg2 from "../images/Picture2.png";
import productImg3 from "../images/Picture3.jpg";

const Product = () => {
    const { t } = useTranslation();
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
    const productState = useSelector(state => state?.product?.singleproduct);
    const productsState = useSelector(state => state?.product?.product);
    const cartState = useSelector(state => state?.user?.cartProducts);
    const [photoState, setPhotoState] = useState(productImg1);

    const productImages = [
        { url: productImg1 },
        { url: productImg2 },
        { url: productImg3 }
    ];

    const getTokenFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer")).token
  : null;

  const config2 = {
      headers: {
      Authorization: `Bearer ${
          getTokenFromLocalStorage !== null ? getTokenFromLocalStorage : ""
      }`,
      Accept: "application/json",
      User: JSON.parse(localStorage.getItem("customer"))?._id,
      },
  };

    useEffect(() => {
        dispatch(getAProduct(getProductId));
        dispatch(getUserCart(config2));
        dispatch(getAllProducts());
    }, []);

    useEffect(() => {
        for (let index = 0; index < cartState?.length; index++) { //cartState.length vardı koşulda
            if(getProductId===cartState[index]?.productId?._id){
                setAlreadyAdded(true);
            }
        };
    }, []);

    const uploadCart = () => {
        dispatch(deleteUserCart(config2));
        let tempPrice = 0;
        if(productState?.price !== null){
            tempPrice = productState?.price
        };
        let tempCurrency = "USD";
        if(productState?.currency !== ""){
            tempCurrency = productState?.currency
        };
        dispatch(addProdToCart({productId: productState?._id, setup, service, quantity, currency: tempCurrency, price: tempPrice, config:config2}));
        navigate('/checkout');
    }
    
    const [otherProduct, setOtherProduct] = useState([]);
    //related için istenen fonksiyonu sor ve ona göre burayı düzenle
    useEffect(() => {
        let data = [];
        for (let index = 0; index < productsState?.length; index++) { //cartState.length vardı koşulda
            const element = productsState[index];
            if (element.category === productState?.category) {
                data.push(element);
            }
            setOtherProduct(data);
            if (data.length == 3) {
                break;
            }
        }            
        setPhotoState(productState?.images[0]?.url)
    }, [productState]);

    const props = {
        width: 600,
        height: 500,
        zoomWidth: 600,
        img: photoState ? photoState : noImageIcon
    };

    const productDetails = {
        title: "Distek Symphony 7100 Bathless Dissolution System with Evolution 4300 Autosampler and Syringe Pump",
        itemId: "DS-00-7100",
        condition: "Refurbished",
        availability: "In Stock",
        manufacturer: "Distek",
        price: "Request Quote/Offer",
        warranty: "Warranty Included, Onsite/Remote Installation and Training Available",
        shipping: {
            domestic: "3-5 business days",
            international: "5-10 business days"
        },
        specifications: [
            { type: "Dissolution Vessels", value: "Up to Eight 1L Vessels" },
            { type: "Volume", value: "500 – 1000 mL Programmable (30 – 100 mL utilizing the Distek Small Volume Conversion Kit)" },
            { type: "Vessel Heating Rate", value: "2°C per Minute" },
            { type: "RPM Control Range", value: "30 – 300 RPM, Digitally Controlled" },
            { type: "RPM Resolution", value: "0.1 RPM" },
            { type: "RPM Accuracy", value: "±1 RPM up to 100 RPM and ±1% >100 RPM" },
            { type: "Motor", value: "Brushless DC" },
            { type: "Vessel Temperature Control", value: "Ambient to 99°C, Independently Controlled High Watt Heater Jackets" },
            { type: "Temperature Resolution", value: "0.01°C" },
            { type: "Temperature Accuracy", value: "±0.25°C up to 45°C (Test Setting: Paddles, 900 mL, 50 RPM)" },
            { type: "Shaft Wobble", value: "Less than 0.010\" / 0.254 mm (Total Indicator Runout)" }
        ],
        description: "The symphony 7100 Bathless Dissolution System is the most advanced dissolution design to date, bringing to market features never before available on a dissolution unit. Building upon Distek's more than 20-year history of bathless technology, the symphony 7100 offers the fastest media heating in the industry. Individual heating jackets and independent motors at each position means that the user can run up to three different methods simultaneously (including temperature and agitation speed).",
        systemIncludes: [
            "Symphony 7100 Bathless Dissolution System with 8 vessels",
            "Evolution 4300 Autosampler",
            "Syringe pump"
        ]
    };

    return (
        <>
            <Meta title={productDetails.title} />
            <BreadCrumb title="Distek Symphony 7100" />
            
            <Container class1="product-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="product-inner-wrapper">
                            <div className="row">
                                {/* Product Images Section */}
                                <div className="col-lg-6 col-12">
                                    <div className="product-image-section">
                                        <div className="main-image">
                                            <ReactImageZoom {...props} />
                                        </div>
                                        <div className="thumbnail-images">
                                            {productImages.map((item, index) => {
                                                return <div key={index}>
                                                    <img
                                                        src={item.url}
                                                        className='img-fluid'
                                                        alt=""
                                                        onClick={() => setPhotoState(item.url)}
                                                    />
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Product Details Section */}
                                <div className="col-lg-6 col-12">
                                    <div className="product-details">
                                        <h1 className="product-title">{productDetails.title}</h1>
                                        
                                        <div className="product-meta">
                                            <div className="meta-item">
                                                <span className="label">Item ID:</span>
                                                <span className="value">{productDetails.itemId}</span>
                                            </div>
                                            <div className="meta-item">
                                                <span className="label">Condition:</span>
                                                <span className="value">{productDetails.condition}</span>
                                            </div>
                                            <div className="meta-item">
                                                <span className="label">Availability:</span>
                                                <span className="value ">{productDetails.availability}</span>
                                            </div>
                                            <div className="meta-item">
                                                <span className="label">Manufacturer:</span>
                                                <span className="value">{productDetails.manufacturer}</span>
                                            </div>
                                        </div>

                                        <div className="price-section">
                                            <h3>{productDetails.price}</h3>
                                        </div>

                                        <div className="warranty-info">
                                            <p>{productDetails.warranty}</p>
                                        </div>

                                        <div className="shipping-info">
                                            <h4>Shipping:</h4>
                                            <p>CAN/US: {productDetails.shipping.domestic}</p>
                                            <p>International: {productDetails.shipping.international}</p>
                                        </div>

                                        <div className="action-buttons">
                                            <button className="button inquiry-btn">Request Quote</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* System Includes Section */}
                            <div className="system-includes-section mt-5">
                                <h2 className="section-heading">System Includes:</h2>
                                <ul className="includes-list">
                                    {productDetails.systemIncludes.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Specifications Section */}
                            <div className="specifications-section mt-5">
                                <h2 className="section-heading">Specifications</h2>
                                <div className="specs-table">
                                    {productDetails.specifications.map((spec, index) => (
                                        <div key={index} className="spec-row">
                                            <div className="spec-type">{spec.type}</div>
                                            <div className="spec-value">{spec.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Description Section */}
                            <div className="description-section mt-5">
                                <h2 className="section-heading">Description</h2>
                                <div className="description-content">
                                    <p>{productDetails.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Product