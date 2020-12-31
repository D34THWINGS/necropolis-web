import { Epic } from 'redux-observable'
import { random } from './seeder'
import { RootAction } from './actions'
import { RootState } from '../store/mainReducer'

export type NecropolisEpic = Epic<RootAction, RootAction, RootState>

export const setInArray = <T>(array: T[], index: number, value: T) => [
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const recursiveSet = (obj: any, path: (string | number)[], value: any): any => {
  if (Array.isArray(obj)) {
    const index = typeof path[0] === 'string' ? parseInt(path[0], 10) : path[0]
    return setInArray(obj, index, path.length > 1 ? recursiveSet(obj[index], path.slice(1), value) : value)
  }

  return {
    ...obj,
    [path[0]]: path.length > 1 ? recursiveSet(obj[path[0]], path.slice(1), value) : value,
  }
}

type Setter<TValue, TReturn> = (value: TValue) => TReturn

type DeepSetter<TObj, TBase> = {
  (): Setter<TObj, TBase>
  <TKey extends keyof TObj>(key: TKey): TObj[TKey] extends Record<string, unknown>
    ? DeepSetter<TObj[TKey], TBase>
    : TObj[TKey] extends Array<unknown>
    ? DeepSetter<TObj[TKey], TBase>
    : () => Setter<TObj[TKey], TBase>
}

export const deepSet = <TObj>(obj: TObj): DeepSetter<TObj, TObj> => {
  const makeSetter = (path: string[]) => (key?: string) => {
    if (typeof key === 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (value: any) => recursiveSet(obj, path, value)
    }

    return makeSetter([...path, key])
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return makeSetter([]) as any
}

export const preventSelectorUpdate = () => true
