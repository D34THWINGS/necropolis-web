describe('Catacombs', () => {
  it('should allow to raise undeads after upgrading', () => {
    cy.loadPage('/')
    cy.useStateFixture('cheatedSetup')
    cy.getByTestId('continueGameButton').click()
    cy.assertText('soulsCounter', '100')

    cy.getByTestId('buildingLink').eq(2).click()
    cy.getByTestId('buildingActionButton').click()
    cy.assertText('undeadUpKeep', '1')

    cy.getByTestId('nextPhaseButton').click()
    cy.assertNotExists('productionCell')

    cy.getByTestId('nextPhaseButton').click()
    cy.getByTestId('acknowledgeEventButton').click()
    cy.assertCount('buildingShopRow', 3)

    cy.getByTestId('buildingShopRowButton').eq(1).click()
    cy.assertText('soulsCounter', '97')
    cy.assertCount('buildingShopRow', 2)
    cy.assertText('undeadUpKeep', '2')

    cy.getByTestId('nextPhaseButton').click().click()
    cy.useCheat('skipAssault')
    cy.assertCount('buildingShopRow', 3)
  })
})
