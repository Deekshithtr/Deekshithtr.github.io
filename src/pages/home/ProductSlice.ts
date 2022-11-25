import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ApiServices from '../../services/ApiServices';
import { IProductInitialState, IProduct } from '../../types/ProductTypes';
import { checkIsPrime } from '../../utitlity/utils';

export const getProducts = createAsyncThunk('products/getProducts', async (url: string) => {
  const response = await ApiServices.get({
    url,
    options: {},
  });
  return response.data;
});

const initialState: IProductInitialState = {
  productList: {},
  loading: false,
  error: '',
  cartDetails: {},
  searchTerm: '',
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductList: (state: any) => {
      state.initialState = initialState;
    },
    addToCart: (state: any, action: any) => {
      const { id } = action.payload;
      if (state.cartDetails?.[id]) {
        state.cartDetails[id].count += 1;
        return;
      }
      state.cartDetails = { ...(state.cartDetails || {}), [id]: { id, count: 1 } };
    },
    setSearchTerm: (state: any, action: any) => {
      const { search } = action.payload;
      state.searchTerm = search;
    },
    setProductUnavailable: (state: any, action: any) => {
      const { productIds } = action.payload;
      productIds?.forEach((id: string) => {
        if (state.productList[id]) {
          state.productList[id].unavailable = true;
        }
      });
    },
  },
  extraReducers: {
    [getProducts.fulfilled as any]: (state: IProductInitialState, action: any) => {
      state.productList = action.payload?.reduce((ac: any, cv: IProduct) => {
        if (checkIsPrime(cv.id)) {
          cv.offer = 5;
        }
        ac[cv.id] = cv;
        return ac;
      }, {});
    },
    [getProducts.rejected as any]: (state: IProductInitialState, action: any) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, clearProductList, addToCart, setSearchTerm, setProductUnavailable } =
  productSlice.actions;

export default productSlice.reducer;
