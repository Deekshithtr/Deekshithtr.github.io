import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cs from 'classnames';
import Card from '../../components/card/Card';

import { IProduct } from '../../types/ProductTypes';
import './Products.scss';
import Loader from '../../components/loader/Loader';

const Products = () => {
  const navigate = useNavigate();
  const { productList, searchTerm } = useSelector((state: any) => state.product);
  let observer: any = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const limit = 10;

  const options = {
    root: null,
    rootMargin: '20px',
    threshold: 1.0,
  };

  const loadMore = () => {
    if (currentPage * limit < Object.keys(productList || {})?.length) {
      setCurrentPage((page: number) => page + 1);
    }
  };

  const lastElement = useCallback(
    (node: any) => {
      observer = new IntersectionObserver((entries: any) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          loadMore();
          if (node) observer?.unobserve(entry.target);
        }
      }, options);
      if (node) observer.observe(node);
    },
    [observer, productList]
  );

  useEffect(() => {
    if (Object.keys(productList || {}).length) {
      setLoader(true);
      setTimeout(() => {
        const newList = Object.values(productList || {})?.slice(0, currentPage * 10) as IProduct[];
        setProducts(newList);
        setLoader(false);
      }, 1000);
    }
  }, [currentPage, productList]);

  const filteredProducts = useMemo(() => {
    const searchValue = searchTerm?.trim()?.toLowerCase();
    if (!searchValue) return products;
    return Object.values(productList || {})?.filter((product: any) =>
      product.title?.toLowerCase()?.includes(searchValue)
    ) as IProduct[];
  }, [products, searchTerm, productList]);

  const handleImageClick = (id: number) => {
    navigate(`${id}`);
  };

  return (
    <>
      <div className='productList'>
        {filteredProducts?.map((product: IProduct, index: number) => {
          if (products.length === index + 1) {
            return (
              <div ref={lastElement} key={product.id}>
                <Card
                  title={product.title}
                  imageUrl={product.image}
                  key={product.image + product.id}
                  price={product.price}
                  offer={product.offer}
                  onClick={() => handleImageClick(product.id)}
                />
              </div>
            );
          }
          return (
            <Card
              title={product.title}
              imageUrl={product.image}
              key={product.image + product.id}
              price={product.price}
              offer={product.offer}
              customClass={cs(product.unavailable ? 'unavailable' : '')}
              onClick={() => !product.unavailable && handleImageClick(product.id)}
            />
          );
        })}
      </div>
      {loader && <Loader />}
    </>
  );
};

export default Products;
