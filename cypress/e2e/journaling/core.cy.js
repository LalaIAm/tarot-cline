/// <reference types="cypress" />

describe('Journal Core Functionality', function () {
  // Test user credentials from fixtures
  let user;
  // Sample journal data from fixtures
  let journalData;

  beforeEach(() => {
    cy.fixture('journals.json').then((data) => { 
      journalData = data.sampleJournal
    })
     // Load test user from fixtures
     cy.fixture('users.json').then((userData) => {
       user = userData.testUser;
       cy.visit('/')
       cy.login(user.email, user.password)
     });

     // Visit the app
  
   });
  

  // Clean up test data after each test
  afterEach(function () {
    // Clean up any created journal entries
    // Use ID from the created journal if available
    if (this.journalId) {
      cy.cleanupTestData(this.journalId);
    }
  });

  it('should allow creating a new journal entry', function () {
    // Click on "New Entry" button - using text instead of data attribute
    cy.get('.bg-indigo-600').should('exist').click();

    // Verify we're on the journal entry form page
    cy.url().should('include', '/journal/new');

    // Fill out the journal entry form - using multiple selector strategies
   // cy.get('input[id="title"]').type(journalData.title);

    // Use the rich text editor (TipTap)
    // cy.get('.tiptap').type(journalData.content.replace(/<[^>]*>/g, ''));

    // Select a mood
    cy.contains('label', 'Mood').next().click();
    cy.contains(
      'button',
      journalData.mood.charAt(0).toUpperCase() + journalData.mood.slice(1)
    ).click();

    // Add tags
    for (const tag of journalData.tags) {
      cy.contains('label', 'Tags').parent().find('input').type(`${tag}{enter}`);
    }

    // Submit the form
    cy.contains('button', 'Save Entry').click();

    // Verify success - redirect to journal detail page
    cy.url().should('match', /\/journal\/[a-f0-9-]+$/);

    // Store the journal ID for cleanup
    cy.url().then((url) => {
      this.journalId = url.split('/').pop();
    });
  });
  

  it.skip('should allow editing an existing journal entry', function () {
    // Create a journal entry directly via API for testing
    cy.createJournal({
      title: journalData.title,
      content: journalData.content,
      mood: journalData.mood,
      user_id: null, // will be filled by the custom command with the current user's ID
    }).then((journal) => {
      this.journalId = journal.id;

      // Visit the journal detail page
      cy.visit(`/journal/${journal.id}`);

      // Click edit button
      cy.contains('Edit').click();

      // Verify we're on the edit page
      cy.url().should('include', `/journal/edit/${journal.id}`);

      // Update the title
      const updatedTitle = 'Updated Journal Title';
      cy.get('input[id="title"]').clear().type(updatedTitle);

      // Update content
      const updatedContent = 'This is updated content for testing purposes.';
      cy.get('.tiptap').clear().type(updatedContent);

      // Update mood
      cy.getByData('mood-selector').click();
      cy.contains('button', 'Peaceful').click();

      // Submit the form
      cy.contains('button', 'Update Entry').click();

      // Verify success - redirect to journal detail page
      cy.url().should('include', `/journal/${journal.id}`);
    });
  });

  it.skip('should allow deleting a journal entry', function () {
    // Create a journal entry directly via API for testing
    cy.createJournal({
      title: 'Journal to be deleted',
      content: '<p>This journal will be deleted during testing.</p>',
      mood: 'neutral',
      user_id: null, // will be filled by the custom command
    }).then((journal) => {
      this.journalId = journal.id;

      // Visit the journal detail page
      cy.visit(`/journal/${journal.id}`);

      // Click delete button
      cy.contains('Delete').click();

      // Confirm deletion in the modal
      cy.contains('button', 'Delete').click();

      // Verify redirect to journal list
      cy.url().should('equal', Cypress.config().baseUrl + '/journal');

      // Reset journalId since we've already deleted it
      this.journalId = null;
    });
  });

  it.skip('should display journal entries in the list view', function () {
    // Create multiple journal entries for testing
    const testJournals = [];

    // Create first journal
    cy.createJournal({
      title: 'First Test Journal',
      content: '<p>This is the first test journal.</p>',
      mood: 'happy',
      user_id: null, // will be filled by the custom command
    })
      .then((journal) => {
        testJournals.push(journal);

        // Create second journal
        return cy.createJournal({
          title: 'Second Test Journal',
          content: '<p>This is the second test journal.</p>',
          mood: 'reflective',
          user_id: null, // will be filled by the custom command
        });
      })
      .then((journal) => {
        testJournals.push(journal);

        // Refresh the journal list page
        cy.visit('/journal');

        // Verify that both journals appear in the list
        cy.get('.grid')
          .should('exist')
          .within(() => {
            cy.contains('First Test Journal');
            cy.contains('Second Test Journal');
          });

        // Clean up created journals
        testJournals.forEach((journal) => {
          cy.cleanupTestData(journal.id);
        });
      });
  });
});
