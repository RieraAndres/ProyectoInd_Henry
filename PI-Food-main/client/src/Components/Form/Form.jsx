import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAux, getDiets } from "../../Redux/Actions/actions";

import { validate } from "./formValidator";

function Form() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.auxState);

  useEffect(() => {
    dispatch(getDiets());
    return () => {
      dispatch(clearAux());
    };
  }, [dispatch]);

  const [input, setInput] = useState({
    title: "",
    image: null,
    vegetarian: false,
    vegan: false,
    dietType: [],
    resume: "",
    healthScore: "",
    steps: [],
  });
  console.log(input.steps)

  const [error, setError] = useState({
    title:" "
  });

  const validateForm = () => {
    const errors = validate(input);
    setError(errors);
  };

  const handleChange = (e) => {
    if (e.target.name === "dietTypes") {
      const { value, checked } = e.target;
      if (value === "vegetarian") {
        setInput((prevInput) => ({
          ...prevInput,
          vegetarian: checked,
        }));
      } else {
        setInput((prevInput) => ({
          ...prevInput,
          dietType: [...prevInput.dietType,value],
        }));
      }
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        [e.target.name]: e.target.value,
      }));
    }
  
    validateForm();
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...input.steps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      [field]: value,
    };
    setInput({
      ...input,
      steps: updatedSteps,
    });
  };

  const addStep = () => {
    setInput({
      ...input,
      steps: [
        ...input.steps,
        {
          number: input.steps.length + 1,
          step: "",
        },
      ],
    });
  };

  const removeStep = (index) => {
    const updatedSteps = input.steps.filter((_, i) => i !== index);
    setInput({
      ...input,
      steps: updatedSteps,
    });
  };

  return (
    <div>
      <form>
        <div>
          <label>Title</label>
          <input name="title" onChange={handleChange} value={input.title} />
          <span>{error.title}</span>
        </div>
        <div>
          <label>Resume</label>
          <input name="resume" onChange={handleChange} value={input.resume} />
          <span>{error.resume}</span>
        </div>
        <div>
          <label>Health Score</label>
          <input
            name="healthScore"
            onChange={handleChange}
            value={input.healthScore}
          />
          <span>{error.healthScore}</span>
        </div>
        <div>
          <label>Step By Step</label>
          {input.steps.map((step, index) => (
            <div key={index}>
              <div>
                <label>Step {step.number}</label>
                <input
                  name={`step-${index}`}
                  value={step.step}
                  onChange={(e) =>
                    handleStepChange(index, "step", e.target.value)
                  }
                />
              </div>
              <button type="button" onClick={() => removeStep(index)}>
                Remove Step
              </button>
            </div>
          ))}
          <button type="button" onClick={addStep}>
            Add Step
          </button>
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            value={input.image}
          />
        </div>
        <div>
          <label>Diet Types</label>
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
        {!error.title && !error.resume && !error.healthScore  && input.steps.length > 1 && <button type="submit">Create</button>}
      </form>
    </div>
  );
}

export default Form;