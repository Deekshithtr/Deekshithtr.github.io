import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RouteComponent from './Routes';
import { getProducts, clearProductList, setProductUnavailable } from './pages/home/ProductSlice';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const { productList } = useSelector((state: any) => state.product);

  useEffect(() => {
    if (!Object.keys(productList || {}).length) {
      dispatch(getProducts('https://fakestoreapi.com/products'));
      setTimeout(() => {
        dispatch(setProductUnavailable({ productIds: [1, 3, 5] }));
      }, 60000);
      return () => {
        dispatch(clearProductList());
      };
    }
  }, []);

  return (
    <div className='mainContainer'>
      <RouteComponent />
    </div>
  );
}

export default App;
