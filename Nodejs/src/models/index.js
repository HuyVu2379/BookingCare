'use strict';
require('dotenv').config();

import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import { Sequelize, DataTypes } from 'sequelize';
const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configPath = join(__dirname, '/../config/config.json');
const config = require(configPath)[env];
const db = {};

let sequelize;
try {
  if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
  } else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
  }
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const modelFilePath = join(__dirname, file);
    const model = require(modelFilePath);
    if (typeof model !== 'function') {
      console.error(`Error: ${file} does not export a function. Please check the model file.`);
      return;
    }
    const initializedModel = model(sequelize, DataTypes);
    db[initializedModel.name] = initializedModel;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
