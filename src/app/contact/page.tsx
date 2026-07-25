"use client";

import { useState } from "react";
import {
  MessageCircle,
  MapPin,
  ExternalLink,
  Check,
  Send,
  Clock,
  Loader2,
} from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";
import { createContactMessage } from "@/lib/carStore";

const WHATSAPP_NUMBER = "353877110508";

const SUBJECT_LABELS: Record<string, string> = {
  buying: "I want to buy a car",
  selling: "I want to sell my car",
  enquiry: "General enquiry about a listing",
  "test-drive": "Arrange a test drive",
  other: "Other",
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await createContactMessage({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      const subjectText = SUBJECT_LABELS[formData.subject] || formData.subject;
      const whatsappMessage = [
        `New message from ${formData.name}`,
        formData.phone ? `Phone: ${formData.phone}` : "",
        formData.email ? `Email: ${formData.email}` : "",
        `Subject: ${subjectText}`,
        "",
        formData.message,
      ]
        .filter(Boolean)
        .join("\n");

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, "_blank");

      setSubmitted(true);
    } catch (err) {
      console.error("Failed to send message:", err);
      setError("Failed to send message. Please try again or contact us on WhatsApp directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-muted min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#141417] to-black text-white py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a question about a car or want to sell yours? Reach out to us
            through any of our channels
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Methods */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
              <h2 className="text-2xl font-bold mb-6">Contact Us Directly</h2>

              {/* WhatsApp - Primary */}
              <a
                href="https://wa.me/353877110508"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#25D366]/5 border border-[#25D366]/20 rounded-xl hover:bg-[#25D366]/10 transition-colors mb-4"
              >
                <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">WhatsApp</h3>
                  <p className="text-gray-600 text-sm">+353 87 711 0508</p>
                  <p className="text-[#25D366] text-xs font-medium mt-0.5">
                    Fastest way to reach us
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/1G3xANNdoR/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#1877F2]/5 border border-[#1877F2]/20 rounded-xl hover:bg-[#1877F2]/10 transition-colors mb-4"
              >
                <div className="w-12 h-12 bg-[#1877F2] rounded-xl flex items-center justify-center flex-shrink-0">
                  <FacebookIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Facebook</h3>
                  <p className="text-gray-600 text-sm">Mike Mersar</p>
                  <p className="text-[#1877F2] text-xs font-medium mt-0.5">
                    Message us on Facebook
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/h_mou_de"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#E4405F]/5 border border-[#E4405F]/20 rounded-xl hover:bg-[#E4405F]/10 transition-colors mb-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#833AB4] via-[#E4405F] to-[#FCAF45] rounded-xl flex items-center justify-center flex-shrink-0">
                  <InstagramIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Instagram</h3>
                  <p className="text-gray-600 text-sm">@h_mou_de</p>
                  <p className="text-[#E4405F] text-xs font-medium mt-0.5">
                    DM us on Instagram
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
              </a>

              {/* Facebook Marketplace */}
              <a
                href="https://www.facebook.com/marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-gray-50 border border-border rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-[#1877F2] rounded-xl flex items-center justify-center flex-shrink-0">
                  <FacebookIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Facebook Marketplace</h3>
                  <p className="text-gray-600 text-sm">
                    Browse our listings on Marketplace
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
              </a>
            </div>

            {/* Location & Hours */}
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-accent" />
                <h3 className="font-bold text-lg">Location</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Serving all of Ireland. Viewings and test drives
                arranged by appointment.
              </p>

              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-accent" />
                <h3 className="font-bold text-lg">Availability</h3>
              </div>
              <p className="text-gray-600">
                Monday &ndash; Saturday: 9:00 AM &ndash; 7:00 PM
                <br />
                Sunday: By appointment
              </p>
            </div>

            {/* Vehicle Transfer */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-2">
                Need to Transfer Vehicle Ownership?
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Complete the change of ownership online through the official
                government portal:
              </p>
              <a
                href="https://www.vehicleservices.gov.ie/cvo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-accent font-semibold transition-colors"
              >
                vehicleservices.gov.ie
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
            <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Fill out the form below and we&apos;ll get back to you as soon as
              possible
            </p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-xl font-bold text-success mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600 mb-6">
                  Thanks for reaching out. We&apos;ll get back to you shortly.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://wa.me/353877110508"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold py-3 px-6 rounded-xl transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp for Faster Reply
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="border-2 border-border hover:border-primary text-foreground font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                  >
                    <option value="">Select a topic</option>
                    <option value="buying">I want to buy a car</option>
                    <option value="selling">I want to sell my car</option>
                    <option value="enquiry">General enquiry about a listing</option>
                    <option value="test-drive">Arrange a test drive</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-xl transition-colors text-lg"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
