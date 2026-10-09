import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
export default function ProductGrid({products}:{products:Product[]}) {
 if (!products.length) return <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">এই মুহূর্তে কোনো পণ্য পাওয়া যায়নি। একটু পরে আবার চেষ্টা করুন।</div>;
 return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">{products.map((p,i)=><ProductCard key={p.id ?? `${p.name}-${i}`} product={p}/>)}</div>;
}