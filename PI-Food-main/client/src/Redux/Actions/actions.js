import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL";
export const CLEAR_AUX_STATE = "CLEAR_AUX_STATE";
export const GET_DIETS = "GET_DIETS";

export function getRecipes() {
  return async function (dispatch) {
    const response = await axios("http://localhost:3001/food/recipe");
    return dispatch({
      type: "GET_RECIPES",
      payload: response.data,
    });
  };
}

export function getRecipesByName(name) {
  return async function (dispatch) {
    const response = await axios(
      `http://localhost:3001/food/recipe?name=${name}`
    );
    return dispatch({
      type: "GET_RECIPES_BY_NAME",
      payload: response.data,
    });
  };
}

export function getRecipeDetail(id) {
  return async function (dispatch) {
    const response = await axios(`http://localhost:3001/food/recipe/${id}`);
    return dispatch({
      type: "GET_RECIPE_DETAIL",
      payload: response.data,
    });
  };
}

export function clearAux() {
  return {
    type: "CLEAR_AUX_STATE",
  };
}

export function getDiets() {
  return async function (dispatch) {
    const response = await axios("http://localhost:3001/food/diets");
    return dispatch({
      type: "GET_DIETS",
      payload: response.data,
    });
  };
}
