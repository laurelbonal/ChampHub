describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion.json', {
      statusCode: 200,
      fixture: 'AllChamps'
    }).as('getChamps')
    cy.intercept('GET', 'https://ddragon.leagueoflegends.com/cdn/14.11.1/data/en_US/champion/Aatrox.json', {
      statusCode: 200,
      fixture: 'Aatrox'
    }).as('getAatrox')
    cy.visit('http://localhost:3000');
  });
  it('displays correct champion when champ is clicked', () => {
    cy.wait('@getChamps')
    cy.get('.champ-grid > :nth-child(1)').click()
    cy.url().should('eq', 'http://localhost:3000/Aatrox/about')
    cy.get('.champion-info > h1').contains('Aatrox')
    cy.get('.champion-info > :nth-child(2)').contains('the Darkin Blade')
    cy.get('.about').contains('About')
    cy.get('.nav-tabs > :nth-child(2)').click()
    cy.get('.abilities-container > h2').contains('Abilities')
    cy.get('select').contains('Passive')
    cy.get('select').contains('Q')
    cy.get('select').contains('W')
    cy.get('select').contains('E')
    cy.get('select').contains('R')
    cy.get('select').select('[W] Infernal Chains')
    cy.get('p').contains('Aatrox smashes the ground, dealing damage to the first enemy hit. Champions and large monsters have to leave the impact area quickly or they will be dragged to the center and take the damage again')
    cy.get('.nav-tabs > :nth-child(3)').click()
    cy.get('.ally-tips > h2').contains('Ally Tips')
    cy.get('.nav-tabs > :nth-child(4)').click()
    cy.get('.enemy-tips > h2').contains('Enemy Tips')
    cy.get('.home-button').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })
})

