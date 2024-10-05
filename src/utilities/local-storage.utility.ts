export const getLocalStorageItem = (key: string) => (typeof window !== 'undefined' ? localStorage.getItem(key) : null);

export const setLocalStorageItem = (key: string, value: string) => {
  if (typeof window !== 'undefined') localStorage.setItem(key, value);
};

export const removeLocalStorageItem = (key: string) => {
  if (typeof window !== 'undefined') localStorage.removeItem(key);
};
