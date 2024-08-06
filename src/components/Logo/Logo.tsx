import styles from './Logo.module.css';
import { Icon } from '..';

const Logo: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Icon name="logo" className={styles.icon} />
      <span className={styles.text}>DreamTime</span>
    </div>
  );
};

export default Logo;
