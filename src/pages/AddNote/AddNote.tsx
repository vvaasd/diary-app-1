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
import { StorageService } from '@/services';
import {
  ELocalStorageCurrentNoteKeys,
  EButtonBgType,
  EImageButtonType,
  ImageInfoType,
} from '@/types';
import { DEFAULT_IMAGE_INFO } from '@/constants';
import styles from './AddNote.module.css';

type AddNoteProps = {
  handleBtnClick: () => void;
};

const AddNote: React.FC<AddNoteProps> = ({ handleBtnClick }) => {
  const [isImagesModalOpen, setIsImagesModalOpen] = useState<boolean>(false);
  const [headerInputValue, setHeaderInputValue] = useState<string>(
    StorageService.get(ELocalStorageCurrentNoteKeys.header) || ''
  );
  const [textAreaValue, setTextAreaValue] = useState<string>(
    StorageService.get(ELocalStorageCurrentNoteKeys.textArea) || ''
  );
  const [calendarValue, setCalendarValue] = useState<string>(
    StorageService.get(ELocalStorageCurrentNoteKeys.date) || ''
  );
  const [currentImage, setCurrentImage] = useState<ImageInfoType>(
    StorageService.get(ELocalStorageCurrentNoteKeys.imageInfo) ||
      DEFAULT_IMAGE_INFO
  );

  const handleChangeHeaderInputValue = (value: string): void => {
    setHeaderInputValue(value);
    StorageService.set(ELocalStorageCurrentNoteKeys.header, value);
  };

  const handleChangeTextAreaValue = (value: string): void => {
    setTextAreaValue(value);
    StorageService.set(ELocalStorageCurrentNoteKeys.textArea, value);
  };

  const handleChangeCalendarValue = (value: string): void => {
    setCalendarValue(value);
    StorageService.set(ELocalStorageCurrentNoteKeys.date, value);
  };

  const handleChangeImage = (info: ImageInfoType): void => {
    setCurrentImage(info);
    setIsImagesModalOpen(false);
    // в LS значение кладется на уровне SearchImage
  };

  const handleClearImageSrc = (): void => {
    setCurrentImage(DEFAULT_IMAGE_INFO);
    StorageService.remove(ELocalStorageCurrentNoteKeys.imageInfo);
  };

  const handleNoteReset = (): void => {
    handleBtnClick();

    StorageService.removeByObject(ELocalStorageCurrentNoteKeys);
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
            <ImageButton
              onClick={() => {
                setIsImagesModalOpen(true);
              }}
              imageSrc={currentImage.src}
              imageAlt={currentImage.alt}
              imageType={EImageButtonType.Default}
              onClear={handleClearImageSrc}
            />
            <TagSelector disabled={isImagesModalOpen} />
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
              backgroundType={EButtonBgType.Neutral}
              onClick={handleNoteReset}
            />
          </li>
        </ul>
      </main>
    </>
  );
};

export default AddNote;
