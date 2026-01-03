import { IProduct } from "@/types/Product";
import endpoint from "./endpoint.constant";
import instance from "@/lib/axios/instance";

const productService = {
  getProducts: async (params: string = "limit=0"): Promise<IProduct[]> => {
    const url = params ? `${endpoint.PRODUCTS}?${params}` : endpoint.PRODUCTS;
    const response = await instance.get(url);

    return response.data.products || [];
  },
};

export default productService;
