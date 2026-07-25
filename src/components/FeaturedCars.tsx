"use client";

import { useState, useEffect } from "react";
import CarCard from "./CarCard";
import CarCardSkeleton from "./CarCardSkeleton";
import { getCars } from "@/lib/carStore";
import type { Car } from "@/lib/types";

const MAX_FEATURED = 3;

export default function FeaturedCars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCars().then((allCars) => {
      const featured = allCars.filter((car) => car.featured);
      if (featured.length > 0) {
        setCars(featured.slice(0, MAX_FEATURED));
      } else {
        setCars(allCars.slice(0, MAX_FEATURED));
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (cars.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No cars listed yet.</p>
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
