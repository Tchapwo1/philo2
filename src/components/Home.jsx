import React from 'react';
import { motion } from 'framer-motion';
import { Gavel, Clock, Trophy, BookOpen, Zap, Target, Star, AlertCircle, PlayCircle } from 'lucide-react';
import LevelSelection from './LevelSelection';

export default function Home({ stats, daysToExam, setActiveRoute, onSelectLevel }) {
  // 🧠 Rule-based Priority Logic
  const getTopWidget = () => {
    if (stats.casesClosed === 0) {
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
    
    // Priority 2: High Performer
    if (stats.totalScore > 500) {
      return {
        type: 'M',
        title: 'Dossiers Experts',
        desc: "Votre autorité est reconnue. Les dossiers complexes de Simulation Totale vous attendent.",
        cta: 'Accéder au Niveau 8',
        route: 'quiz',
        level: 8,
        coach: 'AUTORITÉ_SUPÉRIEURE_DÉTECTÉE',
        icon: <Star size={32} />
      };
    }

    // Default: Continue Method
    return {
      type: 'M',
      title: 'Reprendre l\'Instruction',
      desc: "Affinez votre rigueur dialectique dans le prétoire.",
      cta: 'Continuer',
      route: 'methode',
      coach: 'DOSSIERS_EN_ATTENTE',
      icon: <PlayCircle size={32} />
    };
  };

  const topWidget = getTopWidget();

  const stepperItems = [
    { label: 'Sélectionner', desc: 'Champ de bataille', icon: <Target size={24} />, progress: stats.casesClosed > 0 ? '100%' : '0%' },
    { label: 'Comprendre', desc: 'Concepts clés', icon: <BookOpen size={24} />, progress: stats.casesClosed > 2 ? '100%' : '33%' },
    { label: 'Pratiquer', desc: 'Rendre le Verdict', icon: <Gavel size={24} />, progress: stats.casesClosed > 5 ? '100%' : '0%' },
    { label: 'Réussir', desc: 'Excellence Bac', icon: <Trophy size={24} />, progress: stats.casesClosed > 10 ? '100%' : '0%' },
  ];

  const getRank = (score) => {
    if (score > 1000) return "PROCUREUR";
    if (score > 500) return "AVOCAT GÉNÉRAL";
    if (score > 200) return "COMMISSAIRE";
    return "STAGIAIRE";
  };

  return (
    <div style={{ padding: '2rem 1rem' }}>
      {/* 🏛️ The Command Center Header */}
      <section style={{ maxWidth: '1400px', margin: '0 auto', marginBottom: '3rem', padding: '0 1rem' }}>
        <div className="font-mono coach-msg" style={{ marginBottom: '0.5rem' }}>SYSTEM_STATUS // COMMAND_CENTER_v3.2</div>
        <h1 className="font-display" style={{ color: 'var(--encre)' }}>Votre Plateau de <em style={{ color: 'var(--primary)' }} className="italic">Révision</em></h1>
      </section>

      {/* 🍱 Bento Grid */}
      <div className="bento-grid">
        {/* Adaptive Spotlight (Priority Slot) */}
        {topWidget && (
          <div 
            className={`bento-card ${topWidget.type === 'L' ? 'card-l' : 'card-m'}`}
            onClick={() => {
              if (topWidget.level !== undefined) onSelectLevel(topWidget.level);
              setActiveRoute(topWidget.route);
            }}
          >
            <div className="coach-msg font-mono uppercase">MODÈLE_COACH // {topWidget.coach}</div>
            <div className="tag-hub">
               <span className="tag tag-vibrant">PRIORITÉ</span>
               <span className="tag">{getRank(stats.totalScore)}</span>
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginTop: '1rem' }}>
               <div style={{ color: 'var(--primary)' }}>{topWidget.icon}</div>
               <div>
                  <h2 className="font-display" style={{ fontSize: topWidget.type === 'L' ? '3rem' : '2rem', color: 'var(--encre)' }}>{topWidget.title}</h2>
                  <p style={{ opacity: 0.7, maxWidth: '40ch', marginTop: '0.5rem', color: 'var(--encre)' }}>{topWidget.desc}</p>
               </div>
            </div>
            <div className="meta-footer">
               <span className="font-mono" style={{ color: 'var(--encre)' }}>{topWidget.cta} &rarr;</span>
            </div>
          </div>
        )}

        {/* Justice Dashboard (S-Cards) */}
        <div className="bento-card card-s" style={{ 
          background: 'var(--primary)', 
          color: '#0A0510',
          boxShadow: '0 0 40px var(--primary-glow)'
        }}>
          <div className="font-mono" style={{ fontSize: '0.6rem', opacity: 0.8, fontWeight: 900 }}>JUSTICE_SCORE</div>
          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'Playfair Display', lineHeight: 1 }}>{stats.totalScore}</div>
            <div className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 900 }}>POINTS D'AUTORITÉ</div>
          </div>
        </div>

        <div className="bento-card card-s" style={{ background: 'var(--s1-card)' }}>
          <div className="font-mono coach-msg">DOSSIERS_CLOS</div>
          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, fontFamily: 'Playfair Display', lineHeight: 1, color: 'var(--encre)' }}>{stats.casesClosed}</div>
            <div style={{ width: '100%', height: '6px', background: 'var(--glass-border)', borderRadius: '10px', marginTop: '10px', overflow: 'hidden' }}>
               <div style={{ width: `${Math.min(100, stats.casesClosed * 10)}%`, height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary-glow)' }}></div>
            </div>
          </div>
        </div>

        {/* Dynamic Mission Cards */}
        <div className="bento-card card-m" style={{ background: 'var(--s1-card)' }}>
          <div className="tag-hub">
            <span className="tag">MISSION</span>
            <span className="tag tag-vibrant">IMPORTANT</span>
          </div>
          <h3 className="font-display" style={{ marginTop: '0.5rem', fontSize: '1.5rem', color: 'var(--encre)' }}>Le Bac Approche</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--encre-dim)', marginTop: '0.5rem' }}>J-{daysToExam} avant le verdict final de l'Education Nationale.</p>
          <div className="meta-footer">
            <span style={{ color: 'var(--encre)' }}>CONCENTRATION &rarr;</span>
          </div>
        </div>

        <div className="bento-card card-m" style={{ background: 'var(--s1-card)' }}>
          <div className="tag-hub">
            <span className="tag">RANG</span>
          </div>
          <h3 className="font-display" style={{ marginTop: '0.5rem', fontSize: '1.5rem', color: 'var(--encre)' }}>{getRank(stats.totalScore)}</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--encre-dim)', marginTop: '0.5rem' }}>
            {stats.totalScore > 500 ? "Vous dominez le prétoire." : "Continuez l'instruction pour grimper les échelons."}
          </p>
        </div>
      </div>

      {/* 🎓 The Pedagogical Stepper */}
      <section style={{ maxWidth: '1400px', margin: '6rem auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="font-display" style={{ color: 'var(--encre)' }}>Votre Itinéraire vers <em style={{ color: 'var(--primary)' }} className="italic">l'Excellence</em></h2>
          <p className="font-mono coach-msg" style={{ marginTop: '0.5rem' }}>PARCOURS_COGNITIF // 4_ÉTAPES_CLEFS</p>
        </div>

        <div className="pedagogical-stepper">
          <div className="step-line" style={{ background: 'var(--glass-border)' }}></div>
          {stepperItems.map((step, i) => (
            <div key={i} className={`step ${parseInt(step.progress) >= 100 ? 'active' : ''}`}>
              <div className="step-circle" style={{ 
                background: parseInt(step.progress) >= 100 ? 'var(--primary)' : 'var(--s2-float)',
                color: parseInt(step.progress) >= 100 ? 'black' : 'var(--encre)'
              }}>
                 {step.icon}
              </div>
              <div className="step-label" style={{ color: 'var(--encre)' }}>{step.label}</div>
              <div style={{ fontSize: '0.6rem', color: 'var(--encre-dim)', fontStyle: 'italic' }}>{step.desc}</div>
              <div className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: 900, marginTop: '5px' }}>{step.progress}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 🧭 Level Selection Grid */}
      <section style={{ maxWidth: '1400px', margin: '6rem auto', padding: '0 1rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="font-display" style={{ color: 'var(--encre)' }}>Choisir votre <em style={{ color: 'var(--primary)' }} className="italic">Champ de Bataille</em></h2>
          <p className="font-mono coach-msg" style={{ marginTop: '0.5rem' }}>DÉPLOIEMENT_COGNITIF // CHOIX_DU_NIVEAU</p>
        </div>
        <LevelSelection onSelect={onSelectLevel} />
      </section>
    </div>
  );
}
