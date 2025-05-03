"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/Redux/favoriteSlice";
import { RootState } from "@/Redux/Store";
import Link from "next/link"; 


interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
}

const Homepage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`);
    const data = await res.json();
    setProducts(prev => [...prev, ...data.products]);
    setLoading(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
        document.documentElement.offsetHeight &&
      !loading
    ) {
      setSkip(prev => prev + 10);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [skip]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFavorite = (product: Product) => {
    dispatch(toggleFavorite(product));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {products.map((product) => {
        const isFav = favorites.find((fav) => fav.id === product.id);
        return (
          <div key={product.id} className="border p-4 rounded shadow-md">
            <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mb-2" />
            <Link href={`/product/${product.id}`}>
  <h4 className="font-bold text-lg hover:underline">{product.title}</h4>
</Link>

            <p className="text-gray-600">Category: {product.category}</p>
            <p className="text-green-600 font-semibold">${product.price}</p>
            <p className="text-yellow-500">Rating: {product.rating}</p>
            <button
              className={`mt-2 p-2 rounded ${isFav ? "bg-red-500" : "bg-blue-500"} text-white`}
              onClick={() => handleFavorite(product)}
            >
              {isFav ? "Remove Favorite" : "Add to Favorite"}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Homepage;
