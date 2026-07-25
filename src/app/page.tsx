import Link from "next/link";
import FeaturedCars from "@/components/FeaturedCars";
import Reveal from "@/components/Reveal";
import HeroParallax from "@/components/HeroParallax";
import CinematicShowcase from "@/components/CinematicShowcase";
import { ArrowRight, ShieldCheck, FileText, Search, Sparkles } from "lucide-react";

const BRANDS = [
  "Porsche", "Mercedes-Benz", "Audi", "BMW", "Land Rover",
  "Tesla", "Jaguar", "Volvo", "Lexus", "Volkswagen",
];

const HERO_IMG =
  "https://images.unsplash.com/photo-1653407497540-26207a2408d7?crop=entropy&cs=srgb&fm=jpg&q=85&w=2200&auto=format&fit=crop";
const SHOWCASE_IMG =
  "https://images.unsplash.com/photo-1532268116505-8c59cc37d2e6?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000&auto=format&fit=crop";
const DETAIL_IMG_1 =
  "https://images.unsplash.com/photo-1605437241278-c1806d14a4d9?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200&auto=format&fit=crop";
const DETAIL_IMG_2 =
  "https://images.unsplash.com/photo-1618642542397-ef97a739f1d7?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200&auto=format&fit=crop";

export default function Home() {
  return (
    <div>
      {/* ===== HERO (parallax) ===== */}
      <HeroParallax image={HERO_IMG}>
        <div className="max-w-2xl">
          <span className="fade-up inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-accent mb-6">
            <Sparkles className="w-4 h-4" />
            Premium used cars · Ireland
          </span>
          <h1 className="fade-up-2 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-white">
            The car you want.
            <br />
            <span className="text-accent">Delivered right.</span>
          </h1>
          <p className="fade-up-3 text-lg text-gray-300 leading-relaxed mt-7 max-w-xl">
            A curated collection of premium used cars — inspected, verified, and
            ready to drive away. Serving buyers and sellers across all of Ireland.
          </p>
          <div className="fade-up-4 flex flex-wrap gap-4 mt-10">
            <Link
              href="/cars"
              data-testid="hero-explore-btn"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-black font-semibold px-8 py-4 rounded-full transition-colors"
            >
              Explore inventory
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/sell-your-car"
              data-testid="hero-sell-btn"
              className="inline-flex items-center gap-2 border border-white/25 hover:border-accent text-white hover:text-accent font-semibold px-8 py-4 rounded-full transition-colors"
            >
              Sell your car
            </Link>
          </div>
        </div>
      </HeroParallax>

      {/* ===== BRAND MARQUEE ===== */}
      <section className="border-y border-border bg-black py-7 overflow-hidden">
        <div className="marquee-track">
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <span key={i} className="mx-8 text-lg font-display text-gray-500 whitespace-nowrap tracking-wide">
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* ===== THE COLLECTION ===== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.25em] text-accent">The Collection</span>
              <h2 className="font-display text-4xl sm:text-5xl text-white mt-4">
                Every car, hand-picked.
              </h2>
              <p className="text-gray-400 leading-relaxed mt-5">
                We don&apos;t list everything. We list the right things — each
                vehicle chosen, inspected and prepared to a standard we&apos;d
                drive ourselves.
              </p>
            </div>
            <Link href="/cars" className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-semibold whitespace-nowrap">
              View all cars
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <Reveal delay={100}>
            <FeaturedCars />
          </Reveal>
        </div>
      </section>

      {/* ===== CINEMATIC SHOWCASE (pinned scroll zoom) ===== */}
      <CinematicShowcase
        image={SHOWCASE_IMG}
        eyebrow="Every detail, considered"
        title="Not just a car. A standard you can feel."
        text="From the first glance to the final handover — obsessed with the details most people never notice."
      />

      {/* ===== ATTENTION TO DETAIL ===== */}
      <section className="py-24 bg-black border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <Reveal className="grid grid-cols-2 gap-4">
              <img src={DETAIL_IMG_1} alt="Car interior detail" className="rounded-2xl border border-border w-full h-64 object-cover mt-8" />
              <img src={DETAIL_IMG_2} alt="Premium car detail" className="rounded-2xl border border-border w-full h-64 object-cover" />
            </Reveal>
            <Reveal delay={120}>
              <span className="text-xs uppercase tracking-[0.25em] text-accent">Attention to detail</span>
              <h2 className="font-display text-4xl sm:text-5xl text-white mt-4">
                Built on trust, down to the last detail.
              </h2>
              <div className="mt-8 space-y-6">
                {[
                  { icon: ShieldCheck, title: "NCT Verified", desc: "Every car checked and roadworthy before sale." },
                  { icon: FileText, title: "Full History", desc: "Transparent service records available on request." },
                  { icon: Search, title: "Multi-point Inspection", desc: "Mechanical and cosmetic assessment on every vehicle." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl text-white">{item.title}</h3>
                      <p className="text-gray-400 text-sm mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== SELL WITH US ===== */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="relative rounded-3xl border border-border bg-surface overflow-hidden p-10 sm:p-16 text-center">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
            <div className="relative">
              <span className="text-xs uppercase tracking-[0.25em] text-accent">Sell with us</span>
              <h2 className="font-display text-4xl sm:text-5xl text-white mt-4">
                Got a car to sell? We&apos;ll handle it.
              </h2>
              <p className="text-gray-400 leading-relaxed mt-5 max-w-2xl mx-auto">
                Upload a few photos and details. Our team reviews every
                submission and comes back with a fair, market-based valuation —
                no pressure, no obligation.
              </p>
              <Link
                href="/sell-your-car"
                data-testid="sell-cta-btn"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-black font-semibold px-8 py-4 rounded-full transition-colors mt-9"
              >
                Start your valuation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
