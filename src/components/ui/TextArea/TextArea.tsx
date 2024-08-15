import { clsx } from '../../../utils';
import styles from './TextArea.module.css';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  placeholder: string;
  className?: string;
};

const TextArea: React.FC<TextAreaProps> = ({ className, placeholder }) => {
  return (
    <textarea
      autoComplete="off"
      placeholder={placeholder}
      className={clsx(styles.textarea, className)}
    />
  );
};

export default TextArea;
