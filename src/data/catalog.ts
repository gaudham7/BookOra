import { Book, Author, Review, ReadingChallenge, Achievement } from '../types';

export const authorsList: Author[] = [
  {
    id: "scott-fitzgerald",
    name: "F. Scott Fitzgerald",
    portrait: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80",
    biography: "Francis Scott Key Fitzgerald (September 24, 1896 – December 21, 1940) was an American novelist, essayist, and screenwriter. He was best known for his novels depicting the flamboyance and excess of the Jazz Age—a term which he coined. During his lifetime, he published four novels, four story collections, and hundreds of short stories, achieving popular success but struggling financially.",
    genres: ["Classic Literature", "Modernism", "Fiction"],
    writingStyle: "Elegant, lyrical, atmospheric, heavily focused on symbolism and critiques of social mobility, wealth, and the elusive American Dream.",
    bibliography: ["The Great Gatsby", "This Side of Paradise", "The Beautiful and Damned", "Tender Is the Night", "The Last Tycoon"],
    awards: ["Modern Library 100 Best Novels (#2)", "Prometheus Hall of Fame Nominee"],
    readerStats: {
      totalReaders: "14.2M",
      averageRating: "4.4"
    },
    socialLinks: [
      { platform: "Wikipedia", url: "https://en.wikipedia.org/wiki/F._Scott_Fitzgerald" },
      { platform: "Official Estate", url: "https://fitzgeraldsociety.org" }
    ]
  },
  {
    id: "mary-shelley",
    name: "Mary Shelley",
    portrait: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    biography: "Mary Wollstonecraft Shelley (August 30, 1797 – February 1, 1851) was an English novelist who wrote the Gothic novel Frankenstein; or, The Modern Prometheus, which is considered an early example of science fiction. She also edited and promoted the works of her husband, the Romantic poet and philosopher Percy Bysshe Shelley.",
    genres: ["Gothic Fiction", "Horror", "Science Fiction"],
    writingStyle: "Philosophical, melancholic, epistolary, rich in psychological depth, reflecting Romantic ideals and cautioning against unchecked scientific ambition.",
    bibliography: ["Frankenstein", "Valperga", "The Last Man", "Lodore", "Falkner"],
    awards: ["SF and Fantasy Hall of Fame inducted", "The Guardian 100 Best Novels (#8)"],
    readerStats: {
      totalReaders: "8.9M",
      averageRating: "4.5"
    }
  },
  {
    id: "conan-doyle",
    name: "Arthur Conan Doyle",
    portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    biography: "Sir Arthur Ignatius Conan Doyle (May 22, 1859 – July 7, 1930) was a British writer and physician. He created the character Sherlock Holmes in 1887 for A Study in Scarlet, the first of four novels and fifty-six short stories about Holmes and Dr. Watson. The Sherlock Holmes stories are milestones in the field of crime fiction.",
    genres: ["Mystery", "Detective Fiction", "Adventure"],
    writingStyle: "Logical, descriptive, methodical, driven by deduction, showcasing witty dialogues, Victorian London atmospherics, and a procedural pace.",
    bibliography: ["A Study in Scarlet", "The Sign of the Four", "The Adventures of Sherlock Holmes", "The Hound of the Baskervilles", "The Lost World"],
    awards: ["Knight Bachelor (1902)", "Edgar Award Grand Master (Posthumous)"],
    readerStats: {
      totalReaders: "12.5M",
      averageRating: "4.6"
    }
  },
  {
    id: "james-clear",
    name: "James Clear",
    portrait: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    biography: "James Clear is an American author, entrepreneur, and keynote speaker focused on habits, decision-making, and continuous improvement. He is best known as the author of the #1 New York Times bestseller Atomic Habits, which has sold over 15 million copies worldwide and been translated into over 50 languages.",
    genres: ["Self-Help", "Personal Development", "Psychology"],
    writingStyle: "Actionable, clear, structured, science-backed, heavily utilizing lists, diagrams, bullet points, and real-world anecdotes.",
    bibliography: ["Atomic Habits", "3-2-1 Newsletter Collection"],
    awards: ["#1 Wall Street Journal Bestseller", "Audible Audiobook of the Year"],
    readerStats: {
      totalReaders: "15.0M",
      averageRating: "4.8"
    }
  },
  {
    id: "jane-austen",
    name: "Jane Austen",
    portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    biography: "Jane Austen (December 16, 1775 – July 18, 1817) was an English novelist known primarily for her six major novels, which interpret, critique, and comment upon the British landed gentry at the end of the 18th century. Austen's plots often explore the dependence of women on marriage in the pursuit of favorable social standing and economic security.",
    genres: ["Romance", "Social Satire", "Classic Literature"],
    writingStyle: "Witty, ironical, dialogue-heavy, deeply focused on domestic realism, psychological acuity, and societal expectations.",
    bibliography: ["Pride and Prejudice", "Sense and Sensibility", "Mansfield Park", "Emma", "Northanger Abbey", "Persuasion"],
    awards: ["Modern Library 100 Best Novels (#5)", "Guardian Best Romances of All Time (#1)"],
    readerStats: {
      totalReaders: "18.1M",
      averageRating: "4.7"
    }
  },
  {
    id: "frank-herbert",
    name: "Frank Herbert",
    portrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    biography: "Franklin Patrick Herbert Jr. (October 8, 1920 – February 11, 1986) was an American science-fiction author best known for his 1965 novel Dune and its five sequels. Although he became famous for science fiction, he also worked as a newspaper journalist, photographer, book reviewer, ecological consultant, and lecturer.",
    genres: ["Science Fiction", "Space Opera", "Political Philosophy"],
    writingStyle: "Expansive, complex, layered with ecological, religious, and political subtexts; utilizing deep third-person omniscient perspective and rich worldbuilding.",
    bibliography: ["Dune", "Dune Messiah", "Children of Dune", "God Emperor of Dune", "The Dosadi Experiment", "The White Plague"],
    awards: ["Hugo Award for Best Novel (1966)", "Nebula Award for Best Novel (1965)"],
    readerStats: {
      totalReaders: "10.4M",
      averageRating: "4.6"
    }
  }
];

