const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid"); // Importa v4 en lugar de uuidv4
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Diet",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: () => {
          const uuid = uuidv4().replace(/-/g, ""); // Genera un UUID v4
          return BigInt(`0x${uuid}`).toString(); // Convierte el UUID a una cadena de números
        },
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
