// src/core/wardrobeDB.js
import axios from 'axios';

// ⚠️ مفاتيح Roboflow الخاصة بكِ ⚠️
const ROBOFLOW_API_KEY = "Fc6ezD8TG9nkKlAzdfh5";
const ROBOFLOW_MODEL = "clothes-classification-2/1";

/**
 * Analyzes an image using Roboflow and adds the item to the wardrobe state.
 */
export const analyzeAndAddItem = async (base64Image, clothes, setClothes, detectedColor = 'Unknown') => {
  try {
    // 1. STRIP METADATA: Roboflow needs JUST the string, not the "data:image/..." prefix
    const cleanBase64 = base64Image.includes('base64,')
      ? base64Image.split('base64,')[1]
      : base64Image;

    // 2. CALL ROBOFLOW API
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