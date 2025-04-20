import React from 'react';
import { ButtonColorful } from './ui/button-colorful';

function ButtonDemo() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Magic MCP Button Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Default Style</h2>
          <ButtonColorful />
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Custom Label</h2>
          <ButtonColorful label="Learn Tarot" />
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Custom Class</h2>
          <ButtonColorful 
            label="Start Reading" 
            className="w-48"
          />
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Click Event</h2>
          <ButtonColorful 
            label="Click Me" 
            onClick={() => alert('Button clicked!')}
          />
        </div>
      </div>
      
      <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
        <p>This component was generated using the 21st.dev Magic MCP server</p>
      </div>
    </div>
  );
}

export default ButtonDemo;
