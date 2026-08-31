module.exports = (sequelize, models, DataTypes) => {
    const Category = sequelize.define(
        'category',
        {
            id: {
                type: DataTypes.INTEGER,
                defaultValue: DataTypes.INTEGER,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false
          }
    );

   

    Category.associate = () => {
    };

    return Category;
};