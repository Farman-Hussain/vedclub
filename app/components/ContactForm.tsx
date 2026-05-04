"use client";
import { useState } from "react";
import { submitQuery } from "@/app/actions/submitQuery";
import { CheckCircle2 } from "lucide-react";

export default function ContactForm({ isHindi = false }: { isHindi?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const res = await submitQuery(formData);
    if (res.success) setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4 animate-fade-in py-12">
        <CheckCircle2 size={64} className="text-[#1EAD16]" />
        <h3 className="text-2xl font-bold text-[#1A361A]">{isHindi ? "धन्यवाद!" : "Thank You!"}</h3>
        <p className="text-gray-600">{isHindi ? "आपकी क्वेरी सफलतापूर्वक सबमिट कर दी गई है। हमारी टीम जल्द ही आपसे संपर्क करेगी।" : "Your query has been submitted. Our team will contact you shortly."}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">{isHindi ? "पूरा नाम" : "Full Name"}</label>
          <input type="text" name="name" required className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1EAD16]" placeholder={isHindi ? "अपना नाम दर्ज करें" : "Enter your name"} />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">{isHindi ? "व्हाट्सएप / फोन" : "WhatsApp / Phone"}</label>
          <input type="text" name="phone" required className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1EAD16]" placeholder="+91 00000 00000" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">{isHindi ? "आप क्या खोज रहे हैं?" : "What are you looking for?"}</label>
        <select name="type" className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1EAD16] text-gray-600">
          <option>{isHindi ? "चिकित्सा बुक करें" : "Book a Treatment"}</option>
          <option>{isHindi ? "दवा की पूछताछ" : "Medicine Inquiry"}</option>
          <option>{isHindi ? "सामान्य स्वास्थ्य समस्या" : "General Health Issue"}</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">{isHindi ? "अपनी समस्या का वर्णन करें" : "Describe your issue / query"}</label>
        <textarea name="message" required rows={4} className="w-full bg-white border border-gray-200 px-5 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1EAD16] resize-none" placeholder={isHindi ? "मैं अनुभव कर रहा हूँ..." : "I have been experiencing..."}></textarea>
      </div>
      <button type="submit" disabled={loading} className="w-full bg-[#1EAD16] hover:bg-green-700 disabled:bg-gray-400 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-300">
        {loading ? (isHindi ? "भेज रहा है..." : "Submitting...") : (isHindi ? "सबमिट करें" : "Submit Query Securely")}
      </button>
    </form>
  );
}