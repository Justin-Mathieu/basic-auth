'use strict';

const bcrypt = require('bcrypt');
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');



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
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    token: {
      type: [DataTypes.VIRTUAL],
      get() {

        const payload = { username: this.username, role: this.role };
        return jwt.sign(payload, SECRET);
      },
    },
  });

  userModel.beforeCreate(async (user) => {

    let hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    user.role;

  });
  return userModel;
};

module.exports = user;