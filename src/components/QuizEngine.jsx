import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gavel, RotateCcw, ChevronRight, Info, AlertCircle, CheckCircle2, Clock, Zap, Target, Volume2, VolumeX } from 'lucide-react';
import AudioService from '../services/AudioService';
import * as DB from '../data/db';

export default function QuizEngine({ level, onBack, onComplete }) {
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
  
  // Interaction State for L8
  const [tension, setTension] = useState(0); // -10 to 10 scale

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

  const activeItem = useMemo(() => {
    const difficultyTarget = session.mastery > 75 ? 'Expert' : session.mastery < 40 ? 'Facile' : 'Intermédiaire';
    const matches = fullDb.filter(item => item.difficulty === difficultyTarget || !item.difficulty);
    return matches[session.idx % matches.length] || fullDb[session.idx % fullDb.length];
  }, [session.idx, session.mastery, fullDb]);

  const shuffledOptions = useMemo(() => {
    if (!activeItem?.options) return [];
    return [...activeItem.options].sort(() => Math.random() - 0.5);
  }, [activeItem]);

  // --- Action Handlers ---
  const handleVerdict = (opt, isTimeout = false) => {
    setPhase('judging');
    setSelectedOpt(opt);
    
    const isCorrect = opt?.correct && !isTimeout;
    const elapsed = Date.now() - session.startTime;

    if (isCorrect) {
      AudioService.play('gavel', 0.8);
    }

    setTimeout(() => {
      setPhase('verdict');
      
      setSession(prev => {
        const newStreak = isCorrect ? prev.streak + 1 : 0;
        const streakMultiplier = newStreak > 3 ? 1.5 : newStreak > 1 ? 1.2 : 1;
        const timeBonus = Math.max(0, (30 - (elapsed / 1000)) * 2);
        const gainedPoints = isCorrect ? Math.round((100 + timeBonus) * streakMultiplier) : 0;
        const masteryShift = isCorrect ? 5 : -8;

        return {
          ...prev,
          score: prev.score + gainedPoints,
          streak: newStreak,
          mastery: Math.min(100, Math.max(0, prev.mastery + masteryShift)),
          errors: isCorrect ? prev.errors : [...prev.errors, { item: activeItem, time: new Date() }]
        };
      });
    }, 1200);
  };

  const nextCase = () => {
    if (session.idx + 1 >= fullDb.length) {
      if (onComplete) onComplete(session.score);
      setShowEnd(true);
    } else {
      setSession(prev => ({ ...prev, idx: prev.idx + 1, startTime: Date.now() }));
      setPhase('thinking');
      setSelectedOpt(null);
      setTimeLeft(30);
      setTension(0);
      AudioService.play('paper', 0.4);
    }
  };

  const coach = useMemo(() => {
    if (phase !== 'verdict') return null;
    const isCorrect = selectedOpt?.correct;
    
    return isCorrect ? {
      violation: "RAISONNEMENT_RECEVABLE",
      analysis: "Votre verdict est linguistiquement et logiquement valide. L'argumentation respecte les paradigmes du programme.",
      tip: "Maintenez ce rythme pour débloquer les dossiers 'Expert'."
    } : {
      violation: "RUPTURE_DE_LOGIQUE",
      analysis: activeItem.tip || "L'argumentation présentée est irrecevable. Elle repose sur une confusion sémantique ou une erreur de méthode classique.",
      tip: `Concentrez-vous sur le repère : ${activeItem.difficulty || 'FONDAMENTAL'}.`,
      related: activeItem.related // Cross-reference target
    };
  }, [phase, selectedOpt, activeItem]);

  // --- Render Case File (Level 8) ---
  if (level === 8) {
    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="font-mono coach-msg" style={{ marginBottom: '0.5rem' }}>SIMULATION_TOTALE // DOSSIER_N{session.idx + 1}</div>
            <h2 className="font-display" style={{ fontSize: '2.5rem', color: 'var(--encre)' }}>L'Instruction du <em style={{ color: 'var(--primary)' }}>Procès</em></h2>
          </div>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--encre-dim)', cursor: 'pointer', fontFamily: 'JetBrains Mono', fontSize: '0.7rem', fontWeight: 900 }}>[ FERMER_LE_DOSSIER ]</button>
        </header>

        <motion.div 
          key={session.idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bento-card" 
          style={{ padding: '3rem', borderLeft: '4px solid var(--primary)', background: 'var(--s1-card)' }}
        >
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ fontFamily: 'Libre Baskerville', fontSize: '1.75rem', color: 'var(--encre)', marginBottom: '1.5rem', lineHeight: 1.4 }}>{activeItem.subject}</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <span className="tag tag-vibrant">BAC_PHILO_2026</span>
              <span className="tag">NIVEAU_EXPERT</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
            <div className="space-y-12">
              <section>
                <h4 style={{ color: 'var(--primary)', fontSize: '0.75rem', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <Zap size={16} /> L'Amorce (Hook)
                </h4>
                <p style={{ color: 'var(--encre)', fontStyle: 'italic', fontSize: '1.1rem', lineHeight: 1.7, background: 'rgba(var(--primary-rgb), 0.05)', padding: '1.5rem', borderRadius: '12px' }}>{activeItem.hook}</p>
              </section>

              <section>
                <h4 style={{ color: 'var(--primary)', fontSize: '0.75rem', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <AlertCircle size={16} /> Le Paradoxe (Verrou)
                </h4>
                <p style={{ color: 'var(--encre)', fontSize: '1.05rem', lineHeight: 1.7 }}>{activeItem.paradox}</p>
              </section>

              {/* TENSION SCALE (Suggestion 4) */}
              <section style={{ padding: '2.5rem', background: 'var(--s2-float)', borderRadius: '24px', textAlign: 'center' }}>
                <h4 style={{ color: 'var(--primary)', fontSize: '0.7rem', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', marginBottom: '2rem' }}>Balance des Arguments (Tension Scale)</h4>
                <div style={{ position: 'relative', height: '4px', background: 'var(--encre-dim)', opacity: 0.2, margin: '2rem 0' }}>
                   <motion.div 
                     animate={{ x: `${tension * 5}%` }}
                     style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '50%', position: 'absolute', top: '-18px', left: 'calc(50% - 20px)', boxShadow: '0 0 20px var(--primary-glow)', display: 'flex', alignItems: 'center', justifySelf: 'center' }}>
                      <Target size={20} color="black" style={{ margin: 'auto' }} />
                   </motion.div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
                   <button onClick={() => setTension(prev => Math.max(-10, prev - 2))} style={{ background: 'none', border: '1px solid var(--encre-dim)', padding: '0.5rem 1rem', borderRadius: '8px', color: 'var(--encre)', fontSize: '0.7rem', cursor: 'pointer' }}>THÈSE A</button>
                   <button onClick={() => setTension(prev => Math.min(10, prev + 2))} style={{ background: 'none', border: '1px solid var(--encre-dim)', padding: '0.5rem 1rem', borderRadius: '8px', color: 'var(--encre)', fontSize: '0.7rem', cursor: 'pointer' }}>THÈSE B</button>
                </div>
                <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--encre-dim)', fontStyle: 'italic' }}>{activeItem.duel}</p>
              </section>
            </div>

            <aside>
              <section className="bento-card" style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', height: '100%' }}>
                <h4 style={{ color: 'var(--primary)', fontSize: '0.75rem', fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <Info size={16} /> Prise de Position
                </h4>
                <p style={{ color: 'var(--encre)', fontSize: '1rem', lineHeight: 1.7 }}>{activeItem.standing}</p>
                
                {/* CROSS-REFERENCE ENGINE (Suggestion 3) */}
                {activeItem.related && (
                  <div style={{ marginTop: '3rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
                    <p style={{ fontSize: '0.7rem', fontFamily: 'JetBrains Mono', color: 'var(--primary)', marginBottom: '1rem' }}>RECHERCHES_ASSOCIÉES</p>
                    <motion.button 
                      whileHover={{ x: 5 }}
                      onClick={() => setSession(prev => ({ ...prev, idx: (activeItem.related - 1) % fullDb.length }))}
                      className="tag tag-vibrant" 
                      style={{ cursor: 'pointer', width: '100%', padding: '1rem', textAlign: 'left', border: 'none', borderRadius: '8px' }}
                    >
                       Consulter le dossier #{activeItem.related}
                    </motion.button>
                  </div>
                )}
              </section>
            </aside>
          </div>

          <footer style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 20 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.6, color: 'var(--encre)' }}>
                <Clock size={16} />
                <span style={{ fontSize: '0.7rem', fontFamily: 'JetBrains Mono' }}>TEMPS_DE_LECTURE_ESTIME : 4min</span>
             </div>
             <motion.button 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               onClick={(e) => { 
                 e.stopPropagation(); 
                 // Give some points for reading if it's the last one
                 if (session.idx + 1 >= fullDb.length) {
                   setSession(prev => ({ ...prev, score: prev.score + 50 }));
                 }
                 nextCase(); 
               }}
               style={{ 
                 background: 'var(--primary)', 
                 color: 'var(--bg-page)', 
                 border: 'none', 
                 padding: '1rem 3rem', 
                 borderRadius: '12px', 
                 fontFamily: 'JetBrains Mono', 
                 fontWeight: 900, 
                 cursor: 'pointer',
                 display: 'flex',
                 alignItems: 'center',
                 gap: '1rem',
                 boxShadow: '0 8px 25px var(--primary-glow)',
                 pointerEvents: 'auto'
               }}
             >
               {session.idx + 1 >= fullDb.length ? 'TERMINER LA SESSION' : 'DOSSIER SUIVANT'} <ChevronRight size={18} />
             </motion.button>
          </footer>
        </motion.div>
      </div>
    );
  }

  // Rest of QuizEngine logic remains mostly same but using var(--encre) etc.
  const engineClassName = `bento-card ${phase === 'verdict' ? (selectedOpt?.correct ? 'gavel-strike' : 'case-dismissed') : ''}`;

  if (showEnd) {
    const finalRank = session.score > 400 ? "AVOCAT GÉNÉRAL" : session.score > 200 ? "COMMISSAIRE" : "STAGIAIRE";
    return (
      <div style={{ maxWidth: '800px', margin: '2rem auto' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bento-card" style={{ padding: '4rem 3rem', textAlign: 'center' }}>
          <h2 className="font-display" style={{ fontSize: '4rem', color: 'var(--encre)', marginBottom: '1rem' }}>Verdict Final</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '3rem 0' }}>
             <div className="bento-card" style={{ padding: '2rem' }}>
                <p className="font-mono" style={{ fontSize: '0.7rem', opacity: 0.4, marginBottom: '1rem', fontWeight: 900 }}>SCORE_ACCUMULÉ</p>
                <div style={{ fontSize: '3.5rem', color: 'var(--primary)', fontWeight: 900 }}>{session.score}</div>
             </div>
             <div className="bento-card" style={{ padding: '2rem' }}>
                <p className="font-mono" style={{ fontSize: '0.7rem', opacity: 0.4, marginBottom: '1rem', fontWeight: 900 }}>NIVEAU_D_AUTORITÉ</p>
                <div style={{ fontSize: '1.5rem', color: 'var(--encre)', fontWeight: 700 }}>{finalRank}</div>
             </div>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button onClick={() => window.location.reload()} className="btn-primary" style={{ background: 'var(--primary)', color: 'white', padding: '1rem 2rem', borderRadius: '12px', border: 'none', cursor: 'pointer' }}>RESTART_SESSION</button>
            <button onClick={onBack} style={{ padding: '1rem 2rem', borderRadius: '12px', border: '1px solid var(--encre-dim)', background: 'none', color: 'var(--encre)', cursor: 'pointer' }}>CLOSE_CASE</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
      {/* HUD (S2 Elevation) */}
      <div className="hud-container bento-card" style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--encre-dim)', fontWeight: 900 }}>DOSSIER_{session.idx + 1}</div>
            <div className="tag tag-vibrant">{activeItem.difficulty?.toUpperCase() || 'BASE'}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--encre)' }}>
                <Clock size={16} />
                <span className="font-mono">{timeLeft}s</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--encre)' }}>
                <Target size={16} />
                <span className="font-mono">{session.score}</span>
            </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={session.idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className={engineClassName} style={{ padding: '3rem' }}>
          <div style={{ marginBottom: '3rem' }}>
             <p className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--primary)', marginBottom: '1rem', letterSpacing: '0.2em' }}>INSTRUCTION_EN_COURS</p>
             <h2 style={{ fontFamily: 'Libre Baskerville', fontSize: '1.85rem', color: 'var(--encre)', lineHeight: 1.4 }}>{activeItem.q}</h2>
          </div>

          <div style={{ display: 'grid', gap: '1.2rem' }}>
             {shuffledOptions.map((opt, i) => (
               <button
                 key={i}
                 disabled={phase !== 'thinking'}
                 onClick={() => handleVerdict(opt)}
                 style={{
                   background: selectedOpt === opt ? 'var(--primary-glow)' : 'var(--s1-card)',
                   border: `1px solid ${selectedOpt === opt ? 'var(--primary)' : 'var(--glass-border)'}`,
                   padding: '1.5rem', borderRadius: '16px', color: 'var(--encre)', textAlign: 'left', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1.5rem'
                 }}
               >
                 <div className="step-circle" style={{ width: '32px', height: '32px', fontSize: '0.8rem', background: selectedOpt === opt ? 'var(--primary)' : 'none', color: selectedOpt === opt ? 'white' : 'var(--encre)' }}>{String.fromCharCode(65 + i)}</div>
                 {opt.text}
               </button>
             ))}
          </div>

          {phase === 'verdict' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="coach-feedback-box">
              <div className="coach-logic-violation">{coach.violation}</div>
              <p className="coach-analysis">{coach.analysis}</p>
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '0.8rem' }}>
                 <Info size={14} /> {coach.tip}
              </div>
              
              {/* CROSS-REFERENCE LINK */}
              {coach.related && (
                <button className="tag tag-vibrant" style={{ marginTop: '1.5rem', cursor: 'pointer', width: '100%' }}>
                   Approfondir : {coach.related}
                </button>
              )}

              <button onClick={nextCase} className="btn-primary" style={{ marginTop: '2rem', width: '100%', background: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 900 }}>NEXT_CASE</button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
