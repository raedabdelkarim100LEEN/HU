import React, { useState } from 'react';
import { Plus, ArrowRight, ArrowLeft, UploadCloud, X, ScanSearch, Trash2, LogOut, UserCircle, Heart } from 'lucide-react';
import { analyzeAndAddItem } from '../core/wardrobDB';

// خوارزمية الرؤية الحاسوبية لتحليل بيكسلات الألوان
const colorMap = [
  { name: 'Black', r: 0, g: 0, b: 0 }, { name: 'White', r: 255, g: 255, b: 255 }, { name: 'Grey', r: 128, g: 128, b: 128 },
  { name: 'Red', r: 200, g: 0, b: 0 }, { name: 'Green', r: 0, g: 128, b: 0 }, { name: 'Blue', r: 0, g: 0, b: 200 },
  { name: 'Yellow', r: 255, g: 255, b: 0 }, { name: 'Brown', r: 139, g: 69, b: 19 }, { name: 'Navy', r: 0, g: 0, b: 128 },
  { name: 'Pink', r: 255, g: 192, b: 203 }, { name: 'Orange', r: 255, g: 165, b: 0 }, { name: 'Beige', r: 245, g: 245, b: 220 },
  { name: 'Light Blue', r: 173, g: 216, b: 230 }
];

const getClosestColorName = (r, g, b) => {
  let minDistance = Infinity; let closestColor = 'Unknown';
  for (let c of colorMap) {
    const distance = Math.sqrt(Math.pow(c.r - r, 2) + Math.pow(c.g - g, 2) + Math.pow(c.b - b, 2));
    if (distance < minDistance) { minDistance = distance; closestColor = c.name; }
  }
  return closestColor;
};

const extractDominantColor = (imgUrl) => {
  return new Promise((resolve) => {
    const img = new Image(); img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
      canvas.width = img.width; canvas.height = img.height; ctx.drawImage(img, 0, 0);
      const boxSizeX = Math.floor(img.width * 0.3); const boxSizeY = Math.floor(img.height * 0.3);
      const startX = Math.floor((img.width - boxSizeX) / 2); const startY = Math.floor((img.height - boxSizeY) / 2);
      const imageData = ctx.getImageData(startX, startY, boxSizeX, boxSizeY); const data = imageData.data;
      let r = 0, g = 0, b = 0; const count = data.length / 4;
      for (let i = 0; i < data.length; i += 4) { r += data[i]; g += data[i + 1]; b += data[i + 2]; }
      resolve(getClosestColorName(r / count, g / count, b / count));
    };
    img.src = imgUrl;
  });
};

export default function Wardrobe({ clothes, setClothes, savedOutfits, setSavedOutfits, goToQuiz, goBackToHome, currentUser, onLogout }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 🌟 تبويبات لتنظيم الخزانة (عناصر / إطلالات محفوظة) 🌟
  const [activeTab, setActiveTab] = useState('items'); // 'items' or 'looks'

  const deleteItem = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      setClothes(prev => prev.filter(item => item.id !== id));
    }
  };

  const deleteSavedOutfit = (id) => {
    if (window.confirm("Remove this saved look?")) {
      setSavedOutfits(prev => prev.filter(outfit => outfit.id !== id));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]; setSelectedImage(file); setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault(); if (!selectedImage) return;
    setIsAnalyzing(true);
    try {
      const detectedColor = await extractDominantColor(previewUrl);
      const customSetClothes = (action) => {
        setClothes(prev => {
          const newState = typeof action === 'function' ? action(prev) : action;
          if (newState.length > prev.length) {
            const newItemIndex = newState.findIndex(n => !prev.some(p => p.id === n.id));
            if (newItemIndex !== -1) {
              const newItem = { ...newState[newItemIndex] };
              if (newItem.name.includes('AI Detected:')) { newItem.name = newItem.name.replace('AI Detected:', `AI Detected: ${detectedColor}`); }
              else { newItem.name = `${detectedColor} ${newItem.name}`; }
              newItem.color = detectedColor;
              const updatedState = [...newState]; updatedState[newItemIndex] = newItem; return updatedState;
            }
          }
          return newState;
        });
      };
      const reader = new FileReader(); reader.readAsDataURL(selectedImage);
      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1];
        await analyzeAndAddItem(base64Image, clothes, customSetClothes);
        setIsAnalyzing(false); setIsModalOpen(false); setSelectedImage(null); setPreviewUrl(null);
      };
    } catch (error) { console.error("Error:", error); setIsAnalyzing(false); }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-gray-800 font-sans p-6 relative">
      <div className="max-w-6xl mx-auto pt-10 animate-fade-in">

        {/* الشريط العلوي */}
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

        <div className="flex justify-between items-end mb-8 mt-6">
          <div>
            <h2 className="text-4xl font-light text-gray-900 mb-2">Your Digital Closet 📱</h2>
            <p className="text-gray-500 text-lg">Manage your clothes and organize your sustainable style.</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-[#D2C4B3] hover:bg-[#8C7C66] text-gray-900 px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg font-medium">
            <Plus size={18} /> Add New Item
          </button>
        </div>

        {/* أزرار التبديل (Tabs) */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('items')}
            className={`px-8 py-3 rounded-full font-medium transition-all shadow-sm ${activeTab === 'items' ? 'bg-[#2D2D2D] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            My Wardrobe Items
          </button>
          <button
            onClick={() => setActiveTab('looks')}
            className={`px-8 py-3 rounded-full font-medium flex items-center gap-2 transition-all shadow-sm ${activeTab === 'looks' ? 'bg-[#2D2D2D] text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            Saved Looks <Heart size={18} className={activeTab === 'looks' ? 'text-red-400 fill-current' : 'text-gray-400'} />
          </button>
        </div>

        {/* عرض المحتوى حسب التبويب */}
        {activeTab === 'items' ? (
          /* عرض الملابس الفردية */
          clothes.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <p className="text-gray-500 text-lg">Your closet is empty! Start by adding your favorite items.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {clothes.map((item) => (
                <div key={item.id} className="group bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center hover:shadow-xl transition-all relative transform hover:-translate-y-1">
                  <button onClick={() => deleteItem(item.id)} className="absolute top-3 left-3 p-2 bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white z-10 shadow-sm"><Trash2 size={14} /></button>
                  <div className="w-full aspect-square bg-[#FAF9F6] rounded-2xl mb-4 flex items-center justify-center p-4 overflow-hidden relative">
                    <img src={item.imageUrl} alt={item.name} className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                  </div>
                  <span className="text-xs font-bold text-[#8B7355] uppercase tracking-wider mb-1 bg-[#8B7355]/10 px-3 py-1 rounded-full">{item.category}</span>
                  <span className="text-sm font-medium text-center text-gray-800 mb-2 line-clamp-1">{item.name}</span>
                </div>
              ))}
            </div>
          )
        ) : (
          /* عرض الأطقم المحفوظة */
          savedOutfits.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <Heart size={40} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">You haven't saved any outfits yet.<br />Take the Mood Quiz to generate and save your first look!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {savedOutfits.map((outfit) => (
                <div key={outfit.id} className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 relative">
                  <button onClick={() => deleteSavedOutfit(outfit.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#E8F5E9] text-[#2E7D32] px-3 py-1 rounded-full text-xs font-bold border border-[#C8E6C9]">{outfit.matchScore}% Synergy</span>
                    <span className="text-gray-400 text-xs">{outfit.date}</span>
                  </div>
                  <div className="flex gap-2 h-40 bg-gray-50 rounded-2xl overflow-hidden mb-4 p-2 border border-gray-100">
                    <div className="flex-1 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                      {outfit.top ? <img src={outfit.top.imageUrl || outfit.top.image} alt="Top" className="max-h-full object-contain mix-blend-multiply" /> : <span className="text-2xl opacity-50">👕</span>}
                    </div>
                    <div className="flex-1 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                      {outfit.bottom ? <img src={outfit.bottom.imageUrl || outfit.bottom.image} alt="Bottom" className="max-h-full object-contain mix-blend-multiply" /> : <span className="text-2xl opacity-50">👖</span>}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Curated for a <b>{outfit.occasion}</b> ({outfit.weather}).</p>
                </div>
              ))}
            </div>
          )
        )}

        <div className="flex justify-center border-t border-gray-200 pt-8 pb-10">
          <button disabled={clothes.length === 0} onClick={goToQuiz} className="bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-2xl flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg font-medium group disabled:opacity-50 disabled:cursor-not-allowed">
            Start EVA AI Styling <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* المودال */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#FAF9F6]/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 relative shadow-2xl border border-gray-100">
            <button onClick={() => { setIsModalOpen(false); setSelectedImage(null); setPreviewUrl(null); }} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 transition-colors bg-gray-50 p-2 rounded-full">
              <X size={20} />
            </button>
            <h3 className="text-2xl font-semibold mb-2 text-center text-gray-900">Add to Wardrobe</h3>
            <p className="text-gray-500 mb-8 text-center text-sm">Eva AI will auto-detect category & color.</p>
            <form onSubmit={handleImageUpload}>
              {!previewUrl ? (
                <label className="border-2 border-dashed border-gray-200 hover:border-[#8B7355] bg-gray-50 rounded-3xl h-48 flex flex-col items-center justify-center cursor-pointer transition-all mb-6 group hover:bg-[#8B7355]/5">
                  <div className="bg-white p-4 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform"><UploadCloud size={28} className="text-[#8B7355]" /></div>
                  <span className="text-gray-600 font-medium text-sm">Upload Image</span>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              ) : (
                <div className="relative h-48 mb-6 rounded-3xl overflow-hidden border border-gray-100 bg-gray-50 flex justify-center p-2">
                  <img src={previewUrl} alt="Preview" className="h-full object-contain mix-blend-multiply rounded-2xl" />
                  <button type="button" onClick={() => { setPreviewUrl(null); setSelectedImage(null) }} className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full text-red-500 shadow-sm hover:bg-red-50 transition-colors"><X size={16} /></button>
                </div>
              )}
              <button type="submit" disabled={isAnalyzing || !selectedImage} className="w-full bg-[#8B7355] hover:bg-[#735F46] text-white py-4 rounded-2xl font-medium flex justify-center items-center gap-2 disabled:opacity-70 transition-colors shadow-md">
                {isAnalyzing ? <><ScanSearch size={20} className="animate-pulse" /> Scanning Shape & Color...</> : "Add with Eva AI ✨"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}