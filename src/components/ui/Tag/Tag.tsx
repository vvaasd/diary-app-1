import React, { useState } from 'react';
import { Icon } from '@/components';
import { clsx } from '@/utils';
import styles from './Tag.module.css';

type TagProps = React.HTMLAttributes<HTMLLIElement> & {
  name: string;
  onBtnClick: () => void;
};

const Tag: React.FC<TagProps> = ({ name, onBtnClick }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <li
      className={clsx(styles.tagElement, isActive && styles.active)}
      key={name}
    >
      <p className={styles.tagText}>{name}</p>
      <button
        type="button"
        className={styles.tagBtn}
        onClick={onBtnClick}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onMouseLeave={() => setIsActive(false)}
      >
        <Icon name={'xMark'} className={styles.tagBtnIcon} />
      </button>
    </li>
  );
};

export default Tag;
