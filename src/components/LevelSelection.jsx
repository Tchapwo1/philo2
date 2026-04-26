import { motion } from 'framer-motion'
import { Compass, FileText, Swords, Search, Gavel, Target, Layout } from 'lucide-react'

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
    <div className="space-y-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {levels.map((level, i) => (
          <motion.button
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => onSelect(level.id)}
            className="level-card group"
          >
            <div className="flex justify-between items-start mb-6">
              <span className="font-mono text-[0.6rem] font-bold px-3 py-1 bg-[var(--primary-ghost)] text-[var(--primary)] border border-[var(--primary)] uppercase tracking-widest shadow-[3px_3px_0_var(--encre)]">
                {level.badge}
              </span>
              <div className="text-[var(--encre-dim)] group-hover:text-[var(--primary)] transition-colors">
                {level.icon}
              </div>
            </div>
            <h3 className="font-display text-2xl mb-4 leading-tight group-hover:text-[var(--primary)] transition-colors">{level.title}</h3>
            <p className="text-sm text-[var(--encre-dim)] leading-relaxed italic">
              {level.desc}
            </p>
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => onSelect(8)}
        className="level-card w-full text-left bg-[var(--primary)] text-white hover:bg-white hover:text-[var(--primary)] hover:translate-x-2 transition-all shadow-[12px_12px_0_var(--encre)]"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
          <div className="flex-1">
            <span className="font-mono text-[0.6rem] tracking-[0.3em] uppercase mb-4 block font-bold opacity-80">
              ⚖ N8 · Le Grand Verdict
            </span>
            <h2 className="font-display text-3xl sm:text-4xl italic mb-4 leading-tight text-white group-hover:text-[var(--primary)] transition-colors">Simulation Totale</h2>
            <p className="text-sm opacity-80 leading-relaxed max-w-xl italic">
              Synthétisez toute la data du programme pour construire une copie 20/20. 
              Hameçon, Paradoxe, Duel, Standing : devenez Grand Maître du Tribunal.
            </p>
          </div>
          <div className="bg-white text-[var(--primary)] p-6 rounded-full shadow-xl group-hover:scale-110 transition-transform hidden md:block border-2 border-[var(--encre)]">
            <Gavel size={32} />
          </div>
        </div>
      </motion.button>
    </div>
  )
}
