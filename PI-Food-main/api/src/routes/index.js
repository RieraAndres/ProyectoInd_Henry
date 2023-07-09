// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const getDiets = require("../controllers/getDiets");
const getRecipeById = require("../controllers/getRecipeById");
const getRecipeByName = require("../controllers/getRecipeByName");
const postRecipe = require("../controllers/postRecipe");

const { Router } = require("express");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/diets", getDiets);
router.get("/recipe/:id", getRecipeById);
router.get("/recipe", getRecipeByName);
router.post("/recipe", postRecipe);

module.exports = router;
