/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  BookMarked, 
  Compass, 
  Award, 
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Book, UserStats, ReadingChallenge, Achievement } from '../types';

interface PersonalDashboardProps {
  stats: UserStats;
  challenges: ReadingChallenge[];
  onClaimChallenge: (challengeId: string) => void;
  books: Book[];
  shelves: {
    currentlyReading: string[];
    read: string[];
    wishlist: string[];
  };
  onSelectBook: (book: Book) => void;
  addXp: (amount: number) => void;
}

export default function PersonalDashboard({
  stats,
  challenges,
  onClaimChallenge,
  books,
  shelves,
  onSelectBook,
  addXp
}: PersonalDashboardProps) {
  const [activeShelf, setActiveShelf] = useState<'currentlyReading' | 'read' | 'wishlist'>('currentlyReading');

  // Filter books in the active shelf
  const shelfBookIds = shelves[activeShelf] || [];
  const shelfBooks = books.filter(b => shelfBookIds.includes(b.id));

  // Calendar log state for the week
  const [weeklyLogs, setWeeklyLogs] = useState([
    { day: "Mon", logged: true },
    { day: "Tue", logged: true },
    { day: "Wed", logged: true },
    { day: "Thu", logged: true },
    { day: "Fri", logged: true },
    { day: "Sat", logged: false },
    { day: "Sun", logged: false }
  ]);

  const toggleDayLog = (idx: number) => {
    const updated = [...weeklyLogs];
    const wasLogged = updated[idx].logged;
    updated[idx].logged = !wasLogged;
    setWeeklyLogs(updated);

    if (!wasLogged) {
      addXp(15); // Earn 15 XP for logging reading sessions
    }
  };

  const xpPercentage = Math.min(100, Math.floor((stats.xp / stats.targetXp) * 100));

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Overview stats layout row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Level and XP progress card */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl md:col-span-2 flex flex-col justify-between space-y-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] text-stone-500 font-mono tracking-wider uppercase block">CURRENT STANDING</span>
              <h3 className="font-display font-extrabold text-lg text-stone-100 mt-0.5">Librarian Candidate</h3>
            </div>
            <div className="bg-amber-500 text-black font-display font-bold text-xs px-3 py-1 rounded-xl shadow-md">
              LEVEL {stats.level}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-400 to-amber-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs font-mono text-stone-400">
              <span>{stats.xp} XP Earned</span>
              <span>{stats.targetXp} XP Next Level</span>
            </div>
          </div>

          <p className="text-[11px] text-stone-500 font-mono leading-relaxed">
            Form habit loops to claim additional XP. Advancing levels unlocks premium AI analytical capabilities and customizable shelves themes!
          </p>
        </div>

        {/* Streak card */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-stone-500 font-mono tracking-wider uppercase">HABIT STREAK</span>
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500/10" />
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-stone-100">{stats.streak} Days</div>
            <p className="text-xs text-stone-400 mt-1">Check-in daily to preserve active reading multiplier.</p>
          </div>
        </div>

        {/* Count Card */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl flex flex-col justify-between space-y-4 shadow">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-stone-500 font-mono tracking-wider uppercase">ARCHIVED COMPLETED</span>
            <BookMarked className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-stone-100">{shelves.read.length} Books</div>
            <p className="text-xs text-stone-400 mt-1">Excellent! Mark books finished on your profile shelves.</p>
          </div>
        </div>
      </div>

      {/* Weekly Checklist Calendar & Active Challenges Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Logs Tracker */}
        <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl shadow flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[10px] text-stone-500 font-mono tracking-wider uppercase">Weekly Habits Diary</span>
            <h4 className="font-display font-bold text-sm text-stone-200 mt-1">Track Current Week Sessions</h4>
            <p className="text-xs text-stone-400 mt-1 leading-relaxed">Mark days where you read at least 15 minutes. Earns 15 XP each day!</p>
          </div>

          <div className="flex justify-between items-center gap-1">
            {weeklyLogs.map((log, idx) => (
              <button
                key={idx}
                onClick={() => toggleDayLog(idx)}
                className={`flex-1 flex flex-col items-center gap-2 py-2 rounded-xl border transition ${
                  log.logged
                    ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-semibold'
                    : 'bg-stone-950 border-stone-800/80 text-stone-500 hover:text-stone-300'
                }`}
              >
                <span className="text-[10px] font-mono">{log.day}</span>
                <div className={`w-3 h-3 rounded-full border ${log.logged ? 'bg-amber-500 border-amber-500' : 'border-stone-700'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Active Challenges List */}
        <div className="lg:col-span-2 bg-stone-900 border border-stone-800 p-5 rounded-2xl shadow space-y-4">
          <div>
            <span className="text-[10px] text-stone-500 font-mono tracking-wider uppercase">Active Challenges</span>
            <h4 className="font-display font-bold text-sm text-stone-200 mt-1">Expand Your Horizons</h4>
          </div>

          <div className="space-y-3.5">
            {challenges.map((chal) => {
              const isClaimable = chal.currentBooks >= chal.targetBooks && !chal.completed;
              const percentage = Math.min(100, Math.floor((chal.currentBooks / chal.targetBooks) * 100));
              return (
                <div 
                  key={chal.id}
                  className="bg-stone-950 border border-stone-850 p-4 rounded-xl space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h5 className="text-xs font-semibold text-stone-200 flex items-center gap-2">
                        <span>{chal.title}</span>
                        {chal.completed && <span className="text-[9px] font-mono bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded font-bold uppercase">Claimed</span>}
                      </h5>
                      <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                        {chal.description}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-amber-500 bg-amber-500/5 px-2 py-1 rounded border border-amber-500/10 shrink-0 font-bold">
                      +{chal.xpReward} XP
                    </span>
                  </div>

                  {/* Progress slide */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-stone-900 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-1.5 rounded-full ${chal.completed ? 'bg-green-500' : 'bg-amber-500'}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-stone-500 shrink-0">
                      {chal.currentBooks} / {chal.targetBooks}
                    </span>

                    {/* Claim Button */}
                    {isClaimable && (
                      <button
                        onClick={() => onClaimChallenge(chal.id)}
                        className="bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-[10px] px-3 py-1 rounded-lg transition shrink-0"
                      >
                        Claim Reward
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Shelves Manager Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-800 pb-3">
          <div>
            <h3 className="font-display font-bold text-base text-stone-100">My Custom Shelves</h3>
            <p className="text-xs text-stone-500">Organize and track reading status.</p>
          </div>

          {/* Shelves toggles */}
          <div className="flex gap-1.5">
            {[
              { id: 'currentlyReading', label: 'Currently Reading' },
              { id: 'read', label: 'Completed' },
              { id: 'wishlist', label: 'Wishlist' }
            ].map((sh) => (
              <button
                key={sh.id}
                onClick={() => setActiveShelf(sh.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  activeShelf === sh.id
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {sh.label} ({shelves[sh.id as 'currentlyReading' | 'read' | 'wishlist'].length})
              </button>
            ))}
          </div>
        </div>

        {/* Shelf Books Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {shelfBooks.map((book) => (
            <div 
              key={book.id}
              onClick={() => onSelectBook(book)}
              className="bg-stone-900 border border-stone-800/80 rounded-xl p-3 flex flex-col justify-between hover:border-amber-500/20 transition cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="aspect-[3/4] bg-stone-850 rounded-lg overflow-hidden relative shadow">
                  <img 
                    src={book.coverImage} 
                    alt={book.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-200 flex items-center justify-center p-2 text-center text-[10px] text-amber-400 font-mono">
                    View intelligence portfolio ➔
                  </div>
                </div>

                <div>
                  <h4 className="font-display font-bold text-xs text-stone-200 truncate">{book.title}</h4>
                  <p className="text-[10px] text-stone-400 truncate">by {book.authorName}</p>
                </div>
              </div>
            </div>
          ))}
          {shelfBooks.length === 0 && (
            <div className="col-span-full py-12 text-center text-stone-500 text-xs border border-dashed border-stone-800 rounded-2xl bg-stone-900/10">
              No titles shelved in this category. Browse 'Discover' to add masterpieces!
            </div>
          )}
        </div>
      </section>

      {/* Badges and Achievements Grid */}
      <section className="space-y-4">
        <div>
          <h3 className="font-display font-bold text-base text-stone-100">Unlocked Badges & Achievements</h3>
          <p className="text-xs text-stone-500">Badges earned by meeting reading habits and library interactions milestones.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.achievements.map((ach) => {
            const isUnlocked = ach.unlockedAt !== undefined;
            return (
              <div 
                key={ach.id}
                className={`p-4 border rounded-2xl flex flex-col items-center justify-center text-center space-y-3 shadow transition ${
                  isUnlocked 
                    ? 'bg-stone-900 border-amber-500/20' 
                    : 'bg-stone-950 border-stone-900/60 opacity-40 select-none'
                }`}
              >
                {/* Badge Icon wrapper */}
                <div className={`p-3 rounded-full ${isUnlocked ? 'bg-amber-500/10 text-amber-500' : 'bg-stone-900 text-stone-600'}`}>
                  {ach.iconName === 'Compass' && <Compass className="w-6 h-6" />}
                  {ach.iconName === 'Award' && <Award className="w-6 h-6" />}
                  {ach.iconName === 'Flame' && <Flame className="w-6 h-6" />}
                  {ach.iconName === 'Sparkles' && <Sparkles className="w-6 h-6 animate-pulse" />}
                  {ach.iconName === 'FileText' && <Trophy className="w-6 h-6" />}
                </div>

                <div>
                  <h4 className="font-display font-bold text-xs text-stone-200">{ach.title}</h4>
                  <p className="text-[10px] text-stone-500 mt-1 max-w-[120px] mx-auto leading-relaxed">{ach.description}</p>
                </div>

                <div className="text-[9px] font-mono text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                  +{ach.xpReward} XP REWARD
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
