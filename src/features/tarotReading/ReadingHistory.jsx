import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserReadings, deleteReading } from '../../services/supabaseService';

/**
 * ReadingHistory Component
 * 
 * Displays a list of the user's past tarot readings with options
 * to view details, filter, and delete readings
 */
const ReadingHistory = () => {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'week', 'month'
  
  const limit = 10; // Readings per page
  
  // Load readings
  useEffect(() => {
    const fetchReadings = async () => {
      setLoading(true);
      try {
        const { readings, count, error } = await getUserReadings(limit, page);
        
        if (error) throw error;
        
        setReadings(readings);
        setTotalCount(count);
        setError(null);
      } catch (err) {
        console.error('Error fetching readings:', err);
        setError('Failed to load readings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReadings();
  }, [page]);
  
  // Apply date filters
  const filterReadings = () => {
    if (filter === 'all') return readings;
    
    const now = new Date();
    const filterDate = new Date();
    
    if (filter === 'week') {
      filterDate.setDate(now.getDate() - 7);
    } else if (filter === 'month') {
      filterDate.setMonth(now.getMonth() - 1);
    }
    
    return readings.filter(reading => {
      const readingDate = new Date(reading.created_at);
      return readingDate >= filterDate;
    });
  };
  
  // Handle reading deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this reading? This action cannot be undone.')) {
      setIsDeleting(true);
      try {
        const { error } = await deleteReading(id);
        
        if (error) throw error;
        
        // Update state to remove the deleted reading
        setReadings(readings.filter(reading => reading.id !== id));
        setTotalCount(prev => prev - 1);
      } catch (err) {
        console.error('Error deleting reading:', err);
        setError('Failed to delete reading. Please try again later.');
      } finally {
        setIsDeleting(false);
      }
    }
  };
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get spread name from spread type
  const getSpreadName = (spreadType) => {
    const spreadMap = {
      'single-card': 'Single Card',
      'three-card': 'Past, Present, Future',
      'celtic-cross': 'Celtic Cross',
      'relationship': 'Relationship Spread',
      'career-path': 'Career Path'
    };
    
    return spreadMap[spreadType] || spreadType;
  };
  
  // Handle pagination
  const handleNextPage = () => {
    if ((page + 1) * limit < totalCount) {
      setPage(page + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };
  
  // Filter readings based on selected filter
  const filteredReadings = filterReadings();
  
  return (
    <div className="reading-history max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-display text-center mb-6">Your Reading History</h2>
      
      {/* Filters */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'all' 
                ? 'bg-purple-700 text-white' 
                : 'bg-midnight/50 text-gray-300 hover:bg-midnight/70'
            }`}
          >
            All Time
          </button>
          <button
            onClick={() => setFilter('week')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'week' 
                ? 'bg-purple-700 text-white' 
                : 'bg-midnight/50 text-gray-300 hover:bg-midnight/70'
            }`}
          >
            Past Week
          </button>
          <button
            onClick={() => setFilter('month')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'month' 
                ? 'bg-purple-700 text-white' 
                : 'bg-midnight/50 text-gray-300 hover:bg-midnight/70'
            }`}
          >
            Past Month
          </button>
        </div>
        
        <Link
          to="/tarot"
          className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors"
        >
          New Reading
        </Link>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 text-red-200 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {/* Loading state */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your reading history...</p>
        </div>
      ) : (
        <>
          {/* No readings */}
          {readings.length === 0 ? (
            <div className="text-center py-12 bg-midnight/30 rounded-lg">
              <p className="text-lg text-gray-300 mb-4">You haven't completed any readings yet.</p>
              <Link
                to="/tarot"
                className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors"
              >
                Start Your First Reading
              </Link>
            </div>
          ) : (
            <>
              {/* Readings list */}
              <div className="space-y-4">
                {filteredReadings.map(reading => (
                  <div
                    key={reading.id}
                    className="bg-midnight/30 border border-purple-500/30 rounded-lg p-4 hover:bg-midnight/40 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row justify-between md:items-center">
                      <div className="mb-3 md:mb-0">
                        <h3 className="text-lg font-medium text-purple-200">
                          {reading.question || 'Untitled Reading'}
                        </h3>
                        <div className="flex flex-wrap text-sm text-gray-400 mt-1">
                          <span className="mr-4">{formatDate(reading.created_at)}</span>
                          <span>{getSpreadName(reading.spread_type)}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link
                          to={`/tarot/reading/${reading.id}`}
                          className="px-3 py-1 bg-purple-900/50 text-white rounded hover:bg-purple-900/70 transition-colors text-sm"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleDelete(reading.id)}
                          disabled={isDeleting}
                          className="px-3 py-1 bg-red-900/50 text-white rounded hover:bg-red-900/70 transition-colors text-sm disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    {/* Preview of first few cards */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {Array.isArray(reading.reading_data) && reading.reading_data.slice(0, 3).map((card, idx) => (
                        <div key={`${reading.id}-card-${idx}`} className="text-xs bg-midnight rounded-md px-2 py-1 text-gray-300">
                          {card.name}
                          <span className="text-gray-500 ml-1">
                            ({card.orientation})
                          </span>
                        </div>
                      ))}
                      
                      {Array.isArray(reading.reading_data) && reading.reading_data.length > 3 && (
                        <div className="text-xs bg-midnight rounded-md px-2 py-1 text-gray-300">
                          +{reading.reading_data.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              {totalCount > limit && (
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={handlePrevPage}
                    disabled={page === 0}
                    className="px-4 py-2 bg-midnight/50 text-white rounded hover:bg-midnight/70 transition-colors disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  <span className="text-sm text-gray-400">
                    Page {page + 1} of {Math.ceil(totalCount / limit)}
                  </span>
                  
                  <button
                    onClick={handleNextPage}
                    disabled={(page + 1) * limit >= totalCount}
                    className="px-4 py-2 bg-midnight/50 text-white rounded hover:bg-midnight/70 transition-colors disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ReadingHistory;
