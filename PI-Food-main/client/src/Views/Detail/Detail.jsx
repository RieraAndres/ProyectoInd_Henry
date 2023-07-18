import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { getRecipeDetail, clearAux } from "../../Redux/Actions/actions";

import styles from "../Detail/Detail.module.css";
import defaultImg from "../../Utils/Images/default.jpg";

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

  if (!recipe || !recipe.title) {
    return <p>Loading...</p>;
  }

  const createMarkup = () => {
    return { __html: recipe.resume };
  };

  return (
    <div>
      <div className={styles.detail}>
        <NavLink to={"/home"}>
          <button className={styles.buttonStart}>BACK HOME</button>
        </NavLink>
        <h1>{recipe.title}</h1>
        {recipe.image ? (
          <img src={recipe.image} alt={recipe.title} />
        ) : (
          <img src={defaultImg} alt={recipe.title} />
        )}
        <p>Id: {id}</p>
        <h3>Health Score: {recipe.healthScore}</h3>
        <div className={styles.dietType}>
          <ul className={styles.dietList}>
            {recipe.vegetarian && <li>Vegetarian</li>}
            {recipe.dietType.map((type) => (
              <li key={type}>{type}</li>
            ))}
          </ul>
        </div>
        <div
          dangerouslySetInnerHTML={createMarkup()}
          className={styles.resume}
        />
        <h2>Steps:</h2>
        {recipe.steps[0] && recipe.steps[0].steps ? (
          recipe.steps[0].steps.map((step, index) => (
            <div key={index} className={styles.steps}>
              <p>
                Step {step.number}: {step.step}
              </p>
            </div>
          ))
        ) : (
          <p>No steps available.</p>
        )}
      </div>
    </div>
  );
}

export default Detail;
