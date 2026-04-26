import Link from "next/link";
import {
  Car,
  MessageCircle,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <Car className="w-7 h-7 text-accent" />
              <span>
                <span className="text-accent">Hamoude</span> Car Trade
              </span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted car dealer in the south of Ireland. We sell our own
              quality cars and help private sellers get the best price for
              theirs on commission.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/cars"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link
                  href="/sell-your-car"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-accent transition-colors text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.vehicleservices.gov.ie/cvo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-accent transition-colors text-sm flex items-center gap-1"
                >
                  Vehicle Ownership Transfer
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/marketplace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-accent transition-colors text-sm flex items-center gap-1"
                >
                  Facebook Marketplace
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.donedeal.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-accent transition-colors text-sm flex items-center gap-1"
                >
                  DoneDeal.ie
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.ncts.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-accent transition-colors text-sm flex items-center gap-1"
                >
                  NCT Booking
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0" />
                <a
                  href="https://wa.me/353877110508"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  +353 87 711 0508
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <FacebookIcon className="w-4 h-4 text-[#1877F2] flex-shrink-0" />
                <a
                  href="https://www.facebook.com/mike.mersar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Mike Mersar
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-300">
                <InstagramIcon className="w-4 h-4 text-[#E4405F] flex-shrink-0" />
                <a
                  href="https://www.instagram.com/h_mou_de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  @h_mou_de
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>South of Ireland</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a
                href="https://wa.me/353877110508"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-[#25D366] p-2 rounded-lg transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/mike.mersar"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-[#1877F2] p-2 rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/h_mou_de"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-[#E4405F] p-2 rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hamoude Car Trade. All rights reserved.</p>
          <p>
            Also find us on{" "}
            <a
              href="https://www.facebook.com/marketplace"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Facebook Marketplace
            </a>{" "}
            &amp;{" "}
            <a
              href="https://www.donedeal.ie"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              DoneDeal.ie
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
