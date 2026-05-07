"use client";

import { useState, useEffect } from "react";
import CarCard from "./CarCard";
import { getCars } from "@/lib/carStore";
import type { Car } from "@/lib/types";

export default function FeaturedCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCars().then((allCars) => {
      setCars(allCars.filter((car) => car.featured));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No featured cars at the moment.</p>
        <p className="text-sm mt-1">Check back soon for new listings!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
