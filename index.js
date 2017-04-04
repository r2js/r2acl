const acl = require('acl');
const log = require('debug')('r2:acl');

module.exports = function Acl(app) {
  const mongoose = app.service('Mongoose');
  if (!mongoose) {
    return log('service [Mongoose] not found!');
  }

  // useSingle: true
  return new acl(new acl.mongodbBackend(mongoose.connection.db, 'acl_', true)); // eslint-disable-line
};
