/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExpeditionModal } from './components/ExpeditionModal'
import { ExpeditionType, ResourceType, Spell, SPELLS_SOUL_COSTS, UndeadTalent } from '../../config/constants'
import { useTranslation } from '../../lang/useTranslation'
import { ExpeditionAction } from './components/ExpeditionAction'
import { getUndeadArmyMuscles, getUndeadCount } from '../../data/undeads/selectors'
import { textColor } from '../../styles/base'
import { TalentIcon } from '../../components/images/TalentIcon'
import { getHasTheKey } from '../../data/spells/selectors'
import { ResourceIcon } from '../../components/images/ResourceIcon'
import { gainResources, spendResources } from '../../data/resources/actions'
import { getSouls } from '../../data/resources/selectors'
import { requireSacrifice } from '../../data/undeads/actions'
import { getLethality } from '../../data/selectors'
import { triggerCarnage } from '../../data/expeditions/actions'

const MISERY_MARKET_CATAPULT_COST = 1
const MISERY_MARKET_STEP1_STRENGTH_REQUIRED = 4
const MISERY_MARKET_STEP2_LETHALITY_REQUIRED = 4
const MISERY_MARKET_STEP3_MEAT = 3
const MISERY_MARKET_STEP3_MATERIALS = 3
const MISERY_MARKET_STEP3_LETHALITY_REQUIRED = 6
const MISERY_MARKET_MEAT_REWARD = 5
const MISERY_MARKET_BONES_REWARD = 3
const MISERY_MARKET_MATERIAL_REWARD = 6

enum MiseryMarketStep {
  Doors,
  Guards,
  GuardsFlee,
  LastStand,
  Carnage,
}

export const MiseryMarket = () => {
  const { t } = useTranslation()
  const undeadCount = useSelector(getUndeadCount)
  const muscles = useSelector(getUndeadArmyMuscles)
  const lethality = useSelector(getLethality)
  const hasTheKey = useSelector(getHasTheKey)
  const souls = useSelector(getSouls)
  const dispatch = useDispatch()

  return (
    <ExpeditionModal<MiseryMarketStep>
      type={ExpeditionType.MiseryMarket}
      title={t('miseryMarketTitle')}
      renderOverview={() => t('miseryMarketOverview')}
      renderTreasure={() => (
        <Fragment>
          <ResourceIcon type={ResourceType.Meat} marginRight="0.4rem" />
          <ResourceIcon type={ResourceType.Materials} />
        </Fragment>
      )}
      renderStep={(step, { goToStep, renderFleeButton, renderEndButton, renderContinueButton }) => {
        switch (step) {
          case MiseryMarketStep.Doors: {
            const handleCastTheKey = () => {
              dispatch(spendResources({ [ResourceType.Souls]: SPELLS_SOUL_COSTS[Spell.TheKey] }))
              goToStep(MiseryMarketStep.Guards)()
            }
            const handleCatapultUndead = () => {
              dispatch(requireSacrifice(MISERY_MARKET_CATAPULT_COST))
              goToStep(MiseryMarketStep.Guards)()
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
                  onClick={goToStep(MiseryMarketStep.Guards)}
                >
                  {t('miseryMarketAction2')}
                </ExpeditionAction>
                {hasTheKey && (
                  <ExpeditionAction
                    disabled={souls < SPELLS_SOUL_COSTS[Spell.TheKey]}
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
                {renderFleeButton()}
              </Fragment>
            )
          }
          case MiseryMarketStep.Guards:
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
                  onClick={goToStep(MiseryMarketStep.GuardsFlee)}
                >
                  {t('miseryMarketAction4')}
                </ExpeditionAction>
                {renderFleeButton()}
              </Fragment>
            )
          case MiseryMarketStep.GuardsFlee: {
            const handleCollectAndContinue = () => {
              dispatch(
                gainResources({
                  [ResourceType.Meat]: MISERY_MARKET_STEP3_MEAT,
                  [ResourceType.Materials]: MISERY_MARKET_STEP3_MATERIALS,
                }),
              )
              goToStep(MiseryMarketStep.LastStand)()
            }
            return (
              <Fragment>
                {t('miseryMarketStep3', MISERY_MARKET_STEP3_MEAT, MISERY_MARKET_STEP3_MATERIALS)}
                {renderContinueButton(MiseryMarketStep.LastStand, handleCollectAndContinue)}
              </Fragment>
            )
          }
          case MiseryMarketStep.LastStand:
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
                  onClick={goToStep(MiseryMarketStep.Carnage)}
                >
                  {t('miseryMarketAction4')}
                </ExpeditionAction>
                {renderFleeButton()}
              </Fragment>
            )
          case MiseryMarketStep.Carnage: {
            const handleCollectFinalReward = () => {
              dispatch(
                gainResources({
                  [ResourceType.Meat]: MISERY_MARKET_MEAT_REWARD,
                  [ResourceType.Bones]: MISERY_MARKET_BONES_REWARD,
                  [ResourceType.Materials]: MISERY_MARKET_MATERIAL_REWARD,
                }),
              )
              dispatch(triggerCarnage())
            }
            return (
              <Fragment>
                {t(
                  'miseryMarketReward',
                  MISERY_MARKET_MEAT_REWARD,
                  MISERY_MARKET_BONES_REWARD,
                  MISERY_MARKET_MATERIAL_REWARD,
                )}
                {renderEndButton(handleCollectFinalReward)}
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
