import { Category, Provider, ProviderApplicationIn } from "@/lib/utils";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE}/api/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function fetchProviders(category?: string): Promise<Provider[]> {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  const url = `${API_BASE}/api/providers${params.toString() ? "?" + params.toString() : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch providers");
  return res.json();
}

export async function fetchProvider(slug: string): Promise<Provider | null> {
  const res = await fetch(`${API_BASE}/api/providers/${slug}`);
  if (!res.ok) return null;
  return res.json();
}

export async function sendChatMessage(messages: { role: string; content: string }[]): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 90000);
  try {
    const res = await fetch(`${API_BASE}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) throw new Error("Chat request failed");
    const data = await res.json();
    return data.reply;
  } catch (err) {
    clearTimeout(timer);
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("Request timed out. Please try again.");
    }
    throw new Error("Connection error. Please try again.");
  }
}

export async function submitApplication(data: ProviderApplicationIn): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${API_BASE}/api/providers/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.text();
      return { success: false, message: err || "Failed to submit application" };
    }
    return { success: true, message: "Application submitted successfully!" };
  } catch {
    return { success: false, message: "Network error. Please try again." };
  }
}
