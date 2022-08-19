import { BoardLetterState, WORD_LENGTH } from '@/constants'
import type { EvaluationResult } from '@/store/useGameState'
import type { Alphabet } from '@/utils/types'


const evaluateWord = (guess: Alphabet[], solution: string): EvaluationResult => {
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

export default evaluateWord
