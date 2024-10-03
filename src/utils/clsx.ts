const clsx = (...classNames: (string | null | undefined | boolean)[]): string =>
  classNames.filter(Boolean).join(' ');

export default clsx;
