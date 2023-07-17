const axios = require("axios");
const { API_KEY } = process.env;
const URL = "https://api.spoonacular.com/recipes/";
const { Recipe } = require("../db");

const getRecipeByName = async (req, res) => {
  try {
    const apiResponse = await axios.get(
      `${URL}complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );
    const data = apiResponse.data.results;

    const apiRecipes = data.map((recipe) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      vegetarian: recipe.vegetarian,
      vegan: recipe.vegan,
      glutenfree: recipe.glutenfree,
      dairyfree: recipe.dairyfree,
      dietType: recipe.diets,
      healthScore: recipe.healthScore,
    }));
    const dbRecipes = await Recipe.findAll();
    if (dbRecipes === null) {
      const recipes = { results: [...apiRecipes] };
      return res.status(200).json(recipes);
    } else {
      const recipes = { results: [...dbRecipes, ...apiRecipes] };
      return res.status(200).json(recipes);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = getRecipeByName;
