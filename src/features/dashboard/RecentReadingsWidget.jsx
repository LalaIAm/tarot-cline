import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserReadings } from '../../services/supabaseService';

/**
 * RecentReadingsWidget Component
 * 
 * Displays a list of the user's most recent tarot readings on the dashboard
 * with an option to view more or start a new reading
 */
const RecentReadingsWidget = () => {
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const limit = 3; // Show only 3 most recent readings
  
  useEffect(() => {
    const fetchReadings = async () => {
      setLoading(true);
      try {
        const { readings, error } = await getUserReadings(limit, 0);
        
        if (error) throw error;
        
        setReadings(readings);
        setError(null);
      } catch (err) {
        console.error('Error fetching readings:', err);
        setError('Failed to load readings');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReadings();
  }, []);
  
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
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

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <p className="text-sm text-red-500">{error}</p>
    );
  }
  
  if (readings.length === 0) {
    return (
      <div>
        <p className="italic text-gray-500">No readings yet. Start your first reading below.</p>
        <Link
          to="/tarot"
          className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Start New Reading
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="space-y-2">
        {readings.map(reading => (
          <div 
            key={reading.id}
            className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Link to={`/tarot/reading/${reading.id}`} className="block">
              <h4 className="font-medium text-gray-900 truncate">
                {reading.question || 'Untitled Reading'}
              </h4>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{formatDate(reading.created_at)}</span>
                <span>{getSpreadName(reading.spread_type)}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-4">
        <Link
          to="/tarot/history"
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          View All Readings
        </Link>
        <Link
          to="/tarot"
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          New Reading
        </Link>
      </div>
    </div>
  );
};

export default RecentReadingsWidget;
