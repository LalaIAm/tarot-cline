# System Patterns: TarotLyfe

## Architecture Overview

TarotLyfe follows a modern web application architecture with the following key components:

```
┌──────────────────┐                      ┌──────────────────┐
│   React Frontend │                      │    PostgreSQL    │
│   (Client-side)  │─────────────────────▶│    Database      │
└──────────────────┘                      └──────────────────┘
         │                                          ▲
         │                                          │
         ▼                                          │
┌──────────────────┐                      ┌──────────────────┐
│    Supabase      │                      │      AI API      │
│  Authentication  │─────────────────────▶│  (Interpretation) │
│   & Database     │                      └──────────────────┘
└──────────────────┘
```

## Key Design Patterns

### Frontend Patterns

1. **Component-Based Architecture**
   - Organized by feature domains with shared components
   - Hierarchical component structure with clear parent-child relationships
   - Components follow single-responsibility principle

2. **Flux/Redux Pattern**
   - Unidirectional data flow using Redux Toolkit
   - Global state management for application-wide state
   - Local state management with React Hooks for component-specific state

3. **Container/Presentational Pattern**
   - Container components manage data and state
   - Presentational components focus on UI rendering
   - Clear separation of concerns

4. **Custom Hook Pattern**
   - Reusable logic extracted into custom hooks
   - Shared functionality across components
   - Examples: `useTarotReading`, `useJournalEntries`, `useAuth`

### Backend Patterns

1. **Supabase Service Pattern**
   - Direct database access using Supabase client
   - Row-Level Security policies for data protection
   - Reusable service functions for database operations
   - Consistent error handling across service functions

2. **Service Layer Pattern**
   - Business logic encapsulated in service modules
   - Clear separation from UI components
   - Reusable business logic functions

3. **Repository-like Pattern with Supabase**
   - Data access logic abstracted through service functions
   - Database interactions isolated from React components
   - Consistent query patterns with filtering and pagination

4. **Security Pattern with Row-Level Security**
   - Database-level access control using RLS policies
   - User-based data filtering at the database level
   - JWT authentication integrated with data access

## Data Models

### Tarot Reading Data Model

```
readings
├── id (UUID, PK)
├── user_id (UUID, FK to auth.users)
├── question (TEXT)
├── spread_type (TEXT)
├── reading_data (JSONB)
├── interpretation (JSONB)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

reading_cards
├── id (UUID, PK)
├── reading_id (UUID, FK to readings)
├── card_name (TEXT)
├── position (TEXT)
├── orientation (TEXT)
├── position_order (INTEGER)
└── created_at (TIMESTAMP)
```

### Journaling Data Model

```
journals
├── id (UUID, PK)
├── user_id (UUID, FK to auth.users)
├── title (TEXT)
├── content (TEXT)
├── reading_id (UUID, FK to readings, nullable)
├── mood (TEXT, nullable)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

journal_tags
├── id (UUID, PK)
├── name (TEXT)
├── user_id (UUID, FK to auth.users)
└── created_at (TIMESTAMP)

journal_tag_mappings
├── id (UUID, PK)
├── journal_id (UUID, FK to journals)
├── tag_id (UUID, FK to journal_tags)
└── created_at (TIMESTAMP)
```

## Component Relationships

### Frontend Component Hierarchy

```
App
├── AuthenticationLayer
│   ├── LandingPage
│   └── AuthenticationPage
├── MainApplication (authenticated)
│   ├── Navigation
│   ├── Dashboard
│   │   ├── RecentReadingsWidget
│   │   └── JournalEntriesWidget
│   ├── TarotReadingFeature
│   │   ├── UserIntent
│   │   ├── SpreadSelector
│   │   ├── TarotDeck
│   │   ├── ShuffleAnimation
│   │   ├── ReadingInterpretation
│   │   └── ReadingHistory
│   ├── JournalingFeature
│   │   ├── JournalEntryForm
│   │   ├── JournalTagInput
│   │   ├── JournalEntryList
│   │   ├── JournalEntryDetail
│   │   ├── JournalFilters
│   │   └── SearchBar
│   └── AccountManagement
│       ├── ProfileEditor
│       └── PreferencesManager
└── SharedComponents
    ├── Button
    ├── Card
    ├── Modal
    └── Form Elements
```

### Data Flow Patterns

1. **User Authentication Flow**
   - User credentials → Supabase Auth → JWT Token → Protected Routes
   - Token validation via Supabase client for protected data access

2. **Tarot Reading Flow**
   - User intent capture → Spread selection → Card shuffling and drawing
   - Card data → AI interpretation service → Interpretation display
   - Reading saved to Supabase → Available in history and for journaling

3. **Journaling Flow**
   - Journal entry creation with title, content, mood, tags
   - Validation → Supabase storage → Tag creation and mapping
   - Optionally linked to tarot reading via reading_id
   - Bidirectional relationship with readings for cross-referencing

4. **Dashboard Data Flow**
   - Initial load → Fetch recent readings and entries
   - Periodic updates or pull-to-refresh
   - Optional real-time updates for multi-device sync

## State Management Strategy

1. **Global State** (Redux)
   - User authentication state
   - Current tarot reading
   - Application theme/preferences
   - Notifications

2. **Local State** (React Hooks)
   - Form inputs
   - UI interactions (modals, dropdowns)
   - Component-specific display states

3. **Server State** (API Requests)
   - User profile data
   - Historical readings and journal entries
   - Search results

## Error Handling Patterns

1. **Frontend Error Handling**
   - Global error boundary for React component tree
   - Try/catch blocks for async operations
   - Error state management and user feedback
   - Early returns pattern in components

2. **Backend Error Handling**
   - Structured error responses
   - Centralized error middleware
   - Error logging and monitoring
   - API error codes and messages

## Security Patterns

1. **Authentication Security**
   - Supabase JWT token-based authentication
   - Session management with token refresh
   - Protected routes in React Router

2. **Data Security**
   - Input validation and sanitization
   - Prepared statements for database queries
   - HTTPS for all communications
   - Encryption for sensitive data

## Performance Optimization Patterns

1. **Frontend Performance**
   - Code splitting and lazy loading
   - Memoization of expensive computations
   - Virtualized lists for large data sets
   - Asset optimization (images, bundles)

2. **Backend Performance**
   - Database query optimization
   - API response caching
   - Efficient data structures
   - Connection pooling

## Critical Implementation Paths

1. **Authentication System**
   - Supabase authentication integration
   - Protected routes in React Router
   - Auth state management with Redux

2. **Tarot Reading Engine**
   - Card selection and shuffling logic
   - API integration for interpretations
   - Reading persistence

3. **Journaling System**
   - Rich text editing for journal content
   - Tagging system with many-to-many relationships
   - Filtering by tags, mood, date, and reading connection
   - Full-text search across journal entries
   - Database schema with appropriate relationships and indices

4. **Dashboard Integration**
   - Data aggregation and presentation
   - Real-time updates
   - Performance optimization for large datasets

This system patterns document serves as a guide for maintaining consistency in architecture and design decisions throughout the development process. It should be updated as the system evolves and new patterns emerge.
