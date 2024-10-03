import React from 'react';
import { BreakpointsEnum, BreakpointsType, ImageInfoType } from '@/types';
import { Tag } from '@/components';
import { clsx } from '@/utils';
import { EMOJI_LIST } from '@/constants';
import { DateService } from '@/services';
import { useInlineItems } from '@/hooks';
import { useAppSelector } from '@/store';
import styles from './NotesItem.module.css';

type NotesItemProps = React.HTMLAttributes<HTMLDivElement> & {
  title: string;
  description: string;
  date: Date;
  imageInfo: ImageInfoType;
  emojiIndex?: number | null;
  tags?: string[];
};

const GAP_BETWEEN_TAGS: BreakpointsType = {
  desktop: 8,
  mobile: 8,
  tablet: 8,
};

const NotesItem: React.FC<NotesItemProps> = (props) => {
  const {
    title,
    description,
    date,
    tags = [],
    emojiIndex,
    imageInfo,
    ...otherProps
  } = props;

  const currentBreakpoint: BreakpointsEnum = useAppSelector(
    (state) => state.breakpoint.breakpoint,
  );
  const {
    containerRef,
    hiddenElementRef,
    visibleItems,
    hiddenItemsCount,
    firstTagCutValue,
  } = useInlineItems(
    tags,
    GAP_BETWEEN_TAGS[currentBreakpoint],
    styles.tinyTagWrapperModel,
    {
      textClassName: styles.tinyTagTextModel,
      resizeThrottleInterval: 100,
    },
  );

  const day = DateService.getDay(date);
  const month = DateService.getMonthShortName(date);

  return (
    <article className={styles.wrapper} {...otherProps} ref={containerRef}>
      <img className={styles.img} src={imageInfo.src} alt={imageInfo.alt} />
      <div className={clsx(styles.card, styles.date)}>
        <span className={styles.dateNumber}>{day}</span>
        <span className={styles.dateMonth}>{month}</span>
      </div>
      {emojiIndex && (
        <div className={clsx(styles.card, styles.emoji)}>
          {EMOJI_LIST[emojiIndex]}
        </div>
      )}
      <div className={styles.info}>
        <h2 className={styles.title}>{title}</h2>
        {tags.length ? (
          <ul className={styles.tagList}>
            {visibleItems?.map((tag, index) => (
              <li
                key={tag}
                style={{
                  maxWidth:
                    index === 0
                      ? `calc(100% - ${firstTagCutValue ?? 0}px)`
                      : '',
                }}
              >
                <Tag name={tag} isTiny />
              </li>
            ))}
            {hiddenItemsCount ? (
              <li ref={hiddenElementRef}>
                <Tag name={`+${hiddenItemsCount}`} noSharp isTiny />
              </li>
            ) : null}
          </ul>
        ) : (
          <p className={styles.description}>{description}</p>
        )}
      </div>
    </article>
  );
};

export default NotesItem;
