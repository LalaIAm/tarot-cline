import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TarotCard from './TarotCard';

// Particle component for the mystical star/sparkle effect
const Particle = ({ delay = 0 }) => {
  return (
    <motion.div
      className="absolute rounded-full bg-ethereal z-10"
      initial={{ 
        opacity: 0,
        scale: 0,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50
      }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0],
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100
      }}
      transition={{
        duration: 2,
        delay: delay,
        ease: "easeOut"
      }}
      style={{
        width: Math.random() * 4 + 1 + "px",
        height: Math.random() * 4 + 1 + "px",
        boxShadow: "0 0 8px 1px rgba(255, 217, 218, 0.7)"
      }}
    />
  );
};

// Particles container with random animation
const ParticleContainer = ({ isHovering }) => {
  const particleCount = 15;
  
  return (
    <AnimatePresence>
      {isHovering && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(particleCount)].map((_, i) => (
            <Particle key={i} delay={i * 0.1} />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

const TarotCardCarousel = ({ cards = [], className = "" }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Default tarot cards if none provided
  const defaultCards = [
    {
      name: "The Sun",
      frontImage: "/images/sun-card.svg",
      backImage: "/images/card-back.svg",
      meaning: "Joy, success, celebration, positivity"
    },
    {
      name: "The Moon",
      frontImage: "/images/moon-card.svg",
      backImage: "/images/card-back.svg",
      meaning: "Intuition, unconscious, illusion, dreams"
    },
    {
      name: "The Star",
      frontImage: "/images/sun-card.svg", // Placeholder until we have star card
      backImage: "/images/card-back.svg",
      meaning: "Hope, faith, purpose, renewal, spirituality"
    }
  ];
  
  const displayCards = cards.length > 0 ? cards : defaultCards;
  
  // Auto-rotate the carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % displayCards.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [displayCards.length]);
  
  return (
    <div 
      className={`relative py-16 ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 bg-midnight/50 backdrop-blur-sm rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-mystical-pattern opacity-10"></div>
        
        <div 
          className="absolute top-0 left-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/4 rounded-full"
          style={{ 
            background: "radial-gradient(circle, rgba(150,86,161,0.3) 0%, rgba(108,75,147,0.1) 50%, rgba(17,16,99,0) 70%)",
            filter: "blur(10px)"
          }}
        />
        
        <div 
          className="absolute bottom-0 left-1/2 w-60 h-60 -translate-x-1/2 translate-y-1/4 rounded-full"
          style={{ 
            background: "radial-gradient(circle, rgba(244,158,76,0.2) 0%, rgba(108,75,147,0.1) 50%, rgba(17,16,99,0) 70%)",
            filter: "blur(15px)"
          }}
        />
      </div>
      
      <ParticleContainer isHovering={isHovering} />
      
      <div className="relative z-10 text-center mb-8">
        <motion.h2 
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-ethereal"
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            textShadow: isHovering 
              ? "0 0 10px rgba(255,217,218,0.7), 0 0 20px rgba(255,217,218,0.5)" 
              : "0 0 5px rgba(255,217,218,0.3)"
          }}
          transition={{ duration: 0.5 }}
        >
          Discover Your Destiny
        </motion.h2>
      </div>
      
      <div className="relative flex justify-center items-center perspective-1000 h-[350px] md:h-[450px]">
        <div className="flex justify-center items-center gap-4 md:gap-6 lg:gap-8">
          {displayCards.map((card, index) => {
            // Calculate position - centered, left or right
            const isActive = index === activeIndex;
            const isLeft = (index === activeIndex - 1) || 
                           (activeIndex === 0 && index === displayCards.length - 1);
            const isRight = (index === activeIndex + 1) || 
                            (activeIndex === displayCards.length - 1 && index === 0);
            
            // Skip cards that aren't part of the visible 3
            if (!isActive && !isLeft && !isRight) return null;
            
            return (
              <motion.div
                key={`tarot-card-${index}`}
                className="relative"
                initial={{ 
                  opacity: 0,
                  x: isLeft ? -100 : isRight ? 100 : 0,
                  rotateY: isActive ? 0 : 15 * (isLeft ? -1 : 1),
                  scale: isActive ? 1 : 0.8,
                  zIndex: isActive ? 10 : 5,
                }}
                animate={{ 
                  opacity: isActive ? 1 : 0.7,
                  x: isLeft ? -80 : isRight ? 80 : 0,
                  rotateY: isActive ? 0 : 15 * (isLeft ? -1 : 1),
                  scale: isActive ? 1 : 0.85,
                  zIndex: isActive ? 10 : 5,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  opacity: { duration: 0.5 }
                }}
                onClick={() => setActiveIndex(index)}
              >
                <TarotCard
                  frontImage={card.frontImage}
                  backImage={card.backImage}
                  name={card.name}
                  canFlip={isActive}
                  className={`cursor-pointer transition-all duration-500 shadow-2xl 
                             ${isActive ? 'animate-glow' : ''}`}
                />
                
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-4 w-full"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <p className="text-ethereal font-serif text-sm md:text-base text-center mt-4 px-2 py-1 bg-midnight/50 backdrop-blur-sm rounded-md">
                      {card.meaning}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
      
      {/* Card navigation dots */}
      <div className="flex justify-center mt-16">
        {displayCards.map((_, index) => (
          <button
            key={`nav-dot-${index}`}
            className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 
                      ${activeIndex === index 
                        ? 'bg-ember w-4 shadow-glow shadow-ember/50' 
                        : 'bg-ethereal/30'}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`View card ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TarotCardCarousel;
