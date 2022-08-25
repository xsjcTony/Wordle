import { describe, expect, it } from 'vitest'
import { BoardLetterState } from '@/constants'
import { evaluateHardMode, evaluateWord } from '@/utils/evaluation'
import type { EvaluationResult } from '@/store/useGameState'
import type { Alphabet } from '@/utils/types'


describe('Evaluations', () => {
  describe('Evaluate word against solution', () => {
    it(`guess: 'humid', solution: 'humid' - ALL CORRECT`, () => {
      const guess: Alphabet[] = ['h', 'u', 'm', 'i', 'd']
      const solution = 'humid'

      expect(evaluateWord(guess, solution)).toEqual([
        BoardLetterState.correct,
        BoardLetterState.correct,
        BoardLetterState.correct,
        BoardLetterState.correct,
        BoardLetterState.correct
      ])
    })

    it(`guess: 'aaaaa', solution: 'humid' - ALL ABSENT`, () => {
      const guess: Alphabet[] = ['a', 'a', 'a', 'a', 'a']
      const solution = 'humid'

      expect(evaluateWord(guess, solution)).toEqual([
        BoardLetterState.absent,
        BoardLetterState.absent,
        BoardLetterState.absent,
        BoardLetterState.absent,
        BoardLetterState.absent
      ])
    })

    it(`guess: 'umidh', solution: 'humid' - ALL PRESENT`, () => {
      const guess: Alphabet[] = ['u', 'm', 'i', 'd', 'h']
      const solution = 'humid'

      expect(evaluateWord(guess, solution)).toEqual([
        BoardLetterState.present,
        BoardLetterState.present,
        BoardLetterState.present,
        BoardLetterState.present,
        BoardLetterState.present
      ])
    })

    it(`guess: 'haida', solution: 'humid' - MIXED`, () => {
      const guess: Alphabet[] = ['h', 'a', 'i', 'd', 'a']
      const solution = 'humid'

      expect(evaluateWord(guess, solution)).toEqual([
        BoardLetterState.correct,
        BoardLetterState.absent,
        BoardLetterState.present,
        BoardLetterState.present,
        BoardLetterState.absent
      ])
    })

    it(`guess: 'ellal', solution: 'level' - WORD WITH 2 SAME LETTERS`, () => {
      const guess: Alphabet[] = ['e', 'l', 'l', 'a', 'l']
      const solution = 'level'

      expect(evaluateWord(guess, solution)).toEqual([
        BoardLetterState.present,
        BoardLetterState.present,
        BoardLetterState.absent,
        BoardLetterState.absent,
        BoardLetterState.correct
      ])
    })

    it(`guess: 'rrarr', solution: 'error' - WORD WITH 3 SAME LETTERS`, () => {
      const guess: Alphabet[] = ['r', 'r', 'a', 'r', 'r']
      const solution = 'error'

      expect(evaluateWord(guess, solution)).toEqual([
        BoardLetterState.present,
        BoardLetterState.correct,
        BoardLetterState.absent,
        BoardLetterState.absent,
        BoardLetterState.correct
      ])
    })
  })


  describe('Evaluate hard mode', () => {
    it('1st letter must be E', () => {
      const guess: Alphabet[] = ['a', 'a', 'a', 'a', 'a']
      const lastGuess = 'eaaaa'
      const lastEvaluationResult: EvaluationResult = [
        BoardLetterState.correct,
        BoardLetterState.present,
        BoardLetterState.present,
        BoardLetterState.present,
        BoardLetterState.present
      ]

      expect(evaluateHardMode(guess, lastGuess, lastEvaluationResult)).toEqual({
        correct: 'e',
        ordinal: '1st'
      })
    })

    it('4th letter must be L', () => {
      const guess: Alphabet[] = ['a', 'a', 'a', 'a', 'a']
      const lastGuess = 'aaala'
      const lastEvaluationResult: EvaluationResult = [
        BoardLetterState.present,
        BoardLetterState.present,
        BoardLetterState.present,
        BoardLetterState.correct,
        BoardLetterState.present
      ]

      expect(evaluateHardMode(guess, lastGuess, lastEvaluationResult)).toEqual({
        correct: 'l',
        ordinal: '4th'
      })
    })

    it('Guess must contain R', () => {
      const guess: Alphabet[] = ['a', 'a', 'a', 'a', 'a']
      const lastGuess = 'aaraa'
      const lastEvaluationResult: EvaluationResult = [
        BoardLetterState.present,
        BoardLetterState.present,
        BoardLetterState.present,
        BoardLetterState.present,
        BoardLetterState.present
      ]

      expect(evaluateHardMode(guess, lastGuess, lastEvaluationResult)).toEqual({
        present: 'r',
        ordinal: ''
      })
    })

    it('Pass if guess satisfies all requirements of hard mode', () => {
      const guess: Alphabet[] = ['a', 'a', 'a', 'a', 'a']
      const lastGuess = 'aaaaa'
      const lastEvaluationResult: EvaluationResult = [
        BoardLetterState.present,
        BoardLetterState.correct,
        BoardLetterState.present,
        BoardLetterState.absent,
        BoardLetterState.present
      ]

      expect(evaluateHardMode(guess, lastGuess, lastEvaluationResult)).toEqual({ ordinal: '' })
    })
  })
})
