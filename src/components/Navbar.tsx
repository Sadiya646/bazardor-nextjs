
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-700">
          BazarDor
        </Link>

        {/* Search Bar */}
        <div className="hidden flex-1 md:block md:max-w-xl">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-green-600"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link
            href="/"
            className="text-gray-700 hover:text-green-700"
          >
            Home
          </Link>

          <Link
            href="/signin"
            className="text-gray-700 hover:text-green-700"
          >
            Sign In
          </Link>

          <Link
            href="/signup"
            className="rounded-lg bg-green-700 px-4 py-2 text-white hover:bg-green-800"
          >
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
