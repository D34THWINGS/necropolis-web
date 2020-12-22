import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExpeditionModal } from './components/ExpeditionModal'
import { ExpeditionType, ResourceType, UndeadTalent } from '../../config/constants'
import { useTranslation } from '../../lang/useTranslation'
import { ExpeditionAction } from './components/ExpeditionAction'
import { TalentIcon } from '../../components/talents/TalentIcon'
import { getUndeadArmyDexterity, getValet } from '../../data/undeads/selectors'
import { expeditionStepDescription } from './helpers/expeditionStyles'
import oldCoffin2ImageUrl from '../../assets/images/expeditions/oldCoffin/old-coffin-2.jpg'
import { ExpeditionImage } from './components/ExpeditionImage'
import { ResourceIcon } from '../../components/resources/ResourceIcon'
import { getMeat } from '../../data/resources/selectors'
import { gainResources, spendResources } from '../../data/resources/actions'
import { textColor } from '../../styles/base'
import { HealthPoint } from '../../components/images/HealthPoint'
import { curseUndead, damageUndead } from '../../data/undeads/actions'

const SAWMILL_DEXTERITY_REQUIRED = 2
const SAWMILL_MEAT_REQUIRED = 2
const SAWMILL_HEALTH_REQUIRED = 2
const SAWMILL_MATERIALS_REWARD = 5

enum OldCoffinStep {
  Door,
  InfectedValet,
  FaceHound,
  NourishedHound,
  BittenByHound,
}

export const Sawmill = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const dexterity = useSelector(getUndeadArmyDexterity)
  const meat = useSelector(getMeat)
  const valet = useSelector(getValet)

  const handleSawmillReward = () => dispatch(gainResources({ [ResourceType.Materials]: SAWMILL_MATERIALS_REWARD }))

  return (
    <ExpeditionModal<OldCoffinStep>
      type={ExpeditionType.OldCoffin}
      title={t('sawmillTitle')}
      renderOverview={() => t('sawmillOverview')}
      renderTreasure={() => <ResourceIcon type={ResourceType.Materials} />}
      renderStep={(step, { goToStep, renderEndButton, renderLoot, renderContinueButton }) => {
        switch (step) {
          case OldCoffinStep.Door:
            return (
              <>
                <ExpeditionImage src={oldCoffin2ImageUrl} />
                <div css={expeditionStepDescription}>{t('sawmillStep1')}</div>
                <ExpeditionAction onClick={goToStep(OldCoffinStep.InfectedValet)}>
                  {t('sawmillAction1')}
                </ExpeditionAction>
                <ExpeditionAction
                  disabled={dexterity < SAWMILL_DEXTERITY_REQUIRED}
                  onClick={goToStep(OldCoffinStep.FaceHound)}
                  prerequisites={
                    <TalentIcon type={UndeadTalent.Dexterity} size="1rem" text={SAWMILL_DEXTERITY_REQUIRED} />
                  }
                >
                  {t('sawmillAction2')}
                </ExpeditionAction>
              </>
            )
          case OldCoffinStep.InfectedValet: {
            const handleCurseValet = () => {
              if (valet) {
                dispatch(curseUndead(valet.id))
              }
            }
            return (
              <>
                {t('sawmillStep2')}
                {renderContinueButton(OldCoffinStep.FaceHound, handleCurseValet)}
              </>
            )
          }
          case OldCoffinStep.FaceHound: {
            const handleNourish = () => {
              dispatch(spendResources({ [ResourceType.Meat]: SAWMILL_MEAT_REQUIRED }))
              goToStep(OldCoffinStep.NourishedHound)()
            }
            const handleGetBitten = () => {
              if (valet) {
                dispatch(damageUndead(valet.id, SAWMILL_HEALTH_REQUIRED))
                goToStep(OldCoffinStep.BittenByHound)()
              }
            }
            return (
              <>
                {t('sawmillStep3')}
                <ExpeditionAction
                  onClick={handleNourish}
                  disabled={meat < SAWMILL_MEAT_REQUIRED}
                  cost={<ResourceIcon type={ResourceType.Meat} size="1rem" text={SAWMILL_MEAT_REQUIRED} />}
                >
                  {t('sawmillAction3')}
                </ExpeditionAction>
                <ExpeditionAction
                  disabled={!valet}
                  onClick={handleGetBitten}
                  cost={
                    <>
                      <span css={textColor('RED')}>{SAWMILL_HEALTH_REQUIRED}</span>
                      <HealthPoint marginLeft="0.3rem" />
                    </>
                  }
                >
                  {t('sawmillAction4')}
                </ExpeditionAction>
              </>
            )
          }
          case OldCoffinStep.BittenByHound:
            return (
              <>
                {t('sawmillStep5')}
                {renderLoot(<ResourceIcon type={ResourceType.Materials} text={SAWMILL_MATERIALS_REWARD} />)}
                {renderEndButton(handleSawmillReward)}
              </>
            )
          case OldCoffinStep.NourishedHound:
            return (
              <>
                {t('sawmillStep4')}
                {renderLoot(<ResourceIcon type={ResourceType.Materials} text={SAWMILL_MATERIALS_REWARD} />)}
                {renderEndButton(handleSawmillReward)}
              </>
            )
        }
      }}
    />
  )
}
