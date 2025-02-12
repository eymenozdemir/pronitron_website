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
    const [photoState, setPhotoState] = useState("");

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

    return (
        <>
            <Meta title={productState?.title} />
            <BreadCrumb title={productState?.title} />
            
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
                                            {productState?.images.map((item, index) => {
                                                return <div key={index}>
                                                    <img
                                                        src={item?.url}
                                                        className='img-fluid'
                                                        alt=""
                                                        onClick={() => setPhotoState(item?.url)}
                                                    />
                                                </div>
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Product Details Section */}
                                <div className="col-lg-6 col-12">
                                    <div className="product-details">
                                        <h1 className="product-title">{productState?.title}</h1>
                                        
                                        <div className="product-meta">
                                            <div className="meta-item">
                                                <span className="label">ID:</span>
                                                <span className="value">{productState?._id.substr(productState?._id.length - 6)}</span>
                                            </div>
                                            <div className="meta-item">
                                                <span className="label">Condition:</span>
                                                <span className="value condition-badge">{productState?.condition}</span>
                                            </div>
                                            <div className="meta-item">
                                                <span className="label">Availability:</span>
                                                <span className="value availability-badge">{productState?.availability}</span>
                                            </div>
                                            <div className="meta-item">
                                                <span className="label">Manufacturer:</span>
                                                <span className="value">{productState?.brand}</span>
                                            </div>
                                        </div>

                                        <div className="price-section">
                                            <h3>{productState?.price === 0 || productState?.price === "" || productState?.price === null ? t("RequestQuote") : productState?.currency ? productState?.currency : "USD"} {productState?.price}</h3>
                                        </div>

                                        <div className="warranty-info">
                                            <p>{productState?.warranty}</p>
                                        </div>

                                        <div className="shipping-info">
                                            <h4>Shipping:</h4>
                                            <p>CAN/US: {productState?.shipping?.domestic}</p>
                                            <p>International: {productState?.shipping?.international}</p>
                                        </div>

                                        <div className="action-buttons">
                                            <button className="button inquiry-btn" onClick={() => uploadCart()}>{alreadyAdded ? t("GoCart") : t("AddCart")}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Specifications Section */}
                            <div className="specifications-section mt-5">
                                <h2 className="section-heading">Specifications</h2>
                                <div className="specs-table">
                                    {productState?.specifications.map((spec, index) => (
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
                                    <p>{productState?.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {isDesktop && <>
                <Container class1="featured-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">{t("Featured")}</h3>
                        </div>
                        <ProductCard data={otherProduct}/>
                        <ProductCard />
                        <ProductCard />
                    </div>
                </Container>
            </>}

            {isMobile && <>
                <Container class1="featured-wrapper py-5 home-wrapper-2">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">{t("Featured")}</h3>
                        </div>
                        <MobileCard data={[otherProduct[0],otherProduct[1]]}/>
                        <MobileCard />
                        <MobileCard />
                    </div>
                </Container>
            </>}
        </>
    )
}

export default Product