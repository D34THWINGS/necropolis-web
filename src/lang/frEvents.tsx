import React, { ReactNode } from 'react'
import { textColor } from '../styles/base'
import { ResourceIcon } from '../components/resources/ResourceIcon'
import {
  BuildingType,
  EXTRA_CHAKRAM_DAMAGE,
  GUARDIAN_TARGETS_COUNT,
  HEALER_BONUS_HP,
  HEALER_TARGETS_COUNT,
  PaladinCategory,
  PaladinType,
  PROVOST_TARGETS_COUNT,
  PUTRID_PITCH_MALUS,
  ResourceType,
  TrapType,
  UndeadTalent,
  WIZARD_BONUS_DAMAGES,
  WIZARD_TARGETS_COUNT,
} from '../config/constants'
import { TalentIcon } from '../components/talents/TalentIcon'
import paladinDamageIcon from '../assets/images/paladins/paladin-damage.png'
import trapDamageIcon from '../assets/images/traps/trap-damages.png'
import { Image } from '../components/images/Image'
import { DamageCategories } from '../components/images/DamageCategories'
import { HealthPoint } from '../components/images/HealthPoint'

const paladinNames: Record<PaladinType, string> = {
  [PaladinType.Vanguard]: 'Avant-Garde',
  [PaladinType.Healer]: 'Soigneur',
  [PaladinType.Zealot]: 'Zélote',
  [PaladinType.Wizard]: 'Enchanteur',
  [PaladinType.Dreadnought]: 'Dreadnought',
  [PaladinType.Commander]: 'Commandant',
  [PaladinType.Guardian]: 'Gardien',
  [PaladinType.Provost]: 'Prévot',
  [PaladinType.Avenger]: 'Vengeur',
}

const paladinAbilities: Record<PaladinType, ReactNode> = {
  [PaladinType.Vanguard]: null,
  [PaladinType.Healer]: (
    <>
      <span css={textColor('LIME')}>+{HEALER_BONUS_HP}</span>&nbsp;
      <HealthPoint /> à {HEALER_TARGETS_COUNT} Paladin
    </>
  ),
  [PaladinType.Zealot]: (
    <>
      <span css={textColor('PURPLE')}>Consécration</span>&nbsp;:&nbsp;le ou les Types de la carte sont tirés
      aléatoirement et ne sont révélés que lorsqu&apos;elle se fait attaquer.
    </>
  ),
  [PaladinType.Wizard]: (
    <>
      <span css={textColor('RED')}>
        +{WIZARD_BONUS_DAMAGES}&nbsp;
        <Image src={paladinDamageIcon} />
      </span>
      &nbsp;à {WIZARD_TARGETS_COUNT} Paladins
    </>
  ),
  [PaladinType.Dreadnought]: '',
  [PaladinType.Commander]: (
    <>
      Lorsqu&apos;il doit subir des dégâts pour la première fois, il échange sa place avec un autre Paladin dans le deck
    </>
  ),
  [PaladinType.Guardian]: (
    <>
      Confère <span css={textColor('PURPLE')}>Bouclier</span> à {GUARDIAN_TARGETS_COUNT} Paladin
    </>
  ),
  [PaladinType.Provost]: (
    <>
      Confère <span css={textColor('PURPLE')}>Consécration</span> à {PROVOST_TARGETS_COUNT} Paladin
    </>
  ),
  [PaladinType.Avenger]: (
    <>
      Inflige ses <Image src={paladinDamageIcon} /> quand il meurt
    </>
  ),
}

const trapNames: Record<TrapType, string> = {
  [TrapType.Impaler]: 'Empaleur',
  [TrapType.Chakrams]: 'Chakrâmes',
  [TrapType.Profaner]: 'Profanatrice',
  [TrapType.PutridPitch]: 'Poix putride',
}

