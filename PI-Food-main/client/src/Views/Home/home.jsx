import { useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getRecipes,filterByOrigin,filterByDietType, orderFilter, resetFilter} from "../../Redux/Actions/actions";
import { NavLink } from "react-router-dom";


import NavBar from "../../Components/NavBar/NavBar";
import Cards from "../../Components/Cards/Cards";
import styles from "../Home/home.module.css"



function Home(){
    const dispatch = useDispatch()
    const recipesCopy = useSelector((state)=>state.recipesCopy)
    console.log(recipesCopy);
   
    const [activePage, setActivePage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 9;

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = {results : recipesCopy.results?.slice(indexOfFirstCard, indexOfLastCard)};

     console.log(currentCards);
    
     function paginate(pageNumber) {
      setCurrentPage(pageNumber);
      setActivePage(pageNumber);
    }

      const pageNumbers = Math.ceil(recipesCopy.results?.length / cardsPerPage);
      const pagesArray = Array.from({ length: pageNumbers }, (_, index) => index + 1);
    
    
    useEffect(() => {
        dispatch(getRecipes());
      }, [dispatch]);
    
    function handleDietTypeFilter(e) {
        e.preventDefault();
        dispatch(filterByDietType(e.target.value)); 
      }

    function handleOriginFilter(e){
        e.preventDefault();
        dispatch(filterByOrigin(e.target.value))
    }
    
    function handleOrderFilter(e){
        e.preventDefault();
        dispatch(orderFilter(e.target.value))

    }

    function handleReset(e){
        e.preventDefault();
        dispatch(resetFilter())
    }

    return (
        <div className={styles.homeview}>
            <div className={styles.header}>
            <h1>HENRY FOODS</h1>
            <NavLink to={'/create'}><button className={styles.buttonStart}>Create a recipe</button></NavLink>
            </div>
          <div className={styles.home}>
            <NavBar 
              handleDietTypeFilter={handleDietTypeFilter}
              handleOriginfilter={handleOriginFilter}
              handleOrderFilter = {handleOrderFilter}
              handleReset={handleReset}
            />
            <Cards recipesCopy={currentCards} />
            <div className={styles.pagination}>
            {pagesArray && pagesArray.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={activePage === number ? styles.activePageButton : ""}
              >
                {number}
              </button>
            ))}
            </div>
          </div>
            
        </div>
    )
}
export default Home;