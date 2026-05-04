import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Calendar, PlayCircle, BookOpen, Phone, MessageCircle, Globe, Camera } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import DoctorSidebar from "@/app/components/DoctorSidebar";

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

async function getArticle(baseSlug: string) {
  const hiSlug = `${baseSlug}-hi`;
  const query = `*[_type == "blog" && (slug.current == $hiSlug || slug.current == $baseSlug) && language == 'hi'][0]{ ..., author-> }`;
  return await client.fetch(query, { hiSlug, baseSlug });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return { title: article.seoTitle || `${article.title} | वेद क्लब`, description: article.seoDescription };
}

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

export default async function HindiHealthTipPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return notFound();

  const getInitials = (name: string) => name.split(' ').map((n: string) => n[0]).join('').substring(0, 2);
  const ytId = article.youtubeVideo ? getYouTubeId(article.youtubeVideo) : null;

  const headings = article.content?.filter((block: any) => block._type === 'block' && (block.style === 'h2' || block.style === 'h3'))
    .map((block: any) => {
      const text = block.children.map((c: any) => c.text).join('');
      return { text, id: slugify(text), level: block.style };
    }) ||[];

  return (
    <div className="bg-white min-h-screen pb-20 scroll-smooth">
      {article.customSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: article.customSchema }} />}

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <Link href="/hi/health-tips" className="inline-flex items-center text-gray-500 hover:text-[#1EAD16] mb-8 transition-colors font-medium">
          <ArrowLeft size={16} className="mr-2" /> वापस जाएं
        </Link>
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-green-100 text-[#1EAD16] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{article.category === 'tip' ? 'हेल्थ टिप' : 'ब्लॉग'}</span>
          {article.publishedAt && <span className="text-gray-500 text-sm flex items-center gap-1"><Calendar size={14}/> {new Date(article.publishedAt).toLocaleDateString()}</span>}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A361A] mb-8 leading-tight">{article.title}</h1>
      </section>

      {article.image && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <img src={urlFor(article.image).url()} alt={article.title} className="w-full aspect-[16/9] object-cover rounded-3xl shadow-lg" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-12">
        <div className="md:w-1/4 hidden md:block">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#1A361A] mb-4 uppercase tracking-wider text-sm">विषय सूची</h3>
              <ul className="space-y-3 text-gray-600 font-medium text-sm">
                {headings.map((heading: any, i: number) => (
                  <li key={i} className={heading.level === 'h3' ? 'pl-4' : ''}>
                    <a href={`#${heading.id}`} className="hover:text-[#1EAD16] transition flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> {heading.text}
                    </a>
                  </li>
                ))}
                {ytId && <li><a href="#video" className="hover:text-[#1EAD16] transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> वीडियो देखें</a></li>}
                {article.faqs && <li><a href="#faqs" className="hover:text-[#1EAD16] transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> पूछे जाने वाले प्रश्न</a></li>}
                {article.references && <li><a href="#references" className="hover:text-[#1EAD16] transition flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span> संदर्भ</a></li>}
              </ul>
            </div>
            <DoctorSidebar author={article.author} layout="vertical" />
          </div>
        </div>

        <div className="md:w-3/4 space-y-16">
          <article>
            <PortableText value={article.content} components={ptComponents} />
          </article>

          {ytId && (
            <section id="video" className="scroll-mt-28">
              <h2 className="text-3xl font-bold text-[#1A361A] mb-6 flex items-center gap-2"><PlayCircle className="text-red-600"/> वीडियो देखें</h2>
              <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                <iframe src={`https://www.youtube.com/embed/${ytId}`} title="YouTube video player" allowFullScreen className="absolute top-0 left-0 w-full h-full border-0"></iframe>
              </div>
            </section>
          )}

          {article.faqs && article.faqs.length > 0 && (
            <section id="faqs" className="scroll-mt-28">
              <h2 className="text-3xl font-bold text-[#1A361A] mb-8">अक्सर पूछे जाने वाले प्रश्न</h2>
              <div className="space-y-4">
                {article.faqs.map((faq: any, i: number) => (
                  <details key={i} className="group bg-white rounded-2xl shadow-sm border border-gray-100[&_summary::-webkit-details-marker]:hidden hover:shadow-md transition">
                    <summary className="flex items-center justify-between p-6 font-bold cursor-pointer text-[#1A361A]">{faq.question}<span className="transition group-open:rotate-180 text-[#1EAD16]">▼</span></summary>
                    <div className="px-6 pb-6 text-gray-600 border-t border-gray-50 pt-4"><PortableText value={faq.answer} components={ptComponents} /></div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {article.references && (
            <section id="references" className="scroll-mt-28">
              <h2 className="text-2xl font-bold text-[#1A361A] mb-6 flex items-center gap-2"><BookOpen className="text-gray-500" /> वैज्ञानिक संदर्भ</h2>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 text-sm text-gray-600"><PortableText value={article.references} components={ptComponents} /></div>
            </section>
          )}

          {article.author && (
            <section className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-green-100 mt-16 hover:-translate-y-1 transition duration-300">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">चिकित्सा समीक्षक</h3>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="shrink-0 group">
                  {article.author.image ? <img src={urlFor(article.author.image).width(120).height(120).url()} alt={article.author.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-green-50 shadow-sm group-hover:scale-105 transition" /> : <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-green-100 text-[#1EAD16] flex items-center justify-center font-bold text-4xl shadow-sm group-hover:scale-105 transition">{getInitials(article.author.name)}</div>}
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-[#1A361A] mb-1">{article.author.name}</h4>
                  <p className="text-[#1EAD16] font-medium mb-4">{article.author.specialty}</p>
                  {article.author.bio && <p className="text-gray-600 mb-6 leading-relaxed">{article.author.bio}</p>}
                  <div className="flex flex-wrap gap-3">
                    {article.author.consultationLink && <a href={article.author.consultationLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#1A361A] hover:bg-[#1EAD16] text-white px-5 py-2.5 rounded-full text-sm font-bold transition shadow-md"><Calendar size={16} /> परामर्श (Consult)</a>}
                    {article.author.call && <a href={`tel:${article.author.call}`} className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-full text-sm font-medium text-gray-700 transition hover:-translate-y-0.5"><Phone size={16} className="text-blue-600" /> कॉल करें</a>}
                    {article.author.whatsapp && <a href={`https://wa.me/${article.author.whatsapp.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-4 py-2.5 rounded-full text-sm font-bold transition"><MessageCircle size={16} /> व्हाट्सएप</a>}
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