import { useEffect } from 'react';
import { RefType } from '@/types';

type CallbackType = () => void;

const useClickOutside = (callback: CallbackType, ...refs: RefType[]): void => {
  const handleClick = (event: MouseEvent): void => {
    let isClickedOutside = 0;
    refs.forEach((ref) => {
      if (
        ref.current &&
        event.target instanceof Node &&
        !ref?.current?.contains(event.target as Node)
      ) {
        isClickedOutside++;
      }
    });
    if (isClickedOutside === refs.length) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
    //eslint-disable-next-line
  }, []);
};

export default useClickOutside;
