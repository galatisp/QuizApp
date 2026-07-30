const Database = require('./database');

const db = Database(process.env.DB, process.env.DB_USER, process.env.DB_PASS, process.env.DB_HOST);

module.exports = db;