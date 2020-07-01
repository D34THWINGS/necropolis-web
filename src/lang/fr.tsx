/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { plural } from './i18nHelpers'
import { noBreak, textColor } from '../styles/base'
import { BuildingType, ResourceType, Spell, UndeadTalent, UndeadType } from '../config/constants'
import { TalentIcon } from '../components/talents/TalentIcon'
import { frOnboarding } from './frOnboarding'
import { frExpeditions } from './frExpeditions'
import { frEvents } from './frEvents'
import { ResourceIcon } from '../components/images/ResourceIcon'
import { frMenu } from './frMenu'

export const fr = {
  resetGame: 'Recommencer la partie',
  goToMainMenu: 'Menu principal',
  nextPhase: 'Phase suivante',
  productionPhaseTitle: 'Phase de production',
  productionPhaseDescription: 'Production issue de vos bâtiments\u00A0:',
  productionPhaseNoProduction: 'Vos bâtiments ne produisent aucune resources',
  upkeepPhaseTitle: "Phase d'entretien",
  upkeepPhaseDescription: (meat: number) => (
    <Fragment>
      Votre armée consomme <ResourceIcon type={ResourceType.Meat} text={meat} />.
    </Fragment>
  ),

  buildingNotConstructed: 'Non construit',
  buildingLevel: (level: number) => `Niv. ${level}`,
  cost: <span css={textColor('CYAN')}>Coût&nbsp;:</span>,
  repairBuilding: (
    <Fragment>
      Déblayer le bâtiment
      <br />
      <span css={textColor('CYAN')}>Action</span>
    </Fragment>
  ),

  [BuildingType.CharnelHouse]: 'Charnier',
  charnelHouseDescription: (meat: number, bones: number, turns: number) => (
    <Fragment>
      Produit <ResourceIcon type={ResourceType.Meat} text={meat} /> par tour.
      <br />
      {bones === 0 ? null : (
        <Fragment>
          Produit <ResourceIcon type={ResourceType.Bones} text={bones} /> tous les{' '}
          <span css={textColor('CYAN')}>{turns}</span> tour{plural(turns, 's')}.
        </Fragment>
      )}
    </Fragment>
  ),
  charnelHouseUnlock: (meat: number) => (
    <Fragment>
      Produit <ResourceIcon type={ResourceType.Meat} text={meat} /> par tour.
    </Fragment>
  ),
  charnelHouseUpgrade: (bones: number, turns: number) => (
    <Fragment>
      Produit <ResourceIcon type={ResourceType.Bones} text={bones} /> tous les{' '}
      <span css={textColor('CYAN')}>{turns}</span> tour{plural(turns, 's')}.
    </Fragment>
  ),

  [BuildingType.Catacombs]: 'Catacombes',
  catacombDescription: (current: number, max: number) => (
    <Fragment>
      <span css={textColor('PURPLE')}>Réanimer un mort-vivant</span> ({current}/{max} réanimés).
    </Fragment>
  ),
  catacombUnlock: (
    <Fragment>
      Débloque l&apos;action &quot;<span css={textColor('PURPLE')}>Réanimer un mort</span>&quot;
    </Fragment>
  ),
  catacombUpgrade: (count: number) => (
    <Fragment>
      Permet de réanimer{' '}
      <span css={textColor('PURPLE')}>
        {count} mort-vivant supplémentaire{plural(count, 's')}
      </span>
    </Fragment>
  ),

  [BuildingType.SoulWell]: 'Puit des âmes',
  soulWellDescription: (production: number) => (
    <Fragment>
      Action: <span css={textColor('BLUE')}>Lancer un sort</span>.
      <br />
      Produit <ResourceIcon type={ResourceType.Souls} text={production} /> par tour.
    </Fragment>
  ),
  soulWellUnlock: (souls: number) => (
    <Fragment>
      Produit <ResourceIcon type={ResourceType.Souls} text={souls} /> par tour.
    </Fragment>
  ),
  soulWellUpgradeStorm: (
    <Fragment>
      Débloque le sort &quot;<span css={textColor('BLUE')}>Déluge d&apos;âme</span>&quot;
    </Fragment>
  ),
  soulWellUpgrade: (souls: number) => (
    <Fragment>
      Augmente la production de <ResourceIcon type={ResourceType.Souls} text={souls} /> par tour.
    </Fragment>
  ),

  [BuildingType.Ossuary]: 'Ossuaire',
  ossuaryDescription: <span css={textColor('BLUE')}>Découvrir un Sort</span>,
  ossuaryUnlock: (
    <Fragment>
      Débloque l&apos;action &quot;<span css={textColor('BROWN')}>Découvrir un sort</span>&quot;
    </Fragment>
  ),
  ossuaryUpgrade: (meat: number, bones: number) => (
    <Fragment>
      Découvre <ResourceIcon type={ResourceType.Meat} text={meat} /> et{' '}
      <ResourceIcon type={ResourceType.Bones} text={bones} />.
    </Fragment>
  ),

  [BuildingType.Battlements]: 'Remparts',
  battlementDescription: (defenseBonus: number) => (
    <Fragment>
      Confère <span css={textColor('LIME')}>+{defenseBonus} Défense</span> contre les attaques de paladins.
    </Fragment>
  ),
  battlementUpgrade: (defenseBonus: number) => (
    <Fragment>
      Confère <span css={textColor('LIME')}>+{defenseBonus} Défense</span> contre les attaques de paladins.
    </Fragment>
  ),

  artifact: 'Rune ancienne',
  artifactDescription: (defense: number) => (
    <Fragment>
      Confère <span css={textColor('LIME')}>+{defense}&nbsp;Défense</span>.
    </Fragment>
  ),

  settings: 'Paramètres',
  fullscreen: 'Plein écran',

  undeadOverlayTitle: 'Morts-vivants',
  undeadUpkeep: 'Consomation par tour :\u00A0',
  talentsTotal: 'Total talents\u00A0:\u00A0',
  undeadName: (type: UndeadType) => {
    switch (type) {
      case UndeadType.Valet:
        return 'Valet'
      case UndeadType.Brikoler:
        return "Jan Brik'Holeur"
      case UndeadType.LaMotte:
        return 'Sir de la Motte'
      case UndeadType.Skeleton:
        return 'Squelette'
      case UndeadType.BloodPrince:
        return 'Prince de Sang-Séché'
      default:
        return ''
    }
  },
  undeadTalents: 'Talents :',
  undeadAbility: 'Capacité :',
  valetAbility: "obtient +1 dans 1 Talent aléatoire à chaque fin d'Excursion.",
  brikolerAbility: 'aucune.',
  laMotteAbility: (defense: number) => (
    <Fragment>
      confère <span css={textColor('LIME')}>+{defense}&nbsp;Défense</span>.
    </Fragment>
  ),
  skeletonAbility: (
    <Fragment>
      ne consomme pas de <ResourceIcon type={ResourceType.Meat} />.
    </Fragment>
  ),
  bloodPrinceAbility: 'inconnue.',
  reanimatedUndeadTitle: 'Réanimation',
  reanimatedUndeadOk: 'Ok',

  talentsTitle: 'Talents',
  talentsDescription: 'Les talents sont des caractéristiques nécessaires aux excursions et à certains événements.',
  [UndeadTalent.Muscles]: (
    <Fragment>
      <span css={textColor('CYAN')}>Musculation&nbsp;:</span>&nbsp;Casser ou soulever des choses
    </Fragment>
  ),
  [UndeadTalent.Lethality]: (
    <Fragment>
      <span css={textColor('CYAN')}>Létalité&nbsp;:</span>&nbsp;Tuer des ennemis. Inefficace contre les paladins.
    </Fragment>
  ),

  turns: 'Tours de jeu',
  turnsEventSpacing: (turnSpacing: number) => (
    <Fragment>
      Un évènement aléatoire a lieu tous les <span css={textColor('CYAN')}>{turnSpacing}</span> tours.
    </Fragment>
  ),
  turnsNextEvent: (nextEventIn: number) => (
    <Fragment>
      <span css={textColor('CYAN')}>Prochain évènement dans :</span> {nextEventIn} tour.
    </Fragment>
  ),
  skipTurn: 'Passer le tour',

  paladins: (strengthIncrement: number, turns: number) => (
    <Fragment>
      Les paladins du coin attaquent régulièrement la Nécropole. La <span css={textColor('RED')}>force</span> de leurs
      assauts augmente de <span css={textColor('RED')}>{strengthIncrement}</span> tous les{' '}
      <span css={textColor('CYAN')}>{turns}</span> tours.
    </Fragment>
  ),
  paladinsStrength: (strength: number) => `Force\u00A0: ${strength}`,
  currentDefense: (defense: number) => `Defense\u00A0: ${defense}`,

  upkeepTitle: 'Ravitaillement',
  upkeepInsufficient: (upkeep: number, meat: number) => (
    <Fragment>
      Votre armée consomme trop de{' '}
      <span css={textColor('RED')}>
        <ResourceIcon type={ResourceType.Meat} />
        &nbsp;({upkeep}/{meat})
      </span>
      . Des sacrifices sont nécessaires pour continuer.
    </Fragment>
  ),

  spells: 'Sorts',
  spellName: (type: Spell) => {
    switch (type) {
      case Spell.SoulStorm:
        return 'Déluge des âmes'
      case Spell.TheKey:
        return 'La clé'
      default:
        throw new Error('Unknown spell')
    }
  },
  soulStormDescription: (defenseBonus: number, lethalityBonus: number) => (
    <Fragment>
      Confère <span css={textColor('LIME')}>+{defenseBonus}&nbsp;défense</span> et{' '}
      <TalentIcon type={UndeadTalent.Lethality} size="1.2rem" text={`+${lethalityBonus}`} /> pour le combat en cours.
    </Fragment>
  ),
  theKeyDescription: 'Ouvre tout type de porte.',

  discoverSpellTitle: 'Découverte',
  discoverSpellOk: 'Ok',

  sacrificeRequiredTitle: 'Choix des pertes',
  sacrificeRequiredDescription: (undeads: number) => (
    <Fragment>
      Vous devez choisir{' '}
      <span css={[noBreak, textColor('PURPLE')]}>
        {undeads} Mort-vivant{plural(undeads, 's')}
      </span>{' '}
      qui {plural(undeads, 'doivent', 'doit')} mourir.
    </Fragment>
  ),

  gameLost: 'La Faucheuse a enfin récolté votre âme désespérée !',
  gameRetry: 'Recommencer',
  gameWon:
    // eslint-disable-next-line max-len
    'Vous l’avez fait, atteindre la prospérité\u00A0! Il ne vous reste plus qu’à profiter de la vie jusqu’à la fin des temps...',

  ...frOnboarding,
  ...frExpeditions,
  ...frEvents,
  ...frMenu,
}

export type TranslationBundle = typeof fr
export type TranslationKey = keyof TranslationBundle
