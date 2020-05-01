/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExpeditionModal } from './components/ExpeditionModal'
import { ExpeditionType, ResourceType, UndeadTalent, UndeadType } from '../../config/constants'
import { useTranslation } from '../../lang/useTranslation'
import { ExpeditionAction } from './components/ExpeditionAction'
import { TalentIcon } from '../../components/talents/TalentIcon'
import { textColor } from '../../styles/base'
import { UndeadBox } from '../../components/undeads/UndeadBox'
import { createUndead } from '../../data/undeads/helpers'
import { getUndeadArmyMuscles } from '../../data/undeads/selectors'
import { gainResources } from '../../data/resources/actions'
import { addUndead } from '../../data/undeads/actions'
import { expeditionStepDescription } from './helpers/expeditionStyles'
import oldCoffinImageUrl from '../../assets/images/expeditions/oldCoffin/old-coffin.jpg'
import oldCoffin2ImageUrl from '../../assets/images/expeditions/oldCoffin/old-coffin-2.jpg'
import { ExpeditionImage } from './components/ExpeditionImage'

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
              <Fragment>
                <ExpeditionImage src={oldCoffinImageUrl} />
                <div css={expeditionStepDescription}>{t('oldCoffinStep1')}</div>
                <ExpeditionAction
                  disabled={muscles < OLD_COFFIN_STRENGTH_REQUIRED}
                  onClick={goToStep(OldCoffinStep.Reward)}
                  prerequisites={
                    <Fragment>
                      <span css={textColor('RED')}>{OLD_COFFIN_STRENGTH_REQUIRED}</span>&nbsp;
                      <TalentIcon type={UndeadTalent.Muscles} size="1rem" />
                    </Fragment>
                  }
                >
                  {t('oldCoffinOpen')}
                </ExpeditionAction>
                {renderFleeButton()}
              </Fragment>
            )
          case OldCoffinStep.Reward: {
            const brikoler = createUndead(UndeadType.Brikoler)
            const handleCollectReward = () => {
              dispatch(gainResources({ [ResourceType.Materials]: OLD_COFFIN_MATERIALS_REWARD }))
              dispatch(addUndead(brikoler))
            }

            return (
              <Fragment>
                <ExpeditionImage src={oldCoffin2ImageUrl} />
                <div css={expeditionStepDescription}>{t('oldCoffinStep2', OLD_COFFIN_MATERIALS_REWARD)}</div>
                <UndeadBox undead={brikoler} />
                {renderEndButton(handleCollectReward)}
              </Fragment>
            )
          }
          default:
            throw new Error('Unknown step')
        }
      }}
    />
  )
}
