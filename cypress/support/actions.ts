// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    useStateFixture(fixtureName: string): void
    getByTestId(testId: string): Chainable<Element>
    loadPage(url: string): void
  }
}

interface Window {
  injectState(state: unknown): void
  useTestSeed(): void
}

Cypress.Commands.add('useStateFixture', (fixtureName: string) =>
  cy.fixture(fixtureName).then(state => {
    cy.wrap(state).as('stateFixture')
    cy.window().then(win => (win as Window).injectState(state))
  }),
)

Cypress.Commands.add('getByTestId', (testId: string) => cy.get(`[data-test-id="${testId}"]`))

Cypress.Commands.add('loadPage', (url: string) =>
  cy.visit(url, {
    onLoad(win) {
      win.useTestSeed()
    },
  }),
)
