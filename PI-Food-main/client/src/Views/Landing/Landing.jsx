import { NavLink } from 'react-router-dom';
import styles from "../Landing/Landing.module.css"

function Landing(){
    return (
        
            <div className={styles.landing} >
                <div className={styles.container}>
                    <h1>HENRY FOODS</h1>  
                    <h2>Welcome to the best bank of recipes of the world!</h2>
                    <p>Are you ready to enjoy all the recipes you can imagine? Here you can find the recipe you
                        where looking for! You can find them by  Diet Type, Health Score , Name and much more!! 
                    </p>
                    <NavLink to={'/home'}><button className={styles.buttonStart}>LET'S START</button></NavLink>
                </div>
            </div>
            )}
export default Landing;