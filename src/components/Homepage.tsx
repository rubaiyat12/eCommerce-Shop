"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/Redux/favoriteSlice";
import { RootState } from "@/Redux/Store";
import { IProduct } from "@/models";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const LIMIT = 10;

const Homepage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  // Infinite scroll observer
  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new window.IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchProducts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, skip]
  );

  // Fetch paginated products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get<{ products: IProduct[]; total: number }>(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`
      );
      setProducts((prev) => {
        // Filter out duplicate IDs before adding
        const existingIds = new Set(prev.map((p) => p?.id));
        const newProducts = res.data.products.filter((p) => !existingIds.has(p?.id));
        return [...prev, ...newProducts];
      });
      setSkip((prev) => prev + LIMIT);
      setHasMore(products.length + res.data.products.length < res.data.total);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  // Search filter
  const filteredProducts = products.filter((p) =>
    p?.title?.toLowerCase().includes(search.toLowerCase())
  );

  // Favorite toggle
  const handleFavorite = (product: IProduct) => {
    dispatch(toggleFavorite(product));
  };

  //  Check if product is favorite
  const isFavorite = (id?: number) => favorites.some((item) => item.id === id);

  return (
    <>
      {/* Search Bar */}
      <div className="p-4 flex justify-center">
        <input
          type="text"
          placeholder="Search products by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded shadow"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {filteredProducts.map((product, idx) => {
          if (!product) return null;
          const isLast = idx === filteredProducts.length - 1;
          return (
            <Link
              key={product?.id}
              href={`/product/${product?.id}`}
              className="block"
            >
              <div
                className="card border p-4 shadow-md rounded hover:shadow-lg transition relative group"
                ref={isLast ? lastProductRef : undefined}
              >
                <img
                  src={product?.thumbnail}
                  alt={product?.title}
                  className="w-full h-48 object-cover mb-2"
                />
                <h4 className="font-bold text-lg">{product?.title}</h4>
                <p className="text-gray-600">{product?.category}</p>
                <p className="text-green-600 font-semibold">${product?.price}</p>
                <p className="text-yellow-500">Rating: {product?.rating}</p>
                <Button
                  variant={isFavorite(product?.id) ? "destructive" : "outline"}
                  className="mt-2 w-full flex items-center gap-2 z-10"
                  onClick={e => {
                    e.preventDefault(); 
                    handleFavorite(product);
                  }}
                >
                  <Heart
                    size={18}
                    fill={isFavorite(product?.id) ? "red" : "none"}
                    color={isFavorite(product?.id) ? "white" : "currentColor"}
                    className="transition-colors"
                  />
                  {isFavorite(product?.id) ? "Unfavorite" : "Favorite"}
                </Button>
              </div>
            </Link>
          );
        })}
      </div>
      {loading && <div className="text-center p-4">Loading more products...</div>}
      {error && <div className="text-center text-red-500 p-4">{error}</div>}
      {!hasMore && !loading && (
        <div className="text-center p-4 text-gray-500">No more products.</div>
      )}
    </>
  );
};

export default Homepage;
