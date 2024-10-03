import { useState } from 'react';
import {
  Input,
  ImageButton,
  TextArea,
  Button,
  Calendar,
  Selector,
  TagSelector,
  Modal,
  SearchImage,
} from '@/components';
import { ImageInfoType, NoteType, NoteWithIdType } from '@/types';
import { DEFAULT_IMAGE_INFO } from '@/constants';
import { pushNote } from '@/store/slices/notes.slice';
import { setContentPage } from '@/store/slices/page.slice';
import {
  resetCurrentNote,
  setTitle,
  setTextArea,
  setDate,
  setImageInfo,
} from '@/store/slices/currentNote.slice';
import { useAppSelector, useAppDispatch } from '@/store';
import styles from './AddNote.module.css';
import { generateId } from '@/utils';

type AddNoteProps = React.HTMLAttributes<HTMLDivElement>;

const AddNote: React.FC<AddNoteProps> = () => {
  const [isImagesModalOpen, setIsImagesModalOpen] = useState<boolean>(false);
  const notes: NoteWithIdType[] = useAppSelector((state) => state.notes.notes);
  const currentNote: NoteType = useAppSelector(
    (state) => state.currentNote.currentNote,
  );
  const dispatch = useAppDispatch();

  const isReadyToSubmit: boolean = Boolean(
    currentNote.title && currentNote.description && currentNote.date,
  );

  const handleSubmit = (): void => {
    const existingNotesIds = notes.map((note) => note.id);

    dispatch(pushNote({ ...currentNote, id: generateId(existingNotesIds) }));

    handleNoteReset();
    dispatch(setContentPage());
  };

  const handleChangeTitleInput = (value: string): void => {
    dispatch(setTitle(value));
  };

  const handleChangeTextAreaInput = (value: string): void => {
    dispatch(setTextArea(value));
  };

  const handleChangeCalendar = (value: string): void => {
    dispatch(setDate(value));
  };

  const handleChangeImage = (info: ImageInfoType): void => {
    setIsImagesModalOpen(false);
    dispatch(setImageInfo(info));
  };

  const handleClearImage = (): void => {
    dispatch(setImageInfo(DEFAULT_IMAGE_INFO));
  };

  const handleNoteReset = (): void => {
    dispatch(resetCurrentNote());
    dispatch(setContentPage());
  };

  return (
    <>
      <Modal
        isOpen={isImagesModalOpen}
        onClose={() => {
          setIsImagesModalOpen(false);
        }}
      >
        <SearchImage onSelectImage={handleChangeImage} />
      </Modal>
      <main>
        <form className={styles.wrapper}>
          <div className={styles.fieldBlocks}>
            <div className={styles.block}>
              <Input
                placeholder={'Заголовок'}
                onChange={(event) => {
                  handleChangeTitleInput(event.target.value);
                }}
                value={currentNote.title}
                required
              />
              <TextArea
                placeholder={'Описание'}
                onChange={(event) => {
                  handleChangeTextAreaInput(event.target.value);
                }}
                value={currentNote.description}
                required
              />
            </div>
            <div className={styles.block}>
              <div className={styles.calendarAndSelector}>
                <Calendar
                  onChange={(event) => {
                    handleChangeCalendar(event.target.value);
                  }}
                  value={currentNote.date}
                  required
                />
                <Selector />
              </div>
              <ImageButton
                onClick={() => {
                  setIsImagesModalOpen(true);
                }}
                imageSrc={currentNote.imageInfo.src}
                imageAlt={currentNote.imageInfo.alt}
                imageType={'default'}
                onClear={handleClearImage}
              />
              <TagSelector disabled={isImagesModalOpen} />
            </div>
          </div>
          <div className={styles.btns}>
            <Button
              type={'submit'}
              iconName={'edit'}
              text={'Создать запись'}
              onClick={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
              disabled={!isReadyToSubmit}
            />
            <Button
              type={'reset'}
              text={'Отменить'}
              backgroundType={'neutral'}
              onClick={handleNoteReset}
            />
          </div>
        </form>
      </main>
    </>
  );
};

export default AddNote;
