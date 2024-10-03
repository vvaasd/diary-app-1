import { NoteWithIdType } from '@/types';
import { NotesItem } from '@/components';
import styles from './NotesList.module.css';

type NotesListProps = React.HTMLAttributes<HTMLUListElement> & {
  notes: NoteWithIdType[];
};

const NotesList: React.FC<NotesListProps> = (props) => {
  const { notes, ...otherProps } = props;

  if (!notes?.length) {
    return null;
  }

  return (
    <ul className={styles.list} {...otherProps}>
      {notes.map((item) => (
        <li key={item.id}>
          <NotesItem
            title={item.title}
            description={item.description}
            date={new Date(item.date)}
            imageInfo={item.imageInfo}
            emojiIndex={item.emojiIndex}
            tags={item.tags}
          />
        </li>
      ))}
    </ul>
  );
};

export default NotesList;
