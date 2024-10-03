class DateService {
  static getDateString = (date: Date = new Date()): string => {
    return date.toISOString().split('T')[0];
  };

  static getMonthShortName = (date: Date): string => {
    const formatter = Intl.DateTimeFormat('ru-RU', { month: 'short' });
    const monthShortName = formatter.format(date);
    return monthShortName.endsWith('.')
      ? monthShortName.slice(0, -1)
      : monthShortName;
  };

  static getDay = (date: Date): string => {
    const formatter = Intl.DateTimeFormat('ru-RU', { day: 'numeric' });
    return formatter.format(date);
  };
}

export default DateService;
