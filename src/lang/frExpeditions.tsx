/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { alignItemsCenter, textColor } from '../styles/base'
import { ResourceIcon } from '../components/icons/ResourceIcon'
import { ResourceType } from '../config/constants'

export const frExpeditions = {
  beginExpedition: "S'y rendre",
  endExpedition: 'Partir',
  fleeExpedition: (
    <Fragment>
      Fuir
      <br />
      <span css={textColor('CYAN')}>Vous conservez les trésors obtenus</span>
    </Fragment>
  ),
  expeditionPrerequisites: 'Prérequis\u00A0:',
  expeditionCost: 'Coût\u00A0:',
  expeditionContinue: 'Continuer',

  oldCoffinTitle: 'Vieux cercueil',
  oldCoffinOverview: (
    <Fragment>
      Parmi les tombes du cimetière se tient un vieux cercueil qui n&apos;a pas connu l&apos;enterrement. Il semblerait
      contenir des signes de vie.
    </Fragment>
  ),
  oldCoffinReward: <span css={textColor('PURPLE')}>Mort-vivant</span>,
  oldCoffinStep1:
    // eslint-disable-next-line max-len
    "Vous trouvez facilement le cercueil. La vigne qui a poussé dessus ainsi que l'humidité ont pourri le bois des planches.",
  oldCoffinOpen: 'Ouvrir le cercueil',
  oldCoffinRewardPart1: (
    <Fragment>
      Un être décharné sort du cercueil, le fameux <span css={textColor('PURPLE')}>Jan Brik&apos;Holeur</span> connu
      pour avoir été un homme à tout faire.
    </Fragment>
  ),
  oldCoffinRewardPart2: (materialsReward: number) => (
    <Fragment>
      En guise de remerciement, il part couper le gigantesque arbre au milieu du cimetière et vous rapporte{' '}
      <span css={[alignItemsCenter, textColor('GREEN')]}>
        {materialsReward}&nbsp;
        <ResourceIcon type={ResourceType.Materials} />
      </span>
      , comme ça.
    </Fragment>
  ),

  miseryMarketTitle: 'Marché de la Misère',
  miseryMarketOverview:
    // eslint-disable-next-line max-len
    'Bourg Misère, l’unique cité humaine, déborde de vie, et le marché est son coeur battant où tout s’y vend et s’y dit. Bruyant, puant, mais enrichissant.',
  miseryMarketStep1: 'Devant vous se dressent les portes de Bourg Misère. Vous n’êtes pas les bienvenues ici.',
  miseryMarketAction1: 'Catapulter un Mort-Vivant derrière les murs afin qu’il ouvre les portes',
  miseryMarketAction1Cost: (cost: number) => `${cost}\u00A0Mort-vivant`,
  miseryMarketAction2: 'Enfoncer la porte principale',
  miseryMarketAction3: (
    <Fragment>
      Lancer <span css={textColor('LIGHT_BLUE')}>La Clé</span> sur la porte principale
    </Fragment>
  ),
  miseryMarketStep2:
    // eslint-disable-next-line max-len
    'Avant même que vous ne franchissiez la porte, la Garde de Bourg Misère s’est amassée devant vous, formant comme un épais barrage de chair vous bloquant le passage.',
  miseryMarketAction4: 'Combattre',
  miseryMarketStep3: (meat: number, materials: number) => (
    <Fragment>
      Alors que vos ennemis commencent à faiblir, la plupart décident de s’enfuir vers le centre-ville. Les survivants
      ainsi que quelques Paladins ont barricadés la zone. Au passage, vous récupérez{' '}
      <span css={textColor('RED')}>{meat}</span>&nbsp;
      <ResourceIcon type={ResourceType.Meat} size="1rem" /> dans le champs de viscères et{' '}
      <span css={textColor('GREEN')}>{materials}</span>&nbsp;
      <ResourceIcon type={ResourceType.Materials} size="1rem" /> en pillant les alentours.
    </Fragment>
  ),
  miseryMarketStep4:
    // eslint-disable-next-line max-len
    'Vous vous tenez devant les dernières défenses de la ville : de nombreux Gardes en position derrière leurs barricades.',
  miseryMarketReward: (meat: number, bones: number, materials: number) => (
    <Fragment>
      À vos pieds gisent d’innombrables cadavres. Tous ces hommes sont morts, cruellement arrachés à leurs pauvres
      familles. Ils ne faisaient que suivre les ordres. Mais vous vous dites que justement, ils faisaient partie de la
      Chaîne, de l’ordre établi. Quant à leurs maîtres, ils se sont réfugiés dans l’Hôtel de Ville. Vous mettez à sac le
      Bourg et récupérez <span css={textColor('RED')}>{meat}</span>&nbsp;
      <ResourceIcon type={ResourceType.Meat} size="1rem" />, <span css={textColor('BROWN')}>{bones}</span>&nbsp;
      <ResourceIcon type={ResourceType.Bones} size="1rem" /> et <span css={textColor('GREEN')}>{materials}</span>&nbsp;
      <ResourceIcon type={ResourceType.Materials} size="1rem" />.
    </Fragment>
  ),

  townHallTitle: 'Hôtel de ville',
  townHallOverview:
    // eslint-disable-next-line max-len
    'Haut lieu du pouvoir des Paladins craints et respectés. C’est ici qu’ils édictent les lois, rendent la justice et enferment leurs prisonniers.',
  townHallRewardOverview: 'variable',
  townHallStep1: 'Entrer dedans ne sera pas évident.',
  townHallAction1: (
    <Fragment>
      Lancer <span css={textColor('LIGHT_BLUE')}>La Clé</span> sur la porte
    </Fragment>
  ),
  townHallStep2: 'De la porte, il n’en reste que des miettes.',
  townHallStep3:
    // eslint-disable-next-line max-len
    'Votre intrusion a alerté le bâtiment. Les Paladins décident d’y mettre le feu, et fuient une fois de plus, mais cette fois-ci vers le Bastion. Vous perdez dans les flammes.',
  townHallAction2: 'Les poursuivre',
  townHallAction3: 'Piller autant que vous le pouvez',
  townHallAction4: 'Fouiller les geôles',
  townHallGoInFlames: (cost: number) => (
    <Fragment>
      Vous perdez <span css={textColor('PURPLE')}>{cost} Mort-vivant</span> de votre choix dans les flammes.
    </Fragment>
  ),
}
