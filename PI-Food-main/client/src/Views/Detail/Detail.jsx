import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getRecipeDetail, clearAux } from "../../Redux/Actions/actions";

import styles from "../Detail/Detail.module.css";
import defaultImg from "../../Utils/Images/default.jpg"

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.auxState);

  useEffect(() => {
    dispatch(getRecipeDetail(id));
    return () => {
      dispatch(clearAux());
    };
  }, [dispatch, id]);

  console.log(recipe);

  if (!recipe || !recipe.title) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      {recipe.image ? (
        <img src={recipe.image} alt={recipe.title} />
      ) : (
        <img src={defaultImg} alt={recipe.title} />
      )}
      <h3>Health Score: {recipe.healthScore}</h3>
      {recipe.vegetarian && <li>Vegetarian</li>}
      {recipe.dietType.map((type) => (
        <li key={type}>{type}</li>
      ))}
      <p>{recipe.resume}</p>
      <h2>Steps:</h2>
      {recipe.steps[0].steps.map((step, index) => (
        <div key={index}>
          <p>
            Step {step.number}: {step.step}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Detail;


