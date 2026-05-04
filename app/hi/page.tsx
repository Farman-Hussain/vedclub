import Link from "next/link";
import { Leaf, Stethoscope, ArrowRight, ShieldCheck, Activity, MessageCircle, CheckCircle2, Calendar, Briefcase, HeartPulse, Utensils, BookOpen, Sun, Wind, Droplets } from "lucide-react";
import Image from "next/image";
import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import FadeIn from "../components/FadeIn";
import GlobalSearch from "../components/GlobalSearch";
import BmrCalculator from "../components/BmrCalculator";
import ContactForm from "../components/ContactForm"; // 🔥 IMPORTED THE WORKING FORM

export const revalidate = 60;

const cleanSlug = (slug: string) => slug.replace(/-hi$/, '');

async function getHindiHomepageData() {
  const query = `{
    "blogs": *[_type == "blog" && category == "tip" && language == 'hi'] | order(publishedAt desc)[0...4] { title, slug, image, publishedAt },
    "news": *[_type == "news" && language == 'hi'] | order(lastDate desc)[0...3] { title, slug, lastDate },
    "searchHerbs": *[_type == "herb" && language == 'hi'] { title, slug },
    "searchTreatments": *[_type == "treatment" && language == 'hi'] { title, slug },
    "searchMedicines": *[_type == "medicine" && language == 'hi'] { title, slug },
    "searchDiseases": *[_type == "disease" && language == 'hi'] { title, slug },
    "searchDiets": *[_type == "diet" && language == 'hi'] { title, slug },
    "latestHerbs": *[_type == "herb" && language == 'hi'] | order(_createdAt desc)[0...4] { title, slug, images, seoDescription, botanicalName },
    "latestTreatments": *[_type == "treatment" && language == 'hi'] | order(_createdAt desc)[0...3] { title, slug, images, seoDescription, shortDescription },
    "latestDiseases": *[_type == "disease" && language == 'hi'] | order(_createdAt desc)[0...4] { title, slug, image, seoDescription, shortDescription },
    "latestDiets": *[_type == "diet" && language == 'hi'] | order(_createdAt desc)[0...3] { title, slug, image, seoDescription, shortDescription }
  }`;
  return await client.fetch(query);
}

