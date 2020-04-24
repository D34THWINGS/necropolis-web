/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { textColor } from '../styles/base'

const introTexts = [
  'Froid.',
  'La sensation parcourt tout votre corps. Est-ce donc cela, la vie après la mort?',
  // eslint-disable-next-line max-len
  "Le simple fait d’y penser vous fait réaliser que vous n'êtes pas morte, ou plus exactement que vous n'êtes plus morte.",
  "La situation ne s'arrange pas pour autant : vous êtes bloquée dans votre tombeau.",
  <Fragment>
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
  </Fragment>,
  <Fragment>
    Votre stèle se déplace tandis qu’une lumière vient vous réchauffer.
    <br />
    <br />
    Au-dessus de vous se tient une créature décharnée portant des habits luxueux quoique déchirés.
  </Fragment>,
  <Fragment>
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
  </Fragment>,
  <Fragment>
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
  </Fragment>,
  <Fragment>
    Le Valet vous fait signe d&apos;emprunter une porte, puis vous fais la visite des lieux. Vous parcourez les boyaux
    d&apos;un château en ruine.
    <br />
    <br />
    Bienvenue chez vous.
  </Fragment>,
  'Des souvenirs vous reviennent. Prospérité est le mot qui décrirait au mieux votre règne en tant qu’humaine.',
  // eslint-disable-next-line max-len
  "Quand est-il du peuple ?! Le Valet répond qu'il fut emporté avec vous par une terrible maladie, mais que certains sont fraîchement revenus à la vie.",
  // eslint-disable-next-line max-len
  'Malgré le froid coulant dans vos veines, vous vous sentez poussée par une ardeur nouvelle. Vous ne pouvez pas laisser votre royaume dans ce piteux état, vous devez le restaurer. Pour vous et pour votre peuple.',
  'Créer une société prospère.',
]

export const frOnboarding = {
  introText: (step: number) => introTexts[step],
}
