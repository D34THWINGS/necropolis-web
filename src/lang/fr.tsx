import React, { ReactNode } from 'react'
import { plural } from './i18nHelpers'
import { noBreak, textColor } from '../styles/base'
import { BuildingType, LA_MOTTE_DEFENSE_BONUS, ResourceType, UndeadTalent, UndeadType } from '../config/constants'
import { TalentIcon } from '../components/talents/TalentIcon'
import { frOnboarding } from './frOnboarding'
import { frExpeditions } from './frExpeditions'
import { frEvents } from './frEvents'
import { ResourceIcon } from '../components/resources/ResourceIcon'
import { frMenu } from './frMenu'

const undeadAbilities: Record<UndeadType, ReactNode> = {
  [UndeadType.Valet]: "obtient +1 dans 1 Talent aléatoire à chaque fin d'Excursion.",
  [UndeadType.Brikoler]: 'aucune.',
  [UndeadType.LaMotte]: (
    <>
      confère <span css={textColor('LIME')}>+{LA_MOTTE_DEFENSE_BONUS}&nbsp;Défense</span>.
    </>
  ),
  [UndeadType.Skeleton]: (
    <>
      ne consomme pas de <ResourceIcon type={ResourceType.Meat} />.
    </>
  ),
  [UndeadType.BloodPrince]: 'inconnue.',
}

const undeadTalent: Record<UndeadTalent, ReactNode> = {
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
  [UndeadTalent.Dexterity]: (
    <>
      <span css={textColor('CYAN')}>Dextérité&nbsp;:</span>&nbsp;Se faufiler, escalader, crocheter.
    </>
  ),
  [UndeadTalent.Necromancy]: (
    <>
      <span css={textColor('CYAN')}>Subjugation&nbsp;:</span>&nbsp;Manipuler les esprits faibles.
    </>
  ),
  [UndeadTalent.Subjugation]: (
    <>
      <span css={textColor('CYAN')}>Subjugation&nbsp;:</span>&nbsp;Manipuler les esprits faibles.
    </>
  ),
}

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
  buildingUpgrade: 'Amélioration',

  [BuildingType.CharnelHouse]: 'Charnier',
  charnelHouseDescription: (meat: number) => (
    <>
      Produit <ResourceIcon type={ResourceType.Meat} text={meat} /> par tour.
    </>
  ),
  charnelHouseUnlock: (meat: number) => (
    <>
      Produit <ResourceIcon type={ResourceType.Meat} text={meat} /> par tour.
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
  ossuaryDescription: <span css={textColor('BLUE')}>Apprendre un secret</span>,
  ossuaryUnlock: (
    <>
      Permet d&apos;apprendre des secrets auprès d&apos;Omniscience en échange d&apos;
      <span css={textColor('BROWN')}>Ossements</span>
      <ResourceIcon type={ResourceType.Bones} marginLeft="0.3rem" />.
    </>
  ),
  ossuaryUpgrade: (secretsAmount: number) => (
    <>
      <span css={textColor('BROWN')}>+{secretsAmount} Secrets</span> à apprendre à chaque arrivage.
    </>
  ),
  ossuaryDiscount: (discount: number) => (
    <>
      Réduit le prix des secrets de <span css={textColor('BROWN')}>{discount}%</span> arrondi au supérieur
    </>
  ),

  [BuildingType.Arsenal]: 'Arsenal',
  arsenalDescription: (trapsAmount: number) => (
    <>
      <span css={textColor('LIME')}>{trapsAmount} Piège</span> par assaut.
    </>
  ),
  arsenalUpgrade: (trapsAmount: number) => (
    <>
      <span css={textColor('LIME')}>{trapsAmount} Piège</span> par assaut.
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
  undeadAbility: 'Capacité :',
  undeadAbilityDescription: (type: UndeadType) => undeadAbilities[type],
  reanimatedUndeadTitle: 'Réanimation',
  reanimatedUndeadOk: 'Ok',

  talentsTitle: 'Talents',
  talentsDescription: 'Les talents sont des caractéristiques nécessaires aux excursions et à certains événements.',
  talentDetails: (talent: UndeadTalent) => undeadTalent[talent],

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
  soulStormLabel: 'Déluge des âmes',
  soulStormDescription: (lethalityBonus: number) => (
    <>
      Confère <TalentIcon type={UndeadTalent.Lethality} size="1.2rem" text={`+${lethalityBonus}`} /> pour le combat en
      cours.
    </>
  ),
  theKeyLabel: 'La clé',
  theKeyDescription: 'Ouvre tout type de porte.',
  predictionLabel: 'Prédiction',
  predictionDescription: "Révèle les 4 premiers paladins de l'assaut",
  restorationLabel: 'Restauration',
  restorationDescription: (healAmount: number) => (
    <>
      Soigne {healAmount}&nbsp;PVs et guérit de la <span css={textColor('PURPLE')}>Maladie</span> 1&nbsp;Mort-Vivant.
    </>
  ),

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
