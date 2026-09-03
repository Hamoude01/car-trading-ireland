import Link from "next/link";
import { Car } from "@/lib/types";
import { Gauge, Calendar, MapPin, Images } from "lucide-react";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const isSold = car.availabilityStatus === "sold";

  return (
    <Link
      href={`/cars/${car.id}`}
      data-testid={`car-card-${car.id}`}
      className={`group bg-surface rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${
        isSold
          ? "border-red-500/50 hover:border-red-400/70"
          : "border-border hover:border-accent/50"
      }`}
    >
      <div className={`relative aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden ${
        isSold ? "after:absolute after:inset-0 after:bg-black/20" : ""
      }`}>
        {car.images && car.images.length > 0 ? (
          <img
            src={car.images[0]}
            alt={car.title}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              isSold ? "grayscale opacity-60" : ""
            }`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500">
            <span className="text-sm font-medium tracking-wide">
              {car.make} {car.model}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
          {isSold && (
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-lg">
              Sold
            </span>
          )}
          {car.featured && (
            <span className="bg-accent text-black px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-lg">
              Featured
            </span>
          )}
        </div>

        {car.images && car.images.length > 1 && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium">
            <Images className="w-3.5 h-3.5" />
            {car.images.length}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-lg text-white group-hover:text-accent transition-colors line-clamp-1">
          {car.title}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-gray-400">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-accent/80" />
            {car.year}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-accent/80" />
            {car.mileage.toLocaleString()} km
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-accent/80" />
            {car.county}
          </span>
        </div>

        <div className="mt-3 text-xs text-gray-500 uppercase tracking-wide">
          {car.fuelType} · {car.transmission} · {car.bodyType}
        </div>

        <div className="mt-auto pt-5 flex items-center justify-between border-t border-border mt-5">
          <span className="text-2xl font-display text-white">
            &euro;{car.price.toLocaleString()}
          </span>
          <span className="text-sm text-accent font-semibold">
            View &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
