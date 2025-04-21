/// <reference types="cypress" />

describe('Dashboard Journal Integration', () => {
  // Test user credentials from fixtures
  let user;
  // Sample journal data from fixtures
  let journals;
  // Sample reading data from fixtures
  let readings;
  // Store created test data IDs for cleanup
  const testData = {
    readingIds: [],
    journalIds: []
  };

  beforeEach(() => {
    // Load test data from fixtures
    cy.fixture('users.json').then((userData) => {
      user = userData.testUser;
    });

    cy.fixture('journals.json').then((journalData) => {
      journals = journalData.filteredJournals;
    });

    cy.fixture('readings.json').then((readingData) => {
      readings = [
        readingData.singleCardReading,
        readingData.threeCardReading
      ];

      // Visit the app and log in
      cy.visit('/');
      cy.login(user.email, user.password);
    });

    // Clean up any previously created test data
    testData.journalIds.forEach(id => {
      cy.cleanupTestData(id);
    });
    testData.readingIds.forEach(id => {
      cy.wrap(null).then(() => {
        const supabaseUrl = Cypress.env('SUPABASE_URL');
        const supabaseKey = Cypress.env('SUPABASE_ANON_KEY');
        const supabase = createClient(supabaseUrl, supabaseKey);

        return supabase.from('readings').delete().eq('id', id);
      });
    });

    // Reset test data arrays
    testData.journalIds = [];
    testData.readingIds = [];
  });

  // Clean up test data after all tests
  afterEach(() => {
    // Clean up created journals
    testData.journalIds.forEach(id => {
      cy.cleanupTestData(id);
    });

    // Clean up created readings
    testData.readingIds.forEach(id => {
      cy.wrap(null).then(() => {
        const supabaseUrl = Cypress.env('SUPABASE_URL');
        const supabaseKey = Cypress.env('SUPABASE_ANON_KEY');
        const supabase = createClient(supabaseUrl, supabaseKey);

        return supabase.from('readings').delete().eq('id', id);
      });
    });
  });

  it('should display recent journal entries on the dashboard', () => {
    // Create multiple journal entries for testing
    const journalPromises = journals.map((journal, index) => {
      return cy.createJournal({
        title: journal.title,
        content: journal.content,
        mood: journal.mood,
        user_id: null, // will be filled by the custom command
        created_at: new Date(Date.now() - (index * 3600000)).toISOString() // Different timestamps
      }).then((createdJournal) => {
        testData.journalIds.push(createdJournal.id);
        return createdJournal;
      });
    });

    // After creating all journals, visit the dashboard
    cy.wrap(journalPromises).then(() => {
      cy.visit('/dashboard');

      // Verify journal entries widget exists
      cy.getByData('journal-entries-widget').should('exist');

      // Verify recent journal entries are displayed
      cy.getByData('journal-entries-widget').within(() => {
        cy.contains(journals[0].title).should('be.visible'); // Most recent journal
        cy.contains(journals[1].title).should('be.visible'); // Second most recent

        // There might be a limit on how many journals are displayed in the widget
        // So we don't check for the oldest journal
      });
    });
  });

  it('should navigate to journal detail from dashboard widget', () => {
    // Create a journal entry for testing
    cy.createJournal({
      title: journals[0].title,
      content: journals[0].content,
      mood: journals[0].mood,
      user_id: null // will be filled by the custom command
    }).then((createdJournal) => {
      testData.journalIds.push(createdJournal.id);

      // Visit the dashboard
      cy.visit('/dashboard');

      // Find the journal in the widget
      cy.getByData('journal-entries-widget').contains(journals[0].title).click();

      // Verify navigation to journal detail
      cy.url().should('include', `/journaling/${createdJournal.id}`);

      // Verify journal details are displayed
      cy.contains('h1', journals[0].title);
      cy.getByData('journal-content').should('contain.text', journals[0].content.replace(/<[^>]*>/g, ''));
    });
  });

  it('should show dashboard statistics about journaling activity', () => {
    // Create multiple journal entries with different dates
    const dates = [
      new Date(), // Today
      new Date(Date.now() - 86400000), // Yesterday
      new Date(Date.now() - 86400000 * 2), // 2 days ago
      new Date(Date.now() - 86400000 * 7) // 7 days ago
    ];

    // Create a journal for each date
    let promise = Promise.resolve();
    dates.forEach((date, index) => {
      promise = promise.then(() => {
        return cy.createJournal({
          title: `Test Journal ${index + 1}`,
          content: `<p>Test content for journal ${index + 1}</p>`,
          mood: ['happy', 'reflective', 'peaceful', 'optimistic'][index % 4],
          user_id: null,
          created_at: date.toISOString()
        }).then((journal) => {
          testData.journalIds.push(journal.id);
        });
      });
    });

    // After creating the journals, visit the dashboard
    cy.wrap(promise).then(() => {
      cy.visit('/dashboard');

      // Verify statistics widget exists
      cy.getByData('dashboard-stats-widget').should('exist');

      // Verify journaling statistics are displayed
      cy.getByData('dashboard-stats-widget').within(() => {
        // Should show 3 entries in the last week
        cy.contains('3').should('be.visible');
        cy.contains('last 7 days').should('be.visible');

        // Should show mood distribution
        cy.getByData('mood-stats').should('exist');
      });
    });
  });

  it('should display both readings and journals in the activity feed', () => {
    // Create a reading
    cy.createReading({
      spread: readings[0].spread,
      user_intent: readings[0].userIntent,
      card_ids: readings[0].cardIds,
      interpretation: readings[0].interpretation,
      user_id: null // will be filled by the custom command
    }).then((createdReading) => {
      testData.readingIds.push(createdReading.id);

      // Create a journal
      return cy.createJournal({
        title: journals[0].title,
        content: journals[0].content,
        mood: journals[0].mood,
        user_id: null // will be filled by the custom command
      });
    }).then((createdJournal) => {
      testData.journalIds.push(createdJournal.id);

      // Visit the dashboard
      cy.visit('/dashboard');

      // Verify activity feed contains both entries
      cy.getByData('activity-feed').should('exist');
      cy.getByData('activity-feed').within(() => {
        // Should show the journal
        cy.contains(journals[0].title).should('be.visible');

        // Should show the reading
        cy.contains(readings[0].userIntent).should('be.visible');
      });
    });
  });

  it('should navigate to journaling page from quick action buttons', () => {
    // Visit dashboard
    cy.visit('/dashboard');

    // Find quick action button for creating a new journal
    cy.getByData('quick-actions').contains('New Journal').click();

    // Verify redirection to journal creation form
    cy.url().should('include', '/journaling/new');

    // Verify journal form loaded
    cy.getByData('journal-title-input').should('exist');
    cy.get('.tiptap').should('exist');
  });

  it('should create a journal from quick action and save it successfully', () => {
    // Visit dashboard
    cy.visit('/dashboard');

    // Find quick action button for creating a new journal
    cy.getByData('quick-actions').contains('New Journal').click();

    // Fill out the journal form
    cy.getByData('journal-title-input').type('Quick Action Journal Test');
    cy.get('.tiptap').type('This journal was created from the dashboard quick action button.');

    // Select a mood
    cy.getByData('mood-selector').click();
    cy.contains('button', 'Happy').click();

    // Submit the form
    cy.getByData('save-journal-button').click();

    // Verify success - redirect to journal detail page
    cy.url().should('match', /\/journaling\/[a-f0-9-]+$/);

    // Store the journal ID for cleanup
    cy.url().then((url) => {
      const journalId = url.split('/').pop();
      testData.journalIds.push(journalId);
    });

    // Verify that the journal entry was created correctly
    cy.contains('h1', 'Quick Action Journal Test');
    cy.getByData('journal-content').should('contain.text', 'This journal was created from the dashboard quick action button.');
  });
});
