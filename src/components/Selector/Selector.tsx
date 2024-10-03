import { useRef, useState } from 'react';
import { clsx } from '@/utils';
import { NoteType } from '@/types';
import { useClickOutside } from '@/hooks';
import { Icon, Dropdown } from '@/components';
import { EMOJI_LIST } from '@/constants';
import { setEmojiIndex } from '@/store/slices/currentNote.slice';
import { useAppSelector, useAppDispatch } from '@/store';
import styles from './Selector.module.css';

const Selector: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const currentNote: NoteType = useAppSelector(
    (state) => state.currentNote.currentNote,
  );
  const dispatch = useAppDispatch();
  const wrapperRef = useRef<HTMLInputElement>(null);

  const currentEmojiIndex = currentNote.emojiIndex;

  const handleEmojiSelect = (index: number | null): void => {
    dispatch(setEmojiIndex(index));
  };

  useClickOutside((): void => {
    setIsOpen(false);
  }, wrapperRef);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type={'button'}
        className={clsx(styles.btn, isOpen && styles.btnOpened)}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {currentEmojiIndex === null ? (
          <Icon name={'emoji'} className={clsx(styles.icon, 'colored')} />
        ) : (
          <span className={styles.current}>
            {EMOJI_LIST[currentEmojiIndex]}
          </span>
        )}
        <Icon
          name={'arrowDown'}
          className={clsx(styles.icon, styles.arrowDown, 'colored')}
        />
      </button>
      <Dropdown className={styles.dropdown} isOpen={isOpen}>
        <ul className={styles.list}>
          {EMOJI_LIST.map(
            (emoji: string, index: number): React.ReactNode => (
              <li className={styles.element} key={index}>
                <input
                  type={'radio'}
                  name={'emoji'}
                  id={`emoji${index}`}
                  className={styles.input}
                  onChange={() => {
                    handleEmojiSelect(index);
                  }}
                  checked={currentEmojiIndex === index}
                />
                <label htmlFor={`emoji${index}`} className={styles.label}>
                  {emoji}
                </label>
              </li>
            ),
          )}
        </ul>
        <span>
          <button
            type={'button'}
            className={styles.clearBtn}
            onClick={() => {
              handleEmojiSelect(null);
            }}
            disabled={currentEmojiIndex === null}
          >
            <Icon
              name={'notAllowed'}
              className={clsx(styles.clearBtnIcon, 'colored')}
            />
            <span className={styles.clearBtnText}>Убрать эмоцию</span>
          </button>
        </span>
      </Dropdown>
    </div>
  );
};

export default Selector;
