import { useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getRecipes, getRecipesByName } from "../../Redux/Actions/actions";

import NavBar from "../../Components/NavBar/NavBar";
import Cards from "../../Components/Cards/Cards";
import styles from "../Home/home.module.css"



function Home(){
    const dispatch = useDispatch()
    const allRecipes = useSelector((state)=>state.allRecipes)
    const [searchString , setSearchString]=useState("")
    
    useEffect(()=>{
        dispatch(getRecipes())
       // return (()=>{
         //   clearDetail() // hacerlo despues y aplicar logica
                          //es para limpiar el estado
        //})
    },[dispatch])
    
    function handleChange (e){
        e.preventDefault()
        setSearchString(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getRecipesByName(searchString))
    }

    


    return (
        <div className="home">
            <p>Estas en Home</p>
            <NavBar handleChange={handleChange} handleSubmit={handleSubmit}/>
            <Cards allRecipes = {allRecipes}/>
        </div>
    )
}
export default Home;