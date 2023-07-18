import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../Redux/Actions/actions";
import { useState } from "react";

import styles from "../NavBar/NavBar.module.css";

function NavBar({ handleOriginFilter, handleDietTypeFilter, handleOrderFilter, handleReset }) {
  const [searchString, setSearchString] = useState("");

  const dispatch = useDispatch();

  function handleChange(e) {
    setSearchString(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipesByName(searchString));
    setSearchString("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}> 
        <div className={styles.barContainer}> 
          <input placeholder="Search recipe..." type="text" value={searchString} onChange={handleChange} className={styles.bar}/> 
          <button type="submit">Search</button>
        </div>
        <div >
          <select onChange={handleOriginFilter} className={styles.selects}>
            <option  value="Your Recipes">Your Recipes</option>
            <option value="Web Recipes">Web Recipes</option>
          </select>
          <select onChange={handleDietTypeFilter} className={styles.selects}>
            <option  value="vegetarian">Vegetarian</option>
            <option value="gluten free">Gluten free</option>
            <option value="dairy free">Dairy free</option>
            <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="paleolithic">Paleolithic</option>
            <option value="whole 30">Whole 30</option>
            <option value="primal">Primal</option>
            <option value="pescatarian">Pescatarian</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="fodmap friendly">Fodmap friendly</option>
          </select>
          <select onChange={handleOrderFilter} className={styles.selects}>
            <option value="A-Z">Name : A-Z</option>
            <option value="Z-A">Name : Z-A</option>
            <option value="High">Health Score: high to low</option>
            <option value="Low">Health Score: low to high</option>
          </select>
          <button onClick={handleReset}>Reset filters</button>
        </div>
       
      </form>
    </div>
  );
}

export default NavBar;