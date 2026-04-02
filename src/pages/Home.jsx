import React from 'react';
import { BrainCircuit, Leaf, Sparkles, ArrowRight, ScanSearch, Wand2, Layers3, Smartphone } from 'lucide-react';

export default function Home({ goToLogin }) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-gray-800 font-sans p-6 relative overflow-hidden flex flex-col justify-center items-center">
      
      {/* تأثيرات خلفية ديناميكية */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#EAE4D8]/50 to-transparent -z-10 animate-fade-in-slow"></div>

      <div className="max-w-7xl mx-auto w-full pt-16 pb-24 text-center animate-fade-in flex flex-col items-center">
        
        {/* Hero Section: Centered & Sophisticated */}
        <h1 className="text-7xl md:text-9xl font-light text-gray-900 tracking-widest mb-4">EVA STYLE</h1>
        <p className="text-3xl font-light text-[#8C7C66] mb-12 px-4">smart fashion with ai emotions ✨</p>
        
        <p className="text-xl font-light text-gray-700 mb-12 max-w-2xl">
          Eva Style revolutionizes how you dress by blending AI psychological analysis with sustainable fashion. We analyze your emotions to curate the perfect outfit from your existing wardrobe.
        </p>

        {/* ========================================== */}
        {/* Dazzling Mosaic (Bento Grid) Section: "Filled" with content */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 w-full max-w-6xl mb-20 text-left px-4">
          
          {/* Box 1: AI Mood Analysis (Big & Rich) */}
          <div className="md:col-span-2 md:row-span-2 bg-white p-10 rounded-3xl shadow-lg border border-gray-100 flex flex-col justify-between group overflow-hidden relative transform hover:scale-105 transition-all duration-500">
            <img src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&q=80" alt="Mood AI" className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 mix-blend-multiply transition-opacity" />
            <div className="relative z-10 space-y-4">
                <div className="bg-gray-50 p-4 rounded-2xl inline-block border border-gray-100 relative">
                    <BrainCircuit size={32} className="text-[#8B7355] animate-pulse" />
                </div>
                <h3 className="text-3xl font-semibold mb-2 text-gray-900">Psychological Outfit Curation 🧠</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  We don't just dress your body; we dress your mind. Our AI analyzes your emotional state, cognitive focus, and energy levels to suggest an outfit that enhances your well-being and confidence. 
                </p>
            </div>
          </div>

          {/* Box 2: Digital Wardrobe (Image Rich) */}
          <div className="bg-[#1A202C] text-white p-8 rounded-3xl shadow-lg relative group overflow-hidden transform hover:scale-105 transition-all duration-500">
              <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80" alt="Clothes flat lay" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay group-hover:scale-110 transition-transform" />
              <div className="relative z-10">
                <Smartphone size={28} className="text-[#D2C4B3] mb-4" />
                <h4 className="text-xl font-medium mb-1">Your Digital Closet 📱</h4>
                <p className="text-gray-400 text-xs">AI categorizes and manages every item you own.</p>
              </div>
          </div>

          {/* Box 3: AI Classification */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative group overflow-hidden transform hover:scale-105 transition-all duration-500">
              <ScanSearch size={28} className="text-[#8B7355] mb-4 animate-pulse" />
              <h4 className="text-xl font-medium mb-1 text-gray-900">Instant AI Detection 🤖</h4>
              <p className="text-gray-600 text-xs">Snap a photo; Eva instantly recognizes and tags the garment.</p>
          </div>

          {/* Box 4: Sustainability (Dazzling Emerald) */}
          <div className="md:col-span-2 bg-[#065F46] text-white p-10 rounded-3xl shadow-xl relative overflow-hidden group transform hover:scale-105 transition-all duration-500">
             <img src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&q=80" alt="Green texture" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay group-hover:scale-110 transition-transform" />
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full z-0"></div>
             <div className="relative z-10 space-y-3">
                <Leaf size={32} className="text-green-300 animate-spin-slow" />
                <h3 className="text-2xl font-semibold mb-2">Fashion Circular Economy 🌱</h3>
                <p className="text-green-50 text-sm leading-relaxed max-w-md">
                   Reduce waste by loving what you already own. Eva tracks item wear count and prioritizes least-worn pieces, extending garment lifespan. 🔄
                </p>
             </div>
          </div>
        </div>

        {/* 4. Sophisticated Call to Action Section */}
        <p className="text-xl font-light text-gray-700 mb-8 px-6">Ready to discover your emotion-led, sustainable style?</p>
        
        {/* الزر النهائي: تطبيق تجريبي (تصميم Login الأصلي) */}
        <button 
          onClick={goToLogin} 
          className="bg-[#D2C4B3] hover:bg-[#8C7C66] text-gray-900 px-12 py-5 rounded-2xl flex items-center gap-3 transition-all shadow-xl hover:shadow-2xl text-lg font-medium group"
        >
          Access Your Digital Closet <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

       <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInSlow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }
        .animate-fade-in-slow {
          animation: fadeInSlow 1.5s ease-in-out;
        }
        .animate-spin-slow {
          animation: spinSlow 12s linear infinite;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}} />
    </div>
  );
}