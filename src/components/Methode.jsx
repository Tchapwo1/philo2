import { motion } from 'framer-motion'
import { BookOpen, Clock, PenTool, Layout, CheckCircle2, ChevronRight } from 'lucide-react'

const methodSteps = [
  {
    title: "1. L'Analyse du Sujet (1h)",
    icon: <Clock size={20} />,
    content: "Définissez les termes, dégagez les présupposés et formulez le paradoxe central.",
    tips: ["Ne restez pas sur le sens commun.", "Cherchez l'étymologie si possible."]
  },
  {
    title: "2. La Problématique",
    icon: <Search size={20} />,
    content: "Transformez le sujet en une question qui révèle la contradiction interne.",
    tips: ["Un bon paradoxe génère un 'Verrou' intellectuel."]
  },
  {
    title: "3. Le Plan Dialectique",
    icon: <Layout size={20} />,
    content: "Thèse (Oui) / Antithèse (Non) / Synthèse (Dépassement).",
    tips: ["La synthèse n'est pas un compromis.", "Utilisez des repères comme 'Absolu/Relatif'."]
  },
  {
    title: "4. L'Analyse de la Citation",
    icon: <PenTool size={20} />,
    content: "Savoir faire parler un auteur sans tomber dans le catalogue de connaissances (name-dropping).",
    tips: ["Utilisez la méthode AEIB.", "Ne citez que ce que vous expliquez."]
  },
  {
    title: "5. La Transition",
    icon: <ChevronRight size={20} />,
    content: "L'art du pivot logique entre les parties pour assurer une progression continue de la pensée.",
    tips: ["Bilan de la partie I + Limite -> Annonce du II.", "Évitez le simple 'Cependant'."]
  }
]

export default function Methode() {
  return (
    <div className="space-y-12 pb-20">
      <section className="text-center">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[var(--primary)] font-bold mb-4 block">Stratégie d'Examen</span>
        <h2 className="font-display">L'Art de la <em className="text-[var(--primary)]">Plaidoirie</em></h2>
        <p className="text-[var(--encre-dim)] max-w-2xl mx-auto italic reading-width mt-6 text-sm">
          Une dissertation n'est pas un catalogue de connaissances, mais l'instruction d'un procès d'idées.
        </p>
      </section>

      <div className="grid gap-10">
        {methodSteps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="bento-card group"
            style={{ padding: '2rem' }}
          >
            <div className="flex gap-8 items-start">
               <div style={{ 
                 width: '64px', 
                 height: '64px', 
                 background: 'var(--primary)', 
                 color: '#0A0510', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center', 
                 borderRadius: '16px',
                 boxShadow: '0 0 20px var(--primary-glow)',
                 flexShrink: 0
               }}>
                 {step.icon}
               </div>
               <div className="flex-1">
                 <h3 className="font-display text-2xl mb-4" style={{ color: 'var(--primary)' }}>{step.title}</h3>
                 <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic', fontSize: '0.9rem' }}>
                   {step.content}
                 </p>
                 <div className="flex flex-wrap gap-3">
                   {step.tips.map((tip, j) => (
                     <span key={j} style={{ 
                       display: 'flex', 
                       alignItems: 'center', 
                       gap: '0.5rem', 
                       padding: '0.5rem 1rem', 
                       background: 'rgba(255,255,255,0.05)', 
                       color: 'white', 
                       fontSize: '0.7rem', 
                       fontFamily: 'JetBrains Mono', 
                       fontWeight: 900,
                       borderRadius: '8px',
                       border: '1px solid rgba(255,255,255,0.1)'
                     }}>
                       <CheckCircle2 size={12} style={{ color: 'var(--primary)' }} /> {tip}
                     </span>
                   ))}
                 </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="bento-card" style={{ 
        background: 'linear-gradient(135deg, var(--accent), #1a0b2e)', 
        color: 'white', 
        padding: '3rem', 
        overflow: 'hidden',
        border: '1px solid rgba(253, 185, 39, 0.2)'
      }}>
        <div style={{ position: 'absolute', top: 0, right: 0, padding: '2rem', opacity: 0.1, pointerEvents: 'none' }}>
          <BookOpen size={160} />
        </div>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h3 className="font-display text-white text-3xl mb-8 italic" style={{ color: 'var(--primary)' }}>Le Plan-Type Simone</h3>
          <div className="space-y-4">
             {[
                { id: '01', text: "L'Introduction : du Hameçon à l'Annonce." },
                { id: '02', text: "Le Développement : la construction des Paragraphes." },
                { id: '03', text: "La Conclusion : vers une Ouverture philosophique." }
             ].map((item, i) => (
               <div key={i} style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '1.5rem', 
                 paddingBottom: '1.5rem', 
                 borderBottom: '1px solid rgba(255,255,255,0.1)',
                 cursor: 'pointer',
                 transition: 'all 0.3s ease'
               }} className="group hover:translate-x-2">
                 <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', opacity: 0.4, fontWeight: 900 }}>{item.id}</span>
                 <p style={{ flex: 1, fontSize: '1.1rem', fontWeight: 600 }}>{item.text}</p>
                 <ChevronRight size={20} style={{ opacity: 0.5 }} className="group-hover:translate-x-2 transition-transform" />
               </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function Search({ size }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
}
