// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { createClient } from '@supabase/supabase-js';

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.log('Logging in via Supabase authentication');
  
  // Get Supabase URL and key from environment variables
  const supabaseUrl = Cypress.env('SUPABASE_URL');
  const supabaseKey = Cypress.env('SUPABASE_ANON_KEY');
  
  // Create Supabase client
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Sign in via Supabase
  cy.wrap(
    supabase.auth.signInWithPassword({
      email,
      password,
    }),
    { log: false }
  ).then((response) => {
    // Check if login was successful
    if (response.error) {
      throw new Error(`Login failed: ${response.error.message}`);
    }
    
    // Store session in localStorage
    window.localStorage.setItem(
      'sb-' + supabaseUrl.split('//')[1].split('.')[0] + '-auth-token',
      JSON.stringify(response.data)
    );
  });
  
  // Navigate to dashboard after successful login
  cy.visit('/dashboard');
});

// Create a journal entry with Supabase directly (bypassing UI for test setup)
Cypress.Commands.add('createJournal', (journalData) => {
  cy.log('Creating test journal entry');
  
  const supabaseUrl = Cypress.env('SUPABASE_URL');
  const supabaseKey = Cypress.env('SUPABASE_ANON_KEY');
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  return cy.wrap(
    supabase.from('journals').insert([journalData]).select(),
    { log: false }
  ).then((response) => {
    if (response.error) {
      throw new Error(`Failed to create journal: ${response.error.message}`);
    }
    return response.data[0];
  });
});

// Delete test data after test completion
Cypress.Commands.add('cleanupTestData', (journalId) => {
  cy.log('Cleaning up test data');
  
  const supabaseUrl = Cypress.env('SUPABASE_URL');
  const supabaseKey = Cypress.env('SUPABASE_ANON_KEY');
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  if (journalId) {
    return cy.wrap(
      supabase.from('journals').delete().eq('id', journalId),
      { log: false }
    );
  }
});

// Create a tarot reading with Supabase directly
Cypress.Commands.add('createReading', (readingData) => {
  cy.log('Creating test tarot reading');
  
  const supabaseUrl = Cypress.env('SUPABASE_URL');
  const supabaseKey = Cypress.env('SUPABASE_ANON_KEY');
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  return cy.wrap(
    supabase.from('readings').insert([readingData]).select(),
    { log: false }
  ).then((response) => {
    if (response.error) {
      throw new Error(`Failed to create reading: ${response.error.message}`);
    }
    return response.data[0];
  });
});

Cypress.Commands.add('getByData', (selector) => {
    return cy.get(`[data-test=${selector}]`)
})

// Direct logout command
Cypress.Commands.add('logout', () => {
  cy.log('Logging out programmatically');
  cy.window().then((win) => {
    // Dispatch logout action directly to the Redux store
    win.store.dispatch({ type: 'auth/logout/fulfilled', payload: true });
    
    // Navigate back to the landing page
    cy.visit('/');
  });
});
