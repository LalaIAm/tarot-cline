import { useState, useEffect, useCallback } from 'react';
import TarotCard from '../../components/ui/TarotCard';
import allCards, { majorArcana, cups, pentacles, swords, wands } from './tarotData';

/**
 * TarotDeck Component
 * 
 * Manages the entire collection of tarot cards, providing functions for:
 * - Shuffling the deck
 * - Drawing cards
 * - Organizing cards by suit
 * - Filtering by arcana type
 */
const TarotDeck = ({
  onCardSelect = () => {},
  onShuffle = () => {},
  showAll = false,
  arcanaFilter = "all", // "all", "major", "minor"
  suitFilter = "all", // "all", "cups", "pentacles", "swords", "wands"
  displayMode = "grid", // "grid", "stack", "fan"
  className = ""
}) => {
  const [deck, setDeck] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  // Initialize deck based on filters
  useEffect(() => {
    let filteredDeck = [...allCards];
    
    // Apply arcana filter
    if (arcanaFilter === "major") {
      filteredDeck = majorArcana;
    } else if (arcanaFilter === "minor") {
      filteredDeck = [...cups, ...pentacles, ...swords, ...wands];
    }
    
    // Apply suit filter (only applies to minor arcana)
    if (suitFilter !== "all") {
      switch (suitFilter) {
        case "cups":
          filteredDeck = arcanaFilter === "major" ? majorArcana : cups;
          break;
        case "pentacles":
          filteredDeck = arcanaFilter === "major" ? majorArcana : pentacles;
          break;
        case "swords":
          filteredDeck = arcanaFilter === "major" ? majorArcana : swords;
          break;
        case "wands":
          filteredDeck = arcanaFilter === "major" ? majorArcana : wands;
          break;
        default:
          break;
      }
    }
    
    setDeck(filteredDeck);
  }, [arcanaFilter, suitFilter]);

  // Shuffle the deck using Fisher-Yates algorithm
  const shuffleDeck = useCallback(() => {
    setIsShuffling(true);
    
    // Create a copy of the deck to shuffle
    const shuffledDeck = [...deck];
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    
    // Update deck state with shuffled cards
    setTimeout(() => {
      setDeck(shuffledDeck);
      setIsShuffling(false);
      onShuffle(shuffledDeck);
    }, 1000); // Animation time
  }, [deck, onShuffle]);

  // Draw a specified number of cards from the deck
  const drawCards = useCallback((count = 1, replace = false) => {
    if (count > deck.length && !replace) {
      console.error('Cannot draw more cards than are in the deck');
      return [];
    }
    
    // Create an array to hold the drawn cards
    const drawnCards = [];
    const indices = new Set();
    
    // Draw the specified number of cards
    for (let i = 0; i < count; i++) {
      let randomIndex;
      
      // If drawing without replacement, ensure we don't pick the same card twice
      if (!replace) {
        do {
          randomIndex = Math.floor(Math.random() * deck.length);
        } while (indices.has(randomIndex));
        indices.add(randomIndex);
      } else {
        randomIndex = Math.floor(Math.random() * deck.length);
      }
      
      // Add a random orientation (upright or reversed)
      const orientation = Math.random() > 0.5 ? 'upright' : 'reversed';
      
      // Add the card to the drawn cards array
      drawnCards.push({
        ...deck[randomIndex],
        orientation
      });
    }
    
    setSelectedCards(drawnCards);
    return drawnCards;
  }, [deck]);

  // Handle selecting a card from the deck
  const handleCardSelect = (card) => {
    // Add orientation to the card
    const orientation = Math.random() > 0.5 ? 'upright' : 'reversed';
    const selectedCard = { ...card, orientation };
    
    setSelectedCards([...selectedCards, selectedCard]);
    onCardSelect(selectedCard);
  };

  // Render the deck based on the display mode
  const renderDeck = () => {
    if (showAll) {
      // Grid display for all cards
      return (
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}>
          {deck.map((card, index) => (
            <div key={`${card.name}-${index}`} className="flex justify-center">
              <TarotCard
                frontImage={card.img}
                name={card.name}
                canFlip={true}
                isFlipped={false}
                onClick={() => handleCardSelect(card)}
                className={isShuffling ? 'shuffling-animation' : ''}
              />
            </div>
          ))}
        </div>
      );
    } else {
      // Display mode handling (stack, fan, etc.)
      switch (displayMode) {
        case 'stack':
          return (
            <div className={`relative h-80 w-48 md:h-96 md:w-60 ${className}`}>
              {deck.slice(0, 3).map((card, index) => (
                <div
                  key={`${card.name}-${index}`}
                  className="absolute transform"
                  style={{
                    top: `${index * 2}px`,
                    left: `${index * 2}px`,
                    zIndex: index
                  }}
                >
                  <TarotCard
                    frontImage={"/images/card-back.svg"}
                    backImage={"/images/card-back.svg"}
                    name={card.name}
                    canFlip={false}
                    isFlipped={false}
                    className={isShuffling ? 'shuffling-animation' : ''}
                  />
                </div>
              ))}
            </div>
          );
        case 'fan':
          return (
            <div className={`relative h-80 w-96 md:h-96 md:w-[500px] ${className}`}>
              {deck.slice(0, 7).map((card, index) => (
                <div
                  key={`${card.name}-${index}`}
                  className="absolute transform origin-bottom-left"
                  style={{
                    bottom: '0',
                    left: '50%',
                    transform: `translateX(-50%) rotate(${(index - 3) * 10}deg)`,
                    zIndex: index
                  }}
                >
                  <TarotCard
                    frontImage={"/images/card-back.svg"}
                    backImage={"/images/card-back.svg"}
                    name={card.name}
                    canFlip={false}
                    isFlipped={false}
                    className={isShuffling ? 'shuffling-animation' : ''}
                  />
                </div>
              ))}
            </div>
          );
        default: // 'grid'
          return (
            <div className={`grid grid-cols-1 gap-4 ${className}`}>
              <div className="flex justify-center">
                <TarotCard
                  frontImage={"/images/card-back.svg"}
                  backImage={"/images/card-back.svg"}
                  name="Tarot Deck"
                  canFlip={false}
                  isFlipped={false}
                  className={isShuffling ? 'shuffling-animation' : ''}
                />
              </div>
            </div>
          );
      }
    }
  };

  return (
    <div className="tarot-deck">
      {/* Deck controls */}
      <div className="flex justify-center mb-6 space-x-4">
        <button 
          onClick={shuffleDeck}
          disabled={isShuffling}
          className="px-4 py-2 bg-purple-900 text-white rounded-md hover:bg-purple-800 transition-colors disabled:opacity-50"
        >
          {isShuffling ? 'Shuffling...' : 'Shuffle Deck'}
        </button>
        <button 
          onClick={() => drawCards(1)}
          className="px-4 py-2 bg-purple-900 text-white rounded-md hover:bg-purple-800 transition-colors"
        >
          Draw Card
        </button>
      </div>

      {/* Deck visualization */}
      {renderDeck()}

      {/* Selected cards display */}
      {selectedCards.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-display mb-4 text-center">Selected Cards</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {selectedCards.map((card, index) => (
              <div key={`selected-${card.name}-${index}`} className="flex flex-col items-center">
                <TarotCard
                  frontImage={card.img}
                  name={card.name}
                  isFlipped={true}
                  canFlip={true}
                  className={card.orientation === 'reversed' ? 'rotate-180' : ''}
                />
                <span className="mt-2 text-sm font-medium text-center">
                  {card.name}
                  <br />
                  <span className="text-xs opacity-75">
                    {card.orientation}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TarotDeck;
