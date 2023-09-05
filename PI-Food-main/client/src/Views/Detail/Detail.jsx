import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useHistory, NavLink } from "react-router-dom";
import { getRecipeDetail, clearAux, deleteRecipe } from "../../Redux/Actions/actions";



import styles from "../Detail/Detail.module.css";
import defaultImg from "../../Utils/Images/default.jpg";

function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.auxState);
  
  const [showConfirm , setShowConfirm] = useState(false) //estado local que me ayudara a renderizar la confirmacion de eliminar receta

  const history = useHistory(); 

  useEffect(() => {
    dispatch(getRecipeDetail(id));//al montar traigo la info de la receta en auxState
    return () => {
      dispatch(clearAux());//al desmontar limpio el estado
    };
  }, [dispatch, id]);

  
  const createMarkup = () => {
    return { __html:  recipe.resume} };//resume en la api venia como html, con esto puedo renderizarlo
    
    
    const handleConfirm = (e) => { //autentificacion en dos pasos para borrar receta y luego llevar home
      e.preventDefault()
      dispatch(deleteRecipe(id))
      setShowConfirm(false)
      history.push("/home"); 
      
    }
    const handleCancel = (e)=>{//al cancelar eliminar seteo en false ShowConfirm
      e.preventDefault()
      setShowConfirm(false)
    }
    const handleDelete = (e) =>{
      e.preventDefault()
      setShowConfirm(true) 
      
    }


    if (!recipe || !recipe.title) {//por si hay alguna demora en la informacion
      return(
      <div className={styles.loader3}>
              <div className={styles.circle1}></div>
              <div className={styles.circle1}></div>
              <div className={styles.circle1}></div>
              <div className={styles.circle1}></div>
              <div className={styles.circle1}></div>
          </div>
          )
    }

  if(showConfirm){//si se setea en true Show confirm renderizp
    return(
     < div className={styles.warning}>
        <p>Are you sure you want to delete this recipe?</p>
        <NavLink to={"/home"}><button onClick={handleConfirm}>Yes</button></NavLink>
        <button onClick={handleCancel}>No</button>
      </div>
    )}
  

  return (
    <div>
        <div className={styles.header}>
          <NavLink to={"/home"} className={styles.homeButton}>
           <button className={styles.buttonStart}>BACK HOME</button>
          </NavLink>
          {id > 2000000  && (<button onClick={handleDelete} className={styles.buttonStart}>DELETE RECIPE</button>)}
        </div>
        
      <div className={styles.detail}>
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
        <h3>Resume:</h3>
        <div
          dangerouslySetInnerHTML={createMarkup()}
          className={styles.resume}
        />
        <h3>Steps:</h3>
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
