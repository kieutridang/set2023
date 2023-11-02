const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const submitButton = document.getElementById("submit-button");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  clearErrorMessage("form-register", "error-message");
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
  const isValidEmail = validateInput({
    element: email,
    regExp: REGEX.email,
    errorMessage: "Please enter correct email syntax",
  });
  const isValidUsername = validateInput({
    element: username,
    regExp: REGEX.username,
    errorMessage: "Enter more than 2 letters and less than 10 letters",
  });
  const isValidPassword = validateInput({
    element: password,
    regExp: REGEX.password,
    errorMessage: "Password is not strong enough",
  });
  const isValidConfirmPassword = validateInput({
    element: confirmPassword,
    callback: () => {
      const value = confirmPassword.value.trim();
      if (value !== password.value.trim()) {
        setErrorMessage(confirmPassword, "Not the same as a password");
        return false;
      }
      return true;
    },
  });
  console.log(
    isValidEmail,
    isValidUsername,
    isValidPassword,
    isValidConfirmPassword
  );
  return {
    isValid:
      isValidEmail &&
      isValidUsername &&
      isValidPassword &&
      isValidConfirmPassword,
    data: {
      email: email.value.trim(),
      username: username.value.trim(),
      password: password.value.trim(),
    },
  };
}
