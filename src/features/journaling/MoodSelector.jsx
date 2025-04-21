import React from 'react';

const moodOptions = [
  { value: 'Happy', label: 'Happy', emoji: '😄', color: 'bg-yellow-100 border-yellow-400' },
  { value: 'Calm', label: 'Calm', emoji: '😌', color: 'bg-blue-100 border-blue-400' },
  { value: 'Anxious', label: 'Anxious', emoji: '😰', color: 'bg-orange-100 border-orange-400' },
  { value: 'Reflective', label: 'Reflective', emoji: '🤔', color: 'bg-purple-100 border-purple-400' },
  { value: 'Inspired', label: 'Inspired', emoji: '✨', color: 'bg-pink-100 border-pink-400' },
  { value: 'Melancholic', label: 'Melancholic', emoji: '😔', color: 'bg-indigo-100 border-indigo-400' },
  { value: 'Confused', label: 'Confused', emoji: '😕', color: 'bg-cyan-100 border-cyan-400' },
  { value: 'Grateful', label: 'Grateful', emoji: '🙏', color: 'bg-green-100 border-green-400' },
];

const MoodSelector = ({ selectedMood, onChange }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {moodOptions.map((mood) => (
          <button
            key={mood.value}
            type="button"
            onClick={() => onChange(mood.value)}
            className={`
              py-2 px-3 rounded-lg border-2 transition-all
              ${
                selectedMood === mood.value
                  ? `${mood.color} border-opacity-100 shadow-md scale-105`
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }
            `}
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-sm font-medium">{mood.label}</span>
            </div>
          </button>
        ))}
      </div>
      
      {/* No mood option */}
      <div className="mt-3">
        <button
          type="button"
          onClick={() => onChange('')}
          className={`
            py-2 px-3 rounded-lg border-2 transition-all text-left w-full
            ${
              selectedMood === '' 
                ? 'bg-gray-200 border-gray-400 border-opacity-100' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }
          `}
        >
          <span className="text-sm font-medium">No mood selected</span>
        </button>
      </div>
    </div>
  );
};

export default MoodSelector;
