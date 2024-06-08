describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion.json', {
      statusCode: 200,
      fixture: 'AllChamps'
    }).as('getChamps')
    cy.visit('http://localhost:3000');
  });
  it('should display champions', ()=>{
    cy.wait('@getChamps')
    cy.get('.header-link > h1').contains('ChampionHub')
    cy.get('.sticky-container > h1').contains('All Champs')
    cy.get('.sticky-container > p').contains('Filter by champ type and difficulty level to find the perfect match for your play style')
    cy.get('[aria-label="Type"]').contains('Fighter')
    cy.get('[aria-label="Type"]').contains('Mage')
    cy.get('[aria-label="Type"]').contains('Assassin')
    cy.get('[aria-label="Type"]').contains('Tank')
    cy.get('[aria-label="Type"]').contains('Support')
    cy.get('[aria-label="Difficulty"]').contains('1 - Easy')
    cy.get('[aria-label="Difficulty"]').contains('2 - Moderate')
    cy.get('[aria-label="Difficulty"]').contains('3 - Hard')
    cy.get('[aria-label="Difficulty"]').contains('4 - Very Hard')
    cy.get('[aria-label="Difficulty"]').contains('5 - Extreme')
    cy.get('.champ-card').should('have.length', '15')
    cy.get('.champ-grid > :nth-child(1)').contains('Aatrox')
    cy.get('.champ-grid > :nth-child(15)').contains('Blitzcrank')
    cy.get('[aria-label="Type"]').select('Fighter')
    cy.get('.champ-card').should('have.length', '2')
    cy.get('.search').type('Aa')
    cy.get('.champ-card').should('have.length', 1)
    cy.get('.champ-card').should('contain', 'Aatrox')
    cy.get('.clear-button').click()
    cy.get('.champ-card').should('have.length', '15')
  })
})