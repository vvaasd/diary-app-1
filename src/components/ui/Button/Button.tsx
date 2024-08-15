import styles from './Button.module.css';
import { Icon, IconNameType } from '../../';
import { clsx } from '../../../utils';

export enum BackgroundTypes {
  primary = 'primary',
  neutral = 'neutral',
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  iconName?: IconNameType;
  className?: string;
  backgroundType?: BackgroundTypes;
};

const Button: React.FC<ButtonProps> = ({
  text,
  iconName,
  className,
  backgroundType = BackgroundTypes.primary,
  ...props
}) => {
  return (
    <button
      className={clsx(
        styles.btn,
        backgroundType === BackgroundTypes.neutral && styles.noIcon,
        className
      )}
      {...props}
    >
      {iconName && <Icon name={iconName} className={styles.icon}></Icon>}
      {text && <span className={styles.text}>{text}</span>}
    </button>
  );
};

export default Button;
