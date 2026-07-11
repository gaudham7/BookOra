/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HomeView from './components/HomeView';
import SmartSearchView from './components/SmartSearchView';
import PersonalDashboard from './components/PersonalDashboard';
import CommunitySection from './components/CommunitySection';
import AdminPanel from './components/AdminPanel';
import BookDetail from './components/BookDetail';
import AILibrarian from './components/AILibrarian';
import ProfileView from './components/ProfileView';

import { Book, UserStats, ReadingChallenge, Review, Achievement, UserProfile } from './types';
import { booksList, readingChallengesList, achievementsList, initialReviews } from './data/catalog';

import { Sparkles, Bell, Trophy, BookOpen, Palette } from 'lucide-react';
import ThemeSelector from './components/ThemeSelector';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isLibrarianOpen, setIsLibrarianOpen] = useState(false);
  const [activeBookContext, setActiveBookContext] = useState<Book | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Theme & Atmosphere States
  const [activeTheme, setActiveTheme] = useState<string>(() => localStorage.getItem('reader-theme') || 'theme-obsidian');
  const [activeDesign, setActiveDesign] = useState<string>(() => localStorage.getItem('reader-design') || 'design-solid');
  const [activeFont, setActiveFont] = useState<string>(() => localStorage.getItem('reader-font') || 'modern');
  const [dimmingLevel, setDimmingLevel] = useState<number>(() => Number(localStorage.getItem('reader-dimming') || '0'));
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);

  // Save Atmosphere settings to localStorage
  useEffect(() => {
    localStorage.setItem('reader-theme', activeTheme);
  }, [activeTheme]);

  useEffect(() => {
    localStorage.setItem('reader-design', activeDesign);
  }, [activeDesign]);

  useEffect(() => {
    localStorage.setItem('reader-font', activeFont);
  }, [activeFont]);

  useEffect(() => {
    localStorage.setItem('reader-dimming', String(dimmingLevel));
  }, [dimmingLevel]);

  // Synchronized States
  const [books, setBooks] = useState<Book[]>(booksList);
  const [userStats, setUserStats] = useState<UserStats>({
    streak: 5,
    level: 3,
    xp: 320,
    targetXp: 500,
    completedCount: 1,
    currentCount: 1,
    wishlistCount: 2,
    achievements: achievementsList
  });
  const [challenges, setChallenges] = useState<ReadingChallenge[]>(readingChallengesList);
  const [shelves, setShelves] = useState<{
    currentlyReading: string[];
    read: string[];
    wishlist: string[];
  }>({
    currentlyReading: ["great-gatsby"],
    read: ["frankenstein"],
    wishlist: ["study-in-scarlet", "atomic-habits"]
  });
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: 'Acolyte Scholar',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    interests: ['Classic Literature', 'Philosophy', 'History'],
    bio: 'Passionate digital library researcher seeking deep symbolic insights and classical literary treasures.',
    favoriteGenre: 'Classic Literature',
    joinedDate: 'July 2026',
    yearlyTarget: 12
  });

  // Level Up Alert Modal
  const [showLevelUpAlert, setShowLevelUpAlert] = useState<number | null>(null);

  // 1. Initial State Fetch from Express Server
  useEffect(() => {
    async function loadState() {
      try {
        const response = await fetch('/api/state');
        if (response.ok) {
          const serverState = await response.json();
          
          if (serverState.stats) {
            setUserStats({
              ...serverState.stats,
              achievements: serverState.achievements || achievementsList
            });
          }
          if (serverState.challenges) {
            setChallenges(serverState.challenges);
          }
          if (serverState.shelves) {
            setShelves(serverState.shelves);
          }
          if (serverState.reviews && serverState.reviews.length > 0) {
            setReviews(serverState.reviews);
          }
          if (serverState.profile) {
            setUserProfile(serverState.profile);
          }
          
          // If custom books have been added by admin, merge with base catalog list
          if (serverState.customBooks && serverState.customBooks.length > 0) {
            setBooks([...booksList, ...serverState.customBooks]);
          }
        }
      } catch (error) {
        console.error("Could not fetch user state from Express API server:", error);
      }
    }
    loadState();
  }, []);

  // 2. State persistence helper to POST back to Express
  const persistState = async (
    updatedStats: UserStats, 
    updatedShelves: typeof shelves, 
    updatedChallenges: ReadingChallenge[], 
    updatedAchievements: Achievement[],
    updatedReviewsList: Review[],
    newCustomBooks?: Book[],
    updatedProfile?: UserProfile
  ) => {
    try {
      const payload = {
        shelves: updatedShelves,
        customBooks: newCustomBooks || books.filter(b => !booksList.some(ob => ob.id === b.id)),
        reviews: updatedReviewsList,
        stats: {
          streak: updatedStats.streak,
          level: updatedStats.level,
          xp: updatedStats.xp,
          targetXp: updatedStats.targetXp,
          completedCount: updatedShelves.read.length,
          currentCount: updatedShelves.currentlyReading.length,
          wishlistCount: updatedShelves.wishlist.length
        },
        challenges: updatedChallenges,
        achievements: updatedAchievements,
        profile: updatedProfile || userProfile
      };

      await fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error("Failed persisting updated state to disk server:", error);
    }
  };

  // 3. Add XP and check Level-Up helper
  const addXp = (amount: number) => {
    setUserStats(prev => {
      let nextXp = prev.xp + amount;
      let nextLevel = prev.level;
      let nextTarget = prev.targetXp;
      let leveledUp = false;

      while (nextXp >= nextTarget) {
        nextXp -= nextTarget;
        nextLevel += 1;
        nextTarget = Math.floor(nextTarget * 1.5);
        leveledUp = true;
      }

      if (leveledUp) {
        setShowLevelUpAlert(nextLevel);
      }

      const updated = {
        ...prev,
        level: nextLevel,
        xp: nextXp,
        targetXp: nextTarget
      };

      // Auto-unlock Streak-3 achievement if level is raised or stats are active
      let updatedAchievements = [...(prev.achievements || achievementsList)];
      const streakAchievement = updatedAchievements.find(a => a.id === "streak-3");
      if (streakAchievement && !streakAchievement.unlockedAt && updated.streak >= 3) {
        streakAchievement.unlockedAt = new Date().toISOString();
        updated.xp += streakAchievement.xpReward;
      }

      persistState(updated, shelves, challenges, updatedAchievements, reviews);
      return updated;
    });
  };

  // 4. Shelves toggler
  const handleToggleShelf = (shelfName: 'currentlyReading' | 'read' | 'wishlist') => {
    if (!selectedBook) return;

    setShelves(prev => {
      const activeArray = prev[shelfName];
      const isAlreadyOnShelf = activeArray.includes(selectedBook.id);
      
      let updatedShelf = [...activeArray];
      if (isAlreadyOnShelf) {
        updatedShelf = updatedShelf.filter(id => id !== selectedBook.id);
      } else {
        updatedShelf.push(selectedBook.id);
      }

      const nextShelves = {
        ...prev,
        [shelfName]: updatedShelf
      };

      // Double check gamified achievement rules
      let updatedAchievements = [...(userStats.achievements || achievementsList)];
      
      // 'first-step' achievement
      if (shelfName === 'currentlyReading' && !isAlreadyOnShelf) {
        const firstStepAch = updatedAchievements.find(a => a.id === 'first-step');
        if (firstStepAch && !firstStepAch.unlockedAt) {
          firstStepAch.unlockedAt = new Date().toISOString();
          // Give XP reward
          addXp(firstStepAch.xpReward);
        }
      }

      // 'classic-lover' achievement
      if (shelfName === 'read' && !isAlreadyOnShelf) {
        const isClassic = selectedBook.genres.includes('Classic Literature') || selectedBook.id === 'great-gatsby' || selectedBook.id === 'frankenstein';
        if (isClassic) {
          const classicAch = updatedAchievements.find(a => a.id === 'classic-lover');
          if (classicAch && !classicAch.unlockedAt) {
            classicAch.unlockedAt = new Date().toISOString();
            addXp(classicAch.xpReward);
          }
        }

        // Adjust active challenges counts!
        setChallenges(chPrev => {
          const nextCh = chPrev.map(c => {
            if (c.id === 'spring-classics' && isClassic) {
              return { ...c, currentBooks: Math.min(c.targetBooks, c.currentBooks + 1) };
            }
            if (c.id === 'habit-builder' && selectedBook.id === 'atomic-habits') {
              return { ...c, currentBooks: Math.min(c.targetBooks, c.currentBooks + 1) };
            }
            return c;
          });
          persistState(userStats, nextShelves, nextCh, updatedAchievements, reviews);
          return nextCh;
        });
      } else {
        persistState(userStats, nextShelves, challenges, updatedAchievements, reviews);
      }

      // Award small action XP
      addXp(10);
      return nextShelves;
    });
  };

  // 5. Claim Challenge Rewards
  const handleClaimChallenge = (challengeId: string) => {
    setChallenges(prev => {
      const updated = prev.map(c => {
        if (c.id === challengeId) {
          addXp(c.xpReward);
          return { ...c, completed: true };
        }
        return c;
      });
      persistState(userStats, shelves, updated, userStats.achievements || achievementsList, reviews);
      return updated;
    });
  };

  // 6. Community Reviews Like & Add
  const handleLikeReview = (reviewId: string) => {
    setReviews(prev => {
      const updated = prev.map(r => {
        if (r.id === reviewId) {
          return { ...r, likes: r.likes + 1 };
        }
        return r;
      });
      persistState(userStats, shelves, challenges, userStats.achievements || achievementsList, updated);
      addXp(5);
      return updated;
    });
  };

  const handleAddReview = (newReview: Review) => {
    setReviews(prev => {
      const updated = [newReview, ...prev];
      
      // Review character count achievement check
      let updatedAchievements = [...(userStats.achievements || achievementsList)];
      if (newReview.content.length >= 100) {
        const criticAch = updatedAchievements.find(a => a.id === 'critic');
        if (criticAch && !criticAch.unlockedAt) {
          criticAch.unlockedAt = new Date().toISOString();
          addXp(criticAch.xpReward);
        }
      }

      persistState(userStats, shelves, challenges, updatedAchievements, updated);
      addXp(50);
      return updated;
    });
  };

  // 7. Admin adds a book to catalog
  const handleAddBookToCatalog = (newBook: Book) => {
    setBooks(prev => {
      const updated = [...prev, newBook];
      const customOnes = updated.filter(b => !booksList.some(ob => ob.id === b.id));
      persistState(userStats, shelves, challenges, userStats.achievements || achievementsList, reviews, customOnes);
      return updated;
    });
  };

  const fontStyleClass = activeFont === 'classic' ? 'reader-serif' : 'font-sans';

  return (
    <div className={`flex bg-brand-bg text-brand-text min-h-screen transition-all duration-300 relative ${activeTheme} ${fontStyleClass} selection:bg-amber-500 selection:text-black`}>
      
      {/* Background design pattern layer */}
      <div className={`absolute inset-0 pointer-events-none opacity-[0.35] z-0 mix-blend-overlay ${activeDesign}`} />

      {/* Dimmer overlay layer */}
      {dimmingLevel > 0 && (
        <div 
          className="fixed inset-0 bg-black pointer-events-none z-[100] transition-opacity duration-300" 
          style={{ opacity: dimmingLevel / 100 }}
        />
      )}

      <div className="relative flex flex-1 z-10 w-full">
        {/* Platform Sidebar */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          stats={userStats}
          isLibrarianOpen={isLibrarianOpen}
          setIsLibrarianOpen={setIsLibrarianOpen}
        />

        {/* Main Content Pane */}
        <main className="flex-1 p-6 md:p-10 pb-24 md:pb-10 overflow-x-hidden min-h-screen">
          
          {/* Simple Global Top Header Bar */}
          <header className="flex items-center justify-between mb-8 pb-4 border-b border-brand-border">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
              <span>PLATFORM: ACTIVE</span>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
            </div>

            <div className="flex items-center gap-4">
              {/* Quick XP display banner */}
              <div className="hidden sm:flex items-center gap-2 bg-stone-900 border border-brand-border px-3.5 py-1.5 rounded-full text-xs text-stone-300">
                <Trophy className="w-3.5 h-3.5 text-brand-accent" />
                <span>Scholar: <strong>{userProfile.username}</strong></span>
              </div>
              
              {/* Atmosphere Switcher Button */}
              <button 
                onClick={() => setIsThemeSelectorOpen(true)}
                className="p-2 bg-stone-900 border border-brand-border rounded-xl text-stone-400 hover:text-brand-accent transition flex items-center justify-center"
                title="Customize Atmosphere & Design"
              >
                <Palette className="w-4 h-4 text-brand-accent" />
              </button>

              <button 
                onClick={() => setIsLibrarianOpen(true)}
                className="p-2 bg-stone-900 border border-brand-border rounded-xl text-stone-400 hover:text-brand-accent transition relative"
                title="Notifications Desk"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-brand-accent rounded-full" />
              </button>
            </div>
          </header>

        {/* Tab Router Switch */}
        {activeTab === 'home' && (
          <HomeView 
            books={books}
            stats={userStats}
            onSelectBook={(book) => setSelectedBook(book)}
            onNavigateToSearch={() => setActiveTab('search')}
            addXp={addXp}
          />
        )}

        {activeTab === 'search' && (
          <SmartSearchView 
            books={books}
            onSelectBook={(book) => setSelectedBook(book)}
            addXp={addXp}
          />
        )}

        {activeTab === 'dashboard' && (
          <PersonalDashboard 
            stats={userStats}
            challenges={challenges}
            onClaimChallenge={handleClaimChallenge}
            books={books}
            shelves={shelves}
            onSelectBook={(book) => setSelectedBook(book)}
            addXp={addXp}
          />
        )}

        {activeTab === 'community' && (
          <CommunitySection 
            reviews={reviews}
            books={books}
            onSelectBook={(book) => setSelectedBook(book)}
            onLikeReview={handleLikeReview}
            addXp={addXp}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView 
            profile={userProfile}
            setProfile={setUserProfile}
            stats={userStats}
            addXp={addXp}
            persistState={persistState}
            shelves={shelves}
            challenges={challenges}
            achievements={userStats.achievements || achievementsList}
            reviews={reviews}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPanel 
            books={books}
            onAddBook={handleAddBookToCatalog}
            addXp={addXp}
          />
        )}

      </main>

      {/* Floating sliding right side pane: AI Librarian drawer */}
      <AILibrarian 
        isOpen={isLibrarianOpen}
        onClose={() => setIsLibrarianOpen(false)}
        activeBookContext={activeBookContext}
        clearBookContext={() => setActiveBookContext(null)}
        addXp={addXp}
      />

      {/* Detail overlay Modal for Selected Book */}
      {selectedBook && (
        <BookDetail 
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onAddReview={handleAddReview}
          shelves={shelves}
          onToggleShelf={handleToggleShelf}
          onOpenLibrarianWithBook={() => {
            setActiveBookContext(selectedBook);
            setIsLibrarianOpen(true);
            addXp(15);
          }}
          reviews={reviews}
          profile={userProfile}
        />
      )}

      {/* LEVEL-UP LIGHTBOX BANNER */}
      {showLevelUpAlert !== null && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-500/20 rounded-3xl p-8 max-w-sm text-center space-y-5 shadow-2xl relative overflow-hidden animate-scale-up">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent" />
            
            <div className="p-4 bg-amber-500/10 text-amber-500 rounded-full w-fit mx-auto border border-amber-500/20">
              <Sparkles className="w-12 h-12 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-amber-500 font-mono tracking-widest uppercase block font-bold">ACHIEVEMENT COMPLETED</span>
              <h3 className="font-display font-extrabold text-2xl text-stone-100">Level Up Unlocked!</h3>
              <p className="text-xs text-stone-400">
                Congratulations! You have reached <strong className="text-amber-400">Level {showLevelUpAlert}</strong> in library intelligence!
              </p>
            </div>

            <button
              onClick={() => setShowLevelUpAlert(null)}
              className="w-full py-3 bg-amber-500 text-black font-semibold rounded-xl text-xs shadow-lg shadow-amber-500/10 hover:bg-amber-400 transition"
            >
              Exquisite, Keep Reading!
            </button>
          </div>
        </div>
      )}

      {/* Theme Atmosphere Selector */}
      <ThemeSelector 
        isOpen={isThemeSelectorOpen}
        onClose={() => setIsThemeSelectorOpen(false)}
        activeTheme={activeTheme}
        setActiveTheme={setActiveTheme}
        activeDesign={activeDesign}
        setActiveDesign={setActiveDesign}
        activeFont={activeFont}
        setActiveFont={setActiveFont}
        dimmingLevel={dimmingLevel}
        setDimmingLevel={setDimmingLevel}
        addXp={addXp}
      />

      </div>
    </div>
  );
}
