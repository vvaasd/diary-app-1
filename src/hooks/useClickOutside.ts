import { useEffect } from 'react';

type RefType = React.RefObject<HTMLElement>;
type CallbackType = () => void;

const useClickOutside = (ref: RefType, callback: CallbackType): void => {
  const handleClick = (event: MouseEvent): void => {
    if (
      ref &&
      event.target instanceof Node &&
      !ref?.current?.contains(event.target as Node)
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};

export default useClickOutside;
