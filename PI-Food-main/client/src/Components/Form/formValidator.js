export function validate(input) {
  const regexTitle = /^[a-zA-Z0-9\s]+$/;
  const urlRegex = /^(ftp|http|https):\/\/[^"]+$/;
  const errors = {};

  if (!input.title) {
    errors.title = "Title is required";
  } else if (!regexTitle.test(input.title)) {
    errors.title = "Only numbers and letters are accepted";
  } else if (input.title.length > 35) {
    errors.title = "Title must have less than 35 letters";
  }

  if (!input.healthScore) {
    errors.healthScore = "HealthScore is required";
  } else if (
    isNaN(input.healthScore) ||
    input.healthScore < 0 ||
    input.healthScore > 100
  ) {
    errors.healthScore = "Only numbers between 0 and 100 are accepted";
  }

  if (!input.resume) {
    errors.resume = "Resume is required";
  }

  if (input.steps[0].steps[0].step === "") {
    errors.steps = "At least one step is required";
  }

  if (input.image && !urlRegex.test(input.image)) {
    errors.image = "Image must be a valid URL";
  }
  return errors;
}
