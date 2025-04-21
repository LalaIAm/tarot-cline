import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilters, fetchTags } from './journalingSlice';
import JournalTagInput from './JournalTagInput';

const JournalFilters = ({ onClearFilters }) => {
  const dispatch = useDispatch();
  const { filters, tags, isLoadingTags } = useSelector(state => ({
    filters: state.journaling.filters,
    tags: state.journaling.tags,
    isLoadingTags: state.journaling.isLoadingTags
  }));

  // Local state for form inputs
  const [searchInput, setSearchInput] = useState(filters.search || '');
  const [selectedTags, setSelectedTags] = useState(filters.tags || []);
  const [selectedMood, setSelectedMood] = useState(filters.mood || '');
  const [startDate, setStartDate] = useState(filters.dateRange?.startDate || '');
  const [endDate, setEndDate] = useState(filters.dateRange?.endDate || '');
  const [readingId, setReadingId] = useState(filters.readingId || '');
  const [sortField, setSortField] = useState(filters.sortField || 'created_at');
  const [sortDirection, setSortDirection] = useState(filters.sortDirection);

  // Load tags on component mount if they haven't been loaded yet
  useEffect(() => {
    if (tags.length === 0 && !isLoadingTags) {
      dispatch(fetchTags());
    }
  }, [dispatch, tags.length, isLoadingTags]);

  // Update selected tags when tags are loaded from the store
  useEffect(() => {
    if (filters.tags && tags.length > 0) {
      // Map tag IDs to tag objects for the tag input component
      const selectedTagObjects = filters.tags
        .map(tagId => tags.find(tag => tag.id === tagId))
        .filter(Boolean);
      
      setSelectedTags(selectedTagObjects);
    }
  }, [filters.tags, tags]);

  // Handle search input changes with debounce
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    
    // Debounce search input to avoid too many requests
    const timeoutId = setTimeout(() => {
      dispatch(updateFilters({ search: e.target.value }));
    }, 500);
    
    return () => clearTimeout(timeoutId);
  };

  // Handle mood selection
  const handleMoodChange = (e) => {
    const mood = e.target.value;
    setSelectedMood(mood);
    dispatch(updateFilters({ mood }));
  };

  // Handle date range selection
  const handleDateChange = (type, value) => {
    if (type === 'start') {
      setStartDate(value);
      dispatch(updateFilters({ 
        dateRange: { 
          ...filters.dateRange, 
          startDate: value || null 
        } 
      }));
    } else {
      setEndDate(value);
      dispatch(updateFilters({ 
        dateRange: { 
          ...filters.dateRange, 
          endDate: value || null 
        } 
      }));
    }
  };

  // Handle reading association filter
  const handleReadingChange = (e) => {
    const readingId = e.target.value || null;
    setReadingId(readingId);
    dispatch(updateFilters({ readingId }));
  };

  // Handle tag selection
  const handleTagsChange = (selectedTags) => {
    const tagIds = selectedTags.map(tag => tag.id);
    setSelectedTags(selectedTags);
    dispatch(updateFilters({ tags: tagIds }));
  };

  // Handle clear filters button
  const handleClearFilters = () => {
    // Reset local state
    setSearchInput('');
    setSelectedTags([]);
    setSelectedMood('');
    setStartDate('');
    setEndDate('');
    setReadingId('');
    
    // Clear filters in Redux
    onClearFilters();
  };

  // Available mood options
  const moodOptions = [
    { value: '', label: 'Any Mood' },
    { value: 'Happy', label: 'Happy' },
    { value: 'Calm', label: 'Calm' },
    { value: 'Anxious', label: 'Anxious' },
    { value: 'Reflective', label: 'Reflective' },
    { value: 'Inspired', label: 'Inspired' },
    { value: 'Melancholic', label: 'Melancholic' },
    { value: 'Confused', label: 'Confused' },
    { value: 'Grateful', label: 'Grateful' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Filter Journal Entries</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Search input */}
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            id="search"
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search journal entries..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Tags filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tags
          </label>
          <JournalTagInput 
            selectedTags={selectedTags}
            onChange={handleTagsChange}
          />
        </div>

        {/* Mood filter */}
        <div className="mb-4">
          <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-1">
            Mood
          </label>
          <select
            id="mood"
            value={selectedMood}
            onChange={handleMoodChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            {moodOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date range filter - Start date */}
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            From Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => handleDateChange('start', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Date range filter - End date */}
        <div className="mb-4">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            To Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            min={startDate}
            onChange={(e) => handleDateChange('end', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
        </div>

        {/* Filter by reading */}
        <div className="mb-4">
          <label htmlFor="readingId" className="block text-sm font-medium text-gray-700 mb-1">
            Associated Reading
          </label>
          <select
            id="readingId"
            value={readingId || ''}
            onChange={handleReadingChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">Any</option>
            <option value="has_reading">Has Reading</option>
            <option value="no_reading">No Reading</option>
            {/* Reading-specific options would be dynamically generated here in the future */}
          </select>
        </div>

        {/* Sort field */}
        <div className="mb-4">
          <label htmlFor="sortField" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sortField"
            value={sortField}
            onChange={(e) => {
              setSortField(e.target.value);
              dispatch(updateFilters({ sortField: e.target.value }));
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="created_at">Date Created</option>
            <option value="updated_at">Date Updated</option>
            <option value="title">Title</option>
          </select>
        </div>

        {/* Sort direction */}
        <div className="mb-4">
          <label htmlFor="sortDirection" className="block text-sm font-medium text-gray-700 mb-1">
            Sort Direction
          </label>
          <div className="flex items-center space-x-4 mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sortDirection"
                checked={!sortDirection}
                onChange={() => {
                  setSortDirection(false);
                  dispatch(updateFilters({ sortDirection: false }));
                }}
                className="form-radio h-4 w-4 text-primary"
              />
              <span className="ml-2 text-gray-700">Newest First</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="sortDirection"
                checked={sortDirection === true}
                onChange={() => {
                  setSortDirection(true);
                  dispatch(updateFilters({ sortDirection: true }));
                }}
                className="form-radio h-4 w-4 text-primary"
              />
              <span className="ml-2 text-gray-700">Oldest First</span>
            </label>
          </div>
        </div>
      </div>

      {/* Clear filters button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default JournalFilters;
