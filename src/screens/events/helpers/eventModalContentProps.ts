import { ReactNode } from 'react'

export type EventModalContentRenderOptions<TStep> = {
  goToStep: (step: TStep) => () => void
  renderAcknowledgeButton: (onClick?: () => void) => ReactNode
}

export type EventModalContentProps = {
  renderStep: <TStep extends number>(
    renderFn: (step: TStep, options: EventModalContentRenderOptions<TStep>) => ReactNode,
  ) => ReactNode
}
