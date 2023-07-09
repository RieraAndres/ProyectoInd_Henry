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

  // if (dbRecipe != null) {
  //   // return res.status(200).json({ dbRecipe });
  // } else if (apiRecipe) {
  //   return res.status(200).json(apiRecipe);
  // } else {
  //   return res.status(500).send("No hay resetas con ese id");
  // }
};

module.exports = getRecipeById;

// try {
//   const apiResponse = await axios.get(
//     `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&includeNutrition=true.`
//   );
//   const data = apiResponse.data;
//   const apiRecipe = {
//     id: data.id,
//     title: data.title,
//     image: data.image,
//     vegetarian: data.vegetarian,
//     vegan: data.vegan,
//     glutenfree: data.glutenFree,
//     glutenfree: data.glutenfree,
//     dietType: data.diets,
//     resume: data.summary,
//     steps: data.analyzedInstructions,
//     diets: data.diets,
//     healthScore: data.healthScore,
//   };

//   const recipe = await Recipe.findByPk(Number(id));

//   if (recipe != null) {
//     const recipes = { results: [recipe] };
//     return res.status(200).json(recipes);
//   } else if (Object.keys(apiRecipe).length > 0) {
//     const recipes = { results: [apiRecipe] };
//     return res.status(200).json(recipes);
//   } else {
//     return res.status(404).json({ message: "Receta no encontrada" });
//   }
// } catch (error) {
//   if (error.response && error.response.status === 404) {
//     return res.status(404).json({ message: "Receta no encontrada" });
//   }
//   res.status(500).send(error.message);
