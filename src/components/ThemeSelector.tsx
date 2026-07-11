/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  X, 
  Palette, 
  Check, 
  Type, 
  Sparkles, 
  Moon, 
  AlignLeft, 
  Eye, 
  Grid, 
  Layers, 
  Flame, 
  CloudRain 
} from 'lucide-react';

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
  activeDesign: string;
  setActiveDesign: (design: string) => void;
  activeFont: string;
  setActiveFont: (font: string) => void;
  dimmingLevel: number;
  setDimmingLevel: (level: number) => void;
  addXp: (amount: number) => void;
}

export default function ThemeSelector({
  isOpen,
  onClose,
  activeTheme,
  setActiveTheme,
  activeDesign,
  setActiveDesign,
  activeFont,
  setActiveFont,
  dimmingLevel,
  setDimmingLevel,
  addXp
}: ThemeSelectorProps) {
  if (!isOpen) return null;

  const themes = [
    { 
      id: 'theme-obsidian', 
      name: 'Obsidian Onyx', 
      desc: 'Sophisticated default slate & amber accents',
      bgClass: 'bg-zinc-950 border-zinc-800', 
      previewBg: '#09090b', 
      previewAccent: '#f59e0b',
      isDark: true
    },
    { 
      id: 'theme-parchment', 
      name: 'Warm Parchment', 
      desc: 'Vintage book paper feeling, ultra easy on eyes',
      bgClass: 'bg-amber-50 border-amber-200 text-stone-900', 
      previewBg: '#f9f5eb', 
      previewAccent: '#9a3412',
      isDark: false
    },
    { 
      id: 'theme-forest', 
      name: 'Emerald Sanctuary', 
      desc: 'Tranquil deep forest green & sage highlights',
      bgClass: 'bg-emerald-950 border-emerald-800', 
      previewBg: '#04241d', 
      previewAccent: '#10b981',
      isDark: true
    },
    { 
      id: 'theme-ocean', 
      name: 'Midnight Ocean', 
      desc: 'Immersive deep navy blue & cosmic sky-blue',
      bgClass: 'bg-slate-950 border-slate-800', 
      previewBg: '#071120', 
      previewAccent: '#38bdf8',
      isDark: true
    },
    { 
      id: 'theme-amethyst', 
      name: 'Royal Amethyst', 
      desc: 'Mystical orchid purple & lavender hues',
      bgClass: 'bg-indigo-950 border-indigo-900', 
      previewBg: '#141124', 
      previewAccent: '#a78bfa',
      isDark: true
    },
    { 
      id: 'theme-cyberpunk', 
      name: 'Cyberpunk Codex', 
      desc: 'High-contrast tech matrix, pink & cyan accents',
      bgClass: 'bg-zinc-950 border-pink-900/20', 
      previewBg: '#050508', 
      previewAccent: '#ec4899',
      isDark: true
    },
    { 
      id: 'theme-alabaster', 
      name: 'Alabaster Clean', 
      desc: 'Pristine bright day theme with crisp sky-blue highlights',
      bgClass: 'bg-zinc-100 border-zinc-200 text-zinc-900', 
      previewBg: '#fbfbfb', 
      previewAccent: '#0284c7',
      isDark: false
    },
    { 
      id: 'theme-solis', 
      name: 'Morning Solis', 
      desc: 'Cozy sunlit butter background with golden honey tones',
      bgClass: 'bg-amber-50/50 border-amber-200 text-stone-900', 
      previewBg: '#fdfbf7', 
      previewAccent: '#d97706',
      isDark: false
    }
  ];

  const designs = [
    { id: 'design-solid', name: 'Solid Minimal', desc: 'Plain solid color, completely clean focus', icon: Layers },
    { id: 'design-vintage-lines', name: 'Vintage Lines', desc: 'Subtle classic ruled journal lines', icon: AlignLeft },
    { id: 'design-starry-sky', name: 'Starry Sky', desc: 'Cosmic celestial dots floating above', icon: Sparkles },
    { id: 'design-academic-grid', name: 'Drafting Grid', desc: 'Architectural soft dotted matrix', icon: Grid },
    { id: 'design-cozy-glow', name: 'Cozy Glow', desc: 'Ambient warmth radiating from the corners', icon: Flame }
  ];

  const fonts = [
    { id: 'modern', name: 'Modern Sans', desc: 'Sleek & clean "Inter" interface font' },
    { id: 'classic', name: 'Classic Serif', desc: 'Elegant "Merriweather" book typography' }
  ];

  const handleThemeChange = (themeId: string) => {
    setActiveTheme(themeId);
    addXp(10);
  };

  const handleDesignChange = (designId: string) => {
    setActiveDesign(designId);
    addXp(10);
  };

  const handleFontChange = (fontId: string) => {
    setActiveFont(fontId);
    addXp(15);
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 md:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative my-8 text-stone-100 max-h-[90vh] overflow-y-auto animate-scale-up">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-stone-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-500">
              <Palette className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest">Library Aesthetics</span>
            </div>
            <h2 className="text-2xl font-display font-bold tracking-tight">Atmosphere & Design Setup</h2>
            <p className="text-xs text-stone-400">
              Tailor your visual reading environment for comfort, style, and absolute focus.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 bg-stone-800 hover:bg-stone-700 rounded-lg text-stone-400 hover:text-stone-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Section */}
        <div className="space-y-6 divide-y divide-stone-800/60">
          
          {/* Section 1: Themes */}
          <div className="space-y-3 pt-1">
            <h3 className="text-sm font-semibold tracking-tight text-stone-200 flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-amber-500" />
              1. Choose Background Theme
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {themes.map((t) => {
                const isSelected = activeTheme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleThemeChange(t.id)}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between h-28 relative group transition-all duration-300 ${
                      isSelected 
                        ? 'border-amber-500 bg-stone-800/80 shadow-lg shadow-amber-500/5' 
                        : 'border-stone-800 bg-stone-900/40 hover:border-stone-700 hover:bg-stone-800/40'
                    }`}
                  >
                    {/* Theme color circles */}
                    <div className="flex items-center justify-between w-full">
                      <div className="flex gap-1.5">
                        <div 
                          className="w-4 h-4 rounded-full border border-white/10" 
                          style={{ backgroundColor: t.previewBg }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border border-white/10" 
                          style={{ backgroundColor: t.previewAccent }}
                        />
                      </div>
                      {isSelected && (
                        <div className="p-0.5 bg-amber-500 rounded-full text-black">
                          <Check className="w-3 h-3 stroke-[3px]" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-xs font-bold font-sans block text-stone-200">{t.name}</span>
                      <span className="text-[10px] text-stone-400 leading-tight block">{t.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Layout Designs / Patterns */}
          <div className="space-y-3 pt-5">
            <h3 className="text-sm font-semibold tracking-tight text-stone-200 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-amber-500" />
              2. Apply Background Design & Pattern
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {designs.map((d) => {
                const Icon = d.icon;
                const isSelected = activeDesign === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => handleDesignChange(d.id)}
                    className={`p-3 rounded-2xl border text-left flex gap-3 items-start transition-all duration-300 ${
                      isSelected 
                        ? 'border-amber-500 bg-stone-800/80 shadow-lg shadow-amber-500/5' 
                        : 'border-stone-800 bg-stone-900/40 hover:border-stone-700 hover:bg-stone-800/40'
                    }`}
                  >
                    <div className={`p-2 rounded-xl border ${
                      isSelected ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' : 'border-stone-800 bg-stone-900 text-stone-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-stone-200">{d.name}</span>
                        {isSelected && <span className="text-[9px] bg-amber-500/10 text-amber-500 border border-amber-500/20 px-1 rounded">Active</span>}
                      </div>
                      <span className="text-[10px] text-stone-400 leading-tight block">{d.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Typography & Reading Overlay dimming */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5 pb-2">
            
            {/* Typography selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold tracking-tight text-stone-200 flex items-center gap-1.5">
                <Type className="w-4 h-4 text-amber-500" />
                3. Reader Typography
              </h3>
              
              <div className="flex gap-2">
                {fonts.map((f) => {
                  const isSelected = activeFont === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => handleFontChange(f.id)}
                      className={`flex-1 p-3.5 rounded-2xl border text-center transition-all duration-300 ${
                        isSelected 
                          ? 'border-amber-500 bg-stone-800/80 text-amber-400 font-semibold' 
                          : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <span className={`text-xs block ${f.id === 'classic' ? 'font-serif' : 'font-sans'}`}>{f.name}</span>
                      <span className="text-[9px] text-stone-500 leading-none mt-0.5 block font-sans">{f.id === 'classic' ? 'Serif style' : 'Sans style'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ambient Overlay dimmer */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold tracking-tight text-stone-200 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-amber-500" />
                4. Eye Saver Dimmer
              </h3>

              <div className="p-3 bg-stone-900/40 border border-stone-800 rounded-2xl space-y-3">
                <div className="flex justify-between items-center font-mono text-[10px] text-stone-400">
                  <span>Overlay Shade</span>
                  <span className="font-bold text-amber-500">{dimmingLevel}% dimmer</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={dimmingLevel}
                  onChange={(e) => setDimmingLevel(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1 bg-stone-800 rounded-lg cursor-pointer"
                />
                <p className="text-[9px] text-stone-500 leading-tight">
                  Adds a gentle dark overlay on top of pages. Extremely helpful for late night reading sessions.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-stone-800 pt-4 mt-4">
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl text-xs text-amber-500 font-mono">
            <Flame className="w-3.5 h-3.5 animate-bounce" />
            <span>Customize to earn <strong>+10-15 XP</strong>!</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-amber-500 text-black hover:bg-amber-400 rounded-xl text-xs font-bold transition shadow-lg shadow-amber-500/5"
          >
            Apply & Save Atmosphere
          </button>
        </div>

      </div>
    </div>
  );
}
