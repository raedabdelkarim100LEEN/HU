import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const AdminDashboard = ({ onLogout }) => {
    const [question, setQuestion] = useState('');
    const [category, setCategory] = useState('Mood');
    const [icon, setIcon] = useState('✨');
    // إضافة حالات للخيارات الثلاثة
    const [opt1, setOpt1] = useState('');
    const [opt2, setOpt2] = useState('');
    const [opt3, setOpt3] = useState('');

    const [occasion, setOccasion] = useState('');
    const [status, setStatus] = useState('');

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "questions"), {
                text: question,
                category: category,
                icon: icon,
                options: [opt1, opt2, opt3], // حفظ الخيارات كمصفوفة
                createdAt: new Date()
            });
            // تفريغ الخانات بعد الحفظ
            setQuestion(''); setOpt1(''); setOpt2(''); setOpt3('');
            setStatus('Scientific Question with Options Saved! ✅');
            setTimeout(() => setStatus(''), 3000);
        } catch (err) {
            setStatus('Error ❌');
        }
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'serif', backgroundColor: '#FDFCFB' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #EEE', paddingBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>EVA STYLE | Admin Console</h2>
                <button onClick={onLogout} style={{ padding: '10px 20px', background: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>
            </div>

            {status && <div style={{ textAlign: 'center', padding: '15px', background: '#f6ffed', borderRadius: '8px', marginBottom: '20px', color: '#52c41a' }}>{status}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                <div style={{ padding: '25px', background: '#fff', borderRadius: '20px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
                    <h3>Add New Question</h3>
                    <form onSubmit={handleAddQuestion}>
                        <textarea
                            value={question} onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Question Text (e.g., How is your energy today?)"
                            style={{ width: '100%', height: '60px', padding: '10px', marginBottom: '15px', borderRadius: '8px', border: '1px solid #ddd' }}
                            required
                        />

                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ fontSize: '13px', color: '#666' }}>Options (3 required):</label>
                            <input type="text" placeholder="Option 1 (e.g., High)" value={opt1} onChange={(e) => setOpt1(e.target.value)} style={inputStyle} required />
                            <input type="text" placeholder="Option 2 (e.g., Balanced)" value={opt2} onChange={(e) => setOpt2(e.target.value)} style={inputStyle} required />
                            <input type="text" placeholder="Option 3 (e.g., Low)" value={opt3} onChange={(e) => setOpt3(e.target.value)} style={inputStyle} required />
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '8px' }}>
                                <option value="Mood">Mood 🎭</option>
                                <option value="Color">Color 🎨</option>
                                <option value="Identity">Identity 👑</option>
                                <option value="Body">Body 🧘</option>
                            </select>
                            <input type="text" value={icon} onChange={(e) => setIcon(e.target.value)} style={{ width: '60px', padding: '10px', textAlign: 'center' }} />
                        </div>

                        <button type="submit" style={{ width: '100%', padding: '14px', background: '#2D2D2D', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Save to Cloud
                        </button>
                    </form>
                </div>
                {/* قسم المناسبات يبقى كما هو... */}
            </div>
        </div>
    );
};

const inputStyle = { width: '100%', padding: '10px', marginTop: '8px', borderRadius: '8px', border: '1px solid #eee' };

export default AdminDashboard;