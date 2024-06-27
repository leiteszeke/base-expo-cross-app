describe('Testing Login Screen', () => {
  it('should have login screen', () => {
    cy.visit('http://localhost:8081')
  })

  it('should show login text', () => {
    cy.visit('http://localhost:8081')
    cy.get('[data-testid="login-text"]').contains('Login')
  })
})
