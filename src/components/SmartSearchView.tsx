/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  BookOpen,
  Compass,
  Zap,
  Activity,
  Award
} from 'lucide-react';
import { Book } from '../types';

interface SmartSearchViewProps {
  books: Book[];
  onSelectBook: (book: Book) => void;
  addXp: (amount: number) => void;
}

export default function SmartSearchView({ books, onSelectBook, addXp }: SmartSearchViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [matchedBooks, setMatchedBooks] = useState<{ book: Book; reason: string }[]>([]);
  const [aiExplanation, setAiExplanation] = useState("");

  const presets = [
    "I want a mystery novel with high-pacing and logical deduction",
    "A cautionary gothic tale about artificial creations and loneliness",
    "A highly practical guide to forming positive daily habits and systems",
    "A tragic romantic story exploring wealth and the American Dream in the 1920s"
  ];

  const handleSearch = async (query: string) => {
    if (!query.trim() || isLoading) return;
    setSearchQuery(query);
    setIsLoading(true);
    setMatchedBooks([]);
    setAiExplanation("");

    try {
      const response = await fetch('/api/ai/smart-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      
      // Map matched IDs back to real books
      const mappedMatches = (data.matches || []).map((match: any) => {
        const found = books.find(b => b.id === match.id);
        if (found) {
          return { book: found, reason: match.reason };
        }
        return null;
      }).filter(Boolean) as { book: Book; reason: string }[];

      setMatchedBooks(mappedMatches);
      setAiExplanation(data.explanation || "Matches identified based on thematic index mapping.");
      
      // Award XP for utilizing search
      addXp(20);
    } catch (error) {
      console.error(error);
      // Local fallback search based on simple keyword contains
      const normalized = query.toLowerCase();
      const results = [] as { book: Book; reason: string }[];
      
      books.forEach(b => {
        let score = 0;
        let reasons = [] as string[];
        if (normalized.includes("gatsby") || normalized.includes("twenties") || normalized.includes("wealth") || normalized.includes("green")) {
          if (b.id === "great-gatsby") { score += 5; reasons.push("wealth, class longing, and 1920s setting"); }
        }
        if (normalized.includes("frankenstein") || normalized.includes("monster") || normalized.includes("horror") || normalized.includes("gothic")) {
          if (b.id === "frankenstein") { score += 5; reasons.push("gothic themes, isolation, and parent creation"); }
        }
        if (normalized.includes("detective") || normalized.includes("mystery") || normalized.includes("holmes") || normalized.includes("deduction")) {
          if (b.id === "study-in-scarlet") { score += 5; reasons.push("analytical crime solving and logical mystery solving"); }
        }
        if (normalized.includes("habit") || normalized.includes("atomic") || normalized.includes("routine") || normalized.includes("self-help")) {
          if (b.id === "atomic-habits") { score += 5; reasons.push("identity habits, micro systems, and life productivity"); }
        }
        
        if (score > 0) {
          results.push({
            book: b,
            reason: `Matches criteria for: ${reasons.join(' and ')}.`
          });
        }
      });

      if (results.length === 0 && books.length > 0) {
        results.push({ book: books[0], reason: "Recommended starting point based on general literary profile." });
      }

      setMatchedBooks(results);
      setAiExplanation("Offline keyword matching was triggered. Once Gemini API is verified, this will utilize deep semantic intelligence.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-2 text-amber-500 mb-1.5 font-mono text-xs uppercase tracking-widest font-semibold">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Semantic Intelligence Engine</span>
        </div>
        <h2 className="font-display font-bold text-2xl text-stone-100 tracking-tight">
          Smart Search
        </h2>
        <p className="text-sm text-stone-400 mt-1 max-w-xl">
          Search the library using natural language, emotional cues, pacing wishes, or plot elements. 
          Our AI analyzes writing style, thematic symbolism, and narrative density on the fly.
        </p>
      </div>

      {/* Main Search Input Form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchQuery);
        }}
        className="relative max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl p-2 flex items-center shadow-2xl focus-within:border-amber-500/50 transition duration-300"
      >
        <div className="flex-1 flex items-center gap-3 pl-3">
          <Search className="w-5 h-5 text-stone-500" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='e.g., "I want a gothic tragedy about creators and creation..."'
            className="w-full bg-transparent border-none text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-0"
          />
        </div>
        <button 
          type="submit"
          disabled={!searchQuery.trim() || isLoading}
          className="bg-amber-500 hover:bg-amber-400 text-black px-5 py-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition disabled:opacity-50"
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Analyze</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {/* Presets suggestions */}
      {!isLoading && matchedBooks.length === 0 && (
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs text-stone-500 font-mono tracking-wider uppercase block">
            Select a theme template to test:
          </span>
          <div className="flex flex-col gap-2">
            {presets.map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSearch(preset)}
                className="text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-850 border border-stone-800 hover:border-stone-700 p-3 rounded-xl text-xs text-left transition duration-200 flex items-center justify-between group"
              >
                <span>{preset}</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-500 group-hover:text-amber-500 transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results Area */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-16 space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-amber-500/10 border-t-amber-500 rounded-full animate-spin" />
            <Sparkles className="w-5 h-5 text-amber-500 absolute inset-0 m-auto animate-pulse" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-stone-300">Evaluating literary vectors...</p>
            <p className="text-xs text-stone-500 mt-1 font-mono">Running semantic analysis of themes and emotional tone</p>
          </div>
        </div>
      )}

      {!isLoading && matchedBooks.length > 0 && (
        <div className="space-y-6 max-w-3xl">
          
          {/* AI Explanation Banner */}
          <div className="bg-stone-900/60 border border-amber-500/10 p-5 rounded-2xl flex gap-4 items-start shadow-md">
            <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl mt-0.5">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="font-display font-semibold text-sm text-stone-200 mb-1">
                AI Librarian Search Interpretation
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                {aiExplanation}
              </p>
            </div>
          </div>

          {/* Results Grid */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono text-stone-500 uppercase tracking-widest block">
              IDENTIFIED MATCHES ({matchedBooks.length})
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {matchedBooks.map(({ book, reason }) => (
                <div 
                  key={book.id}
                  className="bg-stone-900 border border-stone-800/80 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 hover:border-amber-500/20 transition-all duration-300 shadow-lg group"
                >
                  {/* Book Cover miniature */}
                  <div className="w-20 h-28 bg-stone-800 rounded-lg shrink-0 overflow-hidden shadow-md group-hover:scale-[1.02] transition duration-300">
                    <img 
                      src={book.coverImage} 
                      alt={book.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details & Alignment */}
                  <div className="flex-1 flex flex-col justify-between space-y-3 sm:space-y-0">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded font-semibold uppercase">
                          {book.pacing} Pacing
                        </span>
                        <span className="text-[10px] font-mono bg-stone-800 text-stone-400 px-2 py-0.5 rounded uppercase">
                          {book.difficulty}
                        </span>
                      </div>
                      
                      <h4 className="font-display font-bold text-base text-stone-100 group-hover:text-amber-400 transition">
                        {book.title}
                      </h4>
                      <p className="text-xs text-stone-400 font-medium">
                        by {book.authorName}
                      </p>
                      
                      <p className="text-xs text-stone-400/90 mt-2 bg-stone-950/40 p-3 rounded-xl border border-stone-800/40 leading-relaxed font-sans italic">
                        <strong>AI Match Alignment:</strong> {reason}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-stone-800/60 mt-3">
                      <div className="flex gap-1.5">
                        {book.genres.slice(0, 2).map((g, idx) => (
                          <span key={idx} className="text-[10px] text-stone-500 bg-stone-950 px-2 py-0.5 rounded">
                            {g}
                          </span>
                        ))}
                      </div>
                      <button 
                        onClick={() => onSelectBook(book)}
                        className="text-xs text-amber-500 hover:text-amber-400 font-semibold flex items-center gap-1 transition"
                      >
                        <span>Open Intel Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
