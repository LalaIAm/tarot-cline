/**
 * Tarot Card Data
 * 
 * This file contains the data for all 78 tarot cards in a standard deck:
 * - 22 Major Arcana cards
 * - 56 Minor Arcana cards (14 cards in each of the four suits)
 * 
 * Each card contains:
 * - name: The card's name
 * - number: Card number (for Major Arcana) or value (for Minor Arcana)
 * - arcana: "major" or "minor"
 * - suit: For Minor Arcana only (cups, pentacles, swords, wands)
 * - img: Reference to card image
 * - keywords: Array of keywords associated with the card
 * - meanings: Object containing upright and reversed meanings
 * - description: Brief description of the card's imagery and symbolism
 */

// Major Arcana Cards
const majorArcana = [
  {
    name: "The Fool",
    number: 0,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/fool.svg", // Placeholder - these will need to be created/sourced
    keywords: ["beginnings", "innocence", "spontaneity", "free spirit"],
    meanings: {
      upright: "New beginnings, faith in the future, beginner's mind, innocence, spontaneity, free spirit",
      reversed: "Recklessness, risk-taking, inconsideration, naivety, foolishness, gullibility"
    },
    description: "The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner's luck, improvisation and believing in the universe."
  },
  {
    name: "The Magician",
    number: 1,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/magician.svg",
    keywords: ["manifestation", "resourcefulness", "power", "inspired action"],
    meanings: {
      upright: "Manifestation, resourcefulness, power, inspired action, creation",
      reversed: "Manipulation, poor planning, untapped talents, deception, illusion"
    },
    description: "The Magician represents manifestation, resourcefulness, power, inspired action, creation, and current capabilities. It symbolizes harnessing one's power to create change."
  },
  {
    name: "The High Priestess",
    number: 2,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/high-priestess.svg",
    keywords: ["intuition", "sacred knowledge", "subconscious mind", "mystery"],
    meanings: {
      upright: "Intuition, sacred knowledge, divine feminine, the subconscious mind",
      reversed: "Secrets, disconnected from intuition, withdrawal, silence"
    },
    description: "The High Priestess signifies wisdom, serenity, knowledge and understanding. She suggests listening to your inner voice and paying attention to your dreams or intuitions."
  },
  {
    name: "The Empress",
    number: 3,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/empress.svg",
    keywords: ["femininity", "beauty", "nature", "nurturing", "abundance"],
    meanings: {
      upright: "Femininity, beauty, nature, nurturing, abundance, fertility",
      reversed: "Creative block, dependence on others, emptiness, lack of growth"
    },
    description: "The Empress represents a connection with our femininity. She heralds abundance, nurturing and what we love. The Empress brings beautiful, natural, and creative gifts."
  },
  {
    name: "The Emperor",
    number: 4,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/emperor.svg",
    keywords: ["authority", "structure", "control", "leadership", "stability"],
    meanings: {
      upright: "Authority, structure, control, leadership, stability, protection",
      reversed: "Domination, excessive control, rigidity, inflexibility, stubbornness"
    },
    description: "The Emperor represents a powerful influence, leadership and someone with authority, confidence and wisdom. He creates stability out of chaos through the power of control and order."
  },
  {
    name: "The Hierophant",
    number: 5,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/hierophant.svg",
    keywords: ["tradition", "conformity", "morality", "ethics", "spiritual wisdom"],
    meanings: {
      upright: "Spiritual wisdom, tradition, conformity, morality, ethics, religious beliefs",
      reversed: "Personal beliefs, freedom, challenging convention, new approaches"
    },
    description: "The Hierophant represents tradition, conventional beliefs, and spiritual teachings. He represents a link between the divine and earthly realms, offering spiritual wisdom and guidance."
  },
  {
    name: "The Lovers",
    number: 6,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/lovers.svg",
    keywords: ["love", "harmony", "relationships", "choices", "alignment"],
    meanings: {
      upright: "Love, harmony, relationships, alignment, choices, union",
      reversed: "Disharmony, imbalance, misalignment, discord, distrust"
    },
    description: "The Lovers represents relationships and choices. Its appearance often suggests a significant decision about an existing relationship, a potential relationship, or the direction of one's life path."
  },
  {
    name: "The Chariot",
    number: 7,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/chariot.svg",
    keywords: ["control", "willpower", "victory", "assertion", "determination"],
    meanings: {
      upright: "Control, willpower, victory, assertion, determination, focus",
      reversed: "Lack of control, lack of direction, aggression, obstacles"
    },
    description: "The Chariot represents control, willpower, and overcoming obstacles through determination and confidence. The card indicates that you will triumph over obstacles or challenges through focus and determination."
  },
  {
    name: "Strength",
    number: 8,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/strength.svg",
    keywords: ["strength", "courage", "patience", "compassion", "inner strength"],
    meanings: {
      upright: "Strength, courage, patience, control, compassion, inner power",
      reversed: "Weakness, self-doubt, insecurity, low energy, raw emotion"
    },
    description: "Strength represents inner strength, courage, and patience. It suggests having the power to overcome challenges through inner fortitude rather than brute force."
  },
  {
    name: "The Hermit",
    number: 9,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/hermit.svg",
    keywords: ["introspection", "solitude", "inner guidance", "contemplation", "withdrawal"],
    meanings: {
      upright: "Contemplation, introspection, solitude, inner guidance, withdrawal",
      reversed: "Isolation, loneliness, withdrawal, rejecting help, exile"
    },
    description: "The Hermit represents a period of introspection where you dedicate yourself to understanding complex issues or your own spiritual path. It suggests taking time for self-reflection and seeking inner guidance."
  },
  {
    name: "Wheel of Fortune",
    number: 10,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/wheel-of-fortune.svg",
    keywords: ["change", "cycles", "fate", "turning point", "luck"],
    meanings: {
      upright: "Good luck, karma, destiny, life cycles, change, turning point",
      reversed: "Bad luck, resistance to change, unwelcome change, setbacks"
    },
    description: "The Wheel of Fortune represents the unpredictable nature of life and the inevitable changes we all experience. It suggests that what goes around comes around, and that change is the only constant in life."
  },
  {
    name: "Justice",
    number: 11,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/justice.svg",
    keywords: ["justice", "fairness", "truth", "law", "clarity"],
    meanings: {
      upright: "Justice, fairness, truth, cause and effect, law, balance",
      reversed: "Unfairness, lack of accountability, dishonesty, injustice"
    },
    description: "Justice represents fairness, truth, and the law. It suggests the need to carefully consider the consequences of your actions and take responsibility for past decisions."
  },
  {
    name: "The Hanged Man",
    number: 12,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/hanged-man.svg",
    keywords: ["surrender", "letting go", "new perspective", "suspension", "sacrifice"],
    meanings: {
      upright: "Surrender, new perspective, enlightenment, letting go, sacrifice",
      reversed: "Resistance, stalling, indecision, delays, stagnation"
    },
    description: "The Hanged Man represents surrendering, gaining a new perspective, and enlightenment. It suggests a time of suspension and letting go, allowing for a shift in understanding."
  },
  {
    name: "Death",
    number: 13,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/death.svg",
    keywords: ["transformation", "endings", "change", "transition", "letting go"],
    meanings: {
      upright: "Endings, change, transformation, transition, letting go",
      reversed: "Resistance to change, inability to move on, stagnation, decay"
    },
    description: "Death represents endings, transformation, and transition. It does not typically signify physical death, but rather the end of a phase or situation, making way for new beginnings."
  },
  {
    name: "Temperance",
    number: 14,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/temperance.svg",
    keywords: ["balance", "moderation", "patience", "purpose", "harmony"],
    meanings: {
      upright: "Balance, moderation, patience, purpose, meaning, harmony",
      reversed: "Imbalance, excess, self-healing, realignment, extremes"
    },
    description: "Temperance represents balance, moderation, and patience. It suggests finding middle ground, having patience, and maintaining a sense of harmony in life."
  },
  {
    name: "The Devil",
    number: 15,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/devil.svg",
    keywords: ["shadow self", "attachment", "addiction", "materialism", "bondage"],
    meanings: {
      upright: "Shadow self, attachment, addiction, materialism, bondage, restriction",
      reversed: "Breaking free, release, exploring dark thoughts, detachment"
    },
    description: "The Devil represents the shadow self, attachments, and materialism. It suggests being bound by negative patterns, addictions, or unhealthy attachments that restrict freedom."
  },
  {
    name: "The Tower",
    number: 16,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/tower.svg",
    keywords: ["sudden change", "upheaval", "chaos", "revelation", "disruption"],
    meanings: {
      upright: "Sudden change, upheaval, chaos, revelation, awakening, disruption",
      reversed: "Fear of change, avoiding disaster, delaying the inevitable"
    },
    description: "The Tower represents sudden change, upheaval, and revelation. It suggests a destructive force that breaks down old structures, making way for new growth through a process of destruction and rebuilding."
  },
  {
    name: "The Star",
    number: 17,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/star.svg",
    keywords: ["hope", "faith", "purpose", "renewal", "spirituality"],
    meanings: {
      upright: "Hope, faith, purpose, renewal, spirituality, healing, inspiration",
      reversed: "Lack of faith, despair, discouragement, insecurity, disappointment"
    },
    description: "The Star represents hope, faith, and spiritual guidance. It suggests a time of renewal, healing, and finding inspiration after a period of difficulty or upheaval."
  },
  {
    name: "The Moon",
    number: 18,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/moon.svg",
    keywords: ["illusion", "fear", "anxiety", "subconscious", "intuition"],
    meanings: {
      upright: "Illusion, fear, anxiety, subconscious, intuition, dreams",
      reversed: "Release of fear, unhealthy patterns, clarity, understanding"
    },
    description: "The Moon represents illusion, fear, and the subconscious. It suggests a time of uncertainty and potential deception, but also heightened intuition and connection to the dream world."
  },
  {
    name: "The Sun",
    number: 19,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/sun.svg",
    keywords: ["joy", "success", "celebration", "positivity", "vitality"],
    meanings: {
      upright: "Positivity, success, vitality, joy, celebration, optimism",
      reversed: "Temporary depression, lack of success, negativity, sadness"
    },
    description: "The Sun represents joy, success, and celebration. It suggests a time of positivity, accomplishment, and vitality, bringing warmth and light into your life."
  },
  {
    name: "Judgement",
    number: 20,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/judgement.svg",
    keywords: ["judgement", "rebirth", "inner calling", "absolution", "awakening"],
    meanings: {
      upright: "Judgement, rebirth, inner calling, absolution, awakening",
      reversed: "Self-doubt, lack of self-awareness, failure to learn lessons"
    },
    description: "Judgement represents rebirth, inner calling, and awakening. It suggests a time of self-evaluation, reflection on past actions, and hearing a spiritual call toward a new path."
  },
  {
    name: "The World",
    number: 21,
    arcana: "major",
    suit: null,
    img: "/images/cards/major/world.svg",
    keywords: ["completion", "accomplishment", "fulfillment", "wholeness", "harmony"],
    meanings: {
      upright: "Completion, accomplishment, travel, fulfillment, wholeness, harmony",
      reversed: "Incomplete goals, lack of closure, stagnation, feeling incomplete"
    },
    description: "The World represents completion, accomplishment, and fulfillment. It suggests reaching the end of a cycle, achieving wholeness, and experiencing a sense of harmony and unity."
  }
];

