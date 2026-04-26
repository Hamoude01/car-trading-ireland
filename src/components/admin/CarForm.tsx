"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveCar, generateId } from "@/lib/carStore";
import {
  makes,
  counties,
  bodyTypes,
  fuelTypes,
  yearRange,
  colours,
} from "@/lib/data";
import type { Car } from "@/lib/types";
import { ArrowLeft, Plus, X, Save, ImagePlus, Car as CarIcon } from "lucide-react";

interface CarFormProps {
  existingCar?: Car;
}

export default function CarForm({ existingCar }: CarFormProps) {
  const router = useRouter();
  const isEditing = !!existingCar;

  const [formData, setFormData] = useState({
    title: existingCar?.title || "",
    make: existingCar?.make || "",
    model: existingCar?.model || "",
    year: existingCar?.year || new Date().getFullYear(),
    price: existingCar?.price || 0,
    mileage: existingCar?.mileage || 0,
    fuelType: existingCar?.fuelType || "Petrol",
    transmission: existingCar?.transmission || "Manual",
    engineSize: existingCar?.engineSize || "",
    bodyType: existingCar?.bodyType || "Hatchback",
    colour: existingCar?.colour || "",
    doors: existingCar?.doors || 4,
    county: existingCar?.county || "",
    nctExpiry: existingCar?.nctExpiry || "",
    taxExpiry: existingCar?.taxExpiry || "",
    description: existingCar?.description || "",
    sellerType: existingCar?.sellerType || "owner",
    featured: existingCar?.featured || false,
    previousOwners: existingCar?.previousOwners || 1,
  });

  const [features, setFeatures] = useState<string[]>(
    existingCar?.features || []
  );
  const [newFeature, setNewFeature] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>(
    existingCar?.images || []
  );
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : value,
    }));
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const addImageUrl = () => {
    if (newImageUrl.trim() && !imageUrls.includes(newImageUrl.trim())) {
      setImageUrls([...imageUrls, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const car: Car = {
      id: existingCar?.id || generateId(),
      title:
        formData.title ||
        `${formData.year} ${formData.make} ${formData.model}`,
      make: formData.make,
      model: formData.model,
      year: formData.year,
      price: formData.price,
      mileage: formData.mileage,
      fuelType: formData.fuelType as Car["fuelType"],
      transmission: formData.transmission as Car["transmission"],
      engineSize: formData.engineSize,
      bodyType: formData.bodyType,
      colour: formData.colour,
      doors: formData.doors,
      county: formData.county,
      nctExpiry: formData.nctExpiry,
      taxExpiry: formData.taxExpiry,
      description: formData.description,
      features,
      images: imageUrls,
      sellerType: formData.sellerType as Car["sellerType"],
      featured: formData.featured,
      dateAdded: existingCar?.dateAdded || new Date().toISOString().slice(0, 10),
      previousOwners: formData.previousOwners,
    };

    saveCar(car);
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <header className="bg-primary-dark text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CarIcon className="w-6 h-6 text-accent" />
            <h1 className="text-xl font-bold">
              {isEditing ? "Edit Car" : "Add New Car"}
            </h1>
          </div>
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Title (auto-generated if empty)
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. 2021 Volkswagen Golf 1.5 TSI"
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Make *
                </label>
                <select
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  <option value="">Select Make</option>
                  {makes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Model *
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="e.g. Golf, Corolla, 3 Series"
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Year *
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  {yearRange.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Price (&euro;) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || ""}
                  onChange={handleChange}
                  placeholder="e.g. 15000"
                  required
                  min={0}
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Mileage (km) *
                </label>
                <input
                  type="number"
                  name="mileage"
                  value={formData.mileage || ""}
                  onChange={handleChange}
                  placeholder="e.g. 50000"
                  required
                  min={0}
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  County *
                </label>
                <select
                  name="county"
                  value={formData.county}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  <option value="">Select County</option>
                  {counties.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold mb-4">Vehicle Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  {fuelTypes.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Transmission
                </label>
                <select
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Engine Size
                </label>
                <input
                  type="text"
                  name="engineSize"
                  value={formData.engineSize}
                  onChange={handleChange}
                  placeholder="e.g. 1.5L, 2.0L"
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Body Type
                </label>
                <select
                  name="bodyType"
                  value={formData.bodyType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  {bodyTypes.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Colour
                </label>
                <select
                  name="colour"
                  value={formData.colour}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  <option value="">Select Colour</option>
                  {colours.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Doors
                </label>
                <select
                  name="doors"
                  value={formData.doors}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Previous Owners
                </label>
                <input
                  type="number"
                  name="previousOwners"
                  value={formData.previousOwners}
                  onChange={handleChange}
                  min={0}
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  NCT Expiry
                </label>
                <input
                  type="text"
                  name="nctExpiry"
                  value={formData.nctExpiry}
                  onChange={handleChange}
                  placeholder="e.g. 03/2026"
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tax Expiry
                </label>
                <input
                  type="text"
                  name="taxExpiry"
                  value={formData.taxExpiry}
                  onChange={handleChange}
                  placeholder="e.g. 06/2026"
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                />
              </div>
            </div>
          </div>

          {/* Seller & Listing */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold mb-4">Listing Settings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Seller Type
                </label>
                <select
                  name="sellerType"
                  value={formData.sellerType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                >
                  <option value="owner">My Car (Own Stock)</option>
                  <option value="commission">Commission Sale</option>
                </select>
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-border text-accent focus:ring-accent"
                />
                <label
                  htmlFor="featured"
                  className="text-sm font-semibold text-gray-700"
                >
                  Feature this car on homepage
                </label>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold mb-4">Description</h2>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe the car — condition, history, key selling points..."
              className="w-full px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-y"
            />
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold mb-4">Features</h2>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addFeature();
                  }
                }}
                placeholder="e.g. Apple CarPlay, Heated Seats, Parking Sensors"
                className="flex-1 px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
              <button
                type="button"
                onClick={addFeature}
                className="flex items-center gap-1 bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-4 rounded-xl transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            {features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {features.map((feature, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-primary/5 text-primary px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(idx)}
                      className="text-primary/50 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Images */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold mb-2">Photos</h2>
            <p className="text-sm text-gray-500 mb-4">
              Paste image URLs from Facebook, Instagram, or any image hosting
              service.
            </p>
            <div className="flex gap-2 mb-4">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addImageUrl();
                  }
                }}
                placeholder="https://example.com/car-photo.jpg"
                className="flex-1 px-4 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              />
              <button
                type="button"
                onClick={addImageUrl}
                className="flex items-center gap-1 bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-4 rounded-xl transition-colors"
              >
                <ImagePlus className="w-4 h-4" />
                Add
              </button>
            </div>
            {imageUrls.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {imageUrls.map((url, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={url}
                      alt={`Car photo ${idx + 1}`}
                      className="w-full h-32 object-cover rounded-xl border border-border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "";
                        (e.target as HTMLImageElement).className =
                          "w-full h-32 bg-gray-100 rounded-xl border border-border flex items-center justify-center";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/admin/dashboard"
              className="px-6 py-3 border-2 border-border hover:border-primary text-foreground font-semibold rounded-xl transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              <Save className="w-5 h-5" />
              {isEditing ? "Save Changes" : "Add Car"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
