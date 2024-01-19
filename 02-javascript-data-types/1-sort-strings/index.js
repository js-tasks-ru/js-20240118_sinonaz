/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
  const types = {
    asc: 1,
    desc: -1
  };
  const type = types[param];
  const params = [['ru', 'en'], {caseFirst: 'upper'}];

  return [...arr].sort((a, b) => type * a.localeCompare(b, ...params));
}
