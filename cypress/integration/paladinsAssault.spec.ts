const assaultSetup = (fixtureName: string) => {
  cy.loadPage('/')
  cy.disableAnimations()
  cy.useStateFixture(fixtureName)
  cy.getByTestId('continueGameButton').click()
}

describe('Paladins assault', () => {
  it('Run full assault', () => {
    cy.loadPage('/')
    cy.disableAnimations()
    cy.useStateFixture('paladinAssaultSetup')
    cy.getByTestId('continueGameButton').click()
    cy.assertContainsCount('paladinsDeck', 'paladinRevealedCard', 1)
    cy.assertContainsCount('paladinsDeck', 'paladinHiddenCard', 6)
    cy.assertText('paladinRevealedCard', 'Soigneur')

    cy.getByTestId('beginPreparePhaseButton').click()
    cy.getByTestId('availableTrapButton').eq(0).click().click().click()
    cy.getByTestId('availableTrapButton').eq(1).click().click().click()
    cy.getByTestId('availableTrapButton').eq(2).click().click()
    cy.getByTestId('beginFightPhaseButton').click()
    cy.assertText('paladinName', 'Commandant')

    cy.assertText('paladinCardsCounter', '1\u00A0/\u00A07')
    cy.getByTestId('useTrapButton').eq(3).click()
    cy.assertText('paladinName', 'Commandant')
    cy.assertText('paladinCardsCounter', '2\u00A0/\u00A07')

    cy.getByTestId('useTrapButton').eq(6).click()
    cy.getByTestId('targetCategoryButton').eq(1).click()
    cy.getByTestId('categoryChangeSubmit').click()
    cy.assertText('paladinCardsCounter', '3\u00A0/\u00A07')
    cy.assertText('paladinName', 'Soigneur')
    cy.assertContainsCount('paladinHealth', 'remainingHealthPoint', 2)
    cy.assertContainsCount('paladinHealth', 'missingHealthPoint', 0)

    cy.getByTestId('useTrapButton').eq(3).click()
    cy.assertText('paladinCardsCounter', '4\u00A0/\u00A07')
    cy.assertText('structureHealthCounter', '8\u00A0/\u00A08')
    cy.assertText('paladinName', 'Avant-Garde')
    cy.assertText('paladinDamages', '2')
    cy.assertContainsCount('paladinHealth', 'remainingHealthPoint', 2)
    cy.assertContainsCount('paladinHealth', 'extraHealthPoint', 1)
    cy.assertContainsCount('paladinHealth', 'missingHealthPoint', 0)

    cy.getByTestId('useTrapButton').eq(0).click()
    cy.getByTestId('useTrapButton').eq(0).click()
    cy.assertText('paladinCardsCounter', '5\u00A0/\u00A07')
    cy.assertText('paladinName', 'Vengeur')
    cy.assertText('paladinDamages', '2')
    cy.assertContainsCount('paladinHealth', 'remainingHealthPoint', 2)
    cy.assertContainsCount('paladinHealth', 'missingHealthPoint', 0)

    cy.getByTestId('useTrapButton').eq(0).click()
    cy.assertText('paladinCardsCounter', '6\u00A0/\u00A07')
    cy.assertText('structureHealthCounter', '6\u00A0/\u00A08')
    cy.assertText('paladinName', 'Enchanteur')
    cy.assertText('paladinDamages', '2')
    cy.assertContainsCount('paladinHealth', 'remainingHealthPoint', 1)
    cy.assertContainsCount('paladinHealth', 'missingHealthPoint', 0)

    cy.getByTestId('useTrapButton').eq(0).click()
    cy.assertText('paladinCardsCounter', '7\u00A0/\u00A07')
    cy.assertText('paladinName', 'Soigneur')
    cy.assertText('paladinDamages', '2')
    cy.assertContainsCount('paladinHealth', 'remainingHealthPoint', 1)
    cy.assertContainsCount('paladinHealth', 'missingHealthPoint', 1)

    cy.getByTestId('skipPaladinButton').click()
    cy.assertText('killedPaladins', '6\u00A0/\u00A07')
    cy.assertText('remainingStructureHealth', '4\u00A0/\u00A08')

    cy.getByTestId('endPaladinAssaultButton').click()
  })

  it('Wizard should buff 3 paladins', () => {
    assaultSetup('paladinAssaultWizard')
    cy.assertText('paladinName', 'Enchanteur')

    cy.getByTestId('useTrapButton').eq(3).click()
    cy.assertText('paladinName', 'Avant-Garde')
    cy.assertText('paladinDamages', '3')

    cy.getByTestId('useTrapButton').eq(0).click()
    cy.assertText('paladinCardsCounter', '3\u00A0/\u00A05')
    cy.assertText('paladinDamages', '3')

    cy.getByTestId('useTrapButton').eq(0).click()
    cy.assertText('paladinCardsCounter', '4\u00A0/\u00A05')
    cy.assertText('paladinDamages', '3')

    cy.getByTestId('useTrapButton').eq(0).click()
    cy.assertText('paladinCardsCounter', '5\u00A0/\u00A05')
    cy.assertText('paladinDamages', '2')
  })

  it('Guardian should shield 1 paladin', () => {
    assaultSetup('paladinAssaultGuardian')
    cy.assertText('paladinName', 'Gardien')

    cy.getByTestId('useTrapButton').eq(3).click()
    cy.assertText('paladinName', 'Dreadnought')
    cy.assertText('paladinAbility', 'Bouclier')

    cy.getByTestId('useTrapButton').eq(0).click()
    cy.getByTestId('useTrapButton').eq(0).click()
    cy.assertText('paladinName', 'Dreadnought')
    cy.assertWithoutText('paladinAbility', 'Bouclier')
  })

  it('Provost should purify 1 paladin', () => {
    assaultSetup('paladinAssaultProvost')
    cy.assertText('paladinName', 'Prévot')

    cy.getByTestId('useTrapButton').eq(3).click()
    cy.assertText('paladinName', 'Avant-Garde')
    cy.assertContains('paladinType', 'physical')
    cy.assertContains('paladinType', 'ethereal')
    cy.assertNotContains('paladinType', 'magical')
    cy.assertNotContains('paladinType', 'pure')
    cy.assertContainsCount('paladinHealth', 'remainingHealthPoint', 1)

    cy.getByTestId('useTrapButton').eq(0).click()
    cy.assertText('paladinName', 'Avant-Garde')
    cy.assertText('paladinCardsCounter', '3\u00A0/\u00A03')
    cy.assertContains('paladinType', 'physical')
    cy.assertContains('paladinType', 'magical')
  })

  it('Healer should add health to 1 paladin', () => {
    assaultSetup('paladinAssaultHealer')
    cy.assertText('paladinName', 'Soigneur')

    cy.getByTestId('useTrapButton').eq(0).click()
    cy.assertText('paladinName', 'Avant-Garde')
    cy.assertContainsCount('paladinHealth', 'extraHealthPoint', 1)
    cy.assertContainsCount('paladinHealth', 'remainingHealthPoint', 2)
    cy.assertContainsCount('paladinHealth', 'missingHealthPoint', 0)

    cy.getByTestId('useTrapButton').eq(2).click()
    cy.assertText('paladinName', 'Avant-Garde')
    cy.assertContainsCount('paladinHealth', 'remainingHealthPoint', 2)
    cy.assertContainsCount('paladinHealth', 'missingHealthPoint', 0)
  })

  it('Loose if no structure health remaining', () => {
    assaultSetup('paladinAssaultLoose')
    cy.assertText('paladinName', 'Dreadnought')

    cy.getByTestId('skipPaladinButton').click()
    cy.getByTestId('endPaladinAssaultButton').click()
    cy.assertVisible('gameLostScreen')
  })

  it('Soul storm should apply up to 4 damages to paladins', () => {
    assaultSetup('paladinAssaultSoulStorm')

    cy.getByTestId('spellsButton').click()
    cy.getByTestId('castSpellButton').eq(0).click()
    cy.assertText('paladinCardsCounter', '3\u00A0/\u00A06')
    cy.assertContainsCount('paladinHealth', 'missingHealthPoint', 1)

    cy.useCheat('readyUp')
    cy.getByTestId('spellsButton').click()
    cy.getByTestId('castSpellButton').eq(0).click()
    cy.assertText('paladinCardsCounter', '5\u00A0/\u00A06')
    cy.assertContainsCount('paladinHealth', 'missingHealthPoint', 1)

    cy.useCheat('readyUp')
    cy.getByTestId('spellsButton').click()
    cy.getByTestId('castSpellButton').eq(0).click()
    cy.assertText('paladinCardsCounter', '6\u00A0/\u00A06')
  })

  it('Restoration should repair structure', () => {
    assaultSetup('paladinAssaultRestoration')

    cy.getByTestId('useTrapButton').eq(0).click()
    cy.assertText('structureHealthCounter', '6\u00A0/\u00A08')

    cy.getByTestId('spellsButton').click()
    cy.getByTestId('castSpellButton').eq(0).click()
    cy.assertText('structureHealthCounter', '8\u00A0/\u00A08')
  })

  it('Prediction should reveal first 3 unrevealed paladins', () => {
    cy.loadPage('/')
    cy.useStateFixture('paladinAssaultPrediction')
    cy.getByTestId('continueGameButton').click()
    cy.assertContainsCount('paladinsDeck', 'paladinRevealedCard', 1)
    cy.assertContainsCount('paladinsDeck', 'paladinHiddenCard', 6)

    cy.getByTestId('spellsButton').click()
    cy.getByTestId('castSpellButton').eq(0).click()
    cy.assertContainsCount('paladinsDeck', 'paladinRevealedCard', 4)
    cy.assertContainsCount('paladinsDeck', 'paladinHiddenCard', 3)

    cy.getByTestId('beginPreparePhaseButton').click()
    cy.getByTestId('availableTrapButton').eq(0).click().click().click()
    cy.getByTestId('availableTrapButton').eq(1).click()
    cy.getByTestId('beginFightPhaseButton').click()
    cy.assertNotExists('spellsButton')
  })

  it('The Key should break shield and deal 3 damages', () => {
    assaultSetup('paladinAssaultTheKey')
    cy.getByTestId('spellsButton').click()
    cy.getByTestId('castSpellButton').eq(0).click()
    cy.assertText('killedPaladins', '1\u00A0/\u00A01')
  })

  it('Valet should break shield and deal 3 damages', () => {
    assaultSetup('paladinAssaultValet')
    cy.getByTestId('undeadDetailsButton').click()
    cy.getByTestId('useUndeadAbilityButton').click()
    cy.assertText('killedPaladins', '1\u00A0/\u00A01')
  })
})