// Minor Arcana Cards - Cups (Emotions, relationships, intuition)
const cups = [
  {
    name: "Ace of Cups",
    number: 1,
    arcana: "minor",
    suit: "cups",
    img: "/images/cards/cups/ace.svg",
    keywords: ["new feelings", "emotional awakening", "love", "compassion", "creativity"],
    meanings: {
      upright: "New feelings, emotional awakening, intuitive messages, love, compassion",
      reversed: "Emotional loss, blocked creativity, emptiness, feeling drained"
    },
    description: "The Ace of Cups represents new feelings, emotional awakening, and intuitive messages. It suggests the beginning of emotional experiences, creative pursuits, or spiritual insights."
  },
  {
    name: "Two of Cups",
    number: 2,
    arcana: "minor",
    suit: "cups",
    img: "/images/cards/cups/two.svg",
    keywords: ["unity", "partnership", "mutual attraction", "connection", "harmony"],
    meanings: {
      upright: "Unity, partnership, mutual attraction, connection, harmony in relationship",
      reversed: "Imbalanced relationship, miscommunication, disagreement, tension"
    },
    description: "The Two of Cups represents unity, partnership, and mutual attraction. It suggests the formation of a harmonious bond, whether romantic, platonic, or business-related."
  },
  {
    name: "Three of Cups",
    number: 3,
    arcana: "minor",
    suit: "cups",
    img: "/images/cards/cups/three.svg",
    keywords: ["celebration", "friendship", "community", "joy", "gatherings"],
    meanings: {
      upright: "Celebration, friendship, community, joy, gatherings, social events",
      reversed: "Overindulgence, gossip, isolation, exclusion from group"
    },
    description: "The Three of Cups represents celebration, friendship, and community. It suggests a time of joy, social gatherings, and the nurturing support of friends or community."
  },
  {
    name: "Four of Cups",
    number: 4,
    arcana: "minor",
    suit: "cups",
    img: "/images/cards/cups/four.svg",
    keywords: ["contemplation", "apathy", "reevaluation", "discontent", "meditation"],
    meanings: {
      upright: "Contemplation, apathy, reevaluation, discontent with the status quo",
      reversed: "New energy, acceptance, taking action, moving forward"
    },
    description: "The Four of Cups represents contemplation, apathy, and reevaluation. It suggests a time of introspection, potentially missing opportunities due to a focus on existing circumstances."
  },
  {
    name: "Five of Cups",
    number: 5,
    arcana: "minor",
    suit: "cups",
    img: "/images/cards/cups/five.svg",
    keywords: ["loss", "grief", "disappointment", "regret", "focus on the negative"],
    meanings: {
      upright: "Loss, grief, disappointment, regret, focus on the negative",
      reversed: "Acceptance, moving on, finding peace, forgiveness"
    },
    description: "The Five of Cups represents loss, grief, and disappointment. It suggests a time of emotional challenge, focusing on what has been lost while overlooking what remains."
  },
  {
    name: "Six of Cups",
    number: 6,
    arcana: "minor",
    suit: "cups",
    img: "/images/cards/cups/six.svg",
    keywords: ["nostalgia", "childhood memories", "innocence", "joy", "reunion"],
    meanings: {
      upright: "Nostalgia, childhood memories, innocent joy, reunion, sharing",
      reversed: "Living in the past, unrealistic nostalgia, naivety, stuck in memories"
    },
    description: "The Six of Cups represents nostalgia, childhood memories, and innocent joy. It suggests revisiting the past, reuniting with old friends, or experiencing simple pleasures."
  },
  {
    name: "Seven of Cups",
    number: 7,
    arcana: "minor",
    suit: "cups",
    img: "/images/cards/cups/seven.svg",
    keywords: ["choices", "fantasy", "illusion", "daydreaming", "opportunities"],
    meanings: {
      upright: "Choices, fantasy, illusion, wishful thinking, multiple options",
      reversed: "Clarity, focus, prioritization, making choices, confronting reality"
    },
    description: "The Seven of Cups represents choices, fantasy, and illusion. It suggests being faced with many options or fantasies, perhaps becoming lost in daydreams rather than taking decisive action."
  },
  {
    name: "Eight of Cups",
    number: 8,
    arcana: "minor",
    suit: "cups",
    img: "/images/cards/cups/eight.svg",
    keywords: ["abandonment", "walking away", "disillusionment", "leaving behind", "seeking truth"],
    meanings: {
      upright: "Walking away, abandonment, disillusionment, leaving behind, seeking meaning",
      reversed: "Returning to an unhealthy situation, fear of change, directionless"
    },
    description: "The Eight of Cups represents walking away, abandonment, and disillusionment. It suggests leaving a situation that no longer serves you, even if it means turning away from emotional investment."
  },
  {
    name: "Nine of Cups",
    number: 9,
    arcana: "minor",
    suit: "cups",
    img: "/images/cards/cups/nine.svg",
    keywords: ["wishes fulfilled", "contentment", "satisfaction", "emotional stability", "gratitude"],
    meanings: {
      upright: "Wishes fulfilled, contentment, satisfaction, emotional stability, luxury",
      reversed: "Materialism, dissatisfaction, greed, unfulfilled wishes"
    },
    description: "The Nine of Cups represents wishes fulfilled, contentment, and satisfaction. It suggests achieving emotional wishes, enjoying material abundance, and experiencing contentment."
  },
  {
    name: "Ten of Cups",
    number: 10,
    arcana: "minor",
    suit: "cups",
    img: "/images/cards/cups/ten.svg",
    keywords: ["divine love", "harmony", "alignment", "bliss", "joy"],
    meanings: {
      upright: "Divine love, harmony, alignment, perfect relationship, community, happiness",
      reversed: "Broken home, domestic conflict, separation, misalignment"
    },
    description: "The Ten of Cups represents divine love, harmony, and alignment. It suggests achieving emotional fulfillment, harmonious relationships, and a deep sense of joy and contentment."
  },
  {
    name: "Page of Cups",
    number: 11,
    arcana: "minor",
    suit: "cups",
    img: "/images/cards/cups/page.svg",
    keywords: ["creative opportunity", "curiosity", "possibility", "messenger", "dreamer"],
    meanings: {
      upright: "Creative opportunity, intuitive messages, curiosity, sensitivity",
      reversed: "Emotional immaturity, creative blocks, mood swings, ignoring intuition"
    },
    description: "The Page of Cups represents creative opportunity, intuitive messages, and curiosity. It suggests the arrival of creative inspiration, an intuitive message, or a new emotional beginning."
  },
  {
    name: "Knight of Cups",
    number: 12,
    arcana: "minor",
    suit: "cups",
    img: "/images/cards/cups/knight.svg",
    keywords: ["romantic", "artistic", "imaginative", "refined", "emotional intelligence"],
    meanings: {
      upright: "Romantic, artistic, imaginative, refined, emotional intelligence",
      reversed: "Moodiness, emotional manipulation, unrealistic, jealousy"
    },
    description: "The Knight of Cups represents romantic, artistic, and imaginative energy. It suggests the pursuit of creative or romantic endeavors with emotional intelligence and refinement."
  },
  {
    name: "Queen of Cups",
    number: 13,
    arcana: "minor",
    suit: "cups",
    img: "/images/cards/cups/queen.svg",
    keywords: ["compassion", "calm", "comfort", "emotional security", "intuition"],
    meanings: {
      upright: "Compassion, calm, comfort, emotional security, intuition, warmth",
      reversed: "Emotional insecurity, co-dependency, martyrdom, manipulation"
    },
    description: "The Queen of Cups represents compassion, calm, and emotional security. She suggests a nurturing presence, emotional depth, and intuitive understanding of others' feelings."
  },
  {
    name: "King of Cups",
    number: 14,
    arcana: "minor",
    suit: "cups",
    img: "/images/cards/cups/king.svg",
    keywords: ["emotional balance", "compassion", "control", "diplomatic", "wisdom"],
    meanings: {
      upright: "Emotional balance, compassion, diplomacy, wisdom, control",
      reversed: "Emotional manipulation, moodiness, volatility, coldness"
    },
    description: "The King of Cups represents emotional balance, compassion, and control. He suggests mastery over emotions, offering wisdom and guidance while maintaining diplomatic composure."
  }
];

