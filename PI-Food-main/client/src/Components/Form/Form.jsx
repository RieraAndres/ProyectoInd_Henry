import { useState } from "react";
import { createRecipe } from "../../Redux/Actions/actions";
import { useDispatch } from "react-redux";
import { validate } from "./formValidator";

import styles from "../Form/Form.module.css";

function Form({ diets, recipes }) {
  const dispatch = useDispatch();

  const [error, setError] = useState({ //seteo de arranque estos errores para informar al usuario
    title: "Title is required",
    resume: "Resume is required",
    healthScore: "Health Score is required",
    steps: "At least one step is required",
    image: "Must be a image URL or empty"
  });

  const [input, setInput] = useState({ //forma de la informacion que ire almacenando para luego despachar
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
            step: "",
          },
        ],
      },
    ],
  });

  const validateForm = () => { //funcion validadora
    const errors = validate(input);
    setError(errors);
  };

  const handleChangeDietTypes = (e) => { // manejador de las checkBoxes de tipos de dietas
    const { value, checked } = e.target;

    setInput((prevInput) => ({
      ...prevInput,
      dietType: checked
        ? [...prevInput.dietType, value]
        : prevInput.dietType.filter((type) => type !== value),
    }));

    validateForm();
  };

  const handleChangeHealthScore = (e) => { //manejador de  los cambios en el input HealthScore
    setInput((prevInput) => ({
      ...prevInput,
      healthScore: parseInt(e.target.value),
    }));

    validateForm();
  };

  const handleChangeImageTitleResume = (e) => { //manejador de cambios en el titulo, resumen e imagen
    setInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));

    validateForm();
  };

  const handleStepChange = (sectionIndex, stepIndex, value) => { //manejador de cambios en los pasos
    const updatedSteps = [...input.steps];
    updatedSteps[sectionIndex].steps[stepIndex] = {
      ...updatedSteps[sectionIndex].steps[stepIndex],
      step: value,
    };
    setInput({
      ...input,
      steps: updatedSteps,
    });
  };

  const addStep = (sectionIndex) => { //manejador de cambios al agregar un paso
    const updatedSteps = [...input.steps];
    updatedSteps[sectionIndex].steps.push({
      step: "",
      number: updatedSteps[sectionIndex].steps.length + 1,
    });
    setInput({
      ...input,
      steps: updatedSteps,
    });
  };

  const removeStep = (sectionIndex) => { //manejador de cambios al eliminar un paso
    const updatedSteps = [...input.steps];
    updatedSteps[sectionIndex].steps.pop();
    setInput({
      ...input,
      steps: updatedSteps,
    });
  };

  const handleSubmit = (e) => { //manejador al hacer click en create
    e.preventDefault(); 

    const duplicateRecipe = recipes.results.find( //verifico si ya hay alguna reeceta con el mismo titulo
      (recipe) => recipe.title.toLowerCase() === input.title.toLowerCase()
    );

    if (duplicateRecipe) {
      window.alert("YOU ALREADY HAVE A RECIPE WITH THAT TITLE");//si existe dublicado no dejo crear y aviso al user
    } else {
      dispatch(createRecipe(input));//si no existe despacho y limpio el formulario
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
                step: "",
              },
            ],
          },
        ],
      });
      window.alert("RECIPE CREATED SUCCESSFULLY");
    }


  };

  if (!diets || diets.length === 0) { //para esperar que carguen las diets y luego renderizar el form
    return (
      <div className={styles.loader3}>
        <div className={styles.circle1}></div>
        <div className={styles.circle1}></div>
        <div className={styles.circle1}></div>
        <div className={styles.circle1}></div>
        <div className={styles.circle1}></div>
      </div>
    );
  }

  return (
    <div className={styles.view}>
      <form className={styles.form}>
        <h3>The best recipe of the world is in process</h3>
        <div>
          <label>Title: </label>
          <input
            name="title"
            onChange={handleChangeImageTitleResume}
            value={input.title}
            className={styles.bar}
          />
          <span>{error.title}</span>
        </div>
        <div>
          <label>Resume: </label>
          <textarea
            name="resume"
            onChange={handleChangeImageTitleResume}
            value={input.resume}
            className={styles.textarea}
          />
          <span>{error.resume}</span>
        </div>
        <div>
          <label>Health Score: </label>
          <input
            name="healthScore"
            type="number"
            min="0"
            onChange={handleChangeHealthScore}
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
            onChange={handleChangeImageTitleResume}
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
                  checked={input.dietType.includes(type.name)}
                  onChange={handleChangeDietTypes}
                />
                <label>{type.name}</label>
              </div>
            ))}
          </div>
        </div>
        {!error.title && !error.resume && !error.healthScore && !error.steps &&!error.image && (//si existen errores no renderizo boton
          <button type="submit" onClick={handleSubmit}>
            Create
          </button>
        )}
      </form>
    </div>
  );
}

export default Form;
