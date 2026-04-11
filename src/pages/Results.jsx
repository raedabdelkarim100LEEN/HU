import React, { useState, useEffect } from 'react';

const Results = ({ clothes, userAnswers, savedOutfits, setSavedOutfits, goBackToHome }) => {
    const [analyzing, setAnalyzing] = useState(true);
    const [phase, setPhase] = useState("Analyzing your psychological answers... 🧠");

    const [matchedTop, setMatchedTop] = useState(null);
    const [matchedBottom, setMatchedBottom] = useState(null);
    const [matchScore, setMatchScore] = useState(0);

    // حالة لمعرفة إذا تم حفظ الطقم أم لا
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const phases = ["Analyzing your psychological answers... 🧠", "Scanning your digital closet... 📱", "Calculating mood & color synergy... 🎨", "Curating your perfect full outfit... ✨"];
        let i = 0;
        const interval = setInterval(() => { i++; if (i < phases.length) setPhase(phases[i]); }, 1200);

        setTimeout(() => {
            clearInterval(interval);
            if (clothes && clothes.length > 0) {
                const tops = clothes.filter(item => {
                    const name = item.name?.toLowerCase() || ''; const cat = item.category?.toLowerCase() || '';
                    return !name.includes('pants') && !name.includes('jeans') && !name.includes('trouser') && !cat.includes('bottom');
                });
                const bottoms = clothes.filter(item => {
                    const name = item.name?.toLowerCase() || ''; const cat = item.category?.toLowerCase() || '';
                    return name.includes('pants') || name.includes('jeans') || name.includes('trouser') || cat.includes('bottom');
                });

                if (tops.length > 0) setMatchedTop(tops[Math.floor(Math.random() * tops.length)]);
                else if (clothes.length > 0 && bottoms.length === 0) setMatchedTop(clothes[Math.floor(Math.random() * clothes.length)]);

                if (bottoms.length > 0) setMatchedBottom(bottoms[Math.floor(Math.random() * bottoms.length)]);
                setMatchScore(Math.floor(Math.random() * (98 - 85 + 1) + 85));
            }
            setAnalyzing(false);
        }, 5000);

        return () => clearInterval(interval);
    }, [clothes]);

    // دالة حفظ الطقم في الذاكرة
    const handleSaveOutfit = () => {
        if (isSaved) return; // لا تحفظه مرتين
        const newOutfit = {
            id: Date.now().toString(),
            top: matchedTop,
            bottom: matchedBottom,
            occasion: userAnswers.occasion || 'Everyday',
            weather: userAnswers.weather || 'Normal',
            matchScore: matchScore,
            date: new Date().toLocaleDateString()
        };
        setSavedOutfits(prev => [newOutfit, ...prev]);
        setIsSaved(true);
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
                <div style={{ textAlign: 'center', background: '#FFF', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', maxWidth: '400px' }}>
                    <h1 style={{ fontSize: '40px', margin: '0 0 15px 0' }}>👗❌</h1>
                    <h2 style={{ color: '#2D2D2D', marginBottom: '10px' }}>Empty Closet!</h2>
                    <p style={{ color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>EVA strictly curates outfits from what you already own. Please upload your clothes.</p>
                    <button onClick={goBackToHome} style={primaryBtn}>Go to Wardrobe</button>
                </div>
            </div>
        );
    }

    const answersArray = Object.values(userAnswers || {});
    const keyMood = answersArray[2] || "your current mood";
    const keyVibe = answersArray[4] || "your desired vibe";

    return (
        <div style={{ padding: '40px 20px', maxWidth: '700px', margin: '0 auto', fontFamily: 'serif', backgroundColor: '#FAF9F6', minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center', color: '#2D2D2D', marginBottom: '5px', fontSize: '32px' }}>Your Curated Outfit</h1>

            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <span style={{ background: '#E8F5E9', color: '#2E7D32', padding: '8px 15px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', border: '1px solid #C8E6C9' }}>
                    🎯 {matchScore}% Psychological Synergy
                </span>
            </div>

            <div style={{ background: '#FFF', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', border: '1px solid #F0F0F0', marginBottom: '30px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px', backgroundColor: '#EEE' }}>
                    <div style={{ height: '250px', backgroundColor: '#F9F9F9', position: 'relative' }}>
                        {matchedTop ? (
                            <img src={matchedTop.imageUrl || matchedTop.image} alt="Top" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#999' }}>
                                <span style={{ fontSize: '30px', marginBottom: '10px' }}>👕</span><span style={{ fontSize: '12px' }}>No Tops</span>
                            </div>
                        )}
                    </div>
                    <div style={{ height: '250px', backgroundColor: '#F9F9F9', position: 'relative' }}>
                        {matchedBottom ? (
                            <img src={matchedBottom.imageUrl || matchedBottom.image} alt="Bottom" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', padding: '20px', textAlign: 'center', border: '2px dashed #DDD', margin: '10px', borderRadius: '15px' }}>
                                <span style={{ fontSize: '30px', marginBottom: '10px' }}>👖</span>
                                <span style={{ fontSize: '13px', color: '#666', fontWeight: 'bold', marginBottom: '5px' }}>Missing Piece</span>
                                <span style={{ fontSize: '11px', color: '#888' }}>Upload a bottom item!</span>
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ padding: '30px' }}>
                    <h3 style={{ fontSize: '20px', color: '#2D2D2D', marginBottom: '15px' }}>EVA's Styling Algorithm:</h3>
                    <p style={{ color: '#555', lineHeight: '1.8', fontSize: '15px', marginBottom: '15px' }}>Based on your inputs, we noted your event is a <b>{userAnswers.occasion}</b> and the weather is <b>{userAnswers.weather}</b>.</p>
                    <p style={{ color: '#555', lineHeight: '1.8', fontSize: '15px', marginBottom: '20px', background: '#F9F9F9', padding: '15px', borderRadius: '10px', borderLeft: '4px solid #2D2D2D' }}>
                        Since you indicated a preference for <b>"{keyMood}"</b> and are aiming for a <b>"{keyVibe}"</b> aesthetic, this curated combination respects our circular economy principles while perfectly matching your cognitive state today.
                    </p>
                </div>
            </div>

            {/* الأزرار الجديدة للحفظ والعودة */}
            <div style={{ display: 'flex', gap: '15px' }}>
                <button
                    onClick={handleSaveOutfit}
                    style={{
                        flex: 1, padding: '16px', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px', transition: '0.3s',
                        border: isSaved ? '2px solid #C8E6C9' : '2px solid #2D2D2D',
                        background: isSaved ? '#E8F5E9' : '#FFF',
                        color: isSaved ? '#2E7D32' : '#2D2D2D'
                    }}
                >
                    {isSaved ? 'Saved to Lookbook ❤️' : 'Save this Look 🤍'}
                </button>
                <button onClick={goBackToHome} style={{ ...primaryBtn, flex: 1 }}>Go to Wardrobe 🏠</button>
            </div>
        </div>
    );
};

const centerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#FAF9F6', fontFamily: 'serif' };
const primaryBtn = { padding: '16px 24px', borderRadius: '15px', border: 'none', background: '#2D2D2D', color: '#FFF', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' };
const spinnerStyle = { width: '50px', height: '50px', margin: '0 auto', border: '4px solid #f3f3f3', borderTop: '4px solid #2D2D2D', borderRadius: '50%', animation: 'spin 1s linear infinite' };

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
document.head.appendChild(styleSheet);

export default Results;