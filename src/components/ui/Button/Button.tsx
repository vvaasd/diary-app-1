import styles from './Button.module.css';
import { Icon } from '@/components';
import { clsx } from '@/utils';
import { EButtonBgType, IconNameType } from '@/types';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  iconName?: IconNameType;
  backgroundType?: EButtonBgType;
};

const Button: React.FC<ButtonProps> = (props) => {
  const {
    text,
    iconName,
    className,
    backgroundType = EButtonBgType.Primary,
    ...otherProps
  } = props;

  return (
    <button
      type={'button'}
      className={clsx(
        styles.btn,
        backgroundType === EButtonBgType.Neutral && styles.neutral,
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
