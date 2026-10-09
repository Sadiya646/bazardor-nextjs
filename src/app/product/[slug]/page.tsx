import Link from "next/link";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import { getCategories, getProduct, getProducts, productName, productPrice } from "@/lib/api";
import { money } from "@/lib/format";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const [categories, products, product, session] = await Promise.all([
    getCategories(), 
    getProducts(), 
    getProduct(slug), 
    auth.api.getSession({ headers: await headers() })
  ]);

  if (!session) {
    redirect(`/signin?callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
  }

  if (!product) {
    return (
      <>
        <Navbar categories={categories} />
        <main className="container-page py-24 text-center">
          <h1 className="text-2xl font-bold">পণ্যটি পাওয়া যায়নি</h1>
          <Link href="/" className="inline-block mt-5 text-green-700 underline">
            হোম পেজে ফিরে যান
          </Link>
        </main>
      </>
    );
  }

  const price = productPrice(product); 
  const markets = Array.isArray(product.markets) ? product.markets : [];

  return (
    <>
      <Navbar categories={categories} />
      <Ticker products={products} />
      
      <main className="container-page py-8 max-w-4xl">
        <Link href="/" className="text-sm text-green-700">
          ← হোম পেজ
        </Link>
        
        <section className="mt-4 rounded-2xl bg-white border p-5 sm:p-8">
          <div className="flex gap-4 items-center">
            <div className="w-20 h-20 rounded-2xl bg-green-50 grid place-items-center text-5xl">
              {String(product.emoji || "🛍️")}
            </div>
            
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">
                {productName(product)}
              </h1>
              <p className="text-gray-500 mt-2">
                {String(product.description || "আজকের বাজারদর ও বিভিন্ন বাজারের দামের তথ্য")}
              </p>
              <p className="text-xs mt-2 text-green-700">
                {String(product.unit || "প্রতি কেজি")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">
            {[
              ["সর্বনিম্ন দাম", product.minPrice ?? price],
              ["সর্বোচ্চ দাম", product.maxPrice ?? price],
              ["গড় দাম", product.averagePrice ?? price]
            ].map(([label, val]) => (
              <div key={String(label)} className="rounded-xl bg-green-50 p-4">
                <p className="text-sm text-gray-600">{label}</p>
                <b className="block text-xl text-green-800 mt-2">
                  {money(val as string | number)}
                </b>
              </div>
            ))}
          </div>

          <h2 className="font-bold text-lg mt-8 mb-3">বাজারভিত্তিক আজকের দাম</h2>
          
          {markets.length ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="p-3">বাজার</th>
                    <th className="p-3">দাম</th>
                    <th className="p-3">একক</th>
                  </tr>
                </thead>
                <tbody>
                  {markets.map((m, i) => (
                    <tr key={i} className="border-t">
                      <td className="p-3">{m.name || m.bazar || `বাজার ${i + 1}`}</td>
                      <td className="p-3 font-semibold">{money(m.price ?? price)}</td>
                      <td className="p-3">{m.unit || product.unit || "প্রতি কেজি"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-500 rounded-xl bg-gray-50 p-4">
              এই পণ্যের জন্য আলাদা বাজারভিত্তিক তথ্য API-তে পাওয়া যায়নি। বর্তমান গড় দাম: <b>{money(price)}</b>
            </p>
          )}
        </section>
      </main>
    </>
  );
}