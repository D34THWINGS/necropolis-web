import { findAndPutFirstInArray } from '../helpers'

describe('Data helpers', () => {
  describe('findAndPutFirstInArray()', () => {
    it('should do nothing if no match', () => {
      expect(findAndPutFirstInArray([1, 2, 3, 4, 5], value => value === 9)).toEqual([1, 2, 3, 4, 5])
    })

    it('should do nothing if value is already first', () => {
      expect(findAndPutFirstInArray([1, 2, 3, 4, 5], value => value === 1)).toEqual([1, 2, 3, 4, 5])
    })

    it('should move value in first position if matching', () => {
      expect(findAndPutFirstInArray([1, 2, 3, 4, 5], value => value === 3)).toEqual([3, 1, 2, 4, 5])
    })
  })
})
