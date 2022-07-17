export function getRandomItemFromArray(arr, exclude) {
  const item = arr[Math.floor(Math.random() * arr.length)];

  if (item === exclude) {
    return getRandomItemFromArray(arr, exclude);
  }

  return item;
}
