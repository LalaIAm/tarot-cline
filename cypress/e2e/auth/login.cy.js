/// <reference types="cypress" />

describe('Authentication', () => {
  let user;

  beforeEach(() => {
    // Load test user from fixtures
    cy.fixture('users.json').then((userData) => {
      user = userData.testUser;
    });

    // Visit the app
    cy.visit('/');
  });

  it('should login successfully', () => {
    // Click login button on landing page
    cy.getByData('log-in').click();

    // Verify we're on the login page
    cy.url().should('include', '/login');

    // Fill out login form
    cy.getByData('email-input').type(user.email);
    cy.getByData('password-input').type(user.password);

    // Submit the form
    cy.getByData('login-button').click();

    // Verify successful login (redirect to dashboard)
    cy.url().should('include', '/dashboard');

    // Verify user is logged in (navbar shows user info/logout)
    cy.getByData('user-menu').should('exist');
  });

  it('should reject invalid credentials', () => {
    // Click login button on landing page
    cy.getByData('log-in').click();

    // Verify we're on the login page
    cy.url().should('include', '/login');

    // Fill out login form with invalid credentials
    cy.getByData('email-input').type('wrong@example.com');
    cy.getByData('password-input').type('wrongpassword');

    // Submit the form
    cy.getByData('login-button').click();

    // Verify error message is displayed
    cy.getByData('auth-error').should('be.visible');
    cy.getByData('auth-error').should('contain', 'Invalid login credentials');

    // Verify we're still on the login page
    cy.url().should('include', '/login');
  });

  it('should navigate to signup page', () => {
    // Click login button on landing page
    cy.getByData('log-in').click();

    // Verify we're on the login page
    cy.url().should('include', '/login');

    // Click the signup link
    cy.getByData('signup-link').click();

    // Verify we're on the signup page
    cy.url().should('include', '/signup');
  });

  it('should navigate to password reset page', () => {
    // Click login button on landing page
    cy.getByData('log-in').click();

    // Verify we're on the login page
    cy.url().should('include', '/login');

    // Click the forgot password link
    cy.getByData('forgot-password-link').click();

    // Verify we're on the password reset page
    cy.url().should('include', '/reset-password');
  });

  it('should logout successfully', () => {
    // Login
    cy.login(user.email, user.password);

    // Verify we're on the dashboard
    cy.url().should('include', '/dashboard');

    // Click the user menu
    cy.getByData('user-menu').click();

    // Click logout
    cy.getByData('logout-button').click();

    // Verify we're logged out (redirected to landing page)
    cy.url().should('not.include', '/dashboard');

    // Verify login button is visible again
    cy.getByData('log-in').should('be.visible');
  });
});
