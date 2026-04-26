"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCars, deleteCar, isAuthenticated, logout } from "@/lib/carStore";
import type { Car } from "@/lib/types";
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Car as CarIcon,
  Star,
  StarOff,
  Eye,
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>(() => {
    if (typeof window === "undefined") return [];
    if (!isAuthenticated()) return [];
    return getCars();
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin");
    }
  }, [router]);

  const handleDelete = (id: string) => {
    deleteCar(id);
    setCars(getCars());
    setDeleteId(null);
  };

  const handleLogout = () => {
    logout();
    router.push("/admin");
  };

  const ownCars = cars.filter((c) => c.sellerType === "owner");
  const commissionCars = cars.filter((c) => c.sellerType === "commission");

  return (
    <div className="min-h-screen bg-muted">
      {/* Admin Header */}
      <header className="bg-primary-dark text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CarIcon className="w-6 h-6 text-accent" />
            <h1 className="text-xl font-bold">
              <span className="text-accent">Hamoude</span> Admin Panel
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-border p-6">
            <p className="text-sm text-gray-500">Total Cars</p>
            <p className="text-3xl font-bold text-primary">{cars.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-6">
            <p className="text-sm text-gray-500">My Cars</p>
            <p className="text-3xl font-bold text-accent">{ownCars.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-6">
            <p className="text-sm text-gray-500">Commission Cars</p>
            <p className="text-3xl font-bold text-success">
              {commissionCars.length}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Car Listings</h2>
          <Link
            href="/admin/cars/add"
            className="flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold py-2.5 px-5 rounded-xl transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Car
          </Link>
        </div>

        {/* Car List */}
        {cars.length === 0 ? (
          <div className="bg-white rounded-2xl border border-border p-12 text-center">
            <CarIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold mb-2">No cars listed yet</h3>
            <p className="text-gray-500 mb-6">
              Start adding your cars to get your business going!
            </p>
            <Link
              href="/admin/cars/add"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Your First Car
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Car
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 hidden sm:table-cell">
                      Price
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 hidden md:table-cell">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 hidden lg:table-cell">
                      Featured
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {cars.map((car) => (
                    <tr
                      key={car.id}
                      className="hover:bg-muted/50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {car.images && car.images.length > 0 ? (
                            <img
                              src={car.images[0]}
                              alt={car.title}
                              className="w-16 h-12 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-16 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                              <CarIcon className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-sm">
                              {car.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {car.year} &middot; {car.mileage.toLocaleString()}{" "}
                              km &middot; {car.county}
                            </p>
                            <p className="text-sm font-bold text-primary sm:hidden">
                              &euro;{car.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <span className="font-bold text-primary">
                          &euro;{car.price.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                            car.sellerType === "owner"
                              ? "bg-primary/10 text-primary"
                              : "bg-success/10 text-success"
                          }`}
                        >
                          {car.sellerType === "owner"
                            ? "My Car"
                            : "Commission"}
                        </span>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        {car.featured ? (
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        ) : (
                          <StarOff className="w-5 h-5 text-gray-300" />
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/cars/${car.id}`}
                            className="p-2 text-gray-400 hover:text-primary transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/admin/cars/edit?id=${car.id}`}
                            className="p-2 text-gray-400 hover:text-accent transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </Link>
                          {deleteId === car.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(car.id)}
                                className="px-2 py-1 bg-red-500 text-white text-xs rounded font-semibold"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setDeleteId(null)}
                                className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded font-semibold"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteId(car.id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
