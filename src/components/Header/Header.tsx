import styles from './Header.module.css';
import { Logo, Button, CurrentPages } from '../';

type HeaderPropsType = {
  setMainPage: () => void;
  setCreateNotePage: () => void;
  currentPage: CurrentPages;
};

const Header: React.FC<HeaderPropsType> = ({
  setMainPage,
  setCreateNotePage,
  currentPage,
}) => {
  return (
    <header className={styles.header}>
      <button onClick={setMainPage} className={styles.logoBtn}>
        <Logo />
      </button>

      {currentPage === CurrentPages.Content && (
        <Button iconName={'edit'} onClick={setCreateNotePage} />
      )}
    </header>
  );
};

export default Header;
