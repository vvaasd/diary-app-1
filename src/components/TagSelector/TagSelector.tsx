import { useState, useRef } from 'react';
import { Input, Dropdown, Tag } from '@/components';
import { useClickOutside, useKeyDown } from '@/hooks';
import { clsx, getTagsByText, upperCaseFirstLetter } from '@/utils';
import { StorageService } from '@/services';
import { ELocalStorageCurrentNoteKeys, EKeyboardKey } from '@/types';
import styles from './TagSelector.module.css';

const DATA_ATTRIBUTES: Record<string, string> = {
  dropdownBtn: 'dropdown-btn',
  dropdownInput: 'dropdown-input',
};

type TagSelectorProps = React.HTMLAttributes<HTMLDivElement> & {
  disabled?: boolean;
};

const TagSelector: React.FC<TagSelectorProps> = ({ disabled = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(
    StorageService.get(ELocalStorageCurrentNoteKeys.tagsInput) || ''
  );
  const [currentTags, setCurrentTags] = useState<string[]>(
    StorageService.get(ELocalStorageCurrentNoteKeys.tags) || []
  );
  const [dropdownTags, setDropdownTags] = useState<string[]>(
    getTagsByText(inputValue, currentTags)
  );
  const [dropdownTabIndex, setDropdownTabIndex] = useState<number>(-1);
  const inputWithDropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownListRef = useRef<HTMLUListElement>(null);

  useClickOutside(() => {
    setIsDropdownOpen(false);
    handleFocusMove('out');
  }, inputWithDropdownRef);

  const handleInput = (value: string): void => {
    if (disabled) {
      return;
    }

    const tags = getTagsByText(value, currentTags);

    if (tags.length === 0) {
      setIsDropdownOpen(false);
    } else if (!isDropdownOpen || value === '') {
      setIsDropdownOpen(true);
    }

    StorageService.set(ELocalStorageCurrentNoteKeys.tagsInput, value);
    setInputValue(value);
    setDropdownTags(tags);
  };

  const handleChangeTag = (
    targetTag: string,
    operation: 'delete' | 'add'
  ): void => {
    const oldTags: string[] =
      StorageService.get(ELocalStorageCurrentNoteKeys.tags) || [];

    let newCurrentTags: string[] = [];
    if (operation === 'delete') {
      newCurrentTags = oldTags.filter(
        (oldTag) => oldTag.toLowerCase() !== targetTag.toLowerCase()
      );
    } else if (operation === 'add') {
      const lowerCaseOldTags = oldTags.map((tag) => tag.toLowerCase());

      newCurrentTags = lowerCaseOldTags.includes(targetTag.toLowerCase())
        ? oldTags
        : [...oldTags, targetTag];
    }
    const newDropdownTags: string[] = getTagsByText(inputValue, newCurrentTags);

    StorageService.set(ELocalStorageCurrentNoteKeys.tags, newCurrentTags);
    setCurrentTags(newCurrentTags);
    setDropdownTags(newDropdownTags);
  };

  const handleEnter = (event: KeyboardEvent): void => {
    if (disabled) {
      return;
    }

    const activeElementName =
      document?.activeElement?.getAttribute('data-element-name');

    if (activeElementName === DATA_ATTRIBUTES.dropdownBtn) {
      handleFocusMove('out');
      const inputElement = inputRef.current as HTMLInputElement;
      inputElement.focus();

      const button = getDropdownButtonByIndex(dropdownTabIndex);
      if (button) {
        button.click();
      }
    } else if (activeElementName === DATA_ATTRIBUTES.dropdownInput) {
      event.preventDefault();
      handleChangeTag(inputValue, 'add');
      handleInput('');
    }
  };

  const getDropdownButtonByIndex = (index: number) => {
    if (dropdownListRef.current) {
      const listItem = dropdownListRef.current.children[
        index
      ] as HTMLLIElement | null;
      if (listItem) {
        return listItem.querySelector('button') as HTMLButtonElement | null;
      }
    }
    return null;
  };

  const handleFocusMove = (moveType: 'up' | 'down' | 'out'): void => {
    if (disabled) {
      return;
    }

    const lastBtnIndex = dropdownTags.length - 1;

    let newIndex: number = -1;
    if (moveType === 'up') {
      if (dropdownTabIndex === 0) {
        newIndex = lastBtnIndex;
      } else if (dropdownTabIndex === -1) {
        newIndex = dropdownTabIndex;
      } else {
        newIndex = dropdownTabIndex - 1;
      }
    } else if (moveType === 'down') {
      if (dropdownTabIndex === lastBtnIndex) {
        newIndex = 0;
      } else {
        newIndex = dropdownTabIndex + 1;
      }
    } else if (moveType === 'out') {
      setDropdownTabIndex(-1);
      return;
    }

    const button = getDropdownButtonByIndex(newIndex);
    if (button) {
      button.focus();
    }
    setDropdownTabIndex(newIndex);
  };

  useKeyDown(EKeyboardKey.enter, handleEnter);

  useKeyDown(EKeyboardKey.enter, handleEnter);
  useKeyDown(EKeyboardKey.arrowUp, (event) => {
    event.preventDefault();
    handleFocusMove('up');
  });
  useKeyDown(EKeyboardKey.arrowDown, (event) => {
    event.preventDefault();
    handleFocusMove('down');
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapper} ref={inputWithDropdownRef}>
        <Input
          placeholder={'#теги'}
          className={clsx(styles.input, isDropdownOpen && styles.active)}
          onFocus={() => {
            if (dropdownTags.length !== 0) {
              setIsDropdownOpen(true);
            }
          }}
          onChange={(e) => {
            handleInput(e.target.value);
          }}
          withClearBtn={true}
          onClear={() => {
            handleInput('');
          }}
          value={inputValue}
          data-element-name={DATA_ATTRIBUTES.dropdownInput}
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
                      type="button"
                      className={styles.dropdownBtn}
                      onClick={() => {
                        handleChangeTag(tag, 'add');
                      }}
                      data-element-name={DATA_ATTRIBUTES.dropdownBtn}
                    >
                      {upperCaseFirstLetter(tag)}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </Dropdown>
      </div>
      {currentTags?.length > 0 && (
        <ul className={styles.tagList}>
          {currentTags.map(
            (tag: string): React.ReactNode => (
              <Tag
                name={tag}
                onBtnClick={() => {
                  handleChangeTag(tag, 'delete');
                }}
                key={tag}
              />
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default TagSelector;
