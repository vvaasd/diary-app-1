import styles from './Button.module.css';
import { Icon, IconNameType } from '../';
import { clsx } from '../../utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  iconName?: IconNameType;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  text,
  iconName,
  className,
  ...props
}) => {
  return (
    <button className={clsx(styles.btn, className)} {...props}>
      {iconName && <Icon name={iconName} className={styles.icon}></Icon>}
      {text && <span className={styles.text}>{text}</span>}
    </button>
  );
};

export default Button;
