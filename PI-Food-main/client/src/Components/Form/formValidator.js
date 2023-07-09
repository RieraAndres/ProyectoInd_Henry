export function validate(input) {
  const regexTitle = /^[a-zA-Z0-9]+$/;
  const errors = {};

  if (!input.title) {
    errors.title = "Title is required";
  } else if (!regexTitle.test(input.title)) {
    errors.title = "Only numbers and letters are accepted";
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

  return errors;
}