export default async function HindiHomePage() {
  const data = await getHindiHomepageData();

  const searchCatalog =[
    ...(data.searchDiseases ||[]).map((d: any) => ({ title: d.title, link: `/hi/diseases/${cleanSlug(d.slug.current)}`, type: 'रोग' })),
    ...(data.searchHerbs ||[]).map((h: any) => ({ title: h.title, link: `/hi/herbs/${cleanSlug(h.slug.current)}`, type: 'जड़ी-बूटी' })),
    ...(data.searchTreatments ||[]).map((t: any) => ({ title: t.title, link: `/hi/treatments/${cleanSlug(t.slug.current)}`, type: 'चिकित्सा' })),
    ...(data.searchMedicines ||[]).map((m: any) => ({ title: m.title, link: `/hi/medicines/${cleanSlug(m.slug.current)}`, type: 'औषधि' })),
    ...(data.searchDiets ||[]).map((d: any) => ({ title: d.title, link: `/hi/diets/${cleanSlug(d.slug.current)}`, type: 'आहार' }))
  ];

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      
      <section className="relative pt-24 pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A361A] via-[#1A361A] to-[#1EAD16] z-0"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-400/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50 flex flex-col items-center text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-green-100 border border-white/20 mb-8 shadow-2xl">
              <ShieldCheck size={16} className="text-[#1EAD16]" /> 100% प्रामाणिक आयुर्वेदिक ज्ञान
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 tracking-tight leading-tight">
              प्रकृति से <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1EAD16] to-green-300">जुड़ा।</span><br />
              विज्ञान द्वारा <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">समर्थित।</span>
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed mb-12">
              वेद क्लब रोग प्रबंधन, शास्त्रीय चिकित्सा, जड़ी-बूटियों और प्रमाणित स्वास्थ्य ज्ञान के लिए आपका डिजिटल पोर्टल है।
            </p>
          </FadeIn>
          <FadeIn delay={0.2} className="w-full">
            <GlobalSearch searchData={searchCatalog} />
          </FadeIn>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-40 mb-32">
        <div className="grid md:grid-cols-4 gap-6">
          <FadeIn delay={0.1}>
            <Link href="/hi/diseases" className="block group bg-white rounded-[2rem] p-6 shadow-xl hover:shadow-2xl border border-gray-100 transition-all hover:-translate-y-2 hover:border-red-200">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-red-500 transition-all"><HeartPulse size={28} className="text-red-500 group-hover:text-white" /></div>
              <h3 className="text-xl font-bold text-[#1A361A] mb-2">रोग (Diseases)</h3><p className="text-gray-500 text-sm">आयुर्वेदिक प्रबंधन।</p>
            </Link>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link href="/hi/treatments" className="block group bg-white rounded-[2rem] p-6 shadow-xl hover:shadow-2xl border border-gray-100 transition-all hover:-translate-y-2 hover:border-blue-200">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-all"><Activity size={28} className="text-blue-600 group-hover:text-white" /></div>
              <h3 className="text-xl font-bold text-[#1A361A] mb-2">चिकित्सा</h3><p className="text-gray-500 text-sm">पंचकर्म और उपचार।</p>
            </Link>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link href="/hi/herbs" className="block group bg-white rounded-[2rem] p-6 shadow-xl hover:shadow-2xl border border-gray-100 transition-all hover:-translate-y-2 hover:border-green-200">
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#1EAD16] transition-all"><Leaf size={28} className="text-[#1EAD16] group-hover:text-white" /></div>
              <h3 className="text-xl font-bold text-[#1A361A] mb-2">जड़ी-बूटियां</h3><p className="text-gray-500 text-sm">शास्त्रीय द्रव्यगुण।</p>
            </Link>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Link href="/hi/diets" className="block group bg-white rounded-[2rem] p-6 shadow-xl hover:shadow-2xl border border-gray-100 transition-all hover:-translate-y-2 hover:border-orange-200">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-all"><Utensils size={28} className="text-orange-500 group-hover:text-white" /></div>
              <h3 className="text-xl font-bold text-[#1A361A] mb-2">आहार योजनाएं</h3><p className="text-gray-500 text-sm">7-दिवसीय डाइट प्लान।</p>
            </Link>
          </FadeIn>
        </div>
      </section>

      {data.latestDiseases && data.latestDiseases.length > 0 && (
        <section className="py-24 bg-red-50/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center gap-2 text-red-500 font-bold mb-4 uppercase tracking-wider text-sm bg-red-100 px-4 py-1.5 rounded-full"><HeartPulse size={16}/> Clinical Care</div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A361A] mb-6">आयुर्वेदिक रोग प्रबंधन</h2>
                <p className="text-lg text-gray-600">सामान्य और पुरानी बीमारियों के मूल कारणों (निदान), लक्षणों और समग्र आयुर्वेदिक उपचारों की खोज करें।</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.latestDiseases.map((item: any, i: number) => (
                  <Link href={`/hi/diseases/${cleanSlug(item.slug.current)}`} key={i} className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                    <div className="w-full aspect-square relative bg-red-50 overflow-hidden">{item.image ? <Image src={urlFor(item.image).url()} alt={item.title} fill className="object-cover group-hover:scale-110 transition duration-700" /> : <HeartPulse className="text-red-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={48} />}</div>
                    <div className="p-6 flex flex-col flex-1"><h3 className="text-xl font-bold text-[#1A361A] mb-2 group-hover:text-red-500 transition">{item.title}</h3><p className="text-gray-500 line-clamp-2 text-sm flex-1">{item.seoDescription || item.shortDescription}</p></div>
                  </Link>
                ))}
              </div>
              <div className="mt-12 text-center"><Link href="/hi/diseases" className="inline-flex items-center justify-center gap-2 bg-red-50 text-red-600 font-bold px-8 py-4 rounded-full hover:bg-red-500 hover:text-white transition-all">सभी रोग देखें <ArrowRight size={20}/></Link></div>
            </FadeIn>
          </div>
        </section>
      )}

      {data.latestHerbs && data.latestHerbs.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-white to-[#F9FAF8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-6">
                <div className="max-w-2xl"><div className="flex items-center gap-2 text-[#1EAD16] font-bold mb-3 uppercase tracking-wider text-sm"><Leaf size={16}/> Materia Medica</div><h2 className="text-4xl md:text-5xl font-extrabold text-[#1A361A]">जड़ी-बूटी पुस्तकालय</h2><p className="text-lg text-gray-600 mt-4">शक्तिशाली औषधीय वनस्पतियों के रस, गुण, वीर्य और विपाक के बारे में विस्तार से जानें।</p></div>
                <Link href="/hi/herbs" className="hidden md:flex items-center gap-2 text-[#1EAD16] font-bold hover:underline transition mt-4 md:mt-0">लाइब्रेरी देखें <ArrowRight size={20}/></Link>
              </div>
              <div className="grid md:grid-cols-4 gap-6">
                {data.latestHerbs.map((item: any, i: number) => (
                  <Link href={`/hi/herbs/${cleanSlug(item.slug.current)}`} key={i} className="group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-6 group-hover:bg-[#1EAD16] transition-colors duration-300"><Leaf size={28} className="text-[#1EAD16] group-hover:text-white" /></div>
                    <h3 className="text-xl font-bold text-[#1A361A] mb-1 group-hover:text-[#1EAD16] transition">{item.title}</h3>
                    {item.botanicalName && <p className="text-xs text-gray-400 italic mb-4">{item.botanicalName}</p>}
                    <p className="text-gray-500 line-clamp-3 text-sm">{item.seoDescription || "विस्तृत आयुर्वेदिक गुणों की खोज करें।"}</p>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      <section className="py-24 bg-[#1A361A] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">सिर्फ लक्षणों का नहीं, मूल कारण का इलाज।</h2>
                <p className="text-green-100 text-lg leading-relaxed mb-8">आयुर्वेद जीवन का 5,000 साल पुराना विज्ञान है जो मन, शरीर और आत्मा को संतुलित करने पर केंद्रित है।</p>
                <div className="space-y-6">
                  <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Sun className="text-yellow-400" /></div><div><h4 className="text-xl font-bold mb-1">समग्र स्वास्थ्य</h4></div></div>
                  <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Wind className="text-blue-300" /></div><div><h4 className="text-xl font-bold mb-1">दोष संतुलन</h4></div></div>
                  <div className="flex items-start gap-4"><div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Droplets className="text-green-400" /></div><div><h4 className="text-xl font-bold mb-1">विषहरण (डिटॉक्स)</h4></div></div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 bg-[#F9FAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <FadeIn>
              <div className="flex items-center gap-3 mb-8"><div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center"><Activity className="text-blue-600" /></div><h2 className="text-3xl font-extrabold text-[#1A361A]">पंचकर्म</h2></div>
              <div className="space-y-6">
                {data.latestTreatments?.map((item: any, i: number) => (
                  <Link href={`/hi/treatments/${cleanSlug(item.slug.current)}`} key={i} className="group flex gap-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="w-24 h-24 rounded-xl bg-blue-50 shrink-0 relative overflow-hidden">{item.images && item.images[0] ? <Image src={urlFor(item.images[0]).url()} alt={item.title} fill className="object-cover group-hover:scale-110 transition" /> : <Activity className="text-blue-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}</div>
                    <div className="flex flex-col justify-center"><h3 className="font-bold text-[#1A361A] text-lg group-hover:text-blue-600 transition">{item.title}</h3><p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.seoDescription || item.shortDescription}</p></div>
                  </Link>
                ))}
              </div>
              <Link href="/hi/treatments" className="inline-block mt-6 font-bold text-blue-600 hover:underline">सभी उपचार देखें &rarr;</Link>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex items-center gap-3 mb-8"><div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center"><Utensils className="text-orange-600" /></div><h2 className="text-3xl font-extrabold text-[#1A361A]">आहार योजनाएं</h2></div>
              <div className="space-y-6">
                {data.latestDiets?.map((item: any, i: number) => (
                  <Link href={`/hi/diets/${cleanSlug(item.slug.current)}`} key={i} className="group flex gap-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="w-24 h-24 rounded-xl bg-orange-50 shrink-0 relative overflow-hidden">{item.image ? <Image src={urlFor(item.image).url()} alt={item.title} fill className="object-cover group-hover:scale-110 transition" /> : <Utensils className="text-orange-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}</div>
                    <div className="flex flex-col justify-center"><h3 className="font-bold text-[#1A361A] text-lg group-hover:text-orange-500 transition">{item.title}</h3><p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.seoDescription || item.shortDescription}</p></div>
                  </Link>
                ))}
              </div>
              <Link href="/hi/diets" className="inline-block mt-6 font-bold text-orange-500 hover:underline">7-दिवसीय योजनाएं देखें &rarr;</Link>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-gray-100">
        <FadeIn><BmrCalculator /></FadeIn>
      </section>

      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="bg-[#1A361A] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row relative">
              <div className="lg:w-5/12 p-12 md:p-16 text-white relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-800 text-green-200 text-sm font-bold mb-6"><MessageCircle size={14} /> मुफ्त विशेषज्ञ परामर्श</div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6">स्वास्थ्य संबंधी प्रश्न?</h2>
                <p className="text-green-100 text-lg leading-relaxed mb-8">अपने स्वास्थ्य संबंधी प्रश्न पूछें। हमारे आयुर्वेदिक विशेषज्ञ आपका मार्गदर्शन करेंगे।</p>
              </div>
              <div className="lg:w-7/12 bg-gray-50 p-12 md:p-16 lg:rounded-l-[3rem] relative z-20">
                {/* 🔥 HINDI FORM CONNECTED HERE */}
                <ContactForm isHindi={true} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}