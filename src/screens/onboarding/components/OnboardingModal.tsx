/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { Modal } from '../../../components/ui/Modal/Modal'
import { ModalAlignment, ModalColor } from '../../../components/ui/Modal/modalStyles'
import { getIsOnboardingActive, getMissingOnboardingFlags, getOnboardingStep } from '../../../data/onboarding/selectors'
import {
  INITIAL_MATERIALS,
  INITIAL_MEAT,
  OnboardingFlag,
  OnboardingStep,
  PALADINS_WARN_THRESHOLD,
  ResourceType,
} from '../../../config/constants'
import { useTranslation } from '../../../lang/useTranslation'
import { Image } from '../../../components/images/Image'
import marenneHeadUrl from '../../../assets/images/characters/marenne-head.png'
import valetUrl from '../../../assets/images/undeads/valet.png'
import nextStepArrowUrl from '../../../assets/images/onboarding/next-step-arrow.png'
import { greenSquareButton } from '../../../styles/buttons'
import { addOnboardingFlag, nextOnboardingStep } from '../../../data/onboarding/actions'
import { layers } from '../../../config/theme'
import { gainResources } from '../../../data/resources/actions'
import { MAIN_HUB } from '../../../config/routes'
import { getPaladinsCounter } from '../../../data/paladins/selectors'

const noScrollModal = (alignToEnd: boolean) => [
  css({
    overflow: 'visible',
  }),
  alignToEnd
    ? css({
        padding: '1rem 1rem 1.5rem',
      })
    : css({
        padding: '1.5rem 1rem 1rem',
      }),
]

const portraitCircle = (alignToEnd: boolean) => [
  css({
    position: 'absolute',
    border: '2px solid rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    padding: '0.6rem',
    backgroundColor: '#448B84',
    boxShadow: 'inset 0px 1px 1px rgba(255,255,255,0.5), 0 0 8px rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  }),
  alignToEnd
    ? css({
        bottom: 0,
        right: 0,
        transform: 'translate(-1rem, 80%)',
      })
    : css({
        top: 0,
        left: 0,
        transform: 'translate(1rem, -80%)',
      }),
]

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

const nextButton = [...greenSquareButton, css({ marginTop: '1rem', padding: '0.6rem 0.8rem' })]

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
  OnboardingStep.HighlightCharnelHouse,
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
  const missingOnboardingFlags = useSelector(getMissingOnboardingFlags)
  const paladinsCounter = useSelector(getPaladinsCounter)
  const dispatch = useDispatch()

  if (!onboardingActive && missingOnboardingFlags.length === 0) {
    return null
  }

  const shouldDisplayPaladinsTips =
    paladinsCounter >= PALADINS_WARN_THRESHOLD && missingOnboardingFlags.includes(OnboardingFlag.PaladinsExplained)

  const getContent = () => {
    if (shouldDisplayPaladinsTips) {
      return t('onboardingBuildBattlements')
    }

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
      case OnboardingStep.BuildCatacombs:
        return t('onboardingBuildCatacombs')
      case OnboardingStep.BuildOssuary:
        return t('onboardingBuildOssuary')
      default:
        return null
    }
  }

  const handleNextStep = () => {
    if (shouldDisplayPaladinsTips) {
      dispatch(addOnboardingFlag(OnboardingFlag.PaladinsExplained))
      return
    }
    if (onboardingStep === OnboardingStep.HighlightMaterialsCounter) {
      dispatch(gainResources({ [ResourceType.Materials]: INITIAL_MATERIALS, [ResourceType.Meat]: INITIAL_MEAT }))
    }
    if (onboardingStep === OnboardingStep.RemindUpkeep) {
      history.push(MAIN_HUB)
    }
    dispatch(nextOnboardingStep())
  }

  const content = getContent()
  const isAlignedToEnd = alignedToEnd.includes(onboardingStep)

  return (
    <Modal
      css={noScrollModal(isAlignedToEnd)}
      isOpen={content !== null}
      color={ModalColor.GREEN}
      priority={layers.ONBOARDING}
      align={isAlignedToEnd ? ModalAlignment.End : ModalAlignment.Center}
    >
      <div css={portraitCircle(isAlignedToEnd)}>
        <div css={portraitInner}>
          <Image
            src={
              shouldDisplayPaladinsTips || stepsWithValetTalking.includes(onboardingStep) ? valetUrl : marenneHeadUrl
            }
            size="3rem"
          />
        </div>
      </div>
      {content}
      {!stepsWithoutNextButton.includes(onboardingStep) && (
        <button type="button" css={nextButton} onClick={handleNextStep}>
          <Image src={nextStepArrowUrl} marginRight="0.4rem" /> {t('onboardingNext')}
        </button>
      )}
    </Modal>
  )
}
