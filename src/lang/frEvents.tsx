import React, { ReactNode } from 'react'
import { textColor } from '../styles/base'
import { ResourceIcon } from '../components/resources/ResourceIcon'
import { BuildingType, ResourceType, UndeadTalent } from '../config/constants'
import { plural } from './i18nHelpers'
import { TalentIcon } from '../components/talents/TalentIcon'

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
  paladinsAssaultPrerequisite: (defense: number) => (
    <>
      <span css={textColor('CYAN')}>Prérequis&nbsp;:</span>&nbsp;
      <span css={textColor('LIME')}>{defense}&nbsp;Défense</span>
    </>
  ),
  paladinsAssaultVictory: (meat: number) => (
    <>
      Une trompette sonne leur retraite, c&apos;est la victoire ! Vous voilà tranquille pour un moment.{' '}
      {meat > 0 && (
        <>
          Vous récoltez <ResourceIcon type={ResourceType.Meat} text={meat} /> sur leurs dépouilles.
        </>
      )}
    </>
  ),
  paladinsAssaultDefeat: (undeads: number, meat: number) => (
    <>
      Des Paladins ont ouvert une brèche dans vos défenses et taillent leur chemin dans la Nécropole. Vos citoyens
      arrivent toutefois à les stopper, mais en y payant le prix du sang. Vous perdez{' '}
      <span css={textColor('PURPLE')}>
        {undeads}&nbsp; Mort-vivant{plural(undeads, 's')}
      </span>{' '}
      de votre choix. Enfin, vous récoltez <ResourceIcon type={ResourceType.Meat} text={meat} /> sur leurs dépouilles.
    </>
  ),
  paladinsAssaultTotalDefeat: (
    <>
      Des Paladins ont ouvert une brèche dans vos défenses et trucident tout ce qui bouge. Ils trouvent rapidement votre
      cachette, la salle du tombeau. C&apos;est ici que vous avez perdu la vie et ironiquement, c&apos;est ici que vous
      allez finalement la reperdre.
    </>
  ),

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
