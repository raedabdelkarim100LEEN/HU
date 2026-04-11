import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const getOptionEmoji = (optionText) => {
    if (!optionText) return '🔸';
    const text = optionText.toString().toLowerCase();
    if (text.includes('happy') || text.includes('good') || text.includes('high')) return '😊';
    if (text.includes('calm') || text.includes('relax') || text.includes('chill')) return '😌';
    if (text.includes('tired') || text.includes('low') || text.includes('empty')) return '😫';
    if (text.includes('active') || text.includes('bold') || text.includes('strong')) return '🔥';
    if (text.includes('balanced') || text.includes('normal') || text.includes('neutral')) return '⚖️';
    if (text.includes('focused') || text.includes('sharp')) return '🎯';
    if (text.includes('creative') || text.includes('artist')) return '🎨';
    if (text.includes('comfy') || text.includes('hug') || text.includes('soft')) return '🧸';
    if (text.includes('boss') || text.includes('formal') || text.includes('work')) return '👔';
    if (text.includes('casual') || text.includes('rest')) return '🍹';
    if (text.includes('hot') || text.includes('warm')) return '☀️';
    if (text.includes('cool') || text.includes('chilly') || text.includes('cold')) return '❄️';
    if (text.includes('heavy')) return '🐘';
    if (text.includes('light')) return '🕊️';
    if (text.includes('unique') || text.includes('stand out')) return '✨';
    return '🔹';
};

// تم تعديل الاستقبال هنا ليصبح onFinish
const Quiz = ({ goBackToWardrobe, onFinish }) => {
    const [step, setStep] = useState(1);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "questions"));
                const allQuestions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                const shuffled = allQuestions.sort(() => 0.5 - Math.random());
                setQuestions(shuffled.slice(0, 6));
                setLoading(false);
            } catch (error) {
                console.error("Error:", error);
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const handleSelect = (questionId, option) => {
        setAnswers({ ...answers, [questionId]: option });
    };

    if (loading) return <div style={centerStyle}>Loading your unique EVA experience... ✨</div>;

    const currentQuestions = step === 1 ? questions.slice(0, 3) : questions.slice(3, 6);

    return (
        <div style={{ padding: '30px 20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'serif', backgroundColor: '#FAF9F6', minHeight: '100vh' }}>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px', gap: '8px' }}>
                <div style={{ ...progressDot, backgroundColor: step === 1 ? '#2D2D2D' : '#DDD' }}></div>
                <div style={{ ...progressDot, backgroundColor: step === 2 ? '#2D2D2D' : '#DDD' }}></div>
            </div>

            <h1 style={{ textAlign: 'center', color: '#2D2D2D', marginBottom: '10px', fontSize: '28px' }}>
                {step === 1 ? "Your Vibe & Mood" : "Your Style Choices"}
            </h1>
            <p style={{ textAlign: 'center', color: '#888', marginBottom: '40px', fontSize: '15px' }}>
                Step {step} of 2
            </p>

            {currentQuestions.map((q, index) => (
                <div key={q.id} style={cardStyle}>
                    <p style={{ fontSize: '17px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
                        {step === 1 ? index + 1 : index + 4}. {q.text} {q.icon}
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
                        {q.options && q.options.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => handleSelect(q.id, opt)}
                                style={{
                                    ...optionButtonStyle,
                                    backgroundColor: answers[q.id] === opt ? '#FDF8EF' : '#FFF',
                                    border: answers[q.id] === opt ? '2px solid #2D2D2D' : '1px solid #EAEAEA',
                                    boxShadow: answers[q.id] === opt ? '0 4px 10px rgba(0,0,0,0.05)' : 'none'
                                }}
                            >
                                <span style={{ fontSize: '32px', marginBottom: '10px', display: 'block' }}>{getOptionEmoji(opt)}</span>
                                <span style={{ fontSize: '14px', fontWeight: answers[q.id] === opt ? 'bold' : 'normal', color: '#444' }}>{opt}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            <div style={{ display: 'flex', gap: '15px', marginTop: '40px' }}>
                {step === 1 ? (
                    <>
                        <button onClick={goBackToWardrobe} style={secondaryBtn}>Back</button>
                        <button
                            onClick={() => setStep(2)}
                            disabled={Object.keys(answers).filter(id => questions.slice(0, 3).some(q => q.id === id)).length < 3}
                            style={{ ...primaryBtn, opacity: Object.keys(answers).filter(id => questions.slice(0, 3).some(q => q.id === id)).length < 3 ? 0.4 : 1 }}
                        >
                            Next Step
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setStep(1)} style={secondaryBtn}>Previous</button>

                        {/* الزر الخاص بك تم وضعه هنا بنجاح */}
                        <button
                            onClick={() => onFinish(answers)}
                            disabled={Object.keys(answers).length < 6}
                            style={{ ...primaryBtn, opacity: Object.keys(answers).length < 6 ? 0.4 : 1 }}
                        >
                            Get Recommendation 🪄
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

const centerStyle = { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '18px', color: '#888' };
const progressDot = { width: '40px', height: '5px', borderRadius: '3px', transition: 'all 0.3s ease' };
const cardStyle = { background: '#FFF', padding: '30px', borderRadius: '20px', marginBottom: '25px', border: '1px solid #F0F0F0', boxShadow: '0 8px 20px rgba(0,0,0,0.03)' };
const optionButtonStyle = { padding: '20px 10px', borderRadius: '15px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' };
const primaryBtn = { flex: 2, padding: '16px', borderRadius: '15px', border: 'none', background: '#2D2D2D', color: '#FFF', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', transition: '0.3s' };
const secondaryBtn = { flex: 1, padding: '16px', borderRadius: '15px', border: '1px solid #DDD', background: '#FFF', cursor: 'pointer', fontSize: '16px', color: '#555', transition: '0.3s' };

export default Quiz;