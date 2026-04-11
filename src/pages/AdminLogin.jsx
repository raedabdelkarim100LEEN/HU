import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const AdminLogin = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            onLoginSuccess();
        } catch (err) {
            setError('Invalid Admin Credentials');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#F4F1EA' }}>
            <form onSubmit={handleLogin} style={{ padding: '3rem', background: '#fff', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                <h1 style={{ color: '#2D2D2D', marginBottom: '0.5rem', fontFamily: 'serif' }}>EVA STYLE</h1>
                <p style={{ color: '#888', marginBottom: '2rem', fontSize: '14px' }}>Administrative Cloud Portal</p>

                {error && <p style={{ color: '#D9534F', marginBottom: '1rem' }}>{error}</p>}

                <input
                    type="email" placeholder="Admin Email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '12px', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #EEE', outline: 'none' }}
                />
                <input
                    type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '12px', marginBottom: '2rem', borderRadius: '8px', border: '1px solid #EEE', outline: 'none' }}
                />
                <button type="submit" style={{ width: '100%', padding: '14px', background: '#2D2D2D', color: '#FFF', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Access Control Panel
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;