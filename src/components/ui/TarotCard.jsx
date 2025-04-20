import { useState } from 'react';

const TarotCard = ({ 
  frontImage, 
  backImage = "/images/card-back.svg", 
  name, 
  isFlipped = false, 
  canFlip = true,
  className = "" 
}) => {
  const [flipped, setFlipped] = useState(isFlipped);
  
  const handleFlip = () => {
    if (canFlip) {
      setFlipped(!flipped);
    }
  };
  
  return (
    <div 
      className={`relative h-80 w-48 md:h-96 md:w-60 perspective-1000 preserve-3d cursor-pointer ${className}`}
      onClick={handleFlip}
      role="button"
      aria-label={`Tarot card: ${name}`}
    >
      <div 
        className={`absolute inset-0 w-full h-full transition-3d backface-hidden rounded-lg shadow-lg ${flipped ? 'rotate-y-180' : 'rotate-y-0'}`}
      >
        <img 
          src={frontImage} 
          alt={name} 
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <span className="font-display text-shadow text-lg bg-midnight/30 px-3 py-1 rounded">{name}</span>
        </div>
      </div>
      
      <div 
        className={`absolute inset-0 w-full h-full transition-3d backface-hidden rounded-lg shadow-lg rotate-y-180 ${flipped ? 'rotate-y-0' : 'rotate-y-180'}`}
      >
        <img 
          src={backImage} 
          alt="Card back" 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default TarotCard;
