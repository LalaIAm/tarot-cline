import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

// Helper functions for mood display
const getMoodEmoji = (mood) => {
  switch (mood) {
    case 'Happy': return '😄';
    case 'Calm': return '😌';
    case 'Anxious': return '😰';
    case 'Reflective': return '🤔';
    case 'Inspired': return '✨';
    case 'Melancholic': return '😔';
    case 'Confused': return '😕';
    case 'Grateful': return '🙏';
    default: return '';
  }
};

const getMoodStyles = (mood) => {
  switch (mood) {
    case 'Happy': return 'bg-yellow-100 text-yellow-800';
    case 'Calm': return 'bg-blue-100 text-blue-800';
    case 'Anxious': return 'bg-orange-100 text-orange-800';
    case 'Reflective': return 'bg-purple-100 text-purple-800';
    case 'Inspired': return 'bg-pink-100 text-pink-800';
    case 'Melancholic': return 'bg-indigo-100 text-indigo-800';
    case 'Confused': return 'bg-cyan-100 text-cyan-800';
    case 'Grateful': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const JournalEntryList = ({ 
  entries, 
  isLoading,
  currentPage, 
  totalPages,
  onPageChange
}) => {
  // Get search filters to highlight search terms in results
  const { filters, totalEntries } = useSelector(state => ({
    filters: state.journaling.filters,
    totalEntries: state.journaling.totalEntries
  }));
  
  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return !!(
      filters.search || 
      (filters.tags && filters.tags.length > 0) || 
      filters.mood || 
      (filters.dateRange && (filters.dateRange.startDate || filters.dateRange.endDate)) ||
      filters.readingId
    );
  }, [filters]);
  // Handle rendering based on loading state and data availability
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="bg-gray-100 rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold mb-4">No Journal Entries Found</h3>
        <p className="mb-6 text-gray-600">Start capturing your thoughts and reflections.</p>
        <Link
          to="/journal/new"
          className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition"
        >
          Create Your First Entry
        </Link>
      </div>
    );
  }

  // Function to truncate content for preview and strip HTML tags
  const truncateContent = (content, maxLength = 150) => {
    // Create a temporary div to parse HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    if (textContent.length <= maxLength) return textContent;
    return textContent.substring(0, maxLength) + '...';
  };

  // Function to format date
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div>
      {/* Filter summary - show when filters are active */}
      {hasActiveFilters && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-blue-800">Search Results</h3>
              <p className="text-blue-700 text-sm mt-1">
                Found {totalEntries} {totalEntries === 1 ? 'entry' : 'entries'}
                {filters.search && <span> containing "<strong>{filters.search}</strong>"</span>}
                {filters.tags && filters.tags.length > 0 && <span> with selected tags</span>}
                {filters.mood && <span> with mood <strong>{filters.mood}</strong></span>}
                {filters.dateRange && filters.dateRange.startDate && <span> from <strong>{filters.dateRange.startDate}</strong></span>}
                {filters.dateRange && filters.dateRange.endDate && <span> to <strong>{filters.dateRange.endDate}</strong></span>}
                {filters.readingId === 'has_reading' && <span> with an associated reading</span>}
                {filters.readingId === 'no_reading' && <span> without any associated reading</span>}
              </p>
            </div>
            <div className="text-sm">
              <span className="text-blue-700">
                Sorted by: <strong>
                  {filters.sortField === 'created_at' ? 'Date Created' : 
                   filters.sortField === 'updated_at' ? 'Date Updated' : 'Title'}
                </strong> ({filters.sortDirection ? 'Oldest First' : 'Newest First'})
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-test="journal-list">
        {entries.map(entry => (
          <Link 
            to={`/journal/${entry.id}`} 
            key={entry.id}
            className="block"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 h-full border border-gray-200 hover:border-primary">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-1">{entry.title}</h3>
                
                {entry.mood && (
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-semibold ${getMoodStyles(entry.mood)}`}>
                    {getMoodEmoji(entry.mood)} {entry.mood}
                  </span>
                )}
              </div>
              
              <div className="text-gray-600 mb-4 line-clamp-3">
                {truncateContent(entry.content)}
              </div>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="text-sm text-gray-500">
                    {formatDate(entry.created_at)}
                  </div>
                  
                  {/* Reading indicator */}
                  {entry.reading_id && (
                    <span className="inline-flex items-center rounded-full px-2 py-1 text-xs bg-purple-100 text-purple-800" title="Linked to Tarot Reading">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 3a1 1 0 00-1 1v2a1 1 0 002 0V4a1 1 0 00-1-1zm0 10a1 1 0 001 1h5a1 1 0 001-1v-5a1 1 0 00-1-1h-5a1 1 0 00-1 1v5zm-7-3a1 1 0 011-1h2a1 1 0 010 2H4a1 1 0 01-1-1zm8-6a1 1 0 100 2 1 1 0 000-2z" />
                      </svg>
                      Reading
                    </span>
                  )}
                </div>
                
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap justify-end gap-1">
                    {entry.tags.slice(0, 2).map(tag => (
                      <span 
                        key={tag.id} 
                        className="inline-block bg-primary-light rounded-full px-2 py-1 text-xs font-semibold text-primary-dark"
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
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => onPageChange(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage === 0 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              &laquo; Previous
            </button>
            
            {/* Page number indicator */}
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              Page {currentPage + 1} of {totalPages}
            </span>
            
            <button
              onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage >= totalPages - 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                currentPage >= totalPages - 1 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              Next &raquo;
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default JournalEntryList;
