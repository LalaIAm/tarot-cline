import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchJournals } from '../journaling/journalingSlice';
import { format } from 'date-fns';

const JournalEntriesWidget = () => {
  const dispatch = useDispatch();
  const { entries, isFetching, error } = useSelector(state => ({
    entries: state.journaling.entries,
    isFetching: state.journaling.isFetching,
    error: state.journaling.error
  }));
  
  // Fetch the most recent journal entries on component mount
  useEffect(() => {
    dispatch(fetchJournals({
      limit: 3, // Only fetch a few recent entries for the widget
      page: 0,
      filters: {} // No filters for the dashboard widget
    }));
  }, [dispatch]);
  
  // Helper function to format date
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };
  
  // Helper function to truncate content
  const truncateContent = (content, maxLength = 60) => {
    if (!content || content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };
  
  // Loading state
  if (isFetching) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Journal Entries</h2>
        <div className="flex justify-center items-center py-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Journal Entries</h2>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4" role="alert">
          <p>Error loading journal entries</p>
        </div>
        <Link to="/journal" className="text-primary hover:underline">View All Entries &rarr;</Link>
      </div>
    );
  }
  
  // Empty state
  if (!entries || entries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Recent Journal Entries</h2>
        <div className="text-center py-6 text-gray-500">
          <p className="mb-3">You haven't created any journal entries yet.</p>
          <Link 
            to="/journal/new" 
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
          >
            Create Your First Entry
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Journal Entries</h2>
        <Link to="/journal" className="text-primary hover:underline text-sm">
          View All &rarr;
        </Link>
      </div>
      
      <div className="space-y-3">
        {entries.map(entry => (
          <Link 
            key={entry.id} 
            to={`/journal/${entry.id}`}
            className="block p-3 border border-gray-200 rounded-md hover:border-primary hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-gray-800">{entry.title}</h3>
              <span className="text-xs text-gray-500">{formatDate(entry.created_at)}</span>
            </div>
            
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {truncateContent(entry.content)}
            </p>
            
            <div className="flex items-center justify-between">
              {entry.mood && (
                <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs text-gray-700">
                  {entry.mood}
                </span>
              )}
              
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-end">
                  {entry.tags.slice(0, 2).map(tag => (
                    <span 
                      key={tag.id} 
                      className="inline-block bg-primary-light rounded-full px-2 py-1 text-xs text-primary-dark"
                    >
                      {tag.name}
                    </span>
                  ))}
                  {entry.tags.length > 2 && (
                    <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                      +{entry.tags.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <Link 
          to="/journal/new" 
          className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
        >
          New Journal Entry
        </Link>
      </div>
    </div>
  );
};

export default JournalEntriesWidget;
