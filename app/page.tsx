import Link from "next/link";
import { Leaf, Stethoscope, ArrowRight, ShieldCheck, Activity, MessageCircle, CheckCircle2, Calendar, Briefcase, HeartPulse, Utensils, BookOpen, Sun, Wind, Droplets } from "lucide-react";
import Image from "next/image";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import FadeIn from "./components/FadeIn";
import GlobalSearch from "./components/GlobalSearch";
import BmrCalculator from "./components/BmrCalculator";
import ContactForm from "./components/ContactForm"; // 🔥 IMPORTED THE WORKING FORM

export const revalidate = 60;

async function getHomepageData() {
  const query = `{
    "blogs": *[_type == "blog" && category == "tip"] | order(publishedAt desc)[0...4] { title, slug, image, publishedAt },
    "news": *[_type == "news"] | order(lastDate desc)[0...3] { title, slug, lastDate },
    "searchHerbs": *[_type == "herb"] { title, slug },
    "searchTreatments": *[_type == "treatment"] { title, slug },
    "searchMedicines": *[_type == "medicine"] { title, slug },
    "searchDiseases": *[_type == "disease"] { title, slug },
    "searchDiets": *[_type == "diet"] { title, slug },
    "latestHerbs": *[_type == "herb" && (!defined(language) || language == 'en')] | order(_createdAt desc)[0...4] { title, slug, images, seoDescription, botanicalName },
    "latestTreatments": *[_type == "treatment" && (!defined(language) || language == 'en')] | order(_createdAt desc)[0...3] { title, slug, images, seoDescription, shortDescription },
    "latestDiseases": *[_type == "disease" && (!defined(language) || language == 'en')] | order(_createdAt desc)[0...4] { title, slug, image, seoDescription, shortDescription },
    "latestDiets": *[_type == "diet" && (!defined(language) || language == 'en')] | order(_createdAt desc)[0...3] { title, slug, image, seoDescription, shortDescription }
  }`;
  return await client.fetch(query);
}

