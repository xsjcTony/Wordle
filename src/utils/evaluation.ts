import { BoardLetterState, WORD_LENGTH } from '@/constants'
import { numToOrdinal } from '@/utils/index'
import type { EvaluationResult } from '@/store/useGameState'
import type { Alphabet } from '@/utils/types'


export const evaluateWord = (guess: Alphabet[], solution: string): EvaluationResult => {
  // @ts-expect-error solution is consist of Alphabet for sure
  const solutionArr: Alphabet[] = solution.split('')
  const result: EvaluationResult = [] as unknown as EvaluationResult
  const letterTakenMap: boolean[] = new Array(WORD_LENGTH).fill(false)


  // correct & absent
  guess.forEach((letter, index) => {
    if (letter === solutionArr[index]) {
      result[index] = BoardLetterState.correct
      letterTakenMap[index] = true
      return
    }

    if (!solutionArr.includes(letter)) {
      result[index] = BoardLetterState.absent
      return
    }
  })


  // present
  guess.forEach((letter, index) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (result[index] !== undefined) return

    const presentLetterIndex = solutionArr.findIndex((l, i) => {
      if (l === letter && !letterTakenMap[i]) {
        letterTakenMap[i] = true
        return true
      }
    })

    if (presentLetterIndex !== -1) {
      result[index] = BoardLetterState.present
    } else {
      result[index] = BoardLetterState.absent
    }
  })

  return result
}


interface HardModeEvaluationResult {
  correct?: Alphabet
  present?: Alphabet
  ordinal: string
}

export const evaluateHardMode = (guess: Alphabet[], lastGuess: string, lastEvaluationResult: EvaluationResult): HardModeEvaluationResult => {
  const res: HardModeEvaluationResult = { ordinal: '' }

  lastEvaluationResult.some((state, i) => {
    if (
      state === BoardLetterState.correct
      && guess[i] !== lastGuess[i]
      && !res.correct
    ) {
      res.correct = lastGuess[i] as Alphabet
      res.ordinal = numToOrdinal(i + 1)
      return true
    } else if (
      state === BoardLetterState.present
      && !guess.includes(lastGuess[i] as Alphabet)
      && !res.present
    ) {
      res.present = lastGuess[i] as Alphabet
    }
  })

  return res
}
