import React, { useState } from 'react';
import { ArrowLeft, Check, RefreshCw, Leaf, BrainCircuit, Sparkles, User, Palette, AlertCircle } from 'lucide-react';

export default function Results({ goBackToQuiz, goBackToHome }) {
    const [selectedOutfit, setSelectedOutfit] = useState(null);

    // الأطقم الآن تحتوي على (wearCount) لنحاكي عدد مرات اللبس الحقيقية من الخزانة
    const generatedOutfits = [
        {
            id: 1,
            styleName: "The Professional Vibe",
            psychology: "Dark navy and crisp white for strong confidence.",
            mannequinStyle: {
                top: { name: 'White Button-down Shirt', category: 'TOP', wearCount: 15, image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&q=80' },
                bottom: { name: 'High-waisted Black Trousers', category: 'BOTTOM', wearCount: 8, image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80' },
                layer: { name: 'Structured Navy Blazer', category: 'LAYER', wearCount: 1, image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80' } // قطعة مهملة
            }
        },
        {
            id: 2,
            styleName: "Creative Spark Vibe",
            psychology: "Contrast of colors to spark new ideas.",
            mannequinStyle: {
                top: { name: 'Light Blue Cotton Shirt', category: 'TOP', wearCount: 2, image: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=500&q=80' }, // قطعة مهملة
                bottom: { name: 'Earthy Olive Chinos', category: 'BOTTOM', wearCount: 12, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80' },
                layer: { name: 'Soft Beige Cardigan', category: 'LAYER', wearCount: 20, image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80' }
            }
        },
        {
            id: 3,
            styleName: "Chill & Cozy Vibe",
            psychology: "Soft, relaxed fits for deep comfort.",
            mannequinStyle: {
                top: { name: 'Simple Grey Tee', category: 'TOP', wearCount: 30, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80' },
                bottom: { name: 'Classic Blue Chinos', category: 'BOTTOM', wearCount: 0, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80' }, // قطعة جديدة لم تلبس
                layer: { name: 'Relaxed Denim Jacket', category: 'LAYER', wearCount: 5, image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=500&q=80' }
            }
        }
    ];

    // دالة ذكية تستخرج القطعة الأقل استخداماً من الطقم المختار
    const getLeastWornItem = (outfit) => {
        if (!outfit) return null;
        const items = [outfit.mannequinStyle.top, outfit.mannequinStyle.bottom, outfit.mannequinStyle.layer];
        return items.reduce((prev, curr) => prev.wearCount < curr.wearCount ? prev : curr);
    };

    const leastWorn = getLeastWornItem(selectedOutfit);

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-gray-800 font-sans p-6 relative pb-20">
            <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-[#EAE4D8] to-transparent -z-10"></div>

            <div className="max-w-6xl mx-auto pt-10">
                <button onClick={selectedOutfit ? () => setSelectedOutfit(null) : goBackToQuiz} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors">
                    <ArrowLeft size={20} /> {selectedOutfit ? "Back to Options" : "Back to Quiz"}
                </button>

                {/* ========================================== */}
                {/* المرحلة الأولى: عرض 3 خيارات للمستخدمة */}
                {/* ========================================== */}
                {!selectedOutfit && (
                    <div className="animate-fade-in">
                        <div className="text-center mb-12 relative">
                            <Palette size={40} className="text-[#8B7355] absolute -top-10 left-1/2 -translate-x-1/2 opacity-20" />
                            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">Choose Your Vibe</h1>
                            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                                Based on your psychological profile, we curated these 3 combinations. We also prioritized items you haven't worn in a while!
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {generatedOutfits.map((outfit) => {
                                const outfitLeastWorn = getLeastWornItem(outfit);
                                return (
                                    <div key={outfit.id} onClick={() => setSelectedOutfit(outfit)} className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl border-2 border-transparent hover:border-[#8B7355] cursor-pointer transition-all transform hover:-translate-y-2 flex flex-col h-full group relative overflow-hidden">

                                        {/* علامة الاستدامة للملابس المهملة */}
                                        <div className="absolute top-4 right-4 bg-green-100 text-green-800 text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                                            <Leaf size={12} /> Rescued Item Included!
                                        </div>

                                        <h3 className="text-2xl font-medium text-gray-900 mb-2 mt-4 text-center group-hover:text-[#8B7355] transition-colors">{outfit.styleName}</h3>
                                        <p className="text-sm text-gray-500 text-center mb-6 line-clamp-2">{outfit.psychology}</p>

                                        <div className="flex-grow flex flex-col gap-3">
                                            <div className="flex gap-2 h-24">
                                                <img src={outfit.mannequinStyle.layer.image} className="w-1/3 object-cover rounded-xl bg-gray-50 mix-blend-multiply" alt="Layer" />
                                                <img src={outfit.mannequinStyle.top.image} className="w-1/3 object-cover rounded-xl bg-gray-50 mix-blend-multiply" alt="Top" />
                                                <img src={outfit.mannequinStyle.bottom.image} className="w-1/3 object-cover rounded-xl bg-gray-50 mix-blend-multiply" alt="Bottom" />
                                            </div>
                                        </div>

                                        <button className="mt-6 w-full py-3 rounded-xl bg-gray-50 text-gray-700 font-medium group-hover:bg-[#8B7355] group-hover:text-white transition-colors">
                                            Select This Outfit
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* ========================================== */}
                {/* المرحلة الثانية: عرض الطقم المختار على المجسم */}
                {/* ========================================== */}
                {selectedOutfit && (
                    <div className="animate-fade-in">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-4 text-[#8B7355]">
                                <Sparkles size={28} />
                            </div>
                            <h1 className="text-4xl font-light text-gray-900 mb-2">{selectedOutfit.styleName}</h1>
                            <p className="text-gray-500 text-lg">Your selected outfit on the virtual mannequin.</p>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center mb-16">

                            {/* المجسم (Mannequin) */}
                            <div className="w-full lg:w-1/3 flex justify-center">
                                <div className="relative w-72 h-[500px] bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center p-6 overflow-hidden relative group">
                                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-5 z-0 flex justify-center">
                                        <User size={400} />
                                    </div>

                                    <div className="relative z-10 flex flex-col items-center h-full w-full gap-2">
                                        <div className="w-full h-2/5 relative transform group-hover:scale-105 transition-transform">
                                            <span className="absolute top-2 left-2 bg-white/80 backdrop-blur text-[10px] px-2 py-1 rounded-full font-bold text-gray-600 z-20">LAYER</span>
                                            {/* إظهار علامة تحذير إذا كانت هذه هي القطعة الأقل استخداماً */}
                                            {selectedOutfit.mannequinStyle.layer.name === leastWorn?.name && (
                                                <span className="absolute bottom-2 right-2 bg-green-500 text-white p-1.5 rounded-full z-20 shadow-md" title="Least Worn Item"><Leaf size={14} /></span>
                                            )}
                                            <img src={selectedOutfit.mannequinStyle.layer.image} className="w-full h-full object-cover rounded-2xl shadow-sm mix-blend-multiply" alt="Layer" />
                                        </div>

                                        <div className="w-full h-1/5 relative px-8 -mt-8 z-10 transform group-hover:-translate-y-2 transition-transform">
                                            {selectedOutfit.mannequinStyle.top.name === leastWorn?.name && (
                                                <span className="absolute -top-2 -right-2 bg-green-500 text-white p-1.5 rounded-full z-20 shadow-md" title="Least Worn Item"><Leaf size={14} /></span>
                                            )}
                                            <img src={selectedOutfit.mannequinStyle.top.image} className="w-full h-full object-cover rounded-xl shadow-md border-2 border-white mix-blend-multiply" alt="Top" />
                                        </div>

                                        <div className="w-full h-2/5 relative transform group-hover:scale-105 transition-transform delay-100">
                                            <span className="absolute bottom-2 left-2 bg-white/80 backdrop-blur text-[10px] px-2 py-1 rounded-full font-bold text-gray-600 z-20">BOTTOM</span>
                                            {selectedOutfit.mannequinStyle.bottom.name === leastWorn?.name && (
                                                <span className="absolute top-2 right-2 bg-green-500 text-white p-1.5 rounded-full z-20 shadow-md" title="Least Worn Item"><Leaf size={14} /></span>
                                            )}
                                            <img src={selectedOutfit.mannequinStyle.bottom.image} className="w-full h-full object-cover rounded-2xl shadow-sm mix-blend-multiply" alt="Bottom" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* تفاصيل التحليل والأزرار */}
                            <div className="w-full lg:w-1/2 flex flex-col gap-6">
                                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-10"></div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <BrainCircuit className="text-[#8B7355]" size={26} />
                                        <h3 className="text-xl font-semibold text-gray-900">Psychological Insight</h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {selectedOutfit.psychology} This combination targets your specific mood today while keeping you comfortable and confident.
                                    </p>
                                </div>

                                {/* قسم الاستدامة والملابس الأقل استخداماً */}
                                <div className="bg-[#8B7355] text-white p-8 rounded-3xl shadow-md relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -z-10"></div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <Leaf className="text-green-300" size={26} />
                                        <h3 className="text-xl font-semibold">Eco-Impact Tracker</h3>
                                    </div>

                                    {/* رسالة الذكاء الاصطناعي التي تبرز القطعة المهملة */}
                                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 mb-4">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="text-yellow-300 mt-1 flex-shrink-0" size={20} />
                                            <p className="text-white/95 leading-relaxed">
                                                We noticed your <strong>{leastWorn?.name}</strong> has only been worn <strong>{leastWorn?.wearCount} times</strong>!
                                                By prioritizing your least-used clothes in this outfit, you are actively reducing fashion waste.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="bg-black/20 rounded-xl p-4 flex justify-between items-center font-medium">
                                        <span>Sustainability Score:</span>
                                        <span className="text-green-300">+1 Wear Added</span>
                                    </div>
                                </div>

                                <button onClick={goBackToHome} className="mt-4 bg-gray-900 hover:bg-black text-white px-8 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-2xl text-lg font-medium w-full">
                                    <Check size={24} /> Wear This Outfit Today
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}} />
        </div>
    );
}