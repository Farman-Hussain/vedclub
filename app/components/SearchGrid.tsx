"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ArrowRight, Leaf } from "lucide-react";
import { urlFor } from "@/sanity/image";

export default function SearchGrid({ items, type, basePath }: { items: any[], type: string, basePath: string }) {
  const [search, setSearch] = useState("");

  // Filters items based on title or short description
  const filteredItems = items.filter(item => 
    item.title?.toLowerCase().includes(search.toLowerCase()) || 
    (item.botanicalName && item.botanicalName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto mb-12 group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="text-gray-400 group-focus-within:text-[#1EAD16] transition-colors" size={20} />
        </div>
        <input
          type="text"
          placeholder={`Search ${type}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-green-50 bg-white shadow-sm focus:outline-none focus:border-[#1EAD16] focus:ring-4 focus:ring-green-50 transition-all text-lg"
        />
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <Link href={`${basePath}/${item.slug.current}`} key={index} className="group flex flex-col bg-white rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
              {/* Image Section */}
              <div className="w-full aspect-[4/3] relative bg-green-50 overflow-hidden">
                {item.images && item.images[0] ? (
                  <Image src={urlFor(item.images[0]).url()} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center"><Leaf className="text-green-200" size={48} /></div>
                )}
              </div>
              
              {/* Text Section */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-[#1A361A] mb-2 group-hover:text-[#1EAD16] transition-colors">{item.title}</h3>
                {item.botanicalName && <p className="text-sm text-gray-500 italic mb-3">{item.botanicalName}</p>}
                
                {/* Fallback description for different schemas */}
                <p className="text-gray-600 line-clamp-3 mb-6 flex-1 text-sm">
                  {item.shortDescription && typeof item.shortDescription === 'string' ? item.shortDescription : 
                   (item.seoDescription || "Discover the complete Ayurvedic details, benefits, and uses.")}
                </p>
                
                <div className="flex items-center text-[#1EAD16] font-bold text-sm mt-auto">
                  Read More <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-gray-500 text-lg">
            No {type.toLowerCase()} found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}