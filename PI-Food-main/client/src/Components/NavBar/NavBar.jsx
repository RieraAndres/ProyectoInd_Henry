import styles from "../NavBar/NavBar.module.css"

function NavBar({ handleChange, handleSubmit }) {

  return (
    <div>
      <form onClick={handleSubmit}>
        <input placeholder="Busca tu receta" type="text" onChange={handleChange} />
        <button type="submit" >Search</button>
      </form>
    </div>
  );
}

export default NavBar;