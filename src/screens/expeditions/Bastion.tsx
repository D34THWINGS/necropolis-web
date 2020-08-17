/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExpeditionModal } from './components/ExpeditionModal'
import { ExpeditionType, ResourceType, Spell, SPELLS_SOUL_COSTS, UndeadTalent } from '../../config/constants'
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

enum BastionStep {
  Setup,
  DoorOpens,
  Hall,
  DeadDogs,
  NourishedDogs,
  Reinforced,
  Weakened,
  Perish,
}

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
  const hasCancelledReinforcements = useSelector(getHasCancelledReinforcements)
  const dispatch = useDispatch()

  return (
    <ExpeditionModal<BastionStep>
      type={ExpeditionType.Bastion}
      title={t('bastionTitle')}
      renderOverview={() => t('bastionOverview')}
      renderTreasure={() => <ResourceIcon type={ResourceType.Materials} />}
      renderStep={(step, { goToStep, renderFleeButton, renderEndButton, renderContinueButton }) => {
        switch (step) {
          case BastionStep.Setup: {
            const handleCastTheKey = () => {
              dispatch(castSpell(Spell.TheKey))
              goToStep(BastionStep.DoorOpens)()
            }
            return (
              <Fragment>
                <ExpeditionImage src={bastionImageUrl} />
                <div css={expeditionStepDescription}>{t('bastionStep1')}</div>
                <ExpeditionAction
                  disabled={souls < SPELLS_SOUL_COSTS[Spell.TheKey]}
                  cost={<ResourceIcon type={ResourceType.Souls} text={SPELLS_SOUL_COSTS[Spell.TheKey]} size="1rem" />}
                  onClick={handleCastTheKey}
                >
                  {t('bastionAction1')}
                </ExpeditionAction>
                {renderFleeButton()}
              </Fragment>
            )
          }
          case BastionStep.DoorOpens:
            return (
              <Fragment>
                {t('bastionStep2')}
                {renderContinueButton(BastionStep.Hall)}
              </Fragment>
            )
          case BastionStep.Hall: {
            const handleFeedDogs = () => {
              dispatch(spendResources({ [ResourceType.Bones]: BASTION_FEED_DOGS_BONES_COST }))
              goToStep(BastionStep.NourishedDogs)()
            }
            return (
              <Fragment>
                {t('bastionStep3')}
                <ExpeditionAction
                  disabled={lethality < BASTION_KILL_DOGS_LETHALITY_COST}
                  prerequisites={
                    <TalentIcon type={UndeadTalent.Lethality} text={BASTION_KILL_DOGS_LETHALITY_COST} size="1rem" />
                  }
                  onClick={goToStep(BastionStep.DeadDogs)}
                >
                  {t('bastionAction2')}
                </ExpeditionAction>
                <ExpeditionAction
                  disabled={bones < BASTION_FEED_DOGS_BONES_COST}
                  cost={<ResourceIcon type={ResourceType.Bones} text={BASTION_FEED_DOGS_BONES_COST} size="1rem" />}
                  onClick={handleFeedDogs}
                >
                  {t('bastionAction3')}
                </ExpeditionAction>
                {renderFleeButton()}
              </Fragment>
            )
          }
          case BastionStep.DeadDogs:
            return (
              <Fragment>
                {t('bastionStep4', BASTION_KILL_DOGS_MEAT_REWARD, BASTION_KILL_DOGS_BONES_REWARD)}
                {renderContinueButton(hasCancelledReinforcements ? BastionStep.Weakened : BastionStep.Reinforced)}
              </Fragment>
            )
          case BastionStep.NourishedDogs:
            return (
              <Fragment>
                {t('bastionStep5')}
                {renderContinueButton(hasCancelledReinforcements ? BastionStep.Weakened : BastionStep.Reinforced)}
              </Fragment>
            )
          case BastionStep.Reinforced:
            return (
              <Fragment>
                {t('bastionStep6')}
                <ExpeditionAction
                  disabled={lethality < BASTION_KILL_PALADINS_LETHALITY_COST}
                  prerequisites={
                    <TalentIcon type={UndeadTalent.Lethality} text={BASTION_KILL_PALADINS_LETHALITY_COST} size="1rem" />
                  }
                  onClick={goToStep(BastionStep.Perish)}
                >
                  {t('bastionAction2')}
                </ExpeditionAction>
                {renderFleeButton()}
              </Fragment>
            )
          case BastionStep.Weakened:
            return (
              <Fragment>
                {t('bastionStep7')}
                <ExpeditionAction
                  disabled={lethality < BASTION_KILL_WEAKENED_PALADINS_LETHALITY_COST}
                  prerequisites={
                    <TalentIcon
                      type={UndeadTalent.Lethality}
                      text={BASTION_KILL_WEAKENED_PALADINS_LETHALITY_COST}
                      size="1rem"
                    />
                  }
                  onClick={goToStep(BastionStep.Perish)}
                >
                  {t('bastionAction2')}
                </ExpeditionAction>
                {renderFleeButton()}
              </Fragment>
            )
          case BastionStep.Perish: {
            const handleKilledPaladins = () =>
              dispatch(gainResources({ [ResourceType.Materials]: BASTION_MATERIALS_REWARD }))
            return (
              <Fragment>
                <ExpeditionImage src={bastionImage2Url} />
                <div css={expeditionStepDescription}>{t('bastionStep8', BASTION_MATERIALS_REWARD)}</div>
                {renderEndButton(handleKilledPaladins)}
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
