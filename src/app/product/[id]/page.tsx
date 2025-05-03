// /app/product/[id]/page.tsx

import React from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  stock: number;
  rating: number;
  images: string[];
}

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

const ProductDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params; // ✅ Await the params before use
  const product = await getProduct(id);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{product.title}</h1>
      <p className="text-sm text-gray-500">{product.description}</p>
      <div className="flex gap-4 mt-4">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-48 h-48 object-cover"
        />
        <div>
          <p className="text-lg font-semibold">Price: ${product.price}</p>
          <p>Brand: {product.brand}</p>
          <p>Stock: {product.stock}</p>
          <p>Rating: {product.rating}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
