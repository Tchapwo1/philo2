import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Home from './components/Home';
import QuizEngine from './components/QuizEngine';
import Methode from './components/Methode';
import Anthologie from './components/Anthologie';
import SearchOverlay from './components/SearchOverlay';
import DraftingSuite from './components/DraftingSuite';

function App() {
  const [activeRoute, setActiveRoute] = useState('home');
  const [level, setLevel] = useState('Terminale');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [isDocMode, setIsDocMode] = useState(false);
  
  // Persistent Justice Stats
  const [justiceStats, setJusticeStats] = useState(() => {
    const saved = localStorage.getItem('simone_justice_stats');
    return saved ? JSON.parse(saved) : {
      totalScore: 0,
      casesClosed: 0,
      lastRank: 'STAGIAIRE',
      unlockedLevels: [0]
    };
  });

  useEffect(() => {
    localStorage.setItem('simone_justice_stats', JSON.stringify(justiceStats));
  }, [justiceStats]);

  useEffect(() => {
    if (isDocMode) {
      document.body.classList.add('documentary-mode');
    } else {
      document.body.classList.remove('documentary-mode');
    }
  }, [isDocMode]);

  const [session] = useState({
    examDate: '2026-06-15',
  });

  const daysToExam = Math.ceil((new Date(session.examDate) - new Date()) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 's')) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const updateJustice = (gainedScore) => {
    setJusticeStats(prev => ({
      ...prev,
      totalScore: prev.totalScore + gainedScore,
      casesClosed: prev.casesClosed + 1
    }));
  };

  const renderView = () => {
    switch (activeRoute) {
      case 'home': return (
        <Home 
          stats={justiceStats} 
          daysToExam={daysToExam} 
          setActiveRoute={setActiveRoute} 
          onSelectLevel={(lvl) => { setSelectedLevel(lvl); setActiveRoute('quiz'); }} 
        />
      );
      case 'quiz': 
        if (selectedLevel === 9) {
          return <DraftingSuite onBack={() => setActiveRoute('home')} onComplete={updateJustice} />;
        }
        return <QuizEngine level={selectedLevel} onBack={() => setActiveRoute('home')} onComplete={updateJustice} />;
      case 'anthologie': return <Anthologie />;
      case 'methode': return <Methode />;
      default: return (
        <Home 
          stats={justiceStats} 
          daysToExam={daysToExam} 
          setActiveRoute={setActiveRoute} 
          onSelectLevel={(lvl) => { setSelectedLevel(lvl); setActiveRoute('quiz'); }} 
        />
      );
    }
  };

  return (
    <div className="app-shell">
      <Header 
        activeRoute={activeRoute} 
        setActiveRoute={setActiveRoute}
        level={level}
        setLevel={setLevel}
        isDocMode={isDocMode}
        toggleDocMode={() => setIsDocMode(!isDocMode)}
        toggleSearch={() => setIsSearchOpen(true)}
      />

      <main style={{ minHeight: '80vh' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRoute + level}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>


      <footer className="font-mono" style={{ padding: '6rem 2rem 4rem', textAlign: 'center', opacity: 0.4, fontSize: '0.7rem', color: 'var(--encre)' }}>
        <div style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>⚖️</div>
        <div style={{ letterSpacing: '0.2em' }}>
          LE TRIBUNAL DE LA PHILO // <span style={{ color: 'var(--primary)' }}>ÉDITION EXCELLENCE 2026</span> // BUILD_9921_LAKERS_ACTIVE
        </div>
      </footer>

      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        setActiveRoute={setActiveRoute} 
      />
    </div>
  );
}

export default App;
