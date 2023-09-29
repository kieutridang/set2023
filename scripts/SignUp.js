const fullNameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const usernameInput = document.getElementById("username");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");

const signUpButton = document.getElementById("button-register");

const validationRules = [
  {
    input: fullNameInput,
    regex: /^[a-zA-Z\s]+$/, /// chử thường và chữ hoa
    errorMessage: "Full name không hợp lệ !."
  },
  {
    input: emailInput,
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, ///phải có dấu @ và .
    errorMessage: "Email không hợp lệ !."
  },
  {
    input: usernameInput,
    regex: /^[a-zA-Z0-9]+$/,/// chử thừong chử hoa và số 
    errorMessage: "Username không hợp lệ !."
  },
  {
    input: phoneInput,
    regex: /^0\d{8,10}$/, /// bắt đầu bằng số 0 và 8 đén 10 kí tự
    errorMessage: "Phone number không hợp lệ."
  },
  {
    input: passwordInput,
    regex: /(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(.*[a-z]).{8,}/, // số chử kí tự đặc biệt
    errorMessage: "Password không hợp lệ."
  }
];
const validateForm = () => {
  let isValid = true;

  for (const rule of validationRules) {
    const input = rule.input;
    const regex = rule.regex;
    const errorMessage = rule.errorMessage;

    const errorSpan = input.nextElementSibling;

    if (!regex.test(input.value)) {
      errorSpan.textContent = errorMessage;
      isValid = false;
    } else {
      errorSpan.textContent = "";
    }
  }

  return isValid;
};
signUpButton.addEventListener("click", function (event) {
  if (!validateForm()) {
    event.preventDefault();
  } else {
    window.location.href = "../page/login.html";
  }
});