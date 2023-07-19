const axios = require("axios");
const { API_KEY } = process.env;
const URL = "https://api.spoonacular.com/recipes/";
const { Recipe } = require("../db");

const getRecipeById = async (req, res) => {
  try {
    let { id } = req.params;
    idDb = parseInt(id);
    if (idDb > 2000000 && idDb < 3000000) {
      const dbResponse = await Recipe.findAll();
      const recipeData = [...dbResponse.map((recipe) => recipe.dataValues)];
      const dbRecipe = recipeData.find((obj) => obj.id === idDb);
      if (dbRecipe) {
        return res.status(200).json(dbRecipe);
      }
    } else {
      const response = await axios.get(
        `${URL}${id}/information?apiKey=${API_KEY}&includeNutrition=true`
      );
      const data = response.data;
      const apiRecipe = {
        id: data.id,
        title: data.title,
        image: data.image,
        vegetarian: data.vegetarian,
        vegan: data.vegan,
        glutenfree: data.glutenFree,
        glutenfree: data.glutenfree,
        dietType: data.diets,
        resume: data.summary,
        steps: data.analyzedInstructions,
        diets: data.diets,
        healthScore: data.healthScore,
      };
      if (apiRecipe) {
        return res.status(200).json(apiRecipe);
      } else {
        return res.status(500).send("No existe receta con ese id");
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = getRecipeById;
