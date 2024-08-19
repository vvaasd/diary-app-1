import { useRef, useState } from 'react';
import { clsx } from '@/utils';
import { LocalStorage } from '@/services';
import { LsCurrentNoteKeys } from '@/types';
import { useClickOutside } from '@/hooks';
import { Icon, Dropdown } from '@/components';
import { EMOJI_LIST } from '@/constants';
import styles from './Selector.module.css';

const Selector: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState<number | null>(
    LocalStorage.get(LsCurrentNoteKeys.emojiIndex) || null
  );
  const ref: React.RefObject<HTMLDivElement> = useRef(null);

  useClickOutside(ref, (): void => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const handleEmojiSelect = (index: number): void => {
    setCurrentEmojiIndex(index);
    LocalStorage.set(LsCurrentNoteKeys.emojiIndex, index);
  };

  const handleEmojiReset = (): void => {
    setCurrentEmojiIndex(null);
    LocalStorage.set(LsCurrentNoteKeys.emojiIndex, null);
  };

  const currentEmoji: React.ReactNode =
    currentEmojiIndex === null ? (
      <Icon name={'emoji'} className={styles.icon} />
    ) : (
      <span className={styles.current}>{EMOJI_LIST[currentEmojiIndex]}</span>
    );

  return (
    <div ref={ref} className={styles.wrapper}>
      <button
        type="button"
        className={clsx(styles.btn, isOpen && styles.btnOpened)}
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {currentEmoji}
        <Icon
          name={'arrowDown'}
          className={clsx(styles.icon, styles.arrowDown)}
        />
      </button>
      <Dropdown className={styles.dropdown} isOpen={isOpen}>
        <ul className={styles.list}>
          {EMOJI_LIST.map(
            (emoji: string, index: number): React.ReactNode => (
              <li className={styles.element} key={index}>
                <input
                  type="radio"
                  name="emoji"
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
            )
          )}
        </ul>
        <button
          type="button"
          className={styles.clearBtn}
          onClick={handleEmojiReset}
          disabled={currentEmojiIndex === null}
        >
          <Icon name="notAllowed" className={styles.clearBtnIcon} />
          <span className={styles.clearBtnText}>Убрать эмоцию</span>
        </button>
      </Dropdown>
    </div>
  );
};

export default Selector;
