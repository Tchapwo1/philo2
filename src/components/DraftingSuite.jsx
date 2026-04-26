import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Send, ChevronLeft, Info, Sparkles, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';
import AudioService from '../services/AudioService';
import * as DB from '../data/db';

export default function DraftingSuite({ onBack, onComplete }) {
  const [caseIndex, setCaseIndex] = useState(0);
  const [draft, setDraft] = useState('');
  const [phase, setPhase] = useState('DRAFTING'); // DRAFTING, ANALYZING, FEEDBACK
  const [feedback, setFeedback] = useState(null);
  
  const currentCase = DB.DB_L9[caseIndex];

  useEffect(() => {
    AudioService.play('paper', 0.5);
  }, [caseIndex]);

  const analyzeDraft = () => {
    setPhase('ANALYZING');
    AudioService.play('paper', 0.3);

    // Simulated "Sentient" Analysis
    setTimeout(() => {
      const lowerDraft = draft.toLowerCase();
      const foundKeywords = currentCase.keywords.filter(k => lowerDraft.includes(k.toLowerCase()));
      const coverage = (foundKeywords.length / currentCase.keywords.length) * 100;
      
      let assessment = "";
      let score = 0;

      if (coverage > 80) {
        assessment = "EXCELLENCE. Votre maîtrise conceptuelle est digne d'un Procureur. L'enjeu est parfaitement saisi.";
        score = 50;
      } else if (coverage > 40) {
        assessment = "INSTRUCTION VALIDE. Les repères sont présents, mais la tension dialectique pourrait être plus nerveuse.";
        score = 25;
      } else {
        assessment = "RUPTURE DE LOGIQUE. Le dossier manque de consistance. Simone suggère de revoir les dossiers de l'Anthologie.";
        score = 5;
      }

      setFeedback({
        coverage,
        foundKeywords,
        assessment,
        score
      });
      setPhase('FEEDBACK');
      AudioService.play('gavel', 0.6);
    }, 2000);
  };

  const handleComplete = () => {
    onComplete(feedback.score);
    if (caseIndex < DB.DB_L9.length - 1) {
      setCaseIndex(prev => prev + 1);
      setDraft('');
      setPhase('DRAFTING');
      setFeedback(null);
    } else {
      onBack();
    }
  };

  return (
    <div className="simulation-suite" style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--encre-dim)', cursor: 'pointer' }}>
          <ChevronLeft />
        </button>
        <div>
          <h2 className="font-display" style={{ fontSize: '1.5rem', color: 'var(--encre)' }}>SUITE DE RÉDACTION</h2>
          <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--primary)', letterSpacing: '0.2em' }}>NIVEAU 9 // SIMULATION DE PRODUCTION</div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {phase === 'DRAFTING' && (
          <motion.div
            key="drafting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="bento-card" style={{ marginBottom: '2rem', cursor: 'default' }}>
              <div className="tag-hub">
                <span className="tag tag-vibrant">{currentCase.type.toUpperCase()}</span>
                <span className="tag">DOSSIER #{currentCase.id}</span>
              </div>
              <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{currentCase.subject}</h1>
              <p className="font-mono" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>
                <Info size={14} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                TACHE : {currentCase.task}
              </p>
              <p style={{ color: 'var(--encre-dim)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                " {currentCase.simoneHints} " — Simone
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Commencez votre rédaction ici..."
                style={{
                  width: '100%',
                  minHeight: '300px',
                  background: 'var(--s1-card)',
                  border: '2px solid var(--glass-border)',
                  borderRadius: '16px',
                  padding: '2rem',
                  color: 'var(--encre)',
                  fontFamily: 'serif',
                  fontSize: '1.2rem',
                  lineHeight: '1.8',
                  resize: 'none',
                  outline: 'none',
                  boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.2)'
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={analyzeDraft}
                disabled={draft.length < 20}
                style={{
                  position: 'absolute',
                  bottom: '2rem',
                  right: '2rem',
                  background: 'var(--primary)',
                  color: '#0A0510',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: draft.length < 20 ? 'not-allowed' : 'pointer',
                  opacity: draft.length < 20 ? 0.5 : 1
                }}
              >
                <Send size={18} />
                SOUMETTRE À L'INSTRUCTION
              </motion.button>
            </div>
          </motion.div>
        )}

        {phase === 'ANALYZING' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bento-card"
            style={{ padding: '6rem', textAlign: 'center', cursor: 'default' }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              style={{ marginBottom: '2rem' }}
            >
              <Sparkles size={48} color="var(--primary)" />
            </motion.div>
            <h2 className="font-mono" style={{ letterSpacing: '0.3em' }}>INSTRUCTION EN COURS...</h2>
            <p style={{ opacity: 0.6, marginTop: '1rem' }}>Simone analyse la structure de votre argumentation.</p>
          </motion.div>
        )}

        {phase === 'FEEDBACK' && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="coach-feedback-box" style={{ padding: '3rem', borderLeftWidth: '12px' }}>
              <div className="coach-logic-violation" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
                RAPPORT D'INSTRUCTION PHILOSOPHIQUE
              </div>
              
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ flex: 1 }}>
                  <p className="coach-analysis" style={{ fontSize: '1.4rem', marginBottom: '2rem' }}>
                    {feedback.assessment}
                  </p>
                  
                  <div style={{ marginBottom: '2rem' }}>
                    <div className="font-mono" style={{ fontSize: '0.7rem', opacity: 0.6, marginBottom: '0.5rem' }}>MOTS-CLÉS DÉTECTÉS</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {currentCase.keywords.map(kw => (
                        <span key={kw} style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          background: feedback.foundKeywords.includes(kw) ? 'var(--primary-glow)' : 'rgba(0,0,0,0.1)',
                          border: `1px solid ${feedback.foundKeywords.includes(kw) ? 'var(--primary)' : 'var(--glass-border)'}`,
                          color: feedback.foundKeywords.includes(kw) ? 'var(--primary)' : 'var(--encre-dim)',
                          fontSize: '0.7rem',
                          fontFamily: 'JetBrains Mono'
                        }}>
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ width: '200px', textAlign: 'center' }}>
                  <div style={{ 
                    width: '100px', 
                    height: '100px', 
                    borderRadius: '50%', 
                    border: '4px solid var(--primary)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>+{feedback.score}</span>
                    <span style={{ fontSize: '0.6rem', opacity: 0.6 }}>POINTS</span>
                  </div>
                  <div className="tag tag-vibrant">RANG : {feedback.score > 40 ? 'PROCUREUR' : 'STAGIAIRE'}</div>
                </div>
              </div>

              <div className="bento-card" style={{ background: 'rgba(var(--primary-rgb), 0.05)', cursor: 'default' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                  <BookOpen size={18} />
                  <span className="font-mono" style={{ fontSize: '0.8rem', fontWeight: 900 }}>LE MODÈLE DE SIMONE</span>
                </div>
                <p style={{ fontFamily: 'serif', fontSize: '1.1rem', fontStyle: 'italic', opacity: 0.8 }}>
                  "{currentCase.masterpiece}"
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                <button
                  onClick={() => setPhase('DRAFTING')}
                  className="font-mono"
                  style={{
                    flex: 1,
                    background: 'none',
                    border: '1px solid var(--encre)',
                    padding: '1rem',
                    color: 'var(--encre)',
                    borderRadius: '12px',
                    fontWeight: 900,
                    cursor: 'pointer'
                  }}
                >
                  AMENDER LE DOSSIER
                </button>
                <button
                  onClick={handleComplete}
                  className="font-mono"
                  style={{
                    flex: 2,
                    background: 'var(--encre)',
                    border: 'none',
                    padding: '1rem',
                    color: 'var(--bg-page)',
                    borderRadius: '12px',
                    fontWeight: 900,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem'
                  }}
                >
                  DOSSIER SUIVANT
                  <CheckCircle2 size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
