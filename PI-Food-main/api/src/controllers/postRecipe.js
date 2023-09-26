const { Recipe } = require("../db");
const cludinary = require("cloudinary").v2;
const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = process.env;

cludinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_KEY,
  api_secret: CLOUD_SECRET,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

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

    let imageUrl = null;

    if (image) {
      // Sube la imagen a Cloudinary y guarda la URL
      const uploadResult = await new Promise((resolve, reject) => {
        cludinary.uploader.upload(image, opts, (error, result) => {
          if (error) {
            return reject(error);
          }
          imageUrl = result.secure_url;
          resolve(result);
        });
      });
    }
    console.log(imageUrl);
    await Recipe.findOrCreate({
      //creo la receta
      where: {
        title,
        image: imageUrl,
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
