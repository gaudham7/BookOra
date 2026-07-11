/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const STATE_FILE_PATH = path.join(DATA_DIR, 'user_state.json');

// Default initial user state
const defaultState = {
  shelves: {
    currentlyReading: ["great-gatsby"],
    read: ["frankenstein"],
    wishlist: ["study-in-scarlet", "atomic-habits"]
  },
  customBooks: [] as any[],
  reviews: [] as any[],
  profile: {
    username: 'Acolyte Scholar',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
    interests: ['Classic Literature', 'Philosophy', 'History'],
    bio: 'Passionate digital library researcher seeking deep symbolic insights and classical literary treasures.',
    favoriteGenre: 'Classic Literature',
    joinedDate: 'July 2026',
    yearlyTarget: 12
  },
  stats: {
    streak: 5,
    level: 3,
    xp: 320,
    targetXp: 500,
    completedCount: 1,
    currentCount: 1,
    wishlistCount: 2
  },
  challenges: [
    {
      id: "spring-classics",
      title: "Classic Literary Explorer",
      description: "Read at least two public domain classic novels to explore the depths of 19th and early 20th century literature.",
      targetBooks: 2,
      currentBooks: 1,
      xpReward: 300,
      completed: false,
      type: "monthly"
    },
    {
      id: "habit-builder",
      title: "Habits and Productivity Mastery",
      description: "Read a personal development or business book to form positive habits.",
      targetBooks: 1,
      currentBooks: 0,
      xpReward: 150,
      completed: false,
      type: "custom"
    },
    {
      id: "yearly-challenge",
      title: "2026 Grand Reading Challenge",
      description: "Set a goal to read 12 books this year to feed your mind and expand your horizons.",
      targetBooks: 12,
      currentBooks: 4,
      xpReward: 1000,
      completed: false,
      type: "yearly"
    }
  ],
  achievements: [
    {
      id: "first-step",
      title: "The Odyssey Begins",
      description: "Mark your first book as 'Currently Reading' on your shelf.",
      iconName: "Compass",
      unlockedAt: "2026-07-10T14:30:00Z",
      xpReward: 50
    },
    {
      id: "classic-lover",
      title: "Librarian's Favorite",
      description: "Read a public domain classic book.",
      iconName: "Award",
      unlockedAt: "2026-07-11T02:15:00Z",
      xpReward: 100
    },
    {
      id: "streak-3",
      title: "Consistent Reader",
      description: "Maintain a 3-day reading streak.",
      iconName: "Flame",
      unlockedAt: undefined,
      xpReward: 150
    },
    {
      id: "ai-collaborator",
      title: "AI Dialogue Partner",
      description: "Ask the AI Librarian for three deep theme analysis questions.",
      iconName: "Sparkles",
      unlockedAt: undefined,
      xpReward: 100
    },
    {
      id: "critic",
      title: "Literary Critic",
      description: "Write a book review with at least 100 characters.",
      iconName: "FileText",
      unlockedAt: undefined,
      xpReward: 100
    }
  ]
};

// Read / Write State
function readUserState(): typeof defaultState {
  try {
    if (fs.existsSync(STATE_FILE_PATH)) {
      const content = fs.readFileSync(STATE_FILE_PATH, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.error("Error reading user state file:", error);
  }
  return defaultState;
}

function writeUserState(state: typeof defaultState) {
  try {
    fs.writeFileSync(STATE_FILE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error writing user state file:", error);
  }
}

// Lazy Gemini API Client Initialization
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "") {
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// ---------------- API ENDPOINTS ----------------

// Get user state
app.get('/api/state', (req, res) => {
  const state = readUserState();
  res.json(state);
});

// Update user state
app.post('/api/state', (req, res) => {
  const updated = req.body;
  if (updated) {
    writeUserState(updated);
    res.json({ success: true, state: updated });
  } else {
    res.status(400).json({ error: "No state data provided" });
  }
});

// AI Conversational Chatbot (AI Librarian)
app.post('/api/ai/chat', async (req, res) => {
  const { messages, bookContext } = req.body;
  const lastMessage = messages[messages.length - 1]?.text;

  if (!lastMessage) {
    return res.status(400).json({ error: "Missing message text" });
  }

  const client = getGeminiClient();
  const contextPrompt = bookContext 
    ? `The user is currently viewing/asking about the book "${bookContext.title}" by ${bookContext.authorName}. Keep this book in mind as context for your answers.`
    : `The user is browsing the general digital library.`;

  const systemInstruction = `You are a highly helpful, charming, and expert AI Librarian at BookOra, the ultimate home for readers.
Your answers should be highly engaging, friendly, objective, and presented in clean Markdown.
${contextPrompt}
Rules:
1. Always distinguish between verified book metadata (which is objective) and your AI-generated insights/symbolic interpretations.
2. If the user asks about a theme, symbol, characters, or suggests reading orders, offer brilliant and structured responses.
3. Keep formatting gorgeous with bold headings, lists, and quotes.
4. You may summarize chapters or suggest personalized reading plans when asked.
5. If recommending books, suggest 2-3 titles and explain briefly why they fit the user's inquiry.`;

  if (!client) {
    // Elegant fallback response if no key is present
    setTimeout(() => {
      let mockReply = `Hello there! I'm your **BookOra AI Librarian**. 
      
*(Note: GEMINI_API_KEY is not configured yet, so I am running in Offline Librarian mode!)*

It looks like you're interested in exploring literature! Since you asked, here are some thoughts:
- **Classic Explorer**: I highly recommend reading *The Great Gatsby* for its rich symbolism of hope and class disparity.
- **Deep Themes**: If you like dark psychological horror, *Frankenstein* by Mary Shelley is a deep masterpiece about creation, neglect, and loneliness.
- **Habit Tracking**: Want to build better reading habits? James Clear's *Atomic Habits* has the absolute perfect systems for that!

Would you like to ask me about character motivation, analyze symbolic elements, or create a personalized 30-day reading schedule?`;
      
      if (lastMessage.toLowerCase().includes("plan")) {
        mockReply = `### Your 30-Day Reading Plan (Offline Mode)
        
Here is an elegant reading plan to develop a robust reading routine:
1. **Days 1–5**: Read James Clear's *Atomic Habits* (Chapter 1–3). Focus on the "2-Minute Rule" to establish your reading timeslot.
2. **Days 6–15**: Read F. Scott Fitzgerald's *The Great Gatsby*. Read 1 chapter per night. Analyze how Nick Carraway's opinion of Gatsby shifts.
3. **Days 16–30**: Tackle Mary Shelley's *Frankenstein*. Pay attention to how the creature's speech patterns change from raw sensory input to advanced philosophy.

*XP Reward upon completion: 300 XP!* Let me know if you would like to adjust this list.`;
      }
      
      res.json({ text: mockReply });
    }, 800);
    return;
  }

  try {
    // Construct simplified history for API
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...history,
        { role: 'user', parts: [{ text: lastMessage }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7
      }
    });

    res.json({ text: response.text || "I was unable to formulate a response at this moment." });
  } catch (error: any) {
    console.error("Gemini API Chat Error:", error);
    res.status(500).json({ error: error.message || "Failed to contact Gemini API" });
  }
});

// Smart Search Endpoint
app.post('/api/ai/smart-search', async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  const client = getGeminiClient();

  if (!client) {
    // Offline smart search filter (regex matching catalogs)
    const normalized = query.toLowerCase();
    let matches = [] as any[];
    if (normalized.includes("gatsby") || normalized.includes("wealth") || normalized.includes("romance") || normalized.includes("dream") || normalized.includes("green")) {
      matches.push({ id: "great-gatsby", reason: "Directly matches wealth, longing, or the Roaring Twenties themes mentioned." });
    }
    if (normalized.includes("frankenstein") || normalized.includes("monster") || normalized.includes("science") || normalized.includes("horror")) {
      matches.push({ id: "frankenstein", reason: "Matches science, gothic themes, and parental responsibility issues." });
    }
    if (normalized.includes("sherlock") || normalized.includes("holmes") || normalized.includes("mystery") || normalized.includes("crime") || normalized.includes("deduction")) {
      matches.push({ id: "study-in-scarlet", reason: "Direct match for detective logic and mysterious London crime solving." });
    }
    if (normalized.includes("habit") || normalized.includes("atomic") || normalized.includes("productivity") || normalized.includes("self-help") || normalized.includes("routine")) {
      matches.push({ id: "atomic-habits", reason: "Matches cognitive behavior systems and personal productivity." });
    }

    if (matches.length === 0) {
      // Fallback
      matches.push({ id: "great-gatsby", reason: "Highly popular starting classic matching diverse, elegant tastes." });
    }

    return res.json({
      matches,
      explanation: `*(Offline Search)* I found matches based on keywords: **${matches.map(m => m.id).join(', ')}**. Once the Gemini API is configured, natural language search will perform a deep semantic analysis of themes, writing style, pacing, and emotional tone!`
    });
  }

  try {
    const prompt = `You are a smart search engine for BookOra.
The user enters a natural language search query: "${query}".
Evaluate which of these 4 seeded book IDs would fit:
1. "great-gatsby" (F. Scott Fitzgerald - Themes of luxury, wealth, romance, tragedy, twenties, green light)
2. "frankenstein" (Mary Shelley - Themes of horror, science vs nature, gothic, creator responsibility, loneliness)
3. "study-in-scarlet" (Arthur Conan Doyle - Themes of detective, logical puzzle, mystery, Victorian London)
4. "atomic-habits" (James Clear - Themes of productivity, behavioral habits, self improvement, continuous learning)

Format your output strictly as a JSON object with this exact schema:
{
  "matches": [
    { "id": "book-id-string", "reason": "1-sentence explanation of why it fits" }
  ],
  "explanation": "A beautifully written 2-sentence summary of what kind of books the user is looking for and why these matches represent that mood."
}
Return ONLY valid JSON. No markdown wrappers.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  reason: { type: Type.STRING }
                },
                required: ["id", "reason"]
              }
            },
            explanation: { type: Type.STRING }
          },
          required: ["matches", "explanation"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Smart Search Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// AI Recommendations Generator
app.post('/api/ai/recommend', async (req, res) => {
  const { preferences } = req.body;
  const client = getGeminiClient();

  if (!client) {
    // Offline recommendation list
    return res.json({
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
  }

  try {
    const prompt = `You are the core Recommendation engine at BookOra.
The user wants recommendations based on:
- Favorite Genres: ${preferences.genres?.join(', ') || 'Any'}
- Current Mood: ${preferences.mood || 'Reflective'}
- Available Time: ${preferences.time || 'Not restricted'}
- Difficulty Goal: ${preferences.difficulty || 'Intermediate'}

Recommend exactly 3 books (not in the seed list) that match these tastes perfectly. They must be real, published books.
For each recommended book, provide the title, author, genre, matching reason, pacing, difficulty, and a recommended background color gradient for an elegant cover placeholder.

Format your output strictly as a JSON object with this schema:
{
  "books": [
    {
      "title": "Book Title",
      "author": "Author Name",
      "genre": "Primary Genre",
      "reason": "1-sentence explanation of why it fits their criteria",
      "pacing": "Slow" | "Medium" | "Fast",
      "difficulty": "Beginner" | "Intermediate" | "Advanced",
      "coverGradient": "tailwind gradient class, e.g. 'from-amber-900 to-stone-950'"
    }
  ],
  "commentary": "A warm, personalized 2-sentence encouraging note explaining how these selections suit their mood."
}
Return ONLY valid JSON. No markdown.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            books: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  author: { type: Type.STRING },
                  genre: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  pacing: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                  coverGradient: { type: Type.STRING }
                },
                required: ["title", "author", "genre", "reason", "pacing", "difficulty", "coverGradient"]
              }
            },
            commentary: { type: Type.STRING }
          },
          required: ["books", "commentary"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("AI Recommendation Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Dynamic AI Book Profiler (Handles ANY non-catalog book analysis on the fly!)
app.post('/api/ai/analyze-book', async (req, res) => {
  const { title, author } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Book title is required" });
  }

  const client = getGeminiClient();

  if (!client) {
    // Elegant offline analyzer fallback
    return res.json({
      summary: `This is a high-level briefing on "${title}" by ${author || 'Unknown Author'}.`,
      spoilerFreeSummary: `Explore the incredible landscape of "${title}". This classic or contemporary work is celebrated globally for its unique contributions to its genre.`,
      completeSummary: `A complete outline of "${title}"'s narrative arcs is available when online.`,
      themeAnalysis: `Analyzes the core human dilemmas and narrative structures present in "${title}".`,
      writingStyleAnalysis: `Describes the author's voice, formatting choice, and vocabulary choices in "${title}".`,
      emotionalTone: "Intellectual & Reflective",
      pacingData: [5, 5, 5, 5, 5, 5, 5, 5, 5],
      strengths: ["Compelling characters", "Atmospheric worldbuilding"],
      weaknesses: ["Slow introductory exposition"],
      idealAudience: "Acoustic and dramatic readers",
      keyTakeaways: [
        "A profound examination of character goals.",
        "A reflection of the period's social struggles."
      ],
      criticObservations: `Academics celebrate "${title}" for its lasting structural impact on subsequent generations of writers.`,
      bookComparison: "Similar to prominent titles in the same category.",
      aiOpinion: `"${title}" remains an essential milestone in library collections, inviting deep discussion.`
    });
  }

  try {
    const prompt = `You are the primary literary analyst at BookOra.
The user wants an in-depth AI analysis of the book: "${title}" by ${author || 'Unknown Author'}.
Generate a comprehensive profile including:
1. Short general summary
2. Spoiler-free summary
3. Complete detailed summary (with plot outline)
4. Theme analysis
5. Writing style analysis
6. Emotional tone description
7. Pacing indexes (exactly 9 integers representing pacing intensity from 1 to 10 across chapter segments)
8. Strengths list (at least 2)
9. Weaknesses list (at least 2)
10. Ideal audience description
11. 3 key actionable takeaways
12. Critic observations
13. Similar book comparison
14. Your AI-labeled professional literary opinion

Format your output strictly as a JSON object with this schema:
{
  "summary": "...",
  "spoilerFreeSummary": "...",
  "completeSummary": "...",
  "themeAnalysis": "...",
  "writingStyleAnalysis": "...",
  "emotionalTone": "...",
  "pacingData": [5, 6, 7, 5, 8, 9, 7, 5, 4],
  "strengths": ["...", "..."],
  "weaknesses": ["...", "..."],
  "idealAudience": "...",
  "keyTakeaways": ["...", "...", "..."],
  "criticObservations": "...",
  "bookComparison": "...",
  "aiOpinion": "..."
}
Return ONLY valid JSON. No markdown wrappers.`;

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            spoilerFreeSummary: { type: Type.STRING },
            completeSummary: { type: Type.STRING },
            themeAnalysis: { type: Type.STRING },
            writingStyleAnalysis: { type: Type.STRING },
            emotionalTone: { type: Type.STRING },
            pacingData: {
              type: Type.ARRAY,
              items: { type: Type.INTEGER }
            },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            weaknesses: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            idealAudience: { type: Type.STRING },
            keyTakeaways: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            criticObservations: { type: Type.STRING },
            bookComparison: { type: Type.STRING },
            aiOpinion: { type: Type.STRING }
          },
          required: [
            "summary", "spoilerFreeSummary", "completeSummary", "themeAnalysis",
            "writingStyleAnalysis", "emotionalTone", "pacingData", "strengths",
            "weaknesses", "idealAudience", "keyTakeaways", "criticObservations",
            "bookComparison", "aiOpinion"
          ]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Dynamic Book Analysis Error:", error);
    res.status(500).json({ error: error.message });
  }
});


// ---------------- SERVER AND VITE MIDDLEWARE ----------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[BookOra Server] running on port ${PORT}`);
  });
}

startServer();
