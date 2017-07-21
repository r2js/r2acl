const chai = require('chai');
const r2base = require('r2base');
const r2mongoose = require('r2mongoose');
const r2acl = require('../index');

const expect = chai.expect;

const app = r2base();
app.start()
  .serve(r2mongoose, { database: 'r2acl' })
  .serve(r2acl)
  .into(app);

const Acl = app.service('Acl');

before((done) => {
  // wait for connection
  app.service('Mongoose').connection.on('open', () => {
    done();
  });
});

describe('r2acl', () => {
  it('should create acl service', () => {
    expect(app.services.Acl).to.not.equal(undefined);
  });

  it('should allow to resource', (done) => {
    Acl.allow('guest', 'blogs', 'view')
      .then(() => Acl.addUserRoles('guest', 'guest'))
      .then(() => Acl.allowedPermissions('guest', 'blogs'))
      .then((data) => {
        expect(data.blogs).to.deep.equal(['view']);
        done();
      });
  });
});

function dropDatabase(done) {
  this.timeout(0);
  app.service('Mongoose').connection.dropDatabase();
  done();
}

after(dropDatabase);
