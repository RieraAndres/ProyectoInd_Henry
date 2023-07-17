import {  useState } from "react";
import { createRecipe } from "../../Redux/Actions/actions";
import { useDispatch } from "react-redux";

import styles from "../Form/Form.module.css";

import { validate } from "./formValidator";

function Form({diets , recipes}) {
  const dispatch = useDispatch();
  

  const [error, setError] = useState({ //Estado con errores para validar inputs
    title: "Title is required",
    resume: "Resume is required",
    healthScore: "Health Score is required",
    steps: "At least one step is required",
   
  });

  


  const [input, setInput] = useState({ //estado con los inputs que luego seran despachados para crear la receta
    title: "",
    image: "",
    vegetarian: false,
    vegan: false,
    dietType: [],
    resume: "",
    healthScore: 0,
    steps: [
      {
        name: "",
        steps: [
          {
            number: 1,
            step: ""
          }
        ]
      }
    ]
  });
  console.log(input);

  const validateForm = () => {  //funcion validadora de inputs importada de formValidator
    const errors = validate(input);
    setError(errors);
  };

 const handleChange = (e) => { //manejador de cambios en las checkBoxes
  if (e.target.name === "dietTypes") { 
    const { value, checked } = e.target;
    if (value === "vegetarian") { //vegetarian es aparte de dietTypes por lo que la seteo en true si la selecciono
      setInput((prevInput) => ({
        ...prevInput,
        vegetarian: checked
      }));
    } else {  //voy agregando al array dietType los valores de la checkbox seleccionada
      if (checked) {
        setInput((prevInput) => ({
          ...prevInput,
          dietType: [...prevInput.dietType, value]
        }));
      } else {
        setInput((prevInput) => ({ //esto soluciona bug de que no se repitan dietTypes en el array
          ...prevInput,
          dietType: prevInput.dietType.filter((type) => type !== value)
        }));
      }
    }
  } else if (e.target.name === "healthScore") { //seteo healthScore
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: parseInt(e.target.value)
    }));
  } else {
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value
    }));
  }

  validateForm();  //valido el formulario mientras cambia
};

  const handleStepChange = (sectionIndex, stepIndex, value) => { //manejador de los Steps
    const updatedSteps = [...input.steps];
    updatedSteps[sectionIndex].steps[stepIndex] = {
      ...updatedSteps[sectionIndex].steps[stepIndex],
      step: value
    };
    setInput({
      ...input,
      steps: updatedSteps
    });
  };

  const addStep = (sectionIndex) => { //agrego un obejto al array steps
    const updatedSteps = [...input.steps];
    updatedSteps[sectionIndex].steps.push({
      step: "",
      number: updatedSteps[sectionIndex].steps.length + 1
    });
    setInput({  //actualizo los pasos
      ...input,
      steps: updatedSteps
    });
  };

  const removeStep = (sectionIndex) => {
    const updatedSteps = [...input.steps];
    updatedSteps[sectionIndex].steps.pop(); // elimino el ultimo paso
    setInput({
      ...input,
      steps: updatedSteps
    });
  };
  console.log(recipes);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Verificar si ya existe una receta con el mismo título en recipesCopy
    const duplicateRecipe = recipes.results.find(
      (recipe) => recipe.title.toLowerCase() === input.title.toLowerCase()
    );
  
    if (duplicateRecipe) {
      window.alert("YOU ALREADY HAVE A RECIPE WITH THAT TITLE");
    } else {
      dispatch(createRecipe(input));
      setInput({
        title: "",
        image: "",
        vegetarian: false,
        vegan: false,
        dietType: [],
        resume: "",
        healthScore: 0,
        steps: [
          {
            name: "",
            steps: [
              {
                number: 1,
                step: ""
              }
            ]
          }
        ]
      });
  
      window.alert("RECIPE CREATED SUCCESSFULLY");
    }
  };

  if(!diets || diets.length === 0){
    return(<div className={styles.loader3}>
    <div className={styles.circle1}></div>
    <div className={styles.circle1}></div>
    <div className={styles.circle1}></div>
    <div className={styles.circle1}></div>
    <div className={styles.circle1}></div>
  </div>
  )
  }

  return (
    <div className={styles.view}>
      <form className={styles.form}>
        <h3>The best recipe of the world is in process</h3>
        <div>
          <label>Title: </label>
          <input
            name="title"
            onChange={handleChange}
            value={input.title}
            className={styles.bar}
          />
          <span>{error.title}</span>
        </div>
        <div>
          <label>Resume: </label>
          <textarea
            name="resume"
            onChange={handleChange}
            value={input.resume}
            className={styles.textarea}
          />
          <span>{error.resume}</span>
        </div>
        <div>
          <label>Health Score: </label>
          <input
            name="healthScore"
            onChange={handleChange}
            value={input.healthScore.toString()}
            className={styles.bar}
          />
          <span>{error.healthScore}</span>
        </div>
        <div className={styles.steps}>
          <label>Step By Step: </label>
          <span>{error.steps}</span>
          <div>
            {input.steps[input.steps.length - 1].steps.map((step, stepIndex) => (
              <div key={stepIndex}>
                <div>
                  <label>Step {step.number}: </label>
                  <textarea
                    name={`step-${input.steps.length - 1}-${stepIndex}`}
                    value={step.step}
                    onChange={(e) =>
                      handleStepChange(input.steps.length - 1, stepIndex, e.target.value)
                    }
                    className={styles.textarea}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.buttonContainer}>
            <button type="button" onClick={() => removeStep(input.steps.length - 1)}>
              Remove Step
            </button>
            <button type="button" onClick={() => addStep(input.steps.length - 1)}>
              Add Step
            </button>
          </div>
        </div>
        <div>
          <label>Image URL: </label>
          <input
            type="text"
            name="image"
            onChange={handleChange}
            value={input.image}
            className={styles.bar}
          />
          <span>{error.image}</span>

        </div>
        <div>
          <label>Select diet types: </label>
          <div className={styles.checkBoxes}>
            {diets.map((type) => (
              <div key={type.id}>
                <input
                  type="checkbox"
                  value={type.name}
                  name="dietTypes"
                  checked={input[type.dietType]}
                  onChange={handleChange}
                />
                <label>{type.name}</label>
              </div>
            ))}
          </div>
        </div>
        {!error.title && !error.resume && !error.healthScore && !error.steps && !error.image && (
          <button type="submit" onClick={handleSubmit}>
            Create
          </button>
        )}
      </form>
    </div>
  );
}

export default Form;

