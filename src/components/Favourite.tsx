"use client";

import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { toggleFavorite } from "@/Redux/favoriteSlice";

const FavouritePage: FC = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const handleRemove = (productId: number) => {
    const product = favorites?.find((item) => item.id === productId);
    if (product) {
      dispatch(toggleFavorite(product));
    }
  };

  return (
    <div className="p-4 min-h-screen bg-white text-gray-900 dark:bg-zinc-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Products</h1>
      {favorites?.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          You have no favorite products yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites?.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded shadow-md bg-white dark:bg-zinc-800 dark:border-zinc-700"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h4 className="font-bold text-lg">{product.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Category: {product.category}
              </p>
              <p className="text-green-600 font-semibold">${product.price}</p>
              <p className="text-yellow-500">Rating: {product.rating}</p>
              <button
                className="mt-2 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                onClick={() => handleRemove(product.id)}
              >
                Remove from Favorite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritePage;
