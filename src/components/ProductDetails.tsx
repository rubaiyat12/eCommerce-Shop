"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "@/Redux/favoriteSlice";
import { RootState } from "@/Redux/Store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EditProductDialog } from "@/components/EditProductDialog";
import { IProduct } from "@/models";




 const ProductDetails=({ product }: { product: IProduct })=> {
  const router = useRouter();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);
 

  const [currentProduct, setCurrentProduct] = useState<IProduct>(product);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  
  const getFavoriteProduct = (product: IProduct): IProduct => ({
    ...product,
    id: product.id,
    title: product.title,
    price: product.price,
    rating: product.rating,
    category: product.category ?? "",
    thumbnail: product.images?.[0] ?? "", 
  });

  const isFavorite = favorites.some((item) => item.id === currentProduct?.id);

  const handleFavorite = () => {
    dispatch(toggleFavorite(getFavoriteProduct(currentProduct)));
  };

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch(`https://dummyjson.com/products/${currentProduct.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setDeleteError(err.message);
      } else {
        setDeleteError("Failed to delete product.");
      }
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{currentProduct?.title}</h1>
      <p className="text-sm text-gray-500 mb-4">{currentProduct?.description}</p>
      <div className="flex gap-6 flex-col md:flex-row">
        <div className="flex-shrink-0">
          <img
            src={currentProduct?.images[0]}
            alt={currentProduct?.title}
            className="w-64 h-64 object-cover rounded"
          />
        </div>
        <div>
          <p className="text-lg font-semibold mb-2">Price: ${currentProduct?.price}</p>
          <p className="mb-1">Brand: {currentProduct?.brand}</p>
          <p className="mb-1">Stock: {currentProduct?.stock}</p>
          <p className="mb-1">Rating: {currentProduct?.rating}</p>
          {currentProduct?.images.length > 1 && (
            <div className="mt-4 flex gap-2 flex-wrap">
              {currentProduct.images.slice(1).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${currentProduct.title} ${idx + 2}`}
                  className="w-20 h-20 object-cover rounded border"
                />
              ))}
            </div>
          )}
          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            {/* Favorite Button */}
            <Button
              variant={isFavorite ? "destructive" : "outline"}
              onClick={handleFavorite}
              className="flex items-center gap-2"
            >
              <Heart
                size={18}
                fill={isFavorite ? "red" : "none"}
                color={isFavorite ? "white" : "currentColor"}
              />
              {isFavorite ? "Unfavorite" : "Favorite"}
            </Button>
            {/* Edit Button (Dialog) */}
            <EditProductDialog
              product={currentProduct}
              onProductUpdate={setCurrentProduct}
            />
            {/* Delete Button with AlertDialog */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="flex items-center gap-2"
                  disabled={deleting}
                >
                  <Trash2 size={18} />
                  {deleting ? "Deleting..." : "Delete"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this product.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={deleting}>No</AlertDialogCancel>
                  <AlertDialogAction
                    asChild
                    disabled={deleting}
                  >
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={deleting}
                    >
                      Yes
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
                {deleteError && (
                  <div className="text-red-600 mt-2">{deleteError}</div>
                )}
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;
