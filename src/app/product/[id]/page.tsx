import ProductDetails from "@/components/ProductDetails";

const getProduct = async(id: string)=> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}


const ProductDetailsPage = async({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const product = await getProduct(id);
  return <ProductDetails product={product} />;
}

export default ProductDetailsPage;
