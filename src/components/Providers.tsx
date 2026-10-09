 "use client";
import { Toaster } from "react-hot-toast";
export default function Providers() {
  return <Toaster position="top-center" toastOptions={{duration: 3200, style: {borderRadius: 12, fontFamily: "Arial, sans-serif"}}} />;
}