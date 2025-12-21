import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import HomePage from './pages/index'
import Gallery from './pages/Gallery'
import JewelryBox from './pages/JewelryBox'
import Closet from './pages/Closet'
import Studio from './pages/Studio'
import Wardrobe from './pages/Wardrobe'
import Lookbook from './pages/Lookbook'
import Profile from './pages/Profile'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import StyleFeed from './pages/StyleFeed'
import Stylists from './pages/Stylists'
import StylistProfile from './pages/StylistProfile'
import SearchResults from './pages/SearchResults'
import ShopTheLook from './pages/ShopTheLook'
import BrandPartnerships from './pages/BrandPartnerships'
import CreatorOnboarding from './pages/CreatorOnboarding'
import AdminOrders from './pages/AdminOrders'
import AdminPartnerships from './pages/AdminPartnerships'
import { CartProvider } from './components/cart/CartProvider'
import { LanguageProvider } from './components/LanguageProvider'
import { Toaster } from './components/ui/toaster'
import './App.css'

function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="jewelry" element={<JewelryBox />} />
              <Route path="closet" element={<Closet />} />
              <Route path="studio" element={<Studio />} />
              <Route path="wardrobe" element={<Wardrobe />} />
              <Route path="lookbook" element={<Lookbook />} />
              <Route path="profile" element={<Profile />} />
              <Route path="product/:type/:id" element={<ProductDetail />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="orders" element={<Orders />} />
              <Route path="feed" element={<StyleFeed />} />
              <Route path="stylists" element={<Stylists />} />
              <Route path="stylist/:id" element={<StylistProfile />} />
              <Route path="search" element={<SearchResults />} />
              <Route path="shop-look/:id" element={<ShopTheLook />} />
              <Route path="partnerships" element={<BrandPartnerships />} />
              <Route path="creator-onboarding" element={<CreatorOnboarding />} />
              <Route path="admin/orders" element={<AdminOrders />} />
              <Route path="admin/partnerships" element={<AdminPartnerships />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </CartProvider>
    </LanguageProvider>
  )
}

export default App