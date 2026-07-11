/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, 
  PenTool, 
  Check, 
  Target, 
  Award, 
  Flame, 
  BookOpen, 
  Heart, 
  Calendar, 
  Sparkles, 
  CheckCircle, 
  Image, 
  BookMarked
} from 'lucide-react';
import { UserProfile, UserStats } from '../types';

interface ProfileViewProps {
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  stats: UserStats;
  addXp: (amount: number) => void;
  persistState: (
    updatedStats: UserStats, 
    updatedShelves: any, 
    updatedChallenges: any, 
    updatedAchievements: any, 
    updatedReviewsList: any,
    newCustomBooks?: any,
    updatedProfile?: UserProfile
  ) => void;
  shelves: any;
  challenges: any;
  achievements: any;
  reviews: any;
}

const PRESET_AVATARS = [
  {
    name: "The Elegant Archivist",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80"
  },
  {
    name: "The Cozy Bookworm",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&q=80"
  },
  {
    name: "The Modern Thinker",
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&q=80"
  },
  {
    name: "The Digital Explorer",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80"
  },
  {
    name: "The Midnight Scribe",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80"
  }
];

const AVAILABLE_GENRES = [
  'Classic Literature',
  'Sci-Fi & Fantasy',
  'Mystery & Detective',
  'Self Improvement',
  'Philosophy',
  'Poetry',
  'History',
  'Biography',
  'Drama'
];

