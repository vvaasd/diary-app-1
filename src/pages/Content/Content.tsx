import styles from './Content.module.css';
import { Button, Icon } from '@/components';

type ContentProps = {
  handleBtnClick: () => void;
};

const Content: React.FC<ContentProps> = ({ handleBtnClick }) => {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Icon name="noData" className={styles.noDataIcon} />
        <Button
          iconName="edit"
          text="Создать первую запись"
          onClick={handleBtnClick}
        />
      </div>
    </main>
  );
};

export default Content;
