describe('Blog ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Mr. Cypress',
      username: 'testuser',
      password: 'testpass',
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
  })
  it('fails with wrong credentials', function () {
    cy.get('#username').type('testuser')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.get('.error').contains('wrong credentials')

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')

    cy.get('html').should('not.contain', 'Mr. Cypress logged in')
  })
  it('succeeds with correct credentials', function () {
    cy.get('#username').type('testuser')
    cy.get('#password').type('testpass')
    cy.get('#login-button').click()
    cy.get('html').should('contain', 'Mr. Cypress logged in')
  })
})
describe('when logged in', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Mr. Cypress',
      username: 'testuser',
      password: 'testpass',
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.login({ username: 'testuser', password: 'testpass' })
  })
  it('a blog can be created', function () {
    cy.contains('New Blog').click()
    cy.get('#new-title').type('A title created by cypress')
    cy.get('#new-author').type('Mr. author created by cypress')
    cy.get('#new-url').type('www.url created by cypress')
    cy.contains('Create').click()
    cy.contains('A title created by cypress Mr. author')
  })
})
describe('when logged in and thereis a blog in db', function () {
  beforeEach(function () {
    cy.get('#logout-button').click()
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Mr. Cypress',
      username: 'testuser',
      password: 'testpass',
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.login({ username: 'testuser', password: 'testpass' })

    cy.createBlog({
      title: 'A title created by cypress',
      author: 'Mr. author',
      url: 'cypress url',
      likes: 0,
    })
  })
  it('a blog can be liked', function () {
    cy.contains('A title created by cypress Mr. author')
    cy.contains('Show').click()
    cy.contains('Like').click()
    cy.contains('likes: 1')
  })
  it('a blog can be removed', function () {
    cy.contains('A title created by cypress Mr. author')
    cy.contains('Show').click()
    cy.contains('Remove').click()
    cy.get('html').should('not.contain', 'A title created by cypress')
  })
})
describe('when logged in and there are 3 blogs in db', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3000/api/testing/reset')
    const user = {
      name: 'Mr. Cypress',
      username: 'testuser',
      password: 'testpass',
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.login({ username: 'testuser', password: 'testpass' })
    cy.createBlog({ title: 'middle', author: 'author', url: 'url', likes: 2 })
    cy.createBlog({ title: 'best', author: 'author', url: 'url', likes: 3 })
    cy.createBlog({ title: 'worst', author: 'author', url: 'url', likes: 1 })
  })
  it('blogs are ordered according to likes', function () {
    cy.get('.blogLess').eq(0).should('contain', 'best')
    cy.get('.blogLess').eq(1).should('contain', 'middle')
    cy.get('.blogLess').eq(2).should('contain', 'worst')
  })
})
