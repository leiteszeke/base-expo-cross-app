describe('Testing Login Screen', () => {
  it('should have login screen', () => {
    cy.visit('http://localhost:19006')
  })

  it('should show login text', () => {
    cy.visit('http://localhost:19006')
    cy.get('[data-testid="login-text"]').contains('Login')
  })
})
