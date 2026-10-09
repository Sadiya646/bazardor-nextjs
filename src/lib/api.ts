import type { Category, Product } from "./types";

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.api-store.workers.dev/api/bazardor";

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, { next: { revalidate: 300 } });
  if (!response.ok) throw new Error(`API request failed (${response.status})`);
  return response.json() as Promise<T>;
}

function unwrap<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    for (const key of ["data", "products", "categories", "items", "results"]) {
      if (Array.isArray(obj[key])) return obj[key] as T[];
    }
  }
  return [];
}

export async function getProducts(): Promise<Product[]> {
  try { 
    return unwrap<Product>(await getJson<unknown>("/products")); 
  } catch { 
    return []; 
  }
}

export async function getCategories(): Promise<Category[]> {
  try { 
    return unwrap<Category>(await getJson<unknown>("/categories")); 
  } catch { 
    return []; 
  }
}

export async function getCategoryProducts(slug: string): Promise<Product[]> {
  try { 
    return unwrap<Product>(await getJson<unknown>(`/products?category=${encodeURIComponent(slug)}`)); 
  } catch { 
    return []; 
  }
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const data = await getJson<unknown>(`/products/${encodeURIComponent(id)}`);
    if (data && typeof data === "object" && "data" in data) {
      return (data as { data: Product }).data;
    }
    return data as Product;
  } catch { 
    return null; 
  }
}

export function productName(p: Product) { 
  return String(p.name ?? p.title ?? "পণ্যের নাম"); 
}

export function productPrice(p: Product): number {
  const raw = p.currentPrice ?? p.price ?? p.averagePrice ?? p.minPrice ?? 0;
  const parsed = Number(String(raw).replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export function productChange(p: Product): number {
  const parsed = Number(p.changePercent ?? p.change ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function productSlug(p: Product) { 
  return String(p.slug ?? p.id); 
}

export function categorySlug(c: Category) { 
  return String(c.slug ?? c.id ?? c.name ?? c.title ?? ""); 
}

export function categoryName(c: Category) { 
  return String(c.name ?? c.title ?? "ক্যাটাগরি"); 
}