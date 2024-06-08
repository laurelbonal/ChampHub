describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion.json', {
      statusCode: 200,
      fixture: 'AllChamps'
    }).as('getChamps')
    cy.visit('http://localhost:3000/Champions');
  });
  it('should display champions', ()=>{
    cy.wait('@getChamps')
    cy.get('.header-link > h1').contains('ChampionHub')
    cy.get('.sticky-container > h1').contains('All Champs')
    cy.get('.sticky-container > p').contains('Filter by champ type and difficulty level to find the perfect match for your play style')
    cy.get('[aria-label="Type"]').contains
  })
})