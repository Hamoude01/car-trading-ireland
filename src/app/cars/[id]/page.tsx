"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getCar } from "@/lib/carStore";
import type { Car } from "@/lib/types";
import {
  ArrowLeft,
  Calendar,
  Fuel,
  Gauge,
  MapPin,
  MessageCircle,
  Shield,
  Check,
  ExternalLink,
  Share2,
  Tag,
  Palette,
  DoorOpen,
  Users,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    getCar(id).then((found) => {
      setCar(found || null);
      setActiveImage(0);
      setLoading(false);
    });
  }, [id]);

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
        <p className="text-gray-600">This listing may have been removed.</p>
        <Link
          href="/cars"
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-xl transition-colors"
        >
          Browse All Cars
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-muted min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/cars"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Cars
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-sm border border-border overflow-hidden">
              {car.images && car.images.length > 0 ? (
                <div>
                  <div className="aspect-[16/9] relative group">
                    <img
                      key={activeImage}
                      src={car.images[activeImage]}
                      alt={`${car.title} - photo ${activeImage + 1}`}
                      className="w-full h-full object-cover"
                      data-testid="car-gallery-main-image"
                    />
                    {car.featured && (
                      <span className="absolute top-4 left-4 bg-accent text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide">
                        Featured
                      </span>
                    )}
                    {car.sellerType === "owner" && (
                      <span className="absolute top-4 right-4 bg-success text-white px-4 py-1.5 rounded-full text-sm font-bold">
                        Our Stock
                      </span>
                    )}
                    {car.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveImage(
                              (activeImage - 1 + car.images.length) %
                                car.images.length
                            )
                          }
                          aria-label="Previous photo"
                          data-testid="car-gallery-prev-btn"
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveImage((activeImage + 1) % car.images.length)
                          }
                          aria-label="Next photo"
                          data-testid="car-gallery-next-btn"
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                          {activeImage + 1} / {car.images.length}
                        </span>
                      </>
                    )}
                  </div>
                  {car.images.length > 1 && (
                    <div
                      className="flex gap-2 p-3 overflow-x-auto"
                      data-testid="car-gallery-thumbnails"
                    >
                      {car.images.map((img, idx) => (
                        <button
                          type="button"
                          key={idx}
                          onClick={() => setActiveImage(idx)}
                          aria-label={`View photo ${idx + 1}`}
                          data-testid={`car-gallery-thumb-${idx}`}
                          className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            idx === activeImage
                              ? "border-accent ring-2 ring-accent/30"
                              : "border-transparent opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${car.title} thumbnail ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-[16/9] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                  <div className="text-center text-gray-400">
                    <svg
                      className="w-24 h-24 mx-auto mb-3 opacity-30"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-lg font-medium">
                      {car.make} {car.model}
                    </p>
                    <p className="text-sm mt-1">
                      Photos coming soon &mdash; contact us for more details
                    </p>
                  </div>
                  {car.featured && (
                    <span className="absolute top-4 left-4 bg-accent text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide">
                      Featured
                    </span>
                  )}
                  {car.sellerType === "owner" && (
                    <span className="absolute top-4 right-4 bg-success text-white px-4 py-1.5 rounded-full text-sm font-bold">
                      Our Stock
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Title & Price (Mobile) */}
            <div className="lg:hidden bg-white rounded-2xl shadow-sm border border-border p-6">
              <h1 className="text-2xl font-bold text-foreground">
                {car.title}
              </h1>
              <p className="text-3xl font-bold text-primary mt-2">
                &euro;{car.price.toLocaleString()}
              </p>
            </div>

            {/* Key Specs */}
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
              <h2 className="text-xl font-bold mb-4">Vehicle Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-gray-500">Year</p>
                    <p className="font-semibold">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <Gauge className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-gray-500">Mileage</p>
                    <p className="font-semibold">
                      {car.mileage.toLocaleString()} km
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <Fuel className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-gray-500">Fuel Type</p>
                    <p className="font-semibold">{car.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <Tag className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-gray-500">Transmission</p>
                    <p className="font-semibold">{car.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <div>
                    <p className="text-xs text-gray-500">Engine</p>
                    <p className="font-semibold">{car.engineSize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <Palette className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-gray-500">Colour</p>
                    <p className="font-semibold">{car.colour}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <DoorOpen className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-gray-500">Doors</p>
                    <p className="font-semibold">{car.doors}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-semibold">{car.county}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-xs text-gray-500">Previous Owners</p>
                    <p className="font-semibold">{car.previousOwners}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* NCT & Tax */}
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
              <h2 className="text-xl font-bold mb-4">NCT &amp; Tax</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-success/5 border border-success/20 rounded-xl">
                  <Clock className="w-5 h-5 text-success" />
                  <div>
                    <p className="text-sm text-gray-600">NCT Expiry</p>
                    <p className="font-bold text-success">{car.nctExpiry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-success/5 border border-success/20 rounded-xl">
                  <Shield className="w-5 h-5 text-success" />
                  <div>
                    <p className="text-sm text-gray-600">Tax Expiry</p>
                    <p className="font-bold text-success">{car.taxExpiry}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
              <h2 className="text-xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {car.description}
              </p>
            </div>

            {/* Features */}
            {car.features.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
                <h2 className="text-xl font-bold mb-4">
                  Features &amp; Specs
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {car.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card (Desktop) */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-border p-6 sticky top-20">
              <h1 className="text-2xl font-bold text-foreground">
                {car.title}
              </h1>
              <p className="text-3xl font-bold text-primary mt-3">
                &euro;{car.price.toLocaleString()}
              </p>

              <div className="mt-6 space-y-3">
                <a
                  href="https://wa.me/353877110508"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1da851] text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
                <a
                  href="https://www.facebook.com/mike.mersar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  <FacebookIcon className="w-5 h-5" />
                  Message on Facebook
                </a>
                <a
                  href="https://www.instagram.com/h_mou_de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#833AB4] via-[#E4405F] to-[#FCAF45] hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-opacity"
                >
                  <InstagramIcon className="w-5 h-5" />
                  DM on Instagram
                </a>
                <button className="flex items-center justify-center gap-2 w-full border-2 border-border hover:border-primary text-foreground font-semibold py-3 px-6 rounded-xl transition-colors">
                  <Share2 className="w-5 h-5" />
                  Share This Car
                </button>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-xl">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-success" />
                  Buyer Confidence
                </h3>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-success" />
                    Full history check completed
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-success" />
                    NCT &amp; tax verified
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-success" />
                    Test drive available
                  </li>
                </ul>
              </div>

              <div className="mt-4 p-4 bg-primary/5 border border-primary/10 rounded-xl">
                <h3 className="font-semibold text-sm mb-2">
                  Vehicle Ownership Transfer
                </h3>
                <p className="text-xs text-gray-600 mb-2">
                  Complete the change of ownership online:
                </p>
                <a
                  href="https://www.vehicleservices.gov.ie/cvo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:text-accent transition-colors font-medium"
                >
                  vehicleservices.gov.ie
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Mobile Contact */}
            <div className="lg:hidden bg-white rounded-2xl shadow-sm border border-border p-6 space-y-3">
              <a
                href="https://wa.me/353877110508"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1da851] text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
              <a
                href="https://www.facebook.com/mike.mersar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#1877F2] hover:bg-[#166fe5] text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                <FacebookIcon className="w-5 h-5" />
                Message on Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
