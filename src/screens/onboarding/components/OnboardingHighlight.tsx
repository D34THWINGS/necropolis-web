import { css, Global, ClassNames } from '@emotion/core'
import React, { ReactNode, RefObject, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPortal } from 'react-dom'
import { getOnboardingStep } from '../../../data/onboarding/selectors'
import { OnboardingStep } from '../../../config/constants'
import { colors, layers, transitions } from '../../../config/theme'
import { nextOnboardingStep } from '../../../data/onboarding/actions'

const CONTAINER_CLASSNAME = 'onboarding-highlight'

const highlightContainer = css({
  [`.${CONTAINER_CLASSNAME}`]: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: layers.ONBOARDING,
  },
})

export const OnboardingHighlightStyles = () => <Global styles={highlightContainer} />

export type OnboardingHighlightProps<T extends HTMLElement> = {
  step: OnboardingStep | OnboardingStep[]
  children: (props: { className?: string; ref?: RefObject<T>; onClick?: () => void; step: OnboardingStep }) => ReactNode
}

export const OnboardingHighlight = <T extends HTMLElement>({ step, children }: OnboardingHighlightProps<T>) => {
  const onboardingStep = useSelector(getOnboardingStep)
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null)
  const highlightRef = useRef<T>(null)
  const placeholderRef = useRef<T>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (Array.isArray(step) ? step.includes(onboardingStep) : onboardingStep === step) {
      const container = document.createElement('div')
      document.body.appendChild(container)
      container.classList.add(CONTAINER_CLASSNAME)
      setPortalContainer(container)
      return () => {
        document.body.removeChild(container)
      }
    }
    return undefined
  }, [onboardingStep, step])

  useEffect(() => {
    if (highlightRef.current && placeholderRef.current) {
      const { top, left, width } = placeholderRef.current.getBoundingClientRect()
      highlightRef.current.style.left = `${left}px`
      highlightRef.current.style.top = `${top}px`
      highlightRef.current.style.width = `${width}px`
      highlightRef.current.style.opacity = '1'
    }
  })

  if (Array.isArray(step) ? !step.includes(onboardingStep) : onboardingStep !== step) {
    return <>{children({ ref: placeholderRef, step: onboardingStep })}</>
  }

  const getHighlight = () => {
    if (!portalContainer) {
      return null
    }

    return createPortal(
      <ClassNames>
        {({ css: scopedCss }) => {
          if (!placeholderRef.current) {
            return null
          }

          const handleNextStep = () => dispatch(nextOnboardingStep())

          const { borderRadius, borderWidth, height, padding } = window.getComputedStyle(placeholderRef.current)
          return (
            <>
              {children({
                ref: highlightRef,
                step: onboardingStep,
                onClick: handleNextStep,
                className: scopedCss(
                  css({
                    position: 'absolute',
                    margin: '0 !important',
                    height,
                    padding,
                    filter: 'none',
                    zIndex: 1,
                    opacity: 0,
                    transition: `opacity ${transitions.FAST}`,
                    transform: 'none',

                    ':before': {
                      display: 'block',
                      content: '""',
                      position: 'absolute',
                      top: -parseInt(borderWidth, 10),
                      right: -parseInt(borderWidth, 10),
                      bottom: -parseInt(borderWidth, 10),
                      left: -parseInt(borderWidth, 10),
                      borderRadius,
                      boxShadow: `0 0 10px 4px ${colors.CYAN}`,
                      zIndex: 0,
                    },
                  }),
                ),
              })}
            </>
          )
        }}
      </ClassNames>,
      portalContainer,
    )
  }

  return (
    <>
      {children({ ref: placeholderRef, step: onboardingStep })}
      {getHighlight()}
    </>
  )
}
