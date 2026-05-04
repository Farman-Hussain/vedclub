"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Calendar, ChevronRight } from "lucide-react";

export default function MobileBottomBar({ searchData }: { searchData: any[] }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  
  // Disable body scroll when full-screen search is open
  useEffect(() => {
    if (isSearchOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  },[isSearchOpen]);

  const results = searchData.filter(item => item.title.toLowerCase().includes(query.toLowerCase())).slice(0, 8);

  return (
    <>
      {/* 1. STICKY BOTTOM BAR */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-lg border-t border-gray-100 z-[90] pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
        <div className="flex p-3 gap-3">
          {/* SEARCH BUTTON (Left) */}
          <button onClick={() => setIsSearchOpen(true)} className="flex items-center justify-center w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl text-gray-600 active:scale-95 transition-transform shadow-sm">
            <Search size={24} />
          </button>
          {/* CONSULT BUTTON (Right) */}
          <Link href="/consultation" className="flex-1 bg-[#1A361A] text-white flex items-center justify-center rounded-2xl font-bold text-lg gap-2 shadow-lg shadow-green-900/20 active:scale-95 transition-transform">
            <Calendar size={20} /> Book Consult
          </Link>
        </div>
      </div>

      {/* 2. FULLSCREEN LIVE SEARCH MODAL */}
      {isSearchOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-[120] flex flex-col animate-fade-in">
          <div className="flex items-center p-4 border-b border-gray-100 gap-3 pt-6">
            <div className="flex-1 bg-gray-50 flex items-center rounded-2xl px-4 py-3 border border-gray-200">
              <Search size={20} className="text-gray-400 mr-2" />
              <input 
                autoFocus
                type="text" 
                placeholder="Search diseases, herbs, diets..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-lg text-gray-800"
              />
            </div>
            <button onClick={() => {setIsSearchOpen(false); setQuery("");}} className="p-3 text-red-500 font-bold active:scale-95 transition-transform">
              Cancel
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-[#F9FAF8]">
            {query.length > 1 ? (
              results.length > 0 ? (
                <div className="flex flex-col space-y-3">
                  {results.map((item, i) => (
                    <Link href={item.link} key={i} onClick={() => {setIsSearchOpen(false); setQuery("");}} className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform">
                      <div>
                        <h4 className="text-[#1A361A] font-bold text-lg">{item.title}</h4>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#1EAD16]">{item.type}</span>
                      </div>
                      <ChevronRight className="text-gray-300" size={20} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 mt-10 text-lg">No results found for "{query}"</div>
              )
            ) : (
              <div className="text-center text-gray-400 mt-16 flex flex-col items-center">
                <Search size={48} className="opacity-20 mb-4"/>
                <p className="text-lg">Type to search our Ayurvedic database</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}