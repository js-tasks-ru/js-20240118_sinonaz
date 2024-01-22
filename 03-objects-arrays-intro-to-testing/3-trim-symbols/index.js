/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {

  if (size === 0) {
    return '';
  } else if (!size) {
    return string;
  } else {
    let counter = 0;
    let previousLetter;

    return string.split('').map((currentLetter) => {
      counter = currentLetter === previousLetter ? counter += 1 : 1;
      previousLetter = currentLetter;

      return counter <= size ? currentLetter : '';
    }).join('');
  }
}
