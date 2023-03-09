describe('Home', () => {
    it('Doit afficher l\'image sélectionnée', () => {
      cy.visit('http://localhost:19006')
      cy.get('[data-testid=select-image-button]').click()
  
      cy.get('[data-testid=selected-image]').should('be.visible')
    })
  })