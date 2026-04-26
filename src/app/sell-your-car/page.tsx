"use client";

import { useState } from "react";
import {
  Camera,
  Megaphone,
  Handshake,
  Check,
  MessageCircle,
  ExternalLink,
  ArrowRight,
  Shield,
} from "lucide-react";
import { FacebookIcon } from "@/components/SocialIcons";

export default function SellYourCarPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    carMake: "",
    carModel: "",
    carYear: "",
    mileage: "",
    askingPrice: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-muted min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary via-primary-dark to-[#072a40] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Sell Your Car With Us
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We handle everything &mdash; you just sit back and wait for the
            sale. Commission-based, so you only pay when your car sells.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: MessageCircle,
                step: "1",
                title: "Get In Touch",
                desc: "WhatsApp us or message us on Facebook/Instagram with your car details.",
              },
              {
                icon: Camera,
                step: "2",
                title: "We Photograph It",
                desc: "We take professional photos and create an eye-catching listing for your car.",
              },
              {
                icon: Megaphone,
                step: "3",
                title: "Multi-Platform Listing",
                desc: "Your car goes live on our website, Facebook Marketplace, and DoneDeal.ie.",
              },
              {
                icon: Handshake,
                step: "4",
                title: "We Close The Deal",
                desc: "We handle all enquiries, test drives, and negotiations. You get paid!",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-2xl shadow-sm border border-border p-6 text-center"
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {item.step}
                </div>
                <div className="w-14 h-14 mx-auto mt-2 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Why Sell Through Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "No upfront costs — commission only",
              "Professional photography & listings",
              "Listed on 3 platforms for maximum reach",
              "We handle all enquiries & test drives",
              "Experienced negotiators to get the best price",
              "Vehicle ownership transfer assistance via vehicleservices.gov.ie",
              "Safe & secure transaction process",
              "Quick turnaround — most cars sell within 2 weeks",
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Where We List */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Your Car Gets Listed On
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-border p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-1">Our Website</h3>
              <p className="text-sm text-gray-600">
                irelandautotrade.ie
              </p>
            </div>
            <a
              href="https://www.facebook.com/marketplace"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl shadow-sm border border-border p-6 text-center hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-[#1877F2]/10 rounded-xl flex items-center justify-center">
                <FacebookIcon className="w-6 h-6 text-[#1877F2]" />
              </div>
              <h3 className="font-bold mb-1 group-hover:text-accent transition-colors">
                Facebook Marketplace
              </h3>
              <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                facebook.com/marketplace
                <ExternalLink className="w-3 h-3" />
              </p>
            </a>
            <a
              href="https://www.donedeal.ie"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl shadow-sm border border-border p-6 text-center hover:shadow-md transition-shadow group"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-[#00b67a]/10 rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-[#00b67a] rounded text-white flex items-center justify-center text-xs font-bold">
                  DD
                </div>
              </div>
              <h3 className="font-bold mb-1 group-hover:text-accent transition-colors">
                DoneDeal.ie
              </h3>
              <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
                donedeal.ie
                <ExternalLink className="w-3 h-3" />
              </p>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
            <h2 className="text-2xl font-bold mb-2 text-center">
              Submit Your Car Details
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Fill in the form below and we&apos;ll get back to you within 24
              hours
            </p>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-xl font-bold text-success mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-4">
                  We&apos;ve received your car details. We&apos;ll be in touch
                  within 24 hours to discuss next steps.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://wa.me/353877110508"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold py-3 px-6 rounded-xl transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Us Now
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="flex items-center justify-center gap-2 border-2 border-border hover:border-primary text-foreground font-semibold py-3 px-6 rounded-xl transition-colors"
                  >
                    Submit Another Car
                    <ArrowRight className="w-4 h-4" />
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
                      placeholder="John Murphy"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="085 123 4567"
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
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Car Make *
                    </label>
                    <input
                      type="text"
                      name="carMake"
                      value={formData.carMake}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g. Toyota"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Car Model *
                    </label>
                    <input
                      type="text"
                      name="carModel"
                      value={formData.carModel}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g. Corolla"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year *
                    </label>
                    <input
                      type="number"
                      name="carYear"
                      value={formData.carYear}
                      onChange={handleChange}
                      required
                      min="2000"
                      max="2025"
                      className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="2021"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mileage (km)
                    </label>
                    <input
                      type="text"
                      name="mileage"
                      value={formData.mileage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g. 50,000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Asking Price (&euro;)
                    </label>
                    <input
                      type="text"
                      name="askingPrice"
                      value={formData.askingPrice}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g. 15,000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Details
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Tell us about the condition, service history, any extras..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-hover text-white font-bold py-3.5 px-6 rounded-xl transition-colors text-lg"
                >
                  Submit Car Details
                </button>

                <p className="text-center text-xs text-gray-500">
                  Or message us on{" "}
                  <a
                    href="https://wa.me/353877110508"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] font-semibold"
                  >
                    WhatsApp
                  </a>{" "}|{" "}
                  <a
                    href="https://www.facebook.com/mike.mersar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1877F2] font-semibold"
                  >
                    Facebook
                  </a>{" "}|{" "}
                  <a
                    href="https://www.instagram.com/h_mou_de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E4405F] font-semibold"
                  >
                    Instagram
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
