import { client } from "@/sanity/client";
import { BookOpen } from "lucide-react";
import SearchGrid from "@/app/components/SearchGrid";

export const revalidate = 60;

async function getAllBlogs() {
  const query = `*[_type == "blog" && category == 'blog' && (!defined(language) || language == 'en')] | order(publishedAt desc) {
    title, slug, image, seoDescription
  }`;
  const blogs = await client.fetch(query);
  
  return blogs.map((blog: any) => ({
    ...blog,
    images: blog.image ? [blog.image] : null
  }));
}

export default async function BlogIndexPage() {
  const blogs = await getAllBlogs();

  return (
    <div className="bg-[#F9FAF8] min-h-screen pb-24">
      <section className="bg-[#1A361A] text-white pt-20 pb-36 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-sm font-bold mb-6 border border-white/20">
            <BookOpen size={16} /> Ayurvedic Knowledge
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">The Ved Club Blog</h1>
          <p className="text-xl text-indigo-50 max-w-2xl mx-auto leading-relaxed">
            In-depth articles exploring ancient wellness concepts, holistic living, and profound Ayurvedic sciences.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <SearchGrid items={blogs} type="Articles" basePath="/blog" />
      </section>
    </div>
  );
}