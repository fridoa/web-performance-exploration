export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
}

export interface IProductResponse {
  products: IProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductListProps {
  initialProducts: IProduct[];
  totalProducts: number;
}
