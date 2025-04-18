# Pre.dev Master Plan for TarotLyfe

## Overview
TarotLyfe is an AI-powered tarot reading web application with integrated journaling features. The app is built using React for the frontend, Node.js (or Python as needed) for backend services, PostgreSQL for data storage, and integrates Clerk for authentication, and TailwindCSS for styling.

This Pre.dev plan outlines a detailed development roadmap with a hierarchical breakdown of tasks converted from user stories, with clear dependency chains, API contracts, database schemas, and testing requirements.

---

## 1. Development Roadmap

### Milestone 1: Landing Page, Authentication, and Core Navigation

**User Stories:**
- Engaging Landing Page with a clear CTA to sign up/login
- Intuitive navigation with authentication flows (signup, login, account recovery)

**Tasks:**
1. **Design Landing Page UI:**
   - Create wireframes and mockups (using Figma) aligning with themes of empowerment & introspection.
   - Ensure landing page has prominent daily tarot reading call-to-action.

2. **Implement Landing Page:**
   - File: `src/pages/LandingPage.tsx`
   - Integrate responsive design (mobile-first) with early returns for error handling in React.
   - Use Motion animations.

3. **Authentication Module:**
   - Setup Clerk or custom authentication using Node.js.
   - Create endpoints: `signup`, `login`, `password reset`.
   - File: `src/pages/AuthenticationPage.tsx`
   - API Contract: Accept email, password, additional profile data, and return secure session tokens.

4. **Integrate Navigation:**
   - Link LandingPage to Authentication; upon login, route to Dashboard.
   - File: `src/routes/index.tsx` using NextJS routing.

### Milestone 2: Tarot Reading Module and AI Interpretation Engine

**User Stories:**
- Shuffle Tarot Deck with animations
- Select Card Spread (single, three-card, Celtic Cross)
- Initiate tarot reading to trigger AI API
- Display detailed AI interpretations with timeline view

**Tasks:**
1. **Tarot Shuffle Implementation:**
   - Create `TarotReadingPage.tsx` with a 'Shuffle' button; use early returns and TailwindCSS.
   - Implement card shuffling animation in a separate component.

2. **Spread Selection Component:**
   - Build a reusable component `SpreadSelector.tsx` for displaying multiple spread options.
   - Ensure state is managed via React hooks (useState, useEffect).

3. **API Integration for Reading:**
   - Define API contract:
     - Endpoint: `/api/tarot/read` (POST)
     - Request: { userInput, selectedSpread }
     - Response: { cardPositions, interpretationText, keyThemes }
   - Implement backend integration in Node.js with proper error handling.

4. **Display AI Interpretations:**
   - Develop a UI component to show AI reading summary.
   - Allow future extension: timeline view and side-by-side comparisons of readings.

### Milestone 3: Journaling Feature and User Dashboard

**User Stories:**
- Create, edit, delete journal entries linked to tarot readings
- Tag, categorize, and search journal entries
- Dashboard overview displaying recent readings and journal entries

**Tasks:**
1. **Journaling Entry Form:**
   - File: `src/pages/JournalingPage.tsx`
   - Build form using React and TailwindCSS for creating entries with title, textual content, and multimedia attachments.
   - Integrate validation and error messages following accessibility practices.

2. **Backend API Endpoints:**
   - Endpoints: `/api/journal/create`, `/api/journal/update`, `/api/journal/delete`, `/api/journal/search`
   - Implement using Node.js with PostgreSQL; schema: define fields such as title, content, tags, attachment URLs, and timestamp.

3. **Tagging and Search:**
   - Build a tagging component in React that allows multiple tags (auto-suggestions from common tags)
   - Implement search functionality on the dashboard to filter journal entries.

4. **User Dashboard:**
   - File: `src/pages/DashboardPage.tsx`
   - Integrate sections for recent tarot readings, journal entries, and suggested spreads.
   - Quick action buttons: 'Start a New Tarot Reading' and 'Create Journal Entry'.
   - Real-time updates: implement a WebSocket client (or polling mechanism) to update dashboard without full page refresh.

### Milestone 4: Account Management and Security Enhancements

**User Stories:**
- Edit profile information, change password, and configure account recovery
- Customize account settings (notification preferences, privacy options)

**Tasks:**
1. **Edit Profile Page:**
   - File: `src/pages/AccountManagementPage.tsx`
   - Allow users to update name, email, and upload a profile picture.
   - Ensure API endpoints exist: `/api/account/updateProfile`.

2. **Change Password Module:**
   - Design dedicated Change Password Page.
   - API endpoint: `/api/account/changePassword` with proper validations, using encryption & secure error reporting.

3. **Account Recovery Setup:**
   - Implement functionality for setting/updating recovery email/phone.
   - API endpoints: `/api/account/updateRecovery` and microservice for sending verification codes.

4. **Customize Account Settings:**
   - Allow users to change notification preferences and privacy controls.
   - Integrate with backend endpoints and validate with real-time feedback.

### Milestone 5: Testing, Launch Preparation, and Post-Launch Support

**Tasks:**
1. **Testing:**
   - Write unit tests (Jest) for critical components and utility functions.
   - Integration tests: API endpoints and inter-component data flows.
   - E2E Tests: Simulate core user flows using Cypress or Selenium.
   - Performance benchmarks and load testing.

2. **CI/CD Pipeline and Environment Setup:**
   - Configure a build pipeline with stages: linting, testing, staging deployment.
   - Environment variables placeholder in an `.env` file (e.g., API keys, database URLs).
   - Document deployment process, rollback criteria, and monitoring hooks.

