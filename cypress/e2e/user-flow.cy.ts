describe('Complete User Flow - E2E Tests', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should complete full user journey: signup → onboarding → dashboard → messaging', () => {
    // Step 1: User Registration
    cy.visit('/signup');

    const userEmail = `test${Date.now()}@example.com`;

    cy.get('input[name="email"]').type(userEmail);
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="age"]').type('25');
    cy.get('select[name="gender"]').select('male');

    cy.get('button[type="submit"]').click();

    // Should redirect to onboarding
    cy.url().should('include', '/onboarding');

    // Step 2: Complete Onboarding
    cy.get('[data-cy="onboarding-step-1"]').should('be.visible');

    // Fill profile information
    cy.get('textarea[name="bio"]').type('I love meeting new people!');
    cy.get('input[name="hobbies"]').type('Reading, Hiking, Cooking');

    // Set preferences
    cy.get('select[name="preferred-gender"]').select('female');
    cy.get('input[name="age-min"]').type('20');
    cy.get('input[name="age-max"]').type('35');
    cy.get('input[name="distance"]').type('50');

    cy.get('[data-cy="next-step"]').click();

    // Step 3: Upload photos
    cy.get('[data-cy="photo-upload"]').should('be.visible');
    // Note: File upload testing would require actual file handling

    cy.get('[data-cy="skip-photos"]').click();

    // Step 4: Complete onboarding
    cy.get('[data-cy="complete-onboarding"]').click();

    // Should redirect to dashboard
    cy.url().should('include', '/dashboard');

    // Step 5: Explore dashboard
    cy.get('[data-cy="discover-section"]').should('be.visible');
    cy.get('[data-cy="matches-section"]').should('be.visible');
    cy.get('[data-cy="messages-section"]').should('be.visible');

    // Step 6: View profile
    cy.get('[data-cy="profile-link"]').click();
    cy.url().should('include', '/profile');

    cy.get('[data-cy="user-name"]').should('contain', 'Test User');
    cy.get('[data-cy="user-age"]').should('contain', '25');

    // Step 7: Go back to discover
    cy.get('[data-cy="discover-link"]').click();
    cy.url().should('include', '/dashboard/discover');

    // Step 8: Simulate finding a match and messaging
    // This would require setting up test data or mocking
    cy.get('[data-cy="user-card"]').first().click();
    cy.get('[data-cy="send-message"]').should('be.visible');

    cy.get('textarea[name="message"]').type('Hi! I saw we have similar interests.');
    cy.get('[data-cy="send-button"]').click();

    // Should show message in conversation
    cy.get('[data-cy="message-list"]').should('contain', 'Hi! I saw we have similar interests.');

    // Step 9: Logout
    cy.get('[data-cy="logout-button"]').click();
    cy.url().should('include', '/login');
  });

  it('should handle premium subscription flow', () => {
    // Login first
    cy.visit('/login');
    cy.get('input[name="email"]').type('premium@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Navigate to premium page
    cy.visit('/premium');

    // Select premium plan
    cy.get('[data-cy="premium-plan"]').click();
    cy.get('[data-cy="subscribe-button"]').click();

    // Should redirect to Stripe checkout (mocked)
    cy.url().should('include', 'checkout.stripe.com');

    // After successful payment (simulated)
    cy.visit('/premium?success=true');

    // Should show success message
    cy.get('[data-cy="subscription-success"]').should('be.visible');
    cy.get('[data-cy="premium-features"]').should('be.visible');
  });

  it('should handle boost purchase', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('boost@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Navigate to boost section
    cy.get('[data-cy="boost-button"]').click();

    // Complete boost purchase
    cy.get('[data-cy="purchase-boost"]').click();

    // Should show boost active
    cy.get('[data-cy="boost-active"]').should('be.visible');
  });
});