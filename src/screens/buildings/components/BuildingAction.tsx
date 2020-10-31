import React, { ReactNode, RefObject } from 'react'
import {
  buildingActionArrow,
  buildingActionButton,
  buildingActionContainer,
  buildingActionFrame,
} from '../helpers/buildingsStyles'
import { useTranslation } from '../../../lang/useTranslation'
import { OnboardingHighlight } from '../../onboarding/components/OnboardingHighlight'
import { OnboardingStep } from '../../../config/constants'

const highlightSteps = [OnboardingStep.HighlightCharnelHouseBuildButton, OnboardingStep.HighlightSoulWellBuildButton]

export type BuildingActionProps = {
  level?: number
  children: ReactNode
  action?: ReactNode
  disabled?: boolean
  onClick: () => void
}

export const BuildingAction = ({ level, children, action, disabled, onClick }: BuildingActionProps) => {
  const { t } = useTranslation()
  return (
    <div css={buildingActionContainer}>
      <div css={buildingActionFrame}>
        <div css={buildingActionArrow}>{level !== undefined && t('buildingLevel', level)}</div>
        <div>{children}</div>
      </div>
      {action && (
        <OnboardingHighlight step={highlightSteps}>
          {({ ref, className, onClick: nextOnboardingStep }) => (
            <button
              ref={ref as RefObject<HTMLButtonElement>}
              className={className}
              type="button"
              disabled={disabled}
              css={buildingActionButton}
              onClick={() => {
                if (nextOnboardingStep) {
                  nextOnboardingStep()
                }
                onClick()
              }}
            >
              {action}
            </button>
          )}
        </OnboardingHighlight>
      )}
    </div>
  )
}
