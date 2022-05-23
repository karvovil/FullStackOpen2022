describe('Blog ', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('Log in to application')
    cy.contains('username')
  })

  it('user can login', function () {
    cy.get('#username').type('lol')
    cy.get('#password').type('lol')
    cy.get('#login-button').click()

    cy.contains('make logged in')

  })
})