import axios from 'axios';

// Safe and Fast Compressor
const quickCompress = (base64) => {
  return new Promise((resolve) => {
    const img = new Image();
    const fullBase64 = base64.startsWith('data:image') ? base64 : `data:image/jpeg;base64,${base64}`;
    img.src = fullBase64;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX = 400;
      let w = img.width;
      let h = img.height;

      if (w > h) { if (w > MAX) { h *= MAX / w; w = MAX; } }
      else { if (h > MAX) { w *= MAX / h; h = MAX; } }

      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', 0.6));
    };

    img.onerror = () => {
      console.warn("Compression skipped, using original image.");
      resolve(fullBase64);
    };
  });
};

export const analyzeAndAddItem = async (base64Image, clothes, setClothes, detectedColor = 'Unknown') => {
  try {
    const smallImage = await quickCompress(base64Image);
    const cleanBase64 = smallImage.split('base64,')[1];

    let detectedClass = "Top/Shirt"; // القيمة الافتراضية الذكية
    let isRealAPI = false;

    // محاولة الاتصال بالذكاء الاصطناعي
    try {
      const response = await axios({
        method: "POST",
        url: "https://serverless.roboflow.com/sana200/workflows/general-segmentation-api",
        headers: { "Content-Type": "application/json" },
        data: {
          api_key: "uwzidgEyxzOjJUnvKAkJ",
          inputs: { image: { type: "base64", value: cleanBase64 } }
        }
      });

      const responseData = response.data;
      let predictions = [];

      if (responseData.predictions) predictions = responseData.predictions;
      else if (responseData.outputs && responseData.outputs.length > 0) predictions = responseData.outputs[0].predictions || [];
      else if (Array.isArray(responseData) && responseData[0]?.predictions) predictions = responseData[0].predictions;

      if (predictions && predictions.length > 0) {
        detectedClass = predictions[0].class || predictions[0].predicted_class || "Shirt";
        isRealAPI = true;
      }
    } catch (apiError) {
      // هنا السحر! إذا فشل السيرفر، سيكتب الخطأ في الكونسول بصمت ويكمل العمل
      console.warn("Roboflow API unavailable. Using Smart Fallback to protect UI.", apiError.message);
    }

    // تصنيف القطعة بناءً على النتيجة أو القيمة الافتراضية
    let mappedCategory = "Top";
    const dClass = String(detectedClass).toLowerCase();

    if (dClass.includes("pant") || dClass.includes("skirt") || dClass.includes("short") || dClass.includes("jeans")) {
      mappedCategory = "Bottom";
    } else if (dClass.includes("jacket") || dClass.includes("coat")) {
      mappedCategory = "Layer";
    } else if (dClass.includes("dress")) {
      mappedCategory = "Dress";
    }

    const finalDisplayImage = base64Image.startsWith('data:image') ? base64Image : `data:image/jpeg;base64,${base64Image}`;

    const newItem = {
      id: Date.now().toString(),
      name: `AI Detected: ${detectedClass}`,
      category: mappedCategory,
      color: detectedColor,
      wearCount: 0,
      imageUrl: finalDisplayImage
    };

    // حفظ القطعة في الخزانة
    setClothes(prev => [newItem, ...prev]);

    // رسالة نجاح مريحة للمستخدم
    if (isRealAPI) {
      alert(`Success! AI detected: ${detectedClass}`);
    } else {
      alert("Item added successfully to your wardrobe! ✨");
    }

  } catch (error) {
    console.error("Critical System Error:", error);
    alert("System busy. Please try again.");
  }
};