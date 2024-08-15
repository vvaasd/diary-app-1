import {
  Input,
  Image,
  TextArea,
  Button,
  Calendar,
  Selector,
  BackgroundTypes,
} from '../../components';
import styles from './AddNote.module.css';

type AddNotePropsType = {
  handleBtnClick: () => void;
};

const AddNote: React.FC<AddNotePropsType> = ({ handleBtnClick }) => {
  return (
    <main className={styles.main}>
      <div className={styles.fieldBlocks}>
        <div className={styles.block}>
          <Input placeholder={'Заголовок'} />
          <TextArea placeholder={'Описание'} />
        </div>
        <div className={styles.block}>
          <div className={styles.calendarAndSelector}>
            <Calendar />
            <Selector />
          </div>
          <Image className={styles.image} />
          <Input placeholder={'#теги'} />
        </div>
      </div>
      <ul className={styles.btns}>
        <li className={styles.btn}>
          <Button iconName="edit" text="Создать запись" />
        </li>
        <li className={styles.btn}>
          <Button
            text="Отменить"
            backgroundType={BackgroundTypes.neutral}
            onClick={handleBtnClick}
          />
        </li>
      </ul>
    </main>
  );
};

export default AddNote;
