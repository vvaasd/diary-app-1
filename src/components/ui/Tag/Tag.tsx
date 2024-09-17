import React, { useState } from 'react';
import { Icon } from '@/components';
import { clsx } from '@/utils';
import styles from './Tag.module.css';

type TagProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  onBtnClick: () => void;
};

const Tag: React.FC<TagProps> = (props) => {
  const { name, onBtnClick, ...otherProps } = props;

  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div
      className={clsx(styles.tagElement, isActive && styles.active)}
      key={name}
      {...otherProps}
    >
      <p className={styles.tagText}>{name}</p>
      <button
        type={'button'}
        className={styles.tagBtn}
        onClick={onBtnClick}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        onMouseLeave={() => setIsActive(false)}
      >
        <Icon
          name={'xMarkThick'}
          className={clsx(styles.tagBtnIcon, 'colored')}
        />
      </button>
    </div>
  );
};

export default Tag;
