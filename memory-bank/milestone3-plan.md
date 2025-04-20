# Milestone 3 Plan: Journaling Feature & Enhanced Dashboard

## Overview
Milestone 3 focuses on implementing the Journaling Feature and enhancing the User Dashboard. This feature will allow users to create journal entries linked to tarot readings, tag and categorize their entries, search through their journal, and see a dashboard with their recent activities.

## Feature Requirements

### Journal Entry Management
- **Create journal entries** with title, content, mood, and optional tags
- **Edit existing entries** with full revision capability
- **Delete entries** with confirmation
- **View entry details** with formatted content and metadata
- **Link entries to tarot readings** (optional relationship)
- **Rich text editing** for journal content with formatting options

### Tagging & Organization
- **Create and manage tags** for categorizing entries
- **Apply multiple tags** to each journal entry
- **Filter entries by tags** to find related content
- **Filter by date ranges** to see entries from specific time periods
- **Filter by reading connection** to see entries linked to specific readings
- **Search functionality** across title and content

### Dashboard Integration
- **Journal entries widget** showing most recent entries
- **Enhanced dashboard layout** displaying both readings and journals
- **Quick action buttons** for creating new entries or readings
- **Activity statistics** showing journaling patterns

## Database Schema

### journals Table
```sql
CREATE TABLE IF NOT EXISTS public.journals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  reading_id UUID REFERENCES public.readings,
  mood TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### journal_tags Table
```sql
CREATE TABLE IF NOT EXISTS public.journal_tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  user_id UUID REFERENCES auth.users NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(name, user_id)
);
```

### journal_tag_mappings Table
```sql
CREATE TABLE IF NOT EXISTS public.journal_tag_mappings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  journal_id UUID REFERENCES public.journals ON DELETE CASCADE,
  tag_id UUID REFERENCES public.journal_tags ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(journal_id, tag_id)
);
```

### Row-Level Security Policies
Similar to our readings tables, we'll implement RLS policies to ensure:
- Users can only see their own journal entries and tags
- Users can only modify their own data
- Proper cascading deletion for related records

## Component Architecture

### Feature Structure
```
/features/journaling/
├── JournalingPage.jsx         - Main container for journaling feature
├── JournalEntryForm.jsx       - Form for creating/editing entries
├── JournalEntryList.jsx       - List of journal entries with filtering
├── JournalEntryDetail.jsx     - Detailed view of a single entry
├── JournalTagInput.jsx        - Reusable tag input component
├── JournalFilters.jsx         - Search and filter controls
├── journalingSlice.js         - Redux state for journaling
├── SearchBar.jsx              - Search component for journal entries
├── MoodSelector.jsx           - Mood selection component
└── RichTextEditor.jsx         - WYSIWYG editor for journal content

