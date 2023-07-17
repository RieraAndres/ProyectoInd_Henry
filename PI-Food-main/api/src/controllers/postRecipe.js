const { Recipe } = require("../db");

const postRecipe = async (req, res) => {
  try {
    const {
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
      return res.status(403).send("Faltan datos");
    }

    await Recipe.findOrCreate({
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

    const allRecipes = await Recipe.findAll();
    return res.json(allRecipes);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = postRecipe;
