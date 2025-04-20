import { useState } from 'react';
import spreadTypes from './spreadTypes';

/**
 * SpreadSelector Component
 * 
 * Allows users to select from different tarot spread layouts
 * and displays information about the selected spread
 */
const SpreadSelector = ({
  onSpreadSelect = () => {},
  selectedSpreadId = null,
  className = ""
}) => {
  const [activeSpread, setActiveSpread] = useState(
    selectedSpreadId ? 
    spreadTypes.find(spread => spread.id === selectedSpreadId) : 
    spreadTypes[0]
  );

  // Handle spread selection
  const handleSpreadSelect = (spread) => {
    setActiveSpread(spread);
    onSpreadSelect(spread);
  };

  // Render a visual representation of the spread layout
  const renderSpreadLayout = (spread) => {
    switch (spread.layout.type) {
      case 'linear':
        return (
          <div className="flex justify-center items-center space-x-4">
            {Array.from({ length: spread.layout.cardCount }).map((_, index) => (
              <div 
                key={index}
                className="w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center"
              >
                <span className="text-xs text-white font-medium">{index + 1}</span>
              </div>
            ))}
          </div>
        );
      
      case 'cross':
        return (
          <div className="grid grid-cols-3 gap-2 w-max mx-auto">
            <div className="col-start-2 w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-medium">1</span>
            </div>
            <div className="col-start-1 row-start-2 w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-medium">2</span>
            </div>
            <div className="col-start-2 row-start-2 w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-medium">3</span>
            </div>
            <div className="col-start-3 row-start-2 w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-medium">4</span>
            </div>
            <div className="col-start-2 row-start-3 w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-medium">5</span>
            </div>
          </div>
        );
      
      case 'celtic-cross':
        return (
          <div className="grid grid-cols-5 gap-2 w-max mx-auto">
            <div className="col-start-2 row-start-2 w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-medium">1</span>
            </div>
            <div className="col-start-2 row-start-2 w-12 h-20 transform rotate-90 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center z-10">
              <span className="text-xs text-white font-medium">2</span>
            </div>
            <div className="col-start-2 row-start-3 w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-medium">3</span>
            </div>
            <div className="col-start-1 row-start-2 w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-medium">4</span>
            </div>
            <div className="col-start-2 row-start-1 w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-medium">5</span>
            </div>
            <div className="col-start-3 row-start-2 w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-medium">6</span>
            </div>
            <div className="col-start-4 row-start-1 w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-medium">7</span>
            </div>
            <div className="col-start-4 row-start-2 w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-medium">8</span>
            </div>
            <div className="col-start-4 row-start-3 w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-medium">9</span>
            </div>
            <div className="col-start-4 row-start-4 w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-medium">10</span>
            </div>
          </div>
        );
      
      case 'pyramid':
        return (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-medium">1</span>
            </div>
            <div className="flex space-x-2">
              <div className="w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
                <span className="text-xs text-white font-medium">2</span>
              </div>
              <div className="w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
                <span className="text-xs text-white font-medium">3</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
                <span className="text-xs text-white font-medium">4</span>
              </div>
              <div className="w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
                <span className="text-xs text-white font-medium">5</span>
              </div>
              <div className="w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
                <span className="text-xs text-white font-medium">6</span>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="flex justify-center items-center">
            <div className="w-12 h-20 bg-midnight border border-purple-300 rounded-lg flex items-center justify-center">
              <span className="text-xs text-white font-medium">?</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`spread-selector ${className}`}>
      <h2 className="text-2xl font-display text-center mb-6">Choose Your Spread</h2>
      
      {/* Spread options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {spreadTypes.map((spread) => (
          <div 
            key={spread.id}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              activeSpread.id === spread.id 
                ? 'bg-purple-900/30 border border-purple-500' 
                : 'bg-midnight/50 hover:bg-midnight/70 border border-gray-700'
            }`}
            onClick={() => handleSpreadSelect(spread)}
          >
            <h3 className="text-lg font-display text-purple-200">{spread.name}</h3>
            <p className="text-sm text-gray-300 mt-1">{spread.description}</p>
            <div className="mt-3 text-xs text-gray-400">
              {spread.layout.cardCount} {spread.layout.cardCount === 1 ? 'card' : 'cards'}
            </div>
          </div>
        ))}
      </div>

      {/* Selected spread details */}
      {activeSpread && (
        <div className="bg-midnight/30 border border-purple-900/50 rounded-lg p-6 max-w-4xl mx-auto">
          <h3 className="text-xl font-display text-center mb-6">{activeSpread.name} Spread</h3>
          
          {/* Visual layout */}
          <div className="mb-8">
            {renderSpreadLayout(activeSpread)}
          </div>
          
          {/* Card position descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSpread.positions.map((position, index) => (
              <div key={position.id} className="flex space-x-3">
                <div className="w-6 h-6 rounded-full bg-purple-900 text-white flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium">{index + 1}</span>
                </div>
                <div>
                  <h4 className="text-md font-medium text-purple-200">{position.name}</h4>
                  <p className="text-sm text-gray-300 mt-1">{position.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpreadSelector;
