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
    &quot;
    <span css={textColor('PURPLE')}>
      Je viens vous sortir de là, ma reine. La Faucheuse soit louée, vous êtes saine.
    </span>
    &quot;
  </Fragment>,
  <Fragment>
    Votre stelle se déplace et une lumière vient vous réchauffer.
    <br />
    <br />
    Au-dessus de vous se tient une créature décharnée portant des habits luxueux quoique déchirés.
  </Fragment>,
  <Fragment>
    &quot;
    <span css={textColor('PURPLE')}>
      Ma reine, bon retour parmi les vivants, ou devrais-je dire bon retour en ce monde. Mais la prochaine fois, faites
      votre enterrement, je vous en supplie, dans une moins grosse tombe. Des heures passent, des jours peut-être même,
      lorsqu&apos;un son de porte se fait entendre.
    </span>
    &quot;
    <br />
    Dit-il en suant abondamment.
  </Fragment>,
  <Fragment>
    &quot;
    <span css={textColor('PURPLE')}>
      Il semblerait que vous ne me reconnaissiez plus. Je suis le Valet royal, votre fidèle serviteur Qui n&apos;aspire
      qu&apos;à vous servir, ô, Marenne Déchue. Pour vous, je reconstruirais la cité avec ardeur.
    </span>
    &quot;
  </Fragment>,
  <Fragment>
    Le Valet vous fait signe d&apos;emprunter une porte, puis vous fais la visite des lieux. Vous parcourez les boyaux
    d&apos;un château tombé en désuétude.
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
