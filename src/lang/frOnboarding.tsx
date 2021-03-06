import React from 'react'
import { smallMarginTop, textColor } from '../styles/base'
import { ResourceIcon } from '../components/resources/ResourceIcon'
import { ResourceType } from '../config/constants'

const introTexts = [
  'Froid.',
  'La sensation parcourt tout votre corps. Est-ce donc cela, la vie après la mort?',
  "Le simple fait d’y penser vous fait réaliser que vous n'êtes pas morte, ou plus exactement que vous n'êtes plus morte.",
  "La situation ne s'arrange pas pour autant : vous êtes bloquée dans votre tombeau.",
  <>
    Des heures passent, des jours peut-être même, lorsqu&apos;un son de porte se fait entendre.
    <br />
    <br />
    <span css={textColor('PURPLE')}>
      Vous êtes là, ma reine&nbsp;?
      <br />
      Je viens vous sauver&nbsp;!
      <br />
      Vous êtes donc saine,
      <br />
      La mort soit louée&nbsp;!
    </span>
  </>,
  '',
  <>
    <span css={textColor('PURPLE')}>
      Il est si pesant&nbsp;!
      <br />
      La prochaine fois, pitié,
      <br />
      Enterrez-vous dans...
      <br />
      Un tombeau plus léger.
    </span>
    <br />
    <br />
    Dit-il en suant abondamment.
  </>,
  <>
    <span css={textColor('PURPLE')}>
      Devant vous respire
      <br />
      L&apos;humble Valet Moulu&nbsp;!
      <br />
      Pour vous servir
      <br />
      Ô, Marenne Déchue
      <br />
      <br />
      Oui, je ferais tout.
      <br />
      Vous aider à bâtir,
      <br />
      Et donner des coups,
      <br />
      Jusqu’à m’en maudire&nbsp;!
    </span>
  </>,
  <>
    Le Valet vous fait signe d&apos;emprunter une porte, puis vous fais la visite des lieux. Vous parcourez les boyaux
    d&apos;un château en ruine.
    <br />
    <br />
    Bienvenue chez vous.
  </>,
  'Des souvenirs vous reviennent. Prospérité est le mot qui décrirait au mieux votre règne en tant qu’humaine.',
  "Quand est-il du peuple ?! Le Valet répond qu'il fut emporté avec vous par une terrible maladie, mais que certains sont fraîchement revenus à la vie.",
  'Malgré le froid coulant dans vos veines, vous vous sentez poussée par une ardeur nouvelle. Vous ne pouvez pas laisser votre royaume dans ce piteux état, vous devez le restaurer. Pour vous et pour votre peuple.',
  'Créer une société prospère.',
]

