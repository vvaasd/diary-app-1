import { useRef, useEffect } from 'react';
import { clsx } from '@/utils';
import { useClickOutside } from '@/hooks';
import { Icon } from '@/components';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen?: boolean;
  onClose?: () => void;
};

const Modal: React.FC<ModalProps> = (props) => {
  const { className, children, isOpen = false, onClose = () => {} } = props;

  const contentRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useClickOutside(onClose, contentRef, closeBtnRef);

  useEffect(() => {
    const root = document.getElementById('root');
    if (isOpen) {
      root?.setAttribute('inert', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      root?.removeAttribute('inert');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={clsx(styles.modal, 'container', className)}>
      <div className={styles.modalContent} ref={contentRef}>
        {children}
      </div>
      <button
        type={'button'}
        className={styles.closeBtn}
        onClick={onClose}
        ref={closeBtnRef}
      >
        <Icon name={'xMark'} className={clsx(styles.closeIcon, 'colored')} />
      </button>
    </div>,
    document.getElementById('modal') as HTMLDivElement,
  );
};

export default Modal;
