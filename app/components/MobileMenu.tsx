"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 🔥 Added to detect Hindi pages
import { Menu, X, HeartPulse, Stethoscope, Leaf, BookOpen, Utensils, Briefcase } from "lucide-react";
import LanguageSwitcher from "../LanguageSwitcher"; // 🔥 Fixed import path!

export default function MobileMenu() {
  const[isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Automatically detects if the user is on a Hindi route
  const isHindi = pathname.startsWith("/hi");

  return (
    <div className="lg:hidden flex items-center gap-3">
      {/* Language Switcher */}
      <LanguageSwitcher />
      
      <button onClick={() => setIsOpen(true)} className="text-[#1A361A] p-2 bg-green-50 rounded-xl active:scale-95 transition-transform">
        <Menu size={24} />
      </button>

      {/* Slide-out Hamburger Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-[110] flex flex-col p-6 animate-fade-in overflow-y-auto">
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
            <span className="text-3xl font-extrabold text-[#1EAD16] tracking-tight">
              {isHindi ? "वेद क्लब" : "Ved Club"}
            </span>
            <button onClick={() => setIsOpen(false)} className="p-3 bg-red-50 rounded-full text-red-500 active:scale-95 transition-transform">
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6 text-xl font-bold text-[#1A361A]">
            <Link onClick={() => setIsOpen(false)} href={isHindi ? "/hi/diseases" : "/diseases"} className="flex items-center gap-4 p-2 active:bg-gray-50 rounded-xl"><HeartPulse className="text-red-500" size={28}/> {isHindi ? "रोग प्रबंधन" : "Diseases"}</Link>
            <Link onClick={() => setIsOpen(false)} href={isHindi ? "/hi/treatments" : "/treatments"} className="flex items-center gap-4 p-2 active:bg-gray-50 rounded-xl"><Stethoscope className="text-blue-500" size={28}/> {isHindi ? "उपचार" : "Treatments"}</Link>
            <Link onClick={() => setIsOpen(false)} href={isHindi ? "/hi/herbs" : "/herbs"} className="flex items-center gap-4 p-2 active:bg-gray-50 rounded-xl"><Leaf className="text-green-500" size={28}/> {isHindi ? "जड़ी-बूटियां" : "Herbs"}</Link>
            <Link onClick={() => setIsOpen(false)} href={isHindi ? "/hi/medicines" : "/medicines"} className="flex items-center gap-4 p-2 active:bg-gray-50 rounded-xl"><BookOpen className="text-orange-500" size={28}/> {isHindi ? "औषधियां" : "Medicines"}</Link>
            <Link onClick={() => setIsOpen(false)} href={isHindi ? "/hi/diets" : "/diets"} className="flex items-center gap-4 p-2 active:bg-gray-50 rounded-xl"><Utensils className="text-yellow-600" size={28}/> {isHindi ? "आहार योजना" : "Diets"}</Link>
            <Link onClick={() => setIsOpen(false)} href={isHindi ? "/hi/health-tips" : "/health-tips"} className="flex items-center gap-4 p-2 active:bg-gray-50 rounded-xl"><span className="text-2xl">💡</span> {isHindi ? "स्वास्थ्य टिप्स" : "Health Tips"}</Link>
            <Link onClick={() => setIsOpen(false)} href={isHindi ? "/hi/news" : "/news"} className="flex items-center gap-4 p-2 active:bg-gray-50 rounded-xl"><Briefcase className="text-cyan-600" size={28}/> {isHindi ? "आयुष समाचार" : "AYUSH News"}</Link>
          </nav>
        </div>
      )}
    </div>
  );
}