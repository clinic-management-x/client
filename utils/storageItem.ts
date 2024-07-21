export const getLocalStorageItem = (name: string) => {
  if (window !== undefined) {
    return localStorage.getItem(name);
  }
};
