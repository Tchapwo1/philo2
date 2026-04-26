import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gavel, RotateCcw, ChevronRight, Info, AlertCircle, CheckCircle2, Clock, Zap, Target } from 'lucide-react';
import * as DB from '../data/db';

export default function QuizEngine({ level, onBack }) {
  // --- Engine State ---
  const [session, setSession] = useState({
    idx: 0,
    score: 0,
    streak: 0,
    mastery: 50, // 0-100 scale
    errors: [],
    startTime: Date.now()
  });

  const [phase, setPhase] = useState('thinking'); // 'thinking', 'judging', 'verdict'
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showEnd, setShowEnd] = useState(false);

  // --- Adaptive Logic: Selective Pool ---
  const fullDb = useMemo(() => {
    switch(level) {
      case 0: return DB.DB_L0;
      case 1: return DB.DB_L1;
      case 2: return DB.DB_L2;
      case 3: return DB.DB_L3;
      case 4: return DB.DB_L4;
      case 5: return DB.DB_L5;
      case 6: return DB.DB_L6;
      case 7: return DB.DB_L7;
      case 8: return DB.DB_L8;
      default: return DB.DB_L0;
    }
  }, [level]);

  // Sprint 1: Filtered pool based on mastery
  const activeItem = useMemo(() => {
    // If mastery is high, we look for Expert items, if low, Facile.
    const difficultyTarget = session.mastery > 75 ? 'Expert' : session.mastery < 40 ? 'Facile' : 'Intermédiaire';
    const matches = fullDb.filter(item => item.difficulty === difficultyTarget || !item.difficulty);
    
    // Fallback to sequential pick from fullDb if matches are thin (ensuring progress)
    return matches[session.idx % matches.length] || fullDb[session.idx % fullDb.length];
  }, [session.idx, session.mastery, fullDb]);

  const shuffledOptions = useMemo(() => {
    if (!activeItem?.options) return [];
    return [...activeItem.options].sort(() => Math.random() - 0.5);
  }, [activeItem]);

  // --- Timer Logic ---
  useEffect(() => {
    if (phase !== 'thinking' || showEnd) return;
    if (timeLeft <= 0) { handleVerdict(null, true); return; }

    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, phase, showEnd]);

  // --- Action Handlers ---
  const handleVerdict = (opt, isTimeout = false) => {
    setPhase('judging');
    setSelectedOpt(opt);
    
    const isCorrect = opt?.correct && !isTimeout;
    const elapsed = Date.now() - session.startTime;

    // Wait for "Thinking Pulse" animation (Sentient feel)
    setTimeout(() => {
      setPhase('verdict');
      
      setSession(prev => {
        const newStreak = isCorrect ? prev.streak + 1 : 0;
        const streakMultiplier = newStreak > 3 ? 1.5 : newStreak > 1 ? 1.2 : 1;
        const timeBonus = Math.max(0, (30 - (elapsed / 1000)) * 2);
        
        const gainedPoints = isCorrect ? Math.round((100 + timeBonus) * streakMultiplier) : 0;
        
        // Adaptive update: mastery adjusts based on hit/miss
        const masteryShift = isCorrect ? 5 : -8;

        return {
          ...prev,
          score: prev.score + gainedPoints,
          streak: newStreak,
          mastery: Math.min(100, Math.max(0, prev.mastery + masteryShift)),
          errors: isCorrect ? prev.errors : [...prev.errors, { item: activeItem, time: new Date() }]
        };
      });
    }, 1200); // 1.2s judging delay
  };

  const nextCase = () => {
    if (session.idx + 1 >= fullDb.length) {
      setShowEnd(true);
    } else {
      setSession(prev => ({ ...prev, idx: prev.idx + 1, startTime: Date.now() }));
      setPhase('thinking');
      setSelectedOpt(null);
      setTimeLeft(30);
    }
  };

  // --- Technical Coach Feedback Logic ---
  const getCoachFeedback = () => {
    if (phase !== 'verdict') return null;
    const isCorrect = selectedOpt?.correct;
    
    if (isCorrect) {
      return {
        violation: "RAISONNEMENT_RECEVABLE",
        analysis: "Votre verdict est linguistiquement et logiquement valide. L'argumentation respecte les paradigmes du programme.",
        tip: "Maintenez ce rythme pour débloquer les dossiers 'Expert'."
      };
    }

    return {
      violation: "RUPTURE_DE_LOGIQUE",
      analysis: activeItem.tip || "L'argumentation présentée est irrecevable. Elle repose sur une confusion sémantique ou une erreur de méthode classique.",
      tip: `Concentrez-vous sur le repère : ${activeItem.difficulty || 'FONDAMENTAL'}.`
    };
  };

  const coach = getCoachFeedback();

  if (showEnd) {
    return (
      <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bento-card" 
          style={{ 
            padding: '4rem 3rem',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(30px)',
            borderRadius: '40px',
            border: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
          }}
        >
          <div className="font-mono coach-msg" style={{ marginBottom: '2rem' }}>RAPPORT_D_INSTRUCTION // FINAL_VERDICT</div>
          <h2 className="font-display" style={{ fontSize: '4rem', color: 'white', marginBottom: '1rem' }}>Verdict Final</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '3rem 0' }}>
             <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="font-mono" style={{ fontSize: '0.7rem', opacity: 0.4, marginBottom: '1rem', fontWeight: 900 }}>SCORE_ACCUMULÉ</p>
                <div style={{ fontSize: '3.5rem', color: 'var(--primary)', fontWeight: 900, textShadow: '0 0 30px var(--primary-glow)' }}>{session.score}</div>
             </div>
             <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p className="font-mono" style={{ fontSize: '0.7rem', opacity: 0.4, marginBottom: '1rem', fontWeight: 900 }}>NIVEAU_D_AUTORITÉ</p>
                <div style={{ fontSize: '1.5rem', color: 'white', fontWeight: 700, marginTop: '1rem' }}>
                   {session.score > 400 ? "AVOCAT GÉNÉRAL" : session.score > 200 ? "COMMISSAIRE" : "STAGIAIRE"}
                </div>
             </div>
          </div>

          <p className="coach-analysis" style={{ marginBottom: '4rem', fontSize: '1.3rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto 4rem' }}>
            {session.score > 400 
              ? "L'instruction est concluante. Votre rigueur conceptuelle et votre capacité de synthèse font de vous un élément d'élite pour le Tribunal." 
              : "Le dossier reste incomplet. Vos conclusions manquent encore de cette 'étincelle dialectique' nécessaire pour verrouiller une démonstration."}
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              background: 'var(--primary)', 
              color: '#0A0510', 
              padding: '1rem 2.5rem', 
              borderRadius: '12px', 
              fontWeight: 900, 
              fontFamily: 'JetBrains Mono',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 20px var(--primary-glow)'
            }}
          >RESTART_SESSION</button>
          <button 
            onClick={onBack} 
            style={{ 
              background: 'rgba(255,255,255,0.05)', 
              color: 'white', 
              padding: '1rem 2.5rem', 
              borderRadius: '12px', 
              fontWeight: 900, 
              fontFamily: 'JetBrains Mono',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer'
            }}
          >CLOSE_CASE</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      {/* HUD (S2 Elevation) */}
      <div className="hud-container bento-card" style={{ 
        marginBottom: '2.5rem', 
        cursor: 'default',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div className="font-mono" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 900 }}>DOSSIER_{session.idx + 1}</div>
            <div style={{ 
              background: 'var(--primary)', 
              color: '#0A0510', 
              fontSize: '0.6rem', 
              padding: '2px 8px', 
              borderRadius: '4px',
              fontWeight: 900,
              boxShadow: '0 0 10px var(--primary-glow)'
            }}>{activeItem.difficulty?.toUpperCase() || 'BASE'}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} style={{ color: timeLeft < 5 ? 'var(--primary)' : 'rgba(255,255,255,0.4)' }} />
                <span className="font-mono font-black" style={{ fontSize: '1.1rem' }}>{timeLeft}s</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Target size={16} style={{ color: 'var(--primary)' }} />
                <span className="font-mono font-black" style={{ fontSize: '1.1rem' }}>{session.score}</span>
            </div>
            {session.streak > 1 && (
                <div style={{ 
                  background: 'var(--accent)', 
                  color: 'white', 
                  padding: '4px 12px', 
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontWeight: 900,
                  boxShadow: '0 0 15px var(--accent-glow)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                    <Zap size={10} fill="currentColor" /> x{session.streak}
                </div>
            )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={session.idx + phase}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -20 }}
           className={`bento-card ${phase === 'verdict' ? (selectedOpt?.correct ? 'gavel-strike' : 'case-dismissed') : ''}`}
           style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'default' }}
        >
          {phase === 'thinking' && (
            <div style={{ padding: '2rem' }}>
              <div className="coach-msg font-mono" style={{ color: 'var(--primary)', fontWeight: 900, marginBottom: '1rem' }}>INSTRUCTION_EN_COURS // N{String(level).toUpperCase()}</div>
              <h2 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '3rem', lineHeight: 1.2 }}>{activeItem.q || activeItem.subject}</h2>
              
              <div style={{ display: 'grid', gap: '1.2rem' }}>
                {shuffledOptions.map((opt, i) => (
                  <button 
                    key={i} 
                    className="bento-card" 
                    style={{ 
                      padding: '1.5rem', 
                      textAlign: 'left', 
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)'
                    }}
                    onClick={() => handleVerdict(opt)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span className="font-mono" style={{ fontSize: '0.6rem', opacity: 0.3, fontWeight: 900 }}>VERDICT_{i+1}</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 500, color: 'white' }}>{opt.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === 'judging' && (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <motion.div 
                animate={{ 
                  rotate: [-10, 10, -10],
                  scale: [1, 1.1, 1],
                  filter: ['drop-shadow(0 0 0px var(--primary))', 'drop-shadow(0 0 20px var(--primary))', 'drop-shadow(0 0 0px var(--primary))']
                }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                style={{ color: 'var(--primary)' }}
              >
                <Gavel size={80} />
              </motion.div>
              <div className="font-mono coach-msg" style={{ marginTop: '2rem', color: 'var(--primary)', fontWeight: 900, letterSpacing: '0.2em' }}>DÉLIBÉRÉ_EN_COURS...</div>
            </div>
          )}

          {phase === 'verdict' && (
            <div className="coach-feedback-box" style={{ padding: '2rem' }}>
              <div className="coach-logic-violation" style={{ 
                color: selectedOpt?.correct ? 'var(--primary)' : '#ff4d4d', 
                fontWeight: 900, 
                fontFamily: 'JetBrains Mono',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                marginBottom: '1rem'
              }}>{coach.violation}</div>
              
              <div className="coach-analysis" style={{ fontSize: '1.2rem', color: 'white', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '2rem' }}>
                {selectedOpt?.correct ? coach.analysis : coach.analysis}
              </div>
              
              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                 <p className="font-mono" style={{ fontSize: '0.7rem', opacity: 0.4, marginBottom: '0.5rem', fontWeight: 900 }}>INSTRUCTION_DU_COACH :</p>
                 <p style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.95rem' }}>{coach.tip}</p>
              </div>
              
              <button 
                onClick={nextCase} 
                className="btn-primary" 
                style={{ 
                  width: '100%', 
                  marginTop: '2.5rem', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  gap: '1rem',
                  background: 'var(--primary)',
                  color: '#0A0510',
                  border: 'none',
                  padding: '1.2rem',
                  borderRadius: '12px',
                  fontWeight: 900,
                  fontFamily: 'JetBrains Mono',
                  boxShadow: '0 10px 30px var(--primary-glow)',
                  cursor: 'pointer'
                }}
              >
                PASSER AU DOSSIER SUIVANT <ChevronRight size={18} />
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