export default async function HomePage() {
  const data = await getHomepageData();

  const searchCatalog = [
    ...(data.searchDiseases ||[]).map((d: any) => ({ title: d.title, link: `/diseases/${d.slug.current}`, type: 'Disease' })),
    ...(data.searchHerbs ||[]).map((h: any) => ({ title: h.title, link: `/herbs/${h.slug.current}`, type: 'Herb' })),
    ...(data.searchTreatments ||[]).map((t: any) => ({ title: t.title, link: `/treatments/${t.slug.current}`, type: 'Treatment' })),
    ...(data.searchMedicines ||[]).map((m: any) => ({ title: m.title, link: `/medicines/${m.slug.current}`, type: 'Medicine' })),
    ...(data.searchDiets ||[]).map((d: any) => ({ title: d.title, link: `/diets/${d.slug.current}`, type: 'Diet Plan' }))
  ];

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      
      {/* 1. HERO SECTION (FIXED OVERFLOW BUG) */}
      <div className="relative pt-24 pb-40">
        {/* Background is isolated here with overflow-hidden */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A361A] via-[#1A361A] to-[#1EAD16]"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-400/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
        </div>
        
        {/* Content sits safely on top without being cut off */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50 flex flex-col items-center text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-green-100 border border-white/20 mb-8 shadow-2xl">
              <ShieldCheck size={16} className="text-[#1EAD16]" /> 100% Authentic Ayurvedic Wisdom
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 tracking-tight leading-tight">
              Rooted in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1EAD16] to-green-300">Nature.</span><br />
              Backed by <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">Science.</span>
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed mb-12">
              Ved Club is your digital portal for disease management, classical treatments, herbal databases, and verified health wisdom.
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="w-full">
            <GlobalSearch searchData={searchCatalog} />
          </FadeIn>
        </div>
      </div>
      {/* 2. MAIN CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-40 mb-32">
        <div className="grid md:grid-cols-4 gap-6">
          <FadeIn delay={0.1}>
            <Link href="/diseases" className="block group bg-white rounded-[2rem] p-6 shadow-xl hover:shadow-2xl border border-gray-100 transition-all hover:-translate-y-2 hover:border-red-200">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-red-500 transition-all"><HeartPulse size={28} className="text-red-500 group-hover:text-white" /></div>
              <h3 className="text-xl font-bold text-[#1A361A] mb-2">Diseases</h3>
              <p className="text-gray-500 text-sm">Ayurvedic management.</p>
            </Link>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link href="/treatments" className="block group bg-white rounded-[2rem] p-6 shadow-xl hover:shadow-2xl border border-gray-100 transition-all hover:-translate-y-2 hover:border-blue-200">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-all"><Activity size={28} className="text-blue-600 group-hover:text-white" /></div>
              <h3 className="text-xl font-bold text-[#1A361A] mb-2">Treatments</h3>
              <p className="text-gray-500 text-sm">Panchakarma & therapies.</p>
            </Link>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link href="/herbs" className="block group bg-white rounded-[2rem] p-6 shadow-xl hover:shadow-2xl border border-gray-100 transition-all hover:-translate-y-2 hover:border-green-200">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1EAD16] transition-all"><Leaf size={28} className="text-[#1EAD16] group-hover:text-white" /></div>
              <h3 className="text-xl font-bold text-[#1A361A] mb-2">Herbs</h3>
              <p className="text-gray-500 text-sm">Classical Materia Medica.</p>
            </Link>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Link href="/diets" className="block group bg-white rounded-[2rem] p-6 shadow-xl hover:shadow-2xl border border-gray-100 transition-all hover:-translate-y-2 hover:border-orange-200">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-all"><Utensils size={28} className="text-orange-500 group-hover:text-white" /></div>
              <h3 className="text-xl font-bold text-[#1A361A] mb-2">Diets</h3>
              <p className="text-gray-500 text-sm">Custom 7-day meal plans.</p>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* 3. DEDICATED DISEASE MANAGEMENT */}
      {data.latestDiseases && data.latestDiseases.length > 0 && (
        <section className="py-24 bg-red-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 text-red-500 font-bold mb-4 uppercase tracking-wider text-sm bg-red-100 px-4 py-1.5 rounded-full"><HeartPulse size={16}/> Clinical Care</div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A361A] mb-6">Ayurvedic Disease Management</h2>
                <p className="text-lg text-gray-600">Discover the root causes (Nidana), symptoms (Lakshana), and holistic Ayurvedic treatments for common conditions.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.latestDiseases.map((item: any, i: number) => (
                  <Link href={`/diseases/${item.slug.current}`} key={i} className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                    <div className="w-full aspect-square relative bg-red-50 overflow-hidden">
                      {item.image ? <Image src={urlFor(item.image).url()} alt={item.title} fill className="object-cover group-hover:scale-110 transition duration-700" /> : <HeartPulse className="text-red-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={48} />}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-[#1A361A] mb-2 group-hover:text-red-500 transition">{item.title}</h3>
                      <p className="text-gray-500 line-clamp-2 text-sm flex-1">{item.seoDescription || item.shortDescription}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-12 text-center">
                <Link href="/diseases" className="inline-flex items-center justify-center gap-2 bg-red-50 text-red-600 font-bold px-8 py-4 rounded-full hover:bg-red-500 hover:text-white transition-all">View All Diseases <ArrowRight size={20}/></Link>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* 4. DEDICATED HERBS SECTION */}
      {data.latestHerbs && data.latestHerbs.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-white to-[#F9FAF8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-6">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 text-[#1EAD16] font-bold mb-3 uppercase tracking-wider text-sm"><Leaf size={16}/> Materia Medica</div>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A361A]">The Herbs Library</h2>
                  <p className="text-lg text-gray-600 mt-4">Deep dive into the Rasa, Guna, Virya, and Vipaka of powerful healing botanicals.</p>
                </div>
                <Link href="/herbs" className="hidden md:flex items-center gap-2 text-[#1EAD16] font-bold hover:underline transition mt-4 md:mt-0">Explore Library <ArrowRight size={20}/></Link>
              </div>
              
              <div className="grid md:grid-cols-4 gap-6">
                {data.latestHerbs.map((item: any, i: number) => (
                  <Link href={`/herbs/${item.slug.current}`} key={i} className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6 group-hover:bg-[#1EAD16] transition-colors duration-300">
                      <Leaf size={28} className="text-[#1EAD16] group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A361A] mb-1 group-hover:text-[#1EAD16] transition">{item.title}</h3>
                    {item.botanicalName && <p className="text-xs text-gray-400 italic mb-4">{item.botanicalName}</p>}
                    <p className="text-gray-500 line-clamp-3 text-sm">{item.seoDescription || "Discover the complete Ayurvedic properties and benefits."}</p>
                  </Link>
                ))}
              </div>
              <Link href="/herbs" className="md:hidden mt-8 flex justify-center items-center gap-2 text-[#1EAD16] font-bold">Explore Library <ArrowRight size={20}/></Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* 5. WHY CHOOSE AYURVEDA? */}
      <section className="py-24 bg-[#1A361A] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Healing the Root Cause, Not Just the Symptoms.</h2>
                <p className="text-green-100 text-lg leading-relaxed mb-8">Ayurveda is a 5,000-year-old science of life that focuses on balancing the mind, body, and spirit. We provide the tools to understand your unique body type (Prakriti) and heal naturally.</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Sun className="text-yellow-400" /></div><div><h4 className="text-xl font-bold mb-1">Holistic Wellness</h4><p className="text-green-200 text-sm leading-relaxed">Treatments encompass diet, lifestyle, herbs, and therapies tailored to you.</p></div></div>
                  <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Wind className="text-blue-300" /></div><div><h4 className="text-xl font-bold mb-1">Dosha Balancing</h4><p className="text-green-200 text-sm leading-relaxed">Identify and correct imbalances in your Vata, Pitta, and Kapha doshas.</p></div></div>
                  <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Droplets className="text-green-400" /></div><div><h4 className="text-xl font-bold mb-1">Detoxification</h4><p className="text-green-200 text-sm leading-relaxed">Deep cellular cleansing through authentic Panchakarma therapies.</p></div></div>
                </div>
              </div>
              <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 hidden lg:block">
                 <div className="absolute inset-0 bg-gradient-to-br from-green-800 to-[#1A361A] flex items-center justify-center"><Leaf size={200} className="text-green-500/20" /></div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 6. TREATMENTS & DIETS COMBO */}
      <section className="py-24 bg-[#F9FAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <FadeIn>
              <div className="flex items-center gap-3 mb-8"><div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center"><Activity className="text-blue-600" /></div><h2 className="text-3xl font-extrabold text-[#1A361A]">Panchakarma</h2></div>
              <div className="space-y-6">
                {data.latestTreatments?.map((item: any, i: number) => (
                  <Link href={`/treatments/${item.slug.current}`} key={i} className="group flex gap-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="w-24 h-24 rounded-xl bg-blue-50 shrink-0 relative overflow-hidden">{item.images && item.images[0] ? <Image src={urlFor(item.images[0]).url()} alt={item.title} fill className="object-cover group-hover:scale-110 transition" /> : <Activity className="text-blue-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}</div>
                    <div className="flex flex-col justify-center"><h3 className="font-bold text-[#1A361A] text-lg group-hover:text-blue-600 transition">{item.title}</h3><p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.seoDescription || item.shortDescription}</p></div>
                  </Link>
                ))}
              </div>
              <Link href="/treatments" className="inline-block mt-6 font-bold text-blue-600 hover:underline">View All Therapies &rarr;</Link>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex items-center gap-3 mb-8"><div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center"><Utensils className="text-orange-600" /></div><h2 className="text-3xl font-extrabold text-[#1A361A]">Diet Plans</h2></div>
              <div className="space-y-6">
                {data.latestDiets?.map((item: any, i: number) => (
                  <Link href={`/diets/${item.slug.current}`} key={i} className="group flex gap-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="w-24 h-24 rounded-xl bg-orange-50 shrink-0 relative overflow-hidden">{item.image ? <Image src={urlFor(item.image).url()} alt={item.title} fill className="object-cover group-hover:scale-110 transition" /> : <Utensils className="text-orange-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}</div>
                    <div className="flex flex-col justify-center"><h3 className="font-bold text-[#1A361A] text-lg group-hover:text-orange-500 transition">{item.title}</h3><p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.seoDescription || item.shortDescription}</p></div>
                  </Link>
                ))}
              </div>
              <Link href="/diets" className="inline-block mt-6 font-bold text-orange-500 hover:underline">View 7-Day Plans &rarr;</Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 7. BMR CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-gray-100">
        <FadeIn><BmrCalculator /></FadeIn>
      </section>

      {/* 8. EXPERT QUERY FORM WITH WORKING SERVER ACTION */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-[#1A361A] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row relative">
              <div className="lg:w-5/12 p-12 md:p-16 text-white relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-800 text-green-200 text-sm font-bold mb-6"><MessageCircle size={14} /> Free Expert Consultation</div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Have a Health Query?</h2>
                <p className="text-green-100 text-lg leading-relaxed mb-8">Submit your health issues or ask about specific Ayurvedic treatments. Our certified medical experts (BAMS, MD) will get back to you with guidance.</p>
                <div className="space-y-4 text-green-200">
                  <div className="flex items-center gap-3"><CheckCircle2 className="text-[#1EAD16]" /> Free Initial Assessment</div>
                  <div className="flex items-center gap-3"><CheckCircle2 className="text-[#1EAD16]" /> 100% Confidential</div>
                </div>
              </div>
              <div className="lg:w-7/12 bg-gray-50 p-12 md:p-16 lg:rounded-l-[3rem] relative z-20">
                {/* 🔥 THIS REPLACES THE OLD FORM WITH OUR NEW FUNCTIONAL FORM */}
                <ContactForm />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 9. LATEST HEALTH TIPS & NEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-3 gap-12 border-t border-gray-100">
        <div className="lg:col-span-2">
          <FadeIn>
            <div className="flex justify-between items-end mb-8"><h2 className="text-3xl font-extrabold text-[#1A361A]">Latest Health Tips</h2><Link href="/health-tips" className="text-[#1EAD16] font-bold hover:underline">View All &rarr;</Link></div>
            <div className="grid sm:grid-cols-2 gap-6">
              {data.blogs?.map((blog: any, i: number) => (
                <Link href={`/health-tips/${blog.slug.current}`} key={i} className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition duration-300">
                  <div className="w-full aspect-video relative bg-green-50 overflow-hidden">{blog.image && <Image src={urlFor(blog.image).url()} alt={blog.title} fill className="object-cover group-hover:scale-105 transition duration-500" />}</div>
                  <div className="p-6">{blog.publishedAt && <span className="flex items-center gap-1 text-xs font-bold text-[#1EAD16] mb-3 uppercase tracking-wider"><Calendar size={14}/> {new Date(blog.publishedAt).toLocaleDateString()}</span>}<h3 className="text-xl font-bold text-[#1A361A] group-hover:text-[#1EAD16] transition line-clamp-2">{blog.title}</h3></div>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
        <div className="bg-blue-50/50 p-8 rounded-[3rem] border border-blue-100">
          <FadeIn delay={0.2}>
            <div className="flex justify-between items-end mb-8"><h2 className="text-2xl font-extrabold text-[#1A361A]">AYUSH News</h2></div>
            <div className="space-y-6">
              {data.news?.map((item: any, i: number) => (
                <Link href={`/news/${item.slug.current}`} key={i} className="block group bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100"><span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-2"><Briefcase size={12}/> Update</span><h3 className="font-bold text-[#1A361A] group-hover:text-blue-600 transition line-clamp-2 mb-2">{item.title}</h3></Link>
              ))}
            </div>
            <Link href="/news" className="block text-center mt-6 text-[#1A361A] font-bold hover:text-blue-600 transition">View All News &rarr;</Link>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}