const username = document.getElementById("username");
const password = document.getElementById("password");

const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  clearErrorMessage("form-login", "error-message");
  closeNotifyServer();
  handleSubmit();
});

function handleSubmit() {
  const form = validateForm();
  if (form.isValid) {
    alert("Valid", form.data);
    const response = false;
    if (!response) {
      showNotifyServer("Yah");
    }
  }
}
function validateForm() {
  const isValidUsername = validateInput({
    element: username,
    regExp: REGEX.username,
    errorMessage: "Username is invalid",
  });
  const isValidPassword = validateInput({
    element: password,
    regExp: REGEX.password,
    errorMessage: "Password is invalid",
  });
  return {
    isValid: isValidUsername && isValidPassword,
    data: {
      username: username.value.trim(),
      password: password.value.trim(),
    },
  };
}
