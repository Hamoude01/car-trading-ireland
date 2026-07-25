"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import CarCard from "@/components/CarCard";
import {
  makes,
  counties,
  bodyTypes,
  fuelTypes,
  yearRange,
} from "@/lib/data";
import { getCars } from "@/lib/carStore";
import type { Car } from "@/lib/types";
import { Search, SlidersHorizontal, X, RotateCcw } from "lucide-react";

export default function CarsClient() {
  const searchParams = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCars().then((data) => {
      setCars(data);
      setLoading(false);
    });
  }, []);

  const [make, setMake] = useState(searchParams.get("make") || "");
  const [county, setCounty] = useState(searchParams.get("county") || "");
  const [minYear, setMinYear] = useState(searchParams.get("minYear") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [fuelType, setFuelType] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredCars = useMemo(() => {
    const filtered = cars.filter((car) => {
      if (make && car.make !== make) return false;
      if (county && car.county !== county) return false;
      if (minYear && car.year < parseInt(minYear)) return false;
      if (maxPrice && car.price > parseInt(maxPrice)) return false;
      if (fuelType && car.fuelType !== fuelType) return false;
      if (bodyType && car.bodyType !== bodyType) return false;
      if (transmission && car.transmission !== transmission) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          car.title.toLowerCase().includes(query) ||
          car.make.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          car.description.toLowerCase().includes(query)
        );
      }
      return true;
    });

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "year-new":
        filtered.sort((a, b) => b.year - a.year);
        break;
      case "year-old":
        filtered.sort((a, b) => a.year - b.year);
        break;
      case "mileage":
        filtered.sort((a, b) => a.mileage - b.mileage);
        break;
      case "newest":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
        break;
    }

    return filtered;
  }, [cars, make, county, minYear, maxPrice, fuelType, bodyType, transmission, sortBy, searchQuery]);

  const activeFilterCount = [
    make,
    county,
    minYear,
    maxPrice,
    fuelType,
    bodyType,
    transmission,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setMake("");
    setCounty("");
    setMinYear("");
    setMaxPrice("");
    setFuelType("");
    setBodyType("");
    setTransmission("");
    setSearchQuery("");
  };

  return (
    <div className="bg-muted min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-b from-[#141417] to-black text-white py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Browse Cars</h1>
          <p className="text-gray-300 mt-2">
            Find your next car from our selection of quality vehicles
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Controls */}
        <div className="bg-white rounded-xl shadow-sm border border-border p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by make, model, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
            >
              <option value="newest">Newest Listed</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="year-old">Year: Oldest First</option>
              <option value="mileage">Lowest Mileage</option>
            </select>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <select
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  <option value="">All Makes</option>
                  {makes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>

                <select
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  <option value="">All Counties</option>
                  {counties.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  <option value="">All Fuel Types</option>
                  {fuelTypes.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>

                <select
                  value={bodyType}
                  onChange={(e) => setBodyType(e.target.value)}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  <option value="">All Body Types</option>
                  {bodyTypes.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>

                <select
                  value={minYear}
                  onChange={(e) => setMinYear(e.target.value)}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  <option value="">Min Year</option>
                  {yearRange.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>

                <select
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  <option value="">Max Price</option>
                  <option value="10000">&euro;10,000</option>
                  <option value="15000">&euro;15,000</option>
                  <option value="20000">&euro;20,000</option>
                  <option value="25000">&euro;25,000</option>
                  <option value="30000">&euro;30,000</option>
                  <option value="40000">&euro;40,000</option>
                  <option value="50000">&euro;50,000</option>
                </select>

                <select
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                >
                  <option value="">All Transmissions</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>

                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-accent hover:bg-accent/5 rounded-xl transition-colors font-medium border border-accent/20"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Clear All
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {make && (
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                {make}
                <button onClick={() => setMake("")} aria-label={`Remove ${make} filter`}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {county && (
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                {county}
                <button onClick={() => setCounty("")} aria-label={`Remove ${county} filter`}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {fuelType && (
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                {fuelType}
                <button onClick={() => setFuelType("")} aria-label={`Remove ${fuelType} filter`}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {bodyType && (
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                {bodyType}
                <button onClick={() => setBodyType("")} aria-label={`Remove ${bodyType} filter`}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {minYear && (
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                From {minYear}
                <button onClick={() => setMinYear("")} aria-label="Remove year filter">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {maxPrice && (
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                Up to &euro;{parseInt(maxPrice).toLocaleString()}
                <button onClick={() => setMaxPrice("")} aria-label="Remove price filter">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
            {transmission && (
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                {transmission}
                <button onClick={() => setTransmission("")} aria-label={`Remove ${transmission} filter`}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Showing <strong>{filteredCars.length}</strong>{" "}
              {filteredCars.length === 1 ? "car" : "cars"}
            </p>

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No cars found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-xl transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
