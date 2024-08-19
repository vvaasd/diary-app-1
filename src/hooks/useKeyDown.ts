import { useEffect } from 'react';
import { KeyboardKey } from '@/types';

const useKeyDown = (
  targetKey: KeyboardKey,
  callback: (event: KeyboardEvent) => void
): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === targetKey) {
        callback(event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [targetKey, callback]);
};

export default useKeyDown;
