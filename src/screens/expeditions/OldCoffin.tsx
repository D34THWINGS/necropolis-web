/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExpeditionModal } from './components/ExpeditionModal'
import { ExpeditionStep, ExpeditionType, ResourceType, UndeadTalent, UndeadType } from '../../config/constants'
import { useTranslation } from '../../lang/useTranslation'
import { ExpeditionAction } from './components/ExpeditionAction'
import { TalentIcon } from '../../components/icons/TalentIcon'
import { textColor } from '../../styles/base'
import { setExpeditionStep } from '../../data/expeditions/actions'
import { UndeadBox } from '../../components/undeadOverlay/UndeadBox'
import { createUndead } from '../../data/undeads/helpers'
import { getUndeadArmyMuscles } from '../../data/undeads/selectors'
import { gainResources } from '../../data/resources/actions'
import { addUndead } from '../../data/undeads/actions'

const OLD_COFFIN_MATERIALS_REWARD = 5
const OLD_COFFIN_STRENGTH_REQUIRED = 2

export const OldCoffin = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const muscles = useSelector(getUndeadArmyMuscles)
  const brikoler = createUndead(UndeadType.Brikoler)

  const handleOpenCoffin = () => dispatch(setExpeditionStep(ExpeditionType.OldCoffin, ExpeditionStep.Reward))

  const handleCollectReward = () => {
    dispatch(gainResources({ [ResourceType.Materials]: OLD_COFFIN_MATERIALS_REWARD }))
    dispatch(addUndead(brikoler))
  }

  return (
    <ExpeditionModal
      type={ExpeditionType.OldCoffin}
      title={t('oldCoffinTitle')}
      renderOverview={() => t('oldCoffinOverview')}
      renderStep={() => (
        <Fragment>
          {t('oldCoffinStep1')}
          <ExpeditionAction
            disabled={muscles < OLD_COFFIN_STRENGTH_REQUIRED}
            onClick={handleOpenCoffin}
            prerequisites={
              <Fragment>
                <span css={textColor('RED')}>{OLD_COFFIN_STRENGTH_REQUIRED}</span>&nbsp;
                <TalentIcon type={UndeadTalent.Muscles} size="1rem" />
              </Fragment>
            }
          >
            {t('oldCoffinOpen')}
          </ExpeditionAction>
        </Fragment>
      )}
      renderReward={() => (
        <Fragment>
          {t('oldCoffinRewardPart1')}
          <UndeadBox undead={brikoler} />
          {t('oldCoffinRewardPart2', OLD_COFFIN_MATERIALS_REWARD)}
        </Fragment>
      )}
      onCollectReward={handleCollectReward}
    />
  )
}
