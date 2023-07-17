const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Recipe",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vegetarian: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      vegan: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      dietType: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      resume: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      steps: {
        type: DataTypes.ARRAY(
          DataTypes.JSONB({
            name: DataTypes.STRING,
            steps: DataTypes.ARRAY(
              DataTypes.JSONB({
                number: DataTypes.INTEGER,
                step: DataTypes.STRING,
              })
            ),
          })
        ),
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeValidate: (recipe) => {
          if (!recipe.id) {
            // Generar identificador manualmente si no existe
            recipe.id = 2000000 + Math.floor(Math.random() * 1000000);
          }
        },
      },
      timestamps: false,
    }
  );
};
