import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sun, CloudRain, Wind, Briefcase, Coffee, BrainCircuit, Sparkles, Wand2, Star } from 'lucide-react';

// أضفنا الأمر goToResults هنا
export default function Quiz({ goBackToWardrobe, goToResults }) {
    const [step, setStep] = useState(1);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const [answers, setAnswers] = useState({
        weather: '', occasion: '',
        colorVibe: '', colorPop: '', colorContrast: '',
        currentMood: '', socialVibe: '', comfortLevel: ''
    });

    const handleSelect = (key, value) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
    };

    const startAnalysis = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            goToResults(); // هذا الأمر سينقلك فوراً لصفحة النتائج بعد التحميل!
        }, 3800);
    };

    const getProgress = () => {
        if (step === 1) return '33%';
        if (step === 2) return '66%';
        return '100%';
    };

    return (
        <div className="min-h-screen bg-[#FAF9F6] text-gray-800 font-sans flex flex-col relative overflow-hidden pb-12">
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#F2EFE9] to-transparent -z-10"></div>

            <div className="max-w-3xl mx-auto w-full pt-12 px-6 flex-grow flex flex-col">

                <button onClick={step === 1 ? goBackToWardrobe : () => setStep(step - 1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-8 transition-colors w-fit">
                    <ArrowLeft size={20} /> {step === 1 ? "Back to Wardrobe" : "Previous Step"}
                </button>

                <div className="w-full bg-gray-200 h-2 rounded-full mb-12 overflow-hidden flex relative">
                    <div className="bg-[#8B7355] h-full transition-all duration-700 ease-out" style={{ width: getProgress() }}></div>
                    <span className="absolute right-3 -top-6 text-xs font-semibold text-[#8B7355]">Step {step} of 3</span>
                </div>

                {step === 1 && (
                    <div className="animate-fade-in flex-grow">
                        <h2 className="text-3xl font-light text-gray-900 mb-2">Daily Check-in 🏡</h2>
                        <p className="text-gray-500 mb-10">Let's set the baseline for your day.</p>

                        <div className="space-y-10">
                            <div>
                                <h3 className="text-lg font-medium mb-5">1. What is the weather like?</h3>
                                <div className="grid grid-cols-3 gap-5">
                                    {[
                                        { id: 'hot', icon: Sun, label: 'Sunny / Hot' },
                                        { id: 'mild', icon: Wind, label: 'Mild / Breezy' },
                                        { id: 'cold', icon: CloudRain, label: 'Cold / Rainy' }
                                    ].map(opt => (
                                        <button key={opt.id} onClick={() => handleSelect('weather', opt.id)} className={`flex flex-col items-center justify-center p-7 rounded-3xl border-2 transition-all shadow-sm hover:shadow-md ${answers.weather === opt.id ? 'border-[#8B7355] bg-[#8B7355]/5 scale-105' : 'border-gray-100 bg-white'}`}>
                                            <opt.icon size={36} className={`mb-4 ${answers.weather === opt.id ? 'text-[#8B7355]' : 'text-gray-300'}`} />
                                            <span className={`text-sm font-semibold text-center ${answers.weather === opt.id ? 'text-[#8B7355]' : 'text-gray-600'}`}>{opt.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-medium mb-5">2. Where are you heading today?</h3>
                                <div className="grid grid-cols-3 gap-5">
                                    {[
                                        { id: 'work', icon: Briefcase, label: 'Work / Uni', desc: 'Formal' },
                                        { id: 'casual', icon: Coffee, label: 'Casual Outing', desc: 'Relaxed' },
                                        { id: 'special', icon: Star, label: 'Special Event', desc: 'Dress up!' }
                                    ].map(opt => (
                                        <button key={opt.id} onClick={() => handleSelect('occasion', opt.id)} className={`flex flex-col items-center p-6 rounded-3xl border-2 transition-all text-center shadow-sm hover:shadow-md ${answers.occasion === opt.id ? 'border-[#8B7355] bg-[#8B7355]/5 scale-105' : 'border-gray-100 bg-white'}`}>
                                            <opt.icon size={28} className={`mb-3 ${answers.occasion === opt.id ? 'text-[#8B7355]' : 'text-gray-300'}`} />
                                            <span className={`font-semibold text-sm mb-1 ${answers.occasion === opt.id ? 'text-[#8B7355]' : 'text-gray-800'}`}>{opt.label}</span>
                                            <span className="text-xs text-gray-500">{opt.desc}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 flex justify-end pb-10">
                            <button disabled={!answers.weather || !answers.occasion} onClick={() => setStep(2)} className="bg-[#8B7355] hover:bg-[#735F46] text-white px-10 py-4 rounded-full flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-lg">
                                Next <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="animate-fade-in flex-grow">
                        <h2 className="text-3xl font-light text-gray-900 mb-2">Color Vibe 🎨</h2>
                        <p className="text-gray-500 mb-10">Find your perfect color match for today.</p>

                        <div className="space-y-6">
                            <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100">
                                <h3 className="text-md font-medium text-gray-800 mb-5">1. Choose your color temperature:</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <button onClick={() => handleSelect('colorVibe', 'warm')} className={`py-4 rounded-2xl border-2 text-md transition-all ${answers.colorVibe === 'warm' ? 'bg-orange-50 text-orange-700 border-orange-300 scale-105' : 'bg-gray-50 text-gray-600 hover:bg-orange-50 border-gray-100'}`}>☀️ Warm</button>
                                    <button onClick={() => handleSelect('colorVibe', 'cool')} className={`py-4 rounded-2xl border-2 text-md transition-all ${answers.colorVibe === 'cool' ? 'bg-blue-50 text-blue-700 border-blue-300 scale-105' : 'bg-gray-50 text-gray-600 hover:bg-blue-50 border-gray-100'}`}>❄️ Cool</button>
                                    <button onClick={() => handleSelect('colorVibe', 'neutral')} className={`py-4 rounded-2xl border-2 text-md transition-all ${answers.colorVibe === 'neutral' ? 'bg-stone-100 text-stone-700 border-stone-300 scale-105' : 'bg-gray-50 text-gray-600 hover:bg-stone-100 border-gray-100'}`}>🤎 Neutral</button>
                                </div>
                            </div>

                            <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100">
                                <h3 className="text-md font-medium text-gray-800 mb-5">2. Do you want your colors soft or strong?</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <button onClick={() => handleSelect('colorPop', 'soft')} className={`py-4 rounded-2xl border-2 text-md transition-all ${answers.colorPop === 'soft' ? 'bg-gray-100 text-gray-700 border-gray-300 scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-100'}`}>☁️ Soft</button>
                                    <button onClick={() => handleSelect('colorPop', 'bold')} className={`py-4 rounded-2xl border-2 text-md transition-all ${answers.colorPop === 'bold' ? 'bg-gray-900 text-white border-gray-900 scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-200 border-gray-100'}`}>🔥 Bold</button>
                                    <button onClick={() => handleSelect('colorPop', 'balanced')} className={`py-4 rounded-2xl border-2 text-md transition-all ${answers.colorPop === 'balanced' ? 'bg-[#8B7355] text-white border-[#8B7355] scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-100'}`}>⚖️ Balanced</button>
                                </div>
                            </div>

                            <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100">
                                <h3 className="text-md font-medium text-gray-800 mb-5">3. How do you want to blend your outfit?</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <button onClick={() => handleSelect('colorContrast', 'blend')} className={`py-4 rounded-2xl border-2 text-md transition-all ${answers.colorContrast === 'blend' ? 'bg-[#8B7355] text-white border-[#8B7355] scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-100'}`}>🔗 Same Colors</button>
                                    <button onClick={() => handleSelect('colorContrast', 'contrast')} className={`py-4 rounded-2xl border-2 text-md transition-all ${answers.colorContrast === 'contrast' ? 'bg-gradient-to-r from-gray-800 to-gray-400 text-white border-gray-800 scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-100'}`}>💥 High Contrast</button>
                                    <button onClick={() => handleSelect('colorContrast', 'pop')} className={`py-4 rounded-2xl border-2 text-md transition-all ${answers.colorContrast === 'pop' ? 'bg-purple-100 text-purple-700 border-purple-300 scale-105' : 'bg-gray-50 text-gray-600 hover:bg-purple-50 border-gray-100'}`}>🎨 Pop of Color</button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 flex justify-end pb-10">
                            <button disabled={!answers.colorVibe || !answers.colorPop || !answers.colorContrast} onClick={() => setStep(3)} className="bg-[#8B7355] hover:bg-[#735F46] text-white px-10 py-4 rounded-full flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-lg">
                                Next <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="animate-fade-in flex-grow">
                        <h2 className="text-3xl font-light text-gray-900 mb-2">Your Mood 🎭</h2>
                        <p className="text-gray-500 mb-10">Tell us how you feel right now!</p>

                        <div className="space-y-6">
                            <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100">
                                <h3 className="text-md font-medium text-gray-800 mb-5">1. How are you feeling today?</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <button onClick={() => handleSelect('currentMood', 'happy')} className={`py-5 rounded-2xl border-2 text-lg font-medium transition-all ${answers.currentMood === 'happy' ? 'bg-yellow-50 text-yellow-700 border-yellow-400 scale-105' : 'bg-gray-50 text-gray-600 hover:bg-yellow-50 border-gray-100'}`}>🌟 Happy</button>
                                    <button onClick={() => handleSelect('currentMood', 'chill')} className={`py-5 rounded-2xl border-2 text-lg font-medium transition-all ${answers.currentMood === 'chill' ? 'bg-blue-50 text-blue-700 border-blue-400 scale-105' : 'bg-gray-50 text-gray-600 hover:bg-blue-50 border-gray-100'}`}>🧘‍♀️ Chill</button>
                                    <button onClick={() => handleSelect('currentMood', 'tired')} className={`py-5 rounded-2xl border-2 text-lg font-medium transition-all ${answers.currentMood === 'tired' ? 'bg-stone-100 text-stone-700 border-stone-400 scale-105' : 'bg-gray-50 text-gray-600 hover:bg-stone-100 border-gray-100'}`}>🔋 Need Energy</button>
                                </div>
                            </div>

                            <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100">
                                <h3 className="text-md font-medium text-gray-800 mb-5">2. Who do you want to be today?</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <button onClick={() => handleSelect('socialVibe', 'boss')} className={`py-5 rounded-2xl border-2 text-lg font-medium transition-all ${answers.socialVibe === 'boss' ? 'bg-gray-900 text-white border-gray-900 scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-200 border-gray-100'}`}>👑 The Boss</button>
                                    <button onClick={() => handleSelect('socialVibe', 'creative')} className={`py-5 rounded-2xl border-2 text-lg font-medium transition-all ${answers.socialVibe === 'creative' ? 'bg-purple-50 text-purple-700 border-purple-400 scale-105' : 'bg-gray-50 text-gray-600 hover:bg-purple-50 border-gray-100'}`}>🦋 Creative</button>
                                    <button onClick={() => handleSelect('socialVibe', 'private')} className={`py-5 rounded-2xl border-2 text-lg font-medium transition-all ${answers.socialVibe === 'private' ? 'bg-[#8B7355] text-white border-[#8B7355] scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-200 border-gray-100'}`}>🕵️ Private</button>
                                </div>
                            </div>

                            <div className="bg-white p-7 rounded-3xl shadow-sm border border-gray-100">
                                <h3 className="text-md font-medium text-gray-800 mb-5">3. What does your body need?</h3>
                                <div className="grid grid-cols-3 gap-3">
                                    <button onClick={() => handleSelect('comfortLevel', 'cozy')} className={`py-5 rounded-2xl border-2 text-lg font-medium transition-all ${answers.comfortLevel === 'cozy' ? 'bg-[#F2EFE9] text-[#8B7355] border-[#8B7355] scale-105' : 'bg-gray-50 text-gray-600 hover:bg-[#F2EFE9] border-gray-100'}`}>🧸 Super Cozy</button>
                                    <button onClick={() => handleSelect('comfortLevel', 'sharp')} className={`py-5 rounded-2xl border-2 text-lg font-medium transition-all ${answers.comfortLevel === 'sharp' ? 'bg-slate-800 text-white border-slate-800 scale-105' : 'bg-gray-50 text-gray-600 hover:bg-slate-100 border-gray-100'}`}>✨ Sharp Style</button>
                                    <button onClick={() => handleSelect('comfortLevel', 'active')} className={`py-5 rounded-2xl border-2 text-lg font-medium transition-all ${answers.comfortLevel === 'active' ? 'bg-green-50 text-green-700 border-green-400 scale-105' : 'bg-gray-50 text-gray-600 hover:bg-green-50 border-gray-100'}`}>🏃‍♀️ Active</button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 flex justify-end pb-10">
                            <button disabled={!answers.currentMood || !answers.socialVibe || !answers.comfortLevel} onClick={startAnalysis} className="bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-full flex items-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-xl text-lg font-medium">
                                Generate AI Style <Wand2 size={20} className="animate-pulse" />
                            </button>
                        </div>
                    </div>
                )}

                {isAnalyzing && (
                    <div className="absolute inset-0 bg-[#FAF9F6]/95 backdrop-blur-sm flex flex-col items-center justify-center z-50 animate-fade-in p-6">
                        <div className="bg-white p-12 rounded-full shadow-lg mb-8 relative">
                            <BrainCircuit size={64} className="text-[#8B7355] animate-pulse" />
                            <Sparkles size={24} className="text-yellow-400 absolute top-10 right-10 animate-ping" />
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Reading Your Mood...</h2>
                        <p className="text-gray-500 mb-10 text-center max-w-md">Finding the perfect outfit to match your energy and colors today.</p>
                        <div className="w-72 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                            <div className="h-full bg-[#8B7355] animate-progress"></div>
                        </div>
                    </div>
                )}

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes progress {
          0% { width: 0%; }
          40% { width: 60%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 3.8s ease-in-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}} />
        </div>
    );
}