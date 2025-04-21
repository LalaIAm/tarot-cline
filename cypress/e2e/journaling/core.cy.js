/// <reference types="cypress" />

describe('Journal Core Functionality', () => {
  // Test user credentials from fixtures
  let user;
  // Sample journal data from fixtures
  let journalData;

  beforeEach(() => {
    // Load test data from fixtures
    cy.fixture('users.json').then((userData) => {
      user = userData.testUser;
    });

    cy.fixture('journals.json').then((data) => {
      journalData = data.sampleJournal;
    });

    // Visit the app and log in
    cy.visit('/');
    cy.login(user.email, user.password);

    // Navigate to the journaling page
    cy.visit('/journaling');

    // Ensure the page has loaded
    cy.contains('h1', 'Journal');
  });

  // Clean up test data after each test
  afterEach(() => {
    // Clean up any created journal entries
    // Use ID from the created journal if available
    if (this.journalId) {
      cy.cleanupTestData(this.journalId);
    }
  });

  it('should allow creating a new journal entry', () => {
    // Click the "New Entry" button
    cy.getByData('new-entry-button').click();

    // Verify we're on the journal entry form page
    cy.url().should('include', '/journaling/new');

    // Fill out the journal entry form
    cy.getByData('journal-title-input').type(journalData.title);

    // Use the rich text editor (TipTap)
    cy.get('.tiptap').type(journalData.content.replace(/<[^>]*>/g, ''));

    // Select a mood
    cy.getByData('mood-selector').click();
    cy.contains('button', journalData.mood.charAt(0).toUpperCase() + journalData.mood.slice(1)).click();

    // Add tags
    for (const tag of journalData.tags) {
      cy.getByData('tag-input').type(`${tag}{enter}`);
    }

    // Submit the form
    cy.getByData('save-journal-button').click();

    // Verify success - redirect to journal detail page
    cy.url().should('match', /\/journaling\/[a-f0-9-]+$/);

    // Verify that the journal entry was created correctly
    cy.contains('h1', journalData.title);

    // Verify content (simplified for test)
    cy.getByData('journal-content').should('contain.text', journalData.content.replace(/<[^>]*>/g, ''));

    // Verify tags
    for (const tag of journalData.tags) {
      cy.getByData('journal-tags').should('contain.text', tag);
    }

    // Verify mood
    cy.getByData('journal-mood').should('contain.text', journalData.mood);

    // Store the journal ID for cleanup
    cy.url().then((url) => {
      this.journalId = url.split('/').pop();
    });
  });

  it('should allow editing an existing journal entry', () => {
    // Create a journal entry directly via API for testing
    cy.createJournal({
      title: journalData.title,
      content: journalData.content,
      mood: journalData.mood,
      user_id: null // will be filled by the custom command with the current user's ID
    }).then((journal) => {
      this.journalId = journal.id;

      // Visit the journal detail page
      cy.visit(`/journaling/${journal.id}`);

      // Click edit button
      cy.getByData('edit-journal-button').click();

      // Verify we're on the edit page
      cy.url().should('include', `/journaling/edit/${journal.id}`);

      // Update the title
      const updatedTitle = 'Updated Journal Title';
      cy.getByData('journal-title-input').clear().type(updatedTitle);

      // Update content
      const updatedContent = 'This is updated content for testing purposes.';
      cy.get('.tiptap').clear().type(updatedContent);

      // Update mood
      cy.getByData('mood-selector').click();
      cy.contains('button', 'Peaceful').click();

      // Submit the form
      cy.getByData('save-journal-button').click();

      // Verify success - redirect to journal detail page
      cy.url().should('include', `/journaling/${journal.id}`);

      // Verify the updated content
      cy.contains('h1', updatedTitle);
      cy.getByData('journal-content').should('contain.text', updatedContent);
      cy.getByData('journal-mood').should('contain.text', 'peaceful');
    });
  });

  it('should allow deleting a journal entry', () => {
    // Create a journal entry directly via API for testing
    cy.createJournal({
      title: 'Journal to be deleted',
      content: '<p>This journal will be deleted during testing.</p>',
      mood: 'neutral',
      user_id: null // will be filled by the custom command
    }).then((journal) => {
      this.journalId = journal.id;

      // Visit the journal detail page
      cy.visit(`/journaling/${journal.id}`);

      // Click delete button
      cy.getByData('delete-journal-button').click();

      // Confirm deletion in the modal
      cy.getByData('confirm-delete-button').click();

      // Verify redirect to journal list
      cy.url().should('equal', Cypress.config().baseUrl + '/journaling');

      // Verify the journal was deleted - should not appear in the list
      cy.contains('Journal to be deleted').should('not.exist');

      // Reset journalId since we've already deleted it
      this.journalId = null;
    });
  });

  it('should display journal entries in the list view', () => {
    // Create multiple journal entries for testing
    const testJournals = [];

    // Create first journal
    cy.createJournal({
      title: 'First Test Journal',
      content: '<p>This is the first test journal.</p>',
      mood: 'happy',
      user_id: null // will be filled by the custom command
    }).then((journal) => {
      testJournals.push(journal);

      // Create second journal
      return cy.createJournal({
        title: 'Second Test Journal',
        content: '<p>This is the second test journal.</p>',
        mood: 'reflective',
        user_id: null // will be filled by the custom command
      });
    }).then((journal) => {
      testJournals.push(journal);

      // Refresh the journal list page
      cy.visit('/journaling');

      // Verify that both journals appear in the list
      cy.getByData('journal-list').within(() => {
        cy.contains('First Test Journal');
        cy.contains('Second Test Journal');
      });

      // Clean up created journals
      testJournals.forEach(journal => {
        cy.cleanupTestData(journal.id);
      });
    });
  });
});
