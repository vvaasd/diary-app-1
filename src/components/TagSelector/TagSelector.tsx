import { useState, useRef } from 'react';
import { Input, Dropdown, Tag } from '@/components';
import { useClickOutside, useKeyDown } from '@/hooks';
import { clsx, getTagsFromNotes, upperCaseFirstLetter } from '@/utils';
import { EKeyboardKey, NoteType } from '@/types';
import { setTags } from '@/store/slices/currentNote.slice';
import { useAppSelector, useAppDispatch } from '@/store';
import styles from './TagSelector.module.css';

type TagSelectorProps = React.HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean;
};

const TagSelector: React.FC<TagSelectorProps> = (props) => {
  const { disabled } = props;

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const currentNote: NoteType = useAppSelector(
    (state) => state.currentNote.currentNote,
  );
  const notes: NoteType[] = useAppSelector((state) => state.notes.notes);
  const dispatch = useAppDispatch();

  const currentTags = currentNote.tags;

  const [dropdownTags, setDropdownTags] = useState<string[]>(
    getTagsFromNotes(notes, inputValue, currentTags),
  );
  const [dropdownTabIndex, setDropdownTabIndex] = useState<number>(-1);
  const inputWithDropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownListRef = useRef<HTMLUListElement>(null);

  const handleInput = (value: string): void => {
    if (disabled) {
      return;
    }

    const tags = getTagsFromNotes(notes, value, currentTags);

    if (tags.length === 0) {
      setIsDropdownOpen(false);
    } else if (!isDropdownOpen || value === '') {
      setIsDropdownOpen(true);
    }

    setInputValue(value);
    setDropdownTags(tags);
  };

  const handleChangeTag = (
    targetTag: string,
    operation: 'delete' | 'add',
  ): void => {
    if (!targetTag && operation === 'add') {
      return;
    }

    const oldTags: string[] = currentTags;

    let newTags: string[] = [];
    if (operation === 'delete') {
      newTags = oldTags.filter(
        (oldTag) => oldTag.toLowerCase() !== targetTag.toLowerCase(),
      );
    } else if (operation === 'add') {
      const lowerCaseOldTags = oldTags.map((tag) => tag.toLowerCase());

      newTags = lowerCaseOldTags.includes(targetTag.toLowerCase())
        ? oldTags
        : [...oldTags, targetTag];
    }
    const newDropdownTags: string[] = getTagsFromNotes(
      notes,
      inputValue,
      newTags,
    );

    setDropdownTags(newDropdownTags);
    dispatch(setTags(newTags));
    if (newDropdownTags.length === 0) {
      setIsDropdownOpen(false);
    }
  };

  const handleEnter = (event: KeyboardEvent): void => {
    if (disabled) {
      return;
    }

    const activeElement = document?.activeElement;

    if (dropdownListRef.current?.contains(activeElement)) {
      handleFocusMove('out');
      inputRef.current?.focus();
      const tag = dropdownTags[dropdownTabIndex];
      handleChangeTag(tag, 'add');
    } else if (inputRef.current?.contains(activeElement)) {
      event.preventDefault();
      handleChangeTag(inputValue, 'add');
      handleInput('');
    }
  };

  const getDropdownButtonByIndex = (
    index: number,
  ): HTMLButtonElement | null => {
    if (dropdownListRef.current) {
      const listItem = dropdownListRef.current.children[index] as HTMLLIElement;
      if (listItem) {
        return listItem.querySelector('button') as HTMLButtonElement;
      }
    }
    return null;
  };

  const handleFocusMove = (moveDirection: 'up' | 'down' | 'out'): void => {
    if (disabled) {
      return;
    }

    const lastBtnIndex = dropdownTags.length - 1;

    let newIndex: number = -1;
    if (moveDirection === 'up') {
      if (dropdownTabIndex === 0) {
        newIndex = lastBtnIndex;
      } else if (dropdownTabIndex === -1) {
        newIndex = dropdownTabIndex;
      } else {
        newIndex = dropdownTabIndex - 1;
      }
    } else if (moveDirection === 'down') {
      if (dropdownTabIndex === lastBtnIndex) {
        newIndex = 0;
      } else {
        newIndex = dropdownTabIndex + 1;
      }
    } else if (moveDirection === 'out') {
      setDropdownTabIndex(-1);
      return;
    }

    const button = getDropdownButtonByIndex(newIndex);
    if (button) {
      button.focus();
    }
    setDropdownTabIndex(newIndex);
  };

  useClickOutside(() => {
    setIsDropdownOpen(false);
    handleFocusMove('out');
  }, inputWithDropdownRef);

  useKeyDown(EKeyboardKey.enter, handleEnter);
  useKeyDown(EKeyboardKey.arrowUp, (event) => {
    if (isDropdownOpen) {
      event.preventDefault();
      handleFocusMove('up');
    }
  });
  useKeyDown(EKeyboardKey.arrowDown, (event) => {
    if (isDropdownOpen) {
      event.preventDefault();
      handleFocusMove('down');
    }
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper} ref={inputWithDropdownRef}>
        <Input
          placeholder={'#теги'}
          className={clsx(styles.input, isDropdownOpen && styles.active)}
          onFocus={() => {
            handleFocusMove('out');
            if (dropdownTags.length !== 0) {
              setIsDropdownOpen(true);
            }
          }}
          onChange={(event) => {
            handleInput(event.target.value);
          }}
          withClearBtn={true}
          onClear={() => {
            handleInput('');
          }}
          value={inputValue}
          ref={inputRef}
        />
        <Dropdown className={styles.dropdown} isOpen={isDropdownOpen}>
          <div className={styles.dropdownSpace}></div>
          <div className={styles.dropdownContent}>
            <p className={styles.tip}>Нажми Enter для добавления тега</p>
            <ul className={styles.dropdownList} ref={dropdownListRef}>
              {dropdownTags.map(
                (tag: string): React.ReactNode => (
                  <li key={tag} className={styles.dropdownElement}>
                    <button
                      type={'button'}
                      className={styles.dropdownBtn}
                      onClick={() => {
                        handleChangeTag(tag, 'add');
                      }}
                    >
                      {upperCaseFirstLetter(tag)}
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>
        </Dropdown>
      </div>
      {currentTags?.length > 0 && (
        <ul className={styles.tagList}>
          {currentTags.map((tag: string) => (
            <li key={tag}>
              <Tag
                name={tag}
                onBtnClick={() => {
                  handleChangeTag(tag, 'delete');
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagSelector;
