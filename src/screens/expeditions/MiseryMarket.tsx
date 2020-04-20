/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExpeditionModal } from './components/ExpeditionModal'
import {
  ExpeditionStep,
  ExpeditionType,
  ResourceType,
  Spell,
  SPELLS_SOUL_COSTS,
  UndeadTalent,
} from '../../config/constants'
import { useTranslation } from '../../lang/useTranslation'
import { ExpeditionAction } from './components/ExpeditionAction'
import { getUndeadArmyLethality, getUndeadArmyMuscles, getUndeadCount } from '../../data/undeads/selectors'
import { textColor } from '../../styles/base'
import { TalentIcon } from '../../components/icons/TalentIcon'
import { getHasTheKey } from '../../data/spells/selectors'
import { ResourceIcon } from '../../components/icons/ResourceIcon'
import { setExpeditionStep } from '../../data/expeditions/actions'
import { gainResources, spendResources } from '../../data/resources/actions'

const MISERY_MARKET_CATAPULT_COST = 1
const MISERY_MARKET_STEP1_STRENGTH_REQUIRED = 4
const MISERY_MARKET_STEP2_LETHALITY_REQUIRED = 4
const MISERY_MARKET_STEP3_MEAT = 3
const MISERY_MARKET_STEP3_MATERIALS = 3
const MISERY_MARKET_STEP3_LETHALITY_REQUIRED = 6
const MISERY_MARKET_MEAT_REWARD = 5
const MISERY_MARKET_BONES_REWARD = 3
const MISERY_MARKET_MATERIAL_REWARD = 6

export const MiseryMarket = () => {
  const { t } = useTranslation()
  const undeadCount = useSelector(getUndeadCount)
  const muscles = useSelector(getUndeadArmyMuscles)
  const lethality = useSelector(getUndeadArmyLethality)
  const hasTheKey = useSelector(getHasTheKey)
  const dispatch = useDispatch()

  const handleCollectFinalReward = () =>
    dispatch(
      gainResources({
        [ResourceType.Meat]: MISERY_MARKET_MEAT_REWARD,
        [ResourceType.Bones]: MISERY_MARKET_BONES_REWARD,
        [ResourceType.Materials]: MISERY_MARKET_MATERIAL_REWARD,
      }),
    )

  return (
    <ExpeditionModal
      type={ExpeditionType.MiseryMarket}
      title={t('miseryMarketTitle')}
      renderOverview={() => t('miseryMarketOverview')}
      renderStep={step => {
        const handleNextStep = () => dispatch(setExpeditionStep(ExpeditionType.MiseryMarket, step + 1))

        switch (step) {
          case 0: {
            const handleCatapultUndead = () => dispatch(setExpeditionStep(ExpeditionType.MiseryMarket, step + 1))
            const handleCastTheKey = () => {
              dispatch(spendResources({ [ResourceType.Souls]: SPELLS_SOUL_COSTS[Spell.TheKey] }))
              dispatch(setExpeditionStep(ExpeditionType.MiseryMarket, step + 1))
            }
            return (
              <Fragment>
                {t('miseryMarketStep1')}
                <ExpeditionAction
                  disabled={undeadCount < MISERY_MARKET_CATAPULT_COST}
                  cost={
                    <span css={textColor('PURPLE')}>{t('miseryMarketAction1Cost', MISERY_MARKET_CATAPULT_COST)}</span>
                  }
                  onClick={handleCatapultUndead}
                >
                  {t('miseryMarketAction1')}
                </ExpeditionAction>
                <ExpeditionAction
                  disabled={muscles < MISERY_MARKET_STEP1_STRENGTH_REQUIRED}
                  prerequisites={
                    <Fragment>
                      <span css={textColor('RED')}>{MISERY_MARKET_STEP1_STRENGTH_REQUIRED}</span>&nbsp;
                      <TalentIcon type={UndeadTalent.Muscles} size="1rem" />
                    </Fragment>
                  }
                  onClick={handleNextStep}
                >
                  {t('miseryMarketAction2')}
                </ExpeditionAction>
                {hasTheKey && (
                  <ExpeditionAction
                    cost={
                      <Fragment>
                        <span css={textColor('LIGHT_BLUE')}>{SPELLS_SOUL_COSTS[Spell.TheKey]}</span>&nbsp;
                        <ResourceIcon type={ResourceType.Souls} size="1rem" />
                      </Fragment>
                    }
                    onClick={handleCastTheKey}
                  >
                    {t('miseryMarketAction3')}
                  </ExpeditionAction>
                )}
              </Fragment>
            )
          }
          case 1:
            return (
              <Fragment>
                {t('miseryMarketStep2')}
                <ExpeditionAction
                  disabled={lethality < MISERY_MARKET_STEP2_LETHALITY_REQUIRED}
                  prerequisites={
                    <Fragment>
                      <span css={textColor('PURPLE')}>{MISERY_MARKET_STEP2_LETHALITY_REQUIRED}</span>&nbsp;
                      <TalentIcon type={UndeadTalent.Lethality} size="1rem" />
                    </Fragment>
                  }
                  onClick={handleNextStep}
                >
                  {t('miseryMarketAction4')}
                </ExpeditionAction>
              </Fragment>
            )
          case 2: {
            const handleCollectAndContinue = () => {
              dispatch(
                gainResources({
                  [ResourceType.Meat]: MISERY_MARKET_STEP3_MEAT,
                  [ResourceType.Materials]: MISERY_MARKET_STEP3_MATERIALS,
                }),
              )
              handleNextStep()
            }
            return (
              <Fragment>
                {t('miseryMarketStep3', MISERY_MARKET_STEP3_MEAT, MISERY_MARKET_STEP3_MATERIALS)}
                <ExpeditionAction onClick={handleCollectAndContinue}>{t('expeditionContinue')}</ExpeditionAction>
              </Fragment>
            )
          }
          case 3: {
            const handleGoToReward = () =>
              dispatch(setExpeditionStep(ExpeditionType.MiseryMarket, ExpeditionStep.Reward))
            return (
              <Fragment>
                {t('miseryMarketStep4')}
                <ExpeditionAction
                  disabled={lethality < MISERY_MARKET_STEP3_LETHALITY_REQUIRED}
                  prerequisites={
                    <Fragment>
                      <span css={textColor('PURPLE')}>{MISERY_MARKET_STEP3_LETHALITY_REQUIRED}</span>&nbsp;
                      <TalentIcon type={UndeadTalent.Lethality} size="1rem" />
                    </Fragment>
                  }
                  onClick={handleGoToReward}
                >
                  {t('miseryMarketAction4')}
                </ExpeditionAction>
              </Fragment>
            )
          }
          default:
            throw new Error('Unknown step')
        }
      }}
      renderReward={() =>
        t('miseryMarketReward', MISERY_MARKET_MEAT_REWARD, MISERY_MARKET_BONES_REWARD, MISERY_MARKET_MATERIAL_REWARD)
      }
      onCollectReward={handleCollectFinalReward}
    />
  )
}
