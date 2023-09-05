const axios = require("axios");
const { API_KEY } = process.env;
const URL = "https://api.spoonacular.com/recipes/";
const { Recipe } = require("../db");

const getRecipeByName = async (req, res) => {
  try {
    const apiResponse = await axios.get(
      // traigo la respuesta de la base de datos
      `${URL}complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    );

    const data = apiResponse.data.results;

    const apiRecipes = data.map((recipe) => ({
      //me quedo con los datos que me interesand de la respuesta
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
    const dbRecipes = await Recipe.findAll(); //traigo los datos de la base de datos
    if (dbRecipes === null) {
      //si no hay solo devuelvo los de la api
      const recipes = { results: [...apiRecipes] };
      return res.status(200).json(recipes);
    } else {
      const recipes = { results: [...dbRecipes, ...apiRecipes] }; //si hay en la api y en la db los devuelvo concatenados
      return res.status(200).json(recipes);
    }
  } catch (error) {
    res.status(500).send("Unable to connect to the database:", error.message);
  }
};

module.exports = getRecipeByName;
