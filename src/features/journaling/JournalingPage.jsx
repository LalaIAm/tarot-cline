import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchJournals, fetchTags, clearFilters, setPagination, updateFilters } from './journalingSlice';
import JournalEntryList from './JournalEntryList';
import JournalFilters from './JournalFilters';
import { Link } from 'react-router-dom';

const JournalingPage = () => {
  const dispatch = useDispatch();
  const { entries, totalEntries, isFetching, error } = useSelector(state => ({
    entries: state.journaling.entries,
    totalEntries: state.journaling.totalEntries,
    isFetching: state.journaling.isFetching,
    error: state.journaling.error
  }));

  const filters = useSelector(state => state.journaling.filters);
  const pagination = useSelector(state => state.journaling.pagination);

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Load initial data when component mounts
  useEffect(() => {
    // Fetch tags for filter options
    dispatch(fetchTags());
    
    // Fetch journal entries with initial pagination
    dispatch(fetchJournals({
      limit: pagination.limit,
      page: pagination.page,
      filters
    }));
  }, [dispatch, pagination.limit, pagination.page, filters]);

  // Handle pagination change
  const handlePageChange = (newPage) => {
    dispatch(setPagination({ page: newPage }));
  };

  // Toggle filter visibility
  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  // Clear all filters
  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Your Journal</h1>
        <div className="space-x-4">
          <button
            onClick={toggleFilters}
            className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary-dark transition"
          >
            {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
          </button>
          <Link
            to="/journal/new"
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
          >
            New Entry
          </Link>
        </div>
      </div>

      {isFilterVisible && (
        <div className="mb-6">
          <JournalFilters 
            onClearFilters={handleClearFilters}
          />
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      <JournalEntryList 
        entries={entries}
        isLoading={isFetching}
        currentPage={pagination.page}
        totalPages={Math.ceil(totalEntries / pagination.limit)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default JournalingPage;
