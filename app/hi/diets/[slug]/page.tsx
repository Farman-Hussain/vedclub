import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Utensils, CheckCircle2, XCircle, Calendar, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import DoctorSidebar from "@/app/components/DoctorSidebar";

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

async function getDiet(baseSlug: string) {
  const hiSlug = `${baseSlug}-hi`;
  const query = `*[_type == "diet" && (slug.current == $hiSlug || slug.current == $baseSlug) && language == 'hi'][0]{ ..., author-> }`;
  return await client.fetch(query, { hiSlug, baseSlug });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const diet = await getDiet(slug);
  if (!diet) return {};
  return { title: diet.seoTitle || `${diet.title} | वेद क्लब`, description: diet.seoDescription };
}

const ptComponents = {
  block: {
    h2: ({children, value}: any) => <h2 id={slugify(value.children[0].text)} className="text-3xl font-bold mt-10 mb-4 text-[#1A361A] scroll-mt-28">{children}</h2>,
    h3: ({children, value}: any) => <h3 id={slugify(value.children[0].text)} className="text-2xl font-bold mt-8 mb-4 text-[#1A361A] scroll-mt-28">{children}</h3>,
    normal: ({children}: any) => <p className="mb-6 leading-relaxed text-gray-700 text-lg">{children}</p>,
  },
  list: { bullet: ({children}: any) => <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">{children}</ul> },
};

export default async function HindiDietDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const diet = await getDiet(slug);
  if (!diet) return notFound();

  const headings = diet.overview?.filter((b: any) => b._type === 'block' && (b.style === 'h2' || b.style === 'h3')).map((b: any) => { const text = b.children[0].text; return { text, id: slugify(text), level: b.style }; }) ||[];

  return (
    <div className="bg-[#F9FAF8] min-h-screen pb-20 scroll-smooth">
      {diet.customSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: diet.customSchema }} />}

      <section className="bg-orange-50 pt-12 pb-24 px-4 sm:px-6 lg:px-8 border-b border-orange-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 animate-fade-in">
            <Link href="/hi/diets" className="inline-flex items-center text-gray-500 hover:text-orange-600 mb-8 transition-colors text-sm font-medium">
              <ArrowLeft size={16} className="mr-2" /> आहार योजना पर वापस जाएं
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-orange-200 text-orange-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"><Utensils size={14}/> आहार योजना</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#1A361A] mb-6 leading-tight">{diet.title}</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mb-8">{diet.shortDescription}</p>
            <a href="#plan" className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg inline-flex items-center gap-2 hover:bg-orange-600 transition shadow-lg hover:-translate-y-1">
              <Calendar size={20} /> 7-दिवसीय योजना देखें
            </a>
          </div>

          <div className="w-full max-w-md aspect-square p-2 bg-white rounded-[2.5rem] shadow-xl relative overflow-hidden">
             {diet.image ? (
                <Image src={urlFor(diet.image).url()} alt={diet.title} fill className="object-cover rounded-[2rem]" />
             ) : (
                <div className="w-full h-full bg-orange-100 rounded-[2rem] flex items-center justify-center"><Utensils size={64} className="text-orange-300" /></div>
             )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col md:flex-row gap-12 relative z-10">
        
        <div className="md:w-1/4 hidden md:block">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="font-bold text-[#1A361A] mb-4 uppercase tracking-wider text-sm">विषय सूची</h3>
              <ul className="space-y-3 text-gray-600 font-medium text-sm">
                {diet.overview && <li><a href="#overview" className="hover:text-orange-500 transition">अवलोकन</a></li>}
                {(diet.foodsToEat || diet.foodsToAvoid) && <li><a href="#guidelines" className="hover:text-orange-500 transition">आहार दिशानिर्देश</a></li>}
                {diet.weeklyPlan && <li><a href="#plan" className="hover:text-orange-500 transition font-bold text-[#1A361A]">7-दिवसीय योजना</a></li>}
                {headings.map((h: any, i: number) => ( <li key={i} className={h.level === 'h3' ? 'pl-4' : ''}><a href={`#${h.id}`} className="hover:text-orange-500 transition">{h.text}</a></li> ))}
                {diet.faqs && <li><a href="#faqs" className="hover:text-orange-500 transition">सामान्य प्रश्न</a></li>}
              </ul>
            </div>
            <DoctorSidebar author={diet.author} layout="vertical" />
          </div>
        </div>

        <div className="md:w-3/4 space-y-12">
          
          {diet.overview && (
            <article id="overview" className="scroll-mt-28 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <PortableText value={diet.overview} components={ptComponents} />
            </article>
          )}

          <div id="guidelines" className="grid md:grid-cols-2 gap-8 scroll-mt-28">
            {diet.foodsToEat && (
              <div className="bg-green-50 p-8 rounded-3xl border border-green-100">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2"><CheckCircle2 className="text-green-600" /> शामिल करने योग्य</h3>
                <PortableText value={diet.foodsToEat} components={ptComponents} />
              </div>
            )}
            {diet.foodsToAvoid && (
              <div className="bg-red-50 p-8 rounded-3xl border border-red-100">
                <h3 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2"><XCircle className="text-red-500" /> परहेज करने योग्य</h3>
                <PortableText value={diet.foodsToAvoid} components={ptComponents} />
              </div>
            )}
          </div>

          {diet.weeklyPlan && diet.weeklyPlan.length > 0 && (
            <section id="plan" className="scroll-mt-28">
              <h2 className="text-3xl font-extrabold text-[#1A361A] mb-8 flex items-center gap-3"><Calendar className="text-orange-500"/> 7-दिवसीय प्रोटोकॉल</h2>
              <div className="space-y-8">
                {diet.weeklyPlan.map((day: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition">
                    <div className="bg-orange-500 text-white px-6 py-3 font-bold text-lg">{day.day || `दिन ${idx + 1}`}</div>
                    <div className="p-6 grid sm:grid-cols-2 gap-6 text-gray-700">
                      {day.earlyMorning && <div><span className="block text-xs font-bold text-gray-400 uppercase mb-1">सुबह जल्दी</span><p>{day.earlyMorning}</p></div>}
                      {day.breakfast && <div><span className="block text-xs font-bold text-gray-400 uppercase mb-1">नाश्ता</span><p>{day.breakfast}</p></div>}
                      {day.midMorning && <div><span className="block text-xs font-bold text-gray-400 uppercase mb-1">मध्य-सुबह (स्नैक)</span><p>{day.midMorning}</p></div>}
                      {day.lunch && <div><span className="block text-xs font-bold text-gray-400 uppercase mb-1">दोपहर का भोजन</span><p>{day.lunch}</p></div>}
                      {day.evening && <div><span className="block text-xs font-bold text-gray-400 uppercase mb-1">शाम का नाश्ता</span><p>{day.evening}</p></div>}
                      {day.dinner && <div><span className="block text-xs font-bold text-gray-400 uppercase mb-1">रात का भोजन</span><p>{day.dinner}</p></div>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQs & References omitted for brevity */}
          {/* 🔥 MOBILE DOCTOR INFO */}
          <div className="block md:hidden mt-12 pt-8 border-t border-green-100">
            <h3 className="font-bold text-[#1A361A] mb-4 uppercase tracking-wider text-sm">चिकित्सा समीक्षक</h3>
            <DoctorSidebar author={diet.author} layout="vertical" />
          </div>
        </div>
      </div>
    </div>
  );
}