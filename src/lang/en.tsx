import React, { ReactNode } from 'react'
import type { TranslationBundle } from './fr'
import { plural } from './i18nHelpers'

export const en: TranslationBundle = {
  fleshAmount: (amount: number) => `${amount} of flesh`,
  undead: (plural?: boolean) => `undead${plural ? 's' : ''}`,
  soulAmount: (amount: number) => `${amount} soul${plural(amount, 's')}`,
  defenseBonus: (amount: number) => `+${amount} defense bonus`,

  buildingLevel: (level: number) => `lvl. ${level}`,
  charnelHouse: 'Charnel',
  charnelHouseDescription: (production: ReactNode) => <>- Produces {production} per round.</>,
  catacomb: 'Catacombs',
  catacombDescription: (target: ReactNode) => <>- Action: Raises an {target}.</>,
  soulWell: 'Soul well',
  soulWellDescription: (production: ReactNode) => (
    <>
      - Produces {production} per round.
      <br />- Action: Cast a spell.
    </>
  ),
  ossuary: 'Ossuary',
  ossuaryDescription: '- Action: Discover new spell.',
  battlements: 'Battlements',
  battlementDescription: (defenseBonus: ReactNode) => <>- Grants {defenseBonus} against paladins' attacks.</>,
}
