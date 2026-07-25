import Link from "next/link";
import { MessageCircle, MapPin, Mail, Phone, Send } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-border" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link href="/" className="font-display text-2xl tracking-tight text-white">
              Hamoude<span className="text-accent">CarTrade</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mt-4 max-w-xs">
              Ireland&apos;s destination for premium used cars. Every vehicle
              inspected, NCT verified, and delivered with a level of care worthy
              of the marque.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://wa.me/353877110508"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-gray-300 hover:border-accent hover:text-accent transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/h_mou_de"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-gray-300 hover:border-accent hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/h_mou_de"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-gray-300 hover:border-accent hover:text-accent transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/mike.mersar"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-gray-300 hover:border-accent hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-5">
              Explore
            </h3>
            <ul className="space-y-3">
              <li><Link href="/cars" className="text-gray-300 hover:text-accent transition-colors text-sm">Inventory</Link></li>
              <li><Link href="/sell-your-car" className="text-gray-300 hover:text-accent transition-colors text-sm">Sell Your Car</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-accent transition-colors text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-accent transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-5">
              Useful
            </h3>
            <ul className="space-y-3">
              <li><a href="https://www.vehicleservices.gov.ie/cvo" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-colors text-sm">Ownership Transfer</a></li>
              <li><a href="https://www.donedeal.ie" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-colors text-sm">DoneDeal.ie</a></li>
              <li><a href="https://www.facebook.com/marketplace" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-colors text-sm">Facebook Marketplace</a></li>
              <li><a href="https://www.ncts.ie" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-accent transition-colors text-sm">NCT Booking</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 mb-5">
              Get in touch
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <span>Carrickmacross, Co. Monaghan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="https://wa.me/353877110508" className="hover:text-accent transition-colors">087 711 0508</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                <a href="mailto:hamoudemersar902@gmail.com" className="hover:text-accent transition-colors break-all">hamoudemersar902@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center sm:text-left">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} HamoudeCarTrade — Car Trading Ireland. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
