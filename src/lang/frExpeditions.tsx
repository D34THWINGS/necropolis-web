/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { alignItemsCenter, textColor } from '../styles/base'
import { ResourceIcon } from '../components/images/ResourceIcon'
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
  fleeExpeditionDescription: 'Les Paladins ont eu vent de votre instant de faiblesse.',
  fleeExpeditionButton: 'Partir',
  expeditionPrerequisites: 'Prérequis\u00A0:',
  expeditionCost: 'Coût\u00A0:',
  expeditionContinue: 'Continuer',
  expeditionTreasure: 'Trésors\u00A0:',

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
  oldCoffinStep2: (materialsReward: number) => (
    <Fragment>
      Un être décharné sort du cercueil, le fameux <span css={textColor('PURPLE')}>Jan Brik&apos;Holeur</span> connu
      pour avoir été un homme à tout faire. En guise de remerciement, il part couper le gigantesque arbre au milieu du
      cimetière et vous rapporte <ResourceIcon type={ResourceType.Materials} text={materialsReward} />, comme ça.
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
      <ResourceIcon type={ResourceType.Meat} size="1rem" text={meat} /> dans le champs de viscères et{' '}
      <ResourceIcon type={ResourceType.Materials} size="1rem" text={materials} /> en pillant les alentours.
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
      Bourg et récupérez <ResourceIcon type={ResourceType.Meat} size="1rem" text={meat} />,{' '}
      <ResourceIcon type={ResourceType.Bones} size="1rem" text={bones} /> et{' '}
      <ResourceIcon type={ResourceType.Materials} size="1rem" text={materials} />.
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
  townHallStep3: (cost: number) => (
    <Fragment>
      Votre intrusion a alerté le bâtiment. Les Paladins décident d’y mettre le feu, et fuient une fois de plus, mais
      cette fois-ci vers le Bastion. Vous perdez <span css={textColor('PURPLE')}>{cost} Mort-vivant</span> dans les
      flammes.
    </Fragment>
  ),
  townHallAction2: 'Les poursuivre',
  townHallAction3: 'Piller autant que vous le pouvez',
  townHallAction4: 'Fouiller les geôles',
  townHallStep4:
    // eslint-disable-next-line max-len
    'Vous réussissez à tuer plusieurs fuyards, ce qui devrait vous alléger la tâche au Bastion. Par ailleurs, vous trouvez sur l’un des cadavres le plan de leur forteresse et plus particulièrement d’un passage secret.',
  townHallStep5: (materials: number) => (
    <Fragment>
      Vous avez le temps de récupérer <ResourceIcon type={ResourceType.Materials} text={materials} /> avant que l’Hôtel
      de ville ne soit emporté dans le brasier.
    </Fragment>
  ),
  townHallStep6: (isBloodPrinceInJail: boolean) =>
    isBloodPrinceInJail ? (
      <Fragment>
        Vous libérez le <span css={[alignItemsCenter, textColor('PURPLE')]}>Prince de Sang-Séché</span>. Ce dernier
        s’explique :<br />
        <i>
          “Les Paladins m’ont mis en prison car ils doutaient de ma loyauté. L’un a proposé de prendre ma baguette et de
          me tuer, mais un changement dans le script me sauva la mise. Je vous remercie de m’avoir libéré.”
        </i>
      </Fragment>
    ) : (
      'Vous ne trouvez rien d’intéressant dans les geôles.'
    ),

  bastionTitle: 'Bastion',
  bastionOverview:
    // eslint-disable-next-line max-len
    'Ce somptueux fortin est le dernier bastion des Paladins. Toutes ces richesses qu’ils prétendent mériter, vous comptez bien les en déshériter.',
  bastionStep1: 'L’ultime rencontre vous attend au-delà de ce pont-levis.',
  bastionAction1: (
    <Fragment>
      Lancer <span css={textColor('LIGHT_BLUE')}>La Clé</span> sur l’immense porte d’entrée
    </Fragment>
  ),
  bastionStep2: 'La porte est grande ouverte, la fin est proche.',
  bastionStep3:
    // eslint-disable-next-line max-len
    'Vous pénétrez un immense hall magnifiquement décoré. Une horde de molosses enragés vous propose une visite guidée… de leurs estomacs.',
  bastionAction2: 'Combattre',
  bastionAction3: 'Les nourrir',
  bastionStep4: (meat: number, bones: number) => (
    <Fragment>
      Vous récupérez <ResourceIcon type={ResourceType.Meat} text={meat} /> et{' '}
      <ResourceIcon type={ResourceType.Bones} text={bones} /> sur le “comité d’accueil”, puis continuez votre chemin.
    </Fragment>
  ),
  bastionStep5: 'Le comité d’accueil apprécie votre généreux pourboire.',
  bastionStep6: (
    <Fragment>
      Le corridor que vous parcourez est parsemé de chaînes telles un rappel de la soumission au pouvoir. Les tableaux
      aux murs suggèrent que les Paladins occupent cette place privilégiée depuis longtemps. En parlant d’eux, ces
      derniers se sont rassemblés pour un affrontement final. Leur héraut s’exclame“Vous êtes contre-nature, vous n’avez
      pas le droit d’exister. C’est aller à l’encontre de l’ordre des choses !” Et sur ces mots, ils chargent.
    </Fragment>
  ),
  bastionStep7: (
    <Fragment>
      Le corridor que vous parcourez est parsemé de chaînes telles un rappel de la soumission au pouvoir. Les tableaux
      aux murs suggèrent que les Paladins occupent cette place privilégiée depuis longtemps. En parlant d’eux, ces
      derniers se sont rassemblés pour un affrontement final. Vos efforts passés ont porté leurs fruits : ils ne sont
      vraiment pas nombreux. Leur héraut s’exclame néanmoins “Vous êtes contre-nature, vous n’avez pas le droit
      d’exister. C’est aller à l’encontre de l’ordre des choses !” Et sur ces mots, ils chargent.
    </Fragment>
  ),
  bastionAction4: 'Combattre',
  bastionAction5: 'Les nourrir',
  bastionStep8: (materials: number) => (
    <Fragment>
      Aucun n’a survécu, c’en est fini d’eux. En fouillant leur palace, vous trouvez la salle du trésor, et à
      l’intérieur <ResourceIcon type={ResourceType.Materials} text={materials} />
    </Fragment>
  ),
}
