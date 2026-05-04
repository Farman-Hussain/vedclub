import { client } from "@/sanity/client";
import { Leaf } from "lucide-react";
import SearchGrid from "@/app/components/SearchGrid";

export const revalidate = 60;

async function getHindiHerbs() {
  // Fetches ALL Hindi herbs from Sanity
  const query = `*[_type == "herb" && language == 'hi'] | order(title asc) {
    title, botanicalName, slug, images, seoDescription, shortDescription
  }`;
  return await client.fetch(query);
}

export default async function HindiHerbsIndexPage() {
  const herbs = await getHindiHerbs();

  return (
    <div className="bg-[#F9FAF8] min-h-screen pb-24">
      {/* Hero Section */}
      <section className="bg-[#1A361A] text-white pt-20 pb-36 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-[#1EAD16] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-green-200 text-sm font-bold mb-6 border border-white/20">
            <Leaf size={16} /> वेद क्लब जड़ी-बूटी संग्रह
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">आयुर्वेदिक जड़ी-बूटी पुस्तकालय</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto leading-relaxed">
            प्राचीन वानस्पतिक ज्ञान और आधुनिक वैज्ञानिक शोध पर आधारित हमारी विस्तृत लाइब्रेरी खोजें।
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <SearchGrid items={herbs} type="जड़ी-बूटियां" basePath="/hi/herbs" />
      </section>
    </div>
  );
}