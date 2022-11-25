import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import cs from 'classnames';
import { IProduct } from '../../types/ProductTypes';
import { getDiscountedPrice } from '../../utitlity/utils';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { addToCart } from './ProductSlice';
import CustomButton from '../../components/customButton/CustomButton';

const ProductDetails = () => {
  const { id = '' } = useParams();
  const { productList } = useSelector((state: any) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState<IProduct>();
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  let newPrice = productDetails?.offer
    ? getDiscountedPrice(productDetails?.price, productDetails.offer)
    : productDetails?.price;

  useEffect(() => {
    const productDetails = Object.values(productList || {}).find(
      (product: any) => product.id === +id
    ) as IProduct;
    setProductDetails(productDetails);
  }, [id]);

  const handleClick = () => {
    setIsAddedToCart(true);
    dispatch(addToCart({ id }));
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 1000);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className='navigateBack'>
        <CustomButton onClick={handleBack} customClass='goBack'>
          <ArrowBackIcon className='backIcon' />
        </CustomButton>
      </div>
      <div className='productDetailsContainer'>
        <div className={cs('imageContainer', productDetails?.unavailable ? 'unavailable' : '')}>
          <img src={productDetails?.image || ''} alt='product details' />
        </div>
        <div className='productDetails'>
          <div className='productHeading'>{productDetails?.title}</div>
          <div>{productDetails?.description}</div>
          <div className='priceContainer'>
            <span className='price'>Price: ${newPrice}</span>
            {productDetails?.offer && (
              <span>
                <span className='actualPrice'>${productDetails?.price}</span>
                <span className='offer'>{productDetails.offer}% off</span>
              </span>
            )}
          </div>
          <CustomButton
            onClick={handleClick}
            customClass='addToCart'
            disable={isAddedToCart || !!productDetails?.unavailable}
          >
            {isAddedToCart && <CheckCircleOutlineIcon className='circleCheck' />}
            {isAddedToCart ? ' Added to Cart' : 'Add to cart'}
          </CustomButton>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
