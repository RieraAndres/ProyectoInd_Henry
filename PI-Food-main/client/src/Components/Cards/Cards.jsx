import Card from "../Card/Card";
import styles from "../Cards/Cards.module.css";

function Cards({ recipesCopy }) {
  return (
    <div className={styles.divCards}>
      {recipesCopy.results && recipesCopy.results.length > 0 ? (//si en recipes copy ya estan cargadas las recetas renderizo
        recipesCopy.results.map((recipe) => <Card recipe={recipe} />)
      ) : (//si no hay recetas para renderizar invito al usuario a crear una
        <div className={styles.noRecipesMessage}>
          <div className={styles.loader3}>
            <div className={styles.circle1}></div>
            <div className={styles.circle1}></div>
            <div className={styles.circle1}></div>
            <div className={styles.circle1}></div>
            <div className={styles.circle1}></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cards;
