import { useEffect, useState } from 'react';
import { RefType } from '@/types';

const useScrollTop = (ref: RefType) => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  useEffect(() => {
    const currentElement = ref?.current;

    if (!currentElement) {
      return;
    }
    const handleScroll = () => {
      const isScrolled = Math.abs(currentElement.scrollTop) > 1;
      setIsScrolling(isScrolled);
    };

    currentElement.addEventListener('scroll', handleScroll);

    return () => {
      currentElement.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line
  }, []);

  return isScrolling;
};

export default useScrollTop;
