"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const initialState = {
  title: "",
  description: "",
  price: "",
  stock: "",
  brand: "",
  category: "",
};

const CreateProduct: React.FC = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (
      !form.title ||
      !form.description ||
      !form.price ||
      !form.stock ||
      !form.brand ||
      !form.category
    ) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };
      const res = await axios.post(
        "https://dummyjson.com/products/add",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Product is created", {
        description: `Product created! ID: ${res.data.id}`,
      });
      setForm(initialState);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to create product.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create product.");
      }
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg bg-white shadow">
      <h2 className="text-2xl font-bold mb-6">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ...form fields as before... */}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
            min={0}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
            min={0}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Brand</label>
          <input
            type="text"
            name="brand"
            value={form.brand}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  );
};

export default CreateProduct;
