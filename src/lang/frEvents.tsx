/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { textColor } from '../styles/base'
import { ResourceIcon } from '../components/images/ResourceIcon'
import { ResourceType } from '../config/constants'
import { plural } from './i18nHelpers'

export const frEvents = {
  eventAcknowledge: 'Ok',

  callToArmsTitle: 'Appel aux armes',
  callToArmsDescription: (
    <Fragment>
      Vous apprenez qu’une clique de seigneurs auto-proclamés et surnommés les Paladins préparent un assaut contre la
      Nécropole. Ils ont l’intention de balayer la menace que vous représentez pour eux. Au fil du temps, ils
      deviendront de mieux en mieux préparés, mais n’attaqueront que lorsqu’ils en verront l’opportunité, c’est-à-dire
      lorsque l’icone ci-dessous montrera 3 Paladins.
    </Fragment>
  ),

  paladinsAssaultTitle: 'Assaut des paladins',
  paladinsAssaultWeak: (
    <Fragment>
      Une troupe d’hommes en armure rouges étincelantes s’amassent devant vos portes. Leurs bannières arborent une
      chaîne en guise de blason, symbole de ce qu’ils défendent&nbsp;: l’ordre établi. Et vous, vous n’en faites
      décidément pas partie. Leurs intentions sont on ne peut plus claires&nbsp;: vous balayer de la carte !
    </Fragment>
  ),
  paladinsAssaultMedium: (
    <Fragment>
      Une imposante troupe d’hommes en armure rouges étincelantes s’amassent devant vos portes. Certains tiennent de
      longues échelles avec des crochets au bout. L’air empeste la haine, le sang, et la mort.
    </Fragment>
  ),
  paladinsAssaultStrong: (
    <Fragment>
      Une menaçante armée d’hommes en armure rouges étincelantes s’amassent devant vos portes. Ils ont fabriqué pour
      l’occasion des tours de siège ainsi que des trébuchets. L’instant se fige, tandis que la Faucheuse vous observe.
      Elle est venue pour la récolte.
    </Fragment>
  ),
  paladinsAssaultAction1: 'Combattre',
  paladinsAssaultPrerequisite: (
    <Fragment>
      <span css={textColor('CYAN')}>Prérequis&nbsp;:</span>&nbsp;<span css={textColor('LIME')}>Défense</span>
      &nbsp;≥&nbsp;
      <span css={textColor('RED')}>Force</span>
    </Fragment>
  ),
  paladinsAssaultVictory: (meat: number) => (
    <Fragment>
      Une trompette sonne leur retraite, c’est la victoire ! Vous voilà tranquille pour un moment.{' '}
      {meat > 0 && (
        <Fragment>
          Vous récoltez{' '}
          <span css={textColor('RED')}>
            {meat}&nbsp;
            <ResourceIcon type={ResourceType.Meat} />
          </span>{' '}
          sur les dépouilles des assaillants.
        </Fragment>
      )}
    </Fragment>
  ),
  paladinsAssaultDefeat: (undeads: number, meat: number) => (
    <Fragment>
      Des Paladins ont ouvert une brèche dans vos défenses et taillent leur chemin dans la Nécropole. Vos citoyens
      arrivent toutefois à les stopper, mais en y payant le prix du sang. Vous perdez
      <span css={textColor('PURPLE')}>
        {undeads}&nbsp; Mort-vivant{plural(undeads, 's')}
      </span>{' '}
      de votre choix. Enfin, vous récoltez{' '}
      <span css={textColor('RED')}>
        {meat}&nbsp;
        <ResourceIcon type={ResourceType.Meat} />
      </span>{' '}
      sur les dépouilles des assaillants.
    </Fragment>
  ),
  paladinsAssaultTotalDefeat: (
    <Fragment>
      Des Paladins ont ouvert une brèche dans vos défenses et trucident tout ce qui bouge. Ils trouvent rapidement votre
      cachette, la salle du tombeau. C’est ici que vous avez perdu la vie, et ironiquement, c’est ici que vous allez
      finalement la reperdre, définitivement.
    </Fragment>
  ),
}
