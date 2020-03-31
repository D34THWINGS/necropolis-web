import React, { ReactNode } from 'react'
import { plural } from './i18nHelpers'

export const fr = {
  fleshAmount: (amount: number) => `${amount} de chair`,
  undead: (plural?: boolean) => `mort-vivant${plural ? 's' : ''}`,
  soulAmount: (amount: number) => `${amount} âme${plural(amount, 's')}`,
  defenseBonus: (amount: number) => `+${amount} en défense`,

  buildingLevel: (level: number) => `niv. ${level}`,
  charnelHouse: 'Charnier',
  charnelHouseDescription: (production: ReactNode) => <>- Produit {production} par tour.</>,
  catacomb: 'Catacombes',
  catacombDescription: (target: ReactNode) => <>- Action: Réanimer un {target}.</>,
  soulWell: 'Puit des âmes',
  soulWellDescription: (production: ReactNode) => (
    <>
      - Action: Lancer un sort.
      <br />- Produit {production} par tour.
    </>
  ),
  ossuary: 'Ossuaire',
  ossuaryDescription: '- Action: Découvrir un sort.',
  battlements: 'Remparts',
  battlementDescription: (defenseBonus: ReactNode) => <>- Confère {defenseBonus} contre les attaques de paladins.</>,

  settings: 'Paramètres',
}

export type TranslationBundle = typeof fr
export type TranslationKey = keyof TranslationBundle
