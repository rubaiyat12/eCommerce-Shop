// src/app/product/[id]/page.tsx

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

const getProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
};

const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  const product = await getProduct(params.id);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-sm text-gray-600 mb-4">{product.description}</p>
      <div className="flex gap-4">
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
