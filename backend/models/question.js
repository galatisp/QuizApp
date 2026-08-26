module.exports = (sequelize, models, DataTypes) => {
    const Question = sequelize.define(
        'questions',
        {
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                   model: models.Category,
                   key: 'id'
                }
            },
             subjectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                   model: models.Subject,
                   key: 'id'
                }
            },
            number: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
				allowNull: false
            },
            answer1: {
                type: DataTypes.STRING,
                allowNull: false
            },
			answer2: {
                type: DataTypes.STRING,
                allowNull: false
            },
			answer3: {
                type: DataTypes.STRING,
                allowNull: false
            },
			answer4: {
                type: DataTypes.STRING,
                allowNull: false
            },
            correctAnswer: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }
    );

    //Question.sync({ alter: true });

    Question.associate = () => {
    };

    return Question;
};