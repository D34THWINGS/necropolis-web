import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExpeditionContent } from './components/ExpeditionContent'
import { ExpeditionType, LooseReason, ResourceType, UndeadTalent } from '../../config/constants'
import { useTranslation } from '../../lang/useTranslation'
import { ExpeditionAction } from './components/ExpeditionAction'
import { ResourceIcon } from '../../components/resources/ResourceIcon'
import { getBones, getSouls } from '../../data/resources/selectors'
import { getLethality } from '../../data/selectors'
import { gainResources, spendResources } from '../../data/resources/actions'
import { TalentIcon } from '../../components/talents/TalentIcon'
import { getHasCancelledReinforcements } from '../../data/expeditions/selectors'
import { castSpell } from '../../data/spells/actions'
import bastionImageUrl from '../../assets/images/expeditions/bastion/bastion.jpg'
import bastionImage2Url from '../../assets/images/expeditions/bastion/bastion-2.jpg'
import { ExpeditionImage } from './components/ExpeditionImage'
import { expeditionStepDescription } from './helpers/expeditionStyles'
import { getUndeadArmyMuscles } from '../../data/undeads/selectors'
import { loose } from '../../data/turn/actions'
import { canCast } from '../../data/spells/helpers'
import { getTheKey } from '../../data/spells/selectors'

enum BastionStep {
  Setup,
  DoorOpens,
  Hall,
  DeadDogs,
  NourishedDogs,
  Reinforced,
  Weakened,
  Perish,
  Obey,
}

const BASTION_MUSCLES_REQUIRED = 5
const BASTION_KILL_DOGS_LETHALITY_COST = 8
const BASTION_KILL_DOGS_MEAT_REWARD = 8
const BASTION_KILL_DOGS_BONES_REWARD = 2
const BASTION_FEED_DOGS_BONES_COST = 4
const BASTION_KILL_WEAKENED_PALADINS_LETHALITY_COST = 8
const BASTION_KILL_PALADINS_LETHALITY_COST = 12
const BASTION_MATERIALS_REWARD = 50

