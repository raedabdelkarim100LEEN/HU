import { moodColorMatrix } from './psychologyMatrix';

// 1. Pass 'clothes' (the real state from App.jsx) as a parameter
export function getSmartRecommendations(userMood, clothes) {
    if (!moodColorMatrix[userMood]) return null;

    const targetColors = moodColorMatrix[userMood].colors;
    const explainableReason = moodColorMatrix[userMood].psychologyReason;

    // 2. Filter by appropriate mood colors
    let suitableClothes = clothes.filter(item =>
        targetColors.includes(item.color)
    );

    // 3. SUSTAINABILITY ALGORITHM (FR14): Sort by Least Worn Item
    suitableClothes.sort((a, b) => (a.wearCount || 0) - (b.wearCount || 0));

    // 4. Select the best match (Since it's sorted, 'find' automatically grabs the least worn!)
    const recommendedTop = suitableClothes.find(item => item.category === "Top");
    const recommendedBottom = suitableClothes.find(item => item.category === "Bottom");
    const recommendedLayer = suitableClothes.find(item => item.category === "Layer");
    const recommendedDress = suitableClothes.find(item => item.category === "Dress");

    // 5. Smart Outfit Assembly
    let finalOutfit = [];
    if (recommendedDress) {
        // If a dress is chosen, we usually just need the dress and maybe a layer
        finalOutfit = [recommendedDress, recommendedLayer].filter(Boolean);
    } else {
        // Otherwise, assemble Top + Bottom + Layer
        finalOutfit = [recommendedTop, recommendedBottom, recommendedLayer].filter(Boolean);
    }

    return {
        outfit: finalOutfit,
        aiExplanation: explainableReason,
        sustainabilityNote: "🌱 To support sustainable fashion, Eva AI prioritized items you haven't worn in a while!"
    };
}