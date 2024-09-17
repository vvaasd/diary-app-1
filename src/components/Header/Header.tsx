import { Logo, Button } from '@/components';
import { setAddNotePage, setContentPage } from '@/store/slices/pages.slice';
import { useAppDispatch } from '@/store';
import styles from './Header.module.css';

type HeaderProps = React.HTMLAttributes<HTMLDivElement> & {
  withEditBtn: boolean;
};

const Header: React.FC<HeaderProps> = (props) => {
  const { withEditBtn } = props;

  const dispatch = useAppDispatch();

  return (
    <header className={styles.header}>
      <button
        type={'button'}
        onClick={() => {
          dispatch(setContentPage());
        }}
        className={styles.logoBtn}
      >
        <Logo />
      </button>

      {withEditBtn && (
        <Button
          iconName={'edit'}
          onClick={() => {
            dispatch(setAddNotePage());
          }}
        />
      )}
    </header>
  );
};

export default Header;
