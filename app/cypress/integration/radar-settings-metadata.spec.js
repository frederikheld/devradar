/// <reference types="Cypress" />
const getBackend = () => cy.window().its('backend')

context('Radar metadata', () => {
  before(() => {
    cy.exec('node cypress/support/wipe-firestore.js')
    cy.visit('/')
    getBackend().then(backend => {
      return backend.test.login()
    })
    cy.get('[data-cy=cookie-banner] button').click()
    cy.visit('/@rick')
    cy.get('[data-cy="radarSvg"]').should('be.visible')
    cy.get('[data-cy="loadingDialog"]').should('not.be.visible')
  })

  it('changes title via settings', () => {
    cy.get('[data-cy="radar-settings-button"]').click()
    cy.get('[data-cy="radar-settings-title-field"]').focus()
    cy.get('[data-cy="radar-settings-title-field"]').type('{selectall}{del}')
    cy.get('[data-cy="radar-settings-title-field"]').type('rick sanchez')
    cy.get('[data-cy="radar-settings-close"]').focus()
    cy.get('[data-cy="radar-settings-title-save"]').click()
    cy.get('[data-cy="radar-settings-close"]').click()
    // cy.get('[data-cy="loadingDialog"]').should('not.be.visible') // TODO: check why loading bar does not disappear
    cy.get('[data-cy="app-title"]').should('have.text', 'rick sanchez')
  })

  it('changes levels via settings', () => {
    cy.get('[data-cy="radar-settings-button"]').click()
    cy.get('[data-cy="radar-settings-levels-field-0"]').focus()
    cy.get('[data-cy="radar-settings-levels-field-0"]').type('{selectall}{del}')
    cy.get('[data-cy="radar-settings-levels-field-0"]').type('best')
    cy.get('[data-cy="radar-settings-levels-field-1"]').focus()
    cy.get('[data-cy="radar-settings-levels-field-1"]').type('{selectall}{del}')
    cy.get('[data-cy="radar-settings-levels-field-1"]').type('grandson')
    cy.get('[data-cy="radar-settings-levels-field-2"]').focus()
    cy.get('[data-cy="radar-settings-levels-field-2"]').type('{selectall}{del}')
    cy.get('[data-cy="radar-settings-levels-field-2"]').type('of')
    cy.get('[data-cy="radar-settings-levels-field-3"]').focus()
    cy.get('[data-cy="radar-settings-levels-field-3"]').type('{selectall}{del}')
    cy.get('[data-cy="radar-settings-levels-field-3"]').type('all')
    cy.get('[data-cy="radar-settings-close"]').focus()
    cy.get('[data-cy="radar-settings-levels-save"]').click()
    cy.get('[data-cy="radar-settings-close"]').click()
    cy.get('[data-cy="radarSvg"]').within($form => {
      cy.get('.label-0').should('have.text', 'best')
      cy.get('.label-1').should('have.text', 'grandson')
      cy.get('.label-2').should('have.text', 'of')
      cy.get('.label-3').should('have.text', 'all')
    })
  })

  it('changes categories via settings', () => {
    cy.get('[data-cy="radar-settings-button"]').click()
    cy.get('[data-cy="radar-settings-categories-field-0"]').focus()
    cy.get('[data-cy="radar-settings-categories-field-0"]').type('{selectall}{del}')
    cy.get('[data-cy="radar-settings-categories-field-0"]').type('summer')
    cy.get('[data-cy="radar-settings-categories-field-1"]').focus()
    cy.get('[data-cy="radar-settings-categories-field-1"]').type('{selectall}{del}')
    cy.get('[data-cy="radar-settings-categories-field-1"]').type('ruined')
    cy.get('[data-cy="radar-settings-categories-field-2"]').focus()
    cy.get('[data-cy="radar-settings-categories-field-2"]').type('{selectall}{del}')
    cy.get('[data-cy="radar-settings-categories-field-2"]').type('everything')
    cy.get('[data-cy="radar-settings-categories-field-3"]').focus()
    cy.get('[data-cy="radar-settings-categories-field-3"]').type('{selectall}{del}')
    cy.get('[data-cy="radar-settings-categories-field-3"]').type('today')
    cy.get('[data-cy="radar-settings-close"]').focus()
    cy.get('[data-cy="radar-settings-categories-save"]').click()
    cy.get('[data-cy="radar-settings-close"]').click()
    cy.get('.radarlegend:visible').within($form => {
      cy.get('.radar-legend > .legendCategory.category-0').should('have.text', 'summer')
      cy.get('.radar-legend > .legendCategory.category-1').should('have.text', 'ruined')
      cy.get('.radar-legend > .legendCategory.category-2').should('have.text', 'everything')
      cy.get('.radar-legend > .legendCategory.category-3').should('have.text', 'today')
    })
  })
})
