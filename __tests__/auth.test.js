'use strict';

const { server } = require('../src/server');
const { db } = require('../src/models/index');
const supertest = require('supertest');
const mockRequest = supertest(server);
const bcrypt = require('bcrypt');


describe('authentication', () => {

  beforeAll(async () => {
    await db.sync();
  });

  it('creates a user/ signs them up', async () => {
    const test = await mockRequest.post('/signup').send({ username: 'thisIsATest', password: 'strongpassword' });

    expect(test.status).toBe(200);
    expect(test.body.username).toEqual('thisIsATest');
    expect(test.body.password).not.toEqual(await bcrypt.hash('strongPassword', 10));


  });


  it('signs in a user', async () => {
    await mockRequest
      .post('/signup')
      .send({ username: 'username', password: 'password', role: 'admin' });

    const test = await mockRequest
      .post('/signin')
      .send({ username: 'username', password: 'password', role: 'admin' });


    expect(test.status).toBe(200);
    expect(test.body.username).toBeDefined();
    expect(test.body.password).not.toEqual('password');
  });


  it.skip('returns an error if failed to sign up', () => {
    const fail = mockRequest.post('/signp').send({ username: 'test', password: 'testpassword' });

    expect(fail.status).toBe(500);


  });

  it.skip('returns an error if failed to sign in', async () => {

    await mockRequest
      .post('/signup')
      .send({ username: 'test', password: 'password' });

    const mockFail = await mockRequest
      .post('/signin')
      .send({ username: 'test', password: 'notpassword' });

    expect(mockFail).toHaveProperty('error');



  });


  it('does not allow duplicate passwords', async () => {
    const mock1 = await mockRequest
      .post('/signup')
      .send({ username: 'thisIsATest', password: 'strongPassword' });

    expect(mock1.status).toBe(200);

    const mock2 = await mockRequest
      .post('/signup')
      .send({ username: 'thisIsATest', password: 'strongPassword' });

    expect(mock2).toHaveProperty('error');

  });


});