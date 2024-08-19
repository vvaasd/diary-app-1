import { clsx } from '@/utils';
import styles from './Dropdown.module.css';

type DropdownProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  className?: string;
  children?: React.ReactNode;
};

const Dropdown: React.FC<DropdownProps> = ({ className, isOpen, children }) => {
  return (
    <div className={clsx(styles.dropdown, className, isOpen && styles.shown)}>
      {children}
    </div>
  );
};

export default Dropdown;
