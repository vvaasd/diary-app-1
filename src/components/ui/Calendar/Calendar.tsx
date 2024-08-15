import { clsx } from '../../../utils';
import styles from './Calendar.module.css';

type CalendarProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Calendar: React.FC<CalendarProps> = ({ className }) => {
  const today: string = new Date().toISOString().split('T')[0];

  return (
    <input
      type="date"
      defaultValue={today}
      className={clsx(styles.calendar, className)}
    />
  );
};

export default Calendar;
