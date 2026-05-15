import { getSupabase } from "./supabase";
import type { Car, Submission, ContactMessage } from "./types";

const AUTH_KEY = "hamoude_admin_auth";
const ADMIN_PASSWORD = "hamoude2024";

// --- Car operations (Supabase) ---

function dbRowToCar(row: Record<string, unknown>): Car {
  return {
    id: row.id as string,
    title: row.title as string,
    make: row.make as string,
    model: row.model as string,
    year: row.year as number,
    price: Number(row.price),
    mileage: row.mileage as number,
    fuelType: row.fuel_type as Car["fuelType"],
    transmission: row.transmission as Car["transmission"],
    engineSize: (row.engine_size as string) || "",
    bodyType: (row.body_type as string) || "",
    colour: (row.colour as string) || "",
    doors: (row.doors as number) || 4,
    county: row.county as string,
    nctExpiry: (row.nct_expiry as string) || "",
    taxExpiry: (row.tax_expiry as string) || "",
    description: (row.description as string) || "",
    features: (row.features as string[]) || [],
    images: (row.images as string[]) || [],
    sellerType: row.seller_type as Car["sellerType"],
    featured: (row.featured as boolean) || false,
    dateAdded: (row.date_added as string) || new Date().toISOString(),
    previousOwners: (row.previous_owners as number) || 0,
  };
}

function carToDbRow(car: Car): Record<string, unknown> {
  return {
    id: car.id,
    title: car.title,
    make: car.make,
    model: car.model,
    year: car.year,
    price: car.price,
    mileage: car.mileage,
    fuel_type: car.fuelType,
    transmission: car.transmission,
    engine_size: car.engineSize,
    body_type: car.bodyType,
    colour: car.colour,
    doors: car.doors,
    county: car.county,
    nct_expiry: car.nctExpiry,
    tax_expiry: car.taxExpiry,
    description: car.description,
    features: car.features,
    images: car.images,
    seller_type: car.sellerType,
    featured: car.featured,
    date_added: car.dateAdded,
    previous_owners: car.previousOwners,
  };
}

export async function getCars(): Promise<Car[]> {
  const { data, error } = await getSupabase()
    .from("cars")
    .select("*")
    .order("date_added", { ascending: false });
  if (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
  return (data || []).map(dbRowToCar);
}

export async function getCar(id: string): Promise<Car | undefined> {
  const { data, error } = await getSupabase()
    .from("cars")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return undefined;
  return dbRowToCar(data);
}

export async function saveCar(car: Car): Promise<void> {
  const row = carToDbRow(car);
  const { error } = await getSupabase().from("cars").upsert(row, { onConflict: "id" });
  if (error) {
    console.error("Error saving car:", error);
    throw error;
  }
}

export async function deleteCar(id: string): Promise<void> {
  const { error } = await getSupabase().from("cars").delete().eq("id", id);
  if (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// --- Submission operations (Supabase) ---

export async function getSubmissions(): Promise<Submission[]> {
  const { data, error } = await getSupabase()
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching submissions:", error);
    return [];
  }
  return (data || []) as Submission[];
}

export async function createSubmission(
  submission: Omit<Submission, "id" | "status" | "created_at">
): Promise<void> {
  const { error } = await getSupabase().from("submissions").insert({
    ...submission,
    status: "pending",
  });
  if (error) {
    console.error("Error creating submission:", error);
    throw error;
  }
}

export async function updateSubmissionStatus(
  id: string,
  status: Submission["status"]
): Promise<void> {
  const { error } = await getSupabase()
    .from("submissions")
    .update({ status })
    .eq("id", id);
  if (error) {
    console.error("Error updating submission:", error);
    throw error;
  }
}

export async function deleteSubmission(id: string): Promise<void> {
  const { error } = await getSupabase().from("submissions").delete().eq("id", id);
  if (error) {
    console.error("Error deleting submission:", error);
    throw error;
  }
}

// --- Contact message operations (Supabase) ---

export async function getContactMessages(): Promise<ContactMessage[]> {
  const { data, error } = await getSupabase()
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching contact messages:", error);
    return [];
  }
  return (data || []) as ContactMessage[];
}

export async function createContactMessage(
  message: Omit<ContactMessage, "id" | "status" | "created_at">
): Promise<void> {
  const { error } = await getSupabase().from("contact_messages").insert({
    ...message,
    status: "unread",
  });
  if (error) {
    console.error("Error creating contact message:", error);
    throw error;
  }
}

export async function updateContactMessageStatus(
  id: string,
  status: ContactMessage["status"]
): Promise<void> {
  const { error } = await getSupabase()
    .from("contact_messages")
    .update({ status })
    .eq("id", id);
  if (error) {
    console.error("Error updating contact message:", error);
    throw error;
  }
}

export async function deleteContactMessage(id: string): Promise<void> {
  const { error } = await getSupabase().from("contact_messages").delete().eq("id", id);
  if (error) {
    console.error("Error deleting contact message:", error);
    throw error;
  }
}

// --- Auth (session-based, unchanged) ---

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_KEY) === "true";
}

export function login(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
}

export function logout(): void {
  sessionStorage.removeItem(AUTH_KEY);
}
