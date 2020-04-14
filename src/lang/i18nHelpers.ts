export const plural = (amount: number, pluralValue: string, singleValue = '') =>
  amount > 1 ? pluralValue : singleValue
