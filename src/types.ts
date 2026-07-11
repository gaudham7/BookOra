/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Book {
  id: string;
  title: string;
  subtitle: string;
  authorId: string;
  authorName: string;
  coverImage: string;
  publisher: string;
  publishDate: string;
  isbn: string;
  pages: number;
  readingTime: string; // e.g. "5 hours"
  genres: string[];
  themes: string[];
  averageRating: number;
  ratingCount: number;
  description?: string;
  purchaseLinks: {
    store: string;
    price: string;
    link: string;
  }[];
  legalReadText?: string; // Sourced preview text (e.g. public domain excerpt)
  audioAvailability?: boolean;
  awards: string[];
  pacing: 'Slow' | 'Medium' | 'Fast';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  ageSuitability: string;
  contentWarnings: string[];
  aiAnalysis?: {
    summary: string;
    spoilerFreeSummary: string;
    completeSummary: string;
    themeAnalysis: string;
    writingStyleAnalysis: string;
    emotionalTone: string;
    pacingData: number[]; // numbers from 1 to 10 represent pacing index across parts
    strengths: string[];
    weaknesses: string[];
    idealAudience: string;
    keyTakeaways: string[];
    criticObservations: string;
    bookComparison: string;
    aiOpinion: string;
  };
  characters?: Character[];
}

export interface Character {
  name: string;
  role: string; // e.g., "Protagonist", "Antagonist", "Supporting"
  traits: string[];
  motivation: string;
  description: string;
  importance: number; // 1 to 10
  quotes: string[];
  relations?: {
    characterName: string;
    relationType: string;
  }[];
}

export interface Author {
  id: string;
  name: string;
  portrait: string;
  biography: string;
  genres: string[];
  writingStyle: string;
  bibliography: string[]; // List of book titles
  awards: string[];
  readerStats: {
    totalReaders: string;
    averageRating: string;
  };
  socialLinks?: {
    platform: string;
    url: string;
  }[];
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  content: string;
  likes: number;
  date: string;
  isSpoiler?: boolean;
  isAiGenerated?: boolean;
}

export interface UserStats {
  streak: number;
  level: number;
  xp: number;
  targetXp: number;
  completedCount: number;
  currentCount: number;
  wishlistCount: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  xpReward: number;
}

export interface ReadingChallenge {
  id: string;
  title: string;
  description: string;
  targetBooks: number;
  currentBooks: number;
  xpReward: number;
  completed: boolean;
  type: 'yearly' | 'monthly' | 'custom';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'librarian' | 'system';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

export interface UserProfile {
  username: string;
  avatarUrl: string;
  interests: string[];
  bio: string;
  favoriteGenre: string;
  joinedDate: string;
  yearlyTarget: number;
}
