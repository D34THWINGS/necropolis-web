export const setInArray = <T>(array: T[], index: number, value: T) => [
  ...array.slice(0, index),
  value,
  ...array.slice(index + 1),
]

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
  <TKey extends keyof TObj>(): Setter<TObj, TBase>
  <TKey extends keyof TObj>(key: TKey): TObj[TKey] extends Record<string, unknown>
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
