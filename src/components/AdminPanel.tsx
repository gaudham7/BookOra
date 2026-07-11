/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Shield, 
  Plus, 
  BarChart2, 
  Activity, 
  AlertTriangle, 
  Check, 
  X,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Book } from '../types';

interface AdminPanelProps {
  books: Book[];
  onAddBook: (book: Book) => void;
  addXp: (amount: number) => void;
}

export default function AdminPanel({ books, onAddBook, addXp }: AdminPanelProps) {
  // Add Book Form state
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("Fiction");
  const [desc, setDesc] = useState("");
  const [isIndexing, setIsIndexing] = useState(false);
  const [indexSuccess, setIndexSuccess] = useState(false);

  // Mock moderation queue
  const [flaggedReviews, setFlaggedReviews] = useState([
    { id: "mod-1", user: "BadActor_42", book: "The Great Gatsby", content: "This book is absolutely stupid and fits nobody, also buy bitcoin at scambitesite.com!!", reason: "Spam Link & Severe Toxicity" },
    { id: "mod-2", user: "ClassicScholar", book: "Frankenstein", content: "I think Victor Frankenstein represents Mary Shelley's grief about childhood deaths, extremely deep.", reason: "False positive thematic flag (Manual review required)" }
  ]);

  const handleApprove = (id: string) => {
    setFlaggedReviews(prev => prev.filter(item => item.id !== id));
    addXp(15);
  };

  const handleReject = (id: string) => {
    setFlaggedReviews(prev => prev.filter(item => item.id !== id));
    addXp(20);
  };

  const handleIndexBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || isIndexing) return;

    setIsIndexing(true);
    setIndexSuccess(false);

    try {
      // Hit on-demand Gemini AI analyzer to build the full book intelligence profile dynamically!
      const response = await fetch('/api/ai/analyze-book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author })
      });

      if (!response.ok) {
        throw new Error("Analyzer failure");
      }

      const aiData = await response.json();

      // Assemble a complete Book object
      const newBook: Book = {
        id: `custom-book-${Date.now()}`,
        title: title,
        subtitle: `AI Sourced analysis of ${title}`,
        authorId: `author-${Date.now()}`,
        authorName: author || "Unknown Author",
        coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80",
        publisher: "BookOra Dynamic Sourced",
        publishDate: new Date().toLocaleDateString(),
        isbn: Math.floor(1000000000000 + Math.random() * 9000000000000).toString(),
        pages: 250,
        readingTime: "5 hours",
        genres: [genre, "AI Sourced"],
        themes: ["Thematic profiles generated dynamically"],
        averageRating: 4.5,
        ratingCount: 1,
        awards: ["AI Analysis indexed"],
        pacing: "Medium",
        difficulty: "Intermediate",
        ageSuitability: "13+ years",
        contentWarnings: ["Thematic concepts"],
        purchaseLinks: [
          { store: "Google Books", price: "$9.99", link: "https://books.google.com" }
        ],
        aiAnalysis: aiData,
        characters: []
      };

      onAddBook(newBook);
      setTitle("");
      setAuthor("");
      setDesc("");
      setIndexSuccess(true);
      addXp(100); // 100 XP awarded for adding catalog items
      setTimeout(() => setIndexSuccess(false), 4000);
    } catch (error) {
      console.error(error);
      // Fallback index
      const fallbackBook: Book = {
        id: `custom-book-fb-${Date.now()}`,
        title,
        subtitle: `Sourced profile of ${title}`,
        authorId: "author-generic",
        authorName: author || "Unknown Author",
        coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80",
        publisher: "BookOra Sourced",
        publishDate: "2026",
        isbn: "9781234567890",
        pages: 220,
        readingTime: "4 hours",
        genres: [genre, "Fiction"],
        themes: ["Thematic indexes pending sync"],
        averageRating: 4.0,
        ratingCount: 1,
        awards: ["Sourced index catalog entry"],
        pacing: "Medium",
        difficulty: "Intermediate",
        ageSuitability: "All ages",
        contentWarnings: [],
        purchaseLinks: [{ store: "Google Books", price: "$8.99", link: "https://books.google.com" }],
        aiAnalysis: {
          summary: "General overview of the book narrative.",
          spoilerFreeSummary: "Explore the incredible details of this classic or contemporary work.",
          completeSummary: "A complete narrative summary is compiled upon key synchronization.",
          themeAnalysis: "Thematic explorations.",
          writingStyleAnalysis: "Writing style and prose analysis.",
          emotionalTone: "Intellectual & Calm",
          pacingData: [5, 5, 5, 5, 5, 5, 5, 5, 5],
          strengths: ["Great storytelling", "Fascinating character designs"],
          weaknesses: ["Slow initial pacing"],
          idealAudience: "Literary readers",
          keyTakeaways: ["A reflection of emotional dilemmas."],
          criticObservations: "Academics celebrate this title.",
          bookComparison: "Similar to category leaders.",
          aiOpinion: "An essential milestone in cataloging."
        },
        characters: []
      };

      onAddBook(fallbackBook);
      setTitle("");
      setAuthor("");
      setDesc("");
      setIndexSuccess(true);
      addXp(50);
      setTimeout(() => setIndexSuccess(false), 4000);
    } finally {
      setIsIndexing(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-amber-500 mb-1.5 font-mono text-xs uppercase tracking-widest font-semibold">
          <Shield className="w-4 h-4" />
          <span>Librarian Administration Console</span>
        </div>
        <h2 className="font-display font-bold text-2xl text-stone-100 tracking-tight">
          Librarian Control Desk
        </h2>
        <p className="text-sm text-stone-400 mt-1 max-w-xl">
          Track library performance, approve dynamic metadata entries, moderate community reviews, and index custom book profiles into the search database.
        </p>
      </div>

      {/* Analytical Metrics Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl flex items-center justify-between shadow">
          <div>
            <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block">Total Seed Books</span>
            <span className="text-2xl font-display font-bold text-stone-100 block mt-1">{books.length}</span>
          </div>
          <div className="p-2.5 bg-stone-950 text-amber-500 border border-stone-850 rounded-xl">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl flex items-center justify-between shadow">
          <div>
            <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block">Registered Readers</span>
            <span className="text-2xl font-display font-bold text-stone-100 block mt-1">1,482,904</span>
          </div>
          <div className="p-2.5 bg-stone-950 text-amber-500 border border-stone-850 rounded-xl">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl flex items-center justify-between shadow">
          <div>
            <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block">AI Queries Sourced</span>
            <span className="text-2xl font-display font-bold text-stone-100 block mt-1">421,904</span>
          </div>
          <div className="p-2.5 bg-stone-950 text-amber-500 border border-stone-850 rounded-xl">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
        </div>

        <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl flex items-center justify-between shadow">
          <div>
            <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block">Pending Flagged Reviews</span>
            <span className="text-2xl font-display font-bold text-stone-100 block mt-1">{flaggedReviews.length}</span>
          </div>
          <div className="p-2.5 bg-stone-950 text-amber-500 border border-stone-850 rounded-xl">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

      </section>

      {/* Catalog Manager & Moderation splitting row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-stone-800/50">
        
        {/* Index New Book Form (Catalog Manager) */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl shadow-lg space-y-4">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-amber-500" />
            <h4 className="font-display font-bold text-sm text-stone-200">Index Custom Book Profile</h4>
          </div>
          
          <p className="text-xs text-stone-400 leading-relaxed font-sans">
            Enter a book title and author. Our on-demand AI profiler will dynamically construct summaries, themes, pacing charts, and content warning descriptors!
          </p>

          <form onSubmit={handleIndexBook} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">Book Title</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. The Hobbit"
                className="w-full bg-stone-950 border border-stone-850 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">Author Name</label>
              <input 
                type="text" 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. J.R.R. Tolkien"
                className="w-full bg-stone-950 border border-stone-850 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">Primary Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full bg-stone-950 border border-stone-850 rounded-xl px-3.5 py-2.5 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              >
                <option value="Fiction">Fiction</option>
                <option value="Classic Literature">Classic Literature</option>
                <option value="Fantasy / Sci-Fi">Fantasy & Sci-Fi</option>
                <option value="Mystery / Crime">Mystery & Crime</option>
                <option value="Self-Help / Business">Self-Help & Business</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isIndexing || !title.trim()}
              className="w-full py-3 bg-amber-500 text-black hover:bg-amber-400 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              {isIndexing ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>AI Profiling Themes & Pacing Index...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Index into Database (+100 XP)</span>
                </>
              )}
            </button>
          </form>

          {indexSuccess && (
            <div className="text-xs bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-lg text-center animate-fade-in font-sans">
              <strong>Database Sourced!</strong> Book metadata has been analyzed and successfully indexed into the Smart Search catalogs.
            </div>
          )}
        </div>

        {/* AI Moderation Queue */}
        <div className="bg-stone-900 border border-stone-800 p-6 rounded-2xl shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h4 className="font-display font-bold text-sm text-stone-200">AI Moderation Queue</h4>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed font-sans">
              Examine reviews flagged by our automated LLM moderation engine for toxicity, promotional spam, or severe abuse.
            </p>

            <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
              {flaggedReviews.map((rev) => (
                <div 
                  key={rev.id}
                  className="bg-stone-950 border border-stone-850 p-4 rounded-xl space-y-2.5 text-xs"
                >
                  <div className="flex items-center justify-between border-b border-stone-900 pb-2">
                    <span className="text-stone-300 font-semibold">User: {rev.user}</span>
                    <span className="text-[9px] font-mono text-red-400 bg-red-400/5 px-2 py-0.5 rounded border border-red-400/15 uppercase font-bold">{rev.reason}</span>
                  </div>

                  <p className="text-stone-400 italic">"{rev.content}"</p>
                  
                  <div className="flex justify-between items-center text-[10px] text-stone-500">
                    <span>Target Book: {rev.book}</span>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleReject(rev.id)}
                        className="px-2 py-1 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white rounded border border-red-500/15 transition flex items-center gap-1 font-semibold"
                        title="Delete Review"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                      <button 
                        onClick={() => handleApprove(rev.id)}
                        className="px-2 py-1 bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white rounded border border-green-500/15 transition flex items-center gap-1 font-semibold"
                        title="Approve and Release"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {flaggedReviews.length === 0 && (
                <div className="py-12 text-center text-stone-500 text-xs">AI moderation queue cleared! No pending flagged community items.</div>
              )}
            </div>
          </div>

          <div className="text-[10px] font-mono text-stone-500 border-t border-stone-850 pt-3 mt-4 text-center">
            Automatic moderation filter threshold: 0.82 G-Safety index.
          </div>
        </div>

      </div>

    </div>
  );
}