3. **Post-Launch Support:**
   - Establish a maintenance schedule and support plan for iterative improvements and bug fixes.
   - Define logging, error monitoring, and alerting systems.

---

## 2. Technical Implementation Specifications

### Component Interfaces and API Contracts

- **TarotReadingPage.tsx:**
  - Props: None
  - State: { deck: Card[], isShuffling: boolean, selectedSpread: SpreadType, readingResult: ReadingResult | null }
  - Functions:
    - const handleShuffle = () => { /* initiate shuffle */ };
    - const handleStartReading = () => { /* call API */ };

- **SpreadSelector.tsx:**
  - Props: { spreads: SpreadType[], onSelect: (spread: SpreadType) => void }

- **JournalingPage.tsx:**
  - Props: None
  - State: { journalForm: { title: string, content: string, tags: string[], attachments: File[] } }
  - Functions: handleSubmitNewEntry, handleAddTag, handleRemoveTag

- **DashboardPage.tsx:**
  - Integrates data from multiple endpoints via REST API and WebSocket.
  - Utilizes inter-component communication via context or Redux for state propagation.

### Database Schema Definitions

- **User:** id, email, passwordHash, name, profilePictureURL, createdAt, updatedAt
- **JournalEntry:** id, userId, title, content, tags (array), attachments (array of URLs), tarotReadingId, timestamp
- **TarotReading:** id, userId, readingResult (JSON structure), createdAt
- **AccountRecovery:** id, userId, recoveryContact (email/phone), verified (boolean), token, tokenExpiration
- **Session:** id, userId, token, expiresAt

### API Contracts (Examples)

- POST `/api/tarot/read`
  - Request: { userInput: string, spread: string }
  - Response: { cardPositions: CardPosition[], interpretation: string, keyThemes: string[] }

- POST `/api/journal/create`
  - Request: { title: string, content: string, tags: string[], attachments: string[], tarotReadingId: string }
  - Response: { success: boolean, journalEntry: JournalEntry }

### Error Handling Protocol

- Categorize errors: client errors (400 series), server errors (500 series)
- Log errors with contextual data in a structured JSON format (timestamp, error message, stack trace, userId if applicable).
- Implement retry policies with exponential backoff for network calls.
- Use early returns to manage error cases.

### CI/CD Requirements

- Implement build pipeline (e.g., GitHub Actions, Jenkins): Stages include linting, unit testing, integration testing, and deployment to staging.
- Environment configuration: `.env.example` with placeholders (e.g., NEXT_PUBLIC_API_URL, DATABASE_URL).
- Database migration strategy using tools like Knex or TypeORM migrations.
- Deployment verification tests in staging before production rollout, with rollback procedures documented.

### Performance Optimization

- Caching strategy: Use in-memory caching (e.g., Redis) for frequently accessed data (e.g., dashboard queries).
- Code splitting: Implement dynamic imports and lazy loading for non-critical components.
- Optimize API queries: Index database on fields used in search and filtering (e.g., tags, createdAt timestamps).
- Asset optimization: Compress images and bundle JavaScript with Webpack/Babel configuration.

---

## 3. UI Component Architecture

- **Dashboard Hierarchy:**
  - Root: DashboardPage
    - Child: TarotReadingSummaryComponent
    - Child: JournalEntryListComponent
    - Child: SuggestedSpreadsComponent
  - Use React Context/Redux for state sharing among these components.
  - Ensure each component is implemented with TailwindCSS for responsiveness.
  - Accessibility: All buttons and input elements must include ARIA attributes and keyboard event handling.

- **Form Validation:**
  - Use libraries (e.g., Formik, Yup) or custom hooks for form state management and validation.
  - Provide immediate feedback on invalid input with accessible error messages.

---

## 4. Error Handling and Logging Patterns

- Consistent logging format utilizing a JSON structure including: { timestamp, level, message, module, errorStack }
- Use a centralized logging service (e.g., Winston in Node.js) for backend logging.
- Implement global error boundaries in React for catching exceptions.
- API error responses: { error: true, message: string, details?: any }.

---

## 5. Testing Strategies

- **Unit Tests:**
  - Critical functions (e.g., shuffle algorithm, API call wrappers) must achieve at least 90% coverage.
  - Use Jest for testing React components and utility functions.
- **Integration Tests:**
  - Test API endpoints with Supertest and database operations with mocks.
  - Ensure handler functions for authentication and journaling have complete integration tests.
- **End-to-End Tests:**
  - Use Cypress or Selenium to simulate user flows across authentication, tarot reading, journaling, and account management.
  - Define acceptance thresholds (e.g., load times under 2 seconds, error rates < 0.5%).
- **Security Test Cases:**
  - Validate input sanitization, token expiry, and brute-force protection.
  - Run automated vulnerability scans for common security pitfalls.

---

## 6. CI/CD and Deployment

- **Build Pipeline:**
  - Stages: Code linting, unit testing, integration testing, e2e testing, build, deployment to staging, production release.
- **Environment Management:**
  - Maintain an `.env.example` for placeholders.
- **Database Migrations:**
  - Use a migration tool for schema updates; version migrations to ensure backward compatibility.
- **Rollback Procedures:**
  - Define criteria for rollback (e.g., failed health checks, critical bugs) and document procedures for reverting deployments.

---

## 7. Post-Launch Support

- Schedule periodic maintenance: bug fixes, performance optimizations, feature improvements.
- Implement monitoring with alerts for error thresholds and response time metrics.
- Define support channels and response SLAs.

---

This detailed plan ensures a methodical, collaborative, and secure development process for TarotLyfe, following the specified tech stack and best practices for modern web applications.
