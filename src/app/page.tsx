import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import FeaturedCars from "@/components/FeaturedCars";
import CarCount from "@/components/CarCount";
import {
  Shield,
  Handshake,
  TrendingUp,
  ArrowRight,
  ExternalLink,
  Star,
  Users,
  Car,
  MessageCircle,
} from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";

export default function Home() {

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-[#072a40] text-white">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-6">
              <Star className="w-4 h-4 text-accent" />
              <span>Trusted Car Sales Across Ireland</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Find Your Perfect
              <br />
              <span className="text-accent">Car Today</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              Welcome to <strong className="text-white">Hamoude Car Trade</strong> &mdash; browse
              our selection of quality used cars or let us sell your car for you.
              Serving buyers and sellers across all of Ireland.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <SearchBar />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-accent" />
              <span>
                <CarCount />+ Cars
                Available
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              <span>
                <strong className="text-white">100+</strong> Happy Customers
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent" />
              <span>All Cars Checked &amp; Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                Featured Cars
              </h2>
              <p className="text-gray-600 mt-1">
                Hand-picked quality vehicles at great prices
              </p>
            </div>
            <Link
              href="/cars"
              className="flex items-center gap-2 text-accent hover:text-accent-hover font-semibold transition-colors"
            >
              View All Cars
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <FeaturedCars />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Why Choose Hamoude Car Trade?
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              More than just a car dealer &mdash; your trusted partner in finding
              or selling the right car in Ireland
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-muted border border-border hover:shadow-md transition-shadow">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every car is thoroughly inspected before sale. Full history
                checks and NCT &amp; tax verification on every vehicle.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-muted border border-border hover:shadow-md transition-shadow">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                <Handshake className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">
                Commission Sales Service
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Want to sell your car? We handle everything &mdash; photos, enquiries,
                test drives. You only pay when it sells.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-muted border border-border hover:shadow-md transition-shadow">
              <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Multi-Platform Reach</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your car gets listed on our website, Facebook Marketplace, and
                DoneDeal.ie for maximum exposure and faster sales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sell Your Car CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold mb-4">
                Want to Sell Your Car?
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                We offer a hassle-free commission-based selling service. Your
                car gets listed on our site, Facebook Marketplace, and
                DoneDeal.ie. We handle the advertising, enquiries, test drives,
                and paperwork.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/sell-your-car"
                  className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-8 rounded-xl transition-colors"
                >
                  Get Started
                </Link>
                <a
                  href="https://wa.me/353877110508"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold py-3 px-8 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6 min-w-[280px]">
              <h3 className="font-semibold text-lg text-center mb-2">
                Find Us On
              </h3>
              <a
                href="https://www.facebook.com/mike.mersar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl transition-colors"
              >
                <FacebookIcon className="w-6 h-6 text-[#1877F2]" />
                <span className="font-medium">Facebook &mdash; Mike Mersar</span>
                <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
              </a>
              <a
                href="https://www.instagram.com/h_mou_de"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl transition-colors"
              >
                <InstagramIcon className="w-6 h-6 text-[#E4405F]" />
                <span className="font-medium">Instagram &mdash; @h_mou_de</span>
                <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
              </a>
              <a
                href="https://www.facebook.com/marketplace"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl transition-colors"
              >
                <FacebookIcon className="w-6 h-6 text-[#1877F2]" />
                <span className="font-medium">Facebook Marketplace</span>
                <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
              </a>
              <a
                href="https://www.donedeal.ie"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-xl transition-colors"
              >
                <div className="w-6 h-6 bg-[#00b67a] rounded text-white flex items-center justify-center text-xs font-bold">
                  DD
                </div>
                <span className="font-medium">DoneDeal.ie</span>
                <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Ownership Transfer */}
      <section className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm border border-border p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-14 h-14 bg-success/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-7 h-7 text-success" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-lg">
                Vehicle Ownership Transfer
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Change of vehicle ownership can be completed online through the
                official government portal. We can help guide you through the
                process.
              </p>
            </div>
            <a
              href="https://www.vehicleservices.gov.ie/cvo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-xl transition-colors whitespace-nowrap"
            >
              Transfer Online
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
