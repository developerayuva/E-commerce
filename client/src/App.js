import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ProductState from "./context/Product/ProductState";
import CartState from "./context/Cart/CartState";
import Footer from "./components/footer";
import About from "./components/About";
import CartProducts from "./components/CartProducts";
import UserState from "./context/User/UserState";

function App() {
  return (
    <BrowserRouter>
      <UserState>
        <Navbar />
      </UserState>
        <Routes>
          <Route path="/" element={
              <ProductState>
                <Products />
              </ProductState>
            }/>
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={
              <CartState>
                <CartProducts />
              </CartState>
            }/>            
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
