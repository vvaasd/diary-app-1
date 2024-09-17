import { Button, Icon } from '@/components';
import { setAddNotePage } from '@/store/slices/pages.slice';
import { useAppDispatch } from '@/store';
import styles from './Content.module.css';

type ContentProps = React.HTMLAttributes<HTMLDivElement>;

const Content: React.FC<ContentProps> = () => {
  const dispatch = useAppDispatch();

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Icon name={'noData'} className={styles.noDataIcon} />
        <Button
          iconName={'edit'}
          text={'Создать первую запись'}
          onClick={() => {
            dispatch(setAddNotePage());
          }}
        />
      </div>
    </main>
  );
};

export default Content;
