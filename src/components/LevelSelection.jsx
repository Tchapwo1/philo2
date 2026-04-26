import { motion } from 'framer-motion'
import { Compass, FileText, Swords, Search, Gavel, Target, Layout, PenTool, Sparkles } from 'lucide-react'

const levels = [
  { 
    id: 0, 
    badge: 'N0 · Boussole', 
    title: 'Notions & Repères fondamentaux', 
    icon: <Compass size={24} />,
    color: 'var(--azur)',
    desc: 'Maîtrisez les concepts pivots du programme.'
  },
  { 
    id: 1, 
    badge: 'N1 · Analyse', 
    title: 'Verrous & Timing dissertation', 
    icon: <FileText size={24} />,
    color: 'var(--rasp-pale)',
    desc: 'L\'art de déconstruire un sujet en 4h.'
  },
  { 
    id: 2, 
    badge: 'N2 · Construction', 
    title: 'Architecture du Plan', 
    icon: <Layout size={24} />,
    color: 'var(--vert)',
    desc: 'Bâtissez des structures argumentatives imparables.'
  },
  { 
    id: 3, 
    badge: 'N3 · Duels', 
    title: "Confrontations d'Auteurs", 
    icon: <Swords size={24} />,
    color: 'var(--azur-dim)',
    desc: 'Faites dialoguer les maîtres de la pensée.'
  },
  { 
    id: 4, 
    badge: 'N4 · Dossiers', 
    title: "Analyse de Textes", 
    icon: <FileText size={24} />,
    color: 'var(--rasp-pale)',
    desc: 'Déconstruisez les arguments des grands textes.'
  },
  { 
    id: 5, 
    badge: 'N5 · Paradoxes', 
    title: "Le Laboratoire", 
    icon: <Target size={24} />,
    color: 'var(--primary)',
    desc: 'Résolvez les impasses logiques de la pensée.'
  },
  { 
    id: 6, 
    badge: 'N6 · Le Jury', 
    title: "Simulation d'Objections", 
    icon: <Gavel size={24} />,
    color: 'var(--azur)',
    desc: 'Apprenez à répondre aux critiques du tribunal.'
  },
  { 
    id: 7, 
    badge: 'N7 · Code Pénal', 
    title: 'Traque aux Erreurs de copie', 
    icon: <Search size={24} />,
    color: 'var(--rasp)',
    desc: 'Évitez les pièges qui coûtent 5 points.'
  },
]
export default function LevelSelection({ onSelect }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {levels.map((level, i) => (
          <motion.button
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, borderColor: 'var(--primary)', backgroundColor: 'rgba(255,255,255,0.06)' }}
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(level.id)}
            className="bento-card"
            style={{ 
              textAlign: 'left',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-mono" style={{ 
                fontSize: '0.6rem', 
                fontWeight: 900, 
                padding: '4px 10px', 
                background: 'rgba(253, 185, 39, 0.1)', 
                color: 'var(--primary)', 
                borderRadius: '6px',
                letterSpacing: '0.1em'
              }}>
                {level.badge}
              </span>
              <div style={{ color: 'rgba(255,255,255,0.4)' }}>
                {level.icon}
              </div>
            </div>
            <div>
              <h3 className="font-display" style={{ fontSize: '1.25rem', marginBottom: '0.25rem', color: 'white' }}>{level.title}</h3>
              <p style={{ fontSize: '0.8rem', opacity: 0.6, fontStyle: 'italic', lineHeight: 1.4 }}>
                {level.desc}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        {/* N8 Slot */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => onSelect(8)}
          className="bento-card"
          style={{ 
            textAlign: 'left', 
            background: 'var(--primary)', 
            color: '#0A0510', 
            padding: '2rem',
            borderRadius: '24px',
            boxShadow: '0 20px 50px var(--primary-glow)',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <span className="font-mono" style={{ 
                fontSize: '0.6rem', 
                fontWeight: 900, 
                background: 'rgba(0,0,0,0.1)', 
                padding: '4px 10px', 
                borderRadius: '6px',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
                display: 'inline-block'
              }}>
                ⚖ N8 · LE GRAND VERDICT
              </span>
              <h2 className="font-display" style={{ fontSize: '2rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>Simulation Totale</h2>
              <p style={{ fontSize: '0.9rem', opacity: 0.8, lineHeight: 1.5 }}>
                Synthétisez toute la data du programme pour construire une copie 20/20.
              </p>
            </div>
            <Gavel size={32} />
          </div>
        </motion.button>

        {/* N9 Master Slot */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onClick={() => onSelect(9)}
          className="bento-card"
          style={{ 
            textAlign: 'left', 
            background: 'white', 
            color: '#0A0510', 
            padding: '2rem',
            borderRadius: '24px',
            boxShadow: '0 20px 50px rgba(255,255,255,0.05)',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <span className="font-mono" style={{ 
                fontSize: '0.6rem', 
                fontWeight: 900, 
                background: 'rgba(0,0,0,0.05)', 
                padding: '4px 10px', 
                borderRadius: '6px',
                letterSpacing: '0.1em',
                marginBottom: '1rem',
                display: 'inline-block'
              }}>
                🖋 N9 · LA PLUME D'OR
              </span>
              <h2 className="font-display" style={{ fontSize: '2rem', marginBottom: '0.5rem', fontStyle: 'italic' }}>Suite de Rédaction</h2>
              <p style={{ fontSize: '0.9rem', opacity: 0.7, lineHeight: 1.5 }}>
                Passez à l'acte. Rédigez vos accroches et paradoxes sous l'instruction de Simone.
              </p>
            </div>
            <PenTool size={32} />
          </div>
        </motion.button>
      </div>
    </div>
  );
}
