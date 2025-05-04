import ProductDetailsClient from "@/components/ProductDetailsClient";

async function getProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

// Next.js 15+ requires params to be awaited
export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  return <ProductDetailsClient product={product} />;
}
