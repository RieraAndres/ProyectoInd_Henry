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
} from "../Actions/actions";

let initialState = {
  allRecipes: [],
  recipesCopy: [],
  auxState: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        recipesCopy: action.payload,
      };
    case GET_RECIPES_BY_NAME:
      const filteredRecipesByName = state.allRecipes.results.filter((recipe) =>
        recipe.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        recipesCopy: {
          ...state.recipesCopy,
          results: filteredRecipesByName,
        },
      };

    case GET_RECIPE_DETAIL:
      return {
        ...state,
        auxState: action.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        auxState: action.payload,
      };
    case CLEAR_AUX_STATE:
      return {
        ...state,
        auxState: null,
      };
    case POST_RECIPE:
      return {
        ...state,
        allRecipes: action.payload,
        recipesCopy: action.payload,
      };
    case FILTER_BY_DIET_TYPE:
      if (action.payload === "vegetarian") {
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

    case FILTER_BY_ORIGIN:
      let byOrigin;
      if (action.payload === "Your Recipes") {
        byOrigin = state.allRecipes.results.filter(
          (recipe) => recipe.id > 2000000
        );
      } else if (action.payload === "Web Recipes") {
        byOrigin = state.allRecipes.results.filter(
          (recipe) => recipe.id < 2000000
        );
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
      }
      if (action.payload === "Z-A") {
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
      }
      if (action.payload === "High") {
        order = [...state.recipesCopy.results].sort(
          (a, b) => b.healthScore - a.healthScore
        );
      }
      if (action.payload === "Low") {
        order = [...state.recipesCopy.results].sort(
          (a, b) => a.healthScore - b.healthScore
        );
      }

      return {
        ...state,
        recipesCopy: {
          ...state.recipesCopy,
          results: order,
        },
      };

    case RESET_FILTER:
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
