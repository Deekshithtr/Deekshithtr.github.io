import React from 'react';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { Products, ProductDetails, Cart } from './pages/home';

const RouteComponent: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index path='/Ekart' element={<Products />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="*" element={<Navigate to="/Ekart" replace/>}  />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteComponent;
