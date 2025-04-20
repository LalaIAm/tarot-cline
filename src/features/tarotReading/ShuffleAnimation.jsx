import { useEffect, useState } from 'react';

/**
 * ShuffleAnimation Component
 * 
 * Displays an animated shuffling effect for tarot cards
 * Can be triggered programmatically and provides callbacks for animation completion
 */
const ShuffleAnimation = ({
  isShuffling = false,
  onAnimationComplete = () => {},
  duration = 3000,
  cardCount = 10,
  className = ""
}) => {
  const [cards, setCards] = useState([]);
  const [animationState, setAnimationState] = useState('idle'); // 'idle', 'shuffling', 'complete'

  // Initialize cards for animation
  useEffect(() => {
    // Create an array of card positions
    const initialCards = Array.from({ length: cardCount }).map((_, index) => ({
      id: `card-${index}`,
      position: index,
      rotation: 0,
      x: 0,
      y: 0,
      scale: 1,
      zIndex: cardCount - index,
      isVisible: true
    }));
    
    setCards(initialCards);
  }, [cardCount]);

  // Handle shuffle animation
  useEffect(() => {
    if (isShuffling && animationState === 'idle') {
      startShuffleAnimation();
    }
  }, [isShuffling]);

  // Start the shuffle animation
  const startShuffleAnimation = () => {
    setAnimationState('shuffling');
    
    // Stage 1: Initial spread out animation
    setTimeout(() => {
      const spreadCards = cards.map((card, index) => ({
        ...card,
        x: Math.sin(index * 0.5) * 60,
        y: Math.cos(index * 0.5) * 30,
        rotation: (Math.random() * 20) - 10
      }));
      
      setCards(spreadCards);
    }, 100);
    
    // Stage 2: Shuffle animation
    setTimeout(() => {
      const newPositions = [...Array(cards.length).keys()].sort(() => Math.random() - 0.5);
      
      const shuffledCards = cards.map((card, index) => ({
        ...card,
        x: Math.sin(newPositions[index] * 0.7) * 80,
        y: Math.cos(newPositions[index] * 0.7) * 40,
        rotation: (Math.random() * 180) - 90,
        scale: 0.8 + (Math.random() * 0.4),
        zIndex: Math.floor(Math.random() * cardCount)
      }));
      
      setCards(shuffledCards);
    }, duration * 0.33);
    
    // Stage 3: Second shuffle animation
    setTimeout(() => {
      const newPositions = [...Array(cards.length).keys()].sort(() => Math.random() - 0.5);
      
      const shuffledCards = cards.map((card, index) => ({
        ...card,
        x: Math.sin(newPositions[index] * 0.9) * 100,
        y: Math.cos(newPositions[index] * 0.9) * 60,
        rotation: (Math.random() * 360) - 180,
        scale: 0.7 + (Math.random() * 0.5),
        zIndex: Math.floor(Math.random() * cardCount)
      }));
      
      setCards(shuffledCards);
    }, duration * 0.66);
    
    // Stage 4: Return to deck formation
    setTimeout(() => {
      const stackedCards = cards.map((card, index) => ({
        ...card,
        x: (Math.random() * 6) - 3,
        y: (Math.random() * 6) - 3,
        rotation: (Math.random() * 4) - 2,
        scale: 1,
        zIndex: cardCount - index
      }));
      
      setCards(stackedCards);
      setAnimationState('complete');
      onAnimationComplete();
    }, duration - 100);
  };

  return (
    <div 
      className={`relative h-80 w-full md:h-96 overflow-hidden ${className}`}
      aria-label="Tarot card shuffling animation"
      role="img"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {cards.map((card) => (
          <div
            key={card.id}
            className="absolute w-36 h-60 transform-gpu transition-all duration-1000 ease-in-out"
            style={{
              transform: `translate(${card.x}px, ${card.y}px) rotate(${card.rotation}deg) scale(${card.scale})`,
              zIndex: card.zIndex,
              opacity: card.isVisible ? 1 : 0,
              willChange: 'transform, opacity'
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-purple-900 to-indigo-900 rounded-lg shadow-lg border border-purple-500/30">
              <div className="absolute inset-0 bg-card-texture opacity-20 mix-blend-overlay rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/images/card-back.svg" alt="Tarot card back" className="w-3/4 h-3/4 object-contain opacity-80" />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Animation state indicator (for accessibility) */}
      <div className="sr-only" aria-live="polite">
        {animationState === 'idle' && 'Cards are ready to be shuffled.'}
        {animationState === 'shuffling' && 'Cards are being shuffled.'}
        {animationState === 'complete' && 'Cards have been shuffled.'}
      </div>
    </div>
  );
};

export default ShuffleAnimation;
