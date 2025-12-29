import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "./layout/Layout"
import MainPage from "./pages/MainPage"
import CategoryPage from "./pages/CategoryPage"
import GuidePage from "./pages/GuidePage"
import DetailPage from "./pages/DetailPage" 
import CartPage from "./pages/CartPage"
import './assets/scss/global.scss'
import ScrollToTop from "./ScrollToTop";

const App = () => {
  return (        
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route 
            path="/" 
            element={<MainPage />}
          />
          <Route
            path="/guide"
            element={<GuidePage />}
          />
          <Route 
            path="/category/:category" 
            element={<CategoryPage />} 
          />
          <Route
            path="/product/:productId"
            element={<DetailPage />}
          />
          <Route 
            path="/cart" 
            element={<CartPage />}
          />
          </Route>    
      </Routes>
    </BrowserRouter>
  )
}

export default App
