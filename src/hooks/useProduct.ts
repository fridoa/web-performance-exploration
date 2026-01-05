
import { PAGE_SIZE } from "@/constants";
import productService from "@/services/product.service";
import { IProduct, ProductListProps } from "@/types/Product";
import { useState } from "react";

export const useProduct = ({
  initialProducts,
  totalProducts,
}: ProductListProps) => {
  const [products, setProducts] = useState<IProduct[]>(initialProducts);
  const [offset, setOffset] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    const newOffset = offset + PAGE_SIZE;

    try {
      const params = `limit=${PAGE_SIZE}&skip=${newOffset}`;
      const data = await productService.getProducts(params);

      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      setOffset(newOffset);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const hasMore = products.length < totalProducts;

  return {
    products,
    hasMore,
    handleLoadMore,
    isLoadingMore,
  };
};
