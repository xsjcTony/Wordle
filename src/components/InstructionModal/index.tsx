import { useCallback, useRef } from 'react'
import { ReactComponent as Moon } from '@/assets/images/moon.svg'
import { ReactComponent as Reset } from '@/assets/images/reset.svg'
import { ReactComponent as Sun } from '@/assets/images/sun.svg'
import BoardLetter from '@/components/BoardLetter'
import Modal from '@/components/Modal'
import { BoardLetterState } from '@/constants'
import styles from './index.module.scss'
import type { BoardLetterRef } from '@/components/BoardLetter'
import type { Alphabet } from '@/utils/types'


interface InstructionModalProps {
  isOpen: boolean
  closeModalHandler: () => void
}


const InstructionModal = ({ isOpen, closeModalHandler }: InstructionModalProps): JSX.Element => {
  const wRef = useRef<BoardLetterRef>(null)
  const iRef = useRef<BoardLetterRef>(null)
  const uRef = useRef<BoardLetterRef>(null)


  const playLetterAnimations = useCallback((): void => {
    void wRef.current?.changeState(BoardLetterState.correct)
    void iRef.current?.changeState(BoardLetterState.present)
    void uRef.current?.changeState(BoardLetterState.absent)
  }, [])


  return (
    <Modal
      closeModalHandler={closeModalHandler}
      isOpen={isOpen}
      modalProps={{
        aria: { labelledby: 'heading', describedby: 'description' },
        contentLabel: 'instruction',
        onAfterOpen: playLetterAnimations
      }}
    >
      <h1 className={styles.heading} id="heading">how to play</h1>
      <section id="description">
        <div className={styles.rule}>
          <p>Guess the <strong>WORDLE</strong> in 6 tries.</p>
          <p>Each guess must be a valid 5-letter word. Hit the enter button to submit.</p>
          <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>

          <div className={styles.examples}>
            <p><strong>Examples</strong></p>

            <div aria-label="weary with W as correct letter" className={styles.example}>
              <div className={styles.letterContainer}>
                <BoardLetter ref={wRef} letter="w" />
              </div>
              {('eary'.split('') as Alphabet[]).map((letter, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} className={styles.letterContainer}>
                  <BoardLetter letter={letter} />
                </div>
              ))}
              <p>The letter <strong>W</strong> is in the word and in the correct spot.</p>
            </div>

            <div aria-label="pills with L as present letter" className={styles.example}>
              <div className={styles.letterContainer}>
                <BoardLetter letter="p" />
              </div>
              <div className={styles.letterContainer}>
                <BoardLetter ref={iRef} letter="i" />
              </div>
              {('lls'.split('') as Alphabet[]).map((letter, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} className={styles.letterContainer}>
                  <BoardLetter letter={letter} />
                </div>
              ))}
              <p>The letter <strong>I</strong> is in the word but in the wrong spot.</p>
            </div>

            <div aria-label="vague with U as absent letter" className={styles.example}>
              {('vag'.split('') as Alphabet[]).map((letter, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} className={styles.letterContainer}>
                  <BoardLetter letter={letter} />
                </div>
              ))}
              <div className={styles.letterContainer}>
                <BoardLetter ref={uRef} letter="u" />
              </div>
              <div className={styles.letterContainer}>
                <BoardLetter letter="e" />
              </div>
              <p>The letter <strong>U</strong> is not in the word in any spot.</p>
            </div>
          </div>

          <div>
            <p><strong>Other features</strong></p>
            <p>Dark Mode: Press <Sun /> or <Moon /> to switch dark mode ON / OFF.</p>
            <p>Hard Mode: Press <strong className={styles.hardMode}>E</strong> or <strong className={styles.hardMode}>H</strong> to switch hard mode ON / OFF.</p>
            <p>New Round: Press <Reset /> to start a new round. <i>You can only start a new round if you won or lost the current one.</i></p>
          </div>
        </div>
      </section>
    </Modal>
  )
}

export default InstructionModal
