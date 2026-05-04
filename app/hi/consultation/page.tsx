import { ShieldCheck, Video, Phone, FileText, CheckCircle2 } from "lucide-react";
import ConsultationForm from "@/app/components/ConsultationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ऑनलाइन आयुर्वेदिक परामर्श बुक करें | वेद क्लब",
  description: "विशेषज्ञ आयुर्वेदिक डॉक्टरों (BAMS/MD) से परामर्श लें। अपनी प्रकृति के आधार पर व्यक्तिगत आहार, जीवन शैली और हर्बल दवा प्राप्त करें।",
};

export default function HindiConsultationPage() {
  return (
    <div className="bg-[#F9FAF8] min-h-screen pb-24">
      {/* Hero Header */}
      <section className="bg-[#1A361A] text-white pt-20 pb-32 px-4 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[100px] translate-x-1/3"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-green-100 border border-white/20 mb-8">
            <ShieldCheck size={16} className="text-[#1EAD16]" /> प्रमाणित आयुर्वेदिक चिकित्सक
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">ऑनलाइन <span className="text-[#1EAD16]">आयुर्वेदिक परामर्श</span> बुक करें</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">अपने घर के आराम से व्यक्तिगत उपचार प्रोटोकॉल प्राप्त करें। आपके अद्वितीय दोष के अनुसार मूल कारण का इलाज।</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info Panel */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[#1A361A] mb-6">यह कैसे काम करता है?</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0"><FileText className="text-[#1EAD16]" /></div>
                  <div><h4 className="font-bold text-[#1A361A]">1. अनुरोध सबमिट करें</h4><p className="text-sm text-gray-500 mt-1">सुरक्षित फॉर्म में अपना बुनियादी स्वास्थ्य विवरण भरें।</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0"><Phone className="text-[#1EAD16]" /></div>
                  <div><h4 className="font-bold text-[#1A361A]">2. पुष्टिकरण कॉल</h4><p className="text-sm text-gray-500 mt-1">हमारी टीम आपके पसंदीदा समय की पुष्टि करने के लिए आपको कॉल करेगी।</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center shrink-0"><Video className="text-[#1EAD16]" /></div>
                  <div><h4 className="font-bold text-[#1A361A]">3. वीडियो/ऑडियो परामर्श</h4><p className="text-sm text-gray-500 mt-1">विस्तृत आयुर्वेदिक निदान के लिए डॉ. अमन से सीधे बात करें।</p></div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-3xl border border-green-100">
              <h3 className="text-xl font-bold text-green-900 mb-4">इसमें क्या शामिल है?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-green-800"><CheckCircle2 className="text-[#1EAD16] shrink-0" size={20}/> गहन नाड़ी/दोष मूल्यांकन</li>
                <li className="flex items-start gap-2 text-green-800"><CheckCircle2 className="text-[#1EAD16] shrink-0" size={20}/> 7-दिवसीय अनुकूलित आहार योजना</li>
                <li className="flex items-start gap-2 text-green-800"><CheckCircle2 className="text-[#1EAD16] shrink-0" size={20}/> हर्बल औषधि प्रिस्क्रिप्शन</li>
                <li className="flex items-start gap-2 text-green-800"><CheckCircle2 className="text-[#1EAD16] shrink-0" size={20}/> जीवन शैली (विहार) दिशानिर्देश</li>
              </ul>
            </div>
          </div>

          {/* Right Form Panel with isHindi set to true! */}
          <div className="lg:col-span-7">
            <ConsultationForm isHindi={true} />
          </div>

        </div>
      </section>
    </div>
  );
}