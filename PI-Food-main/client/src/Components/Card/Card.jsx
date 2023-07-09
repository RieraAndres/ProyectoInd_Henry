import styles from "../Card/Card.module.css"
import {Link} from 'react-router-dom';


function Card({recipe}){
    const {title,image,vegetarian,dietType,id} = recipe

    return (
            <Link to={`home/${id}`}>
        <div className={styles.divCard}>
            <h2>{title}</h2>
            <img src={image} alt=""/>
            <h3>Diet Types</h3>
            {dietType.map((type)=>
            <li>{type}</li>)}
            {vegetarian && <li>vegetarian</li>}
        </div>
            </Link>
    )
}
export default Card;