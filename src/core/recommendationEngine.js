import { userWardrobe } from './wardrobeDB';
import { moodColorMatrix } from './psychologyMatrix';

export function getSmartRecommendations(userMood) {
    const targetColors = moodColorMatrix[userMood].colors;
    const explainableReason = moodColorMatrix[userMood].psychologyReason;

    let suitableClothes = userWardrobe.filter(item =>
        targetColors.includes(item.color)
    );

    suitableClothes.sort((a, b) => a.wearCount - b.wearCount);

    const recommendedTop = suitableClothes.find(item => item.category === "Top");
    const recommendedBottom = suitableClothes.find(item => item.category === "Bottom");
    const recommendedLayer = suitableClothes.find(item => item.category === "Layer");

    const finalOutfit = [recommendedTop, recommendedBottom, recommendedLayer].filter(Boolean);

    return {
        outfit: finalOutfit,
        aiExplanation: explainableReason,
        sustainabilityNote: "To support sustainable fashion, we prioritized items you haven't worn in a while!"
    };
}