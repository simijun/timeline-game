// 保存関数
export const saveToSessionStorage = <T>(key: string, value: T) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to sessionStorage with key "${key}":`, error);
  }
};

// 読み込み関数
export const loadFromSessionStorage = <T>(key: string, defaultValue: T) => {
  try {
    const savedValue = sessionStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : defaultValue;
  } catch (error) {
    console.error(`Error loading from sessionStorage with key "${key}":`, error);
    return defaultValue;
  }
};

// 削除関数（リセット用）
export const removeFromSessionStorage = (key: string) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from sessionStorage with key "${key}":`, error);
  }
};

// 全体クリア関数(今は未使用)
export const clearSessionStorage = () => {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.error('Error clearing sessionStorage:', error);
  }
};
