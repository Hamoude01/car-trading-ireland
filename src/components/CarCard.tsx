import Link from "next/link";
import { Car } from "@/lib/types";
import { Fuel, Gauge, Calendar, MapPin, Tag } from "lucide-react";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <Link
      href={`/cars/${car.id}`}
      className="group bg-white rounded-xl shadow-sm border border-border hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {car.images && car.images.length > 0 ? (
          <img
            src={car.images[0]}
            alt={car.title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto mb-2 opacity-40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 9l-7-7-7 7m14 0v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9"
                />
              </svg>
              <span className="text-sm font-medium">
                {car.make} {car.model}
              </span>
            </div>
          </div>
        )}
        {car.featured && (
          <span className="absolute top-3 left-3 bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
            Featured
          </span>
        )}
        {car.sellerType === "owner" && (
          <span className="absolute top-3 right-3 bg-success text-white px-3 py-1 rounded-full text-xs font-bold">
            Our Stock
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {car.title}
        </h3>

        <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{car.year}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="w-4 h-4 text-primary" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-primary" />
            <span>{car.mileage.toLocaleString()} km</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{car.county}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <Tag className="w-3.5 h-3.5" />
          <span>{car.transmission}</span>
          <span className="text-gray-300">|</span>
          <span>{car.engineSize}</span>
          <span className="text-gray-300">|</span>
          <span>{car.bodyType}</span>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-border mt-4">
          <span className="text-2xl font-bold text-primary">
            &euro;{car.price.toLocaleString()}
          </span>
          <span className="text-sm text-accent font-semibold group-hover:underline">
            View Details &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
