"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getCars,
  deleteCar,
  isAuthenticated,
  logout,
  getSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
  getContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
} from "@/lib/carStore";
import type { Car, Submission, ContactMessage } from "@/lib/types";
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  Car as CarIcon,
  Star,
  StarOff,
  Eye,
  Inbox,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  MailOpen,
  MessageCircle,
} from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteSubId, setDeleteSubId] = useState<string | null>(null);
  const [deleteMsgId, setDeleteMsgId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"cars" | "submissions" | "messages">("cars");

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin");
      return;
    }
    getCars().then(setCars);
    getSubmissions().then(setSubmissions);
    getContactMessages().then(setMessages);
  }, [router]);

  const handleDelete = async (id: string) => {
    try {
      await deleteCar(id);
      const updated = await getCars();
      setCars(updated);
    } catch {
      alert("Failed to delete car. Please try again.");
    }
    setDeleteId(null);
  };

  const handleLogout = () => {
    logout();
    router.push("/admin");
  };

  const handleSubmissionStatus = async (
    id: string,
    status: Submission["status"]
  ) => {
    try {
      await updateSubmissionStatus(id, status);
      const updated = await getSubmissions();
      setSubmissions(updated);
    } catch {
      alert("Failed to update submission status. Please try again.");
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    try {
      await deleteSubmission(id);
      const updated = await getSubmissions();
      setSubmissions(updated);
    } catch {
      alert("Failed to delete submission. Please try again.");
    }
    setDeleteSubId(null);
  };

  const handleMessageStatus = async (
    id: string,
    status: ContactMessage["status"]
  ) => {
    try {
      await updateContactMessageStatus(id, status);
      const updated = await getContactMessages();
      setMessages(updated);
    } catch {
      alert("Failed to update message status. Please try again.");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await deleteContactMessage(id);
      const updated = await getContactMessages();
      setMessages(updated);
    } catch {
      alert("Failed to delete message. Please try again.");
    }
    setDeleteMsgId(null);
  };

  const ownCars = cars.filter((c) => c.sellerType === "owner");
  const commissionCars = cars.filter((c) => c.sellerType === "commission");
  const pendingSubmissions = submissions.filter((s) => s.status === "pending");
  const unreadMessages = messages.filter((m) => m.status === "unread");

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
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
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
          <div
            className="bg-white rounded-xl border border-border p-6 cursor-pointer hover:border-accent transition-colors"
            onClick={() => setActiveTab("submissions")}
          >
            <p className="text-sm text-gray-500">Pending Submissions</p>
            <p className="text-3xl font-bold text-orange-500">
              {pendingSubmissions.length}
            </p>
          </div>
          <div
            className="bg-white rounded-xl border border-border p-6 cursor-pointer hover:border-accent transition-colors"
            onClick={() => setActiveTab("messages")}
          >
            <p className="text-sm text-gray-500">Unread Messages</p>
            <p className="text-3xl font-bold text-blue-500">
              {unreadMessages.length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("cars")}
            className={`pb-3 px-1 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === "cars"
                ? "border-accent text-accent"
                : "border-transparent text-gray-500 hover:text-foreground"
            }`}
          >
            Car Listings
          </button>
          <button
            onClick={() => setActiveTab("submissions")}
            className={`pb-3 px-1 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "submissions"
                ? "border-accent text-accent"
                : "border-transparent text-gray-500 hover:text-foreground"
            }`}
          >
            Customer Submissions
            {pendingSubmissions.length > 0 && (
              <span className="bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {pendingSubmissions.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`pb-3 px-1 font-semibold text-sm border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "messages"
                ? "border-accent text-accent"
                : "border-transparent text-gray-500 hover:text-foreground"
            }`}
          >
            Contact Messages
            {unreadMessages.length > 0 && (
              <span className="bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {unreadMessages.length}
              </span>
            )}
          </button>
        </div>

        {activeTab === "cars" && (
          <>
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
                                  {car.year} &middot;{" "}
                                  {car.mileage.toLocaleString()} km &middot;{" "}
                                  {car.county}
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
          </>
        )}

        {activeTab === "submissions" && (
          <>
            {/* Submissions Tab */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Customer Submissions</h2>
            </div>

            {submissions.length === 0 ? (
              <div className="bg-white rounded-2xl border border-border p-12 text-center">
                <Inbox className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold mb-2">No submissions yet</h3>
                <p className="text-gray-500">
                  When customers submit their car details through the &quot;Sell
                  Your Car&quot; page, they&apos;ll appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="bg-white rounded-xl border border-border p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg">
                            {sub.car_year} {sub.car_make} {sub.car_model}
                          </h3>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              sub.status === "pending"
                                ? "bg-orange-100 text-orange-700"
                                : sub.status === "reviewed"
                                  ? "bg-blue-100 text-blue-700"
                                  : sub.status === "accepted"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                            }`}
                          >
                            {sub.status === "pending" && (
                              <Clock className="w-3 h-3" />
                            )}
                            {sub.status === "accepted" && (
                              <CheckCircle className="w-3 h-3" />
                            )}
                            {sub.status === "rejected" && (
                              <XCircle className="w-3 h-3" />
                            )}
                            {sub.status.charAt(0).toUpperCase() +
                              sub.status.slice(1)}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                          <p>
                            <span className="font-medium text-gray-800">
                              Name:
                            </span>{" "}
                            {sub.name}
                          </p>
                          <p>
                            <span className="font-medium text-gray-800">
                              Phone:
                            </span>{" "}
                            <a
                              href={`tel:${sub.phone}`}
                              className="text-primary hover:underline"
                            >
                              {sub.phone}
                            </a>
                          </p>
                          {sub.email && (
                            <p>
                              <span className="font-medium text-gray-800">
                                Email:
                              </span>{" "}
                              <a
                                href={`mailto:${sub.email}`}
                                className="text-primary hover:underline"
                              >
                                {sub.email}
                              </a>
                            </p>
                          )}
                          {sub.mileage && (
                            <p>
                              <span className="font-medium text-gray-800">
                                Mileage:
                              </span>{" "}
                              {sub.mileage} km
                            </p>
                          )}
                          {sub.asking_price && (
                            <p>
                              <span className="font-medium text-gray-800">
                                Asking Price:
                              </span>{" "}
                              &euro;{sub.asking_price}
                            </p>
                          )}
                        </div>
                        {sub.description && (
                          <p className="text-sm text-gray-600 bg-muted rounded-lg p-3">
                            {sub.description}
                          </p>
                        )}
                        <p className="text-xs text-gray-400 mt-2">
                          Submitted:{" "}
                          {new Date(sub.created_at).toLocaleDateString("en-IE", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        {sub.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleSubmissionStatus(sub.id, "reviewed")
                              }
                              className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg font-semibold transition-colors"
                            >
                              Mark Reviewed
                            </button>
                            <button
                              onClick={() =>
                                handleSubmissionStatus(sub.id, "accepted")
                              }
                              className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs rounded-lg font-semibold transition-colors"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleSubmissionStatus(sub.id, "rejected")
                              }
                              className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg font-semibold transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {sub.status !== "pending" && (
                          <button
                            onClick={() =>
                              handleSubmissionStatus(sub.id, "pending")
                            }
                            className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-lg font-semibold transition-colors"
                          >
                            Reset
                          </button>
                        )}
                        {deleteSubId === sub.id ? (
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => handleDeleteSubmission(sub.id)}
                              className="px-3 py-1.5 bg-red-600 text-white text-xs rounded-lg font-semibold"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteSubId(null)}
                              className="px-3 py-1.5 bg-gray-200 text-gray-600 text-xs rounded-lg font-semibold"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteSubId(sub.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors self-center"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "messages" && (
          <>
            {/* Contact Messages Tab */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Contact Messages</h2>
            </div>

            {messages.length === 0 ? (
              <div className="bg-white rounded-2xl border border-border p-12 text-center">
                <Mail className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold mb-2">No messages yet</h3>
                <p className="text-gray-500">
                  When customers send messages through the Contact page,
                  they&apos;ll appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`bg-white rounded-xl border p-6 ${
                      msg.status === "unread"
                        ? "border-blue-200 bg-blue-50/30"
                        : "border-border"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {msg.status === "unread" ? (
                            <Mail className="w-5 h-5 text-blue-500 flex-shrink-0" />
                          ) : (
                            <MailOpen className="w-5 h-5 text-gray-400 flex-shrink-0" />
                          )}
                          <h3 className="font-bold text-lg">{msg.name}</h3>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              msg.status === "unread"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {msg.status === "unread" ? "New" : "Read"}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                          {msg.email && (
                            <p>
                              <span className="font-medium text-gray-800">
                                Email:
                              </span>{" "}
                              <a
                                href={`mailto:${msg.email}`}
                                className="text-primary hover:underline"
                              >
                                {msg.email}
                              </a>
                            </p>
                          )}
                          {msg.phone && (
                            <p>
                              <span className="font-medium text-gray-800">
                                Phone:
                              </span>{" "}
                              <a
                                href={`tel:${msg.phone}`}
                                className="text-primary hover:underline"
                              >
                                {msg.phone}
                              </a>
                            </p>
                          )}
                          <p>
                            <span className="font-medium text-gray-800">
                              Subject:
                            </span>{" "}
                            {msg.subject}
                          </p>
                        </div>
                        <div className="text-sm text-gray-600 bg-muted rounded-lg p-3">
                          {msg.message}
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <p className="text-xs text-gray-400">
                            Received:{" "}
                            {new Date(msg.created_at).toLocaleDateString(
                              "en-IE",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                          {msg.phone && (
                            <a
                              href={`https://wa.me/${msg.phone.replace(/\s+/g, "").replace(/^\+/, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-[#25D366] hover:underline font-medium"
                            >
                              <MessageCircle className="w-3 h-3" />
                              Reply on WhatsApp
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {msg.status === "unread" ? (
                          <button
                            onClick={() =>
                              handleMessageStatus(msg.id, "read")
                            }
                            className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg font-semibold transition-colors"
                          >
                            Mark Read
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleMessageStatus(msg.id, "unread")
                            }
                            className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs rounded-lg font-semibold transition-colors"
                          >
                            Mark Unread
                          </button>
                        )}
                        {deleteMsgId === msg.id ? (
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="px-3 py-1.5 bg-red-600 text-white text-xs rounded-lg font-semibold"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteMsgId(null)}
                              className="px-3 py-1.5 bg-gray-200 text-gray-600 text-xs rounded-lg font-semibold"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteMsgId(msg.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors self-center"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
