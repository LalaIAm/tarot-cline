import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchJournal, deleteJournalEntry, selectCurrentJournal, selectIsFetching, selectIsDeleting, selectError } from './journalingSlice';
import { format } from 'date-fns';
import { getReadingById } from '../../services/supabaseService';

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

// Component to display linked reading preview
const LinkedReadingPreview = ({ readingId }) => {
  const [reading, setReading] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchReading = async () => {
      try {
        const { reading, error } = await getReadingById(readingId);
        if (error) throw error;
        setReading(reading);
      } catch (err) {
        console.error('Error fetching reading:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (readingId) {
      fetchReading();
    }
  }, [readingId]);
  
  if (isLoading) {
    return (
      <div className="bg-purple-100 border border-purple-300 rounded-lg p-4 mt-6 animate-pulse">
        <div className="h-4 bg-purple-200 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-purple-200 rounded w-1/2 mb-2"></div>
        <div className="flex gap-2 mt-3">
          <div className="h-16 w-10 bg-purple-200 rounded"></div>
          <div className="h-16 w-10 bg-purple-200 rounded"></div>
          <div className="h-16 w-10 bg-purple-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-300 rounded-lg p-4 mt-6">
        <p className="text-red-700">Error loading reading: {error}</p>
      </div>
    );
  }
  
  if (!reading) {
    return (
      <div className="bg-purple-100 border border-purple-300 rounded-lg p-4 mt-6">
        <p className="text-purple-700">Reading not found or has been deleted.</p>
      </div>
    );
  }
  
  // Determine how many cards to display in the preview (up to 3)
  const previewCards = reading.reading_data?.slice(0, 3) || [];
  
  return (
    <div className="bg-purple-100 border border-purple-300 rounded-lg p-4 mt-6">
      <h3 className="text-lg font-semibold text-purple-900 mb-2">Linked Reading: {reading.spread_type}</h3>
      <p className="text-purple-800 italic mb-3">"{reading.question}"</p>
      
      {/* Preview of card images */}
      <div className="flex flex-wrap gap-3 mb-3">
        {previewCards.map((card, index) => (
          <div key={`${card.name}-${index}`} className="relative">
            <img 
              src={card.img} 
              alt={card.name}
              className={`w-16 h-24 object-cover rounded-md shadow ${
                card.orientation === 'reversed' ? 'rotate-180' : ''
              }`}
            />
          </div>
        ))}
        {reading.reading_data?.length > 3 && (
          <div className="flex items-center justify-center w-16 h-24 bg-purple-200 rounded-md">
            <span className="text-purple-800 font-medium">+{reading.reading_data.length - 3}</span>
          </div>
        )}
      </div>
      
      <Link 
        to={`/tarot/reading/${reading.id}`} 
        className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition"
      >
        View Full Reading
      </Link>
    </div>
  );
};

const JournalEntryDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const journal = useSelector(selectCurrentJournal);
  const isFetching = useSelector(selectIsFetching);
  const isDeleting = useSelector(selectIsDeleting);
  const error = useSelector(selectError);
  
  const isLoading = isFetching || isDeleting;
  
  // Fetch journal entry on component mount
  useEffect(() => {
    if (id) {
      dispatch(fetchJournal(id));
    }
  }, [dispatch, id]);
  
  // Handle journal deletion
  const handleDelete = async () => {
    // Show confirmation dialog
    const confirmed = window.confirm('Are you sure you want to delete this journal entry? This action cannot be undone.');
    
    if (confirmed) {
      const resultAction = await dispatch(deleteJournalEntry(id));
      
      if (deleteJournalEntry.fulfilled.match(resultAction)) {
        // Navigate back to journal entries list
        navigate('/journal');
      }
    }
  };
  
  // Format date helper function
  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy h:mm a');
    } catch (error) {
      return dateString;
    }
  };
  
  // Loading state
  if (isLoading || !journal) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
          </div>
          <div className="mt-4">
            <Link to="/journal" className="text-primary hover:underline">
              &larr; Back to Journal
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Journal header */}
        <div className="mb-6 border-b border-gray-200 pb-4">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-800">{journal.title}</h1>
            
            {/* Action buttons */}
            <div className="flex space-x-2">
              <Link
                to={`/journal/edit/${id}`}
                className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-dark transition text-sm"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition text-sm"
                disabled={isDeleting}
              >
                Delete
              </button>
            </div>
          </div>
          
          {/* Metadata */}
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
            <div>
              <span className="font-semibold">Created:</span> {formatDate(journal.created_at)}
            </div>
            
            {journal.updated_at && journal.updated_at !== journal.created_at && (
              <div>
                <span className="font-semibold">Updated:</span> {formatDate(journal.updated_at)}
              </div>
            )}
            
            {journal.mood && (
              <div className="flex items-center">
                <span className="font-semibold mr-1">Mood:</span> 
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm ${getMoodStyles(journal.mood)}`}>
                  {getMoodEmoji(journal.mood)} {journal.mood}
                </span>
              </div>
            )}
            
            {journal.reading_id && (
              <div>
                <span className="font-semibold">Linked Reading:</span>{' '}
                <Link to={`/tarot/reading/${journal.reading_id}`} className="text-primary hover:underline">
                  View Reading
                </Link>
              </div>
            )}
          </div>
          
          {/* Tags */}
          {journal.tags && journal.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {journal.tags.map(tag => (
                <span
                  key={tag.id}
                  className="inline-block bg-primary-light text-primary-dark rounded-full px-3 py-1 text-sm font-semibold"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Journal content - renders HTML safely */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: journal.content }} 
        />
        
        {/* Display linked reading preview if available */}
        {journal.reading_id && (
          <LinkedReadingPreview readingId={journal.reading_id} />
        )}
        
        {/* Back link */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <Link to="/journal" className="text-primary hover:underline">
            &larr; Back to Journal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JournalEntryDetail;
