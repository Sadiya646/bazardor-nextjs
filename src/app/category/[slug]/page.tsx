import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import ProductGrid from "@/components/ProductGrid";
import { getCategories, getCategoryProducts, getProducts, categoryName, categorySlug } from "@/lib/api";
import CategoryProducts from "./products";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [categories, products, all] = await Promise.all([
    getCategories(), 
    getCategoryProducts(slug), 
    getProducts()
  ]);
  
  const category = categories.find(c => categorySlug(c) === slug);
  
  if (!category || !products.length) {
    return (
      <>
        <Navbar categories={categories} />
        <Ticker products={all} />
        <main className="container-page py-24 text-center">
          <div className="text-6xl">🧺</div>
          <h1 className="text-2xl font-bold mt-5">কোনো পণ্য পাওয়া যায়নি</h1>
          <p className="text-gray-500 mt-2">এই ক্যাটাগরিটি খুঁজে পাওয়া যায়নি।</p>
          <Link href="/" className="inline-block mt-6 rounded-lg bg-green-700 text-white px-5 py-3">
            হোম পেজে ফিরে যান
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar categories={categories} />
      <Ticker products={all} />
      <main className="container-page py-8">
        <div className="mb-5">
          <p className="text-sm text-green-700">হোম / ক্যাটাগরি</p>
          <h1 className="text-2xl sm:text-3xl font-bold mt-2">
            {String(category.emoji || category.icon || "🛒")} {categoryName(category)}
          </h1>
          <p className="text-sm text-gray-500 mt-2">এই ক্যাটাগরির পণ্যের আজকের বাজারদর</p>
        </div>
        <CategoryProducts products={products} />
      </main>
    </>
  );
}