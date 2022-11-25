import { getDiscountedPrice } from '../../utitlity/utils';
import cs from 'classnames';
import './Card.scss';

interface ICard {
  imageUrl: string;
  title: string;
  key: string | number;
  price: number;
  offer?: number;
  customClass?: string;
  ref?: any;
  onClick: () => void;
}

const Card = ({ imageUrl, title, ref, key, price, offer, customClass = '', onClick }: ICard) => {
  let newPrice = offer ? getDiscountedPrice(price, offer) : price;
  return (
    <div className={cs('cardWrapper', customClass)} onClick={onClick} ref={ref} key={key}>
      <div className='imageContainer'>
        <img src={imageUrl} alt='product Icon' className='image' />
      </div>
      <div className='title'>{title}</div>
      <div className='priceContainer'>
        <span className='price'>Price: ${newPrice}</span>
        {offer && (
          <div>
            <span className='actualPrice'>${price}</span>
            <span className='offer'>{offer}% off</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
