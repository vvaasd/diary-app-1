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

const Modal: React.FC<ModalProps> = ({
  className,
  children,
  isOpen = false,
  onClose = () => {},
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    if (isOpen) {
      onClose();
    }
  };

  useClickOutside(handleClose, contentRef, closeBtnRef);

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
        type="button"
        className={styles.closeBtn}
        onClick={handleClose}
        ref={closeBtnRef}
      >
        <Icon name={'xMark'} className={styles.closeIcon} />
      </button>
    </div>,
    document.getElementById('modal') as HTMLDivElement
  );
};

export default Modal;
