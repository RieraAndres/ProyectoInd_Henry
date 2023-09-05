const { Recipe } = require("../db");

const postRecipe = async (req, res) => {
  try {
    const {
      //datos que deben venir por body de la req
      title,
      image,
      vegetarian,
      vegan,
      dietType,
      resume,
      healthScore,
      steps,
    } = req.body;

    if (!title || !resume || !dietType || !healthScore || !steps) {
      //estos son datos que deben estar si o si
      return res.status(403).send("Faltan datos");
    }

    await Recipe.findOrCreate({
      //creo la receta
      where: {
        title,
        image,
        vegetarian,
        vegan,
        dietType,
        resume,
        healthScore,
        steps,
      },
    });

    const allRecipes = await Recipe.findAll(); //traigo todas las recetas de la db y las devuelvo
    return res.status(200).json(allRecipes);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = postRecipe;
