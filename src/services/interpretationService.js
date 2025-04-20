/**
 * Tarot Reading Interpretation Service
 * 
 * This service handles the interpretation of tarot readings using OpenAI's GPT API.
 * It includes prompt engineering, response parsing, and caching for common interpretations.
 */

// OpenAI API integration - would need actual API key in production
// For now, we'll use a more sophisticated mock implementation
// that could be replaced with actual API calls later

// Simple cache to reduce API calls (would be replaced with proper caching in production)
const interpretationCache = new Map();

// Cache key generator
const generateCacheKey = (question, cards) => {
  const cardString = cards
    .map(card => `${card.name}:${card.position}:${card.orientation}`)
    .join('|');
  return `${question}::${cardString}`;
};

/**
 * Get cached interpretation if available
 * @param {string} question - User's question or intent
 * @param {Array} cards - Array of card objects
 * @returns {Object|null} - Cached interpretation or null
 */
const getCachedInterpretation = (question, cards) => {
  const cacheKey = generateCacheKey(question, cards);
  return interpretationCache.get(cacheKey) || null;
};

/**
 * Store interpretation in cache
 * @param {string} question - User's question or intent
 * @param {Array} cards - Array of card objects
 * @param {Object} interpretation - The interpretation object
 */
const cacheInterpretation = (question, cards, interpretation) => {
  const cacheKey = generateCacheKey(question, cards);
  interpretationCache.set(cacheKey, interpretation);
};

/**
 * Build a prompt for the OpenAI API based on the reading details
 * @param {string} question - User's question or intent
 * @param {string} spreadType - Type of tarot spread
 * @param {Array} cards - Array of card objects
 * @returns {string} - Formatted prompt
 */
const buildPrompt = (question, spreadType, cards) => {
  const spreadNames = {
    'single-card': 'Single Card Reading',
    'three-card': 'Past, Present, Future Spread',
    'celtic-cross': 'Celtic Cross Spread',
    'relationship': 'Relationship Spread',
    'career-path': 'Career Path Spread'
  };

  const spreadName = spreadNames[spreadType] || spreadType;
  
  let prompt = `As a skilled tarot card reader, provide an insightful, thoughtful interpretation for the following reading.\n\n`;
  prompt += `User's Question: "${question}"\n`;
  prompt += `Spread Type: ${spreadName}\n\n`;
  prompt += `Cards drawn:\n`;
  
  cards.forEach(card => {
    prompt += `- ${card.name} in the ${card.position} position (${card.orientation})\n`;
  });
  
  prompt += `\nProvide a holistic interpretation that includes:\n`;
  prompt += `1. A brief introduction connecting to the user's question\n`;
  prompt += `2. Individual interpretations for each card in its position\n`;
  prompt += `3. How the cards interact with each other\n`;
  prompt += `4. Overall guidance and insights from the reading\n`;
  prompt += `5. Reflection questions for the user to consider\n\n`;
  prompt += `Format the response in JSON with the following structure:
  {
    "summary": "Brief overall summary of the reading",
    "introduction": "Introduction paragraph relating to the question",
    "cards": [
      {
        "name": "Card name",
        "position": "Position name",
        "interpretation": "Interpretation for this specific card"
      }
    ],
    "cardInteractions": "How the cards relate to each other",
    "guidance": "Overall guidance based on the reading",
    "reflectionQuestions": ["Question 1", "Question 2", "Question 3"]
  }`;
  
  return prompt;
};

/**
 * Use OpenAI API to generate interpretation
 * In production, this would make an actual API call
 * For now, we're using an advanced mock that simulates the structure
 */
