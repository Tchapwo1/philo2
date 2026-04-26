import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Gavel, BookOpen, User, Hash } from 'lucide-react';

const searchData = [
  { type: 'Philosophe', title: 'Baruch Spinoza', notion: 'La Liberté & Dieu', route: 'anthologie' },
  { type: 'Philosophe', title: 'Friedrich Nietzsche', notion: 'La Volonté de Puissance', route: 'anthologie' },
  { type: 'Philosophe', title: 'René Descartes', notion: 'La Méthode & Le Cogito', route: 'anthologie' },
  { type: 'Philosophe', title: 'Platon', notion: 'Le Monde des Idées', route: 'anthologie' },
  { type: 'Philosophe', title: 'Immanuel Kant', notion: 'Le Devoir & La Raison', route: 'anthologie' },
  { type: 'Philosophe', title: 'Simone de Beauvoir', notion: "L'Existence & Le Genre", route: 'anthologie' },
  { type: 'Philosophe', title: 'Jean-Paul Sartre', notion: "L'Existentialisme", route: 'anthologie' },
  { type: 'Philosophe', title: 'Karl Marx', notion: 'La Lutte des Classes', route: 'anthologie' },
  { type: 'Philosophe', title: 'Jean-Jacques Rousseau', notion: 'Le Contrat Social', route: 'anthologie' },
  { type: 'Méthode', title: 'Analyse du Sujet', notion: 'Problématique', route: 'methode' },
  { type: 'Méthode', title: 'Plan Dialectique', notion: 'Thèse/Antithèse/Synthèse', route: 'methode' },
  { type: 'Méthode', title: 'Le Verrou Intellectuel', notion: 'Paradoxe', route: 'methode' },
  { type: 'Niveau', title: 'N0 · Boussole', notion: 'Notions fondamentales', route: 'home' },
  { type: 'Niveau', title: 'N1 · Analyse', notion: 'Verrous dissertation', route: 'home' },
  { type: 'Niveau', title: 'N2 · Construction', notion: 'Architecture du Plan', route: 'home' },
  { type: 'Niveau', title: 'N3 · Duels', notion: "Confrontations d'Auteurs", route: 'home' },
];

export default function SearchOverlay({ isOpen, onClose, setActiveRoute }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const filteredResults = query.length > 1 
    ? searchData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) || 
        item.notion.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="search-overlay-main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 5, 16, 0.98)',
            backdropFilter: 'blur(15px)',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10vh 2rem'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ width: '100%', maxWidth: '750px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative', marginBottom: '3rem' }}>
              <Search 
                style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, color: 'var(--primary)' }} 
                size={24} 
              />
              <input
                ref={inputRef}
                type="text"
                placeholder="RECHERCHER DANS LES ARCHIVES..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '1.5rem 1.5rem 1.5rem 4.5rem',
                  fontSize: '1.4rem',
                  color: 'white',
                  fontFamily: 'JetBrains Mono',
                  fontWeight: 400,
                  outline: 'none',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                  letterSpacing: '-0.02em'
                }}
              />
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                style={{ 
                  position: 'absolute', 
                  right: '1.5rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  cursor: 'pointer', 
                  opacity: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.1)',
                  padding: '8px',
                  borderRadius: '10px'
                }}
              >
                <X size={20} />
              </motion.div>
            </div>

            <div style={{ 
              display: 'grid', 
              gap: '1rem', 
              maxHeight: '65vh', 
              overflowY: 'auto', 
              paddingRight: '1rem',
              scrollbarWidth: 'none'
            }}>
              {filteredResults.map((result, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    x: 10, 
                    backgroundColor: 'rgba(253, 185, 39, 0.08)',
                    borderColor: 'rgba(253, 185, 39, 0.3)'
                  }}
                  transition={{ 
                    delay: i * 0.03,
                    type: 'spring',
                    damping: 20
                  }}
                  onClick={() => {
                    setActiveRoute(result.route);
                    onClose();
                  }}
                  style={{
                    padding: '1.5rem',
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2rem',
                    transition: 'border-color 0.2s ease, background-color 0.2s ease'
                  }}
                >
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    background: result.type === 'Philosophe' ? 'rgba(253, 185, 39, 0.1)' : 'rgba(255,255,255,0.05)', 
                    color: result.type === 'Philosophe' ? 'var(--primary)' : 'white',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    borderRadius: '12px',
                    boxShadow: result.type === 'Philosophe' ? '0 0 20px rgba(253, 185, 39, 0.1)' : 'none'
                  }}>
                    {result.type === 'Philosophe' ? <User size={22} /> : <BookOpen size={22} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', fontFamily: 'Libre Baskerville' }}>{result.title}</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.5, color: 'white', marginTop: '4px', fontStyle: 'italic' }}>{result.notion}</div>
                  </div>
                  <div className="font-mono" style={{ 
                    fontSize: '0.65rem', 
                    padding: '6px 12px', 
                    background: 'rgba(255,255,255,0.05)', 
                    borderRadius: '6px', 
                    opacity: 0.8, 
                    color: 'var(--primary)',
                    fontWeight: 900,
                    border: '1px solid rgba(253, 185, 39, 0.2)'
                  }}>
                    {result.type.toUpperCase()}
                  </div>
                </motion.div>
              ))}

              {query.length > 1 && filteredResults.length === 0 && (
                <div style={{ textAlign: 'center', padding: '6rem 2rem', opacity: 0.3 }}>
                  <Hash size={48} style={{ margin: '0 auto 1.5rem', color: 'var(--primary)' }} />
                  <p style={{ fontFamily: 'JetBrains Mono', fontSize: '1rem' }}>AUCUN_DOSSIER_TROUVÉ_POUR : "{query.toUpperCase()}"</p>
                </div>
              )}

              {query.length <= 1 && (
                <div style={{ opacity: 0.25, fontSize: '0.75rem', textAlign: 'center', marginTop: '3rem', fontFamily: 'JetBrains Mono', letterSpacing: '0.1em' }}>
                  VEUILLEZ_ENTRER_AU_MOINS_DEUX_CARACTÈRES...
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
