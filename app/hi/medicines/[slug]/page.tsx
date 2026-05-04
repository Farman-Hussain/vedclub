import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Leaf, ShoppingBag, CheckCircle2, ShoppingCart, Zap, PlayCircle, BookOpen, Droplets, Activity } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import DoctorSidebar from "@/app/components/DoctorSidebar";

const getYouTubeId = (url: string) => { const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/); return (match && match[2].length === 11) ? match[2] : null; };
const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// 🔥 MAGIC HINDI FETCH
async function getMedicine(baseSlug: string) {
  const hiSlug = `${baseSlug}-hi`;
  const query = `*[_type == "medicine" && (slug.current == $hiSlug || slug.current == $baseSlug) && language == 'hi'][0]{ ..., author-> }`;
  return await client.fetch(query, { hiSlug, baseSlug });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const med = await getMedicine(slug);
  if (!med) return {};
  return { title: med.seoTitle || `${med.title} | वेद क्लब`, description: med.seoDescription };
}

const ptComponents = {
  block: {
    h2: ({children, value}: any) => <h2 id={slugify(value.children[0].text)} className="text-3xl font-bold mt-10 mb-4 text-[#1A361A] scroll-mt-28">{children}</h2>,
    h3: ({children, value}: any) => <h3 id={slugify(value.children[0].text)} className="text-2xl font-bold mt-8 mb-4 text-[#1A361A] scroll-mt-28">{children}</h3>,
    normal: ({children}: any) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
  },
  list: { bullet: ({children}: any) => <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2">{children}</ul> },
  marks: { strong: ({children}: any) => <strong className="font-bold text-[#1A361A]">{children}</strong> }
};

export default async function HindiMedicinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const med = await getMedicine(slug);
  if (!med) return notFound();

  const ytId = med.youtubeVideo ? getYouTubeId(med.youtubeVideo) : null;
  const headings = med.content?.filter((b: any) => b._type === 'block' && (b.style === 'h2' || b.style === 'h3')).map((b: any) => { const text = b.children[0].text; return { text, id: slugify(text), level: b.style }; }) || [];

  return (
    <div className="bg-[#F9FAF8] min-h-screen pb-20 scroll-smooth">
      {med.customSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: med.customSchema }} />}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link href="/hi/medicines" className="inline-flex items-center text-gray-500 hover:text-[#1EAD16] mb-6 transition-colors font-medium">
          <ArrowLeft size={16} className="mr-2" /> औषधियों पर वापस जाएं
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-[#1EAD16] text-sm font-bold mb-4 shadow-sm">
              <Activity size={14} /> आयुर्वेदिक औषधि
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-[#1A361A] mb-2">{med.title}</h1>
            {med.classicalReference && <p className="text-lg text-gray-500 italic mb-6">संदर्भ: {med.classicalReference}</p>}
            <div className="mb-8"><PortableText value={med.shortDescription} components={ptComponents} /></div>
            
            {/* BUY BUTTONS */}
            <div className="mt-8">
              {(med.storeLink || med.amazonLink || med.blinkitLink) ? (
                <div className="flex flex-wrap gap-4">
                  {med.storeLink && <a href={med.storeLink} target="_blank" rel="noreferrer" className="bg-[#1EAD16] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-green-700 transition hover:-translate-y-1 shadow-md"><ShoppingBag size={18} /> खरीदें</a>}
                  {med.amazonLink && <a href={med.amazonLink} target="_blank" rel="noreferrer" className="bg-gray-900 text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-black transition hover:-translate-y-1 shadow-md"><ShoppingCart size={18} /> Amazon</a>}
                </div>
              ) : (
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between max-w-md">
                  <div><p className="text-[#1A361A] font-bold">जल्द आ रहा है</p></div>
                </div>
              )}
            </div>
          </div>

          <div className="relative w-full aspect-square max-w-md mx-auto lg:ml-auto group p-4">
             {med.images && med.images.length > 0 ? (
                <div className="relative w-full h-full rounded-[2rem] shadow-2xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="flex overflow-x-auto snap-x snap-mandatory w-full h-full hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
                    {med.images.map((img: any, i: number) => (
                      <div key={i} className="snap-center shrink-0 w-full h-full relative bg-white">
                        <Image src={urlFor(img).url()} alt={`${med.title} image`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
             ) : (
                <div className="w-full h-full bg-green-900 rounded-[2rem] shadow-2xl relative flex items-center justify-center transition-all duration-700 group-hover:rotate-y-6 group-hover:rotate-x-6"><Leaf className="text-green-100/20" size={100} /></div>
             )}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:flex-row gap-12">
        <div className="md:w-1/4 hidden md:block">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#1A361A] mb-4 uppercase tracking-wider text-sm">विषय सूची</h3>
              <ul className="space-y-3 text-gray-600 font-medium text-sm">
                {med.indications && <li><a href="#indications" className="hover:text-[#1EAD16] transition">उपयोग और लाभ</a></li>}
                {med.ingredients && <li><a href="#ingredients" className="hover:text-[#1EAD16] transition">मुख्य सामग्री</a></li>}
                {med.dosage && <li><a href="#dosage" className="hover:text-[#1EAD16] transition">खुराक और अनुपान</a></li>}
                {headings.map((heading: any, i: number) => (
                  <li key={i} className={heading.level === 'h3' ? 'pl-4' : ''}><a href={`#${heading.id}`} className="hover:text-[#1EAD16] transition">{heading.text}</a></li>
                ))}
                {ytId && <li><a href="#video" className="hover:text-[#1EAD16] transition">वीडियो देखें</a></li>}
              </ul>
            </div>
            <DoctorSidebar author={med.author} layout="vertical" />
          </div>
        </div>

        <div className="md:w-3/4 space-y-12">
          <div className="grid md:grid-cols-2 gap-8">
            {med.indications && (
              <section id="indications" className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 scroll-mt-28">
                <h3 className="text-xl font-bold text-[#1A361A] mb-4 flex items-center gap-2"><Activity className="text-blue-500" /> उपयोग और लाभ</h3>
                <PortableText value={med.indications} components={ptComponents} />
              </section>
            )}
            {med.ingredients && (
              <section id="ingredients" className="bg-green-50/50 p-8 rounded-3xl border border-green-100 scroll-mt-28">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2"><Leaf className="text-green-600" /> मुख्य सामग्री</h3>
                <PortableText value={med.ingredients} components={ptComponents} />
              </section>
            )}
          </div>

          {med.dosage && (
            <section id="dosage" className="bg-orange-50/50 p-8 rounded-3xl border border-orange-100 scroll-mt-28">
              <h2 className="text-2xl font-bold text-orange-900 mb-4 flex items-center gap-2"><Droplets className="text-orange-500" /> खुराक और अनुपान</h2>
              <PortableText value={med.dosage} components={ptComponents} />
            </section>
          )}

          {med.content && (
            <article id="content" className="scroll-mt-28">
              <PortableText value={med.content} components={ptComponents} />
            </article>
          )}

          {ytId && (
            <section id="video" className="scroll-mt-28">
              <h2 className="text-3xl font-bold text-[#1A361A] mb-6 flex items-center gap-2"><PlayCircle className="text-red-600"/> वीडियो देखें</h2>
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                <iframe src={`https://www.youtube.com/embed/${ytId}`} allowFullScreen className="absolute top-0 left-0 w-full h-full border-0"></iframe>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}