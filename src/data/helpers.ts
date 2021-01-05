import { Epic } from 'redux-observable'
import { random } from './seeder'
import { RootAction } from './actions'
import { RootState } from '../store/mainReducer'

const ANIMATION_DELAY = 500

export type NecropolisEpic = Epic<RootAction, RootAction, RootState>

export const setInArray = <T>(array: T[], index: number, value: T): T[] => [
  ...array.slice(0, index),
  value,
  ...array.slice(index + 1),
]

export const isDefined = <T>(value: T | undefined): value is T => !!value

export const shuffleArray = <T>(array: T[]) => {
  const arrayCopy = [...array]
  for (let i = arrayCopy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1))
    ;[arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]
  }
  return arrayCopy
}

export const findAndPutFirstInArray = <T>(array: T[], predicate: (value: T) => boolean) => {
  const valueToMove = array.find(predicate)
  const index = valueToMove ? array.indexOf(valueToMove) : -1
  if (!valueToMove || index <= 0) {
    return array
  }
  return [valueToMove, ...array.slice(0, index), ...array.slice(index + 1)]
}

export const drawRandomInArray = <T>(array: T[]) => array[Math.floor(random() * array.length)]

export const countInArray = <T>(array: T[], predicate: (value: T) => boolean) => array.filter(predicate).length

export const preventSelectorUpdate = () => true

export const getAnimationDelay = () => (window.localStorage.getItem('animationsDisabled') ? 0 : ANIMATION_DELAY)
