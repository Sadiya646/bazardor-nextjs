import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import { getCategories } from "@/lib/api";

export default async function ProfilePage() {
  const [session, categories] = await Promise.all([
    auth.api.getSession({ headers: await headers() }), 
    getCategories()
  ]);

  if (!session) {
    redirect("/signin?callbackURL=%2Fprofile");
  }

  return (
    <>
      <Navbar categories={categories} />
      
      <main className="container-page py-10 max-w-2xl">
        <section className="rounded-2xl bg-white border p-6 sm:p-8">
          <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
          
          <div className="mt-6 rounded-xl bg-green-50 p-4">
            <p className="text-sm text-gray-500">নাম</p>
            <p className="font-semibold mt-1">{session.user.name}</p>
            
            <p className="text-sm text-gray-500 mt-4">ইমেইল</p>
            <p className="font-semibold mt-1">{session.user.email}</p>
          </div>
          
          <Link 
            href="/profile/update" 
            className="inline-block mt-5 rounded-lg bg-green-700 px-5 py-3 text-white text-sm hover:bg-green-800 transition-colors"
          >
            তথ্য আপডেট করুন
          </Link>
        </section>
      </main>
    </>
  );
}