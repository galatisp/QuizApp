const { Sequelize } = require('sequelize');

module.exports = (db, dbUser, dbPass, dbHost) => {
    const Database = {};
    // db = "12plus" ;
    // dbUser = "root";
    // dbPass = "123456";
    // dbHost = "mysql"; // Use the service name defined in docker-compose.yml

    console.log('Database Configuration:');
    console.log(`DB: ${db}`);
    console.log(`DB User: ${dbUser}`);
    console.log(`DB Pass: ${dbPass}`);
    console.log(`DB Host: ${dbHost}`);


    if (!db || !dbUser) throw new Error('Database Error: Missing DB info.');

    Database.sequelize = new Sequelize(db, dbUser, dbPass, { dialect: 'mysql', host: dbHost });

    Database.authenticate = async () => {
        try {
            await Database.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error;
        }
    };

    Database.sync = async () => {
        try {
            await Database.sequelize.drop();
            await Database.sequelize.sync();

            console.log('Database has been synced successfully.');
        } catch (error) {
            console.error('Unable to sync the database:', error);
            throw error;
        }
    };

    return Database;
};