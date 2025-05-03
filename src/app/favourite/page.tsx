"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Redux/Store";
import { toggleFavorite } from "@/Redux/favoriteSlice";

const FavouritePage: React.FC = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const handleRemove = (productId: number) => {
    const product = favorites.find((item) => item.id === productId);
    if (product) {
      dispatch(toggleFavorite(product));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Favorite Products</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-600">You have no favorite products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow-md">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover mb-2"
              />
              <h4 className="font-bold text-lg">{product.title}</h4>
              <p className="text-gray-600">Category: {product.category}</p>
              <p className="text-green-600 font-semibold">${product.price}</p>
              <p className="text-yellow-500">Rating: {product.rating}</p>
              <button
                className="mt-2 bg-red-500 text-white p-2 rounded"
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
