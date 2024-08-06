import styles from './Content.module.css';
import { Button, Icon } from '../';

const Content: React.FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Icon name="noData" className={styles.noDataIcon} />
        <Button iconName="edit" text="Создать первую запись" />
      </div>
    </main>
  );
};

export default Content;
