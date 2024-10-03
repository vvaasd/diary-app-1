import { throttle } from '@/utils';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const useInlineItems = (
  items: string[],
  gap: number,
  itemClassName: string,
  options: {
    textClassName: string;
    resizeThrottleInterval: number;
  },
) => {
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  const [containerWidth, setContainerWidth] = useState<number>();
  const [visibleItems, setVisibleItems] = useState<string[]>();
  const containerRef = useRef<HTMLUListElement>(null);
  const hiddenElementRef = useRef<HTMLLIElement>(null);
  const firstTagCutValueRef = useRef<number | null>(null);
  const hiddenItemsCountRef = useRef<number>(0);

  useLayoutEffect(() => {
    hiddenItemsCountRef.current = 0;
    firstTagCutValueRef.current = null;

    let availableWidth = containerWidth ?? 0;
    const newItems: string[] = [];

    items.forEach((item, index) => {
      const isItemFirst = index === 0;
      const isItemLast = index === items.length - 1;

      const itemElement = document.createElement('div');
      itemElement.className = itemClassName;
      itemElement.style.visibility = 'hidden';
      itemElement.style.position = 'absolute';

      if (options.textClassName) {
        const textElement = document.createElement('p');
        textElement.className = options.textClassName;
        textElement.innerText = item;
        itemElement.appendChild(textElement);
      }

      document.body.appendChild(itemElement);

      const itemWidthWithGap = (itemElement.offsetWidth ?? 0) + gap;
      const counterWidthWithGap =
        (hiddenElementRef.current?.offsetWidth ?? 0) + gap;

      const availableWidthWithItem: number = availableWidth - itemWidthWithGap;

      const isEnoughSpaceForItem = availableWidthWithItem >= gap * 2;
      const isEnoughSpaceForItemAndCounter =
        availableWidthWithItem - counterWidthWithGap >= gap * 2;

      if (
        isItemFirst &&
        items.length === 2 &&
        !isEnoughSpaceForItemAndCounter
      ) {
        firstTagCutValueRef.current = counterWidthWithGap;
      }

      if (
        isItemFirst ||
        isEnoughSpaceForItemAndCounter ||
        (isItemLast &&
          isEnoughSpaceForItem &&
          hiddenItemsCountRef.current === 0)
      ) {
        availableWidth -= itemWidthWithGap;
        newItems.push(item);
      } else {
        hiddenItemsCountRef.current++;
      }

      document.body.removeChild(itemElement);
    });

    setVisibleItems(newItems);

    if (isFirstRender) {
      setContainerWidth(containerRef.current?.offsetWidth);
      setIsFirstRender(false);
    }
    //eslint-disable-next-line
  }, [items, gap, containerWidth, isFirstRender]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const resizeObserver = new ResizeObserver(
      throttle((entries) => {
        const entry = entries[0];
        const contentBoxSize = entry.contentBoxSize;

        const entryWidth = contentBoxSize
          ? contentBoxSize[0].inlineSize
          : entry.contentRect.width;

        setContainerWidth(entryWidth);
      }, options.resizeThrottleInterval),
    );

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
    //eslint-disable-next-line
  }, []);

  return {
    containerRef,
    hiddenElementRef,
    visibleItems,
    hiddenItemsCount: hiddenItemsCountRef.current,
    firstTagCutValue: firstTagCutValueRef.current,
  };
};

export default useInlineItems;
