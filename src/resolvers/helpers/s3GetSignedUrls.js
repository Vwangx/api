/* eslint-disable no-param-reassign */
const s3 = require('../../../services/s3');

// eslint-disable-next-line arrow-body-style
module.exports = (items, fields) => {
  return items.map((item) => {
    fields.forEach((field) => {
      if (item[field]) {
        try {
          const url = s3.getSignedUrl('getObject', {
            Bucket: 'mbunity-development',
            Key: item[field],
            Expires: 86400,
          });
          item[field] = url;
        } catch (err) {
          console.error(err.message);
        }
      }
    });
    return item;
  });
};
