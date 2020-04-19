/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { plural } from './i18nHelpers'
import { noBreak, textColor } from '../styles/base'
import { Spell, UndeadTalent, UndeadType } from '../config/constants'
import { TalentIcon } from '../components/icons/TalentIcon'

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

  turns: 'Tours de jeu',
  turnsEventSpacing: (turnSpacing: number) => (
    <Fragment>
      Un évènement aléatoire a lieu tous les <span css={textColor('CYAN')}>{turnSpacing}</span> tours.
    </Fragment>
  ),
  turnsNextEvent: (nextEventIn: number) => (
    <Fragment>
      <span css={textColor('CYAN')}>Prochain évènement dans :</span> {nextEventIn} tour.
    </Fragment>
  ),
  skipTurn: 'Passer le tour',

  paladins: (strengthIncrement: number, turns: number) => (
    <Fragment>
      Les paladins du coin attaquent régulièrement la Nécropole. La <span css={textColor('RED')}>force</span> de leurs
      assauts augmente de <span css={textColor('RED')}>{strengthIncrement}</span> tous les{' '}
      <span css={textColor('CYAN')}>{turns}</span> tours.
    </Fragment>
  ),
  paladinsStrength: (strength: number) => `Force actuelle : ${strength}`,

  upkeepTitle: 'Ravitaillement',
  upkeepInsufficient: (upkeep: number, meat: number) => (
    <Fragment>
      Votre armée consomme trop de{' '}
      <span css={textColor('RED')}>
        chair ({upkeep}/{meat})
      </span>
      . Des sacrifices sont nécessaires pour continuer.
    </Fragment>
  ),

  spells: 'Sorts',
  spellName: (type: Spell) => {
    switch (type) {
      case Spell.SoulStorm:
        return 'Déluge des âmes'
      case Spell.TheKey:
        return 'La clé'
      default:
        throw new Error('Unknown spell')
    }
  },
  soulStormDescription: (defenseBonus: number, lethalityBonus: number) => (
    <Fragment>
      Confère <span css={textColor('LIME')}>+{defenseBonus}&nbsp;défense</span> et{' '}
      <span css={[noBreak, textColor('PURPLE')]}>
        +{lethalityBonus}&nbsp;
        <TalentIcon type={UndeadTalent.Lethality} size="1.2rem" />
      </span>{' '}
      jusqu&apos;à la fin du tour.
    </Fragment>
  ),
  theKeyDescription: "Brise l'évènement en cours.",
}

export type TranslationBundle = typeof fr
export type TranslationKey = keyof TranslationBundle
