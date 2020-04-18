/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { plural } from './i18nHelpers'
import { textColor } from '../styles/base'
import { UndeadType } from '../config/constants'

export const fr = {
  buildingLevel: (level: number) => `niv. ${level}`,

  charnelHouse: 'Charnier',
  charnelHouseDescription: (meat: number, bones: number, turns: number) => (
    <Fragment>
      - Produit{' '}
      <span css={textColor('RED')}>
        {meat} chair{plural(meat, 's')}
      </span>{' '}
      par tour.
      <br />
      {bones === 0 ? null : (
        <Fragment>
          - Produit{' '}
          <span css={textColor('BROWN')}>
            {bones} ossement{plural(bones, 's')}
          </span>{' '}
          tous les <span css={textColor('CYAN')}>{turns}</span> tour{plural(turns, 's')}
        </Fragment>
      )}
    </Fragment>
  ),
  charnelHouseUnlock: (meat: number) => (
    <Fragment>
      Produit{' '}
      <span css={textColor('RED')}>
        {meat} chair{plural(meat, 's')}
      </span>{' '}
      par tour.
    </Fragment>
  ),
  charnelHouseUpgrade: (bones: number, turns: number) => (
    <Fragment>
      Produit{' '}
      <span css={textColor('BROWN')}>
        {bones} ossement{plural(bones, 's')}
      </span>{' '}
      tous les <span css={textColor('CYAN')}>{turns}</span> tour{plural(turns, 's')}
    </Fragment>
  ),

  catacomb: 'Catacombes',
  catacombDescription: (current: number, max: number, price: number) => (
    <Fragment>
      - Action: <span css={textColor('PURPLE')}>Réanimer un mort-vivant</span> au prix de{' '}
      <span css={textColor('CYAN')}>
        {price} âme{plural(price, 's')}
      </span>
      .<br />-{' '}
      <span css={textColor('PURPLE')}>
        Morts-vivants réanimés : {current}/{max}
      </span>
      .
    </Fragment>
  ),
  catacombUnlock: (
    <Fragment>
      Débloque l&apos;action &quot;<span css={textColor('PURPLE')}>Réanimer un mort</span>&quot;
    </Fragment>
  ),
  catacombUpgrade: (count: number) => (
    <Fragment>
      Permet de réanimer{' '}
      <span css={textColor('PURPLE')}>
        {count} mort-vivant supplémentaire{plural(count, 's')}
      </span>
    </Fragment>
  ),

  soulWell: 'Puit des âmes',
  soulWellDescription: (production: number) => (
    <Fragment>
      - Action: <span css={textColor('BLUE')}>Lancer un sort</span>.
      <br />- Produit{' '}
      <span css={textColor('BLUE')}>
        {production} âme{plural(production, 's')}
      </span>{' '}
      par tour.
    </Fragment>
  ),
  soulWellUnlock: (souls: number) => (
    <Fragment>
      Produit{' '}
      <span css={textColor('BLUE')}>
        {souls} âme{plural(souls, 's')}
      </span>{' '}
      par tour.
    </Fragment>
  ),
  soulWellUpgradeStorm: (
    <Fragment>
      Débloque le sort &quot;<span css={textColor('BLUE')}>Déluge d&apos;âme</span>&quot;
    </Fragment>
  ),
  soulWellUpgrade: (souls: number) => (
    <Fragment>
      Augmente la production de{' '}
      <span css={textColor('BLUE')}>
        {souls} âme{plural(souls, 's')}
      </span>{' '}
      par tour.
    </Fragment>
  ),

  ossuary: 'Ossuaire',
  ossuaryDescription: (cost: number) => (
    <Fragment>
      - Action : <span css={textColor('BROWN')}>Découvrir un Sort</span> au prix de {cost} Ossements.
      <br />- Les <span css={textColor('BROWN')}>ossements</span> s&apos;obtiennent dans des excursions et des
      évènements particuliers.
    </Fragment>
  ),
  ossuaryUnlock: (
    <Fragment>
      Débloque l&apos;action &quot;<span css={textColor('BROWN')}>Découvrir un sort</span>&quot;
    </Fragment>
  ),
  ossuaryUpgrade: (meat: number, bones: number) => (
    <Fragment>
      Découvre{' '}
      <span css={textColor('RED')}>
        {meat} chair{plural(meat, 's')}
      </span>{' '}
      et{' '}
      <span css={textColor('BROWN')}>
        {bones} ossement{plural(meat, 's')}
      </span>
      .
    </Fragment>
  ),

  battlements: 'Remparts',
  battlementDescription: (defenseBonus: number) => (
    <Fragment>
      - Confère <span css={textColor('LIME')}>+{defenseBonus} Défense</span> contre les attaques de paladins.
    </Fragment>
  ),
  battlementUpgrade: (defenseBonus: number) => (
    <Fragment>
      Confère <span css={textColor('LIME')}>+{defenseBonus} Défense</span> contre les attaques de paladins.
    </Fragment>
  ),

  settings: 'Paramètres',

  undeadOverlayTitle: 'Morts-vivants',
  undeadUpkeep: (meatCost: number) => `Consomation par tour : ${meatCost}`,
  undeadName: (type: UndeadType) => {
    switch (type) {
      case UndeadType.Valet:
        return 'Valet'
      case UndeadType.Brikoler:
        return "Jan Brik'Holeur"
      case UndeadType.LaMotte:
        return 'Sir de la Motte'
      case UndeadType.Skeleton:
        return 'Squelette'
      case UndeadType.BloodPrince:
        return 'Prince de Sang-Séché'
      default:
        return ''
    }
  },
  undeadTalents: 'Talents :',
  undeadAbility: 'Capacité :',
}

export type TranslationBundle = typeof fr
export type TranslationKey = keyof TranslationBundle
