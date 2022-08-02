'use strict';

const bcrypt = require('bcrypt');



const user = (sequelize, DataTypes) => {
  const userModel = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  userModel.beforeCreate(async (user) => {
    let hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  });
  return userModel;
};

module.exports = user;