export default function ProfileView({
  profile,
  setProfile,
  stats,
  addXp,
  persistState,
  shelves,
  challenges,
  achievements,
  reviews
}: ProfileViewProps) {
  const [formData, setFormData] = useState<UserProfile>({ ...profile });
  const [showNotification, setShowNotification] = useState(false);
  const [avatarInputMode, setAvatarInputMode] = useState<'presets' | 'url'>('presets');
  const [customUrl, setCustomUrl] = useState(profile.avatarUrl);

  const handleInterestToggle = (genre: string) => {
    const isSelected = formData.interests.includes(genre);
    let updatedInterests: string[];
    if (isSelected) {
      updatedInterests = formData.interests.filter(i => i !== genre);
    } else {
      updatedInterests = [...formData.interests, genre];
    }
    setFormData({ ...formData, interests: updatedInterests });
  };

  const handleSave = () => {
    // Determine if we should award profile bonus XP (only if they filled details)
    let extraXp = 0;
    const isFirstTimeUpdate = profile.username === 'Acolyte Scholar' && formData.username !== 'Acolyte Scholar';
    
    if (isFirstTimeUpdate) {
      extraXp = 50;
      addXp(50);
    }

    const updatedProfile = {
      ...formData,
      avatarUrl: avatarInputMode === 'url' ? customUrl : formData.avatarUrl
    };

    setProfile(updatedProfile);
    
    // Save state to disk
    persistState(
      {
        ...stats,
        xp: stats.xp + extraXp
      },
      shelves,
      challenges,
      achievements,
      reviews,
      undefined,
      updatedProfile
    );

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in" id="profile-container">
      
      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-green-500 text-black px-4 py-3 rounded-2xl shadow-xl border border-green-400 font-medium animate-bounce" id="profile-success-toast">
          <CheckCircle className="w-5 h-5 shrink-0" />
          <div>
            <p className="text-sm font-bold">Profile journal updated!</p>
            <p className="text-[11px] opacity-90">State saved securely on server.</p>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-border pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-stone-100">
            Reader Profile
          </h1>
          <p className="text-sm text-stone-400 mt-1">
            Personalize your reading identity, track goals, and customize your classic membership card.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 self-start md:self-center"
          id="save-profile-btn"
        >
          <Check className="w-4 h-4" />
          Save Atmosphere Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Retro Journal Card */}
        <div className="lg:col-span-5 flex flex-col items-center gap-6">
          <div className="text-center w-full">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-semibold">
              Live Member Badge
            </span>
            <h2 className="text-sm font-semibold text-stone-400 mt-1">
              Vintage Library Record Card
            </h2>
          </div>

          {/* Card Mockup */}
          <div 
            className="w-full max-w-[360px] aspect-[5/7] bg-amber-50 text-stone-900 border-2 border-amber-200 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between selection:bg-amber-100 selection:text-stone-900"
            style={{
              backgroundImage: 'radial-gradient(rgba(139, 92, 26, 0.04) 1.5px, transparent 1.5px)',
              backgroundSize: '16px 16px',
              boxShadow: '0 15px 30px -10px rgba(115, 77, 13, 0.15)'
            }}
            id="retro-library-card"
          >
            {/* Ruled lines accent */}
            <div className="absolute inset-x-0 top-20 bottom-16 border-y border-red-200/40 pointer-events-none" 
              style={{
                backgroundImage: 'linear-gradient(rgba(139, 92, 26, 0.05) 1px, transparent 1px)',
                backgroundSize: '100% 1.75rem'
              }}
            />

            {/* Vintage Header */}
            <div className="relative z-10 flex justify-between items-start border-b-2 border-stone-800/80 pb-3">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-wider text-stone-500 leading-none">
                  OFFICIAL ACCESS CARD
                </p>
                <h3 className="font-display font-bold text-lg tracking-tight mt-1 text-stone-900 leading-none">
                  BookOra
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono font-bold border border-stone-800/60 px-1.5 py-0.5 rounded text-stone-700">
                  ID: B-{(stats.xp * 7).toString().padStart(4, '0')}
                </span>
              </div>
            </div>

            {/* Main Library Info */}
            <div className="relative z-10 flex gap-4 my-6 grow">
              {/* Photo Frame */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-24 bg-stone-100 border border-stone-400 p-1 shadow-sm rounded-sm shrink-0 overflow-hidden relative group">
                  {formData.avatarUrl ? (
                    <img 
                      src={avatarInputMode === 'url' ? customUrl : formData.avatarUrl} 
                      alt="Profile Avatar" 
                      className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-200 flex items-center justify-center">
                      <User className="w-8 h-8 text-stone-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 border border-black/5 pointer-events-none" />
                </div>
                <span className="font-mono text-[8px] uppercase tracking-wider text-stone-500">
                  MEMB: {formData.joinedDate}
                </span>
              </div>

              {/* Text Fields */}
              <div className="flex-1 flex flex-col justify-between font-mono text-xs text-stone-800 space-y-1">
                <div>
                  <p className="text-[9px] text-stone-500 uppercase leading-none">Borrower Name:</p>
                  <p className="font-bold text-sm tracking-tight text-stone-900 underline decoration-dotted decoration-stone-400 mt-1 min-h-[1.25rem]">
                    {formData.username || 'Anonymous Scholar'}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] text-stone-500 uppercase leading-none">Fav. Category:</p>
                  <p className="font-semibold text-stone-800 underline decoration-dotted decoration-stone-400 mt-0.5">
                    {formData.favoriteGenre || 'Any Literature'}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] text-stone-500 uppercase leading-none">Scholar Rank:</p>
                  <div className="flex items-center gap-1 text-stone-900 font-bold mt-0.5">
                    <Award className="w-3 h-3 text-amber-700" />
                    <span>Lvl {stats.level} (Acolyte)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Check Out Record Table (Delightful vintage stamp table) */}
            <div className="relative z-10 border-t border-stone-800/40 pt-3 space-y-1.5 font-mono text-[10px]">
              <div className="flex justify-between text-stone-500 text-[8px] font-bold border-b border-stone-300 pb-0.5">
                <span>SECTOR LOG ENTRY</span>
                <span>STATUS / RECORD</span>
              </div>
              <div className="flex justify-between items-center text-stone-700">
                <span className="flex items-center gap-1">
                  <Flame className="w-3 h-3 text-red-600 fill-red-100" /> Daily Streak
                </span>
                <span className="font-bold text-stone-900 underline decoration-stone-400">{stats.streak} consecutive days</span>
              </div>
              <div className="flex justify-between items-center text-stone-700">
                <span className="flex items-center gap-1">
                  <BookMarked className="w-3 h-3 text-blue-700" /> Yearly Goal
                </span>
                <span className="font-bold text-stone-900 underline decoration-stone-400">
                  {shelves.read.length} / {formData.yearlyTarget} books
                </span>
              </div>
              <div className="flex justify-between items-center text-stone-700">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-700" /> Wisdom Index
                </span>
                <span className="font-bold text-stone-900 underline decoration-stone-400">{stats.xp} Total XP</span>
              </div>
            </div>

            {/* Footer stamp seal */}
            <div className="relative z-10 mt-4 flex justify-between items-center border-t border-stone-800/80 pt-2.5">
              <p className="text-[7px] text-stone-400 uppercase font-mono tracking-tight max-w-[180px]">
                Valid at all BookOra digital libraries. Keep card dry.
              </p>
              <div className="w-9 h-9 rounded-full border border-red-500/30 flex items-center justify-center text-[7px] font-bold font-mono text-red-500/40 uppercase rotate-12 shrink-0">
                APPROVED
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Form controls */}
        <div className="lg:col-span-7 bg-stone-900/60 border border-brand-border rounded-2xl p-6 space-y-6">
          <h3 className="text-base font-semibold text-stone-100 flex items-center gap-2">
            <PenTool className="w-4 h-4 text-amber-500" />
            Edit Profile Credentials
          </h3>

          <div className="space-y-4">
            
            {/* Username Input */}
            <div>
              <label htmlFor="username-input" className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-1.5">
                Username / Reader Alias
              </label>
              <input
                id="username-input"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Enter your reader pseudonym"
                className="w-full bg-stone-950 border border-brand-border rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition"
              />
            </div>

            {/* Biography */}
            <div>
              <label htmlFor="bio-input" className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-1.5">
                Biography / Reader Manifesto
              </label>
              <textarea
                id="bio-input"
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Write a brief note about what kinds of books excite you, what you're hoping to learn, etc."
                className="w-full bg-stone-950 border border-brand-border rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition resize-none"
              />
            </div>

            {/* Avatar Selector Section */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Reader Avatar Portrait
                </label>
                
                {/* Toggle Input Mode */}
                <div className="flex bg-stone-950 border border-brand-border rounded-lg p-0.5 text-[10px]">
                  <button
                    onClick={() => setAvatarInputMode('presets')}
                    className={`px-2 py-1 rounded-md transition font-medium ${avatarInputMode === 'presets' ? 'bg-amber-500 text-black' : 'text-stone-400 hover:text-stone-200'}`}
                  >
                    Curated Presets
                  </button>
                  <button
                    onClick={() => setAvatarInputMode('url')}
                    className={`px-2 py-1 rounded-md transition font-medium ${avatarInputMode === 'url' ? 'bg-amber-500 text-black' : 'text-stone-400 hover:text-stone-200'}`}
                  >
                    Custom Image URL
                  </button>
                </div>
              </div>

              {avatarInputMode === 'presets' ? (
                <div className="grid grid-cols-5 gap-3 bg-stone-950 p-4 rounded-xl border border-brand-border">
                  {PRESET_AVATARS.map((avatar, idx) => {
                    const isSelected = formData.avatarUrl === avatar.url;
                    return (
                      <button
                        key={idx}
                        onClick={() => setFormData({ ...formData, avatarUrl: avatar.url })}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition group ${
                          isSelected ? 'border-amber-500 scale-105' : 'border-stone-850 opacity-60 hover:opacity-100 hover:border-stone-700'
                        }`}
                        title={avatar.name}
                      >
                        <img 
                          src={avatar.url} 
                          alt={avatar.name} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <Check className="w-4 h-4 text-amber-400 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex gap-3 bg-stone-950 p-3 rounded-xl border border-brand-border">
                  <div className="w-12 h-12 bg-stone-900 border border-stone-800 rounded-lg overflow-hidden shrink-0">
                    {customUrl ? (
                      <img 
                        src={customUrl} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80';
                        }}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-stone-500">
                        <Image className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <input
                    type="text"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="Enter absolute image URL (HTTPS)"
                    className="flex-1 bg-stone-900 border border-stone-800 rounded-lg px-3 py-1 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition"
                  />
                </div>
              )}
            </div>

            {/* Favorite Genre Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="fav-genre-select" className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-1.5">
                  Favorite Primary Genre
                </label>
                <select
                  id="fav-genre-select"
                  value={formData.favoriteGenre}
                  onChange={(e) => setFormData({ ...formData, favoriteGenre: e.target.value })}
                  className="w-full bg-stone-950 border border-brand-border rounded-xl px-4 py-3 text-sm text-stone-200 focus:outline-none focus:border-amber-500 transition"
                >
                  {AVAILABLE_GENRES.map((g) => (
                    <option key={g} value={g} className="bg-stone-950">{g}</option>
                  ))}
                </select>
              </div>

              {/* Yearly Goal target */}
              <div>
                <label htmlFor="yearly-target-input" className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-1.5">
                  Yearly Reading Target
                </label>
                <div className="relative flex items-center">
                  <Target className="absolute left-4 w-4 h-4 text-stone-500" />
                  <input
                    id="yearly-target-input"
                    type="number"
                    min={1}
                    max={200}
                    value={formData.yearlyTarget}
                    onChange={(e) => setFormData({ ...formData, yearlyTarget: Math.max(1, parseInt(e.target.value) || 12) })}
                    className="w-full bg-stone-950 border border-brand-border rounded-xl pl-11 pr-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500 transition"
                  />
                  <span className="absolute right-4 text-xs font-mono text-stone-500">
                    books / yr
                  </span>
                </div>
              </div>
            </div>

            {/* General Interests Selection */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-400 mb-2">
                Literary Interests & Exploration (Multi-select)
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_GENRES.map((genre) => {
                  const isSelected = formData.interests.includes(genre);
                  return (
                    <button
                      key={genre}
                      onClick={() => handleInterestToggle(genre)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-medium transition flex items-center gap-1.5 border ${
                        isSelected 
                          ? 'bg-amber-500/10 border-amber-500/40 text-amber-500 font-semibold' 
                          : 'bg-stone-950 border-brand-border text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                      }`}
                    >
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 text-amber-500" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-600" />
                      )}
                      <span>{genre}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="border-t border-brand-border pt-4 flex items-center justify-between text-xs text-stone-500 font-mono">
            <span>Last sync status: Cloud secure</span>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-stone-950 border border-brand-border hover:border-amber-500/40 rounded-xl text-stone-300 hover:text-white transition font-medium"
            >
              Apply Changes
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
