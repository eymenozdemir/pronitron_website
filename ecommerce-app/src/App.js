import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Store from './pages/Store';
import CompareProduct from './pages/CompareProduct';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermAndConditions from './pages/TermAndConditions';
import FAQ from './pages/FAQ';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Offer from './pages/Offer';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import ServiceEngineer from './pages/ServiceEngineer';
import ServiceContract from './pages/ServiceContract';
import ScrollToTop from './components/ScrollToTop';
import LanguageSelector from './components/LanguageSelector';
import Partnerships from './pages/Partnerships';
import Refurbished from './pages/Refurbished';
import Product1 from './pages/Product1';
import Product2 from './pages/Product2';
import Product3 from './pages/Product3';
import Product4 from './pages/Product4';

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home/>}/>
            <Route path="about" element={<About />}/>
            <Route path="partnerships" element={<Partnerships />}/>
            <Route path="refurbished" element={<Refurbished />}/>
            <Route path="contact" element={<Contact />}/>
            <Route path="product" element={<Store />}/>
            <Route path="product1" element={<Product1 />}/>
            <Route path="product2" element={<Product2 />}/>
            <Route path="product3" element={<Product3 />}/>
            <Route path="product4" element={<Product4 />}/>
            <Route path="product/:id" element={<Product />} />
            <Route path="cart" element={<PrivateRoutes><Cart /></PrivateRoutes>} />
            <Route path="my-orders" element={<PrivateRoutes><Orders/></PrivateRoutes>} />
            <Route path="my-profile" element={<PrivateRoutes><Profile/></PrivateRoutes>} />
            <Route path="checkout" element={<PrivateRoutes><Checkout /></PrivateRoutes>} />
            <Route path="compare-product" element={<CompareProduct />}/>
            <Route path="wishlist" element={<PrivateRoutes><Wishlist /></PrivateRoutes>}/>
            <Route path="login" element={<OpenRoutes><Login /></OpenRoutes>}/>
            <Route path="forgot-password" element={<ForgotPassword />}/>
            <Route path="signup" element={<OpenRoutes><Signup /></OpenRoutes>}/>
            <Route path="reset-password/:token" element={<ResetPassword />}/>
            <Route path="privacy-policy" element={<PrivacyPolicy />}/>
            <Route path="labalsat-guarantee" element={<PrivacyPolicy />}/>
            <Route path="refund-policy" element={<RefundPolicy />}/>
            <Route path="shipping-policy" element={<ShippingPolicy />}/>
            <Route path="terms-conditions" element={<TermAndConditions />}/>
            <Route path="faq" element={<FAQ />}/>
            <Route path="product-list" element={<ProductList />}/>
            <Route path="service-engineer" element={<ServiceEngineer />}/>
            <Route path="service-contract" element={<ServiceContract />}/>
            <Route path="offer" element={<PrivateRoutes><Offer /></PrivateRoutes>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
// abc
export default App;
