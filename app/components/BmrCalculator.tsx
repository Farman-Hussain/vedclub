"use client";
import { useState } from "react";
import { Calculator, Flame, Scale, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BmrCalculator() {
  const [age, setAge] = useState<number | "">("");
  const[gender, setGender] = useState("male");
  const [height, setHeight] = useState<number | "">("");
  const [weight, setWeight] = useState<number | "">("");
  const[activity, setActivity] = useState(1.2); // Default Sedentary
  const [results, setResults] = useState<any>(null);

  const calculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!age || !height || !weight) return;

    // Mifflin-St Jeor Equation
    let bmr = (10 * Number(weight)) + (6.25 * Number(height)) - (5 * Number(age));
    bmr += gender === "male" ? 5 : -161;

    const bmi = Number(weight) / Math.pow(Number(height) / 100, 2);
    let status = "Normal Weight";
    let color = "text-green-600 bg-green-100";
    if (bmi < 18.5) { status = "Underweight"; color = "text-yellow-600 bg-yellow-100"; }
    else if (bmi >= 25 && bmi < 29.9) { status = "Overweight"; color = "text-orange-600 bg-orange-100"; }
    else if (bmi >= 30) { status = "Obese"; color = "text-red-600 bg-red-100"; }

    const maintenance = Math.round(bmr * activity);

    setResults({ bmr: Math.round(bmr), bmi: bmi.toFixed(1), status, color, maintenance, loss: maintenance - 500, gain: maintenance + 500 });
  };

  return (
    <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 p-8 md:p-12 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold mb-6"><Calculator size={14}/> Health Tools</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#1A361A] mb-4">Calculate Your BMI & BMR</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">Discover exactly how many calories your body burns naturally and get your personalized Ayurvedic diet targets.</p>
          
          <form onSubmit={calculate} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Gender</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#1EAD16] outline-none">
                    <option value="male">Male</option><option value="female">Female</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Age</label>
                  <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#1EAD16] outline-none" placeholder="Years" required />
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Height (cm)</label>
                  <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#1EAD16] outline-none" placeholder="e.g. 175" required />
               </div>
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Weight (kg)</label>
                  <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#1EAD16] outline-none" placeholder="e.g. 70" required />
               </div>
            </div>
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Activity Level</label>
               <select value={activity} onChange={(e) => setActivity(Number(e.target.value))} className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-[#1EAD16] outline-none">
                 <option value="1.2">Sedentary (Little or no exercise)</option>
                 <option value="1.375">Light (Exercise 1-3 days/week)</option>
                 <option value="1.55">Moderate (Exercise 3-5 days/week)</option>
                 <option value="1.725">Active (Exercise 6-7 days/week)</option>
               </select>
            </div>
            <button type="submit" className="w-full bg-[#1A361A] text-white font-bold py-4 rounded-xl hover:bg-[#1EAD16] transition-colors">Calculate My Stats</button>
          </form>
        </div>

        {/* RESULTS SECTION */}
        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 h-full flex flex-col justify-center">
          {results ? (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center pb-6 border-b border-gray-200">
                <div><p className="text-gray-500 font-bold mb-1">Your BMI</p><p className="text-3xl font-extrabold text-[#1A361A]">{results.bmi}</p></div>
                <div className={`px-4 py-2 rounded-full font-bold text-sm ${results.color}`}>{results.status}</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm"><div className="flex items-center gap-2 text-gray-500 text-sm font-bold mb-2"><Flame size={16} className="text-orange-500"/> BMR</div><p className="text-xl font-bold text-[#1A361A]">{results.bmr} <span className="text-xs">kcal</span></p></div>
                <div className="bg-white p-4 rounded-2xl shadow-sm"><div className="flex items-center gap-2 text-gray-500 text-sm font-bold mb-2"><Scale size={16} className="text-blue-500"/> Maintenance</div><p className="text-xl font-bold text-[#1A361A]">{results.maintenance} <span className="text-xs">kcal</span></p></div>
              </div>
              <div className="bg-green-100 p-5 rounded-2xl">
                <p className="text-green-800 font-bold mb-2">Target Calories per day:</p>
                <div className="flex justify-between text-sm font-bold"><span className="text-green-700">For Fat Loss:</span> <span className="text-[#1A361A]">{results.loss} kcal</span></div>
                <div className="flex justify-between text-sm font-bold mt-2"><span className="text-green-700">For Weight Gain:</span> <span className="text-[#1A361A]">{results.gain} kcal</span></div>
              </div>
              <Link href="/diets" className="w-full bg-[#1EAD16] text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-green-700 transition">
                View Ayurvedic Diet Plans <ArrowRight size={18} />
              </Link>
            </div>
          ) : (
            <div className="text-center text-gray-400 flex flex-col items-center justify-center h-full">
              <Activity size={48} className="mb-4 opacity-50" />
              <p className="font-bold">Enter your details to generate your report.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}