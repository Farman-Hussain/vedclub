import { Metadata } from "next";
export const metadata: Metadata = { title: "Medical Disclaimer | Ved Club" };

export default function DisclaimerPage() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto prose prose-green lg:prose-lg text-gray-700">
        <h1 className="text-4xl font-extrabold text-[#1A361A] mb-8">Medical Disclaimer</h1>
        <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-bold text-[#1A361A] mt-8 mb-4">1. Educational Purposes Only</h2>
        <p>The information provided on Ved Club (including text, graphics, images, and other material) is for informational and educational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment.</p>
        
        <h2 className="text-2xl font-bold text-[#1A361A] mt-8 mb-4">2. Consult a Physician</h2>
        <p>Always seek the advice of your physician, certified Ayurvedic practitioner (BAMS/MD), or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website.</p>
        
        <h2 className="text-2xl font-bold text-[#1A361A] mt-8 mb-4">3. Ayurvedic Treatments & Remedies</h2>
        <p>Ayurvedic remedies, diets, and treatments described on this platform are based on ancient classical texts (Samhitas) and modern research. However, Ayurveda is a highly personalized science. Herbs and treatments that work for one body type (Prakriti) may not be suitable for another. Self-medication is strictly discouraged.</p>
        
        <h2 className="text-2xl font-bold text-[#1A361A] mt-8 mb-4">4. Emergencies</h2>
        <p>If you think you may have a medical emergency, call your doctor or emergency services immediately. Ved Club does not recommend or endorse any specific tests, physicians, products, procedures, or opinions mentioned on the Site.</p>
      </div>
    </div>
  );
}