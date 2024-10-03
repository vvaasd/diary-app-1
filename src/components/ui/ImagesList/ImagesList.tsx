import { ImageButton } from '@/components';
import { ImageInfoType } from '@/types';
import { clsx } from '@/utils';
import styles from './ImagesList.module.css';

type ImagesListProps = React.HTMLAttributes<HTMLDivElement> & {
  imagesInfo: ImageInfoType[];
  selectedImageInfo?: ImageInfoType;
  onImageSelect?: (info: ImageInfoType) => void;
};

const ImagesList: React.FC<ImagesListProps> = (props) => {
  const {
    imagesInfo,
    selectedImageInfo,
    className,
    onImageSelect = () => {},
  } = props;

  return (
    <div className={clsx(styles.wrapper, className)}>
      <ul className={styles.gridList}>
        {imagesInfo.map((imageInfo, index) => (
          <li
            className={clsx(
              styles.gridItem,
              imageInfo.orientation === 'horizontal'
                ? styles.horizontal
                : styles.vertical,
            )}
            key={imageInfo.id || index}
          >
            <ImageButton
              imageSrc={imageInfo.src}
              className={styles.image}
              onClick={() => {
                onImageSelect(imageInfo);
              }}
              isSelected={selectedImageInfo?.src === imageInfo.src}
              imageType={'picture'}
              imageAlt={imageInfo.alt}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImagesList;
