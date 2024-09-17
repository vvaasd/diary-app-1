import { clsx } from '@/utils';
import styles from './Dropdown.module.css';

type DropdownProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
};

const Dropdown: React.FC<DropdownProps> = (props) => {
  const { className, isOpen, children, ...otherProps } = props;

  return (
    <div
      className={clsx(styles.dropdown, isOpen && styles.shown, className)}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default Dropdown;
