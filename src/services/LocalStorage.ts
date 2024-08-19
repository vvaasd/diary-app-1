type StorageKey = string;

export default class LocalStorage {
  static get = <T>(key: StorageKey): T | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

  static set = <T>(key: StorageKey, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };
}
