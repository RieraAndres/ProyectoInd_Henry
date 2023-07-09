const axios = require("axios");
const URL = "https://api.spoonacular.com/recipes/";
const { Diet } = require("../db");

const getDiets = async (req, res) => {
  try {
    const { API_KEY } = process.env;
    const dbDiets = await Diet.findAll();
    if (dbDiets.length > 0) {
      return res.status(200).json(dbDiets);
    } else {
      const recipes = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
      );
      let dietsArray = [];
      dietsArray[0] = "vegetarian";

      for (const recipe of recipes.data.results) {
        let diets = recipe.diets;
        dietsArray.push(...diets);
      }
      dietsArray = dietsArray.filter((diet, index) => {
        return dietsArray.indexOf(diet) === index;
      });

      // Insertar los elementos en la tabla Diets
      await Diet.bulkCreate(dietsArray.map((diet) => ({ name: diet })));

      return res.status(200).json(dietsArray);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getDiets;
