// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    assertContains(parentTestId: string, childTestId: string): void
    assertNotContains(parentTestId: string, childTestId: string): void
    assertContainsCount(parentTestId: string, childTestId: string, count: number): void
    assertText(testId: string, text: string): void
    assertWithoutText(testId: string, text: string): void
    assertVisible(testId: string): void
    assertNotExists(testId: string): void
    assertCount(testId: string, count: number): void
  }
}

Cypress.Commands.add('assertCount', (testId: string, count: number) =>
  cy.getByTestId(testId).should('have.length', count),
)

Cypress.Commands.add('assertContainsCount', (parentTestId: string, childTestId: string, count: number) =>
  cy.getByTestId(parentTestId).getByTestId(childTestId).should('have.length', count),
)

Cypress.Commands.add('assertContains', (parentTestId: string, childTestId: string) =>
  cy.getByTestId(parentTestId).getByTestId(childTestId).should('exist'),
)

Cypress.Commands.add('assertNotContains', (parentTestId: string, childTestId: string) =>
  cy.getByTestId(parentTestId).getByTestId(childTestId).should('not.exist'),
)

Cypress.Commands.add('assertNotExists', (testId: string) => cy.getByTestId(testId).should('not.exist'))

Cypress.Commands.add('assertText', (testId: string, text: string) =>
  cy.getByTestId(testId).should('contain.text', text),
)

Cypress.Commands.add('assertWithoutText', (testId: string, text: string) =>
  cy.getByTestId(testId).should('not.contain.text', text),
)

Cypress.Commands.add('assertVisible', (testId: string) => cy.getByTestId(testId).should('be.visible'))
