import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import UnderConstruction from "./pages/error_404";
import Homepage from "./pages/homepage";
import About from "./pages/about";
import ServicesPage from "./pages/services";
import ContactPage from "./pages/contact";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const UNDER_CONSTRUCTION = false; // ⬅️ change this to false later

const Routes = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouterRoutes>
        {UNDER_CONSTRUCTION ? (
          <Route path="*" element={<UnderConstruction />} />
        ) : (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </>
        )}
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
