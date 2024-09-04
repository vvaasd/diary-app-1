import { clsx } from '@/utils';
import styles from './Preloader.module.css';

type PreloaderProps = React.HTMLAttributes<HTMLDivElement>;

const Preloader: React.FC<PreloaderProps> = ({ className, ...props }) => {
  return (
    <div className={clsx(styles.ldsSpinner, className)} {...props}>
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