export const booksList: Book[] = [
  {
    id: "great-gatsby",
    title: "The Great Gatsby",
    subtitle: "The American Dream in the Roaring Twenties",
    authorId: "scott-fitzgerald",
    authorName: "F. Scott Fitzgerald",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&q=80",
    publisher: "Charles Scribner's Sons",
    publishDate: "April 10, 1925",
    isbn: "9780743273565",
    pages: 180,
    readingTime: "3.5 hours",
    genres: ["Classic Literature", "Modernist Fiction", "Drama"],
    themes: ["Wealth Inequality", "The Illusion of Love", "Social Mobility", "The American Dream", "Nostalgia and Time"],
    averageRating: 4.4,
    ratingCount: 4520934,
    awards: ["Great Books of the Western World Selection", "TIME All-TIME 100 Novels"],
    pacing: "Medium",
    difficulty: "Intermediate",
    ageSuitability: "13+ years (High school curricula classic)",
    contentWarnings: ["Alcohol abuse", "Infidelity", "Domestic conflict", "Gun violence (accidents)"],
    purchaseLinks: [
      { store: "Amazon", price: "$7.99", link: "https://www.amazon.com/Great-Gatsby-F-Scott-Fitzgerald/dp/0743273567" },
      { store: "Barnes & Noble", price: "$8.49", link: "https://www.barnesandnoble.com/w/the-great-gatsby-f-scott-fitzgerald/1116668135" },
      { store: "Bookshop.org", price: "$14.72", link: "https://bookshop.org/p/books/the-great-gatsby-f-scott-fitzgerald/16636733" }
    ],
    audioAvailability: true,
    legalReadText: `CHAPTER I

In my younger and more vulnerable years my father gave me some advice that I’ve been turning over in my mind ever since.

“Whenever you feel like criticizing any one,” he told me, “just remember that all the people in this world haven’t had the advantages that you’ve had.”

He didn’t say any more, but we’ve always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I’m inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men. Most of the confidences were unsought—frequently I have feigned sleep, preoccupation, or a hostile levity when I realized by some unmistakable sign that an intimate revelation was quivering on the horizon; for the intimate revelations of young men, or at least the terms in which they express them, are usually plagiaristic and marred by obvious suppressions. Reserving judgments is a matter of infinite hope. I am still a little afraid of missing something if I forget that, as my father snobbishly suggested, and I snobbishly repeat, a sense of the fundamental decencies is parcelled out unequally at birth.

And, after boasting this way of my tolerance, I come to the admission that it has a limit. Conduct may be founded on the hard rock or the wet marshes, but after a certain point I don’t care what it’s founded on. When I came back from the East last autumn I felt that I wanted the world to be in uniform and at a sort of moral attention forever; I wanted no more riotous excursions with privileged glimpses into the human heart. Only Gatsby, the man who gives his name to this book, was exempt from my reaction—Gatsby, who represented everything for which I have an unaffected scorn. If personality is an unbroken series of successful gestures, then there was something gorgeous about him, some heightened sensitivity to the promises of life, as if he were related to one of those intricate machines that register earthquakes ten thousand miles away. This responsiveness had nothing to do with that flabby impressionability which is dignified under the name of the “creative temperament”—it was an extraordinary gift for hope, a romantic readiness such as I have never found in any other person and which it is not likely I shall ever find again. No—Gatsby turned out all right at the end; it is what preyed on Gatsby, what foul dust floated in the wake of his dreams that temporarily closed out my interest in the abortive sorrows and short-winded elations of men.`,
    aiAnalysis: {
      summary: "Nick Carraway moves to Long Island in the summer of 1922 and gets drawn into the orbit of Jay Gatsby, a mysterious self-made millionaire harboring an obsession for Nick's cousin Daisy Buchanan. The novel explores social boundaries, extravagant parties, tragic moral decays, and the shattering of Gatsby's romantic dream.",
      spoilerFreeSummary: "An elegant narrator, Nick Carraway, details his summer on Long Island, where he resides next to a luxurious mansion owned by Jay Gatsby. Gatsby holds grand, lavish parties to attract the love of his life, Daisy Buchanan, who is married to a wealthy and callous socialite. Underneath the glamorous jazz age veneer lies a profound story of obsession, class clashes, and the tragic consequences of longing for the past.",
      completeSummary: "Nick Carraway narrates the tragic story of Jay Gatsby, born James Gatz, who accumulated illegal bootlegging fortune to win back Daisy Fay (now Buchanan). Nick facilitates their reunion, prompting a passionate rekindling. However, after a climactic confrontation in Manhattan, Daisy hits and kills her husband Tom's mistress, Myrtle Wilson, while driving Gatsby's yellow car. Myrtle's husband, George Wilson, manipulated by Tom, shoots Gatsby dead in his swimming pool before taking his own life. Gatsby dies abandoned by his party-goers, with Nick being one of the few who recognizes the purity of his romantic quest.",
      themeAnalysis: "Symbolism plays an extraordinary role: the Green Light at Daisy's dock represents the unattainable future and the longing of the past; the Valley of Ashes signifies the moral decay of industrial capitalism and the neglect of the lower class; the Eyes of Dr. T.J. Eckleburg look over the wasteland as a detached, silent spiritual judge.",
      writingStyleAnalysis: "Fitzgerald's prose is poetic, highly evocative, and relies on structural ironies, vivid sensory adjectives, and a first-person peripheral narrative perspective that balances proximity with objective distance.",
      emotionalTone: "Melancholic, glamorous, cynical, nostalgic, tragic, and hopeful.",
      pacingData: [4, 5, 7, 5, 6, 8, 9, 6, 4],
      strengths: ["Lush, rhythmic prose", "Vivid period setting", "Timeless structural design", "Flawless character psychology"],
      weaknesses: ["Short length leaves some side characters less explored", "Nick Carraway's subjective view may bias readers"],
      idealAudience: "Lovers of classic drama, tragedy, historical fiction, and poetic prose searching for deep human commentary.",
      keyTakeaways: [
        "The past cannot be repeated, no matter how hard we try to rebuild it.",
        "Wealth does not buy moral immunity or true connection.",
        "Optimism and romantic hope can lead to tragic blindness when directed toward false idols."
      ],
      criticObservations: "Fitzgerald captures the spiritual vacuum of high society in a post-WWI boom. While originally a commercial flop, it is now celebrated as the quintessential literary representation of the Jazz Age.",
      bookComparison: "Similar to 'Tender Is the Night' (also by Fitzgerald) in its tragic portrayal of social disillusionment, and 'The Picture of Dorian Gray' in its focus on vanity, beauty, and moral disintegration.",
      aiOpinion: "F. Scott Fitzgerald's masterpiece is a triumph of balance. Every sentence is a finely polished mirror reflecting both individual romanticism and structural social rot. It is arguably the most perfect brief novel in the English language."
    },
    characters: [
      {
        name: "Jay Gatsby",
        role: "Protagonist",
        traits: ["Optimistic", "Enigmatic", "Ambitious", "Romantic", "Obsessive"],
        motivation: "To win back the love of Daisy Buchanan and recreate their past relationship.",
        description: "A mysterious millionaire who lives in West Egg and holds lavish weekend parties. Born poor as James Gatz, he transformed himself into an aristocrat through illicit activities.",
        importance: 10,
        quotes: [
          "Can't repeat the past? Why of course you can!",
          "Her voice is full of money."
        ],
        relations: [
          { characterName: "Daisy Buchanan", relationType: "Romantic Obsession" },
          { characterName: "Nick Carraway", relationType: "Confidant & Neighbor" },
          { characterName: "Meyer Wolfsheim", relationType: "Business Partner (Bootlegging)" }
        ]
      },
      {
        name: "Nick Carraway",
        role: "Narrator & Confidant",
        traits: ["Observant", "Reserved", "Honest", "Tolerant", "Reflective"],
        motivation: "To learn the bond business, find his footing in the East, and understand Gatsby.",
        description: "A young Yale graduate from the Midwest who moves to New York to work in bonds. He serves as the moral compass and chronicler of Gatsby's story.",
        importance: 9,
        quotes: [
          "I am one of the few honest people that I have ever known.",
          "So we beat on, boats against the current, borne back ceaselessly into the past."
        ],
        relations: [
          { characterName: "Jay Gatsby", relationType: "Close Friend / Admirer" },
          { characterName: "Daisy Buchanan", relationType: "Cousin" },
          { characterName: "Jordan Baker", relationType: "Love Interest (Brief)" }
        ]
      },
      {
        name: "Daisy Buchanan",
        role: "Love Interest",
        traits: ["Charmingly superficial", "Capricious", "Fragile", "Melancholy", "Privileged"],
        motivation: "To preserve social standing, escape moral responsibility, and find superficial security.",
        description: "A beautiful, rich woman from Louisville who fell in love with Gatsby during the war but married Tom Buchanan when Gatsby was sent overseas.",
        importance: 9,
        quotes: [
          "I hope she'll be a fool—that's the best thing a girl can be in this world, a beautiful little fool.",
          "They're such beautiful shirts. It makes me sad because I've never seen such beautiful shirts before."
        ],
        relations: [
          { characterName: "Jay Gatsby", relationType: "Past and Present Lover" },
          { characterName: "Tom Buchanan", relationType: "Husband (Unfaithful but Bound)" },
          { characterName: "Nick Carraway", relationType: "Cousin" }
        ]
      },
      {
        name: "Tom Buchanan",
        role: "Antagonist",
        traits: ["Arrogant", "Hypocritical", "Bullying", "Racist", "Wealthy"],
        motivation: "To assert his physical and social dominance, protect his old-money status.",
        description: "Daisy's immensely wealthy husband. A former star athlete at Yale, Tom is a brutish man with aggressive views and a string of extramarital affairs.",
        importance: 8,
        quotes: [
          "Civilization's going to pieces... It's up to us, who are the dominant race, to watch out or these other races will have control of things."
        ],
        relations: [
          { characterName: "Daisy Buchanan", relationType: "Husband" },
          { characterName: "Myrtle Wilson", relationType: "Mistress" },
          { characterName: "Jay Gatsby", relationType: "Rival / Class Enemy" }
        ]
      }
    ]
  },
  {
    id: "frankenstein",
    title: "Frankenstein",
    subtitle: "Or, The Modern Prometheus",
    authorId: "mary-shelley",
    authorName: "Mary Shelley",
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&q=80",
    publisher: "Lackington, Hughes, Harding, Mavor & Jones",
    publishDate: "January 1, 1818",
    isbn: "9780141439471",
    pages: 280,
    readingTime: "5.5 hours",
    genres: ["Gothic Fiction", "Horror", "Science Fiction", "Classics"],
    themes: ["Science vs Nature", "Isolation and Alienation", "Revenge and Obsession", "Parental Responsibility", "Monster vs Creator"],
    averageRating: 4.5,
    ratingCount: 1982034,
    awards: ["Greatest Books of the Gothic Tradition", "The Guardian 100 Best English Novels"],
    pacing: "Slow",
    difficulty: "Advanced",
    ageSuitability: "14+ years (Complex vocabulary and ethics)",
    contentWarnings: ["Death of loved ones", "Suicidal ideation", "Murder", "Body horror (implied)"],
    purchaseLinks: [
      { store: "Amazon", price: "$5.99", link: "https://www.amazon.com/Frankenstein-Mary-Shelley/dp/0141439475" },
      { store: "Barnes & Noble", price: "$6.50", link: "https://www.barnesandnoble.com/w/frankenstein-mary-shelley/1116611035" }
    ],
    audioAvailability: true,
    legalReadText: `LETTER I

To Mrs. Saville, England.

St. Petersburgh, Dec. 11th, 17—.

You will rejoice to hear that no disaster has accompanied the commencement of an enterprise which you have regarded with such evil forebodings. I arrived here yesterday; and my first task is to assure my dear sister of my welfare, and increasing confidence in the success of my undertaking.

I am already far north of London; and as I walk in the streets of Petersburgh, I feel a cold northern breeze play upon my cheeks, which braces my nerves, and fills me with delight. Do you understand this feeling? This breeze, which has travelled from the regions towards which I am advancing, gives me a foretaste of those icy climes. Inspirited by this wind of promise, my daydreams become more fervent and vivid. I try in vain to be persuaded that the pole is the seat of frost and desolation; it ever presents itself to my imagination as the region of beauty and delight. There, Margaret, the sun is for ever visible; its broad disk just skirting the horizon, and diffusing a perpetual splendour. There—for with your leave, my sister, I will put some trust in preceding navigators—there snow and frost are banished; and, sailing over a calm sea, we may be wafted to a land surpassing in wonders and in beauty every region hitherto discovered on the habitable globe. Its productions and features may be without example, as the phenomena of the heavenly bodies undoubtedly are in those undiscovered solitudes. What may not be expected in a country of eternal light? I may there discover the wondrous power which attracts the needle; and may regulate a thousand celestial observations, that require only this voyage to render their seeming eccentricities consistent for ever. I shall satiate my ardent curiosity with the sight of a part of the world never before visited, and may tread a land never before imprinted by the foot of man. These are my enticements, and they are sufficient to conquer all fear of danger or death, and to induce me to commence this laborious voyage with the joy a child feels when he embarks in a little boat, with his holiday mates, on an expedition of discovery up his native river.`,
    aiAnalysis: {
      summary: "Victor Frankenstein, an ambitious Swiss scientist, unlocks the secret of imparting life to inanimate matter. Terrified by the monstrous physical appearance of his creation, he abandons it. The Creature, suffering in absolute isolation, turns to murder to punish Victor for creating and then deserting him.",
      spoilerFreeSummary: "Woven in letters, the novel documents Victor Frankenstein's intellectual journey to overcome mortality, giving life to a massive entity created from deceased limbs. Frightened by his own creation, Victor flees, initiating a heart-wrenching psychological war between a parent and his neglected, suffering brainchild.",
      completeSummary: "Through Walton's letters, Victor Frankenstein tells of his life. After assembling a creature at the University of Ingolstadt, Victor is repulsed and flees. The Creature wanders, learning human speech and emotion from the De Lacey family. Rejected by them and society, he feels intense hatred for Victor. The Creature murders Victor's brother William, best friend Henry Clerval, and wife Elizabeth on their wedding night. Victor pursues the Creature to the Arctic wastes, where he meets Walton and dies. The Creature laments Victor's corpse and drifts away to incinerate himself in the far North.",
      themeAnalysis: "This is the ultimate warning against 'playing God' and the hubris of Enlightenment science. The Prometheus subtitle reflects Victor stealing the fire of life and being eternally tortured for it. The Creature's journey represents John Locke's tabula rasa—he was born blank and compassionate, but societal cruelty and abandonment twisted him into a killer.",
      writingStyleAnalysis: "Highly formal, introspective, framed in a triple-layered epistolary narrative (Walton -> Victor -> Creature -> Victor -> Walton). Use of intense vocabulary of suffering, horror, and natural beauty.",
      emotionalTone: "Tragic, terrifying, lonely, remorseful, and dark.",
      pacingData: [3, 4, 5, 6, 7, 8, 8, 9, 5],
      strengths: ["Immense philosophical and ethical depth", "Sympathetic 'monster' characterization", "Atmospheric descriptive writing"],
      weaknesses: ["Slow beginning due to multiple framing letters", "Highly archaic English phrasing may challenge modern readers"],
      idealAudience: "Fans of philosophical science fiction, gothic horror, deep character psychological dramas, and classic ethics.",
      keyTakeaways: [
        "Unchecked scientific progress devoid of ethical or emotional responsibility is self-destructive.",
        "Monsters are not born; they are created by societal rejection and cruelty.",
        "Vengeance is a consuming fire that destroys the victim and the perpetrator alike."
      ],
      criticObservations: "Mary Shelley, writing at age 18 during the Year Without a Summer (1816), revolutionized gothic horror and created what is widely accepted as the first modern science-fiction work, responding directly to Galvani's electricity experiments.",
      bookComparison: "Compares to 'The Island of Dr. Moreau' by H.G. Wells (creators and creations) and Milton's 'Paradise Lost' (which the Creature reads and connects with deeply).",
      aiOpinion: "Frankenstein is an incredibly deep exploration of what it means to be human. Unlike pop-culture movie adaptations which portray the Monster as a brainless beast, Shelley's original Creature is highly intelligent, articulate, deeply poetic, and tragically lonely. This is a profound study of grief, prejudice, and parental failure."
    },
    characters: [
      {
        name: "Victor Frankenstein",
        role: "Creator / Protagonist",
        traits: ["Obsessive", "Brilliant", "Cowardly", "Remorseful", "Self-Centered"],
        motivation: "To defeat death and create a new race that would bless him as its creator; later, to destroy his creation.",
        description: "A Swiss scientist who discovers the secret to generating life. His scientific obsession ruins his life and leads to the slaughter of everyone he loves due to his negligence.",
        importance: 10,
        quotes: [
          "I had worked hard for nearly two years, for the sole purpose of infusing life into an inanimate body. For this I had deprived myself of rest and health.",
          "You must create a female for me, with whom I can live in the interchange of those sympathies necessary for my being."
        ],
        relations: [
          { characterName: "The Creature", relationType: "Creator / Father / Enemy" },
          { characterName: "Elizabeth Lavenza", relationType: "Fiancee / Adopted Sister" },
          { characterName: "Henry Clerval", relationType: "Best Friend / Spiritual Anchor" }
        ]
      },
      {
        name: "The Creature",
        role: "Creation / Antagonist & Victim",
        traits: ["Articulate", "Shorn", "Sensory-sensitive", "Vengeful", "Tragically Lonely"],
        motivation: "To receive love, connection, or a female companion; failing that, to destroy Victor's happiness.",
        description: "An eight-foot-tall, physically grotesque being constructed from cadavers. Despite possessing a highly sensitive soul and intellect, he is driven to violence by universal rejection.",
        importance: 10,
        quotes: [
          "I am malicious because I am miserable. Am I not shunned and hated by all mankind?",
          "I ought to be thy Adam; but I am rather the fallen angel, whom thou drivest from joy for no misdeed."
        ],
        relations: [
          { characterName: "Victor Frankenstein", relationType: "Neglecting Father / Target of Revenge" },
          { characterName: "Felix De Lacey", relationType: "Secret Teacher (Unwitting)" }
        ]
      }
    ]
  },
  {
    id: "study-in-scarlet",
    title: "A Study in Scarlet",
    subtitle: "The Debut of Sherlock Holmes and Dr. John Watson",
    authorId: "conan-doyle",
    authorName: "Arthur Conan Doyle",
    coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
    publisher: "Ward Lock & Co",
    publishDate: "November 1887",
    isbn: "9780143038696",
    pages: 160,
    readingTime: "3 hours",
    genres: ["Mystery", "Detective Fiction", "Crime"],
    themes: ["Science of Deduction", "Justice vs Revenge", "Brotherhood in Trauma", "Mormon Pioneers (Historical Theme)"],
    averageRating: 4.6,
    ratingCount: 890432,
    awards: ["Origin of the World's Greatest Detective", "100 Best Mysteries of All Time"],
    pacing: "Fast",
    difficulty: "Beginner",
    ageSuitability: "12+ years (Classic crime investigation)",
    contentWarnings: ["Violence", "Murder plots", "Religious extremism representation (historical)"],
    purchaseLinks: [
      { store: "Amazon", price: "$4.99", link: "https://www.amazon.com/Study-Scarlet-Arthur-Conan-Doyle/dp/014303869X" }
    ],
    audioAvailability: true,
    legalReadText: `CHAPTER I. MR. SHERLOCK HOLMES.

IN the year 1878 I took my degree of Doctor of Medicine of the University of London, and proceeded to Netley to go through the course prescribed for surgeons in the army. Having completed my studies there, I was duly attached to the Fifth Northumberland Fusiliers as Assistant Surgeon. The regiment was stationed in India at the time, and before I could join it, the second Afghan war had broken out. On landing at Bombay, I found that my corps had already advanced through the passes, and was deep in the enemy’s country. I followed, however, with many other officers who were in the same situation as myself, and succeeded in reaching Candahar in safety, where I found my regiment, and at once entered upon my new duties.

The campaign brought honors and promotion to many, but for me it had nothing but misfortune and disaster. I was removed from my brigade and attached to the Berkshires, with whom I served at the fatal battle of Maiwand. There I was struck on the shoulder by a Jezail bullet, which shattered the bone and grazed the subclavian artery. I should have fallen into the hands of the murderous Ghazis had it not been for the devotion and courage shown by Murray, my orderly, who threw me across a pack-horse, and succeeded in bringing me safely to the British lines.

Worn with pain, and weak from the prolonged hardships which I had undergone, I was removed, with a great train of wounded sufferers, to the base hospital at Peshawar. Here I was rallying, and had already improved so far as to be able to walk about the wards, and even to bask a little upon the verandah, when I was struck down by enteric fever, that curse of our Indian possessions. For months my life was despaired of, and when at last I came to myself and became convalescent, I was so weak and emaciated that a medical board determined that not a day should be lost in sending me back to England.`,
    aiAnalysis: {
      summary: "Dr. John Watson, recovering from military injuries, seeks a roommate and is introduced to Sherlock Holmes, a brilliant consulting detective. Together they move to 221B Baker Street and investigate a peculiar murder in an abandoned house where the word 'RACHE' (revenge) is written in blood.",
      spoilerFreeSummary: "The legendary meeting of John Watson and Sherlock Holmes! Investigating a corpse found in an empty London flat with no wounds, Holmes applies his radical Science of Deduction to track an elusive carriage driver with a long-hidden motive spanning continents.",
      completeSummary: "Sherlock Holmes deduces that Enoch Drebber was poisoned by Jefferson Hope, a cabman. The second half of the novel backtracks to Salt Lake Valley, Utah, detailing how Drebber and Stangerson had forced John Ferrier and his adopted daughter Lucy into misery, leading to Lucy's death. Jefferson Hope, Lucy's fiancé, swore revenge and hunted the culprits to London, where he kills them using a selective poisonous pill. Jefferson is caught by Holmes but dies of an aortic aneurysm in his cell, leaving Watson to publish Holmes's genius achievements.",
      themeAnalysis: "Pioneers the 'Consulting Detective' genre. Contrasts the logical, clinical London deduction methods against the emotional, passionate wild-west vengeance of Jefferson Hope.",
      writingStyleAnalysis: "Straightforward, engaging narrative voice of Watson in Part 1, followed by a dramatic third-person backstory in Part 2, and returning to Watson's perspective.",
      emotionalTone: "Intellectual, mysterious, vengeful, and adventurous.",
      pacingData: [6, 7, 7, 8, 4, 4, 5, 8, 7],
      strengths: ["Great character introductions", "Radical deduction showcases", "Fun Victorian atmosphere"],
      weaknesses: ["The sudden mid-book Utah flashback disrupts the London narrative flow", "Portrayal of early Mormonism is highly dramatized and controversial"],
      idealAudience: "Mystery lovers, fans of procedurals, and anyone wanting to see where the Sherlockian legacy began.",
      keyTakeaways: [
        "A focused mind can see a whole world in a single drop of water.",
        "Private justice can arise when public laws fail, but it often leads to personal ruin."
      ],
      criticObservations: "Doyle wrote this short novel in three weeks. While initially rejected by multiple publishers, it eventually created the most adapted fictional character in human history.",
      bookComparison: "Compares to Edgar Allan Poe's 'The Murders in the Rue Morgue' (Holmes explicitly criticizes Poe's detective Dupin in this book) and modern procedural detective books.",
      aiOpinion: "While the structure is slightly split, the introduction of Sherlock Holmes's methods and his chemistry with John Watson is legendary. It immediately grabs your attention and establishes the framework for modern detective fiction."
    },
    characters: [
      {
        name: "Sherlock Holmes",
        role: "Protagonist / Consulting Detective",
        traits: ["Analytical", "Cold", "Observant", "Eccentric", "Arrogant"],
        motivation: "To exercise his supreme mental faculties, solve complex problems that baffle Scotland Yard.",
        description: "The world's first consulting detective. He has vast knowledge of chemistry, violin, and anatomy, but is utterly ignorant of literature, philosophy, and astronomy.",
        importance: 10,
        quotes: [
          "I am a consulting detective. I play the game for the love of the game.",
          "There's the scarlet thread of murder running through the colourless skein of life, and our duty is to untangle it."
        ],
        relations: [
          { characterName: "Dr. John Watson", relationType: "Flatmate / Chronist" },
          { characterName: "Jefferson Hope", relationType: "Captor / Intellectual Match" }
        ]
      },
      {
        name: "Dr. John Watson",
        role: "Co-Protagonist / Narrator",
        traits: ["Loyal", "Courageous", "Sensible", "Modest", "Empathetic"],
        motivation: "To recover his health, find a stable livelihood, and find an exciting outlet in London.",
        description: "A retired military doctor of the British Army who returned from the Afghan War with injuries. He serves as Holmes's associate and the warm, human chronicler of his cases.",
        importance: 9,
        quotes: [
          "To a man of your scientific turn of mind, my story may seem trivial; but it was a matter of life and death to me."
        ],
        relations: [
          { characterName: "Sherlock Holmes", relationType: "Partner / Best Friend" }
        ]
      }
    ]
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    subtitle: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    authorId: "james-clear",
    authorName: "James Clear",
    coverImage: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&q=80",
    publisher: "Avery (Penguin Random House)",
    publishDate: "October 16, 2018",
    isbn: "9780735211292",
    pages: 320,
    readingTime: "6 hours",
    genres: ["Personal Development", "Self-Help", "Psychology"],
    themes: ["Continuous Improvement", "Identity-Based Habits", "Environment Design", "System over Goals", "1% Better Daily"],
    averageRating: 4.8,
    ratingCount: 1520143,
    awards: ["#1 NYT Bestseller for 100+ weeks", "Amazon's Best Leadership & Business Book"],
    pacing: "Medium",
    difficulty: "Beginner",
    ageSuitability: "All ages (Highly practical lifestyle framework)",
    contentWarnings: [],
    purchaseLinks: [
      { store: "Amazon", price: "$11.99", link: "https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299" },
      { store: "Barnes & Noble", price: "$14.99", link: "https://www.barnesandnoble.com/w/atomic-habits-james-clear/1127103859" }
    ],
    audioAvailability: true,
    legalReadText: `INTRODUCTION: MY STORY

On the last day of my sophomore year of high school, I was hit in the face with a baseball bat. As my classmate took a full swing, the bat slipped out of his hands and flew directly toward me before striking me right between the eyes. I have no memory of the moment of impact.

The bat smashed into my face with such force that it crushed my nose into a distorted U-shape. The collision sent the soft tissue of my brain slamming into the inside of my skull. Immediately, a wave of swelling surged throughout my head. In a fraction of a second, I had a broken nose, multiple skull fractures, and two shattered eye sockets.

When I opened my eyes, I saw people running to help. I looked down and saw red spots on my clothes. One of my classmates took the shirt off his back and handed it to me. I used it to plug the geyser of blood rushing from my broken nose. Giddy and confused, I was unaware of how seriously I had been injured.

My teacher escorted me downstairs toward the nurse’s office. We walked across the field, down the hill, and back into the school. Left hands guided my shoulders. No one realized that every minute mattered.

The nurse asked me a series of questions. "What year is it?" "Nineteen ninety-eight," I said. It was actually two thousand and two. "Who is the president of the United States?" "Bill Clinton," I said. The president was George W. Bush. "What is your mother's name?" "Uh... uh..." I stalled. Ten seconds passed. "Jean," I said, casually. It took me ten seconds to remember my own mother's name.

That was the start of my long journey of recovery, where I discovered that tiny, 1% improvements—atomic habits—could rebuild my physical coordination, my academic scores, and ultimately, my entire life.`,
    aiAnalysis: {
      summary: "Atomic Habits provides a comprehensive framework for self-improvement based on cognitive behavioral psychology. James Clear argues that our life outcomes are lagging measures of our habits, and outlines the Four Laws of Behavior Change to make good habits obvious, attractive, easy, and satisfying.",
      spoilerFreeSummary: "An extremely popular and practical guide to self-improvement. Clear explains how to break free of bad routines and develop beneficial systems by focusing on tiny, marginal 1% shifts rather than daunting overnight transformations.",
      completeSummary: "James Clear explains that habits are the compound interest of self-improvement. He introduces the Loop of Habit: Cue, Craving, Response, and Reward. To build positive habits: 1) Make it Obvious (design your environment, use implementation intentions); 2) Make it Attractive (use temptation bundling, join social groups where your desired behavior is normal); 3) Make it Easy (reduce friction, apply the 2-Minute Rule); 4) Make it Satisfying (use habit trackers, immediate rewards). To break bad habits, you invert these rules (make it invisible, unattractive, difficult, and unsatisfying). True behavior change is identity change; you must focus on the type of person you wish to become rather than just the goals you want to achieve.",
      themeAnalysis: "Focuses on systems thinking. Goals are about the results we want to achieve, while systems are about the processes that lead to those results. You do not rise to the level of your goals; you fall to the level of your systems.",
      writingStyleAnalysis: "Highly structured, direct, concise, utilizing bullet points, diagrams, summary boxes, and memorable mathematical analogies (like 1.01 to the power of 365 is 37.7).",
      emotionalTone: "Encouraging, analytical, pragmatic, and inspiring.",
      pacingData: [5, 5, 5, 5, 5, 5, 5, 5, 5],
      strengths: ["Highly practical and easy to implement", "Superb real-world examples", "Clear summaries at the end of every chapter"],
      weaknesses: ["Some concepts overlap with other popular psychology works like Duhigg's Power of Habit", "Relies heavily on anecdotes"],
      idealAudience: "Professionals, students, athletes, and anyone wanting to optimize their daily routine, productivity, and mindset.",
      keyTakeaways: [
        "Habits compound over time. Being 1% better every day results in being 37 times better by the end of a year.",
        "Forget about goals; focus on your systems instead.",
        "Your identity emerges out of your habits. Every action is a vote for the type of person you want to become."
      ],
      criticObservations: "James Clear synthesized decades of academic research from B.F. Skinner, Charles Duhigg, and cognitive behavioral scientists into an incredibly accessible handbook. It is considered the modern Bible of behavior modification.",
      bookComparison: "Compares to 'The Power of Habit' by Charles Duhigg, 'Tiny Habits' by BJ Fogg, and 'High Performance Habits' by Brendon Burchard.",
      aiOpinion: "Atomic Habits is a masterclass in instructional writing. It is popular because it works; it translates complex psychological concepts of cue-trigger-reward loops into immediate, actionable changes. Highly recommended for anyone seeking sustainable personal growth."
    },
    characters: [] // Non-fiction has no characters
  }
];

