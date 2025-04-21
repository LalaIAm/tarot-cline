/// <reference types="cypress" />

describe('Journal Filtering and Search', () => {
  // Test user credentials from fixtures
  let user;
  // Sample journal data from fixtures
  let journals;
  // Test journals created for this test suite
  const testJournals = [];

  beforeEach(() => {
    // Load test data from fixtures
    cy.fixture('users.json').then((userData) => {
      user = userData.testUser;
    });

    cy.fixture('journals.json').then((data) => {
      journals = data.filteredJournals;

      // Visit the app and log in
      cy.visit('/');
      cy.login(user.email, user.password);

      // Create test journals for filtering tests if they don't exist yet
      if (testJournals.length === 0) {
        // Create multiple journal entries with different tags, moods, and content
        for (let i = 0; i < journals.length; i++) {
          cy.createJournal({
            title: journals[i].title,
            content: journals[i].content,
            mood: journals[i].mood,
            user_id: null, // will be filled by the custom command
            created_at: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString() // Different dates
          }).then((journal) => {
            testJournals.push(journal);

            // Create tags for journal
            journals[i].tags.forEach((tagName) => {
              cy.wrap(null).then(() => {
                // Add tags to the journal
                cy.request({
                  method: 'POST',
                  url: '/api/journal-tags',
                  body: { journalId: journal.id, tagName },
                  failOnStatusCode: false // Don't fail if tag already exists
                });
              });
            });
          });
        }
      }

      // Navigate to the journaling page
      cy.visit('/journaling');

      // Ensure the page has loaded
      cy.contains('h1', 'Journal');
    });
  });

  // Clean up test data after all tests
  after(() => {
    // Clean up created journals
    testJournals.forEach(journal => {
      cy.cleanupTestData(journal.id);
    });
  });

  it('should filter journal entries by tag', () => {
    // Open the filter panel
    cy.getByData('filter-button').click();

    // Select a tag to filter by
    cy.getByData('tag-filter').within(() => {
      cy.contains('work').click();
    });

    // Apply filters
    cy.getByData('apply-filters').click();

    // Verify only journals with the "work" tag are shown
    cy.getByData('journal-list').within(() => {
      cy.contains('Work Progress Notes').should('be.visible');
      cy.contains('Morning Reflections').should('not.exist');
      cy.contains('Evening Thoughts').should('not.exist');
    });

    // Clear filters
    cy.getByData('clear-filters').click();

    // Verify all journals are shown again
    cy.getByData('journal-list').within(() => {
      cy.contains('Work Progress Notes').should('be.visible');
      cy.contains('Morning Reflections').should('be.visible');
      cy.contains('Evening Thoughts').should('be.visible');
    });
  });

  it('should filter journal entries by mood', () => {
    // Open the filter panel
    cy.getByData('filter-button').click();

    // Select a mood to filter by
    cy.getByData('mood-filter').within(() => {
      cy.contains('Accomplished').click();
    });

    // Apply filters
    cy.getByData('apply-filters').click();

    // Verify only journals with the "accomplished" mood are shown
    cy.getByData('journal-list').within(() => {
      cy.contains('Work Progress Notes').should('be.visible');
      cy.contains('Morning Reflections').should('not.exist');
      cy.contains('Evening Thoughts').should('not.exist');
    });

    // Clear filters
    cy.getByData('clear-filters').click();

    // Verify all journals are shown again
    cy.getByData('journal-list').within(() => {
      cy.contains('Work Progress Notes').should('be.visible');
      cy.contains('Morning Reflections').should('be.visible');
      cy.contains('Evening Thoughts').should('be.visible');
    });
  });

  it('should filter journal entries by date range', () => {
    // Open the filter panel
    cy.getByData('filter-button').click();

    // Get today's date
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Set the date range filter
    cy.getByData('date-range-filter').within(() => {
      // Set start date to yesterday
      cy.getByData('start-date').type(yesterday.toISOString().split('T')[0]);
      // Set end date to today
      cy.getByData('end-date').type(today.toISOString().split('T')[0]);
    });

    // Apply filters
    cy.getByData('apply-filters').click();

    // Verify only journals from the selected date range are shown
    cy.getByData('journal-list').within(() => {
      // This depends on the dates set in the beforeEach hook
      // Most recent journal should be visible
      cy.contains('Morning Reflections').should('be.visible');
      // Older journals may not be visible depending on the date
    });

    // Clear filters
    cy.getByData('clear-filters').click();

    // Verify all journals are shown again
    cy.getByData('journal-list').within(() => {
      cy.contains('Work Progress Notes').should('be.visible');
      cy.contains('Morning Reflections').should('be.visible');
      cy.contains('Evening Thoughts').should('be.visible');
    });
  });

  it('should search journal entries by keywords', () => {
    // Search for a keyword that appears in only one journal
    cy.getByData('search-input').type('opportunities');

    // Submit the search
    cy.getByData('search-button').click();

    // Verify only journals containing the keyword are shown
    cy.getByData('journal-list').within(() => {
      cy.contains('Morning Reflections').should('be.visible');
      cy.contains('Evening Thoughts').should('not.exist');
      cy.contains('Work Progress Notes').should('not.exist');
    });

    // Clear the search
    cy.getByData('search-input').clear();
    cy.getByData('search-button').click();

    // Verify all journals are shown again
    cy.getByData('journal-list').within(() => {
      cy.contains('Work Progress Notes').should('be.visible');
      cy.contains('Morning Reflections').should('be.visible');
      cy.contains('Evening Thoughts').should('be.visible');
    });
  });

  it('should combine multiple filters and search', () => {
    // Open the filter panel
    cy.getByData('filter-button').click();

    // Select a mood to filter by
    cy.getByData('mood-filter').within(() => {
      cy.contains('Peaceful').click();
    });

    // Apply filters
    cy.getByData('apply-filters').click();

    // Add a search term
    cy.getByData('search-input').type('reflection');
    cy.getByData('search-button').click();

    // Verify only journals matching both criteria are shown
    cy.getByData('journal-list').within(() => {
      cy.contains('Evening Thoughts').should('be.visible');
      cy.contains('Morning Reflections').should('not.exist');
      cy.contains('Work Progress Notes').should('not.exist');
    });

    // Clear all filters and search
    cy.getByData('clear-filters').click();
    cy.getByData('search-input').clear();
    cy.getByData('search-button').click();

    // Verify all journals are shown again
    cy.getByData('journal-list').within(() => {
      cy.contains('Work Progress Notes').should('be.visible');
      cy.contains('Morning Reflections').should('be.visible');
      cy.contains('Evening Thoughts').should('be.visible');
    });
  });

  it('should sort journal entries', () => {
    // Open the sort dropdown
    cy.getByData('sort-dropdown').click();

    // Sort by title (alphabetical)
    cy.contains('Title (A-Z)').click();

    // Verify order of journals
    cy.getByData('journal-list').find(cy.getByData('journal-item')).eq(0).should('contain', 'Evening Thoughts');
    cy.getByData('journal-list').find(cy.getByData('journal-item')).eq(1).should('contain', 'Morning Reflections');
    cy.getByData('journal-list').find(cy.getByData('journal-item')).eq(2).should('contain', 'Work Progress Notes');

    // Sort by newest first (default)
    cy.getByData('sort-dropdown').click();
    cy.contains('Newest First').click();

    // Verify order is back to newest first
    cy.getByData('journal-list').find(cy.getByData('journal-item')).eq(0).should('contain', 'Morning Reflections');
    cy.getByData('journal-list').find(cy.getByData('journal-item')).eq(1).should('contain', 'Evening Thoughts');
    cy.getByData('journal-list').find(cy.getByData('journal-item')).eq(2).should('contain', 'Work Progress Notes');
  });
});
