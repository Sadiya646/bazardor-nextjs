"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { todayBangla } from "@/lib/format";
import type { Category } from "@/lib/types";
import { categoryName, categorySlug } from "@/lib/api";

export default function Navbar({ categories }: { categories: Category[] }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();

  const links = [
    { name: "সব পণ্য", href: "/#সব-পণ্য" },
    ...categories.slice(0, 7).map((c) => ({
      name: categoryName(c),
      href: `/category/${categorySlug(c)}`,
    })),
  ];

  return (
    <header className="bg-white border-b border-green-100">
      <div className="container-page flex items-center justify-between py-3 gap-4">
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <span className="grid place-items-center rounded-xl bg-green-700 text-white w-10 h-10">
            <ShoppingBasket size={23} />
          </span>
          <span>
            <b className="block text-green-800 text-lg leading-tight">বাজার দর</b>
            <small className="text-gray-500 text-xs">{todayBangla()}</small>
          </span>
        </Link>

        {/* Desktop Navigation / Auth */}
        <div className="hidden sm:flex items-center gap-2">
          {session?.user ? (
            <>
              <Link href="/profile" className="text-sm text-gray-700 hover:text-green-700">
                {session.user.name || session.user.email}
              </Link>
              <button
                onClick={() =>
                  authClient.signOut({
                    fetchOptions: { onSuccess: () => location.assign("/") },
                  })
                }
                className="rounded-lg border px-3 py-2 text-sm"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="px-4 py-2 text-sm text-green-800">
                সাইন ইন
              </Link>
              <Link
                href="/sign-up"
                className="rounded-lg bg-green-700 text-white px-4 py-2 text-sm hover:bg-green-800"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="মেনু"
          className="sm:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          <Menu />
        </button>
      </div>

      {/* Categories & Mobile Links */}
      <nav className={`${open ? "block" : "hidden"} sm:block border-t border-gray-100`}>
        <div className="container-page flex gap-2 overflow-x-auto py-2 text-sm whitespace-nowrap items-center">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-3 py-2 ${
                path === link.href || (i === 0 && path === "/")
                  ? "bg-green-50 text-green-800 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {!session?.user && (
            <span className="sm:hidden ml-auto flex gap-3">
              <Link href="/sign-in" className="text-green-800">সাইন ইন</Link>
              <Link href="/sign-up" className="text-green-700 font-semibold">সাইন আপ</Link>
            </span>
          )}
        </div>
      </nav>
    </header>
  );
}