/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Modal } from '../../../components/ui/Modal/Modal'
import { ModalAlignment, ModalColor } from '../../../components/ui/Modal/modalStyles'
import { getIsOnboardingActive, getOnboardingStep } from '../../../data/onboarding/selectors'
import { INITIAL_MATERIALS, INITIAL_MEAT, OnboardingStep, ResourceType } from '../../../config/constants'
import { useTranslation } from '../../../lang/useTranslation'
import { Image } from '../../../components/images/Image'
import marenneHeadUrl from '../../../assets/images/characters/marenne-head.png'
import undeadUrl from '../../../assets/images/undeads/undead.png'
import nextStepArrowUrl from '../../../assets/images/onboarding/next-step-arrow.png'
import { greenSquareButton } from '../../../styles/buttons'
import { nextOnboardingStep } from '../../../data/onboarding/actions'
import { layers } from '../../../config/theme'
import { gainResources } from '../../../data/resources/actions'
import { MAIN_HUB } from '../../../config/routes'

const noScrollModal = css({
  overflow: 'visible',
})

const portraitCircle = css({
  position: 'absolute',
  top: 0,
  left: '50%',
  border: '2px solid rgba(0, 0, 0, 0.5)',
  borderRadius: '50%',
  padding: '0.6rem',
  transform: 'translate(-50%, -70%)',
  backgroundColor: '#448B84',
  boxShadow: 'inset 0px 1px 1px rgba(255,255,255,0.5), 0 5px 5px rgba(0, 0, 0, 0.3)',
  zIndex: 1,
})

const portraitInner = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: '4.5rem',
  height: '4.5rem',
  boxShadow: '0px 1px 1px rgba(255, 255, 255, 0.5)',
  backgroundColor: '#1B655F',
})

const stepsWithoutNextButton = [
  OnboardingStep.HighlightCharnelHouse,
  OnboardingStep.HighlightCharnelHouseBuildButton,
  OnboardingStep.BuildSoulWell,
  OnboardingStep.HighlightSoulWellBuildButton,
  OnboardingStep.LetsExplore,
  OnboardingStep.StartSmall,
]
const stepsWithValetTalking = [
  OnboardingStep.HighlightCharnelHouse,
  OnboardingStep.HighlightMaterialsCounter,
  OnboardingStep.NoMoreMaterials,
]
const alignedToEnd = [
  OnboardingStep.HighlightProduction,
  OnboardingStep.RemindUpkeep,
  OnboardingStep.AwaitNextTurn,
  OnboardingStep.BuildSoulWell,
  OnboardingStep.StartSmall,
]

export const OnboardingModal = () => {
  const { t } = useTranslation()
  const history = useHistory()
  const onboardingActive = useSelector(getIsOnboardingActive)
  const onboardingStep = useSelector(getOnboardingStep)
  const dispatch = useDispatch()

  if (!onboardingActive) {
    return null
  }

  const handleNextStep = () => {
    if (onboardingStep === OnboardingStep.HighlightMaterialsCounter) {
      dispatch(gainResources({ [ResourceType.Materials]: INITIAL_MATERIALS, [ResourceType.Meat]: INITIAL_MEAT }))
    }
    if (onboardingStep === OnboardingStep.RemindUpkeep) {
      history.push(MAIN_HUB)
    }
    dispatch(nextOnboardingStep())
  }

  const getContent = () => {
    switch (onboardingStep) {
      case OnboardingStep.GamePresentation:
        return t('onboardingGamePresentation')
      case OnboardingStep.HighlightProduction:
        return t('onboardingProductionPhase')
      case OnboardingStep.HighlightTurnCounter:
        return t('onboardingEventPhase')
      case OnboardingStep.ActionPhaseDescription:
        return t('onboardingActionPhase')
      case OnboardingStep.HighlightMeatCounter:
        return t('onboardingUpkeepPhase')
      case OnboardingStep.HighlightMaterialsCounter:
        return t('onboardingMaterials', INITIAL_MATERIALS, INITIAL_MEAT)
      case OnboardingStep.HighlightCharnelHouse:
        return t('onboardingFirstAction')
      case OnboardingStep.HighlightCharnelHouseBuildButton:
        return t('onboardingBuild')
      case OnboardingStep.RemindUpkeep:
        return t('onboardingUpkeepReminder')
      case OnboardingStep.BuildSoulWell:
        return t('onboardingBuildSoulWell')
      case OnboardingStep.HighlightSoulWellBuildButton:
        return t('onboardingSoulWellDescription')
      case OnboardingStep.NoMoreMaterials:
        return t('onboardingNoMoreMaterials')
      case OnboardingStep.LetsExplore:
        return t('onboardingLetsExplore')
      case OnboardingStep.StartSmall:
        return t('onboardingStartSmall')
      default:
        return null
    }
  }

  const content = getContent()

  return (
    <Modal
      css={noScrollModal}
      isOpen={content !== null}
      color={ModalColor.GREEN}
      priority={layers.ONBOARDING}
      align={alignedToEnd.includes(onboardingStep) ? ModalAlignment.End : ModalAlignment.Center}
    >
      <div css={portraitCircle}>
        <div css={portraitInner}>
          <Image src={stepsWithValetTalking.includes(onboardingStep) ? undeadUrl : marenneHeadUrl} size="3rem" />
        </div>
      </div>
      {content}
      {!stepsWithoutNextButton.includes(onboardingStep) && (
        <button type="button" css={greenSquareButton} onClick={handleNextStep}>
          <Image src={nextStepArrowUrl} marginRight="0.4rem" /> {t('onboardingNext')}
        </button>
      )}
    </Modal>
  )
}
