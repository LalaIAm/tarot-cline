import { useState } from 'react';

/**
 * UserIntent Component
 * 
 * Allows users to express their question or focus for a tarot reading
 * Provides guidance on formulating effective questions
 */
const UserIntent = ({
  onSubmit = () => {},
  defaultValue = '',
  className = ""
}) => {
  const [question, setQuestion] = useState(defaultValue);
  const [focusArea, setFocusArea] = useState('general');
  const [showGuidance, setShowGuidance] = useState(false);
  
  // Common question templates for different focus areas
  const questionTemplates = {
    general: [
      "What energy surrounds me right now?",
      "What do I need to focus on at this time?",
      "What should I be aware of today?"
    ],
    career: [
      "What should I focus on in my career right now?",
      "How can I improve my work situation?",
      "What blocks am I facing in my professional growth?"
    ],
    relationships: [
      "How can I improve my relationship with [person]?",
      "What do I need to understand about my current relationship?",
      "What energy surrounds my love life right now?"
    ],
    personal: [
      "What do I need to understand about myself right now?",
      "How can I grow spiritually in this moment?",
      "What personal challenges am I not seeing clearly?"
    ],
    decisions: [
      "What should I consider regarding [specific decision]?",
      "What are the potential outcomes of this choice?",
      "What am I not seeing about this situation?"
    ]
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim().length > 0) {
      onSubmit({
        question: question.trim(),
        focusArea
      });
    }
  };

  // Use a template question
  const useTemplate = (template) => {
    setQuestion(template);
  };

  return (
    <div className={`user-intent ${className}`}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-display text-center mb-6">Focus Your Reading</h2>
        
        {/* Guidance toggle */}
        <div className="mb-6 text-center">
          <button
            type="button"
            onClick={() => setShowGuidance(!showGuidance)}
            className="text-purple-300 underline text-sm hover:text-purple-200"
          >
            {showGuidance ? 'Hide guidance' : 'Show guidance on formulating questions'}
          </button>
        </div>
        
        {/* Guidance panel */}
        {showGuidance && (
          <div className="bg-midnight/30 border border-purple-500/30 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-purple-200 mb-3">How to Formulate Effective Questions</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• <strong>Be open-ended</strong> - Ask "what" or "how" rather than yes/no questions</li>
              <li>• <strong>Focus on yourself</strong> - Ask about your own actions and energies, not others'</li>
              <li>• <strong>Stay present-focused</strong> - Consider what you can influence now</li>
              <li>• <strong>Be specific but not rigid</strong> - Provide context but remain open to unexpected insights</li>
              <li>• <strong>Avoid asking "when"</strong> - Timing questions are often less useful than action-oriented ones</li>
            </ul>
            <p className="mt-4 text-sm text-purple-200">You can also simply focus on an area of your life without a specific question.</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Focus area selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-200 mb-2">Choose a focus area:</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {Object.keys(questionTemplates).map((area) => (
                <button
                  key={area}
                  type="button"
                  className={`py-2 px-3 rounded-md text-sm transition-colors ${
                    focusArea === area 
                      ? 'bg-purple-700 text-white' 
                      : 'bg-midnight hover:bg-purple-900/30 text-gray-300'
                  }`}
                  onClick={() => setFocusArea(area)}
                >
                  {area.charAt(0).toUpperCase() + area.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Question templates */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-200 mb-2">Question suggestions:</label>
            <div className="grid grid-cols-1 gap-2">
              {questionTemplates[focusArea].map((template, index) => (
                <button
                  key={index}
                  type="button"
                  className="text-left py-2 px-3 bg-midnight/50 hover:bg-midnight text-gray-300 rounded-md text-sm transition-colors"
                  onClick={() => useTemplate(template)}
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
          
          {/* Question input */}
          <div className="mb-6">
            <label htmlFor="question" className="block text-sm font-medium text-gray-200 mb-2">
              Your question or focus:
            </label>
            <div className="relative">
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What would you like to explore in this reading?"
                className="w-full h-32 px-4 py-3 bg-midnight/70 text-white border border-purple-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <p className="mt-2 text-sm text-gray-400">
              {question.length}/200 characters
            </p>
          </div>
          
          {/* Submit button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={!question.trim().length}
              className="px-6 py-3 bg-purple-700 text-white rounded-md hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Begin Reading
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserIntent;
