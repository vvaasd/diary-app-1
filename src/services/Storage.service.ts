type StorageKey = string;

class StorageService {
  static get = <T>(key: StorageKey): T | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

  static set = <T>(key: StorageKey, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  static remove = (key: StorageKey): void => {
    localStorage.removeItem(key);
  };

  static removeByObject = (object: { [key: string]: string }): void => {
    Object.values(object).forEach(StorageService.remove);
  };
}

export default StorageService;
