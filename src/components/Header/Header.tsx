import styles from './Header.module.css';
import { Logo, Button } from '@/components';
import { Pages } from '@/types';

type HeaderPropsType = {
  setMainPage: () => void;
  setCreateNotePage: () => void;
  currentPage: Pages;
};

const Header: React.FC<HeaderPropsType> = ({
  setMainPage,
  setCreateNotePage,
  currentPage,
}) => {
  return (
    <header className={styles.header}>
      <button type="button" onClick={setMainPage} className={styles.logoBtn}>
        <Logo />
      </button>

      {currentPage === Pages.Content && (
        <Button iconName={'edit'} onClick={setCreateNotePage} />
      )}
    </header>
  );
};

export default Header;
