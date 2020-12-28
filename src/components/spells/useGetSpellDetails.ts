import { useCallback } from 'react'
import { isPrediction, isRestoration, isSoulStorm, isTheKey, Spell } from '../../data/spells/helpers'
import { getLethalityBonusFromEffects } from '../../data/spells/effects'
import soulStormBackgroundUrl from '../../assets/images/spells/soul-storm.jpg'
import theKeyBackgroundUrl from '../../assets/images/spells/the-key.jpg'
import { useTranslation } from '../../lang/useTranslation'

export const useGetSpellDetails = () => {
  const { t } = useTranslation()

  return useCallback(
    (spell: Spell) => {
      if (isSoulStorm(spell)) {
        return {
          label: t('soulStormLabel'),
          description: t('soulStormDescription', getLethalityBonusFromEffects(spell.effects)),
          imageUrl: soulStormBackgroundUrl,
        }
      }
      if (isRestoration(spell)) {
        return {
          label: t('restorationLabel'),
          description: t('restorationDescription', spell.healthRestored),
          imageUrl: soulStormBackgroundUrl,
        }
      }
      if (isTheKey(spell)) {
        return { label: t('theKeyLabel'), description: t('theKeyDescription'), imageUrl: theKeyBackgroundUrl }
      }
      if (isPrediction(spell)) {
        return {
          label: t('predictionLabel'),
          description: t('predictionDescription'),
          imageUrl: soulStormBackgroundUrl,
        }
      }

      // This is a safeguard because TS is stupid
      return ((_: never) => _)(spell)
    },
    [t],
  )
}
