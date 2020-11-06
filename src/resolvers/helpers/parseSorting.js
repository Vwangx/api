const camelcase = require('camelcase');

module.exports = (sortEnum) => {
  const index = sortEnum.lastIndexOf('_');
  return [camelcase(sortEnum.slice(0, index)), camelcase(sortEnum.slice(index + 1))];
};
