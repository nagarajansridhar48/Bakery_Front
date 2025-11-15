import React from "react";
import { Route, Routes } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import PrivateRouter from "./PrivateRouter/PrivateRouter";
import { CartProvider } from "./contexts/CartContext";
import MenuPage from "./pages/Menu/All";
import Aboutus from "./pages/Aboutus/Aboutus";
import MenuItemDetail from "./pages/Menu/MenuItemDetails";
import Wishlist from "./pages/Wishlist/Wishlist";
import Faq from "./pages/FAQ/Faq";


const Routers = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Protected Home */}
          <Route
            index
            element={
              <PrivateRouter>
                <Home />
              </PrivateRouter>
            }
          />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/menu"
            element={
              <PrivateRouter>
                <MenuPage />
              </PrivateRouter>
            }
          />
          <Route path="/menu/:id"
            element={
              <PrivateRouter>
                <MenuItemDetail/>
              </PrivateRouter>
            }
          />
          <Route
            path="/menu/signature-sweets"
            element={
              <PrivateRouter>
                <MenuPage />
              </PrivateRouter>
            }
          />
          <Route
            path="/menu/savory-bites"
            element={
              <PrivateRouter>
                <MenuPage />
              </PrivateRouter>
            }
          />
          <Route
            path="/menu/cakes-pastries"
            element={
              <PrivateRouter>
                <MenuPage />
              </PrivateRouter>
            }
          />
          <Route
            path="/aboutus"
            element={
              <PrivateRouter>
                <Aboutus />
              </PrivateRouter>
            }
          />
          <Route
            path="/faq"
            element={
              <PrivateRouter>
                <Faq />
              </PrivateRouter>
            }
          />
          <Route
            path="/wishlist"
            element={
              <PrivateRouter>
                <Wishlist />
              </PrivateRouter>
            }
          />
        </Route>
      </Routes>
    </CartProvider>
  );
};

export default Routers;
