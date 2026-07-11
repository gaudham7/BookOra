/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  BookOpen, 
  Flame, 
  Award, 
  TrendingUp,
  Clock,
  CheckCircle,
  HelpCircle,
  Heart,
  Shuffle
} from 'lucide-react';
import { Book, UserStats } from '../types';
import { quotesList } from '../data/catalog';

interface HomeViewProps {
  books: Book[];
  stats: UserStats;
  onSelectBook: (book: Book) => void;
  onNavigateToSearch: () => void;
  addXp: (amount: number) => void;
}

export default function HomeView({ 
  books, 
  stats, 
  onSelectBook, 
  onNavigateToSearch,
  addXp 
}: HomeViewProps) {
  const [selectedMood, setSelectedMood] = useState<string>("All");
  
  // States for AI recommendation widget
  const [prefGenre, setPrefGenre] = useState("Classic Literature");
  const [prefMood, setPrefMood] = useState("Reflective");
  const [prefTime, setPrefTime] = useState("Under 4 Hours");
  const [prefDiff, setPrefDiff] = useState("Intermediate");
  const [isRecommending, setIsRecommending] = useState(false);
  const [aiRecResult, setAiRecResult] = useState<{
    books: {
      title: string;
      author: string;
      genre: string;
      reason: string;
      pacing: string;
      difficulty: string;
      coverGradient: string;
    }[];
    commentary: string;
  } | null>(null);

  // Today's quote (static random selector based on current day)
  const todayQuote = quotesList[new Date().getDate() % quotesList.length];

  // Filters catalog books based on selected mood
  const moodFilterMap: Record<string, (b: Book) => boolean> = {
    "All": () => true,
    "Dark / Gothic": (b) => b.id === 'frankenstein' || b.genres.includes('Horror'),
    "Inspirational": (b) => b.id === 'atomic-habits' || b.themes.includes('1% Better Daily'),
    "Analytical": (b) => b.id === 'study-in-scarlet' || b.pacing === 'Fast',
    "Romantic Classic": (b) => b.id === 'great-gatsby' || b.genres.includes('Drama')
  };

  const filteredBooks = books.filter(moodFilterMap[selectedMood] || (() => true));

  const handleGetRecommendations = async () => {
    setIsRecommending(true);
    setAiRecResult(null);

    try {
      const response = await fetch('/api/ai/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preferences: {
            genres: [prefGenre],
            mood: prefMood,
            time: prefTime,
            difficulty: prefDiff
          }
        })
      });

      if (!response.ok) {
        throw new Error("Failed recommendation fetch");
      }

      const data = await response.json();
      setAiRecResult(data);
      addXp(40); // Earn 40 XP for utilizing recommendations!
    } catch (error) {
      console.error(error);
      // Fallback
      setAiRecResult({
        books: [
          {
            title: "The Odyssey",
            author: "Homer",
            genre: "Epic Mythology",
            reason: "Matches interests in classic exploration and heroic journeys.",
            pacing: "Medium",
            difficulty: "Advanced",
            coverGradient: "from-blue-900 to-indigo-950"
          },
          {
            title: "The Picture of Dorian Gray",
            author: "Oscar Wilde",
            genre: "Gothic Philosophical Fiction",
            reason: "Fits interest in aesthetic vanity, dark moral decay, and deep classic drama.",
            pacing: "Medium",
            difficulty: "Intermediate",
            coverGradient: "from-slate-900 to-teal-950"
          }
        ],
        commentary: "These custom offline suggestions match your literary interests. Once your Gemini API is active, I will generate bespoke recommendations from the entire history of publishing!"
      });
    } finally {
      setIsRecommending(false);
    }
  };

  return (
    <div className="space-y-10 animate-fade-in pb-12">
      
      {/* Premium Hero Banner */}
      <section className="relative overflow-hidden bg-stone-900 border border-stone-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl animate-pulse-glow" />
        
        <div className="max-w-xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full text-[10px] font-mono tracking-widest uppercase font-semibold">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Welcome, Reader</span>
          </div>
          
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-stone-100 tracking-tight leading-tight">
            Discover the Hidden Undercurrent of Books
          </h1>
          
          <p className="text-sm text-stone-400 leading-relaxed">
            Welcome to <strong className="text-stone-300">BookOra</strong>, an intelligent home where you don't just search for books—you decode them. Converse with our AI librarian, analyze pacing vectors, and explore characters dynamically.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={onNavigateToSearch}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition duration-200 shadow-lg shadow-amber-500/5"
            >
              <Search className="w-4 h-4" />
              <span>Launch Smart Semantic Search</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quote & Statistics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quote Card */}
        <div className="lg:col-span-2 bg-stone-900/60 border border-stone-800/80 rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <span className="text-[10px] text-stone-500 font-mono tracking-wider uppercase">Today's Literary Quote</span>
            <p className="text-sm text-stone-200 font-sans italic leading-relaxed">
              "{todayQuote.text}"
            </p>
          </div>
          <div className="flex items-center justify-between border-t border-stone-800/50 pt-3 text-xs text-stone-500">
            <span>— {todayQuote.author}</span>
            <span className="font-mono text-[10px] text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">{todayQuote.book}</span>
          </div>
        </div>

        {/* Micro Stats Card */}
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 flex flex-col justify-between shadow-md">
          <span className="text-[10px] text-stone-500 font-mono tracking-wider uppercase block mb-3">Reading Streak logs</span>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
              <Flame className="w-8 h-8 fill-amber-500/10" />
            </div>
            <div>
              <div className="text-2xl font-display font-bold text-stone-100">{stats.streak} Days</div>
              <p className="text-xs text-stone-400">Keep it up! 15 XP earned per daily check-in.</p>
            </div>
          </div>
          <div className="text-[10px] font-mono text-stone-500 pt-3 border-t border-stone-800 mt-4 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Unlocked {stats.completedCount} / 5 literary achievements.</span>
          </div>
        </div>
      </div>

      {/* Dynamic Books by Mood Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-xl text-stone-100 tracking-tight">
              Explore Our Core Catalog
            </h3>
            <p className="text-xs text-stone-500">Filtered by emotional tone indexes</p>
          </div>
          
          {/* Mood Filters Carousel */}
          <div className="flex flex-wrap gap-1.5">
            {["All", "Dark / Gothic", "Inspirational", "Analytical", "Romantic Classic"].map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition duration-150 ${
                  selectedMood === mood
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'bg-stone-900 text-stone-400 border border-stone-800/80 hover:text-stone-200'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Books Carousel Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div 
              key={book.id}
              onClick={() => onSelectBook(book)}
              className="bg-stone-900 border border-stone-800/80 rounded-2xl p-3.5 flex flex-col justify-between hover:border-amber-500/30 transition-all duration-300 shadow-md group cursor-pointer"
            >
              <div className="space-y-3">
                {/* Book Cover Container */}
                <div className="relative aspect-[3/4] bg-stone-850 rounded-xl overflow-hidden shadow-lg group-hover:shadow-amber-500/5 group-hover:scale-[1.01] transition duration-300">
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-3">
                    <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase flex items-center gap-1">
                      <span>View Intel Profile</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Meta */}
                <div>
                  <h4 className="font-display font-bold text-sm text-stone-200 group-hover:text-amber-400 transition truncate">
                    {book.title}
                  </h4>
                  <p className="text-[11px] text-stone-400 truncate">
                    by {book.authorName}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="border-t border-stone-800/60 pt-2.5 mt-3 flex items-center justify-between text-[10px] font-mono text-stone-500">
                <span>{book.pacing} Pacing</span>
                <span className="text-amber-500/80">{book.averageRating} ★</span>
              </div>
            </div>
          ))}
          {filteredBooks.length === 0 && (
            <div className="col-span-full py-12 text-center text-stone-500 text-xs">
              No seed books perfectly match this specific mood criteria. Create a dynamic request below!
            </div>
          )}
        </div>
      </section>

      {/* AI Recommendation Engine Questionnaire Section */}
      <section className="bg-stone-900/40 border border-stone-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl">
            <Sparkles className="w-6 h-6 animate-pulse-glow" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-stone-100 tracking-tight">
              AI Recommendation Engine
            </h3>
            <p className="text-xs text-stone-400">Answer 3 simple inputs and receive curated books dynamically designed for you.</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-stone-800/60 py-5">
          {/* Genre Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">Target Genre</label>
            <select 
              value={prefGenre} 
              onChange={(e) => setPrefGenre(e.target.value)}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
            >
              <option value="Classic Literature">Classic Literature</option>
              <option value="Gothic Fiction / Horror">Gothic Fiction / Horror</option>
              <option value="Self-Improvement / Productivity">Self-Improvement & Productivity</option>
              <option value="Science Fiction / Space Opera">Science Fiction & Space Opera</option>
              <option value="Mystery / Detective Fiction">Mystery & Detective Fiction</option>
            </select>
          </div>

          {/* Mood Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">Your Reading Mood</label>
            <select 
              value={prefMood} 
              onChange={(e) => setPrefMood(e.target.value)}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
            >
              <option value="Reflective & Philosophical">Reflective & Philosophical</option>
              <option value="Thrilling & Suspenseful">Thrilling & Suspenseful</option>
              <option value="Pragmatic & Actionable">Pragmatic & Actionable</option>
              <option value="Dark & Melancholic">Dark & Melancholic</option>
            </select>
          </div>

          {/* Available Time */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">Available Time Goal</label>
            <select 
              value={prefTime} 
              onChange={(e) => setPrefTime(e.target.value)}
              className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
            >
              <option value="Under 4 Hours (Short novel)">Under 4 Hours (Short Novel)</option>
              <option value="4-8 Hours (Standard depth)">4-8 Hours (Standard Depth)</option>
              <option value="8+ Hours (Epic/Comprehensive)">8+ Hours (Epic or Comprehensive)</option>
            </select>
          </div>
        </div>

        {/* Trigger Button */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-stone-500 font-mono">Consumes minor credits • Earns 40 XP</span>
          <button
            onClick={handleGetRecommendations}
            disabled={isRecommending}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold rounded-xl text-xs flex items-center gap-2 transition duration-150 disabled:opacity-50"
          >
            {isRecommending ? (
              <>
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Generating recommendations...</span>
              </>
            ) : (
              <>
                <Shuffle className="w-4 h-4" />
                <span>Generate Smart Picks</span>
              </>
            )}
          </button>
        </div>

        {/* Results */}
        {aiRecResult && (
          <div className="pt-6 border-t border-stone-800/60 space-y-6 animate-fade-in">
            {/* AI Commentary */}
            <div className="bg-stone-900 border border-stone-800 p-4 rounded-xl flex gap-3 items-start">
              <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs text-stone-300 italic leading-relaxed">
                "{aiRecResult.commentary}"
              </p>
            </div>

            {/* Book suggestions items */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiRecResult.books.map((b, idx) => (
                <div 
                  key={idx}
                  className="bg-stone-900/60 border border-stone-800 p-4 rounded-2xl flex gap-4 hover:border-amber-500/20 transition duration-300"
                >
                  {/* Dynamic cover placeholder gradient */}
                  <div className={`w-16 h-24 bg-gradient-to-br ${b.coverGradient || 'from-stone-800 to-stone-950'} rounded-lg flex flex-col justify-between p-2 shrink-0 border border-stone-800 shadow-md`}>
                    <span className="text-[8px] font-mono text-amber-400/80 uppercase font-bold tracking-tight">RECOMMENDED</span>
                    <BookOpen className="w-4 h-4 text-white/40 self-end" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between space-y-1">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-mono bg-stone-850 text-stone-400 px-1.5 py-0.5 rounded">
                          {b.genre}
                        </span>
                        <span className="text-[9px] font-mono text-amber-500">
                          {b.difficulty}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-sm text-stone-200">
                        {b.title}
                      </h4>
                      <p className="text-[11px] text-stone-400">
                        by {b.author}
                      </p>
                      <p className="text-[11px] text-stone-400/95 leading-relaxed mt-1.5 font-sans">
                        {b.reason}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-[9px] font-mono text-stone-500">
                      <span>{b.pacing} Pacing</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

    </div>
  );
}
