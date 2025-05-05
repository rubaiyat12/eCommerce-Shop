"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { toggleFavorite } from "@/Redux/favoriteSlice";
import { IProduct } from "@/models";
import ProductCard from "@/components/ProductCard";

const FavouritePage: React.FC = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  
  const handleRemove = (product: IProduct) => {
    dispatch(toggleFavorite(product));
  };

  const isEmpty = !favorites || favorites.length === 0;

  return (
    <main className="p-4 min-h-screen bg-gray-50 dark:bg-zinc-900">
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 text-center">
            Your Favorite Products
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            You have no favorite products yet.
          </p>
        </div>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center">
            Your Favorite Products
          </h1>
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {favorites.map((product: IProduct) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={true}
                  onFavoriteToggle={handleRemove}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default FavouritePage;