export const Bastion = () => {
  const { t } = useTranslation()
  const souls = useSelector(getSouls)
  const bones = useSelector(getBones)
  const lethality = useSelector(getLethality)
  const muscles = useSelector(getUndeadArmyMuscles)
  const hasCancelledReinforcements = useSelector(getHasCancelledReinforcements)
  const theKey = useSelector(getTheKey)
  const dispatch = useDispatch()

  return (
    <ExpeditionContent<BastionStep>
      type={ExpeditionType.Bastion}
      title={t('bastionTitle')}
      renderStep={(step, { goToStep, renderFleeButton, renderEndButton, renderContinueButton, renderLoot }) => {
        switch (step) {
          case BastionStep.Setup:
            return (
              <>
                <ExpeditionImage src={bastionImageUrl} />
                <div css={expeditionStepDescription}>{t('bastionStep1')}</div>
                {theKey && (
                  <ExpeditionAction
                    disabled={!canCast(theKey, souls)}
                    cost={<ResourceIcon type={ResourceType.Souls} text={theKey.cost} size="1.2rem" />}
                    onClick={() => {
                      dispatch(castSpell(theKey))
                      goToStep(BastionStep.DoorOpens)()
                    }}
                  >
                    {t('bastionAction1')}
                  </ExpeditionAction>
                )}
                <ExpeditionAction
                  disabled={muscles < BASTION_MUSCLES_REQUIRED}
                  prerequisites={
                    <TalentIcon type={UndeadTalent.Muscles} text={BASTION_MUSCLES_REQUIRED} size="1.2rem" />
                  }
                  onClick={goToStep(BastionStep.DoorOpens)}
                >
                  {t('bastionAction6')}
                </ExpeditionAction>
                {renderFleeButton()}
              </>
            )
          case BastionStep.DoorOpens:
            return (
              <>
                {t('bastionStep2')}
                {renderContinueButton(BastionStep.Hall)}
              </>
            )
          case BastionStep.Hall: {
            const handleFeedDogs = () => {
              dispatch(spendResources({ [ResourceType.Bones]: BASTION_FEED_DOGS_BONES_COST }))
              goToStep(BastionStep.NourishedDogs)()
            }
            return (
              <>
                {t('bastionStep3')}
                <ExpeditionAction
                  disabled={lethality < BASTION_KILL_DOGS_LETHALITY_COST}
                  prerequisites={
                    <TalentIcon type={UndeadTalent.Lethality} text={BASTION_KILL_DOGS_LETHALITY_COST} size="1.2rem" />
                  }
                  onClick={goToStep(BastionStep.DeadDogs)}
                >
                  {t('bastionAction2')}
                </ExpeditionAction>
                <ExpeditionAction
                  disabled={bones < BASTION_FEED_DOGS_BONES_COST}
                  cost={<ResourceIcon type={ResourceType.Bones} text={BASTION_FEED_DOGS_BONES_COST} size="1.2rem" />}
                  onClick={handleFeedDogs}
                >
                  {t('bastionAction3')}
                </ExpeditionAction>
                {renderFleeButton()}
              </>
            )
          }
          case BastionStep.DeadDogs:
            return (
              <>
                {t('bastionStep4')}
                {renderLoot(
                  <>
                    <ResourceIcon type={ResourceType.Meat} text={BASTION_KILL_DOGS_MEAT_REWARD} marginRight="0.5rem" />
                    <ResourceIcon type={ResourceType.Bones} text={BASTION_KILL_DOGS_BONES_REWARD} />
                  </>,
                )}
                {renderContinueButton(hasCancelledReinforcements ? BastionStep.Weakened : BastionStep.Reinforced)}
              </>
            )
          case BastionStep.NourishedDogs:
            return (
              <>
                {t('bastionStep5')}
                {renderContinueButton(hasCancelledReinforcements ? BastionStep.Weakened : BastionStep.Reinforced)}
              </>
            )
          case BastionStep.Reinforced:
            return (
              <>
                {t('bastionStep6')}
                <ExpeditionAction
                  disabled={lethality < BASTION_KILL_PALADINS_LETHALITY_COST}
                  prerequisites={
                    <TalentIcon
                      type={UndeadTalent.Lethality}
                      text={BASTION_KILL_PALADINS_LETHALITY_COST}
                      size="1.2rem"
                    />
                  }
                  onClick={goToStep(BastionStep.Perish)}
                >
                  {t('bastionAction2')}
                </ExpeditionAction>
                <ExpeditionAction onClick={goToStep(BastionStep.Obey)}>{t('bastionAction5')}</ExpeditionAction>
              </>
            )
          case BastionStep.Weakened:
            return (
              <>
                {t('bastionStep7')}
                <ExpeditionAction
                  disabled={lethality < BASTION_KILL_WEAKENED_PALADINS_LETHALITY_COST}
                  prerequisites={
                    <TalentIcon
                      type={UndeadTalent.Lethality}
                      text={BASTION_KILL_WEAKENED_PALADINS_LETHALITY_COST}
                      size="1.2rem"
                    />
                  }
                  onClick={goToStep(BastionStep.Perish)}
                >
                  {t('bastionAction2')}
                </ExpeditionAction>
                <ExpeditionAction onClick={goToStep(BastionStep.Obey)}>{t('bastionAction5')}</ExpeditionAction>
              </>
            )
          case BastionStep.Perish: {
            const handleKilledPaladins = () =>
              dispatch(gainResources({ [ResourceType.Materials]: BASTION_MATERIALS_REWARD }))
            return (
              <>
                <ExpeditionImage src={bastionImage2Url} />
                <div css={expeditionStepDescription}>{t('bastionStep8')}</div>
                {renderLoot(<ResourceIcon type={ResourceType.Materials} text={BASTION_MATERIALS_REWARD} />)}
                {renderEndButton(handleKilledPaladins)}
              </>
            )
          }
          case BastionStep.Obey: {
            const handleLoose = () => dispatch(loose(LooseReason.BastionDefeat))
            return (
              <>
                {t('bastionStep9')}
                <ExpeditionAction onClick={handleLoose}>{t('bastionAction7')}</ExpeditionAction>
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
