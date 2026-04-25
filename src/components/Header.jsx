import React from 'react';
import { Search, Gavel, BookOpen, Crown, Layout, GraduationCap } from 'lucide-react';

export default function Header({ activeRoute, setActiveRoute, level, setLevel, toggleSearch }) {
  const tabs = [
    { id: 'home', label: 'Accueil', icon: Layout },
    { id: 'methode', label: 'Méthode', icon: BookOpen },
    { id: 'anthologie', label: 'Anthologie', icon: Gavel },
    { id: 'quiz', label: 'Verdict', icon: Crown },
  ];

  return (
    <header className="utility-bar" style={{ 
      background: 'rgba(10, 5, 16, 0.8)', 
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <div style={{ 
            background: 'var(--primary)', 
            padding: '8px', 
            borderRadius: '8px',
            boxShadow: '0 0 20px var(--primary-glow)'
          }}>
            <Gavel size={20} color="#0A0510" strokeWidth={3} />
          </div>
          <span className="font-display" style={{ fontWeight: 900, fontSize: '1.4rem', letterSpacing: '0.1em', color: 'white' }}>
            TRIBUNAL
          </span>
        </div>

        <nav style={{ display: 'flex', gap: '0.5rem' }}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveRoute(tab.id)}
              className={`tab-link ${activeRoute === tab.id ? 'active' : ''}`}
              style={{
                color: activeRoute === tab.id ? 'var(--primary)' : 'rgba(255,255,255,0.6)',
                borderBottom: activeRoute === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                transition: 'all 0.3s ease'
              }}
            >
              {tab.label}
            </div>
          ))}
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Level Switcher */}
        <div 
          onClick={() => setLevel(level === 'Terminale' ? '1ère' : 'Terminale')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            cursor: 'pointer',
            background: 'var(--primary)',
            color: '#0A0510',
            padding: '6px 16px',
            borderRadius: '40px',
            fontFamily: 'JetBrains Mono',
            fontSize: '0.7rem',
            fontWeight: 900,
            boxShadow: '0 4px 15px var(--primary-glow)'
          }}
        >
          <GraduationCap size={14} />
          {level.toUpperCase()}
        </div>

        {/* Search Trigger */}
        <div 
          onClick={toggleSearch}
          style={{ 
            cursor: 'pointer', 
            width: '40px', 
            height: '40px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'white'
          }}
        >
          <Search size={18} />
        </div>
      </div>
    </header>
  );
}
