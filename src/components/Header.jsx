import React, { useState } from 'react';
import { Search, Gavel, BookOpen, Crown, Layout, GraduationCap, Eye, EyeOff, Volume2, VolumeX } from 'lucide-react';
import AudioService from '../services/AudioService';

export default function Header({ activeRoute, setActiveRoute, level, setLevel, toggleSearch, isDocMode, toggleDocMode }) {
  const [isAudioEnabled, setIsAudioEnabled] = useState(AudioService.enabled);
  const tabs = [
    { id: 'home', label: 'Accueil', icon: Layout },
    { id: 'methode', label: 'Méthode', icon: BookOpen },
    { id: 'anthologie', label: 'Anthologie', icon: Gavel },
    { id: 'quiz', label: 'Verdict', icon: Crown },
  ];

  const handleAudioToggle = () => {
    const newState = AudioService.toggle();
    setIsAudioEnabled(newState);
  };

  return (
    <header className="utility-bar" style={{ 
      background: isDocMode ? 'rgba(242, 234, 222, 0.9)' : 'rgba(10, 5, 16, 0.85)', 
      backdropFilter: 'blur(20px)',
      borderBottom: isDocMode ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255, 255, 255, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.8rem 2rem',
      transition: 'all 0.5s ease'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        <div 
          onClick={() => setActiveRoute('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}
        >
          <div style={{ 
            background: 'var(--primary)', 
            padding: '8px', 
            borderRadius: '8px',
            boxShadow: '0 0 20px var(--primary-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Gavel size={20} color={isDocMode ? 'white' : '#0A0510'} strokeWidth={3} />
          </div>
          <span className="font-display" style={{ fontWeight: 900, fontSize: '1.4rem', letterSpacing: '0.1em', color: 'var(--encre)' }}>
            SIMONE
          </span>
        </div>

        <nav style={{ display: 'flex', gap: '0.5rem' }}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveRoute(tab.id)}
              className={`tab-link ${activeRoute === tab.id ? 'active' : ''}`}
              style={{
                color: activeRoute === tab.id ? 'var(--primary)' : 'var(--encre-dim)',
                borderBottom: activeRoute === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                transition: 'all 0.3s ease',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono',
                fontSize: '0.8rem',
                fontWeight: 800,
                textTransform: 'uppercase'
              }}
            >
              {tab.label}
            </div>
          ))}
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Audio Toggle */}
        <div 
          onClick={handleAudioToggle}
          title={isAudioEnabled ? "Désactiver le son" : "Activer le son"}
          style={{ 
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            background: isAudioEnabled ? 'rgba(var(--primary-rgb), 0.1)' : 'rgba(255,255,255,0.05)',
            color: isAudioEnabled ? 'var(--primary)' : 'var(--encre-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
        >
          {isAudioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </div>

        {/* Doc Mode Toggle */}
        <div 
          onClick={toggleDocMode}
          title={isDocMode ? "Passer en mode sombre" : "Passer en mode lecture"}
          style={{ 
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            background: 'rgba(var(--primary-rgb), 0.1)',
            color: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
        >
          {isDocMode ? <EyeOff size={18} /> : <Eye size={18} />}
        </div>

        {/* Level Switcher */}
        <div 
          onClick={() => setLevel(level === 'Terminale' ? 'Prépas' : level === 'Prépas' ? 'Agrég' : 'Terminale')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            cursor: 'pointer',
            background: isDocMode ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.05)',
            border: isDocMode ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.1)',
            color: 'var(--encre)',
            padding: '6px 16px',
            borderRadius: '40px',
            fontFamily: 'JetBrains Mono',
            fontSize: '0.7rem',
            fontWeight: 900,
            transition: 'all 0.2s ease'
          }}
        >
          <GraduationCap size={14} style={{ color: 'var(--primary)' }} />
          {level.toUpperCase()}
        </div>

        {/* Search Trigger */}
        <button 
          onClick={toggleSearch}
          style={{ 
            cursor: 'pointer', 
            width: '42px', 
            height: '42px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: '12px',
            background: 'var(--primary)',
            border: 'none',
            color: isDocMode ? 'white' : '#0A0510',
            boxShadow: '0 4px 15px var(--primary-glow)',
            transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
          }}
        >
          <Search size={20} strokeWidth={3} />
        </button>
      </div>
    </header>
  );
}
