const axios = require("axios");
const URL = "https://api.spoonacular.com/recipes/";
const { Diet } = require("../db");

const getDiets = async (req, res) => {
  try {
    const { API_KEY } = process.env;
    let dbResponse = await Diet.findAll(); // Traigo Diets de la base de datos
    let dbDiets = []; // Esto sera el array con las diets que voy a retornar
    dbResponse.forEach((Diet) => {
      //pusheo en dbDiets la respuesta de la base de datos
      dbDiets.push(Diet.dataValues);
    });
    //evaluo si la base de datos ya contenia las diets, si no es asi la cargo
    if (dbDiets.length === 0) {
      const recipes = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true` //llamo 100 recetas
      );
      let dietsArray = [];
      dietsArray[0] = "vegetarian"; // vegetarian nunca esta en dietType asi que lo agrego

      for (const recipe of recipes.data.results) {
        // cargo dietsArray con las dietas de las recetas sin importar si estan repetidas
        let diets = recipe.diets;
        dietsArray.push(...diets);
      }
      dietsArray = dietsArray.filter((diet, index) => {
        // saco repetidas. en este momento ya deberia tener todas las dietas en un array
        return dietsArray.indexOf(diet) === index;
      });
      //cargo la base de datos con los tipos de dieta.
      await Diet.bulkCreate(dietsArray.map((diet) => ({ name: diet })));

      let dbResponse = await Diet.findAll(); // Traigo Diets de la base de datos
      let dbDiets = []; // Esto sera el array con las diets que voy a retornar
      dbResponse.forEach((Diet) => {
        //pusheo en dbDiets la respuesta de la base de datos
        dbDiets.push(Diet.dataValues);
      });

      res.status(200).json(dbDiets);
    } else {
      // si la base de datos ya estaba cargada devuelvo sus datos
      res.status(200).json(dbDiets);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = getDiets;
