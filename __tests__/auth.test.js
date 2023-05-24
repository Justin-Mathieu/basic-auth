const supertest = require('supertest');
const { app } = require('../src/server');
const { sequelize } = require('../src/auth/models');
const req = supertest(app);
const base64 = require('base-64')

beforeAll(async () => {
    await sequelize.sync();
});

afterAll(async () => {
    await sequelize.drop();
})

describe('Auth routes ', () => {
    it('signup route', async () => {
        const response = await req.post('/signup').send({
            username: 'pheonix',
            password: 'woof32',
        });
        expect(response.status).toBe(200);
        expect(response.body.username).toBe('pheonix')
    });

    it('signin route', async () => {
        const response = await req.post('/signin').set('Authoriztion', `Basic cGhlb25peDp3b29mMzI=`);
        expect(response.status).toBe(200)

    });
});