import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchJournal, deleteJournalEntry, selectCurrentJournal, selectIsFetching, selectIsDeleting, selectError } from './journalingSlice';
import { format } from 'date-fns';

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
                <Link to={`/readings/${journal.reading_id}`} className="text-primary hover:underline">
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
