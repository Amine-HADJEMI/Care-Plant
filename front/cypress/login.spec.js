describe('Login', () => {
    it('should display error message on invalid credentials', () => {
      cy.visit('/login')
  
      cy.get('[data-testid=username-input]').type('wrongusername')
      cy.get('[data-testid=password-input]').type('wrongpassword')
  
      cy.get('[data-testid=login-button]').click()
  
      cy.get('[data-testid=error-message]')
        .should('be.visible')
        .and('contain', 'Invalid username or password')
    })
  })
  