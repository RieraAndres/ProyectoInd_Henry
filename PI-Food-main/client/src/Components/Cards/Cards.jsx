import Card from "../Card/Card";
import styles from "../Cards/Cards.module.css";

function Cards({ recipesCopy }) {
  return (
    <div className={styles.divCards}>
      {recipesCopy.results && recipesCopy.results.length > 0 ? (
        recipesCopy.results.map((recipe) => <Card recipe={recipe} />)
      ) : (
        <div className={styles.noRecipesMessage}>
          <h3>Wow it seems that there is no recipe, it's time to create one</h3>
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
