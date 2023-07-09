const { Recipe } = require("../db");

module.exports = async (req, res) => {
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
    const imageBuffer = Buffer.from(image, "base64");
    if (
      !title ||
      !resume ||
      !vegetarian ||
      !vegan ||
      !dietType ||
      !healthScore ||
      !steps
    ) {
      return res.status(401).send("Faltan datos");
    }

    await Recipe.findOrCreate({
      where: {
        title,
        image: imageBuffer,
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
