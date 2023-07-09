import Card from "../Card/Card";
import styles from "../Cards/Cards.module.css"

function Cards({allRecipes}){
    const recipesList = allRecipes
    console.log(recipesList)
    return (
        <div className= {styles.divCards}>
      {recipesList.results?.map((recipe)=>(
        <Card recipe = {recipe}/>))}      
        </div>
    )
}
export default Cards;