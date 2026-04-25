import React from 'react';
import { motion } from 'framer-motion';
import { Gavel, Clock, Trophy, BookOpen, Zap, Target, Star, AlertCircle, PlayCircle } from 'lucide-react';

export default function Home({ level, session, daysToExam, setActiveRoute }) {
  // 🧠 Rule-based Priority Logic
  const getTopWidget = () => {
    if (session.isNewUser) {
      return {
        type: 'L',
        title: 'Bienvenue au Tribunal',
        desc: "Commencez votre formation à l'excellence. Découvrez comment juger vos propres arguments.",
        cta: 'Commencer le parcours',
        route: 'methode',
        coach: 'COMPTE_CRÉÉ_RÉCEMMENT',
        icon: <Trophy size={40} />
      };
    }
    
    // Priority 2: Returning User (< 48h)
    const hoursSinceLastVisit = (new Date() - new Date(session.lastVisited)) / (1000 * 60 * 60);
    if (hoursSinceLastVisit < 48) {
      return {
        type: 'M',
        title: 'Reprendre : La Méthode',
        desc: "Continuer l'apprentissage de la dissertation dialectique.",
        cta: 'Reprendre',
        route: 'methode',
        coach: 'DERNIÈRE_SESSION_RÉCENTE',
        icon: <PlayCircle size={32} />
      };
    }

    // Priority 3: Urgency
    if (daysToExam < 30) {
      return {
        type: 'M',
        title: 'Priorité Bac Philo',
        desc: "Focus intensif sur les thèmes probables et les annales.",
        cta: 'Réviser maintenant',
        route: 'quiz',
        coach: 'EXAMEN_DANS_MOINS_DE_30_JOURS',
        icon: <AlertCircle size={32} />
      };
    }

    return null;
  };

  const topWidget = getTopWidget();

  const stepperItems = [
    { label: 'Sélectionner', desc: 'Champ de bataille', icon: <Target size={24} />, progress: '0%' },
    { label: 'Comprendre', desc: 'Concepts clés', icon: <BookOpen size={24} />, progress: '33%' },
    { label: 'Pratiquer', desc: 'Rendre le Verdict', icon: <Gavel size={24} />, progress: '66%' },
    { label: 'Réussir', desc: 'Excellence Bac', icon: <Trophy size={24} />, progress: '100%' },
  ];

  const notions = [
    { title: 'La Justice', type: 'COURS', time: '15min', diff: 'Intermédiaire' },
    { title: 'Le Sujet', type: 'FICHE', time: '5min', diff: 'Facile' },
    { title: 'L\'Art', type: 'QUIZ', time: '20min', diff: 'Expert' },
    { title: 'La Vérité', type: 'COURS', time: '45min', diff: 'Expert' },
  ];

  return (
    <div style={{ padding: '2rem 1rem' }}>
      {/* 🏛️ The Command Center Header */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', marginBottom: '3rem', padding: '0 1rem' }}>
        <div className="font-mono coach-msg" style={{ marginBottom: '0.5rem' }}>SYSTEM_STATUS // COMMAND_CENTER_v3.2</div>
        <h1 className="font-display">Votre Plateau de <em className="text-primary italic">Révision</em></h1>
      </section>

      {/* 🍱 Bento Grid */}
      <div className="bento-grid">
        {/* Adaptive Spotlight (Priority Slot) */}
        {topWidget && (
          <div 
            className={`bento-card ${topWidget.type === 'L' ? 'card-l' : 'card-m'}`}
            onClick={() => setActiveRoute(topWidget.route)}
          >
            <div className="coach-msg font-mono uppercase">MODÈLE_COACH // {topWidget.coach}</div>
            <div className="tag-hub">
               <span className="tag tag-vibrant">PRIORITÉ</span>
               <span className="tag">{level.toUpperCase()}</span>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginTop: '1rem' }}>
               <div className="text-primary">{topWidget.icon}</div>
               <div>
                  <h2 className="font-display" style={{ fontSize: topWidget.type === 'L' ? '3rem' : '2rem' }}>{topWidget.title}</h2>
                  <p style={{ opacity: 0.7, maxWidth: '40ch', marginTop: '0.5rem' }}>{topWidget.desc}</p>
               </div>
            </div>
            <div className="meta-footer">
               <span className="font-mono">{topWidget.cta} &rarr;</span>
            </div>
          </div>
        )}

        {/* Pair of S-Cards (Always paired) */}
        <div className="bento-card card-s" style={{ 
          background: 'var(--primary)', 
          color: '#0A0510',
          boxShadow: '0 0 40px var(--primary-glow)'
        }}>
          <div className="font-mono" style={{ fontSize: '0.6rem', opacity: 0.8, fontWeight: 900 }}>COMPTE_À_REBOURS</div>
          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'Playfair Display', lineHeight: 1 }}>J-{daysToExam}</div>
            <div className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 900 }}>AVANT LE BAC 2026</div>
          </div>
        </div>

        <div className="bento-card card-s">
          <div className="font-mono coach-msg">PROGRESSION_ACTUELLE</div>
          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'Playfair Display', lineHeight: 1 }}>{session.progress}%</div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', marginTop: '10px', overflow: 'hidden' }}>
               <div style={{ width: `${session.progress}%`, height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary-glow)' }}></div>
            </div>
          </div>
        </div>

        {/* Notions Fill (M-Cards) */}
        {notions.map((n, i) => (
          <div key={i} className="bento-card card-m">
            <div className="tag-hub">
              <span className="tag">{n.type}</span>
              <span className={`tag ${n.diff === 'Expert' ? 'tag-vibrant' : ''}`}>{n.diff}</span>
            </div>
            <h3 className="font-display" style={{ marginTop: '0.5rem', fontSize: '1.5rem' }}>{n.title}</h3>
            <div className="meta-footer">
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={12} /> {n.time}
              </span>
              <span>CONSULTER &rarr;</span>
            </div>
          </div>
        ))}
      </div>

      {/* 🎓 The Pedagogical Stepper */}
      <section style={{ maxWidth: '1400px', margin: '6rem auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="font-display">Votre Itinéraire vers <em className="text-primary italic">l'Excellence</em></h2>
          <p className="font-mono coach-msg" style={{ marginTop: '0.5rem' }}>PARCOURS_COGNITIF // 4_ÉTAPES_CLEFS</p>
        </div>

        <div className="pedagogical-stepper">
          <div className="step-line"></div>
          {stepperItems.map((step, i) => (
            <div key={i} className={`step ${i <= 1 ? 'active' : ''}`}> {/* Mock active state for first 2 steps */}
              <div className="step-circle">
                 {step.icon}
              </div>
              <div className="step-label">{step.label}</div>
              <div style={{ fontSize: '0.6rem', opacity: 0.5, fontStyle: 'italic' }}>{step.desc}</div>
              <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 900, marginTop: '5px' }}>{step.progress}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ⚖️ Hero-Style discovery block */}
      <section style={{ 
        maxWidth: '1400px', 
        margin: '6rem auto', 
        padding: '5rem 2rem', 
        border: '1px solid rgba(255,255,255,0.1)', 
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(30px)',
        borderRadius: '32px',
        boxShadow: '0 20px 80px rgba(0,0,0,0.5)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Ambient Glow */}
        <div style={{ 
          position: 'absolute', 
          top: '-50%', 
          left: '-50%', 
          width: '200%', 
          height: '200%', 
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          zIndex: -1
        }}></div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            background: 'var(--primary)', 
            padding: '20px', 
            borderRadius: '24px', 
            boxShadow: '0 0 30px var(--primary-glow)',
            color: '#0A0510'
          }}>
            <Zap size={48} fill="currentColor" />
          </div>
        </div>
        <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}>Vous avez un doute sur un sujet ?</h2>
        <p style={{ maxWidth: '600px', margin: '2rem auto', fontSize: '1.25rem', opacity: 0.6, lineHeight: 1.8 }}>
          Soumettez vos arguments à Simone, notre IA greffière, pour un examen minute de votre dialectique.
        </p>
        <button className="btn-primary" style={{ 
          background: 'var(--primary)', 
          color: '#0A0510', 
          padding: '1.2rem 4rem', 
          borderRadius: '12px',
          fontFamily: 'JetBrains Mono', 
          fontWeight: 900, 
          fontSize: '1rem',
          boxShadow: '0 10px 30px var(--primary-glow)', 
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}>
          OUVRIR UN DOSSIER CORRIGÉ &rarr;
        </button>
      </section>
    </div>
  );
}
