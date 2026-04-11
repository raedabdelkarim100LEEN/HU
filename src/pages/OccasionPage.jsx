import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const OccasionPage = ({ onContinue }) => {
    const [occasions, setOccasions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selections, setSelections] = useState({ occasion: null, weather: null });

    useEffect(() => {
        const fetchOccasions = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "occasions"));
                const fetchedOccasions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOccasions(fetchedOccasions);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching occasions:", error);
                setLoading(false);
            }
        };
        fetchOccasions();
    }, []);

    const defaultOccasions = ["University / Work 💼", "Casual Outing ☕", "Formal Event 🕴️", "Night Out 🌙", "Workout 🏃‍♂️"];
    const displayOccasions = occasions.length > 0 ? occasions.map(o => o.name) : defaultOccasions;

    const inputData = [
        {
            title: "What is the occasion? 📅",
            key: "occasion",
            items: displayOccasions
        },
        {
            title: "How is the weather? ☀️",
            key: "weather",
            items: ["Sunny ☀️", "Cloudy ☁️", "Rainy 🌧️", "Chilly ❄️", "Hot 🔥"]
        }
    ];

    if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px', color: '#888' }}>Setting up EVA context... ✨</div>;

    return (
        <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'serif', backgroundColor: '#FAF9F6', minHeight: '100vh' }}>
            <h1 style={{ textAlign: 'center', color: '#2D2D2D', marginBottom: '10px', fontSize: '32px' }}>EVA STYLE</h1>
            <p style={{ textAlign: 'center', color: '#888', marginBottom: '40px', fontSize: '16px' }}>Start with your event & weather</p>

            {inputData.map((section, sIndex) => (
                <div key={sIndex} style={{ background: '#FFF', padding: '30px', borderRadius: '20px', marginBottom: '25px', boxShadow: '0 8px 20px rgba(0,0,0,0.04)', border: '1px solid #F5F5F5' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
                        {section.title}
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {section.items.map((item, iIndex) => (
                            <button
                                key={iIndex}
                                onClick={() => setSelections({ ...selections, [section.key]: item })}
                                style={{
                                    padding: '14px 22px', borderRadius: '12px', cursor: 'pointer', fontSize: '15px', transition: 'all 0.3s ease',
                                    background: selections[section.key] === item ? '#2D2D2D' : '#FFF',
                                    color: selections[section.key] === item ? '#FFF' : '#444',
                                    border: selections[section.key] === item ? '1px solid #2D2D2D' : '1px solid #EAEAEA',
                                    fontWeight: selections[section.key] === item ? 'bold' : 'normal'
                                }}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            {/* الزر الخاص بك تم وضعه هنا بنجاح */}
            <button
                onClick={() => onContinue(selections)}
                disabled={!selections.occasion || !selections.weather}
                style={{
                    width: '100%', padding: '18px', borderRadius: '15px', border: 'none', background: '#2D2D2D', color: '#FFF', fontWeight: 'bold', cursor: 'pointer', fontSize: '18px', marginTop: '10px', transition: '0.3s',
                    opacity: (!selections.occasion || !selections.weather) ? 0.4 : 1
                }}
            >
                Continue to Mood Quiz 🪄
            </button>
        </div>
    );
};

export default OccasionPage;