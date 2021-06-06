describe('Setup run', () => {
  it('should handle basic activities until first paladins assault', () => {
    cy.loadPage('/')
    cy.getByTestId('newGameButton').click()
    cy.getByTestId('startGameButton').click()
    cy.getByTestId('expeditionsLink').click()
    cy.getByTestId('expeditionMarker').eq(0).click()
    cy.getByTestId('beginExpeditionButton').click()
    cy.getByTestId('expeditionActionButton').eq(1).click()
    cy.getByTestId('undeadTab').click()
    cy.getByTestId('addUndeadToObstacleButton').click()
    cy.getByTestId('rollDicesButton').click()
    cy.getByTestId('applyConsequencesButton').click()
    cy.getByTestId('undeadTab').click()
    cy.assertContainsCount('undeadHealth', 'missingHealthPoint', 1)
    cy.getByTestId('obstacleRow').click()
    cy.getByTestId('rollDicesButton').click()
    cy.getByTestId('showObstacleRewardButton').click()
    cy.getByTestId('endObstacleButton').click()
    cy.getByTestId('expeditionActionButton').eq(1).click()
    cy.getByTestId('endExpeditionButton').click()
    cy.getByTestId('nextPhaseButton').click().click()
    cy.getByTestId('acknowledgeEventButton').click()
    cy.getByTestId('onboardingNextStepButton').click()
    cy.getByTestId('mainHubLink').click()
    cy.getByTestId('buildingLink').eq(4).click()
    cy.getByTestId('buildingActionButton').click()
    cy.getByTestId('nextPhaseButton').click().click()
    cy.assertVisible('startPaladinAssaultButton')
  })
})
