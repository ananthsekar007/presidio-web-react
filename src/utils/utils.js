export const filterByKey = (values, key, ignoreCase = true) => {
  let isSubstring = false;
  if (ignoreCase) {
    key = key.toLowerCase();
  }
  for (let i = 0; i < values.length; i++) {
    let newValue = values[i];
    if (ignoreCase) {
      newValue = newValue?.toLowerCase();
    }
    if (newValue?.includes(key)) {
      isSubstring = true;
      break;
    }
  }
  return isSubstring;
};
