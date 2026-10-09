"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import type { Product } from "@/lib/types";
import { productPrice } from "@/lib/api";
import ProductGrid from "@/components/ProductGrid";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState("default");

  const sorted = useMemo(() => {
    return [...products].sort((a, b) => {
      if (sort === "asc") return productPrice(a) - productPrice(b);
      if (sort === "desc") return productPrice(b) - productPrice(a);
      return 0;
    });
  }, [products, sort]);

  return (
    <>
      <div className="flex justify-end mb-4">
        <label className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
          <ArrowUpDown size={15} />
          <span>সাজান:</span>
          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)} 
            className="bg-transparent outline-none pr-1"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
          <ChevronDown size={14} />
        </label>
      </div>

      <ProductGrid products={sorted} />
    </>
  );
}