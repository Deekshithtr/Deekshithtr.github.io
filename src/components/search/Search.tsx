import * as React from 'react';
import './Search.scss';

interface ISearch {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, onChange }: ISearch) => {
  return <input value={value} onChange={onChange} className='search' placeholder='Search' />;
};

export default Search;
