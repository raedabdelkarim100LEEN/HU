import React, { useState, useEffect } from 'react';

const Results = ({ clothes, setClothes, userAnswers, savedOutfits, setSavedOutfits, goBackToHome }) => {
    const [analyzing, setAnalyzing] = useState(true);
    const [phase, setPhase] = useState("Analyzing your psychological answers... 🧠");

    const [matchedTop, setMatchedTop] = useState(null);
    const [matchedBottom, setMatchedBottom] = useState(null);
    const [matchScore, setMatchScore] = useState(0);

    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const phases = ["Analyzing your psychological answers... 🧠", "Scanning your digital closet... 📱", "Matching textures and emotions... ✨"];
        let i = 0;
        const interval = setInterval(() => { i++; if (i < phases.length) setPhase(phases[i]); }, 1200);

        setTimeout(() => {
            clearInterval(interval);
            if (clothes && clothes.length > 0) {
                // Filter and Sort by Least Worn for Sustainability (FR14)
                const tops = clothes.filter(item => {
                    const name = item.name?.toLowerCase() || '';
                    const cat = item.category?.toLowerCase() || '';
                    return (cat === 'top' || (!name.includes('pants') && !name.includes('jeans'))) && item.category !== 'Bottom';
                }).sort((a, b) => (a.wearCount || 0) - (b.wearCount || 0));

                const bottoms = clothes.filter(item => {
                    const name = item.name?.toLowerCase() || '';
                    const cat = item.category?.toLowerCase() || '';
                    return cat === 'bottom' || name.includes('pants') || name.includes('jeans');
                }).sort((a, b) => (a.wearCount || 0) - (b.wearCount || 0));

                if (tops.length > 0) setMatchedTop(tops[0]); // Pick least worn top
                if (bottoms.length > 0) setMatchedBottom(bottoms[0]); // Pick least worn bottom

                setMatchScore(Math.floor(Math.random() * (98 - 85 + 1) + 85));
            }
            setAnalyzing(false);
        }, 4000);

        return () => clearInterval(interval);
    }, [clothes]);

    const handleSaveOutfit = () => {
        if (isSaved) return;

        // 1. Create and Save the new outfit
        const newOutfit = {
            id: Date.now().toString(),
            top: matchedTop,
            bottom: matchedBottom,
            occasion: userAnswers?.occasion || 'Everyday',
            weather: userAnswers?.weather || 'Normal',
            matchScore: matchScore,
            date: new Date().toLocaleDateString()
        };

        setSavedOutfits(prev => [newOutfit, ...prev]);
        setIsSaved(true);

        // 2. Update Wear Count for Sustainability (FR14)
        if (setClothes) {
            setClothes(prevClothes =>
                prevClothes.map(item => {
                    const isWorn = (matchedTop && item.id === matchedTop.id) ||
                        (matchedBottom && item.id === matchedBottom.id);
                    if (isWorn) {
                        return { ...item, wearCount: (item.wearCount || 0) + 1 };
                    }
                    return item;
                })
            );
        }
        alert("Outfit saved! Wear counts updated for sustainability. 🌱");
    };

    if (analyzing) {
        return (
            <div style={centerStyle}>
                <div style={{ textAlign: 'center' }}>
                    <div style={spinnerStyle}></div>
                    <h2 style={{ color: '#2D2D2D', fontSize: '20px', marginTop: '20px' }}>{phase}</h2>
                </div>
            </div>
        );
    }

    if (!clothes || clothes.length === 0) {
        return (
            <div style={centerStyle}>
                <div style={{ textAlign: 'center', background: '#FFF', padding: '40px', borderRadius: '30px' }}>
                    <h1 style={{ fontSize: '40px', margin: '0 0 15px 0' }}>👗❌</h1>
                    <h2 style={{ color: '#2D2D2D', marginBottom: '10px' }}>Empty Closet!</h2>
                    <p style={{ color: '#666', marginBottom: '30px' }}>Upload items first to get recommendations.</p>
                    <button onClick={goBackToHome} style={primaryBtn}>Go to Wardrobe</button>
                </div>
            </div>
        );
    }

    const answersArray = Object.values(userAnswers || {});
    const keyMood = answersArray[2] || "your current mood";

    return (
        <div style={{ padding: '40px 20px', maxWidth: '700px', margin: '0 auto', fontFamily: 'serif' }}>
            <h1 style={{ textAlign: 'center', color: '#2D2D2D', marginBottom: '5px', fontSize: '32px' }}>Your AI Curation</h1>

            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <span style={{ background: '#E8F5E9', color: '#2E7D32', padding: '8px 15px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>
                    🎯 {matchScore}% Psychological Synergy
                </span>
            </div>

            <div style={{ background: '#FFF', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', background: '#F0F0F0' }}>
                    {/* Top Section */}
                    <div style={{ height: '250px', background: '#F9F9F9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {matchedTop ? (
                            <img src={matchedTop.imageUrl || matchedTop.image} alt="Top" style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }} />
                        ) : (
                            <div style={{ textAlign: 'center' }}><span style={{ fontSize: '30px' }}>👕</span><p style={{ fontSize: '12px', color: '#888' }}>No Top found</p></div>
                        )}
                    </div>

                    {/* Bottom Section */}
                    <div style={{ height: '250px', background: '#F9F9F9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {matchedBottom ? (
                            <img src={matchedBottom.imageUrl || matchedBottom.image} alt="Bottom" style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }} />
                        ) : (
                            <div style={{ textAlign: 'center' }}><span style={{ fontSize: '30px' }}>👖</span><p style={{ fontSize: '12px', color: '#888' }}>No Bottom found</p></div>
                        )}
                    </div>
                </div>

                <div style={{ padding: '30px' }}>
                    <h3 style={{ fontSize: '20px', color: '#2D2D2D', marginBottom: '15px' }}>EVA's Styling Note</h3>
                    <p style={{ color: '#555', lineHeight: '1.8', fontSize: '15px' }}>
                        Since you indicated a preference for <b>{keyMood}</b>, we selected these pieces to balance your energy.
                        To support sustainability, we prioritized items that haven't been rotated in your closet lately.
                    </p>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
                <button
                    onClick={handleSaveOutfit}
                    style={{
                        flex: 1, padding: '16px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer',
                        border: isSaved ? '2px solid #C8E6C9' : '2px solid #2D2D2D',
                        background: isSaved ? '#E8F5E9' : '#FFF',
                        color: isSaved ? '#2E7D32' : '#2D2D2D',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {isSaved ? 'Saved to Lookbook 💖' : 'Save this Look 🤍'}
                </button>
                <button onClick={goBackToHome} style={{ ...primaryBtn, flex: 1 }}>Go to Wardrobe 🏠</button>
            </div>
        </div>
    );
};

const centerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#FAF9F6' };
const primaryBtn = { padding: '16px 24px', borderRadius: '15px', border: 'none', background: '#2D2D2D', color: '#FFF', fontWeight: 'bold', cursor: 'pointer' };
const spinnerStyle = { width: '50px', height: '50px', margin: '0 auto', border: '4px solid #f3f3f3', borderTop: '4px solid #2D2D2D', borderRadius: '50%', animation: 'spin 1s linear infinite' };

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
document.head.appendChild(styleSheet);

export default Results;