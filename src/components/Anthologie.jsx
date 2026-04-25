import { motion } from 'framer-motion'
import { Bookmark, Info, ExternalLink, Library } from 'lucide-react'

const philosophers = [
  {
    name: "Baruch Spinoza",
    era: "XVIIe siècle",
    notion: "La Liberté & Dieu",
    summary: "Pour Spinoza, Dieu et la Nature sont une seule et même chose. La liberté n'est pas le libre arbitre, mais la compréhension de la nécessité.",
    concepts: ["Conatus", "Substance", "Joie active"],
    color: "var(--rasp)"
  },
  {
    name: "Immanuel Kant",
    era: "XVIIIe siècle",
    notion: "Le Devoir & La Raison",
    summary: "Fondateur du criticisme, il définit la morale par l'impératif catégorique : agir selon une règle universelle.",
    concepts: ["Noumen", "Phénomène", "Autonomie"],
    color: "var(--azur)"
  },
  {
    name: "Simone de Beauvoir",
    era: "XXe siècle",
    notion: "L'Existence & Le Genre",
    summary: "Figure de l'existentialisme, elle explore la liberté humaine et la construction sociale de l'identité féminine.",
    concepts: ["Immanence", "Transcendance", "Située"],
    color: "var(--vert)"
  }
]

export default function Anthologie() {
  return (
    <div className="space-y-12 pb-20">
       <header className="text-center">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[var(--primary)] font-bold mb-4 block">Archives de la Cour</span>
        <h2 className="font-display">La Grande <em className="text-[var(--primary)]">Anthologie</em></h2>
        <p className="text-[var(--encre-dim)] max-w-2xl mx-auto italic leading-relaxed reading-width mt-6 text-sm">
          Explorez les archives du Tribunal. Les dossiers des plus grands penseurs de l'histoire, classés et analysés pour votre réussite.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {philosophers.map((phil, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bento-card group"
          >
             <div style={{ 
               height: '160px', 
               width: '100%', 
               background: 'rgba(255,255,255,0.03)', 
               marginBottom: '1.5rem', 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center', 
               position: 'relative', 
               overflow: 'hidden', 
               borderRadius: '8px',
               borderBottom: '1px solid rgba(255,255,255,0.1)'
             }}>
                <div style={{ position: 'absolute', inset: 0, opacity: 0.05, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'scale(1.5)' }}>
                  <Library size={80} color="white" />
                </div>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.5rem', letterSpacing: '0.5em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 900 }}>Archives · 2026</span>
             </div>
             
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                <div>
                   <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'white', marginBottom: '0.25rem' }} className="group-hover:text-primary transition-colors leading-tight">{phil.name}</h3>
                   <p style={{ fontFamily: 'JetBrains Mono', fontSize: '0.6rem', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 900 }}>{phil.era}</p>
                </div>
                <Bookmark size={18} style={{ color: 'white', opacity: 0.2 }} className="group-hover:opacity-100 transition-opacity" />
             </div>

             <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                {phil.summary}
             </p>

             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {phil.concepts.map((concept, j) => (
                   <span key={j} style={{ 
                     fontSize: '0.55rem', 
                     fontFamily: 'JetBrains Mono', 
                     fontWeight: 900, 
                     padding: '0.25rem 0.75rem', 
                     background: 'rgba(253, 185, 39, 0.1)', 
                     color: 'var(--primary)', 
                     border: '1px solid rgba(253, 185, 39, 0.3)', 
                     textTransform: 'uppercase', 
                     borderRadius: '4px'
                   }}>
                      {concept}
                   </span>
                ))}
             </div>
          </motion.div>
        ))}
      </div>

      <div style={{ 
        background: 'rgba(255,255,255,0.02)', 
        border: '1px solid rgba(255,255,255,0.1)', 
        padding: '4rem', 
        textAlign: 'center', 
        borderRadius: '24px',
        backdropFilter: 'blur(10px)'
      }}>
         <Library size={48} style={{ color: 'var(--primary)', margin: '0 auto 1.5rem' }} />
         <h4 className="font-display text-2xl mb-4" style={{ color: 'white' }}>Besoin d'un dossier <em style={{ color: 'var(--primary)' }}>spécifique</em> ?</h4>
         <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', fontStyle: 'italic', maxWidth: '400px', margin: '0 auto 2rem' }}>L'Anthologie s'agrandit chaque semaine avec de nouveaux dossiers d'instruction pour la session 2026.</p>
         <button className="btn-primary" style={{ 
           background: 'var(--primary)', 
           color: '#0A0510', 
           padding: '0.8rem 2.5rem', 
           borderRadius: '8px', 
           fontFamily: 'JetBrains Mono', 
           fontWeight: 900,
           border: 'none',
           cursor: 'pointer',
           boxShadow: '0 4px 15px var(--primary-glow)'
         }}>
            SUGGÉRER UN AUTEUR
         </button>
      </div>
    </div>
  )
}
