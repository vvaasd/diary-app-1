import { clsx } from '@/utils';
import styles from './Preloader.module.css';

type PreloaderProps = React.HTMLAttributes<HTMLDivElement>;

const Preloader: React.FC<PreloaderProps> = (props) => {
  const { className, ...otherProps } = props;

  return (
    <div className={clsx(styles.ldsSpinner, className)} {...otherProps}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Preloader;
