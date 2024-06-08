describe('template spec', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion.json', {
        statusCode: 200,
        fixture: 'AllChamps'
      }).as('getChamps')
      cy.visit('http://localhost:3000/');
    });
  it('shows error page for 500 lvl errors', () => {
    cy.intercept('GET', 'https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion.json', {
      statusCode: 500,
      fixture: 'AllChamps'
    }).as('getChamps')
    cy.url().should('eq', 'http://localhost:3000/error')
    cy.get('h2').contains('Error fetching champions')
    cy.get('.home-button').contains('Back to All Champs')
  })
  it('shows error page for page not found', () => {
    cy.visit('http://localhost:3000/asdna')
    cy.url().should('eq', 'http://localhost:3000/error')
    cy.get('h2').contains('Cannot find that page')
    cy.get('.home-button').contains('Back to All Champs')
    cy.get('.home-button').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})