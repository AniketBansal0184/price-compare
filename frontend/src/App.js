import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import DailyDealsPage from "./pages/DailyDealsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductComparison from "./components/ProductComparison";
import StoresPage from "./pages/StoresPage";
import PriceAlertsPage from "./pages/PriceAlertsPage";
import ReviewsPage from "./pages/ReviewsPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:category" element={<CategoriesPage />} />
          <Route path="/daily-deals" element={<DailyDealsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/compare" element={<ProductComparison />} />
          <Route path="/stores" element={<StoresPage />} />
          <Route path="/alerts" element={<PriceAlertsPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;