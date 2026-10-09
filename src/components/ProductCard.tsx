import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type { Product } from "@/lib/types";
import { productChange, productName, productPrice, productSlug } from "@/lib/api";
import { bnNumber, money } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const change = productChange(product);
  const unit = String(product.unit || "প্রতি কেজি");

  return (
    <Link 
      href={`/product/${productSlug(product)}`} 
      className="group rounded-xl bg-white border border-gray-100 p-4 card-shadow hover:-translate-y-0.5 hover:border-green-200 transition-all"
    >
      <div className="flex items-start gap-3">
        <div className="grid place-items-center w-12 h-12 shrink-0 rounded-xl bg-green-50 text-2xl">
          {String(product.emoji || "🛍️")}
        </div>
        
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-sm sm:text-base text-gray-800 group-hover:text-green-800">
            {productName(product)}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{unit}</p>
          <p className="text-xs text-gray-400 mt-2">আজকের দাম</p>
          
          <div className="flex items-end justify-between gap-2 mt-0.5">
            <strong className="text-green-800 text-base">
              {money(productPrice(product))}
            </strong>
            <span className={`flex items-center gap-0.5 text-xs rounded-full px-2 py-1 ${
              change > 0 
                ? "bg-green-50 text-green-700" 
                : change < 0 
                ? "bg-red-50 text-red-600" 
                : "bg-gray-100 text-gray-500"
            }`}>
              {change > 0 ? (
                <ArrowUpRight size={13} />
              ) : change < 0 ? (
                <ArrowDownRight size={13} />
              ) : (
                <Minus size={13} />
              )}{" "}
              {bnNumber(Math.abs(change))}%
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}