
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  MoveRight,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import ProductGrid from "@/components/ProductGrid";

import {
  getCategories,
  getProducts,
  productChange,
} from "@/lib/api";

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const sorted = [...products].sort(
    (a, b) => productChange(b) - productChange(a)
  );

  const risers = sorted
    .filter((product) => productChange(product) > 0)
    .slice(0, 6);

  const fallers = sorted
    .filter((product) => productChange(product) < 0)
    .sort((a, b) => productChange(a) - productChange(b))
    .slice(0, 6);

  return (
    <>
      <Navbar categories={categories} />

      <Ticker products={products} />

      <main className="container-page">
        {/* Hero Section */}
        <section className="mt-5 overflow-hidden rounded-2xl border border-green-50 bg-white sm:mt-7">
          <div className="grid items-center gap-4 px-5 py-7 md:grid-cols-[1.35fr_.65fr] sm:px-9 sm:py-9">
            <div>
              <span className="inline-flex rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-800">
                🌿 প্রতিদিনের বাজারদর, এক জায়গায়
              </span>

              <h1 className="mt-4 text-2xl font-bold leading-snug text-gray-900 sm:text-4xl">
                আজকের বাজারের{" "}
                <span className="text-green-700">
                  সঠিক ধারণা
                </span>{" "}
                রাখুন
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                চাল, ডাল, সবজি, মাছ ও নিত্যপ্রয়োজনীয় পণ্যের দাম
                দেখুন সহজেই। বাজারে যাওয়ার আগে জেনে নিন আজকের দর।
              </p>

              <a
                href="#সব-পণ্য"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
              >
                সব পণ্যের দাম দেখুন
                <MoveRight size={16} />
              </a>
            </div>

            <div className="flex items-center justify-center py-2">
              <div className="relative grid h-40 w-48 place-items-center rounded-[42%] bg-green-50 sm:h-48 sm:w-60">
                <span className="text-8xl sm:text-9xl">🧺</span>
                <span className="absolute -top-1 right-5 text-4xl">🥬</span>
                <span className="absolute bottom-2 left-3 text-3xl">🥕</span>
                <span className="absolute left-2 top-4 text-3xl">🍅</span>
              </div>
            </div>
          </div>
        </section>

        {/* Price Increased Section */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="flex items-center gap-2 text-lg font-bold sm:text-xl">
              <ArrowUpRight className="text-green-700" />
              আজ দাম বেড়েছে
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              আজ যেসব পণ্যের দাম বেড়েছে
            </p>
          </div>

          <ProductGrid products={risers} />
        </section>

        {/* Price Decreased Section */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="flex items-center gap-2 text-lg font-bold sm:text-xl">
              <ArrowDownRight className="text-red-600" />
              আজ দাম কমেছে
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              আজ যেসব পণ্যের দাম কমেছে
            </p>
          </div>

          <ProductGrid products={fallers} />
        </section>

        {/* All Products Section */}
        <section
          id="সব-পণ্য"
          className="mt-9 scroll-mt-5 pb-10"
        >
          <div className="mb-4">
            <h2 className="text-xl font-bold sm:text-2xl">
              সব পণ্য
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম এক নজরে
            </p>
          </div>

          <ProductGrid products={products} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="container-page flex flex-col justify-between gap-2 py-5 text-xs text-gray-500 sm:flex-row">
          <p>
            <b className="text-green-800">বাজার দর</b>
            {" "}— প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          <p>
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>
      </footer>
    </>
  );
}
