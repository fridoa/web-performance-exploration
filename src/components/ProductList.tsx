"use client";

import { useProduct } from "@/hooks/useProduct";
import { ProductListProps } from "@/types/Product";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import { Button } from "@heroui/react";

export default function ProductList({
  initialProducts,
  totalProducts,
}: ProductListProps) {
  const { hasMore, handleLoadMore, isLoadingMore, products } = useProduct({
    initialProducts,
    totalProducts,
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <div key={`${product.id}-${index}`} className="flex justify-center">
            <ProductCard product={product} index={index} />
          </div>
        ))}

        {isLoadingMore &&
          Array.from({ length: 4 }).map((_, index) => (
            <div key={`skeleton-${index}`} className="flex justify-center">
              <ProductSkeleton />
            </div>
          ))}
      </div>

      {hasMore && (
        <div className="flex justify-center py-6">
          <Button
            onClick={handleLoadMore}
            isLoading={isLoadingMore}
            disabled={isLoadingMore}
            className="bg-slate-700 font-semibold text-white shadow-lg"
            size="lg"
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </>
  );
}
