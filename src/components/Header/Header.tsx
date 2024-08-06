import styles from './Header.module.css';
import { Logo, Button } from '../';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Button iconName={'edit'} />
    </header>
  );
};

export default Header;
