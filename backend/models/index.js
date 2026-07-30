const { Sequelize } = require('sequelize');
const database = require('../database');
const sequelize = database.sequelize;

const models = require('./models')(sequelize, Sequelize.DataTypes);

module.exports = models;