import { clsx } from '@/utils';
import styles from './TextArea.module.css';

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea: React.FC<TextAreaProps> = (props) => {
  const { className, placeholder, ...otherProps } = props;

  return (
    <textarea
      autoComplete={'off'}
      placeholder={placeholder}
      className={clsx(styles.textarea, className)}
      {...otherProps}
    />
  );
};

export default TextArea;
