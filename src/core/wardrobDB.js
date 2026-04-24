import axios from 'axios';

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

    let detectedClass = "Unrecognized Item";
    let isRealAPI = false;

    try {
      const response = await axios({
        method: "POST",
        // عدنا للموديل القديم الأذكى مع الرابط الآمن
        url: "https://detect.roboflow.com/clothes-classification-2/1",
        params: {
          api_key: "Fc6ezD8TG9nkKlAzdfh5" // مفتاح الموديل القديم
        },
        data: cleanBase64,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      const predictions = response.data.predictions;
      console.log("🤖 Roboflow Brain Analysis:", predictions);

      if (predictions && predictions.length > 0) {
        const bestMatch = predictions.reduce((prev, current) => (prev.confidence > current.confidence) ? prev : current);
        console.log(`Top Prediction: ${bestMatch.class} (Confidence: ${(bestMatch.confidence * 100).toFixed(1)}%)`);

        // النظام الدفاعي: قبول النتيجة فقط إذا كانت الثقة أعلى من 60%
        if (bestMatch.confidence > 0.60) {
          detectedClass = bestMatch.class;
          isRealAPI = true;
        } else {
          console.warn("AI confidence is too low. Rejected prediction.");
        }
      }
    } catch (apiError) {
      console.warn("Roboflow API unavailable.", apiError.message);
    }

    let mappedCategory = "Top";
    const dClass = String(detectedClass).toLowerCase();

    if (dClass.includes("pant") || dClass.includes("skirt") || dClass.includes("short") || dClass.includes("jeans")) {
      mappedCategory = "Bottom";
    } else if (dClass.includes("jacket") || dClass.includes("coat") || dClass.includes("outer")) {
      mappedCategory = "Layer";
    } else if (dClass.includes("dress")) {
      mappedCategory = "Dress";
    }

    const finalDisplayImage = base64Image.startsWith('data:image') ? base64Image : `data:image/jpeg;base64,${base64Image}`;

    const newItem = {
      id: Date.now().toString(),
      name: isRealAPI ? `AI Detected: ${detectedClass}` : "Manual Edit Needed",
      category: mappedCategory,
      color: detectedColor,
      wearCount: 0,
      imageUrl: finalDisplayImage
    };

    setClothes(prev => [newItem, ...prev]);

    if (isRealAPI) {
      alert(`Success! AI detected: ${detectedClass}`);
    } else {
      alert("Item added! AI was unsure, please edit details later.");
    }

  } catch (error) {
    console.error("Critical System Error:", error);
    alert("System busy. Please try again.");
  }
};