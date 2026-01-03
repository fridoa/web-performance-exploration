"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import productService from "@/services/product.service";
import { IProduct } from "@/types/Product";
import ProductSkeleton from "@/components/ProductSkeleton";

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      console.time("fetchProducts");
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        console.timeEnd("fetchProducts");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="mx-auto max-w-350 px-6 py-12">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Product List
          </h1>
          <p className="text-lg text-gray-500">
            Beautiful, modern product card work, designs, illustrations, and
            graphic elements
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex justify-center">
                  <ProductSkeleton />
                </div>
              ))
            : products.map((product) => (
              
                <div key={product.id} className="flex justify-center">
                  <ProductCard product={product} />
                </div>
              ))}
        </div>
      </main>
    </div>
  );
}
