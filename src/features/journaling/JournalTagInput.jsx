import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTags, addTag } from './journalingSlice';

const JournalTagInput = ({ selectedTags = [], onChange }) => {
  const dispatch = useDispatch();
  const { tags, isLoadingTags } = useSelector(state => ({
    tags: state.journaling.tags,
    isLoadingTags: state.journaling.isLoadingTags
  }));

  const [inputValue, setInputValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredTags, setFilteredTags] = useState([]);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Load tags when component mounts if they're not already loaded
  useEffect(() => {
    if (tags.length === 0 && !isLoadingTags) {
      dispatch(fetchTags());
    }
  }, [dispatch, tags.length, isLoadingTags]);

  // Filter tags based on input
  useEffect(() => {
    if (inputValue.trim() === '') {
      setFilteredTags(tags.filter(tag => 
        !selectedTags.some(selectedTag => selectedTag.id === tag.id)
      ));
    } else {
      const filtered = tags.filter(tag => 
        tag.name.toLowerCase().includes(inputValue.toLowerCase()) && 
        !selectedTags.some(selectedTag => selectedTag.id === tag.id)
      );
      setFilteredTags(filtered);
    }
  }, [inputValue, tags, selectedTags]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle input focus
  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsDropdownOpen(true);
  };

  // Handle selecting a tag from the dropdown
  const handleSelectTag = (tag) => {
    const updatedTags = [...selectedTags, tag];
    onChange(updatedTags);
    setInputValue('');
    setIsDropdownOpen(false);
  };

  // Handle creating a new tag
  const handleCreateTag = async () => {
    if (inputValue.trim() === '') return;
    
    // Check if tag already exists
    const existingTag = tags.find(
      tag => tag.name.toLowerCase() === inputValue.trim().toLowerCase()
    );
    
    if (existingTag) {
      // Tag exists, just select it if not already selected
      if (!selectedTags.some(tag => tag.id === existingTag.id)) {
        handleSelectTag(existingTag);
      }
      return;
    }
    
    // Create new tag
    const resultAction = await dispatch(addTag(inputValue.trim()));
    if (addTag.fulfilled.match(resultAction)) {
      // Add newly created tag to selected tags
      const newTag = resultAction.payload;
      handleSelectTag(newTag);
    }
  };

  // Handle key press in input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCreateTag();
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tagId) => {
    const updatedTags = selectedTags.filter(tag => tag.id !== tagId);
    onChange(updatedTags);
  };

  return (
    <div className="relative">
      {/* Selected tags display */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedTags.map(tag => (
          <div 
            key={tag.id} 
            className="bg-primary-light text-primary-dark rounded-full px-3 py-1 text-sm font-semibold flex items-center"
          >
            {tag.name}
            <button
              type="button"
              className="ml-2 text-primary-dark hover:text-primary focus:outline-none"
              onClick={() => handleRemoveTag(tag.id)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {/* Tag input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyPress}
          placeholder="Add or search tags..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
        
        {inputValue && (
          <button
            type="button"
            onClick={handleCreateTag}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-primary text-white rounded-md text-xs"
          >
            Add Tag
          </button>
        )}
      </div>

      {/* Dropdown for tag selection */}
      {isDropdownOpen && (
        <div 
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full max-h-56 overflow-auto bg-white rounded-md shadow-lg border border-gray-200"
        >
          {isLoadingTags ? (
            <div className="p-2 text-center text-gray-500">Loading tags...</div>
          ) : filteredTags.length > 0 ? (
            <ul className="py-1">
              {filteredTags.map(tag => (
                <li 
                  key={tag.id}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelectTag(tag)}
                >
                  {tag.name}
                </li>
              ))}
            </ul>
          ) : inputValue ? (
            <div className="p-2 text-center text-gray-500">
              No matching tags. Press Enter to create "{inputValue}"
            </div>
          ) : (
            <div className="p-2 text-center text-gray-500">No more tags available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default JournalTagInput;