const callOpenAI = async (prompt) => {
  // This would be replaced with actual API call
  console.log('Would call OpenAI API with prompt:', prompt);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Extract key information from the prompt to customize the mock response
  const questionMatch = prompt.match(/User's Question: "([^"]+)"/);
  const question = questionMatch ? questionMatch[1] : 'general guidance';
  
  const cardsInfo = [];
  const cardMatches = prompt.matchAll(/- (.+?) in the (.+?) position \((.+?)\)/g);
  for (const match of cardMatches) {
    cardsInfo.push({
      name: match[1],
      position: match[2],
      orientation: match[3]
    });
  }
  
  // Generate a more sophisticated mock response based on actual cards and positions
  return generateMockInterpretation(question, cardsInfo);
};

/**
 * Generate a detailed mock interpretation based on the question and cards
 */
const generateMockInterpretation = (question, cards) => {
  // Theme detection based on question
  let theme = 'general';
  if (question.toLowerCase().includes('love') || question.toLowerCase().includes('relationship')) {
    theme = 'relationship';
  } else if (question.toLowerCase().includes('career') || question.toLowerCase().includes('job') || question.toLowerCase().includes('work')) {
    theme = 'career';
  } else if (question.toLowerCase().includes('health') || question.toLowerCase().includes('wellness')) {
    theme = 'health';
  } else if (question.toLowerCase().includes('spiritual') || question.toLowerCase().includes('growth')) {
    theme = 'spiritual';
  }
  
  // Determine overall tone based on cards
  let tone = 'balanced';
  const majorArcanaCount = cards.filter(c => !c.name.includes(' of ')).length;
  const reversedCount = cards.filter(c => c.orientation === 'reversed').length;
  
  if (reversedCount > cards.length / 2) {
    tone = 'challenging';
  } else if (reversedCount === 0) {
    tone = 'positive';
  }
  
  if (majorArcanaCount > cards.length / 2) {
    tone = tone === 'challenging' ? 'transformative' : 'significant';
  }
  
  // Create card-specific interpretations
  const cardInterpretations = cards.map(card => {
    return {
      name: card.name,
      position: card.position,
      interpretation: generateCardInterpretation(card.name, card.position, card.orientation, theme)
    };
  });
  
  // Generate reflection questions based on theme and tone
  const reflectionQuestions = generateReflectionQuestions(theme, tone, cards);
  
  // Generate overall content
  return {
    summary: generateSummary(question, cards, tone),
    introduction: generateIntroduction(question, theme, tone),
    cards: cardInterpretations,
    cardInteractions: generateCardInteractions(cards, theme),
    guidance: generateGuidance(theme, tone, cards),
    reflectionQuestions
  };
};

/**
 * Generate a meaningful summary based on the reading
 */
const generateSummary = (question, cards, tone) => {
  const toneWords = {
    'positive': ['promising', 'encouraging', 'favorable', 'auspicious'],
    'challenging': ['challenging', 'complex', 'demanding', 'testing'],
    'balanced': ['balanced', 'nuanced', 'thoughtful', 'considered'],
    'significant': ['significant', 'profound', 'meaningful', 'substantial'],
    'transformative': ['transformative', 'life-changing', 'evolving', 'shifting']
  };
  
  const toneWord = toneWords[tone][Math.floor(Math.random() * toneWords[tone].length)];
  
  if (cards.length === 1) {
    return `This single card reading offers ${toneWord} insights regarding your question about ${question}. The ${cards[0].name} suggests a focused message that warrants careful reflection.`;
  } else if (cards.length === 3) {
    return `This three-card spread reveals a ${toneWord} journey through past influences, present circumstances, and future possibilities regarding ${question}. The cards tell a story of evolution and growth.`;
  } else {
    return `This ${cards.length}-card spread presents a ${toneWord} exploration of the forces surrounding your question about ${question}. The cards reveal multiple dimensions that deserve careful consideration.`;
  }
};

/**
 * Generate an introduction paragraph
 */
const generateIntroduction = (question, theme, tone) => {
  const introByTheme = {
    'relationship': `Your question about relationships brings us to examine the connections, emotions, and patterns that shape your interpersonal dynamics. The cards have responded to your inquiry with insights that may help clarify your path forward.`,
    'career': `Your professional journey is at a crossroads, and the cards respond to your questions about career with perspectives on your path, potential, and purpose in your work life.`,
    'health': `The cards respond to your question about wellbeing by illuminating the physical, mental, and spiritual aspects of your health journey. This reading offers perspectives on balance and healing.`,
    'spiritual': `Your spiritual quest is reflected in these cards, showing aspects of your inner development, awakening, and connection to deeper meaning.`,
    'general': `The cards have responded to your question with a pattern that reflects both your current circumstances and the energies surrounding your situation. This reading offers perspectives to consider as you navigate your path.`
  };
  
  const toneAddition = {
    'positive': ` The overall energy appears supportive and encouraging, suggesting favorable circumstances for growth.`,
    'challenging': ` Be aware that the reading indicates some challenges ahead, but within them lie opportunities for significant growth.`,
    'balanced': ` The balance of energies in this reading suggests a nuanced situation with both opportunities and aspects requiring careful attention.`,
    'significant': ` The cards indicate this is a pivotal time with potential for meaningful developments in your situation.`,
    'transformative': ` The profound energies present in this reading suggest you're at a crucial turning point with potential for deep transformation.`
  };
  
  return introByTheme[theme] + toneAddition[tone];
};

/**
 * Generate an interpretation for a specific card
 */
const generateCardInterpretation = (cardName, position, orientation, theme) => {
  // This would ideally draw from a comprehensive database of card meanings
  // For now, we'll use a simplified approach
  
  const isReversed = orientation === 'reversed';
  const isMajorArcana = !cardName.includes(' of ');
  
  // Generate position-specific meaning
  let positionContext = '';
  if (position === 'past') {
    positionContext = 'In the past position, this card reflects influences that have shaped your current situation.';
  } else if (position === 'present') {
    positionContext = 'In the present position, this card illuminates the current energies surrounding your situation.';
  } else if (position === 'future') {
    positionContext = 'In the future position, this card suggests potential developments and energies that may emerge.';
  } else {
    positionContext = `In the ${position} position, this card offers specific insight related to this aspect of your question.`;
  }
  
  // Simple mapping for demonstration - would be much more comprehensive in production
  let cardMeaning = '';
  
  // Major Arcana examples
  if (cardName === 'The Fool') {
    cardMeaning = isReversed 
      ? 'The Fool reversed suggests hesitation, missed opportunities, or recklessness. You may be either holding back too much or rushing forward without proper preparation.'
      : 'The Fool represents new beginnings, spontaneity, and unlimited potential. You stand at the threshold of an adventure, ready to embrace new experiences with an open heart.';
  } else if (cardName === 'The Magician') {
    cardMeaning = isReversed
      ? 'The Magician reversed indicates manipulation, untapped talents, or wasted potential. You may not be fully utilizing your skills or might be using them in unproductive ways.'
      : 'The Magician represents manifestation, personal power, and skilled action. You have all the tools you need to create what you desire if you focus your intention.';
  } else if (cardName === 'The High Priestess') {
    cardMeaning = isReversed
      ? 'The High Priestess reversed suggests ignored intuition, hidden information coming to light, or superficial understanding. You may need to go deeper than surface appearances.'
      : 'The High Priestess represents intuition, mystery, and inner wisdom. Trust your inner voice and acknowledge the deeper currents beneath the surface of your situation.';
  }
  // Minor Arcana examples
  else if (cardName.includes('Cups')) {
    cardMeaning = isReversed
      ? 'This Cups card in reverse suggests emotional challenges, blockages, or imbalances in feelings or relationships. There may be emotional aspects you\'re avoiding or struggling to process.'
      : 'This Cups card relates to emotions, relationships, creativity, and intuition. It suggests a focus on the heart\'s wisdom and emotional connections in your situation.';
  } else if (cardName.includes('Swords')) {
    cardMeaning = isReversed
      ? 'This Swords card in reverse indicates intellectual confusion, poor communication, or mental blocks. You may be overthinking or avoiding difficult truths.'
      : 'This Swords card relates to the intellect, communication, challenges, and truth. It suggests mental clarity and decisive action are important in your situation.';
  } else if (cardName.includes('Wands')) {
    cardMeaning = isReversed
      ? 'This Wands card in reverse suggests blocked energy, delays in progress, or lack of enthusiasm. Your creative or spiritual fire may be dampened.'
      : 'This Wands card relates to energy, passion, creativity, and spiritual growth. It suggests vitality and inspiration are flowing through your situation.';
  } else if (cardName.includes('Pentacles')) {
    cardMeaning = isReversed
      ? 'This Pentacles card in reverse indicates material challenges, financial setbacks, or neglect of practical matters. You may need to reorient your approach to physical world concerns.'
      : 'This Pentacles card relates to the material world, finances, work, and physical wellbeing. It suggests practical matters and manifestation in the physical realm.';
  } else {
    cardMeaning = isReversed
      ? 'This card in reverse suggests challenges or inverted energies related to its upright meaning. What normally flows easily may be blocked or expressed in less conventional ways.'
      : 'This card brings its unique energy to your reading, suggesting specific influences related to your question.';
  }
  
  // Add theme-specific insight
  let themeInsight = '';
  if (theme === 'relationship' && (cardName.includes('Cups') || isMajorArcana)) {
    themeInsight = isReversed
      ? ' In relationships, this suggests examining emotional barriers or unspoken tensions that may be affecting your connections with others.'
      : ' For your relationship concerns, this indicates emotional currents that influence your connections and how you relate to others.';
  } else if (theme === 'career' && (cardName.includes('Pentacles') || isMajorArcana)) {
    themeInsight = isReversed
      ? ' For your career questions, this points to potential obstacles or adjustments needed in your professional approach or work environment.'
      : ' In your professional life, this suggests practical developments and material aspects that influence your career path.';
  } else if (theme === 'spiritual' && (cardName.includes('Wands') || isMajorArcana)) {
    themeInsight = isReversed
      ? ' On your spiritual journey, this indicates inner blocks or transformative challenges that require attention and integration.'
      : ' For your spiritual growth, this represents energies and inspiration that fuel your inner development and awakening.';
  }
  
  return `${positionContext} ${cardMeaning}${themeInsight}`;
};

/**
 * Generate insight about how the cards interact
 */
const generateCardInteractions = (cards, theme) => {
  if (cards.length === 1) {
    return "This single card stands alone, offering focused insight into your question.";
  }
  
  const reversedCount = cards.filter(c => c.orientation === 'reversed').length;
  const majorArcanaCount = cards.filter(c => !c.name.includes(' of ')).length;
  
  let pattern = '';
  if (reversedCount > 0) {
    pattern = reversedCount === cards.length 
      ? "All cards appearing reversed suggests significant blocks or internal challenges that require your attention."
      : `With ${reversedCount} of ${cards.length} cards reversed, there's a balance of flowing energy and areas that may be blocked or turned inward.`;
  } else {
    pattern = "All cards appearing upright suggests a clear path forward with aligned energies supporting your journey.";
  }
  
  let progression = '';
  if (cards.length >= 3) {
    if (cards[0].name.includes('Wands') && cards[cards.length-1].name.includes('Pentacles')) {
      progression = "The reading progresses from inspiration and energy (Wands) toward material manifestation (Pentacles), suggesting ideas becoming reality.";
    } else if (cards[0].name.includes('Swords') && cards[cards.length-1].name.includes('Cups')) {
      progression = "The reading moves from mental activity (Swords) toward emotional resolution (Cups), suggesting intellectual challenges finding emotional integration.";
    } else if (majorArcanaCount >= 2) {
      progression = "The presence of multiple Major Arcana cards indicates significant life themes and transformative energies at work in your situation.";
    }
  }
  
  let themeConnection = '';
  if (theme === 'relationship') {
    themeConnection = "In the context of relationships, these cards together reveal the emotional currents, communication patterns, and growth opportunities in your connections with others.";
  } else if (theme === 'career') {
    themeConnection = "Regarding your career questions, this combination of cards highlights the skills, challenges, and potential paths forward in your professional journey.";
  } else if (theme === 'spiritual') {
    themeConnection = "For your spiritual development, these cards interact to show different aspects of your inner growth, awakening, and the energies supporting your evolution.";
  } else {
    themeConnection = "These cards work together to create a narrative that addresses multiple dimensions of your question.";
  }
  
  return `${pattern} ${progression} ${themeConnection}`;
};

/**
 * Generate overall guidance based on the reading
 */
const generateGuidance = (theme, tone, cards) => {
  const guidanceByTheme = {
    'relationship': "In your relationships, the cards suggest focusing on honest communication and emotional authenticity. Give space for both connection and independence, allowing relationships to evolve naturally.",
    'career': "For your professional journey, consider aligning your work with your values and strengths. Be strategic about opportunities while remaining adaptable to changing circumstances.",
    'health': "Regarding your wellbeing, the cards emphasize the importance of balance between different aspects of health - physical, emotional, mental, and spiritual. Small consistent actions create lasting wellness.",
    'spiritual': "On your spiritual path, trust the unfolding process and remain open to insights from unexpected sources. Integration of spiritual awareness into daily life creates sustainable growth.",
    'general': "The cards suggest maintaining flexibility while staying true to your core values. Timing matters - know when to act decisively and when to wait for clarity."
  };
  
  const toneModifier = {
    'positive': "The supportive energies present suggest this is an excellent time to move forward with confidence. Trust the process and embrace the opportunities appearing before you.",
    'challenging': "While challenges appear in this reading, remember that difficulties often precede significant growth. Approach obstacles as teachers rather than barriers.",
    'balanced': "Balance is key in your approach going forward. Weigh different aspects carefully and avoid extremes as you navigate this situation.",
    'significant': "This appears to be a pivotal time with important developments on the horizon. Your choices now may have far-reaching effects.",
    'transformative': "You stand at a threshold of potential transformation. Embrace the process of deep change, even when it requires letting go of the familiar."
  };
  
  // Add advice based on specific card combinations
  let specificAdvice = "";
  
  // Check for specific patterns
  const hasSwords = cards.some(c => c.name.includes('Swords'));
  const hasCups = cards.some(c => c.name.includes('Cups'));
  const hasReversedMajorArcana = cards.some(c => !c.name.includes(' of ') && c.orientation === 'reversed');
  
  if (hasSwords && hasCups) {
    specificAdvice = " Finding harmony between head and heart will be particularly important for you in this situation.";
  } else if (hasReversedMajorArcana) {
    specificAdvice = " Pay attention to internal blocks or resistance that may be preventing you from fully embracing your potential in this situation.";
  }
  
  return `${guidanceByTheme[theme]} ${toneModifier[tone]}${specificAdvice}`;
};

/**
 * Generate meaningful reflection questions
 */
const generateReflectionQuestions = (theme, tone, cards) => {
  const generalQuestions = [
    "What immediate insights resonate with you from this reading?",
    "Which card speaks to you most strongly and why?",
    "How might you integrate this guidance into your daily life?",
  ];
  
  const themeQuestions = {
    'relationship': [
      "How are your current relationships reflecting your inner state?",
      "What patterns from past relationships might be influencing your present situation?",
      "What qualities do you most value in your closest relationships?"
    ],
    'career': [
      "What aspects of your work bring you the most fulfillment?",
      "How does your career path align with your core values?",
      "What skills or qualities would you like to develop further professionally?"
    ],
    'health': [
      "What areas of your wellbeing need the most attention right now?",
      "How might emotional patterns be affecting your physical health?",
      "What small changes could create greater balance in your daily routines?"
    ],
    'spiritual': [
      "How do you experience connection with your deeper self or higher guidance?",
      "What practices help you maintain spiritual awareness in daily life?",
      "What beliefs or perspectives might be ready for evolution?"
    ],
    'general': [
      "What aspects of this situation might you be overlooking?",
      "How do your fears and hopes influence how you see this situation?",
      "What would success or resolution look like to you?"
    ]
  };
  
  // Add tone-specific questions
  const toneQuestions = {
    'challenging': [
      "How have difficult situations contributed to your growth in the past?",
      "What resources or support might help you navigate current challenges?"
    ],
    'transformative': [
      "What might you need to release to allow transformation?",
      "How can you stay grounded through significant changes?"
    ],
    'significant': [
      "How can you best prepare for important developments ahead?",
      "What foundations need strengthening before moving forward?"
    ]
  };
  
  // Add card-specific questions
  let cardQuestions = [];
  if (cards.some(c => c.name === 'The Fool' || c.name === 'Death' || c.name === 'The World')) {
    cardQuestions.push("How do you feel about beginnings and endings in your life right now?");
  }
  if (cards.some(c => c.name.includes('King') || c.name.includes('Queen'))) {
    cardQuestions.push("What aspects of mature leadership or wisdom do you need to embody more fully?");
  }
  
  // Combine and select questions
  const allQuestions = [
    ...generalQuestions,
    ...themeQuestions[theme],
    ...(toneQuestions[tone] || []),
    ...cardQuestions
  ];
  
  // Shuffle and select 5 questions
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
};

/**
 * Generate an interpretation for a tarot reading
 * @param {Object} readingData - Object containing reading details
 * @returns {Promise<Object>} - The interpretation object
 */
export const interpretReading = async (readingData) => {
  const { question, spread, cards } = readingData;
  
  try {
    // Check cache first
    const cachedResult = getCachedInterpretation(question, cards);
    if (cachedResult) {
      console.log('Using cached interpretation');
      return { interpretation: cachedResult, error: null };
    }
    
    // Build prompt for OpenAI
    const prompt = buildPrompt(question, spread.id, cards);
    
    // Call OpenAI (or our mock for now)
    const interpretation = await callOpenAI(prompt);
    
    // Cache the result
    cacheInterpretation(question, cards, interpretation);
    
    return { interpretation, error: null };
  } catch (error) {
    console.error('Error generating interpretation:', error);
    return { 
      interpretation: null, 
      error: 'Failed to generate interpretation. Please try again.' 
    };
  }
};
