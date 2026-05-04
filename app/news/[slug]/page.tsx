import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Calendar, PlayCircle, BookOpen, Phone, MessageCircle, Globe, Camera, Link as LinkIcon, Briefcase } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import DoctorSidebar from "@/app/components/DoctorSidebar";

// Helper to extract YouTube ID
const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// Helper to create URL-safe IDs from headings
const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

async function getNews(slug: string) {
  // 🔥 FETCHES ONLY FROM THE NEWS DATABASE
  const query = `*[_type == "news" && slug.current == $slug][0]{ ..., author-> }`;
  return await client.fetch(query, { slug });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const newsItem = await getNews(slug);
  if (!newsItem) return {};
  return { title: newsItem.seoTitle || `${newsItem.title} | Ved Club News`, description: newsItem.seoDescription };
}

// 🔥 THIS MAKES YOUR RICH TEXT HEADINGS CLICKABLE
const ptComponents = {
  block: {
    h2: ({children, value}: any) => {
      const text = value.children.map((c: any) => c.text).join('');
      return <h2 id={slugify(text)} className="text-3xl font-bold mt-10 mb-4 text-[#1A361A] scroll-mt-28">{children}</h2>;
    },
    h3: ({children, value}: any) => {
      const text = value.children.map((c: any) => c.text).join('');
      return <h3 id={slugify(text)} className="text-2xl font-bold mt-8 mb-4 text-[#1A361A] scroll-mt-28">{children}</h3>;
    },
    normal: ({children}: any) => <p className="mb-6 leading-relaxed text-gray-700 text-lg">{children}</p>,
  },
  list: { bullet: ({children}: any) => <ul className="list-disc pl-5 mb-6 text-gray-700 space-y-2 text-lg">{children}</ul> },
};

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const newsItem = await getNews(slug);
  if (!newsItem) return notFound();

  const getInitials = (name: string) => name.split(' ').map((n: string) => n[0]).join('').substring(0, 2);
  const ytId = newsItem.youtubeVideo ? getYouTubeId(newsItem.youtubeVideo) : null;

  // 🔥 EXTRACT HEADINGS FOR THE TABLE OF CONTENTS
  const headings = newsItem.content?.filter((block: any) => block._type === 'block' && (block.style === 'h2' || block.style === 'h3'))
    .map((block: any) => {
      const text = block.children.map((c: any) => c.text).join('');
      return { text, id: slugify(text), level: block.style };
    }) ||[];

  return (
    <div className="bg-white min-h-screen pb-20 scroll-smooth">
      {newsItem.customSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: newsItem.customSchema }} />}

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <Link href="/news" className="inline-flex items-center text-gray-500 hover:text-[#1EAD16] mb-8 transition-colors font-medium">
          <ArrowLeft size={16} className="mr-2" /> Back to News Hub
        </Link>
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1"><Briefcase size={12}/> Update</span>
          {newsItem.lastDate && <span className="text-red-500 font-bold text-sm bg-red-50 px-3 py-1 rounded-full">Last Date: {new Date(newsItem.lastDate).toLocaleDateString()}</span>}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A361A] mb-8 leading-tight">{newsItem.title}</h1>
        
        {newsItem.applyLink && (
           <a href={newsItem.applyLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#1EAD16] text-white px-8 py-4 rounded-xl font-bold mb-8 hover:bg-green-700 hover:-translate-y-1 shadow-lg transition-all">
             <LinkIcon size={18} /> Apply Now / Official Notification
           </a>
        )}
      </section>

      {newsItem.image && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <img src={urlFor(newsItem.image).url()} alt={newsItem.title} className="w-full aspect-[16/9] object-cover rounded-3xl shadow-lg" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12">
        
        {/* LEFT: STICKY SIDEBAR (Dynamic ToC) */}
        <div className="md:w-1/4 hidden md:block">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#1A361A] mb-4 uppercase tracking-wider text-sm">Table of Contents</h3>
              <ul className="space-y-3 text-gray-600 font-medium text-sm">
                {/* 1. DYNAMIC HEADINGS LOOP */}
                {headings.map((heading: any, i: number) => (
                  <li key={i} className={heading.level === 'h3' ? 'pl-4' : ''}>
                    <a href={`#${heading.id}`} className="hover:text-[#1EAD16] transition flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> {heading.text}
                    </a>
                  </li>
                ))}
                {/* 2. EXTRA SECTIONS */}
                {ytId && <li><a href="#video" className="hover:text-[#1EAD16] transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> Watch Video</a></li>}
                {newsItem.faqs && <li><a href="#faqs" className="hover:text-[#1EAD16] transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> FAQs</a></li>}
                {newsItem.references && <li><a href="#references" className="hover:text-[#1EAD16] transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> References</a></li>}
              </ul>
            </div>
            <DoctorSidebar author={newsItem.author} layout="vertical" />
          </div>
        </div>

        {/* RIGHT: MAIN CONTENT */}
        <div className="md:w-3/4 space-y-16">
          <article>
            <PortableText value={newsItem.content} components={ptComponents} />
          </article>

          {ytId && (
            <section id="video" className="scroll-mt-28">
              <h2 className="text-3xl font-bold text-[#1A361A] mb-6 flex items-center gap-2"><PlayCircle className="text-red-600"/> Video Explanation</h2>
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                <iframe src={`https://www.youtube.com/embed/${ytId}`} title="YouTube video player" allowFullScreen className="absolute top-0 left-0 w-full h-full border-0"></iframe>
              </div>
            </section>
          )}

          {newsItem.faqs && newsItem.faqs.length > 0 && (
            <section id="faqs" className="scroll-mt-28">
              <h2 className="text-3xl font-bold text-[#1A361A] mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {newsItem.faqs.map((faq: any, i: number) => (
                  <details key={i} className="group bg-white rounded-2xl shadow-sm border border-gray-100 [&_summary::-webkit-details-marker]:hidden hover:shadow-md transition">
                    <summary className="flex items-center justify-between p-6 font-bold cursor-pointer text-[#1A361A]">{faq.question}<span className="transition group-open:rotate-180 text-[#1EAD16]">▼</span></summary>
                    <div className="px-6 pb-6 text-gray-600 border-t border-gray-50 pt-4"><PortableText value={faq.answer} components={ptComponents} /></div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {newsItem.references && (
            <section id="references" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-[#1A361A] mb-6 flex items-center gap-2"><BookOpen className="text-gray-500" /> References & Links</h2>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-sm text-gray-600"><PortableText value={newsItem.references} components={ptComponents} /></div>
            </section>
          )}

          {newsItem.author && (
            <section className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-green-100 mt-16 hover:-translate-y-1 transition duration-300">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Article Reviewed By</h3>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="shrink-0 group">
                  {newsItem.author.image ? <img src={urlFor(newsItem.author.image).width(120).height(120).url()} alt={newsItem.author.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-green-50 shadow-sm group-hover:scale-105 transition" /> : <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-green-100 text-[#1EAD16] flex items-center justify-center font-bold text-4xl shadow-sm group-hover:scale-105 transition">{getInitials(newsItem.author.name)}</div>}
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-[#1A361A] mb-1">{newsItem.author.name}</h4>
                  <p className="text-[#1EAD16] font-medium mb-4">{newsItem.author.specialty}</p>
                  {newsItem.author.bio && <p className="text-gray-600 mb-6 leading-relaxed">{newsItem.author.bio}</p>}
                  <div className="flex flex-wrap gap-3">
                    {newsItem.author.consultationLink && <a href={newsItem.author.consultationLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#1A361A] hover:bg-[#1EAD16] text-white px-5 py-2.5 rounded-full text-sm font-bold transition shadow-md"><Calendar size={16} /> Book Consult</a>}
                    {newsItem.author.whatsapp && <a href={`https://wa.me/${newsItem.author.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2.5 rounded-full text-sm font-bold transition"><MessageCircle size={16} /> WhatsApp</a>}
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