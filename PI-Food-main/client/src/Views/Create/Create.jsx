import styles from "../Create/Create.module.css"
import Form from "../../Components/Form/Form";
import { useDispatch, useSelector } from "react-redux";
import { clearAux, getDiets } from "../../Redux/Actions/actions";

import { useEffect } from "react";

import { NavLink } from "react-router-dom";

function Create(){
    const dispatch = useDispatch();

    const diets = useSelector((state) => state.auxState);
    const recipes = useSelector((state)=> state.recipesCopy)

    useEffect(() => { //al cargar el create traigo los tipos de dietas para luego renderizar las checkboxes
        dispatch(getDiets());
        return () => {
          dispatch(clearAux()); //al desmontar create limpio el auxState
        };
      }, [dispatch]);
    
    return (
        <div className={styles.view}>
            <div className={styles.header}>
            <h1>CREATIVE MODE</h1>
            <NavLink to={'/home'}><button className={styles.buttonStart}>Back Home</button></NavLink>
            </div>
            <div className={styles.create}>
            <h3>Here you can create your own recipe</h3>
            <Form diets={diets} recipes={recipes}></Form>
            </div>
        </div>
    )
}
export default Create;