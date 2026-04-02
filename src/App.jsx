import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Wardrobe from './pages/Wardrobe';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import { userWardrobe } from './core/wardrobDB';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // 🧠 الذاكرة: هل يوجد مستخدم مسجل دخول مسبقاً؟
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('eva_user_email') || null);
  const [clothes, setClothes] = useState([]);

  // عند تسجيل الدخول
  const handleLogin = (email) => {
    setCurrentUser(email);
    localStorage.setItem('eva_user_email', email); // حفظ الإيميل في المتصفح
    setCurrentPage('wardrobe');
  };

  // عند تسجيل الخروج
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('eva_user_email');
    setClothes([]); // تصفير الخزانة فوراً
    setCurrentPage('home');
  };

  // 🧠 جلب الملابس الخاصة بهذا الإيميل بالتحديد عند الدخول
  useEffect(() => {
    if (currentUser) {
      const savedClothes = localStorage.getItem(`eva_wardrobe_${currentUser}`);
      if (savedClothes) {
        setClothes(JSON.parse(savedClothes)); // جلب ملابسه المحفوظة
      } else {
        setClothes(userWardrobe); // إذا كان جديداً، نعطيه الملابس الافتراضية
      }
    }
  }, [currentUser]);

  // 🧠 حفظ الملابس في المتصفح كلما أضاف أو حذف قطعة (مربوطة بإيميله)
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`eva_wardrobe_${currentUser}`, JSON.stringify(clothes));
    }
  }, [clothes, currentUser]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans">

      {/* إذا كان مسجلاً الدخول مسبقاً، زر الرئيسية ينقله للخزانة مباشرة */}
      {currentPage === 'home' && (
        <Home goToLogin={() => currentUser ? setCurrentPage('wardrobe') : setCurrentPage('login')} />
      )}

      {currentPage === 'login' && (
        <Login onLogin={handleLogin} />
      )}

      {currentPage === 'wardrobe' && (
        <Wardrobe
          clothes={clothes}
          setClothes={setClothes}
          currentUser={currentUser} // إرسال الإيميل للخزانة لعرضه
          onLogout={handleLogout}   // إرسال أمر الخروج
          goToQuiz={() => setCurrentPage('quiz')}
          goBackToHome={() => setCurrentPage('home')}
        />
      )}

      {currentPage === 'quiz' && (
        <Quiz
          goBackToWardrobe={() => setCurrentPage('wardrobe')}
          goToResults={() => setCurrentPage('results')}
        />
      )}

      {currentPage === 'results' && (
        <Results
          clothes={clothes}
          goBackToHome={() => setCurrentPage('home')}
          goBackToQuiz={() => setCurrentPage('quiz')}
        />
      )}
    </div>
  );
}