export const frOnboarding = {
  introText: (step: number) => introTexts[step],
  onboardingNext: 'Suite',
  onboardingGamePresentation: <>Chaque mois ou tour de jeu se déroule en 4 phases.</>,
  onboardingProductionPhase: (
    <>
      <div>1) Phase de Production</div>
      <div css={smallMarginTop}>Les salles produisent des ressources.</div>
    </>
  ),
  onboardingEventPhase: (
    <>
      <div>2) Phase d’Évènement</div>
      <div css={smallMarginTop}>
        Un évènement a lieu tous les 3 tours à partir du 3ème tour. Quand un évènement a lieu, je dois le résoudre afin
        de passer à la phase suivante. Voici le compteur de tour.
      </div>
    </>
  ),
  onboardingActionPhase: (
    <>
      <div>3) Phase d’Action</div>
      <div css={smallMarginTop}>
        J’effectue une <span css={textColor('CYAN')}>Action</span>.
      </div>
    </>
  ),
  onboardingUpkeepPhase: (
    <>
      <div>4) Phase de Ravitaillement</div>
      <div css={smallMarginTop}>
        Chaque <span css={textColor('PURPLE')}>Morts-vivant</span> présent dans la Nécropole consomme de la{' '}
        <ResourceIcon type={ResourceType.Meat} text="chair" /> . En cas de pénurie, le ou les Morts-vivant de mon choix
        meurent de famine.
      </div>
    </>
  ),
  onboardingFirstAction: (
    <>
      Pour votre première Action, ma reine, je propose de construire le <b>Charnier</b>. Vite, avant que vous ne me
      perdiez&nbsp;!
    </>
  ),
  onboardingMaterials: (materials: number, meat: number) => (
    <>
      Pour ce faire, nous avons besoin de <ResourceIcon type={ResourceType.Materials} text="matériaux" />. Mais nulle
      crainte, j’ai déjà trouvé ce qu’il faut&nbsp;! (<ResourceIcon type={ResourceType.Materials} text={materials} />
      &nbsp;
      <ResourceIcon type={ResourceType.Meat} text={meat} />)
    </>
  ),
  onboardingBuild: (
    <>
      Construire est une <span css={textColor('CYAN')}>Action</span>.
    </>
  ),
  onboardingUpkeepReminder: (
    <>
      Je dois garder en tête que la consommation des <span css={textColor('PURPLE')}>Morts-vivant</span> est soustraite
      à la production de <ResourceIcon type={ResourceType.Meat} text="chair" /> à la fin de chaque tour.
    </>
  ),
  onboardingBuildSoulWell: (
    <>
      Pour aller plus loin, il va me falloir plus de citoyens. Je pourrais réanimer quelques dépouilles dans les
      Catacombes, mais il me manque quelque chose... L’élément de la vie. Je dois d&apos;abord construire un Puits des
      Âmes.
    </>
  ),
  onboardingSoulWellDescription: (
    <>
      Celui-ci me permettra de récolter les <ResourceIcon type={ResourceType.Souls} text="âmes" /> nécessaire pour
      ramener à la vie les dépouilles enfouies dans les Catacombes.
    </>
  ),
  onboardingNoMoreMaterials: (
    <>
      Marenne, votre nouvel édifice m&apos;ébahit&nbsp;! Cependant, notre réserve de{' '}
      <ResourceIcon type={ResourceType.Materials} text="matériaux" /> s&apos;est tarie.
    </>
  ),
  onboardingLetsExplore: <>Partons donc explorer les alentours. Qui sait quels trésors trouverons-nous&nbsp;?</>,
  onboardingStartSmall: <>Commençons avec quelque chose de facile...</>,
  onboardingCoffinHelp: (
    <>
      Je vais avoir besoin des <span css={textColor('CYAN')}>Talents</span> de mon serviteur.
    </>
  ),
  onboardingBuildCatacombs: (
    <>
      Je dispose maintenant des <ResourceIcon type={ResourceType.Materials} text="matériaux" /> nécessaires à la
      construction des Catacombes. Au tour prochain, j’aurai également suffisamment{' '}
      <ResourceIcon type={ResourceType.Souls} text="d'âmes" /> pour réanimer un{' '}
      <span css={textColor('PURPLE')}>Mort-Vivant</span>.
    </>
  ),
  onboardingBuildOssuary: (
    <>
      Les <ResourceIcon type={ResourceType.Souls} text="âmes" /> sont une source puissante de pouvoir… Je pourrais les
      utiliser pour lancer des Sorts&nbsp;! Mais d&apos;abord, je dois en découvrir un en construisant l&apos;Ossuaire .
    </>
  ),
  onboardingBuildArsenal: (
    <>
      Mais que nous veulent-ils à la fin, ces fichus Paladins&nbsp;? Construisez des Remparts pour renforcer la{' '}
      <span css={textColor('LIME')}>Défense</span> de notre fortin. Si lorsqu&apos;ils attaquent, cette dernière est
      inférieure à leur <span css={textColor('RED')}>Force</span>, Je crains que les choses pour nous se corsent.
    </>
  ),
}
