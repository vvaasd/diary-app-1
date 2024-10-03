import { useState } from 'react';
import { Icon } from '@/components';
import { clsx } from '@/utils';
import styles from './Tag.module.css';

type TagProps = React.HTMLAttributes<HTMLDivElement> & {
  name?: string;
  isInteractive?: boolean;
  isTiny?: boolean;
  noSharp?: boolean;
  onBtnClick?: () => void;
};

const Tag: React.FC<TagProps> = (props) => {
  const {
    name,
    isInteractive,
    isTiny,
    noSharp,
    onBtnClick = () => {},
    ...otherProps
  } = props;

  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        styles.tagElement,
        isInteractive && styles.interactive,
        isActive && styles.active,
        isTiny && styles.tiny,
        !name && styles.skeleton,
      )}
      key={name}
      {...otherProps}
    >
      {name && (
        <p className={clsx(styles.tagText, noSharp && styles.noSharp)}>
          {name}
        </p>
      )}
      {isInteractive && (
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
      )}
    </div>
  );
};

export default Tag;