// Minor Arcana Cards - Pentacles (Material world, resources, career, money)
const pentacles = [
  {
    name: "Ace of Pentacles",
    number: 1,
    arcana: "minor",
    suit: "pentacles",
    img: "/images/cards/pentacles/ace.svg",
    keywords: ["opportunity", "prosperity", "new venture", "abundance", "manifestation"],
    meanings: {
      upright: "New financial or career opportunity, manifestation, abundance, security",
      reversed: "Lost opportunity, lack of planning, scarcity mindset, instability"
    },
    description: "The Ace of Pentacles represents a new opportunity, prosperity, and manifestation in the material world. It suggests the potential for financial gain, career advancement, or practical achievements."
  },
  {
    name: "Two of Pentacles",
    number: 2,
    arcana: "minor",
    suit: "pentacles",
    img: "/images/cards/pentacles/two.svg",
    keywords: ["balancing", "prioritization", "adaptation", "time management", "flexibility"],
    meanings: {
      upright: "Balancing resources, prioritization, adaptation, time management",
      reversed: "Imbalance, disorganization, overwhelm, juggling too many things"
    },
    description: "The Two of Pentacles represents balancing, prioritization, and adaptation. It suggests the need to juggle multiple responsibilities or financial matters with flexibility and grace."
  },
  {
    name: "Three of Pentacles",
    number: 3,
    arcana: "minor",
    suit: "pentacles",
    img: "/images/cards/pentacles/three.svg",
    keywords: ["teamwork", "collaboration", "learning", "implementation", "skill development"],
    meanings: {
      upright: "Teamwork, collaboration, learning, skill development, implementation",
      reversed: "Lack of teamwork, disorganization, lack of skill, poor communication"
    },
    description: "The Three of Pentacles represents teamwork, collaboration, and skill development. It suggests working with others to create something of lasting value, potentially growing your expertise in the process."
  },
  {
    name: "Four of Pentacles",
    number: 4,
    arcana: "minor",
    suit: "pentacles",
    img: "/images/cards/pentacles/four.svg",
    keywords: ["conservation", "security", "frugality", "control", "stability"],
    meanings: {
      upright: "Conservation, security, frugality, control, maintaining resources",
      reversed: "Generosity, spending, insecurity, letting go of control"
    },
    description: "The Four of Pentacles represents conservation, security, and control. It suggests a focus on maintaining financial stability, possibly to the point of being overly protective or possessive of resources."
  },
  {
    name: "Five of Pentacles",
    number: 5,
    arcana: "minor",
    suit: "pentacles",
    img: "/images/cards/pentacles/five.svg",
    keywords: ["hardship", "financial loss", "poverty", "insecurity", "isolation"],
    meanings: {
      upright: "Financial hardship, poverty, insecurity, isolation, worry",
      reversed: "Recovery from financial loss, spiritual poverty, asking for help"
    },
    description: "The Five of Pentacles represents hardship, financial loss, and isolation. It suggests a time of material struggle, potentially accompanied by feeling left out in the cold or disconnected from support."
  },
  {
    name: "Six of Pentacles",
    number: 6,
    arcana: "minor",
    suit: "pentacles",
    img: "/images/cards/pentacles/six.svg",
    keywords: ["generosity", "charity", "giving", "receiving", "sharing wealth"],
    meanings: {
      upright: "Generosity, charity, giving, receiving, sharing wealth, gratitude",
      reversed: "Strings attached, one-sided relationships, grudging charity, debt"
    },
    description: "The Six of Pentacles represents generosity, charity, and sharing wealth. It suggests the flow of material resources, whether giving or receiving, and the balance of financial power."
  },
  {
    name: "Seven of Pentacles",
    number: 7,
    arcana: "minor",
    suit: "pentacles",
    img: "/images/cards/pentacles/seven.svg",
    keywords: ["patience", "investment", "long-term view", "perseverance", "waiting"],
    meanings: {
      upright: "Patience, investment, long-term view, perseverance, sustainable growth",
      reversed: "Impatience, poor planning, unrealistic expectations, negligence"
    },
    description: "The Seven of Pentacles represents patience, investment, and taking a long-term view. It suggests a period of waiting to see the results of past efforts, evaluating progress, and considering next steps."
  },
  {
    name: "Eight of Pentacles",
    number: 8,
    arcana: "minor",
    suit: "pentacles",
    img: "/images/cards/pentacles/eight.svg",
    keywords: ["apprenticeship", "diligence", "practice", "mastery", "craftsmanship"],
    meanings: {
      upright: "Diligence, apprenticeship, skill development, attention to detail, mastery",
      reversed: "Perfectionism, lack of ambition, poor workmanship, cutting corners"
    },
    description: "The Eight of Pentacles represents apprenticeship, diligence, and craftsmanship. It suggests dedicated effort to master a skill, attention to detail, and steady progress through hard work."
  },
  {
    name: "Nine of Pentacles",
    number: 9,
    arcana: "minor",
    suit: "pentacles",
    img: "/images/cards/pentacles/nine.svg",
    keywords: ["luxury", "self-sufficiency", "financial independence", "refinement", "rewards"],
    meanings: {
      upright: "Luxury, self-sufficiency, financial independence, refinement, rewards",
      reversed: "Showing off, not enjoying rewards, over-indulgence, lacking independence"
    },
    description: "The Nine of Pentacles represents luxury, self-sufficiency, and financial independence. It suggests enjoying the fruits of your labor, cultivating refinement, and achieving material security through your own efforts."
  },
  {
    name: "Ten of Pentacles",
    number: 10,
    arcana: "minor",
    suit: "pentacles",
    img: "/images/cards/pentacles/ten.svg",
    keywords: ["legacy", "inheritance", "family", "establishment", "wealth"],
    meanings: {
      upright: "Legacy, inheritance, family, establishment, wealth, tradition",
      reversed: "Family conflicts, financial failure, loss of legacy, bankruptcy"
    },
    description: "The Ten of Pentacles represents legacy, inheritance, and establishment. It suggests lasting wealth, family connections, and the security of established structures and traditions."
  },
  {
    name: "Page of Pentacles",
    number: 11,
    arcana: "minor",
    suit: "pentacles",
    img: "/images/cards/pentacles/page.svg",
    keywords: ["opportunity", "curiosity", "study", "manifestation", "new job"],
    meanings: {
      upright: "New opportunity, curiosity, manifestation, study, reliable person",
      reversed: "Procrastination, missed opportunity, immaturity about money"
    },
    description: "The Page of Pentacles represents opportunity, curiosity, and study in the material realm. It suggests a new learning opportunity, a practical message, or the beginning of a new venture related to finances, education, or career."
  },
  {
    name: "Knight of Pentacles",
    number: 12,
    arcana: "minor",
    suit: "pentacles",
    img: "/images/cards/pentacles/knight.svg",
    keywords: ["patience", "reliability", "hard work", "conservatism", "methodical"],
    meanings: {
      upright: "Patience, reliability, hard work, conservatism, methodical approach",
      reversed: "Laziness, obsessiveness, workaholic, stubbornness, boredom"
    },
    description: "The Knight of Pentacles represents patience, reliability, and hard work. He suggests a methodical approach to tasks, commitment to goals, and steady progress through diligence."
  },
  {
    name: "Queen of Pentacles",
    number: 13,
    arcana: "minor",
    suit: "pentacles",
    img: "/images/cards/pentacles/queen.svg",
    keywords: ["nurturing", "practical", "provider", "abundance", "security"],
    meanings: {
      upright: "Nurturing, practical, provider, abundance, security, groundedness",
      reversed: "Self-centeredness, jealousy, smothering, insecurity, materialism"
    },
    description: "The Queen of Pentacles represents nurturing, practicality, and abundance. She suggests a grounded approach to material matters, creating comfort and security, and practical nurturing of projects and people."
  },
  {
    name: "King of Pentacles",
    number: 14,
    arcana: "minor",
    suit: "pentacles",
    img: "/images/cards/pentacles/king.svg",
    keywords: ["abundance", "prosperity", "security", "ambition", "discipline"],
    meanings: {
      upright: "Abundance, prosperity, security, ambition, discipline, wealth",
      reversed: "Materialism, inflexibility, stubbornness, obsession with wealth"
    },
    description: "The King of Pentacles represents abundance, prosperity, and security. He suggests mastery in material matters, business acumen, and the ability to create and maintain wealth and security."
  }
];

