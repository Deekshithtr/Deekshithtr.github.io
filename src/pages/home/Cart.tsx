import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomButton from '../../components/customButton/CustomButton';
import './Products.scss';

const Cart = () => {
  const { cartDetails, productList, searchTerm } = useSelector((state: any) => state.product);
  const navigate = useNavigate();

  const filteredCartDetails = useMemo(() => {
    const searchValue = searchTerm?.trim()?.toLowerCase();
    if (!searchValue) return cartDetails;
    return Object.keys(cartDetails || {})?.reduce((cartDetails: any, key: string) => {
      if (productList?.[key]?.title?.toLowerCase()?.includes(searchValue)) {
        cartDetails[key] = cartDetails[key];
      }
      return cartDetails;
    }, {});
  }, [cartDetails, searchTerm, productList]);

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
      <div className='cartDetails'>
        {Object.keys(filteredCartDetails || {}).map((key: string) => (
          <div className='cartContainer'>
            <div className='thumbnail'>
              <img src={productList[key].image} alt='cart product' />
            </div>
            <div className='cartContent'>
              <div className='cartTitle'>{productList[key].title}</div>
              <div className='cartDescription'>{productList[key].description}</div>
              <div className='priceContainer'>
                <span className='price'>Price: ${productList[key].price}</span>
                <span className='quantity'>Quantity: {filteredCartDetails?.[key]?.count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cart;
