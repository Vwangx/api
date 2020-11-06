const cryptoRandomString = require('crypto-random-string');
const { ApolloError } = require('apollo-server-express');
const path = require('path');

const s3 = require('../../../services/s3');

module.exports = async (folder, file) => {
  const upload = await file;
  const { createReadStream, filename } = await upload;
  const id = cryptoRandomString({ length: 20 });
  const extension = path.extname(filename);

  const Key = `${folder}/${id}${extension}`;

  const params = {
    Bucket: 'mbunity-development',
    Key,
    Body: createReadStream(),
    ACL: 'private',
  };

  try {
    await s3.upload(params).promise();
  } catch (err) {
    return new ApolloError(err.message);
  }

  return { path: Key };
};
