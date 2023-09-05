const { Recipe } = require("../db");

const deleteRecipe = async (req, res) => {
  //EXTRA
  try {
    const { id } = req.params;
    await Recipe.destroy({ where: { id } }); //busca la receta en la base de datos que corresponda y lo elimino
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = deleteRecipe;