const trapDescriptions: Record<TrapType, ReactNode> = {
  [TrapType.Impaler]: (
    <>
      Brise les&nbsp;<span css={textColor('PURPLE')}>Bouclier</span>
    </>
  ),
  [TrapType.Chakrams]: (
    <>
      Tire un second chakrâme qui inflige <span css={textColor('CYAN')}>{EXTRA_CHAKRAM_DAMAGE}</span>{' '}
      <Image src={trapDamageIcon} />, peu importe le type du paladin en jeu.
    </>
  ),
  [TrapType.Profaner]: (
    <>
      Change le type du paladin. Si le type choisi est <DamageCategories categories={[PaladinCategory.Magical]} />, le
      paladin subit les <Image src={trapDamageIcon} /> de ce piège.
    </>
  ),
  [TrapType.PutridPitch]: (
    <>
      <span css={textColor('RED')}>{PUTRID_PITCH_MALUS}</span> <Image src={paladinDamageIcon} /> au paladin en jeu.
    </>
  ),
}

export const frEvents = {
  eventAcknowledge: 'Ok',

  callToArmsTitle: 'Appel aux armes',
  callToArmsDescription: (maxCounter: number) => (
    <>
      Vous apprenez qu&apos;une clique de seigneurs auto-proclamés et surnommés les Paladins préparent un assaut contre
      la Nécropole. Ils ont l&apos;intention de balayer la menace que vous représentez pour eux. Au fil du temps, ils
      deviendront de mieux en mieux préparés, mais n&apos;attaqueront que lorsqu&apos;ils en verront l&apos;opportunité,
      c&apos;est-à-dire lorsque l&apos;icône ci-dessous montrera{' '}
      <span css={textColor('RED')}>{maxCounter}&nbsp;Paladins</span>.
    </>
  ),

  paladinsAssaultTitle: 'Assaut des paladins',
  paladinsAssaultWeak: (
    <>
      Une troupe d&apos;hommes s&apos;amasse devant vos portes. Ils arborent une chaîne en guise de blason, symbole de
      ce qu&apos;ils défendent&nbsp;: l&apos;ordre établi. Et vous, vous n&apos;en faites décidément pas partie. Leurs
      intentions sont claires&nbsp;: vous balayer de la carte&nbsp;!
    </>
  ),
  paladinsAssaultMedium: (
    <>
      Une imposante troupe d&apos;hommes s&apos;amasse devant vos portes. Certains tiennent de longues échelles avec des
      crochets au bout. L&apos;air empeste la haine, le sang et la mort.
    </>
  ),
  paladinsAssaultStrong: (
    <>
      Une menaçante armée d&apos;hommes s&apos;amasse devant vos portes. Cette fois, ils ont amené des trébuchets.
      L&apos;instant se fige, tandis que la Faucheuse vous observe. Elle est venue pour la récolte.
    </>
  ),
  paladinsAssaultAction1: 'Combattre',
  paladinsAssaultReveal: 'Révélation',
  paladinsAssaultNext: 'Suite',
  paladinName: (type: PaladinType) => paladinNames[type],
  paladinAbility: (type: PaladinType) => paladinAbilities[type],
  paladinType: 'Types\u00A0:\u00A0',
  paladinsAssaultPrepare: 'Pose de pièges',
  paladinsAssaultPlacedTraps: (count: number, max: number) => (
    <>
      Pièges&nbsp;posés&nbsp;: {count}&nbsp;/&nbsp;{max}
    </>
  ),
  paladinsAssaultFight: 'Combattre',
  trapName: (type: TrapType) => trapNames[type],
  trapDescription: (type: TrapType) => trapDescriptions[type],
  trapNemesis: 'Nemesis\u00A0:',
  undeadDetailsAbility: 'Capacité de',
  undeadDetailsUse: 'Utiliser',
  paladinsAssaultBattle: 'Combat',
  skipPaladin: 'Passer',
  paladinShielded: (
    <>
      <span css={textColor('PURPLE')}>Bouclier</span>&nbsp;:&nbsp;Protège des dégâts
    </>
  ),
  paladinConsecrated: (
    <>
      <span css={textColor('PURPLE')}>Consécration</span>&nbsp;:&nbsp;change le ou les Types du Paladin qui deviennent
      cachés jusqu&apos;à ce qu&apos;il prenne au moins <span css={textColor('CYAN')}>1</span>&nbsp;
      <Image src={trapDamageIcon} /> (peu importe le Type).
    </>
  ),
  changePaladinType: 'Changement de type',
  changePaladinTypeSubmit: 'Confirmer',
  paladinsAssaultResults: 'Bilan',
  paladinsKilled: (killed: number, deckSize: number) => (
    <>
      Tués : <span css={textColor('WHITE')}>{killed}</span>&nbsp;/&nbsp;{deckSize}
    </>
  ),
  healthLost: (amount: number) => (
    <>
      Perdus : <span css={textColor('WHITE')}>{amount}</span>
    </>
  ),
  healthRemaining: (current: number, max: number) => (
    <>
      Restant : <span css={textColor('WHITE')}>{current}</span>&nbsp;/&nbsp;{max}
    </>
  ),
  paladinsAssaultEnd: "Fin de l'assaut",

  collapsingTitle: "L'Éffondrement",
  collapsingStep1: (buildingName: ReactNode) => (
    <>
      Les fondations de la Nécropole se font si vieilles que le toit de{' '}
      <span css={textColor('CYAN')}>{buildingName}</span> s&apos;est écroulé. La salle est maintenant inaccessible.
    </>
  ),
  collapsingAction1: 'Déblayer',
  collapsingAction1Cost: <span css={textColor('CYAN')}>Action</span>,
  collapsingAction2: (
    <>
      Laisser la salle sous les éboulis
      <br />
      <span css={textColor('CYAN')}>Elle reste inaccessible tant qu&apos;elle ne sera pas déblayée.</span>
    </>
  ),
  collapsingStep2: (defense: number) => (
    <>
      Vous découvrez parmi les décombres une rune ancienne dont émane une puissante magie impie. Confère{' '}
      <span css={textColor('LIME')}>+{defense}&nbsp;Défense</span>.
    </>
  ),

  plunderTitle: 'Le Pillage',
  plunderStep1: (
    <>
      Des sortes de rats armés jusqu&apos;aux dents se sont faufilés à travers les égouts de la Nécropole et se livrent
      au pillage.
    </>
  ),
  plunderAction1: 'Combattre',
  plunderAction1Prerequisite: (lethality: number) => (
    <>
      <span css={textColor('CYAN')}>Prérequis&nbsp;:</span>&nbsp;
      <TalentIcon type={UndeadTalent.Lethality} text={lethality} />
    </>
  ),
  plunderAction2: 'Les laisser faire',
  plunderStep2: (meat: number, bones: number) => (
    <>
      Vous obtenez <ResourceIcon type={ResourceType.Meat} text={meat} /> et{' '}
      <ResourceIcon type={ResourceType.Bones} text={bones} /> sur leurs dépouilles.
    </>
  ),
  plunderStep3: (meat: number) => (
    <>
      Vous perdez <ResourceIcon type={ResourceType.Meat} text={meat} />.
    </>
  ),

  offeringTitle: "L'Offrande",
  offeringDescription: (
    <>
      L&apos;idée d&apos;être immortel vous empli d&apos;ennui. Pour tuer le temps, vous décidez de rendre une visite à
      votre tombeau. Vous passez un long moment à admirer les offrandes, mais parmi toutes ces breloques, une retient
      particulièrement votre attention : un parchemin d&apos;architecture magique.
    </>
  ),
  offeringAction: (type: BuildingType) => {
    switch (type) {
      case BuildingType.CharnelHouse:
        return 'Améliorer le Charnier'
      case BuildingType.Ossuary:
        return "Améliorer l'Ossuaire"
      case BuildingType.Catacombs:
        return 'Améliorer les Catacombes'
      case BuildingType.SoulWell:
        return 'Améliorer le Puits des Âmes'
      case BuildingType.Arsenal:
        return "Améliorer l'arsenal"
      default:
        throw new Error('Unknown building')
    }
  },
  offeringActionSubtitle: <span css={textColor('CYAN')}>Action</span>,

  stateOfEmergencyTitle: "L'État d'Urgence",
  stateOfEmergencyDescription: (strengthIncrease: number) => (
    <>
      Suite à votre carnage, les Paladins ont décrété l&apos;état d&apos;urgence. Doublant le budget de la défense, ils
      ont investi dans de nouveaux équipements (<span css={textColor('RED')}>+{strengthIncrease} Force</span>)
      qu&apos;ils comptent utiliser contre vous.
      <br />
    </>
  ),
}
