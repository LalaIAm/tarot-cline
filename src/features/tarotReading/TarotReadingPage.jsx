import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  setActiveStep, 
  setQuestion, 
  setSelectedSpread, 
  setShuffling,
  addCard,
  resetReading,
  generateInterpretation,
  saveReading,
  selectActiveStep,
  selectQuestion,
  selectFocusArea,
  selectSelectedSpread,
  selectSelectedCards,
  selectInterpretation,
  selectIsShuffling,
  selectIsGeneratingInterpretation,
  selectIsSaving,
  selectError
} from './tarotReadingSlice';

import UserIntent from './UserIntent';
import SpreadSelector from './SpreadSelector';
import ShuffleAnimation from './ShuffleAnimation';
import TarotDeck from './TarotDeck';
import ReadingInterpretation from './ReadingInterpretation';

/**
 * TarotReadingPage Component
 * 
 * Main container for the tarot reading experience
 * Manages the flow between different stages of a reading:
 * 1. User Intent - Capturing the question or focus
 * 2. Spread Selection - Choosing a card layout
 * 3. Shuffle - Shuffling the deck
 * 4. Card Drawing - Selecting cards for the reading
 * 5. Interpretation - Displaying the reading results
 */
const TarotReadingPage = () => {
  const dispatch = useDispatch();
  
  // Redux state
  const activeStep = useSelector(selectActiveStep);
  const question = useSelector(selectQuestion);
  const focusArea = useSelector(selectFocusArea);
  const selectedSpread = useSelector(selectSelectedSpread);
  const selectedCards = useSelector(selectSelectedCards);
  const interpretation = useSelector(selectInterpretation);
  const isShuffling = useSelector(selectIsShuffling);
  const isGeneratingInterpretation = useSelector(selectIsGeneratingInterpretation);
  const isSaving = useSelector(selectIsSaving);
  const error = useSelector(selectError);
  
  // Generate interpretation when all cards are selected
  useEffect(() => {
    if (
      activeStep === 'interpretation' && 
      selectedCards.length > 0 && 
      selectedCards.length === selectedSpread?.layout.cardCount && 
      !interpretation &&
      !isGeneratingInterpretation
    ) {
      dispatch(generateInterpretation({
        question,
        spread: selectedSpread,
        cards: selectedCards
      }));
    }
  }, [
    activeStep, 
    selectedCards, 
    selectedSpread, 
    interpretation, 
    isGeneratingInterpretation, 
    question,
    dispatch
  ]);
  
  // Handle question submission
  const handleQuestionSubmit = (data) => {
    dispatch(setQuestion(data));
  };
  
  // Handle spread selection
  const handleSpreadSelect = (spread) => {
    dispatch(setSelectedSpread(spread));
  };
  
  // Handle shuffle state
  const handleShuffleStart = () => {
    dispatch(setShuffling(true));
  };
  
  const handleShuffleComplete = () => {
    dispatch(setShuffling(false));
  };
  
  // Handle card selection
  const handleCardSelect = (card) => {
    dispatch(addCard(card));
  };
  
  // Handle reading save
  const handleSaveReading = () => {
    if (interpretation) {
      dispatch(saveReading({
        question,
        focusArea,
        spread: selectedSpread,
        cards: selectedCards,
        interpretation
      }));
    }
  };
  
  // Start a new reading
  const handleNewReading = () => {
    dispatch(resetReading());
  };
  
  // Go back to previous step
  const handleBack = () => {
    const steps = ['intent', 'spread', 'shuffle', 'draw', 'interpretation'];
    const currentIndex = steps.indexOf(activeStep);
    
    if (currentIndex > 0) {
      dispatch(setActiveStep(steps[currentIndex - 1]));
    }
  };
  
  // Render the current step of the reading flow
  const renderStep = () => {
    switch (activeStep) {
      case 'intent':
        return (
          <UserIntent
            onSubmit={handleQuestionSubmit}
            defaultValue={question}
          />
        );
        
      case 'spread':
        return (
          <SpreadSelector
            onSpreadSelect={handleSpreadSelect}
            selectedSpreadId={selectedSpread?.id}
          />
        );
        
      case 'shuffle':
        return (
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-display text-center mb-6">Shuffle the Cards</h2>
            <p className="text-center text-gray-300 mb-8">
              Focus on your question as the cards are shuffled. When you're ready, click the button below.
            </p>
            
            <ShuffleAnimation
              isShuffling={isShuffling}
              onAnimationComplete={handleShuffleComplete}
              duration={3000}
              cardCount={12}
              className="mb-10"
            />
            
            <div className="flex justify-center">
              <button
                onClick={handleShuffleStart}
                disabled={isShuffling}
                className="px-6 py-3 bg-purple-700 text-white rounded-md hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isShuffling ? 'Shuffling...' : 'Shuffle Cards'}
              </button>
            </div>
          </div>
        );
        
      case 'draw':
        return (
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-display text-center mb-6">Draw Your Cards</h2>
            <p className="text-center text-gray-300 mb-4">
              Select {selectedSpread?.layout.cardCount || 'your'} cards for the reading.
            </p>
            
            <div className="mb-4 text-center text-sm text-gray-400">
              <span>{selectedCards.length} of {selectedSpread?.layout.cardCount} cards selected</span>
            </div>
            
            <TarotDeck
              onCardSelect={handleCardSelect}
              showAll={true}
              className="mb-10"
            />
          </div>
        );
        
      case 'interpretation':
        return (
          <div>
            {isGeneratingInterpretation ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-300">Interpreting your reading...</p>
              </div>
            ) : (
              <ReadingInterpretation
                question={question}
                spread={selectedSpread}
                cards={selectedCards}
                interpretation={interpretation}
                onSave={handleSaveReading}
                isSaving={isSaving}
              />
            )}
          </div>
        );
        
      default:
        return (
          <div className="text-center py-20">
            <p className="text-red-500">Unknown step: {activeStep}</p>
            <button
              onClick={handleNewReading}
              className="mt-4 px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-600 transition-colors"
            >
              Start New Reading
            </button>
          </div>
        );
    }
  };
  
  return (
    <div className="tarot-reading-page py-8 min-h-screen">
      {/* Progress indicator */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={handleBack}
            disabled={activeStep === 'intent' || isGeneratingInterpretation}
            className="text-sm text-purple-300 hover:text-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Back
          </button>
          
          <button
            onClick={handleNewReading}
            disabled={activeStep === 'intent' && !question}
            className="text-sm text-purple-300 hover:text-purple-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Over
          </button>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <div className="h-2 bg-midnight flex-grow rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-700 to-purple-500 transition-all duration-500"
              style={{ 
                width: (() => {
                  const steps = ['intent', 'spread', 'shuffle', 'draw', 'interpretation'];
                  const currentIndex = steps.indexOf(activeStep);
                  return `${(currentIndex / (steps.length - 1)) * 100}%`;
                })()
              }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="mb-16">
        {renderStep()}
      </div>
      
      {/* Error display */}
      {error && (
        <div className="max-w-2xl mx-auto px-4 mb-8">
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 text-red-200">
            <h3 className="font-medium mb-2">Error</h3>
            <p>{error}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TarotReadingPage;
