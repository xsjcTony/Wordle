import { describe, expect, it } from 'vitest'
import targetWords from '@/data/targetWords.json'
import { compareFlatArray, getSolution, numToOrdinal, validateWord } from '@/utils/index'


describe('Utils', () => {
  it('Number to ordinal', () => {
    expect(numToOrdinal(1)).toBe('1st')
    expect(numToOrdinal(2)).toBe('2nd')
    expect(numToOrdinal(3)).toBe('3rd')
    expect(numToOrdinal(4)).toBe('4th')
    expect(numToOrdinal(11)).toBe('11th')
    expect(numToOrdinal(12)).toBe('12th')
    expect(numToOrdinal(13)).toBe('13th')
    expect(numToOrdinal(19)).toBe('19th')
    expect(numToOrdinal(20)).toBe('20th')
    expect(numToOrdinal(21)).toBe('21st')
    expect(numToOrdinal(101)).toBe('101st')
    expect(numToOrdinal(102)).toBe('102nd')
    expect(numToOrdinal(103)).toBe('103rd')
    expect(numToOrdinal(111)).toBe('111th')
    expect(numToOrdinal(112)).toBe('112th')
    expect(numToOrdinal(113)).toBe('113th')
    expect(numToOrdinal(119)).toBe('119th')
    expect(numToOrdinal(199)).toBe('199th')
    expect(numToOrdinal(200)).toBe('200th')
  })


  it('Check if word is in the dictionary', () => {
    expect(validateWord(['a', 'a', 'a', 'a', 'a'])).toBeFalsy()
    expect(validateWord(['a', 'a', 'h', 'e', 'd'])).toBeTruthy()
  })


  it('Solution is taken from target words', () => {
    expect(targetWords.includes(getSolution())).toBeTruthy()
    expect(targetWords.includes(getSolution())).toBeTruthy()
  })


  it('Compare if flat arrays are the same', () => {
    expect(compareFlatArray([1, 2, 3], [1, 2, 3])).toBeTruthy()
    expect(compareFlatArray([1, 2, 3], ['1', '2', '3'])).toBeFalsy()
    expect(compareFlatArray([1, 2, 3], [3, 2, 1])).toBeFalsy()
  })
})
