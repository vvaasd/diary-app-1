import { Button, Icon, NotesList } from '@/components';
import { NoteWithIdType } from '@/types';
import { setAddNotePage } from '@/store/slices/page.slice';
import { useAppDispatch, useAppSelector } from '@/store';
import styles from './Content.module.css';

type ContentProps = React.HTMLAttributes<HTMLDivElement>;

const Content: React.FC<ContentProps> = () => {
  const dispatch = useAppDispatch();
  const notes: NoteWithIdType[] = useAppSelector((state) => state.notes.notes);

  return (
    <main className={styles.main}>
      {notes?.length ? (
        <NotesList notes={notes} />
      ) : (
        <div className={styles.noContentWrapper}>
          <div className={styles.noContent}>
            <Icon name={'noData'} className={styles.noDataIcon} />
            <Button
              iconName={'edit'}
              text={'Создать первую запись'}
              onClick={() => {
                dispatch(setAddNotePage());
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Content;
