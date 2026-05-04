import { client } from "@/sanity/client";
import { Stethoscope } from "lucide-react";
import SearchGrid from "@/app/components/SearchGrid";

export const revalidate = 60;

async function getAllMedicines() {
  const query = `*[_type == "medicine" && (!defined(language) || language == 'en')] | order(title asc) {
    title, slug, images, seoDescription, shortDescription
  }`;
  return await client.fetch(query);
}

export default async function MedicinesIndexPage() {
  const medicines = await getAllMedicines();

  return (
    <div className="bg-[#F9FAF8] min-h-screen pb-24">
      <section className="bg-[#1A361A] text-white pt-20 pb-36 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-yellow-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-orange-200 text-sm font-bold mb-6 border border-white/20">
            <Stethoscope size={16} /> Classical Formulations
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">Ayurvedic Medicines</h1>
          <p className="text-xl text-orange-50 max-w-2xl mx-auto leading-relaxed">
            Discover indications, precise dosage, and Anupana for highly effective classical polyherbal formulations.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <SearchGrid items={medicines} type="Medicines" basePath="/medicines" />
      </section>
    </div>
  );
}