export const readingChallengesList: ReadingChallenge[] = [
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
];

export const achievementsList: Achievement[] = [
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
];

export const initialReviews: Review[] = [
  {
    id: "rev-1",
    bookId: "great-gatsby",
    userId: "u-1",
    userName: "Charlotte Bennett",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    content: "Fitzgerald's writing is simply gorgeous. The way he captures the emptiness of Jay's parties and the sheer careless destruction of Daisy and Tom is timeless. I cry every single time I finish that last sentence about boats beating on against the current.",
    likes: 42,
    date: "2026-06-15"
  },
  {
    id: "rev-2",
    bookId: "great-gatsby",
    userId: "u-2",
    userName: "Professor Robert",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 4,
    content: "An outstanding critique of early capitalism and old vs new wealth. Nick's bias as a narrator is worth study. While Gatsby is indeed 'gorgeous', we must not forget he is also a criminal bootlegger pursuing an idealized ghost. Superb pacing.",
    likes: 18,
    date: "2026-07-01"
  },
  {
    id: "rev-3",
    bookId: "frankenstein",
    userId: "u-3",
    userName: "GothicReader_99",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    content: "Absolute masterpiece! Forget the green-skinned mute movie version. Shelley's creature is a tragic intellectual philosopher who quotes John Milton. The true monster here is Victor, who created a child out of vanity and left him to rot in the cold. So haunting.",
    likes: 64,
    date: "2026-05-20"
  },
  {
    id: "rev-4",
    bookId: "atomic-habits",
    userId: "u-4",
    userName: "Sarah Growth",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    rating: 5,
    content: "This book genuinely changed how I approach my mornings. The 2-minute rule (starting a habit by only doing it for 2 minutes) was a lifesaver for my writing routine. Pragmatic, scientific, and direct. No fluffy motivational nonsense.",
    likes: 112,
    date: "2026-04-10"
  }
];

export const quotesList = [
  { text: "So we beat on, boats against the current, borne back ceaselessly into the past.", author: "F. Scott Fitzgerald", book: "The Great Gatsby" },
  { text: "I am malicious because I am miserable. Am I not shunned and hated by all mankind?", author: "Mary Shelley", book: "Frankenstein" },
  { text: "You do not rise to the level of your goals. You fall to the level of your systems.", author: "James Clear", book: "Atomic Habits" },
  { text: "It is a capital mistake to theorize before one has data. Insensibly one begins to twist facts to suit theories, instead of theories to suit facts.", author: "Arthur Conan Doyle", book: "A Study in Scarlet" },
  { text: "There is nothing like looking, if you want to find something. You certainly usually find something, if you look, but it is not always quite the something you were after.", author: "J.R.R. Tolkien", book: "The Hobbit" }
];
