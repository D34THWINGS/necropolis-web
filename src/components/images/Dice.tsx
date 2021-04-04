import React from 'react'
import { css } from '@emotion/react'
import { Image } from './Image'
import { UndeadTalent } from '../../config/constants'
import dexterityDiceUrl from '../../assets/images/expeditions/dices/dexterity-dice.png'
import musclesDiceUrl from '../../assets/images/expeditions/dices/muscles-dice.png'
import lethalityDiceUrl from '../../assets/images/expeditions/dices/lethality-dice.png'
import necromancyDiceUrl from '../../assets/images/expeditions/dices/necromancy-dice.png'
import subjugationDiceUrl from '../../assets/images/expeditions/dices/subjugation-dice.png'
import neutralDiceUrl from '../../assets/images/expeditions/dices/neutral-dice.png'
import { colors, fonts, shadows } from '../../config/theme'
import { textColor } from '../../styles/base'

const diceWrapper = css({
  position: 'relative',
})

const diceValue = css({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem',
  fontFamily: fonts.TITLES,
  paddingTop: '0.4rem',
  paddingRight: '0.1rem',
  textShadow: shadows.TEXT,
})

const diceImageMap: Record<UndeadTalent, string> = {
  [UndeadTalent.Dexterity]: dexterityDiceUrl,
  [UndeadTalent.Muscles]: musclesDiceUrl,
  [UndeadTalent.Lethality]: lethalityDiceUrl,
  [UndeadTalent.Necromancy]: necromancyDiceUrl,
  [UndeadTalent.Subjugation]: subjugationDiceUrl,
}

const diceColorMap: Record<UndeadTalent, keyof typeof colors> = {
  [UndeadTalent.Muscles]: 'RED',
  [UndeadTalent.Lethality]: 'NIGHT_BLUE',
  [UndeadTalent.Dexterity]: 'LIME',
  [UndeadTalent.Subjugation]: 'DARK_BLUE',
  [UndeadTalent.Necromancy]: 'PURPLE',
}

export type DiceProps = {
  value: number
  type: UndeadTalent | null
  size?: string
}

export const Dice = ({ size, value, type }: DiceProps) => (
  <span css={diceWrapper}>
    <Image src={type ? diceImageMap[type] : neutralDiceUrl} size={size} />
    <span css={[diceValue, textColor(type ? diceColorMap[type] : 'METEOR')]}>{value}</span>
  </span>
)
