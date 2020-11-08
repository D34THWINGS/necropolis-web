import React, { ReactNode } from 'react'
import { textColor } from '../styles/base'
import { ResourceIcon } from '../components/resources/ResourceIcon'
import {
  BuildingType,
  PaladinType,
  PUTRID_PITCH_MALUS,
  ResourceType,
  TrapType,
  UndeadTalent,
} from '../config/constants'
import { TalentIcon } from '../components/talents/TalentIcon'
import paladinDamageIcon from '../assets/images/paladins/paladin-damage.png'
import trapDamageIcon from '../assets/images/traps/trap-damages.png'
import { Image } from '../components/images/Image'

const paladinNames: Record<PaladinType, string> = {
  [PaladinType.Vanguard]: 'Avant-Garde',
}

const paladinAbilities: Record<PaladinType, ReactNode> = {
  [PaladinType.Vanguard]: (
    <>
      <span css={textColor('PURPLE')}>Bouclier&nbsp;:</span>&nbsp;Protège des dégâts
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
  [TrapType.Chakrams]: <>Si le premier tir tue sa cible, le second tir touche le prochain paladin et ansi de suite.</>,
  [TrapType.Profaner]: (
    <>
      <span css={textColor('PURPLE')}>Purge</span> l&apos;effet <span css={textColor('PURPLE')}>Pureté</span> et change
      le type du paladin. Si le type choisi est magique, le paladin subit les <Image src={trapDamageIcon} /> de ce
      piège.
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
  paladinHealth: 'PV',
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
  paladinsAssaultResults: 'Bilan',
  paladinsKilled: (killed: number, deckSize: number) => (
    <>
      Tués : <span css={textColor('WHITE')}>{killed}</span> / {deckSize}
    </>
  ),
  healthLost: (amount: number) => (
    <>
      Perdus : <span css={textColor('WHITE')}>{amount}</span>
    </>
  ),
  healthRemaining: (current: number, max: number) => (
    <>
      Restant : <span css={textColor('WHITE')}>{current}</span> / {max}
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
      case BuildingType.Battlements:
        return 'Améliorer les Remparts'
      case BuildingType.SoulWell:
        return 'Améliorer le Puits des Âmes'
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
