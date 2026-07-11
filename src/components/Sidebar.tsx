/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  BookOpen, 
  Search, 
  MessageSquare, 
  Compass, 
  Trophy, 
  Users, 
  Shield, 
  Flame, 
  Sparkles,
  BarChart2,
  User
} from 'lucide-react';
import { UserStats } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  stats: UserStats;
  isLibrarianOpen: boolean;
  setIsLibrarianOpen: (open: boolean) => void;
}

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  stats, 
  isLibrarianOpen, 
  setIsLibrarianOpen 
}: SidebarProps) {
  
  const navItems = [
    { id: 'home', label: 'Discover', icon: Compass },
    { id: 'search', label: 'Smart Search', icon: Search },
    { id: 'dashboard', label: 'My Dashboard', icon: Trophy },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'admin', label: 'Admin Panel', icon: Shield }
  ];

  // Calculate XP percentage
  const xpPercentage = Math.min(100, Math.floor((stats.xp / stats.targetXp) * 100));

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-stone-950/95 border-r border-stone-800 p-6 text-stone-200 shrink-0 h-screen sticky top-0 justify-between">
        <div className="flex flex-col gap-8">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl text-black shadow-lg shadow-amber-500/10">
              <BookOpen className="w-6 h-6" id="brand-logo-icon" />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-xl tracking-wide bg-gradient-to-r from-amber-600 via-amber-300 via-yellow-200 via-amber-300 to-amber-600 bg-clip-text text-transparent filter drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)] animate-text-shimmer select-none">
                BookOra
              </h1>
              <span className="text-[10px] uppercase tracking-widest text-amber-500 font-semibold font-mono">
                AI Librarian
              </span>
            </div>
          </div>

          {/* User Level Display */}
          <div className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500 fill-amber-500/20" />
                <span className="font-mono text-xs font-semibold text-stone-300">
                  STREAK: <span className="text-amber-500 font-bold">{stats.streak} DAYS</span>
                </span>
              </div>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-amber-500/10 text-amber-500 rounded border border-amber-500/20">
                LVL {stats.level}
              </span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-400 to-amber-600 h-1.5 rounded-full transition-all duration-500" 
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-stone-500">
              <span>{stats.xp} XP</span>
              <span>{stats.targetXp} XP</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                    // Close librarian drawer if moving to another screen except when they explicitly launch it
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group text-left ${
                    isActive 
                      ? 'bg-gradient-to-r from-amber-500/10 to-transparent text-amber-400 border-l-2 border-amber-500 pl-3' 
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/50'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? 'text-amber-400' : 'text-stone-500 group-hover:text-stone-300'
                  }`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Floating AI Assistant Trigger */}
        <div className="flex flex-col gap-3">
          <button
            id="ai-librarian-sidebar-trigger"
            onClick={() => setIsLibrarianOpen(!isLibrarianOpen)}
            className={`w-full py-3.5 px-4 rounded-2xl flex items-center justify-between font-medium text-sm transition-all duration-300 shadow-lg ${
              isLibrarianOpen
                ? 'bg-amber-500 text-black shadow-amber-500/10 hover:bg-amber-400'
                : 'bg-stone-900 border border-stone-800 text-stone-200 hover:border-amber-500/40 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className={`w-5 h-5 ${isLibrarianOpen ? 'text-black' : 'text-amber-500'}`} />
              <span>AI Librarian</span>
            </div>
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </div>
          </button>
          
          <div className="text-[10px] text-stone-600 font-mono text-center">
            v1.0.0 • Premium Edition
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-stone-950/95 border-t border-stone-800 px-4 py-2 flex items-center justify-around z-40 backdrop-blur-md">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 p-2 text-stone-400 rounded-xl transition-all duration-200 ${
                isActive ? 'text-amber-500' : 'hover:text-stone-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-medium tracking-tight">{item.label}</span>
            </button>
          );
        })}
        {/* Mobile AI Librarian Trigger */}
        <button
          onClick={() => setIsLibrarianOpen(!isLibrarianOpen)}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 ${
            isLibrarianOpen ? 'text-amber-500' : 'text-stone-500'
          }`}
        >
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span className="text-[9px] font-medium tracking-tight">AI Ask</span>
        </button>
      </nav>
    </>
  );
}
