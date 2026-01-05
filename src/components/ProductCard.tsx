"use client";

import Image from "next/image";
import type { IProduct } from "../types/Product";
import { Button, Card, CardBody, CardFooter } from "@heroui/react";
import { Heart } from "lucide-react";
import React from "react";

interface ProductCardProps {
  product: IProduct;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <Card
      shadow="sm"
      className="h-full w-full max-w-87.5 rounded-3xl border-none"
    >
      <CardBody className="overflow-visible p-0">
        <div className="relative flex h-40 w-full items-center justify-center bg-white p-6">
          <Button className="absolute top-4 right-4 z-20 rounded-full bg-white/20 p-2 backdrop-blur-md transition-colors hover:bg-white/40">
            <Heart />
          </Button>

          <div className="relative h-full w-full transition-transform duration-500 ease-in-out hover:scale-110">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index === 0 || index < 4}
            />
          </div>
        </div>
      </CardBody>

      <CardFooter className="flex h-full flex-col items-start justify-between bg-white p-5">
        <div className="w-full">
          <h3 className="line-clamp-1 text-xl font-bold text-gray-900">
            {product.title}
          </h3>

          <div className="my-3 flex">
            <span className="rounded border border-gray-300 px-2 py-1 text-[10px] font-bold text-gray-500 uppercase">
              {product.category}
            </span>
          </div>

          <p className="mb-4 line-clamp-3 text-sm text-gray-500">
            {product.description}
          </p>
        </div>

        <div className="mt-2 flex w-full items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              Price
            </span>
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
          </div>

          <Button
            className="bg-slate-700 font-semibold text-white shadow-lg"
            radius="sm"
            size="lg"
          >
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default React.memo(ProductCard);
