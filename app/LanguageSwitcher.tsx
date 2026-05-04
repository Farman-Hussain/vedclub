"use client";
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    if (pathname.startsWith('/hi')) {
      router.push(pathname.replace('/hi', '')); // Removes /hi (Goes to English)
    } else {
      router.push(`/hi${pathname}`); // Adds /hi (Goes to Hindi)
    }
  };

  const isHindi = pathname.startsWith('/hi');

  return (
    <button 
      onClick={toggleLanguage}
      className="hidden md:block bg-green-50 text-[#1EAD16] border border-[#1EAD16] px-4 py-2 rounded-full hover:bg-[#1EAD16] hover:text-white transition-all shadow-sm font-bold"
    >
      {isHindi ? 'Switch to English' : 'हिन्दी में पढ़ें'}
    </button>
  );
}