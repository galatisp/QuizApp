module.exports = (sequelize, DataTypes) => {
    const models = {};


    models.Subject = require('./subject')(sequelize, models, DataTypes);
    models.Category = require('./category')(sequelize, models, DataTypes);
    models.Question = require('./question')(sequelize, models, DataTypes);
    // define relationships
    models.Subject.hasMany(models.Question, {
        as: "questions",
        foreignKey: 'subjectId'
    });
    models.Question.belongsTo(models.Subject, {
        as: 'subject',
        foreignKey: "subjectId"
    });
    models.Category.hasMany(models.Subject, { as: "subjects" });
    models.Subject.belongsTo(models.Category, {
        foreignKey: "categoryId"
    });

    for (const modelName in models) models[modelName].associate?.();

    return models;
};