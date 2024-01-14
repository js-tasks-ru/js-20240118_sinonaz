/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const newObj = {};
  const entries = Object.entries(obj);

  for (let i = 0; i < entries.length; i++) {
    if (entries[i][0] === fields[i]) {
      newObj[entries[i][0]] = fields[i];
    }
  }

  return newObj;
};
