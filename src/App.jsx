import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Home from './components/Home';
import QuizEngine from './components/QuizEngine';
import Methode from './components/Methode';
import Anthologie from './components/Anthologie';
import SearchOverlay from './components/SearchOverlay';

function App() {
  const [activeRoute, setActiveRoute] = useState('home');
  const [level, setLevel] = useState('Terminale');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const [selectedLevel, setSelectedLevel] = useState(0);
  
  // Mock User Session for Priority Engine
  const [session, setSession] = useState({
    isNewUser: false,
    lastVisited: '2026-04-20T10:00:00Z', // Revisit within 48h
    examDate: '2026-06-15',
    progress: 35
  });

  // Adaptive logic (Coach Mode constants)
  const daysToExam = Math.ceil((new Date(session.examDate) - new Date()) / (1000 * 60 * 60 * 24));

  const renderView = () => {
    switch (activeRoute) {
      case 'home': return <Home level={level} session={session} daysToExam={daysToExam} setActiveRoute={setActiveRoute} onSelectLevel={(lvl) => { setSelectedLevel(lvl); setActiveRoute('quiz'); }} />;
      case 'quiz': return <QuizEngine level={selectedLevel} />;
      case 'anthologie': return <Anthologie />;
      case 'methode': return <Methode />;
      default: return <Home onSelectLevel={(lvl) => { setSelectedLevel(lvl); setActiveRoute('quiz'); }} />;
    }
  };

  return (
    <div className="app-shell">
      <Header 
        activeRoute={activeRoute} 
        setActiveRoute={setActiveRoute}
        level={level}
        setLevel={setLevel}
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

      {/* Mock Search Overlay (S2 Surface) */}
      <AnimatePresence>
        {isSearching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5, 2, 8, 0.9)',
              zIndex: 2000,
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '15vh',
              backdropFilter: 'blur(10px)'
            }}
            onClick={() => setIsSearching(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              className="bento-card"
              style={{ 
                width: '90%', 
                maxWidth: '600px', 
                height: 'fit-content', 
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 0 50px rgba(0,0,0,0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="font-mono text-primary coach-msg" style={{ marginBottom: '1rem', color: 'var(--primary)', fontWeight: 900 }}>TRIBUNAL_SEARCH_v3.0</div>
              <input 
                autoFocus
                placeholder="Chercher une notion (ex: La Justice)..."
                style={{
                  width: '100%',
                  padding: '1.2rem',
                  fontSize: '1.4rem',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: '2px solid var(--primary)',
                  color: 'white',
                  fontFamily: 'Libre Baskerville',
                  outline: 'none'
                }}
              />
              <div style={{ marginTop: '1.5rem', opacity: 0.5, fontSize: '0.7rem', color: 'white' }} className="font-mono uppercase tracking-widest">
                Appuyez sur ESC pour fermer
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="font-mono" style={{ padding: '6rem 2rem 4rem', textAlign: 'center', opacity: 0.4, fontSize: '0.7rem', color: 'white' }}>
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
