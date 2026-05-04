"use client";
import { useState, useEffect, useRef } from "react";
import { Search, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function GlobalSearch({ searchData }: { searchData: any[] }) {
  const[query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  },[]);

  const results = searchData.filter(item => item.title.toLowerCase().includes(query.toLowerCase())).slice(0, 6);

  return (
    <div ref={wrapperRef} className="w-full max-w-2xl mx-auto relative z-50">
      <div className="bg-white p-2 rounded-full shadow-2xl flex items-center relative group hover:shadow-[0_0_40px_rgba(30,173,22,0.3)] transition-all duration-500 border border-green-50">
        <Search className="text-gray-400 ml-4 shrink-0" size={24} />
        <input 
          type="text" 
          placeholder="Search for Ashwagandha, Shirodhara..." 
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          className="w-full py-4 px-4 bg-transparent focus:outline-none text-gray-800 text-lg placeholder-gray-400"
        />
        <button className="bg-[#1A361A] hover:bg-[#1EAD16] text-white px-8 py-4 rounded-full font-bold transition-colors shrink-0">
          Search
        </button>
      </div>

      {/* AUTOCOMPLETE DROPDOWN */}
      {isOpen && query.length > 1 && (
        <div className="absolute top-full mt-4 left-0 w-full bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in flex flex-col">
          {results.length > 0 ? (
            results.map((item, i) => (
              <Link href={item.link} key={i} onClick={() => setIsOpen(false)} className="flex items-center justify-between px-6 py-4 hover:bg-green-50 border-b border-gray-50 transition last:border-0 group">
                <div>
                  <h4 className="text-[#1A361A] font-bold text-lg group-hover:text-[#1EAD16] transition">{item.title}</h4>
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{item.type}</span>
                </div>
                <ChevronRight className="text-gray-300 group-hover:text-[#1EAD16] transition-transform group-hover:translate-x-1" size={20} />
              </Link>
            ))
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">No results found for "{query}"</div>
          )}
        </div>
      )}
    </div>
  );
}