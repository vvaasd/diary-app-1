import { Icon } from '@/components';
import { clsx } from '@/utils';
import { EImageButtonType } from '@/types';
import defaultImageSrc from '@/assets/img/theme-image.jpg';
import styles from './ImageButton.module.css';

type ImageButtonType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  imageSrc: string;
  imageAlt: string;
  isSelected?: boolean;
  imageType?: EImageButtonType;
  onClear?: () => void;
};

const ImageButton: React.FC<ImageButtonType> = (props) => {
  const {
    className,
    isSelected = false,
    imageSrc,
    imageAlt,
    imageType = EImageButtonType.Default,
    onClick = () => {},
    onClear = () => {},
  } = props;

  const isImageDefault = imageSrc === defaultImageSrc;
  const isDefaultWithImage =
    imageType === EImageButtonType.Default && imageSrc && !isImageDefault;

  return (
    <button
      type={'button'}
      onClick={onClick}
      className={clsx(
        styles.btn,
        imageType === EImageButtonType.Default && styles.default,
        !isImageDefault && styles.withImage,
        isSelected && styles.selected,
        className,
      )}
    >
      <img src={imageSrc} className={styles.image} alt={imageAlt} />
      {isDefaultWithImage && (
        <div
          className={styles.clearBtn}
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
        >
          <Icon
            name={'xMarkThick'}
            className={clsx(styles.clearIcon, 'colored')}
          />
        </div>
      )}
      {!isDefaultWithImage && (
        <Icon name={'image'} className={clsx(styles.icon, 'colored')} />
      )}
    </button>
  );
};

export default ImageButton;
