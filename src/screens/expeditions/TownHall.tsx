import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExpeditionModal } from './components/ExpeditionModal'
import {
  ExpeditionType,
  ResourceType,
  Spell,
  SPELLS_SOUL_COSTS,
  UndeadTalent,
  UndeadType,
} from '../../config/constants'
import { useTranslation } from '../../lang/useTranslation'
import { ExpeditionAction } from './components/ExpeditionAction'
import { getHasTheKey } from '../../data/spells/selectors'
import { ResourceIcon } from '../../components/resources/ResourceIcon'
import { getSouls } from '../../data/resources/selectors'
import { gainResources } from '../../data/resources/actions'
import { getIsBloodPrinceInJail, getUndeadCount } from '../../data/undeads/selectors'
import { addUndead, requireSacrifice } from '../../data/undeads/actions'
import { createUndead } from '../../data/undeads/helpers'
import { cancelReinforcements } from '../../data/expeditions/actions'
import { UndeadBox } from '../../components/undeads/UndeadBox'
import { castSpell } from '../../data/spells/actions'
import { TalentIcon } from '../../components/talents/TalentIcon'
import townHallImageUrl from '../../assets/images/expeditions/townHall/town-hall.jpg'
import townHallImage2Url from '../../assets/images/expeditions/townHall/town-hall-2.jpg'
import { ExpeditionImage } from './components/ExpeditionImage'
import { expeditionStepDescription } from './helpers/expeditionStyles'

const TOWN_HALL_FIRE_UNDEAD_COST = 1
const TOWN_HALL_MATERIALS_REWARD = 6
const TOWN_HALL_LETHALITY_REQUIRED = 5

enum TownHallStep {
  Entrance,
  BrokenDoor,
  Fire,
  KillRunners,
  Loot,
  Jail,
}

export const TownHall = () => {
  const { t } = useTranslation()
  const hasTheKey = useSelector(getHasTheKey)
  const isBloodPrinceInJail = useSelector(getIsBloodPrinceInJail)
  const souls = useSelector(getSouls)
  const undeadCount = useSelector(getUndeadCount)
  const dispatch = useDispatch()

  return (
    <ExpeditionModal<TownHallStep>
      type={ExpeditionType.TownHall}
      title={t('townHallTitle')}
      renderOverview={() => t('townHallOverview')}
      renderTreasure={() => t('townHallRewardOverview')}
      renderStep={(step, { goToStep, renderFleeButton, renderContinueButton, renderEndButton }) => {
        switch (step as TownHallStep) {
          case TownHallStep.Entrance: {
            const handleCastTheKey = () => {
              dispatch(castSpell(Spell.TheKey))
              goToStep(TownHallStep.BrokenDoor)()
            }
            return (
              <Fragment>
                <ExpeditionImage src={townHallImageUrl} />
                <div css={expeditionStepDescription}>{t('townHallStep1')}</div>

                {hasTheKey && (
                  <ExpeditionAction
                    disabled={souls < SPELLS_SOUL_COSTS[Spell.TheKey]}
                    cost={<ResourceIcon type={ResourceType.Souls} text={SPELLS_SOUL_COSTS[Spell.TheKey]} size="1rem" />}
                    onClick={handleCastTheKey}
                  >
                    {t('townHallAction1')}
                  </ExpeditionAction>
                )}
                {renderFleeButton()}
              </Fragment>
            )
          }
          case TownHallStep.BrokenDoor:
            return (
              <Fragment>
                {t('townHallStep2')}
                {renderContinueButton(TownHallStep.Fire)}
              </Fragment>
            )
          case TownHallStep.Fire: {
            const handleLooseUndeadInFire = (action: () => void) => () => {
              dispatch(requireSacrifice(TOWN_HALL_FIRE_UNDEAD_COST))
              action()
            }
            return (
              <Fragment>
                <ExpeditionImage src={townHallImage2Url} />
                <div css={expeditionStepDescription}>{t('townHallStep3', TOWN_HALL_FIRE_UNDEAD_COST)}</div>
                <ExpeditionAction
                  prerequisites={
                    <TalentIcon type={UndeadTalent.Lethality} text={TOWN_HALL_LETHALITY_REQUIRED} size="1rem" />
                  }
                  disabled={undeadCount < TOWN_HALL_FIRE_UNDEAD_COST}
                  onClick={handleLooseUndeadInFire(goToStep(TownHallStep.KillRunners))}
                >
                  {t('townHallAction2')}
                </ExpeditionAction>
                <ExpeditionAction
                  disabled={undeadCount < TOWN_HALL_FIRE_UNDEAD_COST}
                  onClick={handleLooseUndeadInFire(goToStep(TownHallStep.Loot))}
                >
                  {t('townHallAction3')}
                </ExpeditionAction>
                <ExpeditionAction
                  disabled={undeadCount < TOWN_HALL_FIRE_UNDEAD_COST}
                  onClick={handleLooseUndeadInFire(goToStep(TownHallStep.Jail))}
                >
                  {t('townHallAction4')}
                </ExpeditionAction>
                {renderFleeButton()}
              </Fragment>
            )
          }
          case TownHallStep.KillRunners: {
            const handleKillRunners = () => dispatch(cancelReinforcements())
            return (
              <Fragment>
                {t('townHallStep4')}
                {renderEndButton(handleKillRunners)}
              </Fragment>
            )
          }
          case TownHallStep.Loot: {
            const handleLoot = () => dispatch(gainResources({ [ResourceType.Materials]: TOWN_HALL_MATERIALS_REWARD }))
            return (
              <Fragment>
                {t('townHallStep5', TOWN_HALL_MATERIALS_REWARD)}
                {renderEndButton(handleLoot)}
              </Fragment>
            )
          }
          case TownHallStep.Jail: {
            const bloodPrince = createUndead(UndeadType.BloodPrince, true)
            const handleFreeBloodPrince = () => dispatch(addUndead(bloodPrince))
            return (
              <Fragment>
                {t('townHallStep6', isBloodPrinceInJail)}
                {isBloodPrinceInJail && <UndeadBox undead={bloodPrince} />}
                {renderEndButton(isBloodPrinceInJail ? handleFreeBloodPrince : undefined)}
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
