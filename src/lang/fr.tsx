import React, { Fragment, ReactNode } from 'react'
import { plural } from './i18nHelpers'
import { noBreak, textColor } from '../styles/base'
import { BuildingType, ResourceType, Spell, UndeadTalent, UndeadType } from '../config/constants'
import { TalentIcon } from '../components/talents/TalentIcon'
import { frOnboarding } from './frOnboarding'
import { frExpeditions } from './frExpeditions'
import { frEvents } from './frEvents'
import { ResourceIcon } from '../components/resources/ResourceIcon'
import { frMenu } from './frMenu'

export const fr = {
  rip: 'Argh!',
  resetGame: 'Recommencer la partie',
  goToMainMenu: 'Menu principal',
  nextPhase: 'Phase suivante',
  productionPhaseTitle: 'Phase de production',
  productionPhaseDescription: 'Production issue de vos bâtiments\u00A0:',
  productionPhaseNoProduction: 'Vos bâtiments ne produisent aucune resources',
  upkeepPhaseTitle: 'Phase de ravitaillement',
  upkeepPhaseDescription: (meat: number) => (
    <>
      Votre armée consomme <ResourceIcon type={ResourceType.Meat} text={meat} />.
    </>
  ),

  buildingNotConstructed: 'Non construit',
  buildingLevel: (level: number) => `Niv. ${level}`,
  cost: <span css={textColor('CYAN')}>Coût&nbsp;:</span>,
  repairBuilding: (
    <>
      Déblayer le bâtiment
      <br />
      <span css={textColor('CYAN')}>Action</span>
    </>
  ),

  [BuildingType.CharnelHouse]: 'Charnier',
  charnelHouseDescription: (meat: number, bones: number, turns: number) => (
    <>
      Produit <ResourceIcon type={ResourceType.Meat} text={meat} /> par tour.
      <br />
      {bones === 0 ? null : (
        <>
          Produit <ResourceIcon type={ResourceType.Bones} text={bones} /> tous les{' '}
          <span css={textColor('CYAN')}>{turns}</span> tour{plural(turns, 's')}.
        </>
      )}
    </>
  ),
  charnelHouseUnlock: (meat: number) => (
    <>
      Produit <ResourceIcon type={ResourceType.Meat} text={meat} /> par tour.
    </>
  ),
  charnelHouseUpgrade: (bones: number, turns: number) => (
    <>
      Produit <ResourceIcon type={ResourceType.Bones} text={bones} /> tous les{' '}
      <span css={textColor('CYAN')}>{turns}</span> tour{plural(turns, 's')}.
    </>
  ),

  [BuildingType.Catacombs]: 'Catacombes',
  catacombDescription: (current: number, max: number) => (
    <>
      <span css={textColor('PURPLE')}>Réanimer un mort-vivant</span> ({current}/{max} réanimés).
    </>
  ),
  catacombUnlock: (
    <>
      Débloque l&apos;action &quot;<span css={textColor('PURPLE')}>Réanimer un mort</span>&quot;
    </>
  ),
  catacombUpgrade: (count: number) => (
    <>
      Permet de réanimer{' '}
      <span css={textColor('PURPLE')}>
        {count} mort-vivant supplémentaire{plural(count, 's')}
      </span>
    </>
  ),

  [BuildingType.SoulWell]: 'Puit des âmes',
  soulWellDescription: (production: number) => (
    <>
      Action: <span css={textColor('BLUE')}>Lancer un sort</span>.
      <br />
      Produit <ResourceIcon type={ResourceType.Souls} text={production} /> par tour.
    </>
  ),
  soulWellUnlock: (souls: number) => (
    <>
      Produit <ResourceIcon type={ResourceType.Souls} text={souls} /> par tour.
    </>
  ),
  soulWellUpgradeStorm: (
    <>
      Débloque le sort &quot;<span css={textColor('BLUE')}>Déluge d&apos;âme</span>&quot;
    </>
  ),
  soulWellUpgrade: (souls: number) => (
    <>
      Augmente la production de <ResourceIcon type={ResourceType.Souls} text={souls} /> par tour.
    </>
  ),

  [BuildingType.Ossuary]: 'Ossuaire',
  ossuaryDescription: <span css={textColor('BLUE')}>Découvrir un Sort</span>,
  ossuaryUnlock: (
    <>
      Débloque l&apos;action &quot;<span css={textColor('BROWN')}>Découvrir un sort</span>&quot;
    </>
  ),
  ossuaryUpgrade: (meat: number, bones: number) => (
    <>
      Découvre <ResourceIcon type={ResourceType.Meat} text={meat} /> et{' '}
      <ResourceIcon type={ResourceType.Bones} text={bones} />.
    </>
  ),

  [BuildingType.Battlements]: 'Remparts',
  battlementDescription: (defenseBonus: number) => (
    <>
      Confère <span css={textColor('LIME')}>+{defenseBonus} Défense</span> contre les attaques de paladins.
    </>
  ),
  battlementUpgrade: (defenseBonus: number) => (
    <>
      Confère <span css={textColor('LIME')}>+{defenseBonus} Défense</span> contre les attaques de paladins.
    </>
  ),

  artifact: 'Rune ancienne',
  artifactDescription: (defense: number) => (
    <>
      Confère <span css={textColor('LIME')}>+{defense}&nbsp;Défense</span>.
    </>
  ),

  settings: 'Paramètres',
  fullscreen: 'Plein écran',

  undeadOverlayTitle: 'Morts-vivants',
  undeadUpkeep: 'Consomation par tour :\u00A0',
  upkeepNoMeat: (
    <>
      La famine emporte vos citoyens. Sans entretien, la cité tombe rapidement en désuétude, et vous mourrez peu de
      temps après de désespoir.
    </>
  ),
  upkeepConfirm: 'Continuer',
  talentsTotal: 'Total talents\u00A0:\u00A0',
  confirmUndeadBan: (name: ReactNode) => (
    <>
      Renvoyer <span css={textColor('PURPLE')}>{name}</span>
    </>
  ),
  confirmUndeadSacrifice: (name: ReactNode) => (
    <>
      Sacrifier <span css={textColor('PURPLE')}>{name}</span>
    </>
  ),
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
    <>
      confère <span css={textColor('LIME')}>+{defense}&nbsp;Défense</span>.
    </>
  ),
  skeletonAbility: (
    <>
      ne consomme pas de <ResourceIcon type={ResourceType.Meat} />.
    </>
  ),
  bloodPrinceAbility: 'inconnue.',
  reanimatedUndeadTitle: 'Réanimation',
  reanimatedUndeadOk: 'Ok',

  talentsTitle: 'Talents',
  talentsDescription: 'Les talents sont des caractéristiques nécessaires aux excursions et à certains événements.',
  [UndeadTalent.Muscles]: (
    <>
      <span css={textColor('CYAN')}>Musculation&nbsp;:</span>&nbsp;Casser ou soulever des choses
    </>
  ),
  [UndeadTalent.Lethality]: (
    <>
      <span css={textColor('CYAN')}>Létalité&nbsp;:</span>&nbsp;Tuer des ennemis. Inefficace contre les paladins.
    </>
  ),

  resourcesTitle: 'Resources',
  resourcesDescription: "Les resources sont nécessaires pour l'expension de la Nécropole",
  [ResourceType.Materials]: (
    <>
      <span css={textColor('CYAN')}>Matériaux&nbsp;:</span>&nbsp;Servent à la construction et l&apos;amélioration des
      bâtiments.
    </>
  ),
  [ResourceType.Meat]: (
    <>
      <span css={textColor('CYAN')}>Chair&nbsp;:</span>&nbsp;Nourrie votre armée.
    </>
  ),
  [ResourceType.Souls]: (
    <>
      <span css={textColor('CYAN')}>Âmes&nbsp;:</span>&nbsp;Permettent de lancer des sorts.
    </>
  ),
  [ResourceType.Bones]: (
    <>
      <span css={textColor('CYAN')}>Ossements&nbsp;:</span>&nbsp;Utilisés pour découvrir de nouveaux sort et parfois
      lors des excursions.
    </>
  ),

  turns: 'Tours de jeu',
  turnsEventSpacing: (turnSpacing: number) => (
    <>
      Un évènement aléatoire a lieu tous les <span css={textColor('CYAN')}>{turnSpacing}</span> tours.
    </>
  ),
  turnsNextEvent: (nextEventIn: number) => (
    <>
      <span css={textColor('CYAN')}>Prochain évènement dans :</span> {nextEventIn} tour.
    </>
  ),
  skipTurn: 'Passer le tour',

  paladins: (strengthIncrement: number, turns: number) => (
    <>
      Les paladins du coin attaquent régulièrement la Nécropole. La <span css={textColor('RED')}>force</span> de leurs
      assauts augmente de <span css={textColor('RED')}>{strengthIncrement}</span> tous les{' '}
      <span css={textColor('CYAN')}>{turns}</span> tours.
    </>
  ),
  paladinsStrength: (strength: number) => `Force\u00A0: ${strength}`,
  currentDefense: (defense: number) => `Defense\u00A0: ${defense}`,

  upkeepTitle: 'Ravitaillement',
  upkeepInsufficient: (upkeep: number, meat: number) => (
    <>
      Votre armée consomme trop de{' '}
      <span css={textColor('RED')}>
        <ResourceIcon type={ResourceType.Meat} />
        &nbsp;({upkeep}/{meat})
      </span>
      . Des sacrifices sont nécessaires pour continuer.
    </>
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
    <>
      Confère <span css={textColor('LIME')}>+{defenseBonus}&nbsp;défense</span> et{' '}
      <TalentIcon type={UndeadTalent.Lethality} size="1.2rem" text={`+${lethalityBonus}`} /> pour le combat en cours.
    </>
  ),
  theKeyDescription: 'Ouvre tout type de porte.',

  discoverSpellTitle: 'Découverte',
  discoverSpellOk: 'Ok',

  sacrificeRequiredTitle: 'Choix des pertes',
  sacrificeRequiredDescription: (undeads: number) => (
    <>
      Vous devez choisir{' '}
      <span css={[noBreak, textColor('PURPLE')]}>
        {undeads} Mort-vivant{plural(undeads, 's')}
      </span>{' '}
      qui {plural(undeads, 'doivent', 'doit')} mourir.
    </>
  ),

  gameLost: 'La Faucheuse a enfin récolté votre âme désespérée !',
  gameLostAssault: 'La Faucheuse a enfin récolté votre âme meurtrie.',
  gameLostBastion: 'La Faucheuse a enfin récolté votre âme asservie.',
  gameRetry: 'Recommencer',
  gameWon:
    // eslint-disable-next-line max-len
    'Vous l’avez fait, atteindre la prospérité\u00A0! Il ne vous reste plus qu’à profiter de la vie jusqu’à la fin des temps...',

  errorTitle: 'Oops :(',
  errorMessage: (
    <>
      Il semblerait qu&apos;un incident fâcheux soit survenu. Si vous rencontrez souvent des soucis avec le jeu, merci
      de nous{' '}
      <a css={textColor('LIGHT_BLUE')} href="mailto:thefallenworld@gmail.com">
        contacter
      </a>
      .
    </>
  ),
  reload: 'Recharger',
  reset: 'Ré-initialiser la partie',

  ...frOnboarding,
  ...frExpeditions,
  ...frEvents,
  ...frMenu,
}

export type TranslationBundle = typeof fr
export type TranslationKey = keyof TranslationBundle
