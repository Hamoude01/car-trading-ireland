import Link from "next/link";
import {
  Shield,
  Users,
  MapPin,
  Target,
  Heart,
  Award,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";

export default function AboutPage() {
  return (
    <div className="bg-muted min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-b from-[#141417] to-black text-white py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            About Hamoude Car Trade
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your trusted partner for buying and selling quality cars across
            Ireland
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Our Story */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-8 mb-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Hamoude Car Trade was born out of a passion for cars and a
                desire to make the car buying and selling experience better for
                everyone in Ireland. We saw an
                opportunity to bridge the gap between private sellers and buyers
                with a trusted, professional service.
              </p>
              <p>
                We operate a dual model &mdash; we sell our own carefully
                selected stock of quality used cars, and we also offer a
                commission-based selling service for private owners who want the
                hassle taken out of selling their vehicle.
              </p>
              <p>
                Every car that passes through our hands is thoroughly inspected,
                with full history checks completed. We believe in transparency,
                fair pricing, and building long-term relationships with our
                customers.
              </p>
              <p>
                We list all our cars across multiple platforms including our
                own website, Facebook Marketplace, and DoneDeal.ie to ensure
                maximum visibility and the quickest possible sale.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-border p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Trust &amp; Transparency</h3>
            <p className="text-gray-600 text-sm">
              Full history checks on every car. No hidden surprises. What you
              see is what you get.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-border p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
              <Heart className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Customer First</h3>
            <p className="text-gray-600 text-sm">
              Whether buying or selling, your satisfaction is our priority.
              We&apos;re here to help every step of the way.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-border p-6 text-center">
            <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
              <Award className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Quality Guaranteed</h3>
            <p className="text-gray-600 text-sm">
              We only deal in quality vehicles. Every car meets our strict
              standards before being listed for sale.
            </p>
          </div>
        </div>

        {/* What We Do */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-bold text-xl">We Sell Our Own Cars</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              We carefully source quality used cars and offer them at
              competitive prices. Each car is fully inspected with NCT and tax
              checked. Browse our current stock online or get in touch.
            </p>
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-semibold transition-colors"
            >
              Browse Our Cars
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-bold text-xl">Commission Sales</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Have a car to sell? We handle everything on a commission basis.
              Your car gets listed across our website, Facebook Marketplace, and
              DoneDeal.ie for maximum exposure.
            </p>
            <Link
              href="/sell-your-car"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-semibold transition-colors"
            >
              Learn More About Selling
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Find Us Online */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Find Us Online
          </h2>
          <p className="text-gray-600 text-center mb-6 max-w-xl mx-auto">
            We&apos;re active across multiple platforms. Reach out or follow us
            anywhere:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <a
              href="https://wa.me/353877110508"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366]/5 hover:bg-[#25D366]/10 border border-[#25D366]/20 px-5 py-4 rounded-xl transition-colors"
            >
              <MessageCircle className="w-6 h-6 text-[#25D366]" />
              <span className="font-semibold">WhatsApp</span>
            </a>
            <a
              href="https://www.facebook.com/share/1G3xANNdoR/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#1877F2]/5 hover:bg-[#1877F2]/10 border border-[#1877F2]/20 px-5 py-4 rounded-xl transition-colors"
            >
              <FacebookIcon className="w-6 h-6 text-[#1877F2]" />
              <span className="font-semibold">Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/h_mou_de"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#E4405F]/5 hover:bg-[#E4405F]/10 border border-[#E4405F]/20 px-5 py-4 rounded-xl transition-colors"
            >
              <InstagramIcon className="w-6 h-6 text-[#E4405F]" />
              <span className="font-semibold">Instagram</span>
            </a>
            <a
              href="https://www.donedeal.ie"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#00b67a]/5 hover:bg-[#00b67a]/10 border border-[#00b67a]/20 px-5 py-4 rounded-xl transition-colors"
            >
              <div className="w-6 h-6 bg-[#00b67a] rounded text-white flex items-center justify-center text-xs font-bold">
                DD
              </div>
              <span className="font-semibold">DoneDeal</span>
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold">Our Location</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4">
            We serve customers across all of Ireland &mdash; North and South.
            Contact us to arrange a viewing or test drive at a time that suits
            you.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Get In Touch
            </Link>
            <a
              href="https://wa.me/353877110508"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
