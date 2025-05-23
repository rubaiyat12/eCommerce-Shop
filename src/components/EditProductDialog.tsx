"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil } from "lucide-react";
import { toast } from "sonner"; 
import { IProduct } from "@/models";
import axios from "axios";

export const EditProductDialog = ({
  product,
  onProductUpdate,
}: {
  product: IProduct;
  onProductUpdate: (product: IProduct) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: product.title,
    description: product.description,
    price: product.price,
    brand: product.brand,
    stock: product.stock,
    category: product.category || "",
  });
  const [loading, setLoading] = useState<boolean>(false);
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
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      const res = await axios.patch(
        `https://dummyjson.com/products/${product.id}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      onProductUpdate(res.data);
      setOpen(false);
      toast.success("Edit successful", {
        description: "Product updated successfully.",
        position: "top-right",
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError("Failed to update product.");
      }
      toast.error("Failed to update product", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      brand: product.brand,
      stock: product.stock,
      category: product.category || "",
    });
  }, [product]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="flex items-center gap-2">
          <Pencil size={18} />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <Input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            min={0}
            step="0.01"
          />
          <Input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
            min={0}
          />
          <Input
            name="brand"
            value={form.brand}
            onChange={handleChange}
            placeholder="Brand"
            required
          />
          <Input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
          {error && <div className="text-red-600 mt-2">{error}</div>}
        </form>
      </DialogContent>
    </Dialog>
  );
};
