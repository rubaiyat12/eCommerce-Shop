import axios from "axios";
import ProductDetails from "@/components/ProductDetails";
import { IProduct } from "@/models";

// Fetch product data
const getProduct = async (id: string): Promise<IProduct> => {
  try {
    const res = await axios.get(`https://dummyjson.com/products/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch product:", error);
    throw new Error("Failed to fetch product");
  }
};


interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);
  
  return <ProductDetails product={product} />;
};

export default ProductDetailsPage;
