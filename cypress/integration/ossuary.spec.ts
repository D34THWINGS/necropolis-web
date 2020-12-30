describe('Ossuary', () => {
  it('should allow buying of secrets', () => {
    cy.loadPage('/')
    cy.useStateFixture('cheatedSetup')
    cy.getByTestId('continueGameButton').click()
    cy.assertText('bonesCounter', '100')

    cy.getByTestId('buildingLink').eq(3).click()
    cy.getByTestId('buildingActionButton').click()
    cy.getByTestId('nextPhaseButton').click()
    cy.assertNotExists('productionCell')

    cy.getByTestId('nextPhaseButton').click()
    cy.getByTestId('acknowledgeEventButton').click()
    cy.assertCount('buildingShopRow', 3)

    cy.getByTestId('buildingShopRowButton').eq(0).click()
    cy.assertText('bonesCounter', '97')
    cy.assertCount('buildingShopRow', 2)

    cy.getByTestId('spellsButton').click()
    cy.assertCount('spellBox', 1)

    cy.getByTestId('modalCloseButton').click()
    cy.getByTestId('nextPhaseButton').click().click()
    cy.window().then(win => win.skipAssault())
    cy.assertCount('buildingShopRow', 3)
    cy.getByTestId('buildingShopRow').eq(0).should('contain.text', 'Déluge des âmes')

    cy.getByTestId('spellsButton').click()
    cy.getByTestId('castSpellButton').click()
    cy.getByTestId('buildingShopRow').eq(0).should('contain.text', 'Restauration')
  })
})