// Minor Arcana Cards - Swords (Mental realm, communication, truth, conflict)
const swords = [
  {
    name: "Ace of Swords",
    number: 1,
    arcana: "minor",
    suit: "swords",
    img: "/images/cards/swords/ace.svg",
    keywords: ["clarity", "breakthrough", "new idea", "truth", "mental focus"],
    meanings: {
      upright: "Mental clarity, breakthrough, new idea, truth, mental focus",
      reversed: "Confusion, brutality, chaos, misuse of power, mental block"
    },
    description: "The Ace of Swords represents mental clarity, breakthrough, and new ideas. It suggests cutting through confusion with sharp intellect, discovering truth, and gaining mental focus."
  },
  {
    name: "Two of Swords",
    number: 2,
    arcana: "minor",
    suit: "swords",
    img: "/images/cards/swords/two.svg",
    keywords: ["indecision", "stalemate", "balance", "difficult choice", "denial"],
    meanings: {
      upright: "Difficult choices, indecision, stalemate, balance, denial, blindness",
      reversed: "Confusion, indecision, information overload, no right choice"
    },
    description: "The Two of Swords represents difficult choices, indecision, and stalemate. It suggests a situation requiring a decision between two equally challenging options, often involving temporary denial or blindness to the truth."
  },
  {
    name: "Three of Swords",
    number: 3,
    arcana: "minor",
    suit: "swords",
    img: "/images/cards/swords/three.svg",
    keywords: ["heartbreak", "sorrow", "grief", "betrayal", "emotional pain"],
    meanings: {
      upright: "Heartbreak, emotional pain, sorrow, grief, hurt, loneliness, betrayal",
      reversed: "Recovery, forgiveness, moving on, releasing pain, optimism"
    },
    description: "The Three of Swords represents heartbreak, emotional pain, and sorrow. It suggests experiencing grief, betrayal, or deep hurt, often necessary for growth and eventual healing."
  },
  {
    name: "Four of Swords",
    number: 4,
    arcana: "minor",
    suit: "swords",
    img: "/images/cards/swords/four.svg",
    keywords: ["rest", "recuperation", "meditation", "contemplation", "relaxation"],
    meanings: {
      upright: "Rest, relaxation, meditation, contemplation, recuperation",
      reversed: "Restlessness, burnout, exhaustion, stagnation, need for action"
    },
    description: "The Four of Swords represents rest, relaxation, and recuperation. It suggests taking time to recover from stress or challenges, engaging in contemplation, and finding mental peace."
  },
  {
    name: "Five of Swords",
    number: 5,
    arcana: "minor",
    suit: "swords",
    img: "/images/cards/swords/five.svg",
    keywords: ["conflict", "tension", "defeat", "win at all costs", "dishonor"],
    meanings: {
      upright: "Conflict, tension, defeat, win at all costs, dishonor, self-interest",
      reversed: "Reconciliation, making amends, forgiveness, moving on"
    },
    description: "The Five of Swords represents conflict, tension, and defeat. It suggests a situation where victory comes at a cost, potentially involving unhealthy competition, betrayal, or dishonor."
  },
  {
    name: "Six of Swords",
    number: 6,
    arcana: "minor",
    suit: "swords",
    img: "/images/cards/swords/six.svg",
    keywords: ["transition", "leaving behind", "moving on", "mental progress", "journey"],
    meanings: {
      upright: "Transition, leaving behind, moving on, mental journey, progress",
      reversed: "Stuck, unable to move on, resistance to change, emotional baggage"
    },
    description: "The Six of Swords represents transition, leaving behind, and moving on. It suggests a journey away from trouble toward something better, often involving emotional or mental progress."
  },
  {
    name: "Seven of Swords",
    number: 7,
    arcana: "minor",
    suit: "swords",
    img: "/images/cards/swords/seven.svg",
    keywords: ["deception", "strategy", "cunning", "secrecy", "escape"],
    meanings: {
      upright: "Deception, strategy, sneakiness, cunning, secrecy, running away",
      reversed: "Coming clean, rethinking approach, consequence of actions"
    },
    description: "The Seven of Swords represents deception, strategy, and cunning. It suggests using cleverness to achieve goals, potentially involving theft, escape, or avoiding confrontation through secretive means."
  },
  {
    name: "Eight of Swords",
    number: 8,
    arcana: "minor",
    suit: "swords",
    img: "/images/cards/swords/eight.svg",
    keywords: ["restriction", "imprisonment", "victim mentality", "helplessness", "isolation"],
    meanings: {
      upright: "Restriction, imprisonment, victim mentality, blindness, helplessness",
      reversed: "Self-acceptance, new perspective, freedom, self-confidence"
    },
    description: "The Eight of Swords represents restriction, imprisonment, and victim mentality. It suggests feeling trapped by circumstances or thoughts, often due to self-imposed limitations or an inability to see options."
  },
  {
    name: "Nine of Swords",
    number: 9,
    arcana: "minor",
    suit: "swords",
    img: "/images/cards/swords/nine.svg",
    keywords: ["anxiety", "worry", "fear", "depression", "nightmares"],
    meanings: {
      upright: "Anxiety, worry, fear, depression, nightmares, deepest fears",
      reversed: "Hope, reaching out, despair, healing inner voices"
    },
    description: "The Nine of Swords represents anxiety, worry, and fear. It suggests mental anguish, potentially involving insomnia, nightmares, or persistent anxiety about real or imagined problems."
  },
  {
    name: "Ten of Swords",
    number: 10,
    arcana: "minor",
    suit: "swords",
    img: "/images/cards/swords/ten.svg",
    keywords: ["painful ending", "rock bottom", "victim", "martyrdom", "defeat"],
    meanings: {
      upright: "Painful ending, deep wounds, betrayal, loss, crisis, rock bottom",
      reversed: "Recovery, regeneration, resisting an inevitable end, uphill battle"
    },
    description: "The Ten of Swords represents painful endings, deep wounds, and hitting rock bottom. It suggests a situation reaching its worst point, often involving betrayal or defeat, but also marking a point where things can only improve."
  },
  {
    name: "Page of Swords",
    number: 11,
    arcana: "minor",
    suit: "swords",
    img: "/images/cards/swords/page.svg",
    keywords: ["curiosity", "mental energy", "communication", "thirst for knowledge", "vigilance"],
    meanings: {
      upright: "New ideas, curiosity, communication, vigilance, seeking truth",
      reversed: "Deception, manipulation, all talk and no action, gossip"
    },
    description: "The Page of Swords represents curiosity, mental energy, and communication. It suggests a youthful approach to intellectual matters, vigilance, and an eagerness to learn and communicate new ideas."
  },
  {
    name: "Knight of Swords",
    number: 12,
    arcana: "minor",
    suit: "swords",
    img: "/images/cards/swords/knight.svg",
    keywords: ["fast-moving", "assertive", "action-oriented", "communication", "impulsive"],
    meanings: {
      upright: "Action, assertiveness, direct communication, intellectual warrior",
      reversed: "Impulsiveness, recklessness, impatience, no follow-through"
    },
    description: "The Knight of Swords represents fast-moving, assertive, and action-oriented energy. It suggests direct communication, intellectual pursuits undertaken with intensity, and a potentially aggressive approach to challenges."
  },
  {
    name: "Queen of Swords",
    number: 13,
    arcana: "minor",
    suit: "swords",
    img: "/images/cards/swords/queen.svg",
    keywords: ["independent", "logical", "intellectual", "direct", "clear communication"],
    meanings: {
      upright: "Independent, clear boundaries, intellectual, direct communication",
      reversed: "Cold, bitter, manipulative, unforgiving, harsh judgement"
    },
    description: "The Queen of Swords represents independent, logical, and intellectual energy. She suggests clear communication, setting boundaries, and making decisions based on objective analysis rather than emotion."
  },
  {
    name: "King of Swords",
    number: 14,
    arcana: "minor",
    suit: "swords",
    img: "/images/cards/swords/king.svg",
    keywords: ["intellectual", "authority", "logical", "fair", "truth"],
    meanings: {
      upright: "Intellectual power, authority, truth, justice, mental clarity",
      reversed: "Manipulation, cruelty, abuse of power, harsh judgment"
    },
    description: "The King of Swords represents intellectual power, authority, and truth. He suggests mastery of logic and communication, ethical leadership, and the ability to make fair judgments based on objective analysis."
  }
];

