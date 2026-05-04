import { ShieldCheck, Video, Phone, FileText, CheckCircle2 } from "lucide-react";
import ConsultationForm from "@/app/components/ConsultationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Online Ayurvedic Consultation | Ved Club",
  description: "Consult with expert Ayurvedic Doctors (BAMS/MD). Get personalized diet, lifestyle, and herbal medicine prescriptions based on your Prakriti.",
};

export default function ConsultationPage() {
  return (
    <div className="bg-[#F9FAF8] min-h-screen pb-24">
      {/* Hero Header */}
      <section className="bg-[#1A361A] text-white pt-20 pb-32 px-4 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[100px] translate-x-1/3"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-green-100 border border-white/20 mb-8">
            <ShieldCheck size={16} className="text-[#1EAD16]" /> Certified Ayurvedic Physicians
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">Book an Online <br/><span className="text-[#1EAD16]">Ayurvedic Consultation</span></h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">Get personalized treatment protocols from the comfort of your home. Root-cause healing tailored to your unique Dosha.</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[#1A361A] mb-6">How It Works</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0"><FileText className="text-[#1EAD16]" /></div>
                  <div><h4 className="font-bold text-[#1A361A]">1. Submit Request</h4><p className="text-sm text-gray-500 mt-1">Fill out the secure form with your basic health details.</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0"><Phone className="text-[#1EAD16]" /></div>
                  <div><h4 className="font-bold text-[#1A361A]">2. Confirmation Call</h4><p className="text-sm text-gray-500 mt-1">Our team will call you to confirm your preferred time slot.</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0"><Video className="text-[#1EAD16]" /></div>
                  <div><h4 className="font-bold text-[#1A361A]">3. Video/Audio Consult</h4><p className="text-sm text-gray-500 mt-1">Speak directly with Dr. Aman for a detailed Ayurvedic diagnosis.</p></div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-3xl border border-green-100">
              <h3 className="text-xl font-bold text-green-900 mb-4">What's Included?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-green-800"><CheckCircle2 className="text-[#1EAD16] shrink-0" size={20}/> Deep Nadi/Dosha Assessment</li>
                <li className="flex items-start gap-2 text-green-800"><CheckCircle2 className="text-[#1EAD16] shrink-0" size={20}/> Custom 7-Day Diet Plan</li>
                <li className="flex items-start gap-2 text-green-800"><CheckCircle2 className="text-[#1EAD16] shrink-0" size={20}/> Herbal Medicine Prescription</li>
                <li className="flex items-start gap-2 text-green-800"><CheckCircle2 className="text-[#1EAD16] shrink-0" size={20}/> Lifestyle (Vihara) Guidelines</li>
              </ul>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="lg:col-span-7">
            <ConsultationForm />
          </div>

        </div>
      </section>
    </div>
  );
}