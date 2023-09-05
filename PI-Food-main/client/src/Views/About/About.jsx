import styles from './About.module.css'
import { NavLink } from 'react-router-dom';
function About() {
    return (
      <div className={styles.about}>
        <NavLink to={'/home'}  ><button className={styles.buttonStart}>Home</button></NavLink>
        <p >
            ¡Hola! Soy Andres Riera, y me complace darte la bienvenida a mi página de Foods!. Permíteme contarte un poco sobre mí:
            Soy un estudiante de desarrolo Full Stack con muchas ganas de aprender.
            Durante los últimos meses he estado trabajando duro  y he adquirido un profundo 
            conocimiento en numerosos temas relacionados con el desarrollo web . Mi objetivo es poder llegar lejos en esta profesion y dusfrutar
            cada paso. Espero que te guste la pagina!!
        </p>
      </div>
    );
  }
  
  export default About;