// Minor Arcana Cards - Wands (Energy, passion, creativity, action)
const wands = [
  {
    name: "Ace of Wands",
    number: 1,
    arcana: "minor",
    suit: "wands",
    img: "/images/cards/wands/ace.svg",
    keywords: ["creation", "willpower", "inspiration", "desire", "new opportunities"],
    meanings: {
      upright: "Creation, willpower, inspiration, desire, new opportunities, growth",
      reversed: "Lack of energy, lack of passion, delays, obstacles to starting"
    },
    description: "The Ace of Wands represents creation, willpower, and inspiration. It suggests the spark of a new idea or opportunity, creative potential, and enthusiastic beginnings filled with energy and passion."
  },
  {
    name: "Two of Wands",
    number: 2,
    arcana: "minor",
    suit: "wands",
    img: "/images/cards/wands/two.svg",
    keywords: ["planning", "making decisions", "leaving comfort", "future planning", "progress"],
    meanings: {
      upright: "Future planning, progress, decisions, discovery, planning ahead",
      reversed: "Fear of change, playing it safe, bad planning, lack of foresight"
    },
    description: "The Two of Wands represents planning, making decisions, and future thinking. It suggests standing at a crossroads, having initial success, and now planning next steps for expansion or new ventures."
  },
  {
    name: "Three of Wands",
    number: 3,
    arcana: "minor",
    suit: "wands",
    img: "/images/cards/wands/three.svg",
    keywords: ["looking ahead", "expansion", "foresight", "overseas opportunities", "preparation"],
    meanings: {
      upright: "Expansion, foresight, overseas opportunities, preparation, progress",
      reversed: "Obstacles, delays, frustration, three steps forward two steps back"
    },
    description: "The Three of Wands represents looking ahead, expansion, and foresight. It suggests seeing initial results of your efforts, anticipating future growth, and preparing for opportunities that may come from distant shores."
  },
  {
    name: "Four of Wands",
    number: 4,
    arcana: "minor",
    suit: "wands",
    img: "/images/cards/wands/four.svg",
    keywords: ["celebration", "harmony", "marriage", "home", "community"],
    meanings: {
      upright: "Celebration, harmony, marriage, home, community, reunion",
      reversed: "Breakdown in communication, transition, cancellation of events"
    },
    description: "The Four of Wands represents celebration, harmony, and home. It suggests a time of joy, often related to milestones, achievements, or community gatherings, with a sense of stability and harmony in relationships."
  },
  {
    name: "Five of Wands",
    number: 5,
    arcana: "minor",
    suit: "wands",
    img: "/images/cards/wands/five.svg",
    keywords: ["disagreement", "competition", "strife", "tension", "diversity"],
    meanings: {
      upright: "Disagreement, competition, strife, diversity, debate, tension",
      reversed: "Resolution, compromise, harmony restored, release of tensions"
    },
    description: "The Five of Wands represents disagreement, competition, and strife. It suggests conflict or tension, whether healthy competition or unproductive arguments, often involving diverse perspectives or approaches."
  },
  {
    name: "Six of Wands",
    number: 6,
    arcana: "minor",
    suit: "wands",
    img: "/images/cards/wands/six.svg",
    keywords: ["public recognition", "progress", "self-confidence", "success", "victory"],
    meanings: {
      upright: "Public recognition, progress, self-confidence, victory, success",
      reversed: "Private achievement, fall from grace, egotism, doubts about success"
    },
    description: "The Six of Wands represents public recognition, progress, and victory. It suggests achieving success that is recognized by others, gaining confidence from accomplishments, and advancing toward your goals."
  },
  {
    name: "Seven of Wands",
    number: 7,
    arcana: "minor",
    suit: "wands",
    img: "/images/cards/wands/seven.svg",
    keywords: ["challenge", "competition", "protection", "perseverance", "defense"],
    meanings: {
      upright: "Challenge, competition, protection, perseverance, defensiveness",
      reversed: "Giving up, overwhelmed, exhaustion, yielding, lack of confidence"
    },
    description: "The Seven of Wands represents challenge, competition, and protection. It suggests defending your position, standing up for your beliefs, and persevering against opposition or challenges to your success."
  },
  {
    name: "Eight of Wands",
    number: 8,
    arcana: "minor",
    suit: "wands",
    img: "/images/cards/wands/eight.svg",
    keywords: ["speed", "action", "air travel", "movement", "quick decisions"],
    meanings: {
      upright: "Speed, action, air travel, movement, quick decisions, progress",
      reversed: "Delays, frustration, slow movement, chaos, waiting for results"
    },
    description: "The Eight of Wands represents speed, action, and movement. It suggests rapid progress, receiving important communications, and events unfolding quickly, often after a period of waiting."
  },
  {
    name: "Nine of Wands",
    number: 9,
    arcana: "minor",
    suit: "wands",
    img: "/images/cards/wands/nine.svg",
    keywords: ["resilience", "courage", "persistence", "last stand", "boundaries"],
    meanings: {
      upright: "Resilience, courage, persistence, test of faith, boundaries",
      reversed: "Exhaustion, giving up, overwhelmed, paranoia, defensiveness"
    },
    description: "The Nine of Wands represents resilience, courage, and persistence. It suggests being battle-weary but standing strong, establishing healthy boundaries, and drawing on inner strength to overcome final challenges."
  },
  {
    name: "Ten of Wands",
    number: 10,
    arcana: "minor",
    suit: "wands",
    img: "/images/cards/wands/ten.svg",
    keywords: ["burden", "responsibility", "hard work", "completion", "exhaustion"],
    meanings: {
      upright: "Burden, extra responsibility, hard work, completion, overextended",
      reversed: "Burned out, stressed, inability to delegate, learning to say no"
    },
    description: "The Ten of Wands represents burden, responsibility, and hard work. It suggests carrying heavy responsibilities, potentially being overcommitted, and feeling the weight of obligations as you near completion of a cycle."
  },
  {
    name: "Page of Wands",
    number: 11,
    arcana: "minor",
    suit: "wands",
    img: "/images/cards/wands/page.svg",
    keywords: ["exploration", "excitement", "freedom", "new ideas", "inspiring news"],
    meanings: {
      upright: "Exploration, excitement, freedom, new ideas, inspiring message",
      reversed: "Setbacks to new ideas, pessimism, lack of direction, procrastination"
    },
    description: "The Page of Wands represents exploration, excitement, and new ideas. It suggests an enthusiastic approach to new ventures, receiving inspiring news, and embracing opportunities with passion and curiosity."
  },
  {
    name: "Knight of Wands",
    number: 12,
    arcana: "minor",
    suit: "wands",
    img: "/images/cards/wands/knight.svg",
    keywords: ["energy", "passion", "adventure", "impulsiveness", "action"],
    meanings: {
      upright: "Energy, passion, inspired action, adventure, impulsiveness",
      reversed: "Passion project delays, haste, scattered energy, frustration"
    },
    description: "The Knight of Wands represents energy, passion, and adventure. It suggests approaching life with enthusiasm and confidence, taking inspired action, and pursuing goals with determination and charisma."
  },
  {
    name: "Queen of Wands",
    number: 13,
    arcana: "minor",
    suit: "wands",
    img: "/images/cards/wands/queen.svg",
    keywords: ["courage", "determination", "joy", "vibrancy", "warmth"],
    meanings: {
      upright: "Courage, confidence, determination, social butterfly, vibrancy",
      reversed: "Demanding, vengeful, low confidence, jealousy, insecurity"
    },
    description: "The Queen of Wands represents courage, determination, and joy. She suggests approaching life with confidence and warmth, inspiring others through your example, and expressing yourself with passion and authenticity."
  },
  {
    name: "King of Wands",
    number: 14,
    arcana: "minor",
    suit: "wands",
    img: "/images/cards/wands/king.svg",
    keywords: ["natural leader", "vision", "entrepreneur", "honor", "big picture"],
    meanings: {
      upright: "Natural leader, vision, entrepreneur, honor, bold action",
      reversed: "Impulsive, overbearing, unachievable expectations, tyrannical"
    },
    description: "The King of Wands represents natural leadership, vision, and entrepreneurial spirit. He suggests mastery of creative or passionate pursuits, inspiring others through bold vision, and taking decisive action to achieve ambitious goals."
  }
];

// Combine all cards into a single deck
const allCards = [...majorArcana, ...cups, ...pentacles, ...swords, ...wands];

export { majorArcana, cups, pentacles, swords, wands, allCards };
export default allCards;
