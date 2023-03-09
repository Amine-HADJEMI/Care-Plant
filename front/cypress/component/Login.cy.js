describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display the Login screen', () => {
    cy.get('h1').contains('Connexion');
  });

  it('should display error message with incorrect email and password', () => {
    cy.get('[placeholder="Adresse email"]').type('test@test.com');
    cy.get('[placeholder="Mot de passe top secret"]').type('password');
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="error-message"]').should('be.visible');
  });

  it('should navigate to Home screen with correct email and password', () => {
    cy.get('[placeholder="Adresse email"]').type('test@test.com');
    cy.get('[placeholder="Mot de passe top secret"]').type('password123');
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('include', '/home');
  });
});
