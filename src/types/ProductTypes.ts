export interface IProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  offer?: number;
  unavailable?: boolean;
}

export interface IProductInitialState {
  productList: IProductList;
  loading: boolean;
  error?: any;
  cartDetails?: { [key: string]: ICartDetails };
  searchTerm: string;
}

export interface IProductList {
  [key: string]: IProduct;
}

export interface ICartDetails {
  id: string;
  count: number;
}

export interface ICartPayload {
  id: string;
}
