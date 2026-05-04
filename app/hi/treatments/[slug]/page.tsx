import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Clock, Activity, HeartPulse, AlertTriangle, CheckCircle2, Calendar, Phone, MessageCircle, BookOpen, Stethoscope, Globe, Camera, PlayCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import DoctorSidebar from "@/app/components/DoctorSidebar"; // 🔥 Imported Popup Sidebar

async function getTreatment(baseSlug: string) {
  const hiSlug = `${baseSlug}-hi`;
  const query = `*[_type == "treatment" && (slug.current == $hiSlug || slug.current == $baseSlug) && language == 'hi'][0]{ ..., author-> }`;
  return await client.fetch(query, { hiSlug, baseSlug });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const treatment = await getTreatment(slug);
  if (!treatment) return {};
  return { title: treatment.seoTitle || `${treatment.title} | वेद क्लब`, description: treatment.seoDescription || treatment.shortDescription };
}

const ptComponents = {
  block: {
    h2: ({children}: any) => <h2 className="text-2xl font-bold mt-6 mb-4 text-[#1A361A]">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-xl font-bold mt-4 mb-2 text-[#1A361A]">{children}</h3>,
    normal: ({children}: any) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
  },
  list: { bullet: ({children}: any) => <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2">{children}</ul> },
  marks: { strong: ({children}: any) => <strong className="font-bold text-[#1A361A]">{children}</strong> }
};

export default async function HindiTreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const treatment = await getTreatment(slug);

  if (!treatment) return notFound();
  const getInitials = (name: string) => name.split(' ').map((n: string) => n[0]).join('').substring(0, 2);

  return (
    <div className="bg-[#F9FAF8] min-h-screen pb-20 scroll-smooth">
      {treatment.customSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: treatment.customSchema }} />}

      <section className="bg-[#1A361A] text-white pt-12 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 animate-fade-in">
            <Link href="/hi/treatments" className="inline-flex items-center text-green-200 hover:text-white mb-8 transition-colors text-sm font-medium">
              <ArrowLeft size={16} className="mr-2" /> वापस जाएं
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-800 text-green-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">आयुर्वेदिक चिकित्सा</span>
              {treatment.duration && <span className="flex items-center gap-1 text-green-200 text-sm"><Clock size={14} /> {treatment.duration}</span>}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">{treatment.title}</h1>
            <p className="text-lg md:text-xl text-green-100 max-w-2xl leading-relaxed mb-8">{treatment.shortDescription}</p>
            
            {treatment.consultationLink && (
              <a href={treatment.consultationLink} target="_blank" rel="noreferrer" className="bg-white text-[#1A361A] px-8 py-4 rounded-full font-bold text-lg inline-flex items-center gap-2 hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-1">
                <Calendar size={20} /> परामर्श बुक करें
              </a>
            )}
          </div>

          <div className="w-full max-w-md aspect-square p-2 bg-white/10 rounded-[2.5rem] backdrop-blur-sm border border-white/20 relative">
             {treatment.images && treatment.images.length > 0 ? (
                <>
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl bg-white">
                    <div className="flex overflow-x-auto snap-x snap-mandatory w-full h-full hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
                      {treatment.images.map((img: any, i: number) => (
                        <div key={i} className="snap-center shrink-0 w-full h-full relative">
                          <Image src={urlFor(img).url()} alt={`${treatment.title} step ${i+1}`} fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                  {treatment.images.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg text-xs font-bold text-white flex gap-2 z-10 items-center">
                      <span className="animate-pulse">←</span> स्वाइप करें <span className="animate-pulse">→</span>
                    </div>
                  )}
                </>
             ) : (
                <div className="w-full h-full bg-green-900 rounded-[2rem] flex items-center justify-center">
                   <Stethoscope size={64} className="text-green-700 opacity-50" />
                </div>
             )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 flex flex-col md:flex-row gap-12 relative z-10">
        
        <div className="md:w-1/4 hidden md:block">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="font-bold text-[#1A361A] mb-4 uppercase tracking-wider text-sm">विषय सूची</h3>
              <ul className="space-y-3 text-gray-600 font-medium text-sm">
                {treatment.overview && <li><a href="#overview" className="hover:text-[#1EAD16] transition">अवलोकन</a></li>}
                {treatment.benefits && <li><a href="#benefits" className="hover:text-[#1EAD16] transition">प्रमुख लाभ</a></li>}
                {treatment.steps && <li><a href="#steps" className="hover:text-[#1EAD16] transition">प्रक्रिया के चरण</a></li>}
                {treatment.whoIsItFor && <li><a href="#indications" className="hover:text-[#1EAD16] transition">किसके लिए उपयुक्त</a></li>}
                {treatment.additionalContent && <li><a href="#additional" className="hover:text-[#1EAD16] transition">{treatment.additionalContentHeading || 'अतिरिक्त जानकारी'}</a></li>}
                {treatment.summary && <li><a href="#summary" className="hover:text-[#1EAD16] transition">निष्कर्ष</a></li>}
                {treatment.faqs && <li><a href="#faqs" className="hover:text-[#1EAD16] transition">पूछे जाने वाले प्रश्न</a></li>}
                {treatment.references && <li><a href="#references" className="hover:text-[#1EAD16] transition">संदर्भ</a></li>}
              </ul>
            </div>
            
            {/* 🔥 ADDED THE INTERACTIVE POPUP SIDEBAR HERE */}
            <DoctorSidebar author={treatment.author} layout="vertical" />
          </div>
        </div>

        <div className="md:w-3/4 space-y-12">
          {/* ... Content sections (Overview, Benefits, Steps, etc) remain exactly the same ... */}
          {treatment.overview && (
            <section id="overview" className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 scroll-mt-28">
              <h2 className="text-2xl font-bold text-[#1A361A] mb-6 flex items-center gap-2"><Activity className="text-[#1EAD16]" /> {treatment.title} क्या है?</h2>
              <div className="text-gray-700 leading-relaxed text-lg"><PortableText value={treatment.overview} components={ptComponents} /></div>
            </section>
          )}

          {treatment.benefits && (
            <section id="benefits" className="bg-green-50/50 p-8 md:p-10 rounded-3xl border border-green-100 scroll-mt-28">
              <h2 className="text-2xl font-bold text-[#1A361A] mb-6 flex items-center gap-2"><CheckCircle2 className="text-[#1EAD16]" /> प्रमुख स्वास्थ्य लाभ</h2>
              <PortableText value={treatment.benefits} components={ptComponents} />
            </section>
          )}

          {treatment.steps && (
             <section id="steps" className="scroll-mt-28">
               <h2 className="text-3xl font-bold text-[#1A361A] mb-8">यह कैसे काम करता है (चरण)</h2>
               <div className="space-y-6">
                 {treatment.steps.map((step: any, index: number) => (
                   <div key={index} className="flex gap-6 bg-white p-6 rounded-3xl shadow-md border border-gray-100 hover:-translate-y-1 transition duration-300">
                     <div className="flex flex-col items-center">
                       <div className="w-12 h-12 rounded-full bg-green-100 text-[#1EAD16] flex items-center justify-center font-bold text-xl shrink-0">{index + 1}</div>
                       {index !== treatment.steps.length - 1 && <div className="w-1 h-full bg-green-50 mt-4 rounded-full"></div>}
                     </div>
                     <div className="pb-4 pt-2">
                       <h3 className="text-xl font-bold text-[#1A361A] mb-3">{step.stepName}</h3>
                       <div className="text-gray-600 leading-relaxed"><PortableText value={step.description} components={ptComponents} /></div>
                     </div>
                   </div>
                 ))}
               </div>
             </section>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {treatment.whoIsItFor && (
              <section id="indications" className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 scroll-mt-28">
                <h3 className="text-xl font-bold text-[#1A361A] mb-4 flex items-center gap-2"><HeartPulse className="text-blue-500" /> किसके लिए उपयुक्त है</h3>
                <PortableText value={treatment.whoIsItFor} components={ptComponents} />
              </section>
            )}
            {treatment.contraindications && (
              <section className="bg-red-50/50 p-8 rounded-3xl border border-red-100">
                <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2"><AlertTriangle className="text-red-500" /> किन्हें बचना चाहिए</h3>
                <PortableText value={treatment.contraindications} components={ptComponents} />
              </section>
            )}
          </div>

          {treatment.additionalContent && (
            <section id="additional" className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-bold text-[#1A361A] mb-6">{treatment.additionalContentHeading || 'अतिरिक्त जानकारी'}</h2>
              <PortableText value={treatment.additionalContent} components={ptComponents} />
            </section>
          )}

          {treatment.summary && (
            <section id="summary" className="bg-gradient-to-br from-green-50 to-white p-8 rounded-3xl border border-green-100 shadow-sm scroll-mt-28">
              <h2 className="text-2xl font-bold text-[#1A361A] mb-4">निष्कर्ष</h2>
              <PortableText value={treatment.summary} components={ptComponents} />
            </section>
          )}

          {treatment.faqs && treatment.faqs.length > 0 && (
            <section id="faqs" className="scroll-mt-28">
              <h2 className="text-3xl font-bold text-[#1A361A] mb-8">अक्सर पूछे जाने वाले प्रश्न</h2>
              <div className="space-y-4">
                {treatment.faqs.map((faq: any, i: number) => (
                  <details key={i} className="group bg-white rounded-2xl shadow-sm border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-6 font-bold cursor-pointer text-[#1A361A]">
                      {faq.question}
                      <span className="transition group-open:rotate-180 text-[#1EAD16]">▼</span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-600 border-t border-gray-50 pt-4"><PortableText value={faq.answer} components={ptComponents} /></div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {treatment.references && (
            <section id="references" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-[#1A361A] mb-6 flex items-center gap-2"><BookOpen className="text-gray-500" /> वैज्ञानिक संदर्भ</h2>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-sm text-gray-600"><PortableText value={treatment.references} components={ptComponents} /></div>
            </section>
          )}

          {/* 🔥 ADDED BIG BOTTOM AUTHOR SECTION FOR HINDI */}
          {treatment.author && (
            <section className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-green-100 mt-16 hover:-translate-y-1 transition duration-300">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">चिकित्सा समीक्षक (Medical Reviewer)</h3>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                
                <div className="shrink-0 group">
                  {treatment.author.image ? (
                    <img src={urlFor(treatment.author.image).width(120).height(120).url()} alt={treatment.author.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-green-50 shadow-sm group-hover:scale-105 transition" />
                  ) : (
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-green-100 text-[#1EAD16] flex items-center justify-center font-bold text-4xl shadow-sm group-hover:scale-105 transition">
                      {getInitials(treatment.author.name)}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-[#1A361A] mb-1">{treatment.author.name}</h4>
                  <p className="text-[#1EAD16] font-medium mb-4">{treatment.author.specialty}</p>
                  
                  {treatment.author.bio && <p className="text-gray-600 mb-6 leading-relaxed">{treatment.author.bio}</p>}

                  <div className="flex flex-wrap gap-3">
                    {treatment.author.consultationLink && (
                      <a href={treatment.author.consultationLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#1A361A] hover:bg-[#1EAD16] border border-transparent px-5 py-2.5 rounded-full text-sm font-bold text-white transition hover:-translate-y-0.5 shadow-md">
                        <Calendar size={16} /> परामर्श (Consult)
                      </a>
                    )}
                    {treatment.author.call && (
                      <a href={`tel:${treatment.author.call}`} className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2.5 rounded-full text-sm font-medium text-gray-700 transition hover:-translate-y-0.5">
                        <Phone size={16} className="text-blue-600" /> कॉल करें
                      </a>
                    )}
                    {treatment.author.whatsapp && (
                      <a href={`https://wa.me/${treatment.author.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-green-50 hover:bg-green-100 border border-green-200 px-4 py-2.5 rounded-full text-sm font-medium text-gray-700 transition hover:-translate-y-0.5">
                        <MessageCircle size={16} className="text-green-600" /> व्हाट्सएप
                      </a>
                    )}
                    {treatment.author.instagram && <a href={treatment.author.instagram} target="_blank" rel="noreferrer" className="p-2.5 bg-pink-50 hover:bg-pink-100 rounded-full text-pink-600 transition hover:scale-110"><Camera size={20}/></a>}
                    {treatment.author.facebook && <a href={treatment.author.facebook} target="_blank" rel="noreferrer" className="p-2.5 bg-blue-50 hover:bg-blue-100 rounded-full text-blue-600 transition hover:scale-110"><Globe size={20}/></a>}
                    {treatment.author.youtube && <a href={treatment.author.youtube} target="_blank" rel="noreferrer" className="p-2.5 bg-red-50 hover:bg-red-100 rounded-full text-red-600 transition hover:scale-110"><PlayCircle size={20}/></a>}
                  </div>
                </div>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}