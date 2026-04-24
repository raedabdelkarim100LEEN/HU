import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Wardrobe from './pages/Wardrobe';
import OccasionPage from './pages/OccasionPage';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('eva_user_data');
    return savedUser ? JSON.parse(savedUser) : { name: 'User', email: '', profilePicture: null };
  });

  const [clothes, setClothes] = useState(() => {
    const savedUser = localStorage.getItem('eva_user_data');
    const user = savedUser ? JSON.parse(savedUser) : null;
    if (user && user.email) {
      const userClothes = localStorage.getItem(`eva_clothes_${user.email}`);
      return userClothes ? JSON.parse(userClothes) : [];
    }
    return [];
  });

  const [savedOutfits, setSavedOutfits] = useState(() => {
    const savedUser = localStorage.getItem('eva_user_data');
    const user = savedUser ? JSON.parse(savedUser) : null;
    if (user && user.email) {
      const userOutfits = localStorage.getItem(`eva_saved_outfits_${user.email}`);
      return userOutfits ? JSON.parse(userOutfits) : [];
    }
    return [];
  });

  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    if (currentUser && currentUser.email) {
      localStorage.setItem(`eva_clothes_${currentUser.email}`, JSON.stringify(clothes));
    }
  }, [clothes, currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.email) {
      localStorage.setItem(`eva_saved_outfits_${currentUser.email}`, JSON.stringify(savedOutfits));
    }
  }, [savedOutfits, currentUser]);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('eva_user_data', JSON.stringify({ name: userData.name, email: userData.email }));

    const userClothes = localStorage.getItem(`eva_clothes_${userData.email}`);
    setClothes(userClothes ? JSON.parse(userClothes) : []);

    const userOutfits = localStorage.getItem(`eva_saved_outfits_${userData.email}`);
    setSavedOutfits(userOutfits ? JSON.parse(userOutfits) : []);

    setCurrentPage('wardrobe');
  };

  // 🔴 هذه هي الدالة التي فُقدت وتسببت بالشاشة البيضاء 🔴
  const handleLogout = () => {
    setCurrentUser({ name: 'User', email: '', profilePicture: null });
    localStorage.removeItem('eva_user_data');
    setClothes([]);
    setSavedOutfits([]);
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans">

      {currentPage === 'home' && <Home goToLogin={() => setCurrentPage('login')} />}

      {currentPage === 'login' && <Login onLogin={handleLogin} />}

      {currentPage === 'wardrobe' && (
        <Wardrobe
          clothes={clothes} setClothes={setClothes}
          savedOutfits={savedOutfits} setSavedOutfits={setSavedOutfits}
          goToQuiz={() => setCurrentPage('occasionPage')}
          goBackToHome={() => setCurrentPage('home')}
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}

      {currentPage === 'occasionPage' && (
        <OccasionPage
          onContinue={(selections) => {
            setUserAnswers(prev => ({ ...prev, ...selections }));
            setCurrentPage('quiz');
          }}
        />
      )}

      {currentPage === 'quiz' && (
        <Quiz
          goBackToWardrobe={() => setCurrentPage('wardrobe')}
          onFinish={(quizAnswers) => {
            setUserAnswers(prev => ({ ...prev, ...quizAnswers }));
            setCurrentPage('results');
          }}
        />
      )}

      {currentPage === 'results' && (
        <Results
          userAnswers={userAnswers}
          clothes={clothes}
          setClothes={setClothes}
          savedOutfits={savedOutfits}
          setSavedOutfits={setSavedOutfits}
          goBackToHome={() => setCurrentPage('wardrobe')}
        />
      )}

      {currentPage === 'admin' && <AdminLogin onLoginSuccess={() => setCurrentPage('admin-dashboard')} />}

      {currentPage === 'admin-dashboard' && <AdminDashboard onLogout={() => setCurrentPage('home')} />}

      {currentPage === 'home' && (
        <button onClick={() => setCurrentPage('admin')} style={adminBtnStyle}>⚙️ Admin Portal</button>
      )}

    </div>
  );
}

const adminBtnStyle = { position: 'fixed', bottom: '15px', right: '15px', opacity: 0.7, fontSize: '12px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#555' };