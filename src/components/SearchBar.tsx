"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { makes, counties, yearRange } from "@/lib/data";

export default function SearchBar() {
  const router = useRouter();
  const [make, setMake] = useState("");
  const [county, setCounty] = useState("");
  const [minYear, setMinYear] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (county) params.set("county", county);
    if (minYear) params.set("minYear", minYear);
    if (maxPrice) params.set("maxPrice", maxPrice);
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
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
            className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
          >
            <option value="">All Counties</option>
            {counties.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={minYear}
            onChange={(e) => setMinYear(e.target.value)}
            className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
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
            className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
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

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-xl transition-colors"
          >
            <Search className="w-5 h-5" />
            Search Cars
          </button>
        </div>
      </div>
    </form>
  );
}
