import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, HeartPulse, ShieldAlert, Activity, BookOpen, Search, Pill, Droplets, Leaf, HelpCircle, Utensils, Star, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import DoctorSidebar from "@/app/components/DoctorSidebar";

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

async function getDisease(baseSlug: string) {
  const hiSlug = `${baseSlug}-hi`;
  const query = `*[_type == "disease" && (slug.current == $hiSlug || slug.current == $baseSlug) && language == 'hi'][0]{ ..., author-> }`;
  return await client.fetch(query, { hiSlug, baseSlug });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getDisease(slug);
  if (!data) return {};
  return { title: data.seoTitle || `${data.title} | वेद क्लब`, description: data.seoDescription };
}

const ptComponents = { 
  block: { 
    h2: ({children, value}: any) => <h2 id={slugify(value.children[0].text)} className="text-3xl font-bold mt-10 mb-4 text-[#1A361A] scroll-mt-28">{children}</h2>, 
    h3: ({children, value}: any) => <h3 id={slugify(value.children[0].text)} className="text-2xl font-bold mt-8 mb-4 text-[#1A361A] scroll-mt-28">{children}</h3>,
    normal: ({children}: any) => <p className="mb-6 leading-relaxed text-gray-700 text-lg">{children}</p> 
  },
  list: { bullet: ({children}: any) => <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">{children}</ul> },
  marks: { strong: ({children}: any) => <strong className="font-bold text-[#1A361A]">{children}</strong> }
};

export default async function HindiDiseaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const disease = await getDisease(slug);
  if (!disease) return notFound();

  return (
    <div className="bg-[#F9FAF8] min-h-screen pb-20 scroll-smooth">
      {disease.customSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: disease.customSchema }} />}

      {/* HERO SECTION */}
      <section className="bg-red-50 pt-12 pb-24 px-4 sm:px-6 lg:px-8 border-b border-red-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 animate-fade-in">
            <Link href="/hi/diseases" className="inline-flex items-center text-gray-500 hover:text-red-600 mb-8 transition-colors text-sm font-medium">
              <ArrowLeft size={16} className="mr-2" /> रोगों की सूची पर वापस जाएं
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm"><HeartPulse size={14}/> रोग प्रबंधन</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#1A361A] mb-6 leading-tight drop-shadow-sm">{disease.title}</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">{disease.shortDescription}</p>
          </div>
          <div className="w-full max-w-md aspect-square p-2 bg-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
             {disease.image ? <Image src={urlFor(disease.image).url()} alt={disease.title} fill className="object-cover rounded-[2rem] group-hover:scale-105 transition-transform duration-700" /> : <div className="w-full h-full bg-red-100 rounded-[2rem] flex items-center justify-center"><HeartPulse size={64} className="text-red-300" /></div>}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col md:flex-row gap-12 relative z-10">
        
        {/* STICKY SIDEBAR */}
        <div className="md:w-1/4 hidden md:block">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 transition-all hover:shadow-2xl">
              <h3 className="font-bold text-[#1A361A] mb-4 uppercase tracking-wider text-sm flex items-center gap-2"><BookOpen size={16} className="text-red-500"/> विषय सूची</h3>
              <ul className="space-y-3 text-gray-600 font-medium text-sm">
                {disease.overview && <li><a href="#overview" className="hover:text-red-500 transition-colors">आधुनिक विज्ञान</a></li>}
                {disease.ayurvedicPerspective && <li><a href="#ayurveda" className="hover:text-red-500 transition-colors font-bold text-[#1A361A]">आयुर्वेदिक दृष्टिकोण</a></li>}
                {disease.treatments && <li><a href="#treatment" className="hover:text-red-500 transition-colors">जड़ी-बूटियां और उपचार</a></li>}
                {disease.homeRemedies && <li><a href="#remedies" className="hover:text-red-500 transition-colors">घरेलू उपचार</a></li>}
                {disease.dietLifestyle && <li><a href="#lifestyle" className="hover:text-red-500 transition-colors">आहार और जीवन शैली</a></li>}
                
                {/* DYNAMIC ADDITIONAL SECTION LINK */}
                {disease.additionalSectionContent && <li><a href="#additional" className="hover:text-red-500 transition-colors">{disease.additionalSectionHeading || "अतिरिक्त जानकारी"}</a></li>}
                
                {disease.faqs && disease.faqs.length > 0 && <li><a href="#faqs" className="hover:text-red-500 transition-colors">अक्सर पूछे जाने वाले प्रश्न</a></li>}
                {disease.conclusion && <li><a href="#conclusion" className="hover:text-red-500 transition-colors">निष्कर्ष</a></li>}
              </ul>
            </div>
            <DoctorSidebar author={disease.author} layout="vertical" />
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="md:w-3/4 space-y-12">
          
          {disease.overview && (
            <article id="overview" className="scroll-mt-28 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-[#1A361A] mb-6 flex items-center gap-2"><Search className="text-gray-400"/> अवलोकन और आधुनिक विज्ञान</h2>
              <PortableText value={disease.overview} components={ptComponents} />
            </article>
          )}

          <div className="grid md:grid-cols-2 gap-8">
            {disease.symptoms && (
              <div className="bg-yellow-50 p-8 rounded-3xl border border-yellow-100 hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg">
                <h3 className="text-xl font-bold text-yellow-900 mb-4 flex items-center gap-2"><ShieldAlert className="text-yellow-600" /> सामान्य लक्षण</h3>
                <PortableText value={disease.symptoms} components={ptComponents} />
              </div>
            )}
            {disease.causes && (
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"><Activity className="text-gray-500" /> कारण और ट्रिगर्स</h3>
                <PortableText value={disease.causes} components={ptComponents} />
              </div>
            )}
          </div>

          {disease.ayurvedicPerspective && (
            <section id="ayurveda" className="bg-[#1A361A] text-white p-8 md:p-12 rounded-[3rem] shadow-2xl scroll-mt-28 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
              <h2 className="text-3xl font-extrabold mb-6 text-green-100 flex items-center gap-3 relative z-10"><Leaf className="text-[#1EAD16]"/> आयुर्वेदिक दृष्टिकोण</h2>
              <div className="text-green-50/90 text-lg leading-relaxed relative z-10"><PortableText value={disease.ayurvedicPerspective} /></div>
            </section>
          )}

          {disease.treatments && (
            <section id="treatment" className="scroll-mt-28 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h2 className="text-3xl font-bold text-[#1A361A] mb-6 flex items-center gap-2"><Pill className="text-blue-500"/> अनुशंसित जड़ी-बूटियां और उपचार</h2>
              <PortableText value={disease.treatments} components={ptComponents} />
            </section>
          )}

        
        {disease.homeRemedies && (
              <section id="remedies" className="scroll-mt-28 bg-green-50 p-8 rounded-3xl border border-green-100 hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg">
                <h2 className="text-2xl font-bold text-green-900 mb-6 flex items-center gap-2"><Droplets className="text-[#1EAD16]"/> घरेलू उपचार</h2>
                <PortableText value={disease.homeRemedies} components={ptComponents} />
              </section>
            )}
            
            {disease.dietLifestyle && (
              <section id="lifestyle" className="scroll-mt-28 bg-orange-50 p-8 rounded-3xl border border-orange-100 hover:-translate-y-1 transition-transform duration-300 hover:shadow-lg">
                <h2 className="text-2xl font-bold text-orange-900 mb-6 flex items-center gap-2"><Utensils className="text-orange-500"/> आहार और जीवन शैली (आहार-विहार)</h2>
                <PortableText value={disease.dietLifestyle} components={ptComponents} />
              </section>
            )}

          {/* 🔥 DYNAMIC CUSTOM ADDITIONAL SECTION */}
          {disease.additionalSectionContent && (
            <section id="additional" className="scroll-mt-28 bg-blue-50 p-8 md:p-10 rounded-[2.5rem] border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-3xl font-bold text-[#1A361A] mb-6 flex items-center gap-2">
                <Star className="text-blue-500"/> {disease.additionalSectionHeading || "अतिरिक्त जानकारी"}
              </h2>
              <div className="text-gray-700 text-lg leading-relaxed"><PortableText value={disease.additionalSectionContent} components={ptComponents} /></div>
            </section>
          )}

          {/* 🔥 DYNAMIC FAQS WITH SMOOTH ACCORDION UI */}
          {disease.faqs && disease.faqs.length > 0 && (
            <section id="faqs" className="scroll-mt-28 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold text-[#1A361A] mb-8 flex items-center gap-2"><HelpCircle className="text-red-500"/> अक्सर पूछे जाने वाले प्रश्न</h2>
              <div className="space-y-4">
                {disease.faqs.map((faq: any, i: number) => (
                  <details key={i} className="group bg-gray-50 rounded-2xl border border-gray-200[&_summary::-webkit-details-marker]:hidden hover:shadow-md transition-all duration-300">
                    <summary className="flex items-center justify-between p-6 font-bold cursor-pointer text-[#1A361A] text-lg">
                      {faq.question}
                      <span className="transition-transform duration-300 group-open:rotate-180 text-red-500 bg-red-100 p-1 rounded-full">▼</span>
                    </summary>
                    <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4 animate-fade-in"><PortableText value={faq.answer} components={ptComponents} /></div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* 🔥 CONCLUSION SECTION */}
          {disease.conclusion && (
            <section id="conclusion" className="scroll-mt-28 bg-gradient-to-br from-green-50 to-white p-8 md:p-10 rounded-[2.5rem] border border-green-200 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#1EAD16]"></div>
              <h2 className="text-2xl font-bold text-[#1A361A] mb-4 flex items-center gap-2"><CheckCircle className="text-[#1EAD16]"/> निष्कर्ष</h2>
              <div className="text-gray-700 text-lg leading-relaxed"><PortableText value={disease.conclusion} components={ptComponents} /></div>
            </section>
          )}
{/* 🔥 MOBILE DOCTOR INFO */}
          <div className="block md:hidden mt-12 pt-8 border-t border-green-100">
            <h3 className="font-bold text-[#1A361A] mb-4 uppercase tracking-wider text-sm">चिकित्सा समीक्षक</h3>
            <DoctorSidebar author={disease.author} layout="vertical" />
          </div>
        </div>
      </div>
    </div>
  );
}