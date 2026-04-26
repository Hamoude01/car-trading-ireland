import { Car } from "./types";

const STORAGE_KEY = "hamoude_cars";
const AUTH_KEY = "hamoude_admin_auth";
const ADMIN_PASSWORD = "hamoude2024";

export function getCars(): Car[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data) as Car[];
  } catch {
    return [];
  }
}

export function getCar(id: string): Car | undefined {
  return getCars().find((car) => car.id === id);
}

export function saveCar(car: Car): void {
  const cars = getCars();
  const index = cars.findIndex((c) => c.id === car.id);
  if (index >= 0) {
    cars[index] = car;
  } else {
    cars.push(car);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

export function deleteCar(id: string): void {
  const cars = getCars().filter((c) => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

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
