import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * ReadingInterpretation Component
 * 
 * Displays the interpretation of a tarot reading, including:
 * - The user's original question
 * - The cards drawn and their positions
 * - The AI-generated interpretation
 * - Options to save or share the reading
 */
const ReadingInterpretation = ({
  question,
  spread,
  cards,
  interpretation,
  onSave = () => {},
  isSaving = false,
  className = ""
}) => {
  const [activeCard, setActiveCard] = useState(null);
  
  if (!interpretation) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-300">No interpretation available</p>
      </div>
    );
  }
  
  // Get the interpretation for a specific card
  const getCardInterpretation = (card) => {
    const cardInterpretation = interpretation.cards.find(c => c.name === card.name && c.position === card.position);
    return cardInterpretation?.interpretation || 'No interpretation available for this card.';
  };
  
  // Handle click on a card to show detailed interpretation
  const handleCardClick = (card) => {
    setActiveCard(activeCard?.name === card.name && activeCard?.position === card.position ? null : card);
  };
  
  // Render the cards in their spread layout
  const renderSpreadLayout = () => {
    if (!spread || !cards.length) return null;
    
    // Map card positions to actual cards
    const positionedCards = spread.positions.map((position, index) => {
      const card = cards.find(c => c.position === position.id) || null;
      return {
        position,
        card,
        index
      };
    });
    
    // Render layout based on spread type
    switch (spread.layout.type) {
      case 'linear':
        return (
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {positionedCards.map(({ position, card, index }) => (
              <div key={position.id} className="flex flex-col items-center">
                <div 
                  className={`cursor-pointer transform transition-transform ${
                    activeCard?.position === position.id ? 'scale-105' : ''
                  }`}
                  onClick={() => card && handleCardClick(card)}
                >
                  <div className="relative">
                    {card && (
                      <img 
                        src={card.img} 
                        alt={card.name}
                        className={`w-36 h-56 md:w-40 md:h-64 object-cover rounded-lg shadow-lg ${
                          card.orientation === 'reversed' ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                    <div className="absolute -bottom-3 left-0 right-0 flex justify-center">
                      <span className="bg-purple-900 text-white text-xs px-2 py-1 rounded-full">
                        {position.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'cross':
        return (
          <div className="grid grid-cols-3 gap-4 w-max mx-auto mb-8">
            <div className="col-start-2 flex justify-center">
              {renderCard(positionedCards[0])}
            </div>
            <div className="col-start-1 row-start-2 flex justify-center">
              {renderCard(positionedCards[1])}
            </div>
            <div className="col-start-2 row-start-2 flex justify-center">
              {renderCard(positionedCards[2])}
            </div>
            <div className="col-start-3 row-start-2 flex justify-center">
              {renderCard(positionedCards[3])}
            </div>
            <div className="col-start-2 row-start-3 flex justify-center">
              {renderCard(positionedCards[4])}
            </div>
          </div>
        );
      
      case 'celtic-cross':
        return (
          <div className="grid grid-cols-5 gap-2 w-max mx-auto mb-8">
            <div className="col-start-2 row-start-2 flex justify-center">
              {renderCard(positionedCards[0])}
            </div>
            <div className="col-start-2 row-start-2 flex justify-center items-center z-10 transform rotate-90">
              {renderCard(positionedCards[1])}
            </div>
            <div className="col-start-2 row-start-3 flex justify-center">
              {renderCard(positionedCards[2])}
            </div>
            <div className="col-start-1 row-start-2 flex justify-center">
              {renderCard(positionedCards[3])}
            </div>
            <div className="col-start-2 row-start-1 flex justify-center">
              {renderCard(positionedCards[4])}
            </div>
            <div className="col-start-3 row-start-2 flex justify-center">
              {renderCard(positionedCards[5])}
            </div>
            <div className="col-start-4 row-start-1 flex justify-center">
              {renderCard(positionedCards[6])}
            </div>
            <div className="col-start-4 row-start-2 flex justify-center">
              {renderCard(positionedCards[7])}
            </div>
            <div className="col-start-4 row-start-3 flex justify-center">
              {renderCard(positionedCards[8])}
            </div>
            <div className="col-start-4 row-start-4 flex justify-center">
              {renderCard(positionedCards[9])}
            </div>
          </div>
        );
      
      case 'pyramid':
        return (
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex justify-center">
              {renderCard(positionedCards[0])}
            </div>
            <div className="flex gap-4 justify-center">
              {renderCard(positionedCards[1])}
              {renderCard(positionedCards[2])}
            </div>
            <div className="flex gap-4 justify-center">
              {renderCard(positionedCards[3])}
              {renderCard(positionedCards[4])}
              {renderCard(positionedCards[5])}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {positionedCards.map(positionedCard => renderCard(positionedCard))}
          </div>
        );
    }
  };
  
  // Helper to render a single card in the spread
  const renderCard = ({ position, card, index }) => {
    if (!card) return (
      <div 
        key={`empty-${position.id}`}
        className="w-28 h-44 md:w-32 md:h-48 bg-midnight/50 rounded-lg flex items-center justify-center border border-purple-500/30"
      >
        <span className="text-gray-500">{position.name}</span>
      </div>
    );
    
    return (
      <div 
        key={`${card.name}-${position.id}`}
        className={`cursor-pointer transform transition-transform ${
          activeCard?.position === position.id ? 'scale-105' : ''
        }`}
        onClick={() => handleCardClick(card)}
      >
        <div className="relative">
          <img 
            src={card.img} 
            alt={card.name}
            className={`w-28 h-44 md:w-32 md:h-48 object-cover rounded-lg shadow-lg ${
              card.orientation === 'reversed' ? 'rotate-180' : ''
            }`}
          />
          <div className="absolute -bottom-2 left-0 right-0 flex justify-center">
            <span className="bg-purple-900 text-white text-xs px-2 py-1 rounded-full">
              {position.name}
            </span>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className={`reading-interpretation ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-display text-center mb-2">Your Tarot Reading</h2>
        
        {/* Question display */}
        <div className="text-center mb-8">
          <p className="text-gray-300 italic">"{question}"</p>
          <p className="text-sm text-gray-400 mt-1">{spread?.name} Spread • {new Date(interpretation.timestamp).toLocaleDateString()}</p>
        </div>
        
        {/* Card layout */}
        {renderSpreadLayout()}
        
        {/* Overall interpretation */}
        <div className="bg-midnight/30 border border-purple-500/30 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-display mb-4">Overall Interpretation</h3>
          <p className="text-gray-300 whitespace-pre-line">{interpretation.overall}</p>
        </div>
        
        {/* Active card interpretation */}
        {activeCard && (
          <div className="bg-midnight/30 border border-purple-500/30 rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3 flex justify-center">
                <div className="relative">
                  <img 
                    src={activeCard.img} 
                    alt={activeCard.name}
                    className={`w-48 h-72 object-cover rounded-lg shadow-lg ${
                      activeCard.orientation === 'reversed' ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-xl font-display mb-1">
                  {activeCard.name} 
                  <span className="text-sm font-normal text-gray-400 ml-2">
                    ({activeCard.orientation})
                  </span>
                </h3>
                
                <p className="text-sm text-purple-300 mb-4">
                  {cards.find(c => c.position === activeCard.position)?.positionName || 'Unknown position'} Position
                </p>
                
                <div className="mb-4">
                  <h4 className="text-md font-medium text-gray-200 mb-1">Card Meaning:</h4>
                  <p className="text-gray-300">
                    {activeCard.orientation === 'upright' 
                      ? activeCard.meanings.upright 
                      : activeCard.meanings.reversed}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-200 mb-1">In Your Reading:</h4>
                  <p className="text-gray-300">{getCardInterpretation(activeCard)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Advice */}
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-display mb-4">Guidance</h3>
          <p className="text-gray-300">{interpretation.advice}</p>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-6 py-3 bg-purple-700 text-white rounded-md hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Reading'}
          </button>
          
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-midnight hover:bg-midnight/70 text-white rounded-md transition-colors"
          >
            Print/Save PDF
          </button>
          
          <Link
            to="/journal/new"
            className="px-6 py-3 bg-midnight hover:bg-midnight/70 text-white rounded-md transition-colors"
          >
            Journal About This Reading
          </Link>
        </div>
        
        {/* Timestamp */}
        <div className="text-center text-sm text-gray-400 mb-8">
          <p>Reading ID: {interpretation.id}</p>
        </div>
      </div>
    </div>
  );
};

export default ReadingInterpretation;
