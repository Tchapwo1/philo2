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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 5, 16, 0.95)',
            backdropFilter: 'blur(10px)',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10vh 2rem'
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            style={{ width: '100%', maxWidth: '700px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ position: 'relative', marginBottom: '2rem' }}>
              <Search 
                style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} 
                size={24} 
              />
              <input
                ref={inputRef}
                type="text"
                placeholder="Chercher un philosophe, une méthode, un verrou..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '20px',
                  padding: '1.5rem 1.5rem 1.5rem 4rem',
                  fontSize: '1.5rem',
                  color: 'white',
                  fontFamily: 'Outfit, sans-serif',
                  outline: 'none',
                  boxShadow: '0 0 40px rgba(0,0,0,0.5)'
                }}
              />
              <X 
                onClick={onClose}
                style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', opacity: 0.5 }} 
                size={24} 
              />
            </div>

            <div style={{ 
              display: 'grid', 
              gap: '0.8rem', 
              maxHeight: '60vh', 
              overflowY: 'auto', 
              paddingRight: '1rem',
              scrollbarWidth: 'thin',
              scrollbarColor: 'var(--primary) transparent'
            }}>
              {filteredResults.map((result, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => {
                    setActiveRoute(result.route);
                    onClose();
                  }}
                  style={{
                    padding: '1.2rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    zIndex: 2100
                  }}
                  className="search-item hover:scale-[1.02]"
                >
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: result.type === 'Philosophe' ? 'rgba(253, 185, 39, 0.1)' : 'rgba(255,255,255,0.05)', 
                    color: result.type === 'Philosophe' ? 'var(--primary)' : 'white',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    borderRadius: '10px'
                  }}>
                    {result.type === 'Philosophe' ? <User size={20} /> : <BookOpen size={20} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>{result.title}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.5, color: 'white' }}>{result.notion}</div>
                  </div>
                  <div className="font-mono" style={{ fontSize: '0.6rem', padding: '4px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', opacity: 0.7, color: 'var(--primary)' }}>
                    {result.type.toUpperCase()}
                  </div>
                </motion.div>
              ))}

              {query.length > 1 && filteredResults.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.3 }}>
                  <Hash size={40} style={{ margin: '0 auto 1rem' }} />
                  <p>Aucun dossier trouvé pour "{query}"</p>
                </div>
              )}

              {query.length <= 1 && (
                <div style={{ opacity: 0.3, fontSize: '0.8rem', textAlign: 'center', marginTop: '2rem' }}>
                  Tapez au moins 2 caractères pour réveiller les archives...
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
