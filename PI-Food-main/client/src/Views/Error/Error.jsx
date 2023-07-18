import { NavLink } from "react-router-dom";

import styles from "./Error.module.css"
import homero from "../../Utils/Images/homero.gif"

function Error(){
   
    
    return (
        <div className={styles.container}>
            <img src={homero} alt="GIF"/>
            <h1>I think you are lost, why don't we go Home?</h1>
            <NavLink to={'/home'}><button className={styles.buttonStart}>Go Home</button></NavLink>
        </div>
    )
}
export default Error;