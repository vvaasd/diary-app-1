import { clsx } from '../../../utils';
import styles from './Input.module.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  className?: string;
};

const Input: React.FC<InputProps> = ({ className, placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={clsx(styles.input, className)}
    />
  );
};

export default Input;
