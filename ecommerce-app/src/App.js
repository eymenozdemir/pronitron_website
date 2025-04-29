import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermAndConditions from './pages/TermAndConditions';
import FAQ from './pages/FAQ';
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import ScrollToTop from './components/ScrollToTop';
import LanguageSelector from './components/LanguageSelector';
import Partnerships from './pages/Partnerships';
import Refurbished from './pages/Refurbished';
import Prolab from './pages/Prolab';
import Maritime from './pages/Maritime';
import ViewSolutions from './pages/ViewSolutions';
import ViewNews from './pages/ViewNews';
import ViewRefurbished from './pages/ViewRefurbished';
import { FaWhatsapp } from 'react-icons/fa';

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
            <Route path="prolab" element={<Prolab />}/>
            <Route path="maritime" element={<Maritime />}/>
            <Route path="product/:id" element={<Product />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />}/>
            <Route path="labalsat-guarantee" element={<PrivacyPolicy />}/>
            <Route path="refund-policy" element={<RefundPolicy />}/>
            <Route path="shipping-policy" element={<ShippingPolicy />}/>
            <Route path="terms-conditions" element={<TermAndConditions />}/>
            <Route path="faq" element={<FAQ />}/>
            <Route path="product-list" element={<ProductList />}/>

            <Route path="solutions/:id" element={<ViewSolutions />} />
            <Route path="news/:id" element={<ViewNews />} />
            <Route path="refurbished/:id" element={<ViewRefurbished />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/905330515767" 
        className="whatsapp-button" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>
    </>
  );
}
// abc
export default App;
