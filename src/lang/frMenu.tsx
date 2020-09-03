import React from 'react'
import { textColor } from '../styles/base'

export const frMenu = {
  newGame: 'Nouvelle partie',
  continueGame: 'Continuer',
  characterChoosing: 'Choix du scénario',
  beginGame: 'Commencer',
  marenne: 'Marenne',
  marenneDescription: (
    <>
      Découvrez <span css={textColor('CYAN')}>Sinistra</span>, ses contrées et ses personnages en incarnant une reine
      bienveillante. Du moins au premier abord.
      <br />
      <span css={textColor('CYAN')}>Objectif&nbsp;:</span> Construire et améliorer toutes les salles de la nécropole au
      niveau 3.
    </>
  ),
}
