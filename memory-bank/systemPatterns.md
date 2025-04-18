# System Patterns: TarotLyfe

## Architecture Overview

TarotLyfe follows a modern web application architecture with the following key components:

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│   React Frontend │     │  Node.js Backend │     │    PostgreSQL    │
│   (Client-side)  │────▶│   (Server-side)  │────▶│    Database      │
└──────────────────┘     └──────────────────┘     └──────────────────┘
         │                        │                        
         │                        │                        
         ▼                        ▼                        
┌──────────────────┐     ┌──────────────────┐             
│     Clerk        │     │      AI API      │             
│  Authentication  │     │  (Interpretation) │             
└──────────────────┘     └──────────────────┘             
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

1. **RESTful API Design**
   - Resource-oriented endpoints
   - Standard HTTP methods (GET, POST, PUT, DELETE)
   - Consistent response formats

2. **Service Layer Pattern**
   - Business logic encapsulated in service modules
   - Clear separation from controllers/routes
   - Reusable business logic functions

3. **Repository Pattern**
   - Data access logic abstracted through repositories
   - Database interactions isolated from business logic
   - Facilitates testing and potential database changes

4. **Middleware Pattern**
   - Request processing through composable middleware
   - Authentication, logging, error handling as middleware
   - Request/response transformation

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
│   │   ├── SpreadSelector
│   │   ├── TarotDeck
│   │   └── ReadingInterpretation
│   ├── JournalingFeature
│   │   ├── JournalEntryForm
│   │   └── JournalEntryList
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
   - User credentials → Clerk Auth → JWT Token → Protected Routes
   - Token validation on protected API endpoints

2. **Tarot Reading Flow**
   - User input → API request → AI interpretation → Display results
   - Reading saved to database → Available for journaling

3. **Journaling Flow**
   - Journal entry creation → Validation → Database storage
   - Optionally linked to tarot reading → Bidirectional relationship

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
   - JWT token-based authentication
   - Token refresh strategy
   - Role-based access control

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
   - Clerk integration
   - Protected routes in React
   - JWT validation middleware

2. **Tarot Reading Engine**
   - Card selection and shuffling logic
   - API integration for interpretations
   - Reading persistence

3. **Journaling System**
   - Rich text editing
   - Tagging and categorization
   - Search indexing

4. **Dashboard Integration**
   - Data aggregation and presentation
   - Real-time updates
   - Performance optimization for large datasets

This system patterns document serves as a guide for maintaining consistency in architecture and design decisions throughout the development process. It should be updated as the system evolves and new patterns emerge.
