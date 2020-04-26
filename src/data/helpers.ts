type Setter<TValue, TReturn> = (value: TValue) => TReturn

type DeepSetter<TObj, TBase> = {
  <TKey extends keyof TObj>(): Setter<TObj, TBase>
  <TKey extends keyof TObj>(key: TKey): TObj[TKey] extends object
    ? DeepSetter<TObj[TKey], TBase>
    : () => Setter<TObj[TKey], TBase>
}

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
      return (value: any) => recursiveSet(obj, path, value)
    }

    return makeSetter([...path, key])
  }
  return makeSetter([]) as any
}
