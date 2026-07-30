module.exports = (sequelize, models, DataTypes) => {
    const Category = sequelize.define(
        'category',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
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