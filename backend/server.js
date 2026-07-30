const dotenv = require('dotenv');

(function initializeDotEnv() {
    switch (process.env.NODE_ENV) {
        case 'production':
            console.log("Running live!");
            dotenv.config({ path: '.env.production' });
            break;
        default:
            console.log("Testing! Detailed error messages are on.");
            dotenv.config({ path: '.env.development' });
            break;
    }
})();

const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');
const database = require('./database');
//const errorHandler = require('./errors/base/errorHandler');

function initApp() {
    //app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
    // app.use(cors({ credentials: true, origin: '*' }));
    app.use(cors({credentials: true, origin: 'http://localhost'}));
     app.use(cors({credentials: true, origin: 'http://localhost:4000'}));
 
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    routes(app);

    //app.use(errorHandler);
}

function listen() {
    const port = process.env.PORT || 5000;

    app.listen(port, () => console.log(`Server is running on port ${port}`));
}

(async () => {
	
	await database.authenticate();
    require('./models');

    initApp();

    listen();
})();