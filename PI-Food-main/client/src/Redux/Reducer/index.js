import {
  GET_RECIPES,
  GET_RECIPES_BY_NAME,
  GET_RECIPE_DETAIL,
  CLEAR_AUX_STATE,
  GET_DIETS,
  POST_RECIPE,
  FILTER_BY_DIET_TYPE,
  FILTER_BY_ORIGIN,
  ORDER_FILTER,
  RESET_FILTER,
  DELETE_RECIPE,
} from "../Actions/actions";

let initialState = {
  //estado global
  allRecipes: [], //original de recetas
  recipesCopy: [], //modifico este en los filtros
  auxState: [], //aqui voy a cargar la receta individual para el detail
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        //cargo con recetas los estados
        ...state,
        allRecipes: action.payload,
        recipesCopy: action.payload,
      };
    case GET_RECIPES_BY_NAME: //en action.payload viene el nombre que puse en input, filtro las que contengan y devuelvo
      const filteredRecipesByName = state.allRecipes.results.filter((recipe) =>
        recipe.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        recipesCopy: {
          ...state.recipesCopy, //modifico solo recipesCopy.results
          results: filteredRecipesByName,
        },
      };
    case DELETE_RECIPE:
      return {
        //al eliminar modifico ambas para sacar de las dos la receta
        ...state,
        allRecipes: state.allRecipes,
        recipesCopy: state.recipesCopy,
      };

    case GET_RECIPE_DETAIL: //cargo el auxState con la info del detail
      return {
        ...state,
        auxState: action.payload,
      };
    case GET_DIETS:
      return {
        //cargo auxState con los tipos de dietas
        ...state,
        auxState: action.payload,
      };
    case CLEAR_AUX_STATE: //limpio auxState al hacer unmount de un componente
      return {
        ...state,
        auxState: null,
      };
    case POST_RECIPE: //posteo receta
      return {
        ...state,
        allRecipes: action.payload,
        recipesCopy: action.payload,
      };
    case FILTER_BY_DIET_TYPE:
      if (action.payload === "avoid") {
        //esto es para que la primera opcion diga para que sirve la barra
        return {
          ...state,
          recipesCopy: { ...state.allRecipes },
          allRecipes: { ...state.allRecipes },
        };
      } else if (action.payload === "vegetarian") {
        //filtro y me quedo con las que incuyen vegetarian = true
        const filteredRecipesByDietType = state.allRecipes.results.filter(
          (diet) => diet.vegetarian === true
        );
        return {
          ...state,
          recipesCopy: {
            ...state.recipesCopy,
            results: filteredRecipesByDietType,
          },
        };
      } else {
        //filtro y me quedo con las que en el array dietTypes incluyen el payload
        const filteredRecipesByDietType = state.allRecipes.results.filter(
          (diet) => diet.dietType.includes(action.payload)
        );
        return {
          ...state,
          recipesCopy: {
            ...state.recipesCopy,
            results: filteredRecipesByDietType,
          },
        };
      }

    case FILTER_BY_ORIGIN: //si la receta viene de la db el id sera mayor a 2.000.000, asi puedo filtrarlas
      let byOrigin;
      if (action.payload === "Your Recipes") {
        byOrigin = state.allRecipes.results.filter(
          (recipe) => recipe.id > 2000000
        );
      } else if (action.payload === "Web Recipes") {
        byOrigin = state.allRecipes.results.filter(
          (recipe) => recipe.id < 2000000
        );
      } else {
        return {
          ...state,
          recipesCopy: { ...state.allRecipes },
          allRecipes: { ...state.allRecipes },
        };
      }
      return {
        ...state,
        recipesCopy: {
          ...state.recipesCopy,
          results: byOrigin,
        },
      };

    case ORDER_FILTER:
      let order;
      if (action.payload === "A-Z") {
        //hago metodo sort para ordenar alfabeticamente
        order = [...state.recipesCopy.results].sort((a, b) => {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        });
      } else if (action.payload === "Z-A") {
        order = [...state.recipesCopy.results].sort((a, b) => {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();
          if (titleA < titleB) {
            return 1;
          }
          if (titleA > titleB) {
            return -1;
          }
          return 0;
        });
      } else if (action.payload === "High") {
        //ordeno por healthScore
        order = [...state.recipesCopy.results].sort(
          (a, b) => b.healthScore - a.healthScore
        );
      } else if (action.payload === "Low") {
        order = [...state.recipesCopy.results].sort(
          (a, b) => a.healthScore - b.healthScore
        );
      } else {
        return {
          ...state,
          recipesCopy: { ...state.allRecipes },
          allRecipes: { ...state.allRecipes },
        };
      }

      return {
        ...state,
        recipesCopy: {
          ...state.recipesCopy,
          results: order,
        },
      };

    case RESET_FILTER: //al hacer reset modifico recipesCopy con la que nunca modifique que es allRecipes
      return {
        ...state,
        recipesCopy: { ...state.allRecipes },
        allRecipes: { ...state.allRecipes },
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
