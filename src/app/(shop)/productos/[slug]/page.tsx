import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/shop/ProductDetailClient";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { createClient } from "@/lib/supabase/server";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Producto | CF Yerba",
    };
  }

  return {
    title: `${product.title} | CF Yerba`,
    description: product.description || "Pieza artesanal de CF Yerba",
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;

  let product = MOCK_PRODUCTS.find((p) => p.slug === slug);

  try {
    const supabase = await createClient();
    const { data: dbProduct } = await supabase
      .from("products")
      .select("*, category:categories(*), variants:product_variants(*)")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (dbProduct) {
      product = dbProduct;
    }
  } catch {
    // Si Supabase aún no tiene el producto o no está configurado, usamos mock
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <ProductDetailClient product={product} />
    </div>
  );
}

