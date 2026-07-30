const readline = require('readline');
const dotenv = require('dotenv');
dotenv.config({ path: './.env.development' });

const database = require('./');

const syncDb = async () => {
    console.log('Syncing the database...');

    await database.authenticate();

    require('../models');

    await database.sync();

    const [results, metadata] = await database.sequelize.query(
        "SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));"
    );
    console.log(results, metadata);

    process.exit(0);
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(
    `Datebase ${process.env.DB_HOST}/${process.env.DB} will be synced. Are you sure you want to proceed?\n`,
    answer => {
        if (answer === 'yes' || answer === 'y') syncDb();
        else process.exit(0);
    }
);

rl.on('close', () => {
    process.exit(0);
});