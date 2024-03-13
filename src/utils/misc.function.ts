export const sortObjectsByValue = (array: any[], fieldName: string): any[] => {
  return array.sort((a, b) => {
    if (a[fieldName] < b[fieldName]) {
      return -1;
    }
    if (a[fieldName] > b[fieldName]) {
      return 1;
    }
    return 0;
  });
};
