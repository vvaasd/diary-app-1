import { clsx } from '@/utils';
import styles from './TextArea.module.css';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea: React.FC<TextAreaProps> = ({
  className,
  placeholder,
  ...props
}) => {
  return (
    <textarea
      autoComplete="off"
      placeholder={placeholder}
      className={clsx(styles.textarea, className)}
      {...props}
    />
  );
};

export default TextArea;
