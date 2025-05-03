// app/product/[id]/page.tsx

import React from "react";

interface Props {
  params: { id: string };
}

// This must be a Server Component by default in App Router
const ProductDetailsPage = async ({ params }: Props) => {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);
  const product = await res.json();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{product.title}</h1>
      <p className="text-sm text-gray-500">{product.description}</p>
      <div className="flex gap-4 mt-4">
        <img
          src={product.images?.[0]}
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