/features/dashboard/
├── JournalEntriesWidget.jsx   - Dashboard widget for recent entries
├── Dashboard.jsx (update)     - Integrate journaling widgets
└── DashboardStats.jsx         - Activity statistics component
```

### User Flows

#### Creating a Journal Entry
1. User navigates to Journal section or clicks "Create Journal Entry" from dashboard
2. User fills out entry form with title, content, tags, and mood
3. System saves entry and redirects to entry detail view or journal list

#### Creating an Entry from a Reading
1. User completes a tarot reading
2. User clicks "Journal About This Reading" button
3. Journal form opens with reading pre-linked
4. User completes form and submits
5. System saves entry with connection to the reading

#### Browsing and Filtering Entries
1. User navigates to Journal section
2. System displays list of journal entries (newest first)
3. User can:
   - Search for entries by keyword
   - Filter by tags, date range, or reading connection
   - Sort entries by different criteria
   - Paginate through results

#### Dashboard Integration
1. User logs in and sees dashboard
2. Dashboard displays widgets for:
   - Recent tarot readings
   - Recent journal entries
   - Activity statistics
   - Quick action buttons for common tasks

## Implementation Phases

### Phase 1: Database Setup (Days 1-2)
- Create migration script for journal-related tables
- Implement Row-Level Security policies
- Test database operations with Supabase interface

### Phase 2: Service Layer (Days 3-5)
- Extend `supabaseService.js` with journal and tag management functions
- Create Redux slice (`journalingSlice.js`) with actions and reducers
- Implement async thunks for database operations
- Test service functions in isolation

### Phase 3: Journal Entry Core (Days 6-8)
- Implement `JournalEntryForm` component
- Create tag input component with autocomplete
- Integrate rich text editor for content
- Add mood selection functionality
- Connect to Redux and test form submission

### Phase 4: Journal Management (Days 9-11)
- Create `JournalEntryList` component with pagination
- Implement filters and search functionality
- Build individual entry view component
- Add edit and delete capabilities
- Test full CRUD operations

### Phase 5: Dashboard Integration (Days 12-14)
- Create `JournalEntriesWidget` for dashboard
- Update main dashboard layout
- Implement statistics and activity metrics
- Add quick action buttons
- Test dashboard integration

### Phase 6: Reading-Journal Connection (Days 15-17)
- Create flow to journal from a reading
- Display associated reading cards in journal view
- Add visual indicators for linked entries
- Test the connection between readings and journals

### Phase 7: Testing & Refinement (Days 18-20)
- End-to-end testing of all user flows
- Performance optimization
- Bug fixes and edge case handling
- UI/UX improvements based on testing results

## Technical Considerations

### State Management
The Redux state for journaling will follow this structure:
```javascript
{
  entries: [],          // List of journal entries
  currentEntry: null,   // Currently viewed/edited entry
  tags: [],             // Available tags
  status: 'idle',       // Request status (idle, loading, succeeded, failed)
  error: null,          // Error message if any
  filters: {            // Active filters
    search: '',
    tags: [],
    dateRange: null,
    readingId: null
  },
  pagination: {         // Pagination state
    page: 0,
    limit: 10,
    totalCount: 0
  }
}
```

### Rich Text Editing
For the rich text editor component, we'll need to:
- Evaluate options like Quill, Draft.js, or TipTap
- Implement a component that saves content in a format compatible with our database
- Ensure the saved content renders properly in the journal entry view
- Support basic formatting (bold, italic, lists, headings)

### Performance Considerations
- Implement pagination for journal entries list
- Use proper database indexing for search and filters
- Consider lazy loading for entry content
- Optimize rendering of rich text content

### Security Considerations
- Sanitize user input to prevent XSS attacks
- Implement proper RLS policies in Supabase
- Validate all input on both client and server side
- Ensure proper error handling for all operations

## Dependencies
- Rich text editor library (evaluation needed)
- Date/time utility for filtering by date range
- Potential tag input component if custom implementation is complex

## Success Criteria
- Users can create, edit, view, and delete journal entries
- Entries can be tagged and categorized
- Entries can be linked to tarot readings
- Users can search and filter their journal entries
- Dashboard provides an integrated view of readings and journal entries
- UI is responsive and accessible on all devices
- Performance meets targets (load times < 1s for key operations)

## Risks and Mitigations
- **Risk**: Rich text content storage and rendering consistency
  - **Mitigation**: Thorough testing across devices; select editor with good support

- **Risk**: Complex filtering performance
  - **Mitigation**: Proper database indexing; client-side caching where appropriate

- **Risk**: UX complexity with multiple filtering options
  - **Mitigation**: Usability testing; progressive disclosure of advanced filters

## Timeline
- **Week 1**: Database setup and service layer implementation
- **Week 2**: Core journal entry components and management features
- **Week 3**: Dashboard integration and reading-journal connection
- **Week 4**: Testing, refinement, and optimization

## Next Steps After Completion
1. Begin planning for Milestone 4 (Account Management)
2. Consider enhancements to the journaling feature:
   - Journal entry templates
   - Mood tracking and visualization
   - Journaling prompts based on tarot readings
   - Exporting journal entries
