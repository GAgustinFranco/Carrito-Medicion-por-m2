import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";

export default function App() {
    return (
        <BrowserRouter>
        <nav>
            <Link to="/">Home</Link> | <Link to="/cart">Carrito</Link>
        </nav>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
        </BrowserRouter>
    );
}