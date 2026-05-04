import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Info, ShieldAlert, Leaf, ShoppingBag, CheckCircle2, Phone, MessageCircle, Globe, Camera, PlayCircle, BookOpen, ShoppingCart, Zap, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import DoctorSidebar from "@/app/components/DoctorSidebar";

// FETCH DATA
async function getHerb(slug: string) {
  const query = `*[_type == "herb" && slug.current == $slug][0]{
    ...,
    author-> 
  }`;
  return await client.fetch(query, { slug });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const herb = await getHerb(slug);
  if (!herb) return {};
  return {
    title: herb.seoTitle || `${herb.title} | Ved Club`,
    description: herb.seoDescription || "Discover the ancient Ayurvedic properties, benefits, and uses of this powerful herb.",
  };
}

const ptComponents = {
  block: {
    h2: ({children}: any) => <h2 className="text-2xl font-bold mt-6 mb-4 text-[#1A361A]">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-xl font-bold mt-4 mb-2 text-[#1A361A]">{children}</h3>,
    normal: ({children}: any) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
  },
  list: {
    bullet: ({children}: any) => <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2">{children}</ul>,
    number: ({children}: any) => <ol className="list-decimal pl-5 mb-4 text-gray-700 space-y-2">{children}</ol>,
  },
  marks: {
    strong: ({children}: any) => <strong className="font-bold text-[#1A361A]">{children}</strong>,
  }
};

export default async function HerbDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const herb = await getHerb(slug);

  if (!herb) return notFound();

  const getInitials = (name: string) => name.split(' ').map((n: string) => n[0]).join('').substring(0, 2);

  return (
    <div className="bg-[#F9FAF8] min-h-screen pb-20 scroll-smooth">
      
      {herb.customSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: herb.customSchema }} />}

      {/* === HERO SECTION === */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link href="/herbs" className="inline-flex items-center text-gray-500 hover:text-[#1EAD16] mb-6 transition-colors font-medium">
          <ArrowLeft size={16} className="mr-2" /> Back to Library
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-[#1EAD16] text-sm font-bold mb-4 shadow-sm">
              <Leaf size={14} /> Ayurveda Library
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#1A361A] mb-2">{herb.title}</h1>
            <p className="text-lg text-gray-500 italic mb-6">
              <span className="font-medium text-gray-700">Botanical:</span> {herb.botanicalName} 
              {herb.englishName && <span className="ml-2">| <span className="font-medium text-gray-700">English:</span> {herb.englishName}</span>}
            </p>

            <div className="mb-8">
              {herb.shortDescription && <PortableText value={herb.shortDescription} components={ptComponents} />}
            </div>

            {/* 🔥 DYNAMIC E-COMMERCE BUTTONS 🔥 */}
            <div className="mt-8">
              {(herb.storeLink || herb.amazonLink || herb.blinkitLink) ? (
                <div className="flex flex-wrap gap-4">
                  {herb.storeLink && (
                    <a href={herb.storeLink} target="_blank" rel="noreferrer" className="bg-[#1EAD16] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-green-700 transition-all hover:-translate-y-1 hover:shadow-xl shadow-md">
                      <ShoppingBag size={18} /> Buy Pure {herb.title}
                    </a>
                  )}
                  {herb.amazonLink && (
                    <a href={herb.amazonLink} target="_blank" rel="noreferrer" className="bg-gray-900 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-black transition-all hover:-translate-y-1 hover:shadow-xl shadow-md">
                      <ShoppingCart size={18} /> Amazon
                    </a>
                  )}
                  {herb.blinkitLink && (
                    <a href={herb.blinkitLink} target="_blank" rel="noreferrer" className="bg-[#F8CB46] text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-yellow-400 transition-all hover:-translate-y-1 hover:shadow-xl shadow-md">
                      <Zap size={18} /> Blinkit 
                    </a>
                  )}
                </div>
              ) : (
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between max-w-md hover:shadow-md transition">
                  <div>
                    <p className="text-sm text-gray-500">Pure {herb.title} Root Extract</p>
                    <p className="text-[#1A361A] font-bold text-lg">Coming Soon</p>
                  </div>
                  <button className="bg-gray-100 text-gray-400 px-6 py-2 rounded-full font-medium flex items-center gap-2 cursor-not-allowed">
                    <ShoppingBag size={18} /> Notify Me
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Image / Slider Section with Fixed Shadow & Text */}
          <div className="relative w-full aspect-square max-w-md mx-auto lg:ml-auto group p-4">
             {herb.images && herb.images.length > 0 ? (
                <div className="relative w-full h-full rounded-[2rem] shadow-2xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="flex overflow-x-auto snap-x snap-mandatory w-full h-full hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
                    {herb.images.map((img: any, i: number) => (
                      <div key={i} className="snap-center shrink-0 w-full h-full relative bg-white border border-gray-100">
                        <Image src={urlFor(img).url()} alt={`${herb.title} image ${i+1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  {/* FIXED SWIPE TEXT */}
                  {herb.images.length > 1 && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-lg text-xs font-bold text-gray-700 flex gap-2 z-10 items-center">
                      <span className="animate-pulse">←</span> Swipe <span className="animate-pulse">→</span>
                    </div>
                  )}
                </div>
             ) : (
                <div className="w-full h-full bg-green-900 rounded-[2rem] shadow-2xl relative flex items-center justify-center transition-all duration-700 group-hover:rotate-y-6 group-hover:rotate-x-6 group-hover:scale-105">
                   <div className="text-green-100/20 text-9xl">🌿</div>
                </div>
             )}
          </div>

        </div>
      </section>

      {/* === LAYOUT: STICKY SIDEBAR (LEFT) & MAIN CONTENT (RIGHT) === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:flex-row gap-12">
        
        {/* LEFT: STICKY SIDEBAR */}
        <div className="md:w-1/4 hidden md:block">
          <div className="sticky top-28 space-y-6">
            
            {/* Table of Contents */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <h3 className="font-bold text-[#1A361A] mb-4 uppercase tracking-wider text-sm">Table of Contents</h3>
              <ul className="space-y-3 text-gray-600 font-medium">
                {herb.benefits && <li><a href="#benefits" className="hover:text-[#1EAD16] transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Health Benefits</a></li>}
                {herb.properties && <li><a href="#properties" className="hover:text-[#1EAD16] transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Ayurvedic Properties</a></li>}
                {herb.howToConsume && <li><a href="#consume" className="hover:text-[#1EAD16] transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> How to Consume</a></li>}
                {herb.additionalContent && <li><a href="#additional" className="hover:text-[#1EAD16] transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Additional Info</a></li>}
                {herb.sideEffects && <li><a href="#side-effects" className="hover:text-[#1EAD16] transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Side Effects</a></li>}
                {herb.faqs && <li><a href="#faqs" className="hover:text-[#1EAD16] transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> FAQs</a></li>}
                {herb.references && <li><a href="#references" className="hover:text-[#1EAD16] transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> References</a></li>}
              </ul>
            </div>

            {/* 🔥 NEW INTERACTIVE POPUP SIDEBAR (Cleaned up!) */}
            <DoctorSidebar author={herb.author} layout="horizontal" />

          </div>
        </div>

        {/* RIGHT: MAIN CONTENT */}
        <div className="md:w-3/4 space-y-16">

          {/* 1. BENEFITS LOOP (SWAPPED) */}
          {herb.benefits && (
            <section id="benefits" className="scroll-mt-28">
              <h2 className="text-3xl font-bold text-[#1A361A] mb-8">Top Health Benefits</h2>
              <div className="space-y-6">
                {herb.benefits.map((benefit: any, index: number) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300">
                    <h3 className="text-xl font-bold text-[#1A361A] mb-4 flex items-center gap-3">
                      <span className="bg-green-100 text-[#1EAD16] w-8 h-8 flex items-center justify-center rounded-full text-sm shrink-0">{index + 1}</span>
                      {benefit.heading}
                    </h3>
                    <div className="pl-11">
                      <PortableText value={benefit.description} components={ptComponents} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 2. PROPERTIES 3-COLUMN TABLE (SWAPPED) */}
          {herb.properties && (
            <section id="properties" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-[#1A361A] mb-6 flex items-center gap-2"><Info className="text-[#1EAD16]"/> Ayurvedic Properties</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300">
                <div className="grid grid-cols-3 bg-green-50 border-b border-green-100 p-4 font-bold text-[#1A361A] text-sm md:text-base">
                  <div>Property</div><div>Ayurvedic Term</div><div>Meaning</div>
                </div>
                {[
                  { name: 'Rasa (Taste)', term: herb.properties.rasa, meaning: herb.properties.rasaMeaning },
                  { name: 'Guna (Quality)', term: herb.properties.guna, meaning: herb.properties.gunaMeaning },
                  { name: 'Virya (Potency)', term: herb.properties.virya, meaning: herb.properties.viryaMeaning },
                  { name: 'Vipaka (Post-Digestive)', term: herb.properties.vipaka, meaning: herb.properties.vipakaMeaning },
                  { name: 'Dosha Effect', term: herb.properties.dosha, meaning: herb.properties.doshaMeaning, highlight: true }
                ].map((row, i) => row.term && (
                  <div key={i} className={`grid grid-cols-3 p-4 border-b border-gray-100 text-sm md:text-base transition ${row.highlight ? 'bg-green-50/50 font-medium' : 'hover:bg-gray-50'}`}>
                    <div className={row.highlight ? "font-bold text-[#1EAD16]" : "font-medium text-gray-700"}>{row.name}</div>
                    <div className="text-gray-800">{row.term}</div>
                    <div className="text-gray-600">{row.meaning}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 3. HOW TO CONSUME */}
          {herb.howToConsume && (
            <section id="consume" className="scroll-mt-28">
              <h2 className="text-3xl font-bold text-[#1A361A] mb-8 flex items-center gap-2"><CheckCircle2 className="text-[#1EAD16]" /> How to Consume?</h2>
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition duration-300">
                <PortableText value={herb.howToConsume} components={ptComponents} />
              </div>
            </section>
          )}

          {/* 4. FLEXIBLE ADDITIONAL CONTENT */}
          {herb.additionalContent && (
            <section id="additional" className="scroll-mt-28">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition duration-300">
                <PortableText value={herb.additionalContent} components={ptComponents} />
              </div>
            </section>
          )}

          {/* 5. SIDE EFFECTS */}
          {herb.sideEffects && (
            <section id="side-effects" className="scroll-mt-28">
              <div className="bg-red-50 p-8 rounded-3xl border border-red-100 hover:shadow-lg transition duration-300">
                <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center gap-2"><ShieldAlert /> Side Effects & Cautions</h2>
                <PortableText value={herb.sideEffects} components={ptComponents} />
              </div>
            </section>
          )}

          {/* 6. FAQs ACCORDION */}
          {herb.faqs && herb.faqs.length > 0 && (
            <section id="faqs" className="scroll-mt-28">
              <h2 className="text-3xl font-bold text-[#1A361A] mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {herb.faqs.map((faq: any, i: number) => (
                  <details key={i} className="group bg-white rounded-2xl shadow-sm border border-gray-100 [&_summary::-webkit-details-marker]:hidden hover:shadow-md transition">
                    <summary className="flex items-center justify-between p-6 font-bold cursor-pointer text-[#1A361A]">
                      {faq.question}
                      <span className="transition group-open:rotate-180 text-[#1EAD16]">▼</span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-600 border-t border-gray-50 pt-4">
                      <PortableText value={faq.answer} components={ptComponents} />
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* 7. REFERENCES & CITATIONS */}
          {herb.references && (
            <section id="references" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-[#1A361A] mb-6 flex items-center gap-2"><BookOpen className="text-gray-500" /> Scientific References</h2>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-sm text-gray-600">
                <PortableText value={herb.references} components={ptComponents} />
              </div>
            </section>
          )}

          {/* === 8. LARGE BOTTOM AUTHOR SECTION === */}
          {herb.author && (
            <section className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-green-100 mt-16 hover:-translate-y-1 transition duration-300">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Article Reviewed By</h3>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                
                <div className="shrink-0 group">
                  {herb.author.image ? (
                    <img src={urlFor(herb.author.image).width(120).height(120).url()} alt={herb.author.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-green-50 shadow-sm group-hover:scale-105 transition" />
                  ) : (
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-green-100 text-[#1EAD16] flex items-center justify-center font-bold text-4xl shadow-sm group-hover:scale-105 transition">
                      {getInitials(herb.author.name)}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-[#1A361A] mb-1">{herb.author.name}</h4>
                  <p className="text-[#1EAD16] font-medium mb-4">{herb.author.specialty}</p>
                  
                  {herb.author.bio && <p className="text-gray-600 mb-6 leading-relaxed">{herb.author.bio}</p>}

                  <div className="flex flex-wrap gap-3">
                    {/* NEW CONSULT BUTTON */}
                    {herb.author.consultationLink && (
                      <a href={herb.author.consultationLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#1A361A] hover:bg-[#1EAD16] border border-transparent px-5 py-2.5 rounded-full text-sm font-bold text-white transition hover:-translate-y-0.5 shadow-md">
                        <Calendar size={16} /> Book Consult
                      </a>
                    )}
                    {herb.author.call && (
                      <a href={`tel:${herb.author.call}`} className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-700 transition hover:-translate-y-0.5">
                        <Phone size={16} className="text-blue-600" /> Call Doctor
                      </a>
                    )}
                    {herb.author.whatsapp && (
                      <a href={`https://wa.me/${herb.author.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-green-50 hover:bg-green-100 border border-green-200 px-4 py-2 rounded-full text-sm font-medium text-gray-700 transition hover:-translate-y-0.5">
                        <MessageCircle size={16} className="text-green-600" /> WhatsApp
                      </a>
                    )}
                    {herb.author.instagram && (
                      <a href={herb.author.instagram} target="_blank" rel="noreferrer" className="p-2 bg-pink-50 hover:bg-pink-100 rounded-full text-pink-600 transition hover:scale-110"><Camera size={20}/></a>
                    )}
                    {herb.author.facebook && (
                      <a href={herb.author.facebook} target="_blank" rel="noreferrer" className="p-2 bg-blue-50 hover:bg-blue-100 rounded-full text-blue-600 transition hover:scale-110"><Globe size={20}/></a>
                    )}
                    {herb.author.youtube && (
                      <a href={herb.author.youtube} target="_blank" rel="noreferrer" className="p-2 bg-red-50 hover:bg-red-100 rounded-full text-red-600 transition hover:scale-110"><PlayCircle size={20}/></a>
                    )}
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