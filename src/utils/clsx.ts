const clsx = (...classNames: (string | null | undefined)[]): string => {
  return classNames.filter(Boolean).join(' ');
};

export default clsx;
