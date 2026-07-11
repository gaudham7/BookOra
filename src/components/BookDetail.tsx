/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Flame, 
  Award, 
  ShoppingCart, 
  Heart, 
  BookOpen, 
  ChevronRight, 
  User, 
  MessageSquare, 
  Activity, 
  ShieldAlert,
  Type as FontType,
  Plus,
  Minus,
  CheckCircle2
} from 'lucide-react';
import { Book, Character, Review, UserStats, UserProfile } from '../types';

interface BookDetailProps {
  book: Book;
  onClose: () => void;
  onAddReview: (review: Review) => void;
  shelves: {
    currentlyReading: string[];
    read: string[];
    wishlist: string[];
  };
  onToggleShelf: (shelfName: 'currentlyReading' | 'read' | 'wishlist') => void;
  onOpenLibrarianWithBook: () => void;
  reviews: Review[];
  profile?: UserProfile;
}

export default function BookDetail({ 
  book, 
  onClose, 
  onAddReview,
  shelves,
  onToggleShelf,
  onOpenLibrarianWithBook,
  reviews,
  profile
}: BookDetailProps) {
  const [activeTab, setActiveTab] = useState<'brief' | 'analytics' | 'characters' | 'read' | 'compare' | 'reviews'>('brief');
  const [isCurrentlyReading, setIsCurrentlyReading] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // States for writing a review
  const [newRating, setNewRating] = useState(5);
  const [reviewContent, setReviewContent] = useState("");
  const [isReviewSpoiler, setIsReviewSpoiler] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Reader sizing state
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    setIsCurrentlyReading(shelves.currentlyReading.includes(book.id));
    setIsRead(shelves.read.includes(book.id));
    setIsWishlisted(shelves.wishlist.includes(book.id));
  }, [shelves, book.id]);

  const bookReviews = reviews.filter(r => r.bookId === book.id);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewContent.trim()) return;

    const newRev: Review = {
      id: `rev-custom-${Date.now()}`,
      bookId: book.id,
      userId: "user-primary",
      userName: profile?.username || "Gaudham Sankar",
      userAvatar: profile?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
      rating: newRating,
      content: reviewContent,
      likes: 0,
      date: new Date().toISOString().split('T')[0],
      isSpoiler: isReviewSpoiler
    };

    onAddReview(newRev);
    setReviewContent("");
    setIsReviewSpoiler(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const tabs = [
    { id: 'brief', label: 'Intel Briefing' },
    { id: 'analytics', label: 'AI Analytics' },
    { id: 'characters', label: 'Character Explorer' },
    { id: 'read', label: 'Legal Reader' },
    { id: 'compare', label: 'Format Prices' },
    { id: 'reviews', label: 'Community Reviews' }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden shadow-2xl relative animate-scale-up">
        
        {/* Top Header Controls */}
        <div className="p-4 border-b border-stone-800/80 flex items-center justify-between shrink-0 bg-stone-950/40 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded">
              VERIFIED PORTAL
            </span>
            <span className="text-xs text-stone-500 font-mono">ISBN: {book.isbn}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-stone-800 rounded-lg text-stone-400 hover:text-stone-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Splitting Area */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Book Profile Sidebar */}
          <div className="w-full md:w-80 border-r border-stone-800/60 p-6 flex flex-col gap-6 shrink-0 bg-stone-950/20 overflow-y-auto">
            {/* Cover Image */}
            <div className="aspect-[3/4] bg-stone-850 rounded-2xl overflow-hidden shadow-xl max-w-[200px] mx-auto md:max-w-none">
              <img 
                src={book.coverImage} 
                alt={book.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Book Meta Details */}
            <div className="space-y-2 text-center md:text-left">
              <h2 className="font-display font-extrabold text-xl text-stone-100 tracking-tight leading-snug">
                {book.title}
              </h2>
              <p className="text-sm text-stone-400">
                by <strong className="text-stone-200">{book.authorName}</strong>
              </p>
              <p className="text-xs text-stone-500 italic mt-1 leading-relaxed">
                "{book.subtitle}"
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 border-t border-stone-800/60 pt-4 text-xs font-mono">
              <div className="bg-stone-900/60 p-3 rounded-xl border border-stone-800/40 text-center">
                <span className="text-stone-500 block text-[9px] uppercase">RATING</span>
                <span className="text-stone-200 font-bold block mt-1">{book.averageRating} ★</span>
              </div>
              <div className="bg-stone-900/60 p-3 rounded-xl border border-stone-800/40 text-center">
                <span className="text-stone-500 block text-[9px] uppercase">PAGES</span>
                <span className="text-stone-200 font-bold block mt-1">{book.pages} pp</span>
              </div>
            </div>

            {/* Shelf Actions */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono text-stone-500 uppercase tracking-widest text-center md:text-left">Configure Shelf</h4>
              <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
                <button
                  onClick={() => onToggleShelf('currentlyReading')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                    isCurrentlyReading 
                      ? 'bg-amber-500 text-black font-semibold shadow-lg shadow-amber-500/10' 
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  {isCurrentlyReading ? 'Reading ✓' : '+ Reading'}
                </button>
                <button
                  onClick={() => onToggleShelf('read')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                    isRead 
                      ? 'bg-green-600 text-white font-semibold' 
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  {isRead ? 'Completed ✓' : '+ Completed'}
                </button>
                <button
                  onClick={() => onToggleShelf('wishlist')}
                  className={`px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                    isWishlisted 
                      ? 'bg-stone-800 text-amber-500 font-semibold border border-amber-500/20' 
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  {isWishlisted ? 'Wishlisted ✓' : '+ Wishlist'}
                </button>
              </div>
            </div>

            {/* Core AI librarian context trigger */}
            <button
              onClick={onOpenLibrarianWithBook}
              className="w-full mt-2 py-3.5 px-4 bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 text-amber-400 font-medium text-xs rounded-2xl flex items-center justify-center gap-2 border border-amber-500/20 transition shadow"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Ask AI Librarian About This</span>
            </button>
          </div>

          {/* Right Core Sub-views */}
          <div className="flex-1 flex flex-col overflow-hidden bg-stone-900/40">
            {/* Tabs Navigation */}
            <div className="flex border-b border-stone-800 overflow-x-auto shrink-0 bg-stone-950/10">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  id={`tab-detail-${t.id}`}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`px-5 py-4 text-xs font-medium transition border-b-2 shrink-0 ${
                    activeTab === t.id
                      ? 'border-amber-500 text-amber-400 bg-amber-500/5'
                      : 'border-transparent text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {t.id === 'analytics' && <Sparkles className="w-3.5 h-3.5 inline mr-1.5 text-amber-500" />}
                  {t.label}
                </button>
              ))}
            </div>

            {/* Display Body according to active sub-tab */}
            <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
              
              {/* BRIEFING VIEW */}
              {activeTab === 'brief' && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Detailed Description */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase">SYNOPSIS SUMMARY</span>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans">
                      {book.description || (book.aiAnalysis && book.aiAnalysis.summary)}
                    </p>
                  </div>

                  {/* Themes List */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase">THEMATIC CORNERSTONES</span>
                    <div className="flex flex-wrap gap-2">
                      {book.themes.map((th, idx) => (
                        <span key={idx} className="text-xs bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-xl text-stone-300 font-medium">
                          {th}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Strengths & Weaknesses row */}
                  {book.aiAnalysis && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-stone-800/60 pt-5">
                      <div className="bg-stone-900/60 p-4 border border-stone-800/60 rounded-2xl space-y-2">
                        <span className="text-[10px] text-green-500 font-mono uppercase tracking-wider font-semibold">Narrative Strengths</span>
                        <ul className="text-xs text-stone-400 space-y-1.5 list-disc list-inside">
                          {book.aiAnalysis.strengths.map((str, idx) => <li key={idx}>{str}</li>)}
                        </ul>
                      </div>
                      <div className="bg-stone-900/60 p-4 border border-stone-800/60 rounded-2xl space-y-2">
                        <span className="text-[10px] text-amber-500 font-mono uppercase tracking-wider font-semibold">Reader Critiques</span>
                        <ul className="text-xs text-stone-400 space-y-1.5 list-disc list-inside">
                          {book.aiAnalysis.weaknesses.map((wk, idx) => <li key={idx}>{wk}</li>)}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Content warnings & Audience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase">AGE SUITABILITY</span>
                      <p className="text-xs text-stone-300">{book.ageSuitability}</p>
                    </div>
                    {book.contentWarnings.length > 0 && (
                      <div className="space-y-2 bg-red-500/5 border border-red-500/10 p-3 rounded-xl flex gap-2 items-start text-xs text-red-400">
                        <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-mono uppercase block font-semibold text-red-400/80">Content Warnings</span>
                          <span className="text-[11px] block text-stone-400 mt-1">{book.contentWarnings.join(', ')}</span>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* AI ANALYTICS VIEW */}
              {activeTab === 'analytics' && book.aiAnalysis && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Dynamic Custom Interactive Pacing Area Graph (Visual Craft over simple charts) */}
                  <div className="space-y-3">
                    <div>
                      <span className="text-[10px] text-amber-500 font-mono tracking-widest uppercase font-semibold">DURATIVE PACING FLOW VECTOR</span>
                      <p className="text-[11px] text-stone-500">Pacing intensity index tracked across narrative chapter blocks (Slow = 1, Fast = 10)</p>
                    </div>

                    {/* SVG/CSS graph bar container */}
                    <div className="bg-stone-950 p-6 rounded-2xl border border-stone-800 flex flex-col gap-4">
                      <div className="h-28 flex items-end justify-between gap-1 sm:gap-2.5 pt-4 border-b border-stone-800">
                        {book.aiAnalysis.pacingData.map((val, idx) => {
                          const heightPct = Math.floor((val / 10) * 100);
                          return (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                              <span className="text-[9px] font-mono text-amber-400 opacity-0 group-hover:opacity-100 transition duration-150">{val}</span>
                              <div 
                                className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-md hover:to-amber-300 transition duration-150"
                                style={{ height: `${heightPct}%` }}
                              />
                              <span className="text-[8px] font-mono text-stone-600 mt-1">S{idx+1}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex justify-between text-[10px] font-mono text-stone-500 px-1">
                        <span>CHAPTER BLOCK START (Exposition)</span>
                        <span>CLIMAX SEQUENCE</span>
                        <span>RESOLUTION (Denouement)</span>
                      </div>
                    </div>
                  </div>

                  {/* Theme Analysis & Tone */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase">THEMATIC AI EXTRACTION</span>
                      <p className="text-xs text-stone-300 leading-relaxed font-sans">
                        {book.aiAnalysis.themeAnalysis}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase">STYLE & TONOLOGY</span>
                      <p className="text-xs text-stone-300 leading-relaxed font-sans">
                        {book.aiAnalysis.writingStyleAnalysis}
                      </p>
                      <div className="bg-stone-900 border border-stone-800 p-3.5 rounded-xl flex justify-between items-center text-xs mt-3">
                        <span className="text-stone-500 font-mono uppercase text-[9px]">EMOTIONAL REGISTER</span>
                        <span className="text-amber-500 font-semibold font-sans">{book.aiAnalysis.emotionalTone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actionable Key Takeaways / Milestones */}
                  <div className="space-y-3">
                    <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase">LITERARY KEY TAKEAWAYS</span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {book.aiAnalysis.keyTakeaways.map((tk, idx) => (
                        <div key={idx} className="bg-stone-900 border border-stone-800/80 p-4 rounded-xl flex gap-3 items-start">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-xs text-stone-300 font-sans leading-relaxed">{tk}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Professional Criticism & Comparisons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-800/60">
                    <div className="space-y-2">
                      <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase">CRITIC OBSERVATION</span>
                      <p className="text-xs text-stone-400 font-sans leading-relaxed">
                        {book.aiAnalysis.criticObservations}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase">COMPARATIVE PROFILE</span>
                      <p className="text-xs text-stone-400 font-sans leading-relaxed">
                        {book.aiAnalysis.bookComparison}
                      </p>
                    </div>
                  </div>

                  {/* Sourced AI Opinion banner */}
                  <div className="bg-stone-950 border border-stone-800/80 p-5 rounded-2xl space-y-2 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl" />
                    <span className="text-[9px] font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded uppercase">AI ANALYSIS OPINION (NOT FACT)</span>
                    <p className="text-xs text-stone-300 leading-relaxed font-sans max-w-2xl mx-auto pt-2">
                      {book.aiAnalysis.aiOpinion}
                    </p>
                  </div>

                </div>
              )}

              {/* CHARACTER EXPLORER VIEW */}
              {activeTab === 'characters' && (
                <div className="space-y-8 animate-fade-in">
                  
                  <div>
                    <span className="text-[10px] text-amber-500 font-mono tracking-widest uppercase font-semibold">CHARACTER MATRIX GRAPH</span>
                    <p className="text-[11px] text-stone-500 mt-1">Review major characters, psychological profiles, motivation vectors, and relational ties.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {book.characters && book.characters.map((char, idx) => (
                      <div 
                        key={idx}
                        className="bg-stone-900 border border-stone-800/80 rounded-2xl p-5 space-y-4 shadow hover:border-amber-500/10 transition duration-300"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[9px] font-mono bg-stone-850 text-amber-400 px-2 py-0.5 rounded font-semibold uppercase">{char.role}</span>
                            <h4 className="font-display font-bold text-base text-stone-100 mt-1">{char.name}</h4>
                          </div>
                          <span className="text-[10px] font-mono text-stone-500 bg-stone-950 px-2.5 py-1 rounded">IMPORTANCE: {char.importance}/10</span>
                        </div>

                        <p className="text-xs text-stone-400 font-sans leading-relaxed">
                          {char.description}
                        </p>

                        <div className="space-y-2 border-t border-stone-800/50 pt-3">
                          <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">traits:</div>
                          <div className="flex flex-wrap gap-1.5">
                            {char.traits.map((tr, i) => (
                              <span key={i} className="text-[10px] bg-stone-950 text-stone-400 px-2 py-0.5 rounded">
                                {tr}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-1.5 text-xs bg-stone-950/40 p-3 rounded-xl border border-stone-850">
                          <span className="text-[9px] font-mono text-stone-500 uppercase">MOTIVATION VECTOR</span>
                          <p className="text-stone-300 font-sans italic">"{char.motivation}"</p>
                        </div>

                        {char.relations && char.relations.length > 0 && (
                          <div className="space-y-2 pt-1">
                            <span className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block">RELATIONAL MATRIX</span>
                            <div className="space-y-1.5">
                              {char.relations.map((rel, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs">
                                  <span className="text-amber-500 font-semibold">{char.name}</span>
                                  <span className="text-stone-500 text-[10px] font-mono font-medium">➔ ({rel.relationType}) ➔</span>
                                  <span className="text-stone-300">{rel.characterName}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {(!book.characters || book.characters.length === 0) && (
                      <div className="col-span-full py-16 text-center text-stone-500 text-xs flex flex-col items-center justify-center gap-2">
                        <User className="w-8 h-8 text-stone-600" />
                        <span>Character profiles are not loaded for this non-fiction book. Try examining classics like "The Great Gatsby" or "Frankenstein" for incredible character matrix maps!</span>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* LEGAL READER VIEW */}
              {activeTab === 'read' && (
                <div className="space-y-4 animate-fade-in">
                  
                  {/* Top Bar for Font resizing and accessibility */}
                  <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl flex items-center justify-between text-xs font-mono">
                    <span className="text-stone-400 uppercase text-[9px]">PUBLIC-DOMAIN PREVIEW PRESET (PROJECT GUTENBERG)</span>
                    
                    {/* Font sizes adjuster */}
                    <div className="flex items-center gap-2 text-stone-400 bg-stone-950 px-2 py-1 rounded">
                      <FontType className="w-3.5 h-3.5 text-stone-500" />
                      <button 
                        onClick={() => setFontSize(Math.max(12, fontSize - 1))}
                        className="p-1 hover:bg-stone-800 rounded transition text-stone-300"
                        title="Decrease size"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-[10px] font-bold px-1">{fontSize}px</span>
                      <button 
                        onClick={() => setFontSize(Math.min(24, fontSize + 1))}
                        className="p-1 hover:bg-stone-800 rounded transition text-stone-300"
                        title="Increase size"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Reader Pane */}
                  <div className="bg-stone-950 p-6 sm:p-10 rounded-2xl border border-stone-850 h-96 overflow-y-auto shadow-inner leading-relaxed text-stone-300 max-w-none prose prose-invert font-sans">
                    {book.legalReadText ? (
                      <div style={{ fontSize: `${fontSize}px` }} className="space-y-4 whitespace-pre-wrap select-text selection:bg-amber-500 selection:text-black">
                        {book.legalReadText}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center gap-3">
                        <ShieldAlert className="w-8 h-8 text-stone-600" />
                        <div className="space-y-1">
                          <p className="text-stone-400 font-medium text-xs">Publisher authorized preview excerpt unavailable.</p>
                          <p className="text-[11px] text-stone-500 max-w-sm">BookOra never distributes copyrighted materials without explicit author or publisher licensing. Check the 'Format Prices' tab to acquire legitimate copies!</p>
                        </div>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* FORMAT PRICES VIEW */}
              {activeTab === 'compare' && (
                <div className="space-y-6 animate-fade-in">
                  
                  <div>
                    <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase">LEGITIMATE READING FORMATS</span>
                    <p className="text-[11px] text-stone-500 mt-1">Affiliate ready checkout routing portal with verified global retailers.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {book.purchaseLinks.map((link, idx) => (
                      <div 
                        key={idx}
                        className="bg-stone-900 border border-stone-800 p-4 rounded-xl flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-stone-950 border border-stone-850 text-amber-500 rounded-lg">
                            <ShoppingCart className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-stone-200">{link.store}</h4>
                            <p className="text-[10px] font-mono text-stone-500 mt-0.5">FORMAT: Kindle / Hardcover / Audiobook</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-bold text-stone-200">{link.price}</span>
                          <a 
                            href={link.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-stone-800 hover:bg-amber-500 hover:text-black text-stone-300 font-bold px-4 py-2 rounded-lg text-xs transition duration-150 flex items-center gap-1"
                          >
                            <span>Buy</span>
                            <ChevronRight className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-stone-950 border border-stone-850 p-4 rounded-xl text-[11px] text-stone-500 leading-relaxed text-center font-mono">
                    BookOra participates in publisher and merchant affiliate link platforms. A minor portion of revenue derived supports our platform servers without adding any extra costs to our readers.
                  </div>

                </div>
              )}

              {/* REVIEWS VIEW */}
              {activeTab === 'reviews' && (
                <div className="space-y-8 animate-fade-in">
                  
                  {/* Reviews Write Form */}
                  <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl space-y-4">
                    <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase">WRITE A COMMUNITY CRITIQUE</span>
                    
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        {/* Rating selection stars */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-stone-400 mr-2">Assign Rating:</span>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewRating(star)}
                              className={`text-base ${star <= newRating ? 'text-amber-500' : 'text-stone-600'}`}
                            >
                              ★
                            </button>
                          ))}
                        </div>

                        {/* Spoiler toggle */}
                        <label className="flex items-center gap-2 text-xs text-stone-400 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={isReviewSpoiler}
                            onChange={(e) => setIsReviewSpoiler(e.target.checked)}
                            className="accent-amber-500 rounded focus:ring-0"
                          />
                          <span>Contains Narrative Spoilers</span>
                        </label>
                      </div>

                      <textarea
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                        placeholder="Write your review... (Min 100 characters earns 100 XP Literary Critic Achievement!)"
                        className="w-full bg-stone-950 border border-stone-850 rounded-xl p-3 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500 h-24 resize-none"
                      />

                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-stone-500 font-mono">Reviews undergo automated AI safety moderation.</span>
                        <button
                          type="submit"
                          disabled={!reviewContent.trim()}
                          className="bg-amber-500 hover:bg-amber-400 text-black font-bold px-5 py-2.5 rounded-xl text-xs transition duration-150 disabled:opacity-50"
                        >
                          Publish Critique
                        </button>
                      </div>
                    </form>

                    {submitSuccess && (
                      <div className="text-xs bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-lg text-center animate-fade-in">
                        Critique published successfully! You earned +100 XP Literary XP!
                      </div>
                    )}
                  </div>

                  {/* Reviews Timeline */}
                  <div className="space-y-4">
                    <span className="text-[10px] text-stone-500 font-mono tracking-widest uppercase block">COMMUNITY DISCUSSIONS ({bookReviews.length})</span>
                    
                    <div className="space-y-4">
                      {bookReviews.map((rev) => (
                        <div key={rev.id} className="bg-stone-900/60 border border-stone-800/80 p-4 rounded-xl space-y-3 relative">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <img 
                                src={rev.userAvatar} 
                                alt={rev.userName} 
                                className="w-7 h-7 rounded-full object-cover border border-stone-800"
                              />
                              <div>
                                <h5 className="text-xs font-semibold text-stone-200">{rev.userName}</h5>
                                <span className="text-[9px] text-stone-500 font-mono block">{rev.date}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5 bg-stone-950 px-2 py-1 rounded text-xs font-mono text-amber-500">
                              <span>{rev.rating} ★</span>
                            </div>
                          </div>

                          {rev.isSpoiler ? (
                            <SpoilerText text={rev.content} />
                          ) : (
                            <p className="text-xs text-stone-300 leading-relaxed font-sans">{rev.content}</p>
                          )}
                        </div>
                      ))}
                      {bookReviews.length === 0 && (
                        <div className="py-12 text-center text-stone-500 text-xs">No reviews published yet for this title. Be the first to analyze!</div>
                      )}
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// Simple interactive wrapper to conceal spoiler reviews safely
function SpoilerText({ text }: { text: string }) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return <p className="text-xs text-stone-300 leading-relaxed font-sans animate-fade-in">{text}</p>;
  }

  return (
    <div className="bg-stone-950/80 border border-stone-850 p-4 rounded-xl text-center space-y-2">
      <p className="text-[11px] text-amber-500 font-medium font-mono uppercase">⚠ THREAT OF CONCEALED SPOILERS</p>
      <button 
        onClick={() => setRevealed(true)}
        className="text-[10px] text-black font-semibold bg-amber-500 hover:bg-amber-400 px-3 py-1.5 rounded transition duration-150"
      >
        Reveal Review Text
      </button>
    </div>
  );
}
