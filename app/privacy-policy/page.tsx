import { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy | Ved Club" };

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto prose prose-green lg:prose-lg text-gray-700">
        <h1 className="text-4xl font-extrabold text-[#1A361A] mb-8">Privacy Policy</h1>
        <p>Ved Club respects your privacy and is committed to protecting your personal data in accordance with applicable Indian laws, including the Information Technology Act, 2000.</p>
        
        <h2 className="text-2xl font-bold text-[#1A361A] mt-8 mb-4">1. Data We Collect</h2>
        <p>We may collect personal identification information (Name, Phone Number, Email) when you voluntarily submit it through our Consultation Booking forms, Contact forms, or Newsletter subscriptions. We also collect anonymous analytical data (Cookies, Browser type) to improve website performance.</p>

        <h2 className="text-2xl font-bold text-[#1A361A] mt-8 mb-4">2. Patient Confidentiality</h2>
        <p>Any health-related information, symptoms, or medical history shared via our Consultation form is treated with strict medical confidentiality. It is only accessible by Dr. Aman and the authorized medical team for the purpose of diagnosis and treatment planning.</p>

        <h2 className="text-2xl font-bold text-[#1A361A] mt-8 mb-4">3. Data Sharing</h2>
        <p>We do not sell, trade, or rent users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and trusted affiliates.</p>
      </div>
    </div>
  );
}