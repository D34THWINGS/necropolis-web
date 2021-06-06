import React, { useCallback } from 'react'
import { isPrediction, isRestoration, isSoulStorm, isTheKey, Spell } from '../../data/spells/helpers'
import soulStormBackgroundUrl from '../../assets/images/spells/soul-storm.jpg'
import theKeyBackgroundUrl from '../../assets/images/spells/the-key.jpg'
import { useTranslation } from '../../lang/useTranslation'
import { SpellDescription } from './SpellDescription'
import { assertNeverType } from '../../data/helpers'

export const useGetSpellDetails = ({ showExpedition = false, showAssault = false } = {}) => {
  const { t } = useTranslation()

  return useCallback(
    (spell: Spell) => {
      if (isSoulStorm(spell)) {
        return {
          label: t('soulStormLabel'),
          description: <SpellDescription spell={spell} showExpedition={showExpedition} showAssault={showAssault} />,
          imageUrl: soulStormBackgroundUrl,
        }
      }
      if (isRestoration(spell)) {
        return {
          label: t('restorationLabel'),
          description: <SpellDescription spell={spell} showExpedition={showExpedition} showAssault={showAssault} />,
          imageUrl: soulStormBackgroundUrl,
        }
      }
      if (isTheKey(spell)) {
        return {
          label: t('theKeyLabel'),
          description: <SpellDescription spell={spell} showExpedition={showExpedition} showAssault={showAssault} />,
          imageUrl: theKeyBackgroundUrl,
        }
      }
      if (isPrediction(spell)) {
        return {
          label: t('predictionLabel'),
          description: <SpellDescription spell={spell} showExpedition={showExpedition} showAssault={showAssault} />,
          imageUrl: soulStormBackgroundUrl,
        }
      }

      // This is a safeguard because TS is stupid
      return assertNeverType(spell)
    },
    [showAssault, showExpedition, t],
  )
}
