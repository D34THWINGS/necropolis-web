import { makePrediction, makeSoulStorm, makeTheKey } from '../config/constants/spellConstants'
import soulStormBackgroundUrl from '../assets/images/spells/soul-storm.jpg'
import theKeyBackgroundUrl from '../assets/images/spells/the-key.jpg'
import { useTranslation } from '../lang/useTranslation'

export const useSpells = () => {
  const { t } = useTranslation()
  return {
    soulStorm: makeSoulStorm(soulStormBackgroundUrl, t('soulStormLabel'), ({ lethalityBonus }) =>
      t('soulStormDescription', lethalityBonus ?? 0),
    ),
    theKey: makeTheKey(theKeyBackgroundUrl, t('theKeyLabel'), () => t('theKeyDescription')),
    prediction: makePrediction(soulStormBackgroundUrl, t('predictionLabel'), () => t('predictionDescription')),
  }
}
