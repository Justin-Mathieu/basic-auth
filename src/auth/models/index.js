const { Sequelize, DataTypes } = require('sequelize');
const Users = require('./user-model')

const sequelize = new Sequelize(process.env.DATABASE_URL);

const userModel = Users(sequelize);

module.exports = {
    sequelize,
    userModel,
}