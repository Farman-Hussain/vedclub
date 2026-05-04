import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Leaf, Stethoscope, BookOpen, Briefcase, HeartPulse, Utensils, Calendar } from "lucide-react";
import HideOnStudio from "./HideOnStudio";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./components/MobileMenu";
import MobileBottomBar from "./components/MobileBottomBar";
import { client } from "@/sanity/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ved Club | Authentic Ayurveda & Herbs",
  description: "Your digital library for Ayurvedic herbs, health tips, and AYUSH news.",
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%231EAD16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
  },
};

// Fetches the Search Library for the Mobile Bottom Bar!
async function getGlobalCatalog() {
  const query = `{
    "diseases": *[_type == "disease"] { title, slug },
    "herbs": *[_type == "herb"] { title, slug },
    "treatments": *[_type == "treatment"] { title, slug },
    "medicines": *[_type == "medicine"] { title, slug },
    "diets": *[_type == "diet"] { title, slug }
  }`;
  return await client.fetch(query, {}, { next: { revalidate: 60 } });
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const data = await getGlobalCatalog();
  const searchCatalog = [
    ...(data.diseases || []).map((d: any) => ({ title: d.title, link: `/diseases/${d.slug?.current}`, type: 'Disease' })),
    ...(data.herbs ||[]).map((h: any) => ({ title: h.title, link: `/herbs/${h.slug?.current}`, type: 'Herb' })),
    ...(data.treatments ||[]).map((t: any) => ({ title: t.title, link: `/treatments/${t.slug?.current}`, type: 'Treatment' })),
    ...(data.medicines ||[]).map((m: any) => ({ title: m.title, link: `/medicines/${m.slug?.current}`, type: 'Medicine' })),
    ...(data.diets ||[]).map((d: any) => ({ title: d.title, link: `/diets/${d.slug?.current}`, type: 'Diet Plan' }))
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#F9FAF8] text-[#1A361A]`} suppressHydrationWarning>
        
        <HideOnStudio>
          <header className="sticky top-0 z-[100] bg-white/90 backdrop-blur-lg border-b border-green-100 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                {/* LOGO */}
                <Link href="/" className="flex items-center gap-2 group">
                  <Leaf className="text-[#1EAD16] group-hover:scale-110 transition-transform duration-300" size={32} />
                  <span className="text-3xl font-extrabold text-[#1EAD16] tracking-tight">Ved Club</span>
                </Link>

                {/* DESKTOP NAVIGATION */}
                <nav className="hidden lg:flex space-x-6 font-medium text-sm items-center">
                  <Link href="/diseases" className="flex items-center gap-1 hover:text-[#1EAD16] transition-colors"><HeartPulse size={16}/> Diseases</Link>
                  <Link href="/treatments" className="flex items-center gap-1 hover:text-[#1EAD16] transition-colors"><Stethoscope size={16}/> Treatments</Link>
                  <Link href="/herbs" className="flex items-center gap-1 hover:text-[#1EAD16] transition-colors"><Leaf size={16}/> Herbs</Link>
                  <Link href="/medicines" className="flex items-center gap-1 hover:text-[#1EAD16] transition-colors"><BookOpen size={16}/> Medicines</Link>
                  <Link href="/diets" className="flex items-center gap-1 hover:text-[#1EAD16] transition-colors"><Utensils size={16}/> Diets</Link>
                  
                  {/* Language Switcher on Desktop */}
                  <div className="border-l border-gray-200 pl-6 ml-2">
                    <LanguageSwitcher />
                  </div>
                  
                  <Link href="/consultation" className="flex items-center gap-2 bg-[#1A361A] text-white px-4 py-2 rounded-full hover:bg-[#1EAD16] transition-colors shadow-sm ml-2">
                    <Calendar size={14}/> Consult
                  </Link>
                </nav>

                {/* 🔥 MOBILE MENU (Hamburger & Language Switcher) */}
                <MobileMenu />
              </div>
            </div>
          </header>
        </HideOnStudio>

        {/* 🔥 ADDED pb-24 so content isn't covered by sticky footer on mobile! */}
        <main className="min-h-screen pb-24 md:pb-0">
          {children}
        </main>

        <HideOnStudio>
          <footer className="bg-[#1A361A] text-green-50 py-16 pb-32 md:pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-2">
                <h3 className="text-3xl font-extrabold text-[#1EAD16] mb-4 flex items-center gap-2"><Leaf size={28} /> Ved Club</h3>
                <p className="text-sm text-green-200 leading-relaxed pr-8 max-w-md">
                  Empowering lives with ancient Ayurvedic wisdom, modern research, personalized diets, and the latest AYUSH updates. Rooted in nature, backed by science.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-white tracking-wider uppercase text-sm">Our Library</h4>
                <ul className="space-y-3 text-sm text-green-200 font-medium">
                  <li><Link href="/diseases" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Disease Management</Link></li>
                  <li><Link href="/treatments" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Panchakarma Therapies</Link></li>
                  <li><Link href="/herbs" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Materia Medica (Herbs)</Link></li>
                  <li><Link href="/medicines" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Classical Formulations</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 text-white tracking-wider uppercase text-sm">Resources</h4>
                <ul className="space-y-3 text-sm text-green-200 font-medium">
                  <li><Link href="/consultation" className="hover:text-white hover:translate-x-1 inline-block transition-transform text-[#1EAD16] font-bold">Book Consultation</Link></li>
                  <li><Link href="/diets" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Ayurvedic Diet Plans</Link></li>
                  <li><Link href="/health-tips" className="hover:text-white hover:translate-x-1 inline-block transition-transform">Daily Health Tips</Link></li>
                  <li><Link href="/news" className="hover:text-white hover:translate-x-1 inline-block transition-transform">AYUSH News & Jobs</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-green-900 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-xs text-green-400/80 max-w-2xl text-center md:text-left leading-relaxed">
                Disclaimer: The information on Ved Club is for educational purposes only and should not replace professional medical advice. Always consult your Ayurvedic physician (BAMS/MD) before starting any treatment.
              </p>
              <div className="flex gap-6 text-xs text-green-300 font-medium">
                <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
                <Link href="/terms-of-use" className="hover:text-white transition">Terms of Use</Link>
                <Link href="/disclaimer" className="hover:text-white transition">Disclaimer</Link>
              </div>
            </div>
            <p className="text-sm font-bold text-green-500 mt-8 text-center">© {new Date().getFullYear()} Ved Club. All rights reserved.</p>
          </footer>
          
          {/* 🔥 STICKY MOBILE BOTTOM BAR */}
          <MobileBottomBar searchData={searchCatalog} />
        </HideOnStudio>

      </body>
    </html>
  );
}