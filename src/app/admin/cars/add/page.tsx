"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/carStore";
import CarForm from "@/components/admin/CarForm";

export default function AddCarPage() {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin");
    }
  }, [router]);

  return <CarForm />;
}
