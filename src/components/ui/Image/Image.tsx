import { Icon } from '../../';
import image from '../../../assets/img/theme-image.jpg';
import clsx from '../../../utils/clsx';
import styles from './Image.module.css';

type ImageType = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

const Image: React.FC<ImageType> = ({ className }) => (
  <button disabled={true} className={clsx(styles.btn, className)}>
    <img src={image} alt="градиент" className={styles.image} />
    <Icon name={'image'} className={styles.icon} />
  </button>
);

export default Image;
