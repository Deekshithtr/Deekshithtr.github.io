import React from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { Products, ProductDetails, Cart } from './pages/home';

const RouteComponent: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/ekart' element={<Products />} />
        <Route path='ekart/products/:id' element={<ProductDetails />} />
        <Route path='ekart/cart' element={<Cart />} />
        <Route path="*" element={<Navigate to="/ekart" replace/>}  />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteComponent;
