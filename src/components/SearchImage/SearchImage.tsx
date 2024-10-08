import { Icon, Input, Preloader, ImagesList } from '@/components';
import { useDebounce, useScrollTop } from '@/hooks';
import { clsx, mapImages } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import { StorageService, Api } from '@/services';
import { LocalStorageKeysEnum, ImageInfoType, NoteType } from '@/types';
import { DEFAULT_IMAGE_INFO } from '@/constants';
import styles from './SearchImage.module.css';

type SearchImageProps = React.HTMLAttributes<HTMLDivElement> & {
  onSelectImage?: (info: ImageInfoType) => void;
};

const SearchImage: React.FC<SearchImageProps> = (props) => {
  const { className, onSelectImage = () => {} } = props;

  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageInfoType>(
    (StorageService.get(LocalStorageKeysEnum.CurrentNote) as NoteType)
      ?.imageInfo || DEFAULT_IMAGE_INFO,
  );
  const [currentImages, setCurrentImages] = useState<ImageInfoType[]>([]);
  const debouncedInputValue = useDebounce(inputValue, 400);
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const isListScrolled = useScrollTop(listWrapperRef);
  const imageSelectTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleImageSelect = (info: ImageInfoType): void => {
    setSelectedImage(info);

    imageSelectTimerRef.current = setTimeout(() => {
      onSelectImage(info);
    }, 200);
  };

  const handleInput = (value: string): void => {
    setInputValue(value);
  };

  const fetchAndSetImages = async () => {
    try {
      setIsLoading(true);
      setCurrentImages([]);

      const data = await Api.fetchImagesByQuery(inputValue);
      const newImages = mapImages(data);

      setCurrentImages(newImages);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetImages();
    // eslint-disable-next-line
  }, [debouncedInputValue]);

  useEffect(() => {
    return () => {
      clearTimeout(imageSelectTimerRef.current);
    };
  }, []);

  const preloaderJSX = (
    <div className={styles.substituteContentWrapper}>
      <Preloader className={styles.preloader} />
    </div>
  );

  const notFoundJSX = (
    <div className={styles.substituteContentWrapper}>
      <div className={styles.notFound}>
        <Icon name={'noResults'} className={styles.notFoundIcon} />
        <p className={styles.notFoundText}>
          По твоему запросу ничего не найдено
        </p>
      </div>
    </div>
  );

  let substituteImagesContent: React.ReactNode = null;

  if (isLoading) {
    substituteImagesContent = preloaderJSX;
  } else if (!currentImages.length) {
    substituteImagesContent = notFoundJSX;
  }

  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.searchWrapper}>
        <div className={styles.inputWrapper}>
          <Input
            placeholder={'Поиск'}
            className={styles.input}
            onChange={(event) => {
              handleInput(event.target.value);
            }}
            value={inputValue}
            onClear={() => {
              handleInput('');
            }}
            withClearBtn={true}
          />
        </div>
      </div>
      <div
        ref={listWrapperRef}
        className={clsx(
          styles.imagesListWrapper,
          isListScrolled && styles.withShadow,
        )}
      >
        {substituteImagesContent || (
          <ImagesList
            imagesInfo={currentImages}
            onImageSelect={handleImageSelect}
            selectedImageInfo={selectedImage}
          />
        )}
      </div>
    </div>
  );
};

export default SearchImage;
