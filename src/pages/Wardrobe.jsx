import React, { useState } from 'react';
import { Plus, ArrowRight, ArrowLeft, UploadCloud, X, ScanSearch, Trash2, LogOut, UserCircle } from 'lucide-react';
import { analyzeAndAddItem } from '../core/wardrobDB';

// 👈 استقبلنا هنا currentUser و onLogout
export default function Wardrobe({ clothes, setClothes, goToQuiz, goBackToHome, currentUser, onLogout }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const deleteItem = (id) => {
    if (window.confirm("Are you sure you want to remove this item from Eva Style?")) {
      setClothes(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);
      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1];
        await analyzeAndAddItem(base64Image, clothes, setClothes);
        setIsAnalyzing(false);
        setIsModalOpen(false);
        setSelectedImage(null);
        setPreviewUrl(null);
      };
    } catch (error) {
      console.error("Error:", error);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-gray-800 font-sans p-6 relative">
      <div className="max-w-6xl mx-auto pt-10 animate-fade-in">

        {/* الشريط العلوي الجديد: الرجوع + تسجيل الخروج */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 pb-4">
          <button onClick={goBackToHome} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
            <ArrowLeft size={20} /> Back to Home
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <UserCircle size={18} className="text-[#8B7355]" />
              <span className="font-medium hidden md:inline-block">{currentUser}</span>
            </div>
            <button onClick={onLogout} className="flex items-center gap-2 text-red-500 hover:text-white hover:bg-red-500 px-4 py-2 rounded-full transition-all text-sm font-medium">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        <div className="flex justify-between items-end mb-10 mt-6">
          <div>
            <h2 className="text-4xl font-light text-gray-900 mb-2">Your Digital Closet 📱</h2>
            <p className="text-gray-500 text-lg">Manage your clothes and organize your sustainable style.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-[#D2C4B3] hover:bg-[#8C7C66] text-gray-900 px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg font-medium">
            <Plus size={18} /> Add New Item
          </button>
        </div>

        {/* عرض الملابس */}
        {clothes.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">Your closet is empty! Start by adding your favorite items.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {clothes.map((item) => (
              <div key={item.id} className="group bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-xl transition-all relative transform hover:-translate-y-1">
                <button onClick={() => deleteItem(item.id)} className="absolute top-3 left-3 p-2 bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white z-10 shadow-sm" title="Delete Item">
                  <Trash2 size={14} />
                </button>
                <div className="w-full aspect-square bg-[#FAF9F6] rounded-2xl mb-4 flex items-center justify-center p-4 overflow-hidden relative">
                  <img src={item.imageUrl} alt={item.name} className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                </div>
                <span className="text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-1 bg-[#8B7355]/10 px-3 py-1 rounded-full">{item.category}</span>
                <span className="text-sm font-medium text-center text-gray-800 mb-2 line-clamp-1">{item.name}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center border-t border-gray-200 pt-8 pb-10">
          <button disabled={clothes.length === 0} onClick={goToQuiz} className="bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-2xl flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg font-medium group disabled:opacity-50 disabled:cursor-not-allowed">
            Continue to Mood Quiz <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* مودال الإضافة يبقى كما هو */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#FAF9F6]/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 relative shadow-2xl border border-gray-100">
            <button onClick={() => { setIsModalOpen(false); setSelectedImage(null); setPreviewUrl(null); }} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors bg-gray-50 p-2 rounded-full">
              <X size={20} />
            </button>
            <h3 className="text-2xl font-semibold mb-2 text-center text-gray-900">Add to Wardrobe</h3>
            <p className="text-gray-500 mb-8 text-center text-sm">Eva AI will auto-detect the category.</p>

            <form onSubmit={handleImageUpload}>
              {!previewUrl ? (
                <label className="border-2 border-dashed border-gray-200 hover:border-[#8B7355] bg-gray-50 rounded-3xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all mb-6 group hover:bg-[#8B7355]/5">
                  <div className="bg-white p-4 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud size={28} className="text-[#8B7355]" />
                  </div>
                  <span className="text-gray-600 font-medium text-sm">Upload Image</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              ) : (
                <div className="relative h-48 mb-6 rounded-3xl overflow-hidden border border-gray-100 bg-gray-50 flex justify-center p-2">
                  <img src={previewUrl} alt="Preview" className="h-full object-contain mix-blend-multiply rounded-2xl" />
                  <button type="button" onClick={() => { setPreviewUrl(null); setSelectedImage(null) }} className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full text-red-500 shadow-sm hover:bg-red-50 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              )}
              <button type="submit" disabled={isAnalyzing || !selectedImage} className="w-full bg-[#8B7355] hover:bg-[#735F46] text-white py-4 rounded-2xl font-medium flex justify-center items-center gap-2 disabled:opacity-70 transition-colors shadow-md">
                {isAnalyzing ? <><ScanSearch size={20} className="animate-pulse" /> AI is Analyzing...</> : "Add with Eva AI ✨"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}