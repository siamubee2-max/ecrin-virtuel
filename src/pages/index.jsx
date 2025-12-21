import Layout from "./Layout.jsx";

import Wardrobe from "./Wardrobe";

import Studio from "./Studio";

import Gallery from "./Gallery";

import JewelryBox from "./JewelryBox";

import Closet from "./Closet";

import Profile from "./Profile";

import StyleFeed from "./StyleFeed";

import Orders from "./Orders";

import AdminOrders from "./AdminOrders";

import Checkout from "./Checkout";

import Stylists from "./Stylists";

import StylistProfile from "./StylistProfile";

import Lookbook from "./Lookbook";

import SearchResults from "./SearchResults";

import ProductDetail from "./ProductDetail";

import BrandPartnerships from "./BrandPartnerships";

import ShopTheLook from "./ShopTheLook";

import AdminPartnerships from "./AdminPartnerships";

import CreatorOnboarding from "./CreatorOnboarding";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Wardrobe: Wardrobe,
    
    Studio: Studio,
    
    Gallery: Gallery,
    
    JewelryBox: JewelryBox,
    
    Closet: Closet,
    
    Profile: Profile,
    
    StyleFeed: StyleFeed,
    
    Orders: Orders,
    
    AdminOrders: AdminOrders,
    
    Checkout: Checkout,
    
    Stylists: Stylists,
    
    StylistProfile: StylistProfile,
    
    Lookbook: Lookbook,
    
    SearchResults: SearchResults,
    
    ProductDetail: ProductDetail,
    
    BrandPartnerships: BrandPartnerships,
    
    ShopTheLook: ShopTheLook,
    
    AdminPartnerships: AdminPartnerships,
    
    CreatorOnboarding: CreatorOnboarding,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Wardrobe />} />
                
                
                <Route path="/Wardrobe" element={<Wardrobe />} />
                
                <Route path="/Studio" element={<Studio />} />
                
                <Route path="/Gallery" element={<Gallery />} />
                
                <Route path="/JewelryBox" element={<JewelryBox />} />
                
                <Route path="/Closet" element={<Closet />} />
                
                <Route path="/Profile" element={<Profile />} />
                
                <Route path="/StyleFeed" element={<StyleFeed />} />
                
                <Route path="/Orders" element={<Orders />} />
                
                <Route path="/AdminOrders" element={<AdminOrders />} />
                
                <Route path="/Checkout" element={<Checkout />} />
                
                <Route path="/Stylists" element={<Stylists />} />
                
                <Route path="/StylistProfile" element={<StylistProfile />} />
                
                <Route path="/Lookbook" element={<Lookbook />} />
                
                <Route path="/SearchResults" element={<SearchResults />} />
                
                <Route path="/ProductDetail" element={<ProductDetail />} />
                
                <Route path="/BrandPartnerships" element={<BrandPartnerships />} />
                
                <Route path="/ShopTheLook" element={<ShopTheLook />} />
                
                <Route path="/AdminPartnerships" element={<AdminPartnerships />} />
                
                <Route path="/CreatorOnboarding" element={<CreatorOnboarding />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}