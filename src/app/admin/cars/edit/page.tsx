"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { isAuthenticated, getCar } from "@/lib/carStore";
import type { Car } from "@/lib/types";
import CarForm from "@/components/admin/CarForm";
import { Suspense } from "react";

function EditCarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [car] = useState<Car | undefined>(() => {
    if (typeof window === "undefined" || !id) return undefined;
    return getCar(id);
  });
  const [loading] = useState(() => {
    if (typeof window === "undefined") return true;
    if (!isAuthenticated()) return true;
    return false;
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin");
    }
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Car Not Found</h1>
        <button
          onClick={() => router.push("/admin/dashboard")}
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-xl transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return <CarForm existingCar={car} />;
}

export default function EditCarPage() {
  return (
    <Suspense>
      <EditCarContent />
    </Suspense>
  );
}
