# TarotLyfe E2E Testing

This directory contains end-to-end tests for the TarotLyfe application using Cypress. These tests are part of Phase 7 (Testing & Refinement) of Milestone 3.

## Test Structure

The tests are organized into several categories:

1. **Authentication Tests** (`/e2e/auth/`)
   - Login/logout functionality
   - Form validation
   - User session management

2. **Journaling Core Tests** (`/e2e/journaling/core.cy.js`)
   - Creating, viewing, editing, and deleting journal entries
   - Rich text editor functionality
   - Form validation and submission

3. **Filtering and Search Tests** (`/e2e/journaling/filters.cy.js`)
   - Filtering by tags, moods, and date ranges
   - Search functionality
   - Sorting journal entries

4. **Reading-Journal Connection Tests** (`/e2e/journaling/connections.cy.js`)
   - Creating journal entries from tarot readings
   - Visual indicators for linked entries
   - Navigation between readings and journals

5. **Dashboard Integration Tests** (`/e2e/journaling/dashboard.cy.js`)
   - Dashboard layout and widgets
   - Activity statistics
   - Quick action buttons

## Test Data

Test data is defined in fixture files:

- `fixtures/users.json` - Test user credentials
- `fixtures/journals.json` - Sample journal entries
- `fixtures/readings.json` - Sample tarot readings

## Custom Commands

Custom Cypress commands have been defined in `support/commands.js`:

- `cy.login(email, password)` - Logs in a user directly via Supabase
- `cy.createJournal(journalData)` - Creates a journal entry directly in the database
- `cy.createReading(readingData)` - Creates a tarot reading directly in the database
- `cy.cleanupTestData(journalId)` - Cleans up test data after test completion

## Running Tests

The following npm scripts are available:

```bash
# Open Cypress interactive UI
npm run cypress:open

# Run all tests headlessly
npm run test

# Run specific test categories
npm run test:journaling
npm run test:auth
npm run test:dashboard
```

## Environment Setup

Tests expect the following environment variables to be set in Cypress:

- `SUPABASE_URL` - The URL of your Supabase project
- `SUPABASE_ANON_KEY` - The anonymous API key for your Supabase project

These are automatically loaded from your `.env` file via the Cypress configuration.

## Test Best Practices

1. Each test should be independent and not rely on the state from previous tests
2. Clean up any test data created during tests
3. Use the custom commands for common operations
4. Prefer data-testid attributes for selecting elements
5. Test both happy paths and error cases

## Troubleshooting

If tests are failing:

1. Check that the application is running on the expected port (default: 5173)
2. Verify that environment variables are properly configured
3. Ensure test user credentials match a valid user in the database
4. Check selectors to make sure they match the current UI implementation
