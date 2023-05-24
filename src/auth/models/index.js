const { Sequelize, DataTypes } = require('sequelize');
const userModel = require('./user-model')

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory:' : process.env.DATABASE_URL;

const sequelize = new Sequelize(DATABASE_URL);

const Users = userModel(sequelize, DataTypes);

module.exports = {
    sequelize,
    Users,
}