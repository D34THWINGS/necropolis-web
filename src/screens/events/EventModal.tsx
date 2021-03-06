import React, { ComponentType, createElement, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '../../components/ui/Modal/Modal'
import { ModalColor } from '../../components/ui/Modal/modalStyles'
import { getCurrentEvent } from '../../data/events/selectors'
import { EventType } from '../../config/constants'
import { CallToArms } from './CallToArms'
import { PaladinsAssault } from './PaladinsAssault'
import { EventModalContentProps, EventModalContentRenderOptions } from './helpers/eventModalContentProps'
import { setEventStep } from '../../data/events/actions'
import { EventAcknowledgeButton } from './components/EventAcknowledgeButton'
import { Collapsing } from './Collapsing'
import { Plunder } from './Plunder'
import { Offering } from './Offering'
import { StateOfEmergency } from './StateOfEmergency'

const eventsMap: Record<EventType, ComponentType<EventModalContentProps>> = {
  [EventType.CallToArms]: CallToArms,
  [EventType.PaladinsAssault]: PaladinsAssault,
  [EventType.Collapsing]: Collapsing,
  [EventType.Offering]: Offering,
  [EventType.Plunder]: Plunder,
  [EventType.StateOfEmergency]: StateOfEmergency,
}

export const EventModal = () => {
  const currentEvent = useSelector(getCurrentEvent)
  const dispatch = useDispatch()

  return (
    <Modal isOpen={currentEvent !== null} color={ModalColor.RED}>
      {currentEvent !== null &&
        createElement<EventModalContentProps>(eventsMap[currentEvent.type], {
          renderStep: <TStep extends number>(
            renderFn: (step: TStep, options: EventModalContentRenderOptions<TStep>) => ReactNode,
          ) =>
            renderFn(currentEvent.step as TStep, {
              goToStep: (step: TStep) => () => dispatch(setEventStep(step)),
              renderAcknowledgeButton: onClick => <EventAcknowledgeButton onClick={onClick} />,
            }),
        })}
    </Modal>
  )
}
