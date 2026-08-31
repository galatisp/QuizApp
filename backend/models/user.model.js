module.exports = (sequelize, models, DataTypes) => {
  const User = sequelize.define("users", {
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  });

  return User;
};