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

    models.User = require("../models/user.model.js")(sequelize, models, DataTypes);
    models.Role = require("../models/role.model.js")(sequelize, models, DataTypes);

    models.Role.belongsToMany(models.User, {
        through: "user_roles"
    });
    models.User.belongsToMany(models.Role, {
        through: "user_roles"
    });

    models.ROLES = ["user", "admin", "moderator"];

    models.sequelize = sequelize;
    models.DataTypes = DataTypes;

    for (const modelName in models) models[modelName].associate?.();
    sequelize.sync();  

    return models;
};