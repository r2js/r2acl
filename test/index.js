const chai = require('chai');
const r2base = require('r2base');
const r2mongoose = require('r2mongoose');
const r2acl = require('../index');

const expect = chai.expect;

const app = r2base({ baseDir: __dirname });
app.start()
  .serve(r2mongoose, { database: 'r2test' })
  .serve(r2acl)
  .into(app);

describe('r2acl', () => {
  it('should create acl service', () => {
    expect(app.services.Acl).to.not.equal(undefined);
  });
});

function dropDatabase(done) {
  this.timeout(0);
  app.service('Mongoose').connection.dropDatabase();
  done();
}

after(dropDatabase);
