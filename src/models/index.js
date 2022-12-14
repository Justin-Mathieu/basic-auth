'use strict';

require('dotenv').config();
console.log(process.env.NODE_ENV);
const DATABASE_URL = ['dev', 'test'].includes(process.env.NODE_ENV)
  ? 'sqlite::memory:'
  : process.env.DATABASE_URL;
const { Sequelize, DataTypes } = require('sequelize');

const Collection = require('./data-collection.js');
const foodSchema = require('./food/model.js');
const clothesSchema = require('./clothes/model.js');
const recipeSchema = require('./recipe/model.js');
const foodRecipeSchema = require('./foodRecipe/model.js');
const userSchema = require('./user/model.js');
const sessionSchema = require('./session/model.js');

const sequelizeOptions =
  process.env.NODE_ENV === 'production'
    ? {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }
    : {};

// turn schemas into Sequelize models
const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);
const FoodModel = foodSchema(sequelize, DataTypes);
const ClothesModel = clothesSchema(sequelize, DataTypes);
const RecipeModel = recipeSchema(sequelize, DataTypes);
const FoodRecipeModel = foodRecipeSchema(sequelize, DataTypes);
const userModel = userSchema(sequelize, DataTypes);
const SessionModel = sessionSchema(sequelize, DataTypes);
// create our Collections and associations
const FoodCollection = new Collection(FoodModel);
const ClothesCollection = new Collection(ClothesModel);
const RecipeCollection = new Collection(RecipeModel);


FoodCollection.belongsToManyThrough(RecipeCollection, FoodRecipeModel);
RecipeCollection.belongsToManyThrough(FoodCollection, FoodRecipeModel);

const userCollection = new Collection(userModel);
const SessionCollection = new Collection(SessionModel);


module.exports = {
  db: sequelize,
  Food: FoodCollection,
  Clothes: ClothesCollection,
  Recipe: RecipeCollection,
  FoodRecipe: FoodRecipeModel,
  User: userCollection,
  Session: SessionCollection,
};