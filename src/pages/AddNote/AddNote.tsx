import { useState } from 'react';
import {
  Input,
  Image,
  TextArea,
  Button,
  Calendar,
  Selector,
  TagSelector,
} from '@/components';
import { LocalStorage } from '@/services';
import { LsCurrentNoteKeys, ButtonBgType } from '@/types';
import styles from './AddNote.module.css';

type AddNotePropsType = {
  handleBtnClick: () => void;
};

const AddNote: React.FC<AddNotePropsType> = ({ handleBtnClick }) => {
  const [headerInputValue, setHeaderInputValue] = useState<string>(
    LocalStorage.get(LsCurrentNoteKeys.header) || ''
  );
  const [textAreaValue, setTextAreaValue] = useState<string>(
    LocalStorage.get(LsCurrentNoteKeys.textArea) || ''
  );
  const [calendarValue, setCalendarValue] = useState<string>(
    LocalStorage.get(LsCurrentNoteKeys.date) || ''
  );

  const handleChangeHeaderInputValue = (value: string): void => {
    setHeaderInputValue(value);
    LocalStorage.set(LsCurrentNoteKeys.header, value);
  };

  const handleChangeTextAreaValue = (value: string): void => {
    setTextAreaValue(value);
    LocalStorage.set(LsCurrentNoteKeys.textArea, value);
  };

  const handleChangeCalendarValue = (value: string): void => {
    setCalendarValue(value);
    LocalStorage.set(LsCurrentNoteKeys.date, value);
  };

  const handleNoteReset = (): void => {
    handleBtnClick();

    LocalStorage.set(LsCurrentNoteKeys.header, null);
    LocalStorage.set(LsCurrentNoteKeys.textArea, null);
    LocalStorage.set(LsCurrentNoteKeys.date, null);
    LocalStorage.set(LsCurrentNoteKeys.emojiIndex, null);
    LocalStorage.set(LsCurrentNoteKeys.tagsInput, null);
    LocalStorage.set(LsCurrentNoteKeys.tags, null);
  };

  return (
    <main className={styles.main}>
      <form action="" className={styles.fieldBlocks}>
        <div className={styles.block}>
          <Input
            placeholder={'Заголовок'}
            onChange={(e) => {
              handleChangeHeaderInputValue(e.target.value);
            }}
            value={headerInputValue}
          />
          <TextArea
            placeholder={'Описание'}
            onChange={(e) => {
              handleChangeTextAreaValue(e.target.value);
            }}
            value={textAreaValue}
          />
        </div>
        <div className={styles.block}>
          <div className={styles.calendarAndSelector}>
            <Calendar
              onChange={(e) => {
                handleChangeCalendarValue(e.target.value);
              }}
              value={calendarValue}
            />
            <Selector />
          </div>
          <Image className={styles.image} />
          <TagSelector />
        </div>
      </form>
      <ul className={styles.btns}>
        <li className={styles.btn}>
          <Button type={'submit'} iconName={'edit'} text={'Создать запись'} />
        </li>
        <li className={styles.btn}>
          <Button
            type={'reset'}
            text={'Отменить'}
            backgroundType={ButtonBgType.Neutral}
            onClick={handleNoteReset}
          />
        </li>
      </ul>
    </main>
  );
};

export default AddNote;
