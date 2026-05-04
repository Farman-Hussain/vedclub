"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, Globe, Camera, PlayCircle, Calendar, X } from "lucide-react";
import { urlFor } from "@/sanity/image";

export default function DoctorSidebar({ author, layout = "horizontal" }: { author: any, layout?: "horizontal" | "vertical" }) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when popup is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen]);

  if (!author) return null;

  const getInitials = (name: string) => name.split(' ').map((n: string) => n[0]).join('').substring(0, 2);
  const isVertical = layout === "vertical";

  return (
    <>
      {/* === 1. SMALL CLICKABLE TRIGGER BOX === */}
      <div 
        onClick={() => setIsOpen(true)} 
        className={`bg-white p-5 rounded-3xl shadow-sm border border-green-100 flex ${isVertical ? 'flex-col items-center text-center' : 'items-center'} gap-4 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition duration-300 group`}
      >
        {author.image ? (
          <img src={urlFor(author.image).width(80).height(80).url()} alt={author.name} className={`${isVertical ? 'w-20 h-20' : 'w-12 h-12'} rounded-full object-cover border-2 border-green-50 shadow-sm`} />
        ) : (
          <div className={`${isVertical ? 'w-20 h-20 text-xl' : 'w-12 h-12 text-sm'} rounded-full bg-green-100 text-[#1EAD16] flex items-center justify-center font-bold shadow-sm`}>
            {getInitials(author.name)}
          </div>
        )}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Reviewed By</p>
          <p className="font-bold text-[#1A361A] text-sm md:text-base leading-tight group-hover:text-[#1EAD16] transition">{author.name}</p>
          <p className="text-gray-500 text-xs mt-0.5 mb-2">{author.specialty}</p>
          <span className="text-xs font-bold text-[#1EAD16] bg-green-50 px-3 py-1 rounded-full">View Profile &rarr;</span>
        </div>
      </div>

      {/* === 2. THE POPUP MODAL === */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Dark blurred background (clicking it closes the modal) */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          
          {/* Modal Content Box */}
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg p-8 relative z-10 animate-fade-in max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 bg-gray-50 p-2 rounded-full hover:bg-red-50 hover:text-red-500 transition text-gray-500">
              <X size={20} />
            </button>

            {/* Profile Image */}
            <div className="flex justify-center mb-6">
              {author.image ? (
                <img src={urlFor(author.image).width(120).height(120).url()} alt={author.name} className="w-24 h-24 rounded-full object-cover border-4 border-green-50 shadow-md" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-green-100 text-[#1EAD16] flex items-center justify-center font-bold text-3xl shadow-md">
                  {getInitials(author.name)}
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold text-[#1A361A] mb-1">{author.name}</h4>
              <p className="text-[#1EAD16] font-bold text-sm bg-green-50 inline-block px-3 py-1 rounded-full">{author.specialty}</p>
            </div>

            {author.bio && <p className="text-gray-600 mb-8 text-center leading-relaxed text-sm">{author.bio}</p>}

            {/* Action Buttons Grid */}
            <div className="flex flex-col gap-3">
              {author.consultationLink && (
                <a href={author.consultationLink} target="_blank" rel="noreferrer" className="w-full bg-[#1A361A] hover:bg-[#1EAD16] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md">
                  <Calendar size={18} /> Book Online Consultation
                </a>
              )}
              <div className="grid grid-cols-2 gap-3">
                {author.whatsapp && (
                  <a href={`https://wa.me/${author.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="w-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                    <MessageCircle size={18} /> WhatsApp
                  </a>
                )}
                {author.call && (
                  <a href={`tel:${author.call}`} className="w-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                    <Phone size={18} /> Call Now
                  </a>
                )}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-gray-100">
              {author.instagram && <a href={author.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-600 transition"><Camera size={24}/></a>}
              {author.facebook && <a href={author.facebook} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition"><Globe size={24}/></a>}
              {author.youtube && <a href={author.youtube} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-600 transition"><PlayCircle size={24}/></a>}
            </div>

          </div>
        </div>
      )}
    </>
  );
}