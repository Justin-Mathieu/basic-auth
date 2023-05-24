'use strict';

module.exports = (sequelize, DataTypes) =>
    sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }




    });

    // userModel.beforeCreate(async (user) => {
    //     let hash = await bcrypt.hash(user.password, 5);
    //     user.password = hash
    // });
    // return userModel;

