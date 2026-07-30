module.exports = (sequelize, models, DataTypes) => {
    const Subject = sequelize.define(
        'subject',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            categoryId: {
                type: DataTypes.UUID,
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