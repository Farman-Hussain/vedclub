import { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Use | Ved Club" };

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto prose prose-green lg:prose-lg text-gray-700">
        <h1 className="text-4xl font-extrabold text-[#1A361A] mb-8">Terms of Use</h1>
        <p>By accessing and using Ved Club, you accept and agree to be bound by the terms and provisions of this agreement.</p>
        
        <h2 className="text-2xl font-bold text-[#1A361A] mt-8 mb-4">1. Intellectual Property</h2>
        <p>All content published on Ved Club, including articles, graphics, logos, and digital downloads, is the property of Ved Club and protected by international copyright laws. You may not reproduce, duplicate, or redistribute the content without express written permission.</p>

        <h2 className="text-2xl font-bold text-[#1A361A] mt-8 mb-4">2. User Conduct</h2>
        <p>You agree to use the site only for lawful purposes. You agree not to take any action that might compromise the security of the site, render the site inaccessible to others, or otherwise cause damage to the site or the Content.</p>

        <h2 className="text-2xl font-bold text-[#1A361A] mt-8 mb-4">3. Consultation Terms</h2>
        <p>Booking a consultation through our website does not guarantee a cure for any disease. Ayurvedic treatment requires patient adherence to prescribed dietary and lifestyle modifications. The consulting physician reserves the right to refuse treatment if the case requires in-person emergency hospital care.</p>
      </div>
    </div>
  );
}