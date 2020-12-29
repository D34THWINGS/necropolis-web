import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ExpeditionModal } from './components/ExpeditionModal'
import { ExpeditionType, ResourceType, UndeadTalent } from '../../config/constants'
import { useTranslation } from '../../lang/useTranslation'
import { ExpeditionAction } from './components/ExpeditionAction'
import { getTheKey } from '../../data/spells/selectors'
import { ResourceIcon } from '../../components/resources/ResourceIcon'
import { getSouls } from '../../data/resources/selectors'
import { gainResources } from '../../data/resources/actions'
import { getIsBloodPrinceInJail, getUndeadArmyMuscles, getUndeadCount } from '../../data/undeads/selectors'
import { addUndead, requireSacrifice } from '../../data/undeads/actions'
import { cancelReinforcements } from '../../data/expeditions/actions'
import { UndeadBox } from '../../components/undeads/UndeadBox'
import { castSpell } from '../../data/spells/actions'
import { TalentIcon } from '../../components/talents/TalentIcon'
import townHallImageUrl from '../../assets/images/expeditions/townHall/town-hall.jpg'
import townHallImage2Url from '../../assets/images/expeditions/townHall/town-hall-2.jpg'
import { ExpeditionImage } from './components/ExpeditionImage'
import { expeditionStepDescription } from './helpers/expeditionStyles'
import { getLethality } from '../../data/selectors'
import { canCast } from '../../data/spells/helpers'
import { makeBloodPrince } from '../../data/undeads/helpers'

const TOWN_HALL_MUSCLES_REQUIRED = 4
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
  const theKey = useSelector(getTheKey)
  const isBloodPrinceInJail = useSelector(getIsBloodPrinceInJail)
  const souls = useSelector(getSouls)
  const undeadCount = useSelector(getUndeadCount)
  const muscles = useSelector(getUndeadArmyMuscles)
  const lethality = useSelector(getLethality)
  const dispatch = useDispatch()

  return (
    <ExpeditionModal<TownHallStep>
      type={ExpeditionType.TownHall}
      title={t('townHallTitle')}
      renderOverview={() => t('townHallOverview')}
      renderTreasure={() => t('townHallRewardOverview')}
      renderStep={(step, { goToStep, renderFleeButton, renderContinueButton, renderEndButton, renderLoot }) => {
        switch (step as TownHallStep) {
          case TownHallStep.Entrance:
            return (
              <>
                <ExpeditionImage src={townHallImageUrl} />
                <div css={expeditionStepDescription}>{t('townHallStep1')}</div>

                {theKey && (
                  <ExpeditionAction
                    disabled={!canCast(theKey, souls)}
                    cost={<ResourceIcon type={ResourceType.Souls} text={theKey.cost} size="1rem" />}
                    onClick={() => {
                      dispatch(castSpell(theKey))
                      goToStep(TownHallStep.BrokenDoor)()
                    }}
                  >
                    {t('townHallAction1')}
                  </ExpeditionAction>
                )}
                <ExpeditionAction
                  prerequisites={<TalentIcon type={UndeadTalent.Muscles} text={TOWN_HALL_MUSCLES_REQUIRED} />}
                  disabled={muscles < TOWN_HALL_MUSCLES_REQUIRED}
                  onClick={goToStep(TownHallStep.BrokenDoor)}
                >
                  {t('townHallAction6')}
                </ExpeditionAction>
                {renderFleeButton()}
              </>
            )
          case TownHallStep.BrokenDoor:
            return (
              <>
                {t('townHallStep2')}
                {renderContinueButton(TownHallStep.Fire)}
              </>
            )
          case TownHallStep.Fire: {
            const handleLooseUndeadInFire = (action: () => void) => () => {
              dispatch(requireSacrifice(TOWN_HALL_FIRE_UNDEAD_COST))
              action()
            }
            return (
              <>
                <ExpeditionImage src={townHallImage2Url} />
                <div css={expeditionStepDescription}>{t('townHallStep3', TOWN_HALL_FIRE_UNDEAD_COST)}</div>
                <ExpeditionAction
                  prerequisites={
                    <TalentIcon type={UndeadTalent.Lethality} text={TOWN_HALL_LETHALITY_REQUIRED} size="1rem" />
                  }
                  disabled={undeadCount < TOWN_HALL_FIRE_UNDEAD_COST || lethality < TOWN_HALL_LETHALITY_REQUIRED}
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
              </>
            )
          }
          case TownHallStep.KillRunners: {
            const handleKillRunners = () => dispatch(cancelReinforcements())
            return (
              <>
                {t('townHallStep4')}
                {renderEndButton(handleKillRunners)}
              </>
            )
          }
          case TownHallStep.Loot: {
            const handleLoot = () => dispatch(gainResources({ [ResourceType.Materials]: TOWN_HALL_MATERIALS_REWARD }))
            return (
              <>
                {t('townHallStep5')}
                {renderLoot(<ResourceIcon type={ResourceType.Materials} text={TOWN_HALL_MATERIALS_REWARD} />)}
                {renderEndButton(handleLoot)}
              </>
            )
          }
          case TownHallStep.Jail: {
            const bloodPrince = makeBloodPrince()
            const handleFreeBloodPrince = () => dispatch(addUndead(bloodPrince))
            return (
              <>
                {t('townHallStep6', isBloodPrinceInJail)}
                {isBloodPrinceInJail && <UndeadBox undead={bloodPrince} />}
                {renderEndButton(isBloodPrinceInJail ? handleFreeBloodPrince : undefined)}
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
