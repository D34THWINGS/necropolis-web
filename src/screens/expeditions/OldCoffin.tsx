import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExpeditionModal } from './components/ExpeditionModal'
import { ExpeditionType, OnboardingStep, ResourceType, UndeadTalent, UndeadType } from '../../config/constants'
import { useTranslation } from '../../lang/useTranslation'
import { ExpeditionAction } from './components/ExpeditionAction'
import { TalentIcon } from '../../components/talents/TalentIcon'
import { UndeadBox } from '../../components/undeads/UndeadBox'
import { createUndead } from '../../data/undeads/helpers'
import { getUndeadArmyMuscles } from '../../data/undeads/selectors'
import { gainResources } from '../../data/resources/actions'
import { addUndead } from '../../data/undeads/actions'
import { expeditionStepDescription } from './helpers/expeditionStyles'
import oldCoffinImageUrl from '../../assets/images/expeditions/oldCoffin/old-coffin.jpg'
import oldCoffin2ImageUrl from '../../assets/images/expeditions/oldCoffin/old-coffin-2.jpg'
import { ExpeditionImage } from './components/ExpeditionImage'
import { getOnboardingStep } from '../../data/onboarding/selectors'
import { nextOnboardingStep } from '../../data/onboarding/actions'

const OLD_COFFIN_MATERIALS_REWARD = 5
const OLD_COFFIN_STRENGTH_REQUIRED = 1

enum OldCoffinStep {
  Setup,
  Reward,
}

export const OldCoffin = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const muscles = useSelector(getUndeadArmyMuscles)
  const onboardingStep = useSelector(getOnboardingStep)

  return (
    <ExpeditionModal<OldCoffinStep>
      type={ExpeditionType.OldCoffin}
      title={t('oldCoffinTitle')}
      renderOverview={() => t('oldCoffinOverview')}
      renderTreasure={() => t('oldCoffinReward')}
      renderStep={(step, { goToStep, renderFleeButton, renderEndButton }) => {
        switch (step) {
          case OldCoffinStep.Setup:
            return (
              <>
                <ExpeditionImage src={oldCoffinImageUrl} />
                <div css={expeditionStepDescription}>{t('oldCoffinStep1')}</div>
                <ExpeditionAction
                  disabled={muscles < OLD_COFFIN_STRENGTH_REQUIRED}
                  onClick={goToStep(OldCoffinStep.Reward)}
                  prerequisites={
                    <TalentIcon type={UndeadTalent.Muscles} size="1rem" text={OLD_COFFIN_STRENGTH_REQUIRED} />
                  }
                >
                  {t('oldCoffinOpen')}
                </ExpeditionAction>
                {renderFleeButton()}
              </>
            )
          case OldCoffinStep.Reward: {
            const brikoler = createUndead(UndeadType.Brikoler)
            const handleCollectReward = () => {
              dispatch(gainResources({ [ResourceType.Materials]: OLD_COFFIN_MATERIALS_REWARD }))
              dispatch(addUndead(brikoler))
              if (onboardingStep === OnboardingStep.AwaitOldCoffin) {
                dispatch(nextOnboardingStep())
              }
            }

            return (
              <>
                <ExpeditionImage src={oldCoffin2ImageUrl} />
                <div css={expeditionStepDescription}>{t('oldCoffinStep2', OLD_COFFIN_MATERIALS_REWARD)}</div>
                <UndeadBox undead={brikoler} />
                {renderEndButton(handleCollectReward)}
              </>
            )
          }
          default:
            throw new Error('Unknown step')
        }
      }}
    />
  )
}
