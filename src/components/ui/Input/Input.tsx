import React from 'react';
import { clsx } from '@/utils';
import { Icon } from '@/components';
import styles from './Input.module.css';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  withClearBtn?: boolean;
  onClear?: () => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      placeholder,
      withClearBtn = false,
      onClear = () => {},
      ...props
    },
    ref
  ) => {
    return (
      <>
        <input
          type="text"
          placeholder={placeholder}
          className={clsx(
            styles.input,
            withClearBtn && styles.withClearBtn,
            className
          )}
          ref={ref}
          {...props}
        />
        {withClearBtn && (
          <button
            type="button"
            onClick={onClear}
            className={styles.inputClearBtn}
            tabIndex={props?.value ? 0 : -1}
          >
            <Icon name={'xMark'} className={styles.inputClearIcon} />
          </button>
        )}
      </>
    );
  }
);

export default Input;
