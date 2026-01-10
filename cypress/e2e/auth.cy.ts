describe('Authentication Flow - E2E Tests', () => {
  beforeEach(() => {
    // Clear any existing session
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should allow user to register and login', () => {
    // Visit signup page
    cy.visit('/signup');

    // Fill out registration form
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="age"]').type('25');
    cy.get('select[name="gender"]').select('male');

    // Submit form
    cy.get('button[type="submit"]').click();

    // Should redirect to onboarding or dashboard
    cy.url().should('not.include', '/signup');

    // Logout
    cy.get('[data-cy="logout-button"]').click();

    // Visit login page
    cy.visit('/login');

    // Fill out login form
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');

    // Submit form
    cy.get('button[type="submit"]').click();

    // Should be logged in
    cy.url().should('not.include', '/login');
    cy.get('[data-cy="user-profile"]').should('contain', 'Test User');
  });

  it('should show error for invalid login credentials', () => {
    cy.visit('/login');

    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');

    cy.get('button[type="submit"]').click();

    // Should show error message
    cy.get('[data-cy="error-message"]').should('be.visible');
    cy.get('[data-cy="error-message"]').should('contain', 'Invalid credentials');

    // Should still be on login page
    cy.url().should('include', '/login');
  });

  it('should allow password reset', () => {
    cy.visit('/forgot-password');

    cy.get('input[name="email"]').type('test@example.com');
    cy.get('button[type="submit"]').click();

    // Should show success message
    cy.get('[data-cy="success-message"]').should('be.visible');
    cy.get('[data-cy="success-message"]').should('contain', 'Password reset email sent');
  });
});