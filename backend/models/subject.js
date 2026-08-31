module.exports = (sequelize, models, DataTypes) => {
    const Subject = sequelize.define(
        'subject',
        {
            id: {
                type: DataTypes.INTEGER,
                defaultValue: DataTypes.INTEGER,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            timestamps: false
          }
    );

   

    Subject.associate = () => {
    };

    return Subject;
};