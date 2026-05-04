import { client } from "@/sanity/client";
import { Briefcase } from "lucide-react";
import SearchGrid from "@/app/components/SearchGrid";

export const revalidate = 60;

async function getAllNews() {
  const query = `*[_type == "news" && (!defined(language) || language == 'en')] | order(lastDate desc) {
    title, slug, image, seoDescription
  }`;
  const news = await client.fetch(query);
  
  return news.map((item: any) => ({
    ...item,
    images: item.image ? [item.image] : null
  }));
}

export default async function NewsIndexPage() {
  const news = await getAllNews();

  return (
    <div className="bg-[#F9FAF8] min-h-screen pb-24">
      <section className="bg-[#1A361A] text-white pt-20 pb-36 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-teal-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-cyan-200 text-sm font-bold mb-6 border border-white/20">
            <Briefcase size={16} /> Official Updates
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">AYUSH News & Jobs</h1>
          <p className="text-xl text-cyan-50 max-w-2xl mx-auto leading-relaxed">
            Stay updated with the latest government AYUSH notifications, medical job openings, and policy changes.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <SearchGrid items={news} type="News" basePath="/news" />
      </section>
    </div>
  );
}