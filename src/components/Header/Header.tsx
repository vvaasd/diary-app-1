import styles from './Header.module.css';
import { Logo, Button } from '@/components';
import { EPages } from '@/types';

type HeaderProps = {
  setMainPage: () => void;
  setCreateNotePage: () => void;
  currentPage: EPages;
};

const Header: React.FC<HeaderProps> = ({
  setMainPage,
  setCreateNotePage,
  currentPage,
}) => {
  return (
    <header className={styles.header}>
      <button type="button" onClick={setMainPage} className={styles.logoBtn}>
        <Logo />
      </button>

      {currentPage === EPages.Content && (
        <Button iconName={'edit'} onClick={setCreateNotePage} />
      )}
    </header>
  );
};

export default Header;
