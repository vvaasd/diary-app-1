import { useRef, useState } from 'react';
import { clsx } from '../../utils';
import { useClickOutside } from '../../hooks';
import { Icon } from '../';
import { EMOJI } from '../../constants';
import styles from './Selector.module.css';

const Selector: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState<number | null>(
    null
  );
  const ref: React.RefObject<HTMLDivElement> = useRef(null);

  const handleClickOutside = (): void => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  useClickOutside(ref, handleClickOutside);

  const currentEmoji: React.ReactNode =
    currentEmojiIndex === null ? (
      <Icon name={'emoji'} className={styles.icon} />
    ) : (
      <span className={styles.current}>{EMOJI[currentEmojiIndex]}</span>
    );

  return (
    <div ref={ref} className={styles.wrapper}>
      <button
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
      <div className={clsx(styles.dropdown, isOpen && styles.dropdownShown)}>
        <ul className={styles.list}>
          {EMOJI.map(
            (emoji: string, index: number): React.ReactNode => (
              <li className={styles.element} key={index}>
                <input
                  type="radio"
                  name="emoji"
                  id={`emoji${index}`}
                  className={styles.input}
                  onChange={() => {
                    setCurrentEmojiIndex(index);
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
          className={styles.clearBtn}
          onClick={() => {
            setCurrentEmojiIndex(null);
          }}
          disabled={currentEmojiIndex === null}
        >
          <Icon name="notAllowed" className={styles.clearBtnIcon} />
          <span className={styles.clearBtnText}>Убрать эмоцию</span>
        </button>
      </div>
    </div>
  );
};

export default Selector;
