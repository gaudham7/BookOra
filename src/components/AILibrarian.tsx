/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  BookOpen, 
  RotateCcw,
  Compass,
  FileText,
  Calendar,
  Layers,
  HelpCircle
} from 'lucide-react';
import { ChatMessage, Book } from '../types';

interface AILibrarianProps {
  isOpen: boolean;
  onClose: () => void;
  activeBookContext: Book | null;
  clearBookContext?: () => void;
  addXp: (amount: number) => void;
}

export default function AILibrarian({ 
  isOpen, 
  onClose, 
  activeBookContext,
  clearBookContext,
  addXp
}: AILibrarianProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "librarian",
      text: "Greetings! I am your **BookOra AI Librarian**, your 24/7 personal guide to the world's literature. Ask me to explain complex themes, summarize chapters, suggest optimal reading plans, or comparison-analyze your favorite masterpieces. How can I enrich your reading journey today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    { text: "Create a 30-day reading plan", icon: Calendar },
    { text: "Explain the theme of Frankenstein", icon: Compass },
    { text: "Compare Gatsby and Dorian Gray", icon: Layers },
    { text: "How can I build a daily reading habit?", icon: HelpCircle }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          bookContext: activeBookContext
        })
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'librarian',
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
      
      // Award minor XP for active learning with AI
      addXp(15);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        sender: 'system',
        text: "I experienced a brief transmission interruption with my literary neural networks. Please retry your request.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-re",
        sender: "librarian",
        text: "My reference desk has been cleared! I am ready for fresh literary challenges. What would you like to explore?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-stone-950 border-l border-stone-800 shadow-2xl z-50 flex flex-col justify-between text-stone-200">
      
      {/* Header */}
      <div className="p-4 border-b border-stone-800 flex items-center justify-between bg-stone-900/40 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm text-stone-100 flex items-center gap-1.5">
              AI Librarian Desk
            </h3>
            <p className="text-[10px] text-stone-500 font-mono">
              POWERED BY GEMINI-3.5-FLASH
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={clearChat}
            title="Reset Chat"
            className="p-1.5 hover:bg-stone-800 rounded-lg text-stone-400 hover:text-stone-200 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-stone-800 rounded-lg text-stone-400 hover:text-stone-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Book Context Banner if present */}
      {activeBookContext && (
        <div className="px-4 py-2.5 bg-amber-500/5 border-b border-amber-500/10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-stone-300">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>Active Context: <strong>{activeBookContext.title}</strong></span>
          </div>
          {clearBookContext && (
            <button 
              onClick={clearBookContext}
              className="text-[10px] text-amber-500 hover:underline font-mono"
            >
              Clear Context
            </button>
          )}
        </div>
      )}

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isLibrarian = msg.sender === 'librarian';
          const isSystem = msg.sender === 'system';
          return (
            <div 
              key={msg.id} 
              className={`flex flex-col max-w-[85%] ${
                isLibrarian ? 'mr-auto items-start' : isSystem ? 'mx-auto items-center' : 'ml-auto items-end'
              }`}
            >
              <div 
                className={`p-3 rounded-2xl text-xs leading-relaxed ${
                  isLibrarian 
                    ? 'bg-stone-900 border border-stone-800/80 text-stone-200 rounded-tl-none' 
                    : isSystem
                    ? 'bg-red-500/10 border border-red-500/20 text-red-400 text-center rounded-lg'
                    : 'bg-gradient-to-br from-amber-500 to-amber-600 text-black font-medium rounded-tr-none'
                }`}
              >
                {isLibrarian ? (
                  <div className="space-y-2 prose prose-invert max-w-none text-stone-200">
                    {/* Simple Markdown Parser support inside Chat (since we can't install react-markdown synchronously easily without delaying) */}
                    {msg.text.split('\n').map((para, i) => {
                      // Bullet lists
                      if (para.startsWith('- ') || para.startsWith('* ')) {
                        return (
                          <li key={i} className="list-disc list-inside pl-1 text-stone-300">
                            {para.slice(2).replace(/\*\*(.*?)\*\*/g, '$1')}
                          </li>
                        );
                      }
                      // Number lists
                      if (/^\d+\./.test(para)) {
                        return (
                          <div key={i} className="pl-1 text-stone-300">
                            {para.replace(/\*\*(.*?)\*\*/g, '$1')}
                          </div>
                        );
                      }
                      // Bold lines
                      if (para.startsWith('###')) {
                        return <h4 key={i} className="font-display font-semibold text-amber-400 mt-2">{para.replace('###', '')}</h4>;
                      }
                      // Standard paragraphs with basic bold replacements
                      const formattedText = para.split('**').map((chunk, idx) => {
                        return idx % 2 === 1 ? <strong key={idx} className="text-amber-400 font-semibold">{chunk}</strong> : chunk;
                      });
                      return <p key={i} className="mb-1">{formattedText}</p>;
                    })}
                  </div>
                ) : (
                  msg.text
                )}
              </div>
              <span className="text-[9px] text-stone-500 font-mono mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {/* Loading placeholder */}
        {isLoading && (
          <div className="flex flex-col items-start max-w-[85%] mr-auto">
            <div className="p-3.5 bg-stone-900 border border-stone-800 rounded-2xl rounded-tl-none flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span className="text-[10px] font-mono text-stone-500">Consulting reference logs...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Dynamic suggestions if chat is empty or just started */}
      {messages.length <= 2 && !isLoading && (
        <div className="px-4 py-2 border-t border-stone-900 space-y-2 bg-stone-950/50">
          <span className="text-[10px] text-stone-500 font-mono uppercase tracking-wider block">Suggested Queries:</span>
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map((sug, i) => {
              const SugIcon = sug.icon;
              return (
                <button
                  key={i}
                  onClick={() => handleSend(sug.text)}
                  className="p-2 text-[10px] text-left bg-stone-900 border border-stone-800 rounded-xl hover:border-amber-500/40 hover:bg-stone-800/50 text-stone-300 transition flex items-center gap-2"
                >
                  <SugIcon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">{sug.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputText);
        }}
        className="p-4 border-t border-stone-800 bg-stone-950 flex gap-2"
      >
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={activeBookContext ? `Ask about "${activeBookContext.title}"...` : "Ask your librarian..."}
          className="flex-1 bg-stone-900 border border-stone-800/80 rounded-xl px-4 py-3 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
        />
        <button 
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="p-3 bg-amber-500 text-black hover:bg-amber-400 rounded-xl disabled:opacity-50 disabled:hover:bg-amber-500 transition duration-150 shadow-md flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
