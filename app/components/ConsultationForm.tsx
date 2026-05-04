"use client";
import { useState } from "react";
import { submitQuery } from "@/app/actions/submitQuery";
import { CheckCircle2, CalendarDays } from "lucide-react";

export default function ConsultationForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    
    // We combine the extra fields into the single "message" database field!
    const combinedMessage = `
Age: ${form.get('age')}
Gender: ${form.get('gender')}
Preferred Date: ${form.get('date')}
Primary Concern: ${form.get('concern')}
    `;

    const payload = new FormData();
    payload.append("name", form.get("name") as string);
    payload.append("phone", form.get("phone") as string);
    payload.append("type", "Online Consultation Booking");
    payload.append("message", combinedMessage);

    const res = await submitQuery(payload);
    if (res.success) setSuccess(true);
    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-green-50 rounded-3xl p-12 text-center flex flex-col items-center animate-fade-in border border-green-100 shadow-sm">
        <CheckCircle2 size={64} className="text-[#1EAD16] mb-4" />
        <h3 className="text-3xl font-bold text-[#1A361A] mb-2">Booking Requested!</h3>
        <p className="text-gray-600">Dr. Aman's team has received your details and will call you shortly on your registered number to confirm the consultation time.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 space-y-6">
      <h3 className="text-2xl font-bold text-[#1A361A] border-b border-gray-100 pb-4 mb-6">Patient Details</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
          <input type="text" name="name" required className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl focus:ring-2 focus:ring-[#1EAD16]" placeholder="Patient's Name" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp Number <span className="text-red-500">*</span></label>
          <input type="text" name="phone" required className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl focus:ring-2 focus:ring-[#1EAD16]" placeholder="+91" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Age</label>
          <input type="number" name="age" required className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl focus:ring-2 focus:ring-[#1EAD16]" placeholder="Years" />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Gender</label>
          <select name="gender" className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl focus:ring-2 focus:ring-[#1EAD16]">
            <option>Male</option><option>Female</option><option>Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Date</label>
          <input type="date" name="date" required className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl focus:ring-2 focus:ring-[#1EAD16] text-gray-600" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Primary Health Concern <span className="text-red-500">*</span></label>
        <textarea name="concern" required rows={4} className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl focus:ring-2 focus:ring-[#1EAD16] resize-none" placeholder="Briefly describe your symptoms or reason for consultation..."></textarea>
      </div>

      <button type="submit" disabled={loading} className="w-full bg-[#1A361A] hover:bg-[#1EAD16] disabled:bg-gray-400 text-white font-bold text-xl py-5 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-2">
        <CalendarDays /> {loading ? "Processing..." : "Request Consultation"}
      </button>
      <p className="text-xs text-center text-gray-400 mt-4">By submitting, you agree to our terms of service and privacy policy.</p>
    </form>
  );
}