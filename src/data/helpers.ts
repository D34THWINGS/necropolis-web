type Setter<TValue, TReturn> = (value: TValue) => TReturn

type DeepSetter<TObj, TBase> = {
  <TKey extends keyof TObj>(): Setter<TObj, TBase>
  <TKey extends keyof TObj>(key: TKey): TObj[TKey] extends Record<string, unknown>
    ? DeepSetter<TObj[TKey], TBase>
    : () => Setter<TObj[TKey], TBase>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const recursiveSet = <TObj>(obj: TObj, path: string[], value: any): TObj => {
  if (path.length > 1) {
    return {
      ...obj,
      [path[0]]: recursiveSet(obj[path[0] as keyof TObj], path.slice(1), value),
    }
  }
  return {
    ...obj,
    [path[0]]: value,
  }
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
