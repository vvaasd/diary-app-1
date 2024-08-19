import { clsx } from '@/utils';
import { Icon, Input } from '@/components';
import styles from './Calendar.module.css';

type CalendarProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Calendar: React.FC<CalendarProps> = ({ className, ...props }) => {
  const today: string = new Date().toISOString().split('T')[0];

  const { value, ...restProps } = props;

  return (
    <div className={styles.wrapper}>
      <Input
        type="date"
        value={value || today}
        max={today}
        className={clsx(styles.calendar, className)}
        {...restProps}
      />
      <Icon name={'calendar'} className={styles.icon} />
    </div>
  );
};

export default Calendar;
