import styles from "../Card/Card.module.css";
import { NavLink } from "react-router-dom";

function Card({ recipe }) {
  const { title, image, vegetarian, dietType, id, healthScore } = recipe; //traigo por pros lo que renderizo

const defaultImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5hSBzBFU1TFUtUh7_iF_--B6HXt30saGwLA&usqp=CAU"
 //al no configurar que la imagen sea obligatoria, si image no existe le doy este valor por default
return (
    <div className={styles.cardContainer}>
      <NavLink to={`home/${id}`} className={styles.card}>
        <div className={styles.divCard}>
          <h3>{title}</h3>
          {image ? (<img src={image} alt=""/>):(<img src={defaultImg} alt=""/>)}
          <h4>Health Score: {healthScore}</h4>
          <div className={styles.list}>
            {dietType.map((type) => (
              <li key={type}>{type}</li>
            ))}
            {vegetarian && <li>vegetarian</li>}
          </div>
        </div>
      </NavLink>
    </div>
  );
}

export default Card;

