import styles from './Button.module.css';
import { Icon } from '@/components';
import { clsx } from '@/utils';
import { ButtonBgType, IconNameType } from '@/types';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  iconName?: IconNameType;
  className?: string;
  backgroundType?: ButtonBgType;
};

const Button: React.FC<ButtonProps> = ({
  text,
  iconName,
  className,
  backgroundType = ButtonBgType.Primary,
  ...props
}) => {
  return (
    <button
      type="button"
      className={clsx(
        styles.btn,
        backgroundType === ButtonBgType.Neutral && styles.neutral,
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
