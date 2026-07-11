/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Plus, 
  Check, 
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Review, Book } from '../types';

interface CommunitySectionProps {
  reviews: Review[];
  books: Book[];
  onSelectBook: (book: Book) => void;
  onLikeReview: (reviewId: string) => void;
  addXp: (amount: number) => void;
}

export default function CommunitySection({
  reviews,
  books,
  onSelectBook,
  onLikeReview,
  addXp
}: CommunitySectionProps) {
  // Reading Clubs local state
  const [clubs, setClubs] = useState([
    { id: "club-1", name: "Classic Literature Society", members: 1245, joined: true, category: "Classics", desc: "A cozy community centered on parsing 19th-century prose, gothic structures, and societal ironies." },
    { id: "club-2", name: "Atomic Habit Changers", members: 2490, joined: false, category: "Self-Help", desc: "Form atomic habits together! Share morning routines, accountability milestones, and psychological tips." },
    { id: "club-3", name: "Gothic and Horror Lovers", members: 890, joined: false, category: "Gothic", desc: "Deep analytical discussions about Mary Shelley, Edgar Allan Poe, and chilling psychological thrillers." },
    { id: "club-4", name: "Sherlockian Sleuths Club", members: 630, joined: false, category: "Mystery", desc: "Solve logical puzzles, review criminal procedurals, and read original Conan Doyle Sherlock adventures." }
  ]);

  const toggleJoinClub = (clubId: string) => {
    setClubs(prev => prev.map(c => {
      if (c.id === clubId) {
        const nextJoined = !c.joined;
        if (nextJoined) {
          addXp(25); // Gain 25 XP for joining a reading club!
        }
        return {
          ...c,
          joined: nextJoined,
          members: nextJoined ? c.members + 1 : c.members - 1
        };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 text-amber-500 mb-1.5 font-mono text-xs uppercase tracking-widest font-semibold">
          <Users className="w-4 h-4" />
          <span>The Reader's Guild</span>
        </div>
        <h2 className="font-display font-bold text-2xl text-stone-100 tracking-tight">
          Community & Reading Clubs
        </h2>
        <p className="text-sm text-stone-400 mt-1 max-w-xl">
          Convene with readers globally. Join specialized reading clubs, share customized review shelves, and participate in collaborative discussions.
        </p>
      </div>

      {/* Reading Clubs Grid */}
      <section className="space-y-4">
        <h3 className="text-xs font-mono text-stone-500 uppercase tracking-widest block">ACTIVE READING CLUBS ({clubs.length})</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {clubs.map((c) => (
            <div 
              key={c.id}
              className="bg-stone-900 border border-stone-800/80 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow hover:border-stone-750 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono bg-stone-950 text-stone-400 px-2.5 py-0.5 rounded uppercase font-semibold">
                    {c.category}
                  </span>
                  <span className="text-[10px] font-mono text-stone-500">
                    {c.members.toLocaleString()} MEMBERS
                  </span>
                </div>
                
                <h4 className="font-display font-bold text-base text-stone-100">{c.name}</h4>
                <p className="text-xs text-stone-400 font-sans leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-800/50">
                <span className="text-[10px] text-stone-500 font-mono">Conversations Active</span>
                <button
                  onClick={() => toggleJoinClub(c.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                    c.joined 
                      ? 'bg-stone-950 text-amber-500 border border-amber-500/15' 
                      : 'bg-amber-500 text-black hover:bg-amber-400'
                  }`}
                >
                  {c.joined ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Joined Club</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Join Club</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* General Feed Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-stone-800/50">
        
        {/* Right side activity widget */}
        <div className="lg:col-span-1 space-y-4 lg:order-2">
          <div className="bg-stone-900 border border-stone-800 p-5 rounded-2xl space-y-4 shadow">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h4 className="font-display font-bold text-sm text-stone-200">Active Lit-Discussions</h4>
            </div>

            <div className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-stone-500 uppercase block">In: Classic Literature Society</span>
                <p className="text-stone-300 font-medium font-sans">"Should we consider Gatsby's obsession noble, or is Nick Carraway too biased?"</p>
                <p className="text-[10px] text-stone-500">12 replies • 4 mins ago</p>
              </div>
              <div className="space-y-1 border-t border-stone-800 pt-3">
                <span className="text-[9px] font-mono text-stone-500 uppercase block">In: Gothic and Horror Lovers</span>
                <p className="text-stone-300 font-medium font-sans">"Did Mary Shelley write Frankenstein as a warning against technology or a warning against bad parenting?"</p>
                <p className="text-[10px] text-stone-500">18 replies • 12 mins ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews timeline feed */}
        <div className="lg:col-span-2 space-y-4 lg:order-1">
          <h3 className="text-xs font-mono text-stone-500 uppercase tracking-widest block">COMMUNITY FEED</h3>
          
          <div className="space-y-4">
            {reviews.map((rev) => {
              const bookAssoc = books.find(b => b.id === rev.bookId);
              return (
                <div 
                  key={rev.id}
                  className="bg-stone-900 border border-stone-800/80 p-5 rounded-2xl space-y-4 shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={rev.userAvatar} 
                        alt={rev.userName} 
                        className="w-8 h-8 rounded-full object-cover border border-stone-800"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-stone-200">{rev.userName}</h4>
                        <span className="text-[9px] font-mono text-stone-500 block">{rev.date}</span>
                      </div>
                    </div>
                    
                    <span className="text-xs font-mono text-amber-500 font-bold bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                      {rev.rating} ★
                    </span>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed font-sans">
                    {rev.content}
                  </p>

                  <div className="flex items-center justify-between border-t border-stone-800/60 pt-3 mt-4">
                    {bookAssoc ? (
                      <button 
                        onClick={() => onSelectBook(bookAssoc)}
                        className="text-[11px] font-mono text-stone-400 hover:text-amber-500 transition flex items-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                        <span>Critique on: <strong className="text-stone-300 hover:underline">{bookAssoc.title}</strong></span>
                      </button>
                    ) : (
                      <span className="text-[10px] text-stone-500 font-mono">Dynamic AI analysis book</span>
                    )}

                    <button
                      onClick={() => onLikeReview(rev.id)}
                      className="flex items-center gap-1.5 text-[11px] font-mono text-stone-500 hover:text-red-400 transition"
                    >
                      <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500/10" />
                      <span>{rev.likes} Likes</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
