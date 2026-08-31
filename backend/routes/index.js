const { v4: uuidv4 } = require('uuid');

module.exports = function (app) {
    app.use((req, res, next) => {
        req.id = uuidv4();
        next();
    });

    //app.use('/secure/auth', require('./secure/auth'));
    app.use('/public/questions', require('./public/question'));
    app.use('/public/subjects', require('./public/subject'));
    app.use('/public/categories', require('./public/category'));
    app.use('/admin/upload-new-questions', require('./admin/upload-new-questions'));
    require('./auth.routes')(app);
    require('./user.routes')(app);
};