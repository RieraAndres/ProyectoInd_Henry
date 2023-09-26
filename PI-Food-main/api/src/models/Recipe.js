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
        type: DataTypes.ARRAY(DataTypes.STRING), //array con elementos que deben ser strings
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
        //de esta forma me queda con la misma estructura que las que vienen en la db
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
        // esta funcion me crea un id que no colisione con los que vienen de la api
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
