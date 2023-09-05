import { useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getRecipes, filterByOrigin, filterByDietType, orderFilter, resetFilter } from "../../Redux/Actions/actions";
import { NavLink } from "react-router-dom";

import NavBar from "../../Components/NavBar/NavBar";
import Cards from "../../Components/Cards/Cards";
import styles from "../Home/home.module.css"

function Home() {
  const dispatch = useDispatch();
  
  const recipesCopy = useSelector((state) => state.recipesCopy); //traigo las recetas
  
  /* PAGINADO */

  const [activePage, setActivePage] = useState(1); // para cambiar estilo del boton de pagina actual
  const [currentPage, setCurrentPage] = useState(1); //pagina actual
  const cardsPerPage = 9; //cartas por pagina
  
  const indexOfLastCard = currentPage * cardsPerPage; //calcula el indice inical y final de las cartas a renderizar
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = { results: recipesCopy.results?.slice(indexOfFirstCard, indexOfLastCard) };//saca "seccion" de recipes copy con 9 recetas
  
  const pageNumbers = Math.ceil(recipesCopy.results?.length / cardsPerPage);//calcula la cantidad de paginas 
  const pagesArray = Array.from({ length: pageNumbers }, (_, index) => index + 1); //arreglo de numeros
  const hasNextPage = currentPage < pageNumbers; //booleano para renderizar next o prev
  const hasPrevPage = currentPage > 1;

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
    setActivePage(pageNumber);
  }

  useEffect(() => { //al cargar la pagina home traigo las recetas 
      dispatch(getRecipes());
  }, [dispatch]);

  function handleDietTypeFilter(e) { //filtros de dietTypes
    e.preventDefault();
    dispatch(filterByDietType(e.target.value)); 
  }

  function handleOriginFilter(e) {  //filtros del origen de la receta
    dispatch(filterByOrigin(e.target.value));
  }

  function handleOrderFilter(e) { //filtro de ordenamiento
    e.preventDefault();
    dispatch(orderFilter(e.target.value));
  }

  function handleReset(e) { //funcion reseteadora de filtros
    e.preventDefault();
    dispatch(resetFilter());
  }



  return (
    <div className={styles.homeview}>
      <div className={styles.header}>
        <NavLink to={'/about'}><button className={styles.buttonStart}>About</button></NavLink>
        <h1>HENRY FOODS</h1>
        <NavLink to={'/create'}><button className={styles.buttonStart}>Create a recipe</button></NavLink>
      </div>
      <div className={styles.home}>
        <NavBar 
          handleDietTypeFilter={handleDietTypeFilter}
          handleOriginFilter={handleOriginFilter}
          handleOrderFilter={handleOrderFilter}
          handleReset={handleReset}
          setCurrentPage={setCurrentPage}
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
