import React, { ReactNode } from 'react'
import { plural } from './i18nHelpers'
import { noBreak, textColor } from '../styles/base'
import { BuildingType, PaladinCategory, ResourceType, UndeadTalent, UndeadType } from '../config/constants'
import { TalentIcon } from '../components/talents/TalentIcon'
import { frOnboarding } from './frOnboarding'
import { frExpeditions } from './frExpeditions'
import { frEvents } from './frEvents'
import { ResourceIcon } from '../components/resources/ResourceIcon'
import { frMenu } from './frMenu'
import { HealthPoint } from '../components/images/HealthPoint'
import trapDamageIcon from '../assets/images/traps/trap-damages.png'
import paladinDamageIcon from '../assets/images/paladins/paladin-damage.png'
import { Image } from '../components/images/Image'
import { DamageCategories } from '../components/images/DamageCategories'
import structurePointsIcon from '../assets/images/paladins/structure-points.png'
import hpCostIcon from '../assets/images/icons/hp-cost.png'

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
      <span css={textColor('CYAN')}>Nécromancie&nbsp;:</span>&nbsp;Déchiffrer des savoirs impies, accomplir des rituels.
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
  charnelHouseUnlockHeal: (meat: number) => (
    <>
      Produit <ResourceIcon type={ResourceType.Meat} text={`+${meat}`} /> par tour et débloque{' '}
      <span css={textColor('CYAN')}>Soigner</span>.
    </>
  ),
  charnelHouseUnlockCleanse: (meat: number) => (
    <>
      Produit <ResourceIcon type={ResourceType.Meat} text={`+${meat}`} /> par tour et débloque{' '}
      <span css={textColor('CYAN')}>Guérir maladie</span>.
    </>
  ),
  charnelHouseHeal: (healAmount: number, healCost: number) => (
    <>
      <span css={textColor('CYAN')}>Soigner</span>&nbsp;: soigner <span css={textColor('LIME')}>{healAmount}</span>
      &nbsp;
      <HealthPoint />.<br />
      <span css={textColor('CYAN')}>Coût</span>&nbsp;: <ResourceIcon type={ResourceType.Meat} text={healCost} />
    </>
  ),
  charnelHouseCleanse: (cleanseCost: number) => (
    <>
      <span css={textColor('CYAN')}>Guérir maladie</span>&nbsp;: retire l&apos;effet{' '}
      <span css={textColor('PURPLE')}>Maladie</span> d&apos;un mort-vivant.
      <br />
      <span css={textColor('CYAN')}>Coût</span>&nbsp;: <ResourceIcon type={ResourceType.Meat} text={cleanseCost} />
    </>
  ),
  healUndead: 'Soigner un mort-vivant',
  noTargetsToHeal: 'Aucun mort vivant à soigner',
  cleanseUndead: 'Guérir un mort-vivant',
  noTargetsToCleanse: (
    <>
      Aucun mort vivant atteint de <span css={textColor('PURPLE')}>Maladie</span>
    </>
  ),

  [BuildingType.Catacombs]: 'Catacombes',
  catacombDescription: () => (
    <>
      Action: <span css={textColor('PURPLE')}>Exhumer un mort-vivant</span>.
    </>
  ),
  catacombUnlock: (
    <>
      Débloque l&apos;action &quot;<span css={textColor('PURPLE')}>Exhumation</span>&quot;
    </>
  ),
  catacombUnlockRevive: (
    <>
      Débloque l&apos;action &quot;<span css={textColor('PURPLE')}>Resurrection</span>&quot;
    </>
  ),
  catacombFortify: (bonus: number) => (
    <>
      Renforce les Morts-Vivants&nbsp;: <span css={textColor('PURPLE')}>+{bonus} à leur Talent majeur</span>
    </>
  ),
  catacombRevive: (name: ReactNode) => (
    <>
      Ressusciter <span css={textColor('PURPLE')}>{name}</span>
    </>
  ),

  [BuildingType.SoulWell]: 'Puit des âmes',
  soulWellDescription: (production: number) => (
    <>
      Produit <ResourceIcon type={ResourceType.Souls} text={production} /> par tour.
    </>
  ),
  soulWellUnlock: (souls: number) => (
    <>
      Produit <ResourceIcon type={ResourceType.Souls} text={souls} /> par tour. Les âmes permettent de lancer des{' '}
      <span css={textColor('BLUE')}>Sorts</span> et des réanimer de <span css={textColor('PURPLE')}>Mort-vivants</span>.
    </>
  ),
  soulWellUpgrade: (souls: number) => (
    <>
      Produit <ResourceIcon type={ResourceType.Souls} text={`+${souls}`} /> par tour.
    </>
  ),

  [BuildingType.Ossuary]: 'Ossuaire',
  ossuaryDescription: (
    <>
      Action: <span css={textColor('BLUE')}>Apprendre un secret</span>.
    </>
  ),
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
  undeadAllDead:
    'Votre dernier citoyen a trouvé la mort. Sans entretien, la cité tombe rapidement en désuétude. Ce projet meurt avec vous.',
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
  cannotBanLastUndead: <>C&apos;est votre dernier citoyen, vous ne pouvez pas le bannir</>,
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
        return 'Maude Vertèbre'
      case UndeadType.BloodPrince:
        return 'Prince de Sang-Séché'
      default:
        return ''
    }
  },
  undeadAbility: 'Capacité :',
  devotionExpedition: (healthCost: number, talentsBonus: number) => (
    <>
      Perd <span css={textColor('RED')}>{healthCost}</span>&nbsp;
      <Image src={hpCostIcon} /> pour obtenir <span css={textColor('CYAN')}>+{talentsBonus} à tous les Talents</span>{' '}
      durant un obstacle.
    </>
  ),
  devotionAssault: (healthCost: number, damages: number, damageCategories: PaladinCategory[]) => (
    <>
      Perd <span css={textColor('RED')}>{healthCost}</span>&nbsp;
      <Image src={hpCostIcon} /> pour briser le <span css={textColor('PURPLE')}>Bouclier</span> et infliger{' '}
      <span css={textColor('CYAN')}>{damages}</span>&nbsp;
      <Image src={trapDamageIcon} />. Type&nbsp;: <DamageCategories categories={damageCategories} />.
    </>
  ),
  laborExpedition: <>Résout un obstacle qui implique une tâche d&apos;ouvrier.</>,
  laborAssault: (
    <>
      Construit un <span css={textColor('LIME')}>Piège</span> au choix.
    </>
  ),
  protectionExpedition: (damageBuffer: number) => (
    <>
      Encaisse une perte de jusqu&apos;à <span css={textColor('RED')}>{damageBuffer}</span>&nbsp;
      <Image src={hpCostIcon} /> durant un obstacle.
    </>
  ),
  protectionAssault: (shieldValue: number) => (
    <>
      Bloque <span css={textColor('RED')}>{shieldValue}</span>&nbsp;
      <Image src={paladinDamageIcon} /> de 1 Paladin
    </>
  ),
  seductionExpedition: (talentBonus: number) => (
    <>
      Les ennemis subjugués durant un obstacle rejoignent vos rangs. Confère{' '}
      <span css={textColor('CYAN')}>+{talentBonus} de tous les Talents</span> pour finir l&apos;Excursion.
    </>
  ),
  seductionAssault: (targetMaxHealth: number) => (
    <>
      Séduit un Paladin auquel il ne reste que <span css={textColor('LIME')}>{targetMaxHealth}</span> <HealthPoint /> et
      qui n&apos;a pas <span css={textColor('PURPLE')}>Consécration</span>. Ce dernier inflige ses dégâts au Paladin
      suivant.
    </>
  ),
  sectumSempraExpedition: (lethalityBonus: number) => (
    <>
      <TalentIcon type={UndeadTalent.Lethality} size="1.2rem" text={`+${lethalityBonus}`} /> durant un obstacle.
    </>
  ),
  sectumSempraAssault: (damages: number, targetCategories: PaladinCategory[]) => (
    <>
      Inflige <span css={textColor('CYAN')}>{damages}</span> <Image src={trapDamageIcon} />. Type&nbsp;:{' '}
      <DamageCategories categories={targetCategories} />.
    </>
  ),

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
  soulStormExpedition: (lethalityBonus: number) => (
    <>
      Confère <TalentIcon type={UndeadTalent.Lethality} size="1.2rem" text={`+${lethalityBonus}`} /> durant un obstacle.
    </>
  ),
  soulStormAssault: (damages: number, targetCategories: PaladinCategory[]) => (
    <>
      Une puissante vague de type <DamageCategories categories={targetCategories} /> qui inflige{' '}
      <span css={textColor('CYAN')}>{damages}</span>&nbsp;
      <Image src={trapDamageIcon} />. Les surplus de dégâts sont infligés aux Paladins suivant.
    </>
  ),
  theKeyLabel: 'La clé',
  theKeyExpedition: '"Ouvre" une porte.',
  theKeyAssault: (damages: number, targetCategories: PaladinCategory[]) => (
    <>
      Brise les <span css={textColor('PURPLE')}>Bouclier</span> et inflige{' '}
      <span css={textColor('CYAN')}>{damages}</span>&nbsp;
      <Image src={trapDamageIcon} />. Type <DamageCategories categories={targetCategories} />
    </>
  ),
  predictionLabel: 'Prédiction',
  predictionExpedition: 'Donne un nouveau choix de secrets',
  predictionAssault: (revealAmount: number) => <>Révèle les {revealAmount} premiers paladins de l&apos;assaut</>,
  restorationLabel: 'Restauration',
  restorationExpedition: (healAmount: number, cleanseAmount: number) => (
    <>
      Soigne <span css={textColor('LIME')}>{healAmount}</span>&nbsp;
      <HealthPoint /> et guérit de la <span css={textColor('PURPLE')}>Maladie</span> {cleanseAmount}&nbsp;Mort-Vivant
      {cleanseAmount > 0 && 's'}.
    </>
  ),
  restorationAssault: (repairAmount: number) => (
    <>
      Restaure <span css={textColor('CAMO')}>{repairAmount}</span>&nbsp;
      <Image src={structurePointsIcon} /> perdus contre le dernier paladin.
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
  gameLostUndeads: 'La Faucheuse a enfin récolté votre âme désespérée.',
  gameRetry: 'Recommencer',
  gameWon:
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
