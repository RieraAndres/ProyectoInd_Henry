import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const CLEAR_AUX_STATE = "CLEAR_AUX_STATE";
export const GET_DIETS = "GET_DIETS";
export const POST_RECIPE = "POST_RECIPE";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const FILTER_BY_DIET_TYPE = "FILTER_BY_DIET_TYPE";
export const ORDER_FILTER = "ORDER_FILTER";
export const RESET_FILTER = "RESET_FILTER";

export function getRecipes() {
  return async function (dispatch) {
    try {
      const response = await axios("http://localhost:3001/food/recipe");
      return dispatch({
        type: "GET_RECIPES",
        payload: response.data,
      });
    } catch (error) {
      return error.message;
    }
  };
}

export function getRecipesByName(name) {
  return {
    type: "GET_RECIPES_BY_NAME",
    payload: name,
  };
}

export function getRecipeDetail(id) {
  return async function (dispatch) {
    try {
      const response = await axios(`http://localhost:3001/food/recipe/${id}`);
      return dispatch({
        type: "GET_RECIPE_DETAIL",
        payload: response.data,
      });
    } catch (error) {
      return error.message;
    }
  };
}

export function clearAux() {
  return {
    type: "CLEAR_AUX_STATE",
  };
}

export function getDiets() {
  return async function (dispatch) {
    try {
      const response = await axios("http://localhost:3001/food/diets");
      return dispatch({
        type: "GET_DIETS",
        payload: response.data,
      });
    } catch (error) {
      return error.message;
    }
  };
}

export function createRecipe(input) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        "http://localhost:3001/food/recipe",
        input
      );
      return dispatch({
        type: "POST_RECIPE",
        payload: response.data,
      });
    } catch (error) {
      return error.message;
    }
  };
}

export function filterByDietType(dietType) {
  return {
    type: "FILTER_BY_DIET_TYPE",
    payload: dietType,
  };
}

export function filterByOrigin(concept) {
  return {
    type: "FILTER_BY_ORIGIN",
    payload: concept,
  };
}

export function orderFilter(concept) {
  return {
    type: "ORDER_FILTER",
    payload: concept,
  };
}

export function resetFilter() {
  return {
    type: "RESET_FILTER",
  };
}
