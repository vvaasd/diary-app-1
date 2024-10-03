import { clsx } from '@/utils';
import { Icon, Input } from '@/components';
import { DateService } from '@/services';
import styles from './Calendar.module.css';

type CalendarProps = React.InputHTMLAttributes<HTMLInputElement>;

const Calendar: React.FC<CalendarProps> = (props) => {
  const { className, value, ...otherProps } = props;

  const today: string = DateService.getDateString();

  return (
    <div className={styles.wrapper}>
      <Input
        type={'date'}
        value={value}
        max={today}
        className={clsx(styles.input, className)}
        {...otherProps}
      />
      <Icon name={'calendar'} className={clsx(styles.icon, 'colored')} />
    </div>
  );
};

export default Calendar;
