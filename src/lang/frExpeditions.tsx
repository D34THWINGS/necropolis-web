import React from 'react'
import { alignItemsCenter, textColor } from '../styles/base'

export const frExpeditions = {
  beginExpedition: "S'y rendre",
  endExpedition: 'Partir',
  fleeExpedition: (
    <>
      Fuir
      <br />
      <span css={textColor('CYAN')}>Vous conservez les trésors obtenus</span>
    </>
  ),
  fleeExpeditionDescription: 'Les Paladins ont eu vent de votre instant de faiblesse.',
  fleeExpeditionButton: 'Partir',
  expeditionPrerequisites: 'Prérequis\u00A0:',
  expeditionCost: 'Coût\u00A0:',
  expeditionContinue: 'Continuer',
  expeditionTreasure: 'Trésors\u00A0:',

  oldCoffinTitle: 'Vieux cercueil',
  oldCoffinOverview: (
    <>
      Parmi les tombes du cimetière repose un vieux cercueil qui n&apos;a jamais connu l&apos;enterrement. Il vous
      semble avoir remué.
    </>
  ),
  oldCoffinReward: <span css={textColor('PURPLE')}>Mort-vivant</span>,
  oldCoffinStep1:
    // eslint-disable-next-line max-len
    "Vous trouvez facilement le cercueil. La vigne qui a poussé dessus ainsi que l'humidité ont pourri le bois des planches.",
  oldCoffinOpen: 'Ouvrir le cercueil',
  oldCoffinStep2: (
    <>
      Un être décharné sort du cercueil, le fameux <span css={textColor('PURPLE')}>Jan Brik&apos;Holeur</span> connu
      pour avoir été un homme à tout faire. En guise de remerciement, il part couper le gigantesque arbre au milieu du
      cimetière, comme ça.
    </>
  ),

  miseryMarketTitle: 'Marché de la Misère',
  miseryMarketOverview:
    // eslint-disable-next-line max-len
    'Bourg Misère déborde de vie et le marché est son coeur battant. Bruyant, puant, mais enrichissant.',
  miseryMarketStep1: 'Devant vous se dressent les portes de Bourg Misère. Vous n’êtes pas les bienvenues ici.',
  miseryMarketAction1: 'Catapulter un Mort-Vivant derrière les murs afin qu’il ouvre les portes',
  miseryMarketAction1Cost: (cost: number) => `${cost}\u00A0Mort-vivant`,
  miseryMarketAction1Feedback: (
    <>
      Vous construisez une catapulte en vitesse et envoyez sans regret l’un de vos serviteurs vers une mission suicide.
      Peu importe ce qui lui est arrivé, les portes sont maintenant ouvertes.
    </>
  ),
  miseryMarketAction2: 'Enfoncer les portes',
  miseryMarketAction2Feedback: 'Les portes vous sont maintenant ouvertes.',
  miseryMarketAction3: (
    <>
      Lancer <span css={textColor('LIGHT_BLUE')}>La Clé</span> sur la porte principale
    </>
  ),
  miseryMarketAction3Feedback: 'Des portes ne restent que des miettes.',
  miseryMarketStep2: (
    <>
      La Garde de Bourg Misère s’est amassée devant vous, formant comme un épais barrage de chair vous bloquant le
      passage.
    </>
  ),
  miseryMarketAction4: 'Combattre',
  miseryMarketStep3: (
    <>
      Alors que vos ennemis commencent à faiblir, la plupart battent en retraite vers le centre-ville. Vous en profitez
      pour piller les alentours.
    </>
  ),
  miseryMarketStep4:
    // eslint-disable-next-line max-len
    'Vous vous tenez devant les dernières défenses de la ville : de nombreux Gardes en position derrière leurs barricades.',
  miseryMarketReward: (
    <>
      Tous ces hommes sont morts, cruellement arrachés à leurs familles. Ils ne faisaient que suivre les ordres. Mais
      vous vous dites que justement, ils faisaient partie de la Chaîne, de l’ordre établi. Quant à leurs maîtres, ils se
      trouvent dans l’Hôtel de Ville. Vous en profitez pour mettre à sac le Bourg.
    </>
  ),

  townHallTitle: 'Hôtel de ville',
  townHallOverview:
    // eslint-disable-next-line max-len
    'Haut lieu du pouvoir des Paladins craints et respectés. C’est ici qu’ils édictent les lois, rendent la justice et enferment leurs prisonniers.',
  townHallRewardOverview: 'variable',
  townHallStep1: 'Une large porte couverte de chaînes vous empêche d’entrer.',
  townHallAction1: (
    <>
      Lancer <span css={textColor('LIGHT_BLUE')}>La Clé</span> sur la porte
    </>
  ),
  townHallAction6: <>Enfoncer la porte</>,
  townHallStep2: 'De la porte, il n’en reste que des miettes.',
  townHallStep3: (cost: number) => (
    <>
      Votre intrusion a alerté le bâtiment. Les Paladins décident d’y mettre le feu et fuient une fois de plus, mais
      cette fois-ci vers le Bastion. Vous perdez <span css={textColor('PURPLE')}>{cost} Mort-vivant</span> dans les
      flammes.
    </>
  ),
  townHallAction2: 'Les poursuivre',
  townHallAction3: 'Piller autant que vous le pouvez',
  townHallAction4: 'Fouiller les geôles',
  townHallStep4: (
    <>
      Vous réussissez à tuer plusieurs fuyards, ce qui devrait vous alléger la tâche au Bastion. Par ailleurs, vous
      trouvez sur l’un des cadavres le plan d’un passage secret dans le Bastion.
    </>
  ),
  townHallStep5: <>L&apos;Hôtel de ville est emporté dans le brasier.</>,
  townHallStep6: (isBloodPrinceInJail: boolean) =>
    isBloodPrinceInJail ? (
      <>
        Vous libérez le <span css={[alignItemsCenter, textColor('PURPLE')]}>Prince de Sang-Séché</span>. Ce dernier
        s’explique :<br />
        <i>
          &ldquo;Les Paladins m’ont mis en prison car ils doutaient de ma loyauté. L’un a proposé de prendre ma baguette
          et de me tuer, mais un changement dans le script me sauva la mise. Merci de m’avoir libéré.&rdquo;
        </i>
      </>
    ) : (
      'Vous ne trouvez rien d’intéressant dans les geôles.'
    ),

  bastionTitle: 'Bastion',
  bastionOverview:
    // eslint-disable-next-line max-len
    'Ce somptueux fortin est le dernier bastion des Paladins. Toutes ces richesses qu’ils prétendent mériter, vous comptez bien les en déshériter.',
  bastionStep1: 'L’ultime rencontre vous attend au-delà de ce pont-levis.',
  bastionAction1: (
    <>
      Utiliser <span css={textColor('LIGHT_BLUE')}>La Clé</span>
    </>
  ),
  bastionAction6: <>Soulever la herse</>,
  bastionStep2: 'La porte est grande ouverte, la fin est proche.',
  bastionStep3:
    // eslint-disable-next-line max-len
    'Vous pénétrez un immense hall magnifiquement décoré. Une horde de molosses enragés vous propose une visite guidée… de leurs estomacs.',
  bastionAction2: 'Combattre',
  bastionAction3: 'Les nourrir',
  bastionStep4: (
    <>Après quelques os broyés et chaires déchiquetés le &ldquo;comité d&apos;accueil&rdquo; n&apos;est plus.</>
  ),
  bastionStep5: 'Le comité d’accueil apprécie votre généreux pourboire.',
  bastionStep6: (
    <>
      Vous déboulez sur un corridor parsemé de chaînes telles un rappel de la soumission au pouvoir. Les tableaux aux
      murs suggèrent que les Paladins occupent cette place privilégiée depuis longtemps. Ces derniers se sont
      d&apos;ailleurs rassemblés pour l&apos;affrontement final.
      <br />
      <span css={textColor('RED')}>Nous seuls méritons le pouvoir. Faites comme tout le monde et obéissez !</span>
    </>
  ),
  bastionStep7: (
    <>
      Vous déboulez sur un corridor parsemé de chaînes telles un rappel de la soumission au pouvoir. Les tableaux aux
      murs suggèrent que les Paladins occupent cette place privilégiée depuis longtemps. Ces derniers se sont
      d&apos;ailleurs rassemblés pour l&apos;affrontement final. Vos efforts passés ont porté leurs fruits : ils ne sont
      vraiment pas nombreux.
      <br />
      <span css={textColor('RED')}>Nous seuls méritons le pouvoir. Faites comme tout le monde et obéissez !</span>
    </>
  ),
  bastionAction4: 'Combattre',
  bastionAction5: 'Obéir',
  bastionStep8: <>Aucun n’a survécu, c’en est fini d’eux. En fouillant leur palace, vous trouvez la salle du trésor.</>,
  bastionStep9: (
    <>
      Les Paladins vous ont réduit à l&apos;esclavage. Maintenant, vous travaillez dur et payez des impôts injustifiés
      comme tout le monde.
    </>
  ),
  bastionAction7: 'Argh!',
}
