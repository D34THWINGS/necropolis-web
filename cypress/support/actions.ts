interface Window {
  cheats: {
    injectState(state: unknown): void
    skipAssault(): void
    readyUp(): void
  }
  useTestSeed(): void
}

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    useStateFixture(fixtureName: string): void
    useCheat(method: keyof Omit<Window['cheats'], 'injectState'>): void
    getByTestId(testId: string): Chainable<Element>
    loadPage(url: string): void
    disableAnimations(): void
  }
}

Cypress.Commands.add('useStateFixture', (fixtureName: string) =>
  cy.fixture(fixtureName).then(state => {
    cy.wrap(state).as('stateFixture')
    cy.window().then(win => (win as Window).cheats.injectState(state))
  }),
)

Cypress.Commands.add('useCheat', (method: keyof Omit<Window['cheats'], 'injectState'>) =>
  cy.window().then(win => win.cheats[method]()),
)

Cypress.Commands.add('getByTestId', (testId: string) => cy.get(`[data-test-id="${testId}"]`))

Cypress.Commands.add('disableAnimations', () =>
  cy.window().then(win => win.localStorage.setItem('animationsDisabled', 'true')),
)

Cypress.Commands.add('loadPage', (url: string) =>
  cy.visit(url, {
    onLoad(win) {
      win.useTestSeed()
    },
  }),
)
