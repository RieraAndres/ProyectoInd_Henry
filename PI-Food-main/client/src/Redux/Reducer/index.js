import {
  GET_RECIPES,
  GET_RECIPES_BY_NAME,
  GET_RECIPE_DETAIL,
  CLEAR_AUX_STATE,
  GET_DIETS,
} from "../Actions/actions";
let initialState = { allRecipes: [], recipesCopy: [], auxState: [] };

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: action.payload,
        recipesCopy: action.payload,
      };
    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        allRecipes: action.payload,
      };
    case GET_RECIPE_DETAIL:
      return {
        ...state,
        auxState: action.payload,
        recipesCopy: action.payload,
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

    default:
      return state;
  }
}
export default rootReducer;
