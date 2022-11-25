import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Search from '../search/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useDebounce from '../../Hooks/UseDebounce';
import { setSearchTerm } from '../../pages/home/ProductSlice';
import './Navbar.scss';

const Navbar = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const debouncedSearchTerm = useDebounce(search, 300);

  useEffect(() => {
    dispatch(setSearchTerm({ search }));
  }, [debouncedSearchTerm]);

  const handleClick = (navigateTo: string) => {
    navigate(navigateTo);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className='navbar'>
      <div onClick={() => handleClick('/ekart')} className='navbarHeading'>
        E-Kart
      </div>
      <div className='rightContent'>
        <Search value={search} onChange={handleSearch} />
        <ShoppingCartIcon onClick={() => handleClick('ekart/cart')} className='cartIcon' />
      </div>
    </div>
  );
};

export default Navbar;
