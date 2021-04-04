import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExpeditionContent } from './components/ExpeditionContent'
import { ExpeditionType, ResourceType, UndeadTalent } from '../../config/constants'
import { useTranslation } from '../../lang/useTranslation'
import { ExpeditionAction } from './components/ExpeditionAction'
import { TalentIcon } from '../../components/talents/TalentIcon'
import { getValet } from '../../data/undeads/selectors'
import { expeditionStepDescription } from './helpers/expeditionStyles'
import oldCoffin2ImageUrl from '../../assets/images/expeditions/oldCoffin/old-coffin-2.jpg'
import { ExpeditionImage } from './components/ExpeditionImage'
import { ResourceIcon } from '../../components/resources/ResourceIcon'
import { getMeat } from '../../data/resources/selectors'
import { gainResources, spendResources } from '../../data/resources/actions'
import { textColor } from '../../styles/base'
import { curseUndead, damageUndead } from '../../data/undeads/actions'
import hpCostIcon from '../../assets/images/icons/hp-cost.png'
import { Image } from '../../components/images/Image'
import { triggerObstacle } from '../../data/expeditions/actions'
import { makeObstacle, makeObstacleRow } from '../../data/expeditions/helpers'

const SAWMILL_MEAT_REQUIRED = 2
const SAWMILL_HEALTH_REQUIRED = 2
const SAWMILL_MATERIALS_REWARD = 3

enum SawmillStep {
  Door,
  InfectedValet,
  FaceHound,
  NourishedHound,
  BittenByHound,
}

enum SawmillObstacle {
  PickDoor = 'pickDoor',
}

export const Sawmill = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const meat = useSelector(getMeat)
  const valet = useSelector(getValet)

  const handleSawmillReward = () => dispatch(gainResources({ [ResourceType.Materials]: SAWMILL_MATERIALS_REWARD }))

  return (
    <ExpeditionContent<SawmillStep, SawmillObstacle>
      type={ExpeditionType.Sawmill}
      title={t('sawmillTitle')}
      renderStep={(step, { goToStep, renderEndButton, renderLoot, renderContinueButton }) => {
        switch (step) {
          case SawmillStep.Door: {
            const handlePickDoor = () =>
              dispatch(
                triggerObstacle(
                  makeObstacle(SawmillObstacle.PickDoor, [makeObstacleRow(0, 3, [UndeadTalent.Dexterity, 3], 1)]),
                ),
              )
            return (
              <>
                <ExpeditionImage src={oldCoffin2ImageUrl} />
                <div css={expeditionStepDescription}>{t('sawmillStep1')}</div>
                <ExpeditionAction
                  onClick={handlePickDoor}
                  prerequisites={<TalentIcon type={UndeadTalent.Dexterity} size="1.2rem" />}
                >
                  {t('sawmillAction1')}
                </ExpeditionAction>
                <ExpeditionAction
                  onClick={goToStep(SawmillStep.FaceHound)}
                  prerequisites={<TalentIcon type={UndeadTalent.Muscles} size="1.2rem" />}
                >
                  {t('sawmillAction2')}
                </ExpeditionAction>
                <ExpeditionAction
                  onClick={goToStep(SawmillStep.FaceHound)}
                  prerequisites={
                    <>
                      <TalentIcon type={UndeadTalent.Dexterity} size="1.2rem" marginRight="0.3rem" />
                      <TalentIcon type={UndeadTalent.Muscles} size="1.2rem" />
                    </>
                  }
                >
                  {t('sawmillAction3')}
                </ExpeditionAction>
              </>
            )
          }
          case SawmillStep.InfectedValet: {
            const handleCurseValet = () => {
              if (valet) {
                dispatch(curseUndead(valet.id))
              }
            }
            return (
              <>
                {t('sawmillStep2')}
                {renderContinueButton(SawmillStep.FaceHound, handleCurseValet)}
              </>
            )
          }
          case SawmillStep.FaceHound: {
            const handleNourish = () => {
              dispatch(spendResources({ [ResourceType.Meat]: SAWMILL_MEAT_REQUIRED }))
              goToStep(SawmillStep.NourishedHound)()
            }
            const handleGetBitten = () => {
              if (valet) {
                dispatch(damageUndead(valet.id, SAWMILL_HEALTH_REQUIRED))
                goToStep(SawmillStep.BittenByHound)()
              }
            }
            return (
              <>
                {t('sawmillStep3')}
                <ExpeditionAction
                  onClick={handleNourish}
                  disabled={meat < SAWMILL_MEAT_REQUIRED}
                  cost={<ResourceIcon type={ResourceType.Meat} size="1.2rem" text={SAWMILL_MEAT_REQUIRED} />}
                >
                  {t('sawmillAction3')}
                </ExpeditionAction>
                <ExpeditionAction
                  disabled={!valet}
                  onClick={handleGetBitten}
                  cost={
                    <>
                      <span css={textColor('RED')}>{SAWMILL_HEALTH_REQUIRED}</span>
                      &nbsp;
                      <Image src={hpCostIcon} />
                    </>
                  }
                >
                  {t('sawmillAction4')}
                </ExpeditionAction>
              </>
            )
          }
          case SawmillStep.BittenByHound:
            return (
              <>
                {t('sawmillStep5')}
                {renderLoot(<ResourceIcon type={ResourceType.Materials} text={SAWMILL_MATERIALS_REWARD} />)}
                {renderEndButton(handleSawmillReward)}
              </>
            )
          case SawmillStep.NourishedHound:
            return (
              <>
                {t('sawmillStep4')}
                {renderLoot(<ResourceIcon type={ResourceType.Materials} text={SAWMILL_MATERIALS_REWARD} />)}
                {renderEndButton(handleSawmillReward)}
              </>
            )
        }
      }}
      renderObstacle={obstacle => {
        switch (obstacle.key) {
          case SawmillObstacle.PickDoor:
            return {
              title: t('expeditionObstacle', 1, t('sawmillAction1')),
              renderRowTitle: () => t('sawmillAction1'),
            }
        }
      }}
    />
  )
}
