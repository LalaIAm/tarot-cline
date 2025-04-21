/// <reference types="cypress" />

describe('Reading-Journal Connection', () => {
  // Test user credentials from fixtures
  let user;
  // Sample reading data from fixtures
  let reading;
  // Sample journal data from fixtures
  let journal;
  // Store created test data IDs for cleanup
  const testData = {
    readingId: null,
    journalId: null
  };

  beforeEach(() => {
    // Load test data from fixtures
    cy.fixture('users.json').then((userData) => {
      user = userData.testUser;
    });

    cy.fixture('readings.json').then((readingData) => {
      reading = readingData.singleCardReading;
    });

    cy.fixture('journals.json').then((journalData) => {
      journal = journalData.journalWithReading;

      // Visit the app and log in
      cy.visit('/');
      cy.login(user.email, user.password);
    });
  });

  // Clean up test data after all tests
  afterEach(() => {
    // Clean up any created journal entries
    if (testData.journalId) {
      cy.cleanupTestData(testData.journalId);
      testData.journalId = null;
    }

    // Clean up any created readings
    if (testData.readingId) {
      cy.wrap(null).then(() => {
        const supabaseUrl = Cypress.env('SUPABASE_URL');
        const supabaseKey = Cypress.env('SUPABASE_ANON_KEY');
        const supabase = createClient(supabaseUrl, supabaseKey);

        return supabase.from('readings').delete().eq('id', testData.readingId);
      });
      testData.readingId = null;
    }
  });

  it('should create a journal entry from a tarot reading', () => {
    // Create a test tarot reading first
    cy.createReading({
      spread: reading.spread,
      user_intent: reading.userIntent,
      card_ids: reading.cardIds,
      interpretation: reading.interpretation,
      user_id: null // will be filled by the custom command
    }).then((createdReading) => {
      testData.readingId = createdReading.id;

      // Visit the reading detail page
      cy.visit(`/readings/${createdReading.id}`);

      // Verify reading details are displayed
      cy.contains(reading.userIntent);
      cy.contains(reading.interpretation.summary);

      // Click "Journal About This Reading" button
      cy.getByData('journal-about-reading-button').click();

      // Verify we're on the journal form with the reading pre-linked
      cy.url().should('include', '/journaling/new');
      cy.url().should('include', `readingId=${createdReading.id}`);

      // Verify the reading card is displayed in the form
      cy.getByData('linked-reading').should('exist');
      cy.getByData('linked-reading').should('contain', reading.interpretation.summary);

      // Fill out the journal form
      cy.getByData('journal-title-input').type(journal.title);
      cy.get('.tiptap').type(journal.content.replace(/<[^>]*>/g, ''));

      // Select a mood
      cy.getByData('mood-selector').click();
      cy.contains('button', journal.mood.charAt(0).toUpperCase() + journal.mood.slice(1)).click();

      // Add tags
      for (const tag of journal.tags) {
        cy.getByData('tag-input').type(`${tag}{enter}`);
      }

      // Submit the form
      cy.getByData('save-journal-button').click();

      // Verify success - redirect to journal detail page
      cy.url().should('match', /\/journaling\/[a-f0-9-]+$/);

      // Store the journal ID for cleanup
      cy.url().then((url) => {
        testData.journalId = url.split('/').pop();
      });

      // Verify the reading is linked in the journal detail view
      cy.getByData('linked-reading').should('exist');
      cy.getByData('linked-reading').should('contain', reading.interpretation.summary);

      // Verify correct card is displayed
      cy.getByData('tarot-card').should('exist');
    });
  });

  it('should show visual indicators for linked entries in the journal list', () => {
    // Create a test tarot reading first
    cy.createReading({
      spread: reading.spread,
      user_intent: reading.userIntent,
      card_ids: reading.cardIds,
      interpretation: reading.interpretation,
      user_id: null // will be filled by the custom command
    }).then((createdReading) => {
      testData.readingId = createdReading.id;

      // Create a journal entry linked to the reading
      return cy.createJournal({
        title: journal.title,
        content: journal.content,
        mood: journal.mood,
        reading_id: createdReading.id,
        user_id: null // will be filled by the custom command
      });
    }).then((createdJournal) => {
      testData.journalId = createdJournal.id;

      // Navigate to the journal list
      cy.visit('/journaling');

      // Find the journal entry in the list
      cy.contains(journal.title).parent().within(() => {
        // Verify it has a visual indicator for being linked to a reading
        cy.getByData('reading-link-indicator').should('exist');
      });
    });
  });

  it('should navigate between linked readings and journals', () => {
    // Create a test tarot reading first
    cy.createReading({
      spread: reading.spread,
      user_intent: reading.userIntent,
      card_ids: reading.cardIds,
      interpretation: reading.interpretation,
      user_id: null // will be filled by the custom command
    }).then((createdReading) => {
      testData.readingId = createdReading.id;

      // Create a journal entry linked to the reading
      return cy.createJournal({
        title: journal.title,
        content: journal.content,
        mood: journal.mood,
        reading_id: createdReading.id,
        user_id: null // will be filled by the custom command
      });
    }).then((createdJournal) => {
      testData.journalId = createdJournal.id;

      // Start from the journal detail page
      cy.visit(`/journaling/${createdJournal.id}`);

      // Verify the linked reading section exists
      cy.getByData('linked-reading').should('exist');

      // Click on the linked reading to navigate to it
      cy.getByData('linked-reading').click();

      // Verify we navigated to the reading detail page
      cy.url().should('include', `/readings/${testData.readingId}`);

      // On the reading page, find the link back to the journal
      cy.getByData('linked-journal').should('exist');
      cy.getByData('linked-journal').contains(journal.title);

      // Click to navigate back to the journal
      cy.getByData('linked-journal').click();

      // Verify we're back at the journal detail page
      cy.url().should('include', `/journaling/${testData.journalId}`);
    });
  });

  it('should display journal entries on the dashboard with reading indicators', () => {
    // Create a test tarot reading first
    cy.createReading({
      spread: reading.spread,
      user_intent: reading.userIntent,
      card_ids: reading.cardIds,
      interpretation: reading.interpretation,
      user_id: null // will be filled by the custom command
    }).then((createdReading) => {
      testData.readingId = createdReading.id;

      // Create a journal entry linked to the reading
      return cy.createJournal({
        title: journal.title,
        content: journal.content,
        mood: journal.mood,
        reading_id: createdReading.id,
        user_id: null // will be filled by the custom command
      });
    }).then((createdJournal) => {
      testData.journalId = createdJournal.id;

      // Navigate to the dashboard
      cy.visit('/dashboard');

      // Find the journal entries widget
      cy.getByData('journal-entries-widget').should('exist');

      // Locate our test journal in the widget
      cy.getByData('journal-entries-widget').contains(journal.title).parent().within(() => {
        // Verify it has a visual indicator for being linked to a reading
        cy.getByData('reading-link-indicator').should('exist');
      });

      // Click on the journal entry to navigate to it
      cy.getByData('journal-entries-widget').contains(journal.title).click();

      // Verify we navigated to the journal detail page
      cy.url().should('include', `/journaling/${testData.journalId}`);
    });
  });
});
