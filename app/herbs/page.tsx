import { client } from "@/sanity/client";
import { Leaf } from "lucide-react";
import SearchGrid from "@/app/components/SearchGrid";

export const revalidate = 60; // Auto-updates the page every 60 seconds when you publish new stuff!

async function getAllHerbs() {
  // Fetches ALL English herbs from Sanity
  const query = `*[_type == "herb" && (!defined(language) || language == 'en')] | order(title asc) {
    title, botanicalName, slug, images, seoDescription
  }`;
  return await client.fetch(query);
}

export default async function HerbsIndexPage() {
  const herbs = await getAllHerbs();

  return (
    <div className="bg-[#F9FAF8] min-h-screen pb-24">
      
      {/* Hero Section (Added pb-36 for more breathing room at the bottom) */}
      <section className="bg-[#1A361A] text-white pt-20 pb-36 px-4 relative overflow-hidden">
        {/* Abstract Background Design */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-[#1EAD16] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-green-200 text-sm font-bold mb-6 border border-white/20">
            <Leaf size={16} /> The Ved Club Materia Medica
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">Ayurvedic Herbs Library</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
            Explore our comprehensive database of ancient botanical wisdom, completely backed by modern scientific research.
          </p>
        </div>
      </section>

      {/* Main Content (Changed to -mt-24 so it overlaps perfectly without touching the bottom line) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <SearchGrid items={herbs} type="Herbs" basePath="/herbs" />
      </section>
      
    </div>
  );
}