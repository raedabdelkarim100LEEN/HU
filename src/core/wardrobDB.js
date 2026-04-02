// src/core/wardrobeDB.js
import axios from 'axios';

// ⚠️ مفاتيح Roboflow الخاصة بكِ ⚠️
const ROBOFLOW_API_KEY = "Fc6ezD8TG9nkKlAzdfh5";
const ROBOFLOW_MODEL = "clothes-classification-2/1";

// قاعدة بيانات الملابس الافتراضية (Initial Mock Data)
export const userWardrobe = [
  { id: 1, name: 'White Linen Shirt', category: 'Top', color: 'White', wearCount: 15, imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&q=80' },
  { id: 2, name: 'Navy Blue Blazer', category: 'Layer', color: 'Navy', wearCount: 3, imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80' },
  { id: 3, name: 'Olive Green Chinos', category: 'Bottom', color: 'Olive', wearCount: 10, imageUrl: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80' },
  { id: 4, name: 'Grey Cashmere Sweater', category: 'Top', color: 'Grey', wearCount: 20, imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80' },
];

// دالة تحليل الصورة وإضافتها للخزانة (المستخدمة في Wardrobe.jsx)
export const analyzeAndAddItem = async (base64Image, clothes, setClothes) => {
  try {
    const response = await axios({
      method: "POST",
      url: `https://detect.roboflow.com/${ROBOFLOW_MODEL}?api_key=${ROBOFLOW_API_KEY}`,
      data: base64Image,
      headers: { "Content-Type": "application/x-form-urlencoded" }
    });

    const predictions = response.data.predictions;
    if (predictions && predictions.length > 0) {
      const detectedClass = predictions[0].class;
      
      let mappedCategory = "Top";
      if (detectedClass.toLowerCase().includes("pant")) mappedCategory = "Bottom";
      if (detectedClass.toLowerCase().includes("jacket")) mappedCategory = "Layer";

      const newItem = {
        id: Date.now(),
        name: `AI Detected: ${detectedClass}`,
        category: mappedCategory,
        color: "Neutral",
        wearCount: 0,
        imageUrl: `data:image/jpeg;base64,${base64Image}` // استخدام الصورة المرفوعة
      };

      setClothes(prev => [newItem, ...prev]);
      alert(`✨ Successfully added! AI detected [ ${detectedClass} ] and saved it to your closet.`);
    } else {
      alert("AI couldn't detect any clothes. Try another image.");
    }
  } catch (error) {
    console.error("Roboflow Error:", error);
    alert("An error occurred during AI analysis.");
  }
};