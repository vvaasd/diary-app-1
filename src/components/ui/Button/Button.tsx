import styles from './Button.module.css';
import { Icon } from '@/components';
import { clsx } from '@/utils';
import { IconNameType } from '@/types';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  iconName?: IconNameType;
  backgroundType?: 'neutral' | 'primary';
};

const Button: React.FC<ButtonProps> = (props) => {
  const {
    text,
    iconName,
    className,
    backgroundType = 'primary',
    ...otherProps
  } = props;

  return (
    <button
      type={'button'}
      className={clsx(
        styles.btn,
        backgroundType === 'neutral' && styles.neutral,
        className,
      )}
      {...otherProps}
    >
      {iconName && (
        <Icon name={iconName} className={clsx('colored', styles.icon)}></Icon>
      )}
      {text && <span className={styles.text}>{text}</span>}
    </button>
  );
};

export default Button;
