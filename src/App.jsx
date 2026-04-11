import React, { useState } from 'react';
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
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('eva_user_email') || 'User');
  const [clothes, setClothes] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  // 🌟 الإضافة الجديدة: ذاكرة لحفظ الأطقم المكتملة 🌟
  const [savedOutfits, setSavedOutfits] = useState([]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans">

      {currentPage === 'home' && <Home goToLogin={() => setCurrentPage('login')} />}

      {currentPage === 'login' && <Login onLogin={() => { setCurrentPage('wardrobe'); }} />}

      {currentPage === 'wardrobe' && (
        <Wardrobe
          clothes={clothes} setClothes={setClothes}
          savedOutfits={savedOutfits} setSavedOutfits={setSavedOutfits} // تمرير الذاكرة للخزانة
          goToQuiz={() => setCurrentPage('occasionPage')}
          goBackToHome={() => setCurrentPage('home')}
          currentUser={currentUser}
          onLogout={() => setCurrentPage('home')}
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
          clothes={clothes}
          userAnswers={userAnswers}
          savedOutfits={savedOutfits} setSavedOutfits={setSavedOutfits} // تمرير الذاكرة للنتائج
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

const adminBtnStyle = { position: 'fixed', bottom: '15px', right: '15px', opacity: 0.7, fontSize: '12px', backgroundColor: '#FFF', padding: '8px 15px', borderRadius: '10px', border: '1px solid #DDD', color: '#333', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', fontWeight: 'bold' };