import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  createJournal, 
  updateJournal, 
  fetchJournal, 
  resetForm, 
  updateFormData, 
  selectFormData, 
  selectCurrentJournal,
  selectIsCreating,
  selectIsUpdating,
  selectIsFetching,
  selectError
} from './journalingSlice';
import JournalTagInput from './JournalTagInput';
import RichTextEditor from './RichTextEditor';
import MoodSelector from './MoodSelector';

const JournalEntryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // For editing existing entries
  
  const formData = useSelector(selectFormData);
  const currentJournal = useSelector(selectCurrentJournal);
  const isCreating = useSelector(selectIsCreating);
  const isUpdating = useSelector(selectIsUpdating);
  const isFetching = useSelector(selectIsFetching);
  const error = useSelector(selectError);
  
  const isEditing = !!id;
  const isLoading = isCreating || isUpdating || isFetching;
  
  // Fetch journal entry when editing
  useEffect(() => {
    if (isEditing) {
      dispatch(fetchJournal(id));
    } else {
      dispatch(resetForm());
    }
    
    // Clean up when leaving the form
    return () => {
      dispatch(resetForm());
    };
  }, [dispatch, id, isEditing]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };
  
  // Handle tag selection changes
  const handleTagsChange = (selectedTags) => {
    dispatch(updateFormData({ tags: selectedTags }));
  };
  
  // Handle reading selection changes
  const handleReadingChange = (e) => {
    const readingId = e.target.value || null;
    dispatch(updateFormData({ readingId }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title.trim() || !formData.content.trim()) {
      // You could implement more detailed validation and error display
      alert('Please enter both title and content');
      return;
    }
    
    let success = false;
    
    if (isEditing) {
      // Update existing journal entry
      const resultAction = await dispatch(updateJournal({
        id,
        journalData: {
          title: formData.title,
          content: formData.content,
          mood: formData.mood,
          readingId: formData.readingId,
          tags: formData.tags.map(tag => tag.name) // Send tag names for processing
        }
      }));
      
      success = updateJournal.fulfilled.match(resultAction);
    } else {
      // Create new journal entry
      const resultAction = await dispatch(createJournal({
        title: formData.title,
        content: formData.content,
        mood: formData.mood,
        readingId: formData.readingId,
        tags: formData.tags.map(tag => tag.name) // Send tag names for processing
      }));
      
      success = createJournal.fulfilled.match(resultAction);
    }
    
    if (success) {
      // Navigate back to journal entries list
      navigate('/journal');
    }
  };
  
  // Handle mood change
  const handleMoodChange = (mood) => {
    dispatch(updateFormData({ mood }));
  };
  
  // Mock reading options - in a real implementation, you would fetch the user's readings
  const readingOptions = [
    { value: '', label: 'No Associated Reading' },
    { value: 'mock-reading-1', label: 'Celtic Cross Reading (April 18, 2025)' },
    { value: 'mock-reading-2', label: 'Three Card Spread (April 15, 2025)' },
    // In a real implementation, these would be actual reading IDs and labels
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">
          {isEditing ? 'Edit Journal Entry' : 'New Journal Entry'}
        </h1>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Title field */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter a title for your journal entry"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              required
            />
          </div>
          
          {/* Mood selector */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mood
            </label>
            <MoodSelector 
              selectedMood={formData.mood}
              onChange={handleMoodChange}
            />
            <p className="mt-1 text-sm text-gray-500">
              Select a mood that represents how you feel
            </p>
          </div>
          
          {/* Tag input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <JournalTagInput 
              selectedTags={formData.tags}
              onChange={handleTagsChange}
            />
            <p className="mt-1 text-sm text-gray-500">
              Add tags to categorize your journal entry
            </p>
          </div>
          
          {/* Associated reading selector */}
          <div className="mb-4">
            <label htmlFor="readingId" className="block text-sm font-medium text-gray-700 mb-1">
              Associated Reading
            </label>
            <select
              id="readingId"
              name="readingId"
              value={formData.readingId || ''}
              onChange={handleReadingChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              {readingOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="mt-1 text-sm text-gray-500">
              Optionally link this journal to a tarot reading
            </p>
          </div>
          
          {/* Rich text editor for content */}
          <div className="mb-6 relative">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Journal Content
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(newContent) => dispatch(updateFormData({ content: newContent }))}
              placeholder="Write your journal entry here..."
            />
          </div>
          
          {/* Form actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/journal')}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition flex items-center"
              disabled={isLoading}
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isEditing ? 'Update Entry' : 'Save Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JournalEntryForm;
