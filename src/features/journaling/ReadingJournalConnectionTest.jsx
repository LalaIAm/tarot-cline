import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserReadings, getUserJournals } from '../../services/supabaseService';

/**
 * ReadingJournalConnectionTest Component
 * 
 * A utility component for testing the connection between readings and journals.
 * This shows linked readings and linked journals side-by-side for verification purposes.
 */
const ReadingJournalConnectionTest = () => {
  const [readings, setReadings] = useState([]);
  const [journals, setJournals] = useState([]);
  const [isLoadingReadings, setIsLoadingReadings] = useState(true);
  const [isLoadingJournals, setIsLoadingJournals] = useState(true);
  const [error, setError] = useState(null);
  
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch readings
        setIsLoadingReadings(true);
        const { readings: readingData, error: readingError } = await getUserReadings(20, 0);
        if (readingError) throw new Error(`Error fetching readings: ${readingError.message}`);
        setReadings(readingData || []);
        setIsLoadingReadings(false);
        
        // Fetch journals
        setIsLoadingJournals(true);
        const { journals: journalData, error: journalError } = await getUserJournals(50, 0, {});
        if (journalError) throw new Error(`Error fetching journals: ${journalError.message}`);
        setJournals(journalData || []);
        setIsLoadingJournals(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setIsLoadingReadings(false);
        setIsLoadingJournals(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  // Get linked journals for a reading
  const getLinkedJournals = (readingId) => {
    return journals.filter(journal => journal.reading_id === readingId);
  };
  
  // Get linked reading for a journal
  const getLinkedReading = (readingId) => {
    return readings.find(reading => reading.id === readingId);
  };
  
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  if (isLoadingReadings || isLoadingJournals) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Reading-Journal Connection Test</h1>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          <span className="ml-3 text-lg text-gray-600">Loading data...</span>
        </div>
      </div>
    );
  }
  
  // Filter to just get readings with linked journals
  const readingsWithJournals = readings.filter(reading => 
    journals.some(journal => journal.reading_id === reading.id)
  );
  
  // Filter to just get journals with linked readings
  const journalsWithReadings = journals.filter(journal => journal.reading_id);
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Reading-Journal Connection Test</h1>
      
      {/* Connection Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-purple-100 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold text-purple-800 mb-2">Readings</h2>
          <p className="text-purple-700">Total: {readings.length}</p>
          <p className="text-purple-700">With linked journals: {readingsWithJournals.length}</p>
        </div>
        
        <div className="bg-indigo-100 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold text-indigo-800 mb-2">Journals</h2>
          <p className="text-indigo-700">Total: {journals.length}</p>
          <p className="text-indigo-700">With linked readings: {journalsWithReadings.length}</p>
        </div>
        
        <div className="bg-blue-100 rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">Connection Rate</h2>
          <p className="text-blue-700">
            {readings.length > 0 ? 
              `${Math.round((readingsWithJournals.length / readings.length) * 100)}% of readings have journals` :
              'No readings available'
            }
          </p>
          <p className="text-blue-700">
            {journals.length > 0 ? 
              `${Math.round((journalsWithReadings.length / journals.length) * 100)}% of journals have readings` :
              'No journals available'
            }
          </p>
        </div>
      </div>
      
      {/* Readings with Linked Journals */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Readings with Linked Journals</h2>
        
        {readingsWithJournals.length === 0 ? (
          <p className="text-gray-500 italic py-4">No readings with linked journals found.</p>
        ) : (
          <div className="space-y-6">
            {readingsWithJournals.map(reading => {
              const linkedJournals = getLinkedJournals(reading.id);
              
              return (
                <div key={reading.id} className="bg-white rounded-lg shadow-md p-6 border border-purple-200">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Reading details */}
                    <div className="md:w-1/2">
                      <h3 className="text-xl font-semibold text-purple-900 mb-2">
                        Reading: {reading.spread_type}
                      </h3>
                      <p className="italic text-gray-700 mb-3">"{reading.question}"</p>
                      <p className="text-sm text-gray-500 mb-2">Created: {formatDate(reading.created_at)}</p>
                      
                      {/* Preview of cards */}
                      {reading.reading_data && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {reading.reading_data.slice(0, 3).map((card, idx) => (
                            <div key={idx} className="relative">
                              <img 
                                src={card.img} 
                                alt={card.name}
                                className={`w-12 h-18 object-cover rounded shadow ${
                                  card.orientation === 'reversed' ? 'rotate-180' : ''
                                }`}
                              />
                            </div>
                          ))}
                          {reading.reading_data.length > 3 && (
                            <span className="text-gray-500 self-center">+{reading.reading_data.length - 3} more</span>
                          )}
                        </div>
                      )}
                      
                      <Link 
                        to={`/tarot/reading/${reading.id}`} 
                        className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition"
                      >
                        View Reading
                      </Link>
                    </div>
                    
                    {/* Linked journals */}
                    <div className="md:w-1/2 md:border-l md:pl-6">
                      <h3 className="text-lg font-semibold text-indigo-900 mb-3">
                        Linked Journals ({linkedJournals.length})
                      </h3>
                      
                      <div className="space-y-4">
                        {linkedJournals.map(journal => (
                          <div key={journal.id} className="border border-indigo-100 rounded p-3 bg-indigo-50">
                            <div className="flex justify-between mb-1">
                              <h4 className="font-medium">{journal.title}</h4>
                              <span className="text-xs text-gray-500">{formatDate(journal.created_at)}</span>
                            </div>
                            
                            <Link 
                              to={`/journal/${journal.id}`} 
                              className="text-sm text-indigo-700 hover:underline"
                            >
                              View Journal Entry
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Create Test Links */}
      <div className="bg-gray-100 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Create Test Connections</h2>
        
        <div className="space-y-4">
          {readings.length > 0 ? (
            <div>
              <h3 className="font-medium mb-2">Create Journal from Reading:</h3>
              <div className="flex flex-wrap gap-2">
                {readings.slice(0, 3).map(reading => (
                  <Link
                    key={reading.id}
                    to={`/journal/new?readingId=${reading.id}`}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm"
                  >
                    Journal for "{reading.question.substring(0, 30)}..."
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No readings available to create journals from.</p>
          )}
        </div>
      </div>
      
      {/* Navigation Links */}
      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Link to="/journal" className="text-primary hover:underline">
          &larr; Back to Journal
        </Link>
        <Link to="/dashboard" className="text-primary hover:underline">
          Dashboard &rarr;
        </Link>
      </div>
    </div>
  );
};

export default ReadingJournalConnectionTest;
