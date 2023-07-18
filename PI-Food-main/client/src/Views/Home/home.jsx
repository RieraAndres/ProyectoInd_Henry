import { useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getRecipes, filterByOrigin, filterByDietType, orderFilter, resetFilter } from "../../Redux/Actions/actions";
import { NavLink } from "react-router-dom";

import NavBar from "../../Components/NavBar/NavBar";
import Cards from "../../Components/Cards/Cards";
import styles from "../Home/home.module.css"

function Home() {
  const dispatch = useDispatch();
  const recipesCopy = useSelector((state) => state.recipesCopy);

  const [activePage, setActivePage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = { results: recipesCopy.results?.slice(indexOfFirstCard, indexOfLastCard) };

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
    setActivePage(pageNumber);
  }

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  function handleDietTypeFilter(e) {
    e.preventDefault();
    dispatch(filterByDietType(e.target.value)); 
  }

  function handleOriginFilter(e) {
    dispatch(filterByOrigin(e.target.value));
  }

  function handleOrderFilter(e) {
    e.preventDefault();
    dispatch(orderFilter(e.target.value));
  }

  function handleReset(e) {
    e.preventDefault();
    dispatch(resetFilter());
  }

  const pageNumbers = Math.ceil(recipesCopy.results?.length / cardsPerPage);
  const pagesArray = Array.from({ length: pageNumbers }, (_, index) => index + 1);
  const hasNextPage = currentPage < pageNumbers;
  const hasPrevPage = currentPage > 1;


  return (
    <div className={styles.homeview}>
      <div className={styles.header}>
        <h1>HENRY FOODS</h1>
        <NavLink to={'/create'}><button className={styles.buttonStart}>Create a recipe</button></NavLink>
      </div>
      <div className={styles.home}>
        <NavBar 
          handleDietTypeFilter={handleDietTypeFilter}
          handleOriginFilter={handleOriginFilter}
          handleOrderFilter={handleOrderFilter}
          handleReset={handleReset}
        />
        <Cards recipesCopy={currentCards} />
        <div className={styles.pagination}>
          {hasPrevPage && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className={styles.pageButton}
            >
              Prev
            </button>
          )}
          {pagesArray.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={activePage === number ? styles.activePageButton : styles.pageButton}
            >
              {number}
            </button>
          ))}
          {hasNextPage && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className={styles.pageButton}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
