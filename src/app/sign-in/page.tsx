"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter(); 
  const search = useSearchParams(); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }
    
    setBusy(true);
    const result = await authClient.signIn.email({ email, password });
    setBusy(false);
    
    if (result.error) {
      toast.error(result.error.message || "লগইন করা যায়নি");
      return;
    }
    
    toast.success("সফলভাবে লগইন হয়েছে");
    router.push(search.get("callbackURL") || "/");
  }

  async function social(provider: "google" | "github") {
    await authClient.signIn.social({
      provider,
      callbackURL: search.get("callbackURL") || "/"
    });
  }

  return (
    <main className="min-h-screen grid place-items-center px-4 py-10 bg-green-50">
      <div className="w-full max-w-md rounded-2xl bg-white border border-green-100 p-6 sm:p-8 card-shadow">
        <Link href="/" className="text-green-700 text-sm">
          ← হোম পেজ
        </Link>
        
        <div className="text-center mt-4">
          <div className="text-4xl">🛒</div>
          <h1 className="text-2xl font-bold mt-3">সাইন ইন করুন</h1>
          <p className="text-sm text-gray-500 mt-2">বাজার দর-এ আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        </div>

        <form onSubmit={submit} className="space-y-4 mt-7">
          <label className="block text-sm">
            ইমেইল
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="mt-1 w-full rounded-lg border px-3 py-3 outline-none focus:border-green-600" 
              placeholder="name@example.com" 
            />
          </label>
          
          <label className="block text-sm">
            পাসওয়ার্ড
            <input 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="mt-1 w-full rounded-lg border px-3 py-3 outline-none focus:border-green-600" 
              placeholder="আপনার পাসওয়ার্ড" 
            />
          </label>
          
          <button 
            disabled={busy} 
            className="w-full rounded-lg bg-green-700 text-white py-3 font-semibold disabled:opacity-60"
          >
            {busy ? "লগইন হচ্ছে…" : "সাইন ইন"}
          </button>
        </form>

        <div className="grid grid-cols-2 gap-3 mt-3">
          <button 
            onClick={() => social("google")} 
            className="border rounded-lg py-2.5 text-sm hover:bg-gray-50 transition-colors"
          >
            Google দিয়ে
          </button>
          <button 
            onClick={() => social("github")} 
            className="border rounded-lg py-2.5 text-sm hover:bg-gray-50 transition-colors"
          >
            GitHub দিয়ে
          </button>
        </div>

        <p className="text-sm text-center text-gray-600 mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-green-700 font-semibold">
            সাইন আপ
          </Link>
        </p>
      </div>
    </main>
  );
}