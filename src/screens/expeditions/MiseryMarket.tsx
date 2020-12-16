import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExpeditionModal } from './components/ExpeditionModal'
import { ExpeditionType, ResourceType, UndeadTalent } from '../../config/constants'
import { useTranslation } from '../../lang/useTranslation'
import { ExpeditionAction } from './components/ExpeditionAction'
import { getUndeadArmyMuscles, getUndeadCount } from '../../data/undeads/selectors'
import { textColor } from '../../styles/base'
import { TalentIcon } from '../../components/talents/TalentIcon'
import { getTheKey } from '../../data/spells/selectors'
import { ResourceIcon } from '../../components/resources/ResourceIcon'
import { gainResources } from '../../data/resources/actions'
import { getSouls } from '../../data/resources/selectors'
import { requireSacrifice } from '../../data/undeads/actions'
import { getLethality } from '../../data/selectors'
import { triggerCarnage } from '../../data/expeditions/actions'
import { castSpell } from '../../data/spells/actions'
import miseryMarketImageUrl from '../../assets/images/expeditions/miseryMarket/misery-market.jpg'
import miseryMarketImage2Url from '../../assets/images/expeditions/miseryMarket/misery-market-2.jpg'
import { ExpeditionImage } from './components/ExpeditionImage'
import { expeditionStepDescription } from './helpers/expeditionStyles'
import { canCast } from '../../data/spells/helpers'

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
  Catapulted,
  DoorsBroken,
  DoorsAnnihilated,
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
  const souls = useSelector(getSouls)
  const theKey = useSelector(getTheKey)
  const dispatch = useDispatch()

  return (
    <ExpeditionModal<MiseryMarketStep>
      type={ExpeditionType.MiseryMarket}
      title={t('miseryMarketTitle')}
      renderOverview={() => t('miseryMarketOverview')}
      renderTreasure={() => (
        <>
          <ResourceIcon type={ResourceType.Meat} marginRight="0.4rem" />
          <ResourceIcon type={ResourceType.Materials} />
        </>
      )}
      renderStep={(step, { goToStep, renderFleeButton, renderEndButton, renderContinueButton, renderLoot }) => {
        switch (step) {
          case MiseryMarketStep.Doors: {
            const handleCatapultUndead = () => {
              dispatch(requireSacrifice(MISERY_MARKET_CATAPULT_COST))
              goToStep(MiseryMarketStep.Catapulted)()
            }
            return (
              <>
                <ExpeditionImage src={miseryMarketImageUrl} />
                <div css={expeditionStepDescription}>{t('miseryMarketStep1')}</div>
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
                    <TalentIcon type={UndeadTalent.Muscles} text={MISERY_MARKET_STEP1_STRENGTH_REQUIRED} size="1rem" />
                  }
                  onClick={goToStep(MiseryMarketStep.DoorsBroken)}
                >
                  {t('miseryMarketAction2')}
                </ExpeditionAction>
                {theKey && (
                  <ExpeditionAction
                    disabled={!canCast(theKey, souls)}
                    cost={<ResourceIcon type={ResourceType.Souls} text={theKey.cost} size="1rem" />}
                    onClick={() => {
                      dispatch(castSpell(theKey))
                      goToStep(MiseryMarketStep.DoorsAnnihilated)()
                    }}
                  >
                    {t('miseryMarketAction3')}
                  </ExpeditionAction>
                )}
                {renderFleeButton()}
              </>
            )
          }
          case MiseryMarketStep.Catapulted:
            return (
              <>
                {t('miseryMarketAction1Feedback')}
                {renderContinueButton(MiseryMarketStep.Guards)}
              </>
            )
          case MiseryMarketStep.DoorsBroken:
            return (
              <>
                {t('miseryMarketAction2Feedback')}
                {renderContinueButton(MiseryMarketStep.Guards)}
              </>
            )
          case MiseryMarketStep.DoorsAnnihilated:
            return (
              <>
                {t('miseryMarketAction3Feedback')}
                {renderContinueButton(MiseryMarketStep.Guards)}
              </>
            )
          case MiseryMarketStep.Guards:
            return (
              <>
                {t('miseryMarketStep2')}
                <ExpeditionAction
                  disabled={lethality < MISERY_MARKET_STEP2_LETHALITY_REQUIRED}
                  prerequisites={
                    <TalentIcon
                      type={UndeadTalent.Lethality}
                      text={MISERY_MARKET_STEP2_LETHALITY_REQUIRED}
                      size="1rem"
                    />
                  }
                  onClick={goToStep(MiseryMarketStep.GuardsFlee)}
                >
                  {t('miseryMarketAction4')}
                </ExpeditionAction>
                {renderFleeButton()}
              </>
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
              <>
                {t('miseryMarketStep3')}
                {renderLoot(
                  <>
                    <ResourceIcon type={ResourceType.Meat} text={MISERY_MARKET_STEP3_MEAT} marginRight="0.5rem" />
                    <ResourceIcon type={ResourceType.Materials} text={MISERY_MARKET_STEP3_MATERIALS} />
                  </>,
                )}
                {renderContinueButton(MiseryMarketStep.LastStand, handleCollectAndContinue)}
              </>
            )
          }
          case MiseryMarketStep.LastStand:
            return (
              <>
                {t('miseryMarketStep4')}
                <ExpeditionAction
                  disabled={lethality < MISERY_MARKET_STEP3_LETHALITY_REQUIRED}
                  prerequisites={
                    <TalentIcon
                      type={UndeadTalent.Lethality}
                      text={MISERY_MARKET_STEP3_LETHALITY_REQUIRED}
                      size="1rem"
                    />
                  }
                  onClick={goToStep(MiseryMarketStep.Carnage)}
                >
                  {t('miseryMarketAction4')}
                </ExpeditionAction>
                {renderFleeButton()}
              </>
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
              <>
                <ExpeditionImage src={miseryMarketImage2Url} />
                <div css={expeditionStepDescription}>{t('miseryMarketReward')}</div>
                {renderLoot(
                  <>
                    <ResourceIcon type={ResourceType.Meat} text={MISERY_MARKET_MEAT_REWARD} marginRight="0.5rem" />
                    <ResourceIcon type={ResourceType.Bones} text={MISERY_MARKET_BONES_REWARD} />
                    <br />
                    <ResourceIcon type={ResourceType.Materials} text={MISERY_MARKET_MATERIAL_REWARD} />
                  </>,
                )}
                {renderEndButton(handleCollectFinalReward)}
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
