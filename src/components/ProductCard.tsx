"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { IProduct } from "@/models";

interface ProductCardProps {
  product: IProduct;
  isFavorite?: boolean;
  onFavoriteToggle?: (product: IProduct) => void;
  refCallback?: (node: HTMLDivElement | null) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onFavoriteToggle,
  refCallback,
}) => {
  return (
    <div
      ref={refCallback}
      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-md hover:shadow-lg transition group flex flex-col"
    >
      <Link href={`/product/${product.id}`} className="block flex-1">
        <div className="relative w-full aspect-[4/3] rounded-t-lg overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <div className="p-4 flex flex-col gap-1">
          <h4 className="font-bold text-lg truncate">{product.title}</h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{product.category}</p>
          <p className="text-green-600 font-semibold">${product.price}</p>
          <p className="text-yellow-500 text-sm">⭐ {product.rating}</p>
        </div>
      </Link>
      {onFavoriteToggle && (
        <div className="p-4 pt-0">
          <Button
            variant={isFavorite ? "destructive" : "outline"}
            className="w-full flex items-center gap-2"
            onClick={e => {
              e.preventDefault();
              onFavoriteToggle(product);
            }}
          >
            <Heart
              size={18}
              fill={isFavorite ? "red" : "none"}
              color={isFavorite ? "white" : "currentColor"}
              className="transition-colors"
            />
            {isFavorite ? "Unfavorite" : "Favorite"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
