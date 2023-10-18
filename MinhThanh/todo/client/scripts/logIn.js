const emailOrUsername = document.getElementById("emailOrUsername");
const password = document.getElementById("password");
const rememberCheckBox = document.getElementById("remember");
const body = document.getElementsByTagName("body");
const USERNAME_REGEX = /^(\w{2,10})$/;
const PASSWORDS_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const loginButton = document.getElementById("login-button");

(function () {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser) {
    window.location.href = "index.html";
  }
})();

window.onload = function () {
  const remember = JSON.parse(localStorage.getItem("remember"));

  if (remember) {
    if (remember.isRemember) {
      emailOrUsername.value = remember.value.emailOrUsername;
      password.value = remember.value.password;
      rememberCheckBox.checked = true;
    }
  }
};

loginButton.addEventListener("click", (event) => {
  event.preventDefault();
  handleSubmit();
});

function handleSubmit() {
  clearErrorMessage("form-login", "error-message");
  let accounts = JSON.parse(localStorage.getItem("accounts"));

  //Validate Database exists or empty
  if (!accounts) {
    alert("Bạn cần đăng kí trước khi đăng nhập");
    window.location.href = "register.html";
    return;
  }

  const form = validateForm();

  if (form.isValid) {
    const checkDatabase = validateDatabase(form.data, accounts);
    switch (checkDatabase.errCode) {
      case 0:
        alert("Login Success");
        localStorage.setItem(
          "currentUser",
          JSON.stringify(checkDatabase.inforUser)
        );
        window.location.href = "index.html";
        if (rememberCheckBox.checked) {
          localStorage.setItem(
            "remember",
            JSON.stringify({
              isRemember: true,
              value: {
                ...form.data,
              },
            })
          );
        } else {
          localStorage.setItem(
            "remember",
            JSON.stringify({
              isRemember: false,
              value: {},
            })
          );
          clearInput("form-login", "input");
        }
        break;
      case 1:
        setErrorMessage(emailOrUsername, checkDatabase.message);
        break;
      case 2:
        setErrorMessage(password, checkDatabase.message);

        break;

      default:
        break;
    }
  }
}

function validateForm() {
  const isValidEmailOrUsername = validateInput({
    element: emailOrUsername,
    regExp: USERNAME_REGEX,
    errorMessage: "Can't find the email or username",
  });
  const isValidPassword = validateInput({
    element: password,
    regExp: PASSWORDS_REGEX,
    errorMessage: "Password not correct",
  });

  return {
    isValid: isValidEmailOrUsername && isValidPassword,
    data: {
      emailOrUsername: emailOrUsername.value.trim(),
      password: password.value.trim(),
    },
  };
}

function validateInput({
  element,
  regExp = /./,
  errorMessage = "",
  callback = () => true,
  required = true,
}) {
  let isValidCallback = callback();
  let isValidRegExp = validateRegExp(element, regExp, errorMessage);
  let isValidRequired = required ? validateEmpty(element) : true;
  return isValidCallback && isValidRegExp && isValidRequired;
}

function validateEmpty(element) {
  const value = element.value.trim();

  if (!value) {
    setErrorMessage(element, "Required");
    return false;
  }
  return true;
}

function validateRegExp(element, regExp, errorMessage) {
  const value = element.value.trim();
  let isValid = regExp.test(value);
  if (!isValid) {
    setErrorMessage(element, errorMessage);
    return false;
  }
  return true;
}

function validateAlreadyExists(field, key, database) {
  let isValid = true;
  database.forEach((item) => {
    if (item[key] === field.value.trim()) {
      setErrorMessage(field, "Already exists");
      isValid = false;
    }
  });
  return isValid;
}

function validateDatabase(data, database) {
  let result = {
    errCode: 1,
    isValid: false,
    message: "Can't find your username or password",
    inforUser: {
      username: "",
      fullName: "",
      phoneNumber: "",
      email: "",
      projects: [],
    },
  };
  database.forEach((item) => {
    if (
      data.emailOrUsername === item.email ||
      data.emailOrUsername === item.username
    ) {
      if (data.password === item.password) {
        result.errCode = 0;
        result.isValid = true;
        result.message = "Login successful";
        result.inforUser = {
          username: item.username,
          fullName: item.fullName,
          phoneNumber: item.phoneNumber,
          email: item.email,
          password: item.password,
          projects: item.projects || [],
        };
        return;
      } else {
        (result.errCode = 2), (result.isValid = false);
        result.message = "Password not correct";
        return;
      }
    }
  });
  return result;
}

//handle DOM
const clearErrorMessage = (form, className) => {
  document.forms[form]
    .querySelectorAll(`.${className}`)
    .forEach((element) => (element.innerHTML = ""));
};
function clearInput(form, className) {
  document.forms[form]
    .querySelectorAll(`.${className}`)
    .forEach((element) => (element.value = ""));
}

function setErrorMessage(element, message) {
  const errorSpan = element.nextElementSibling;
  errorSpan.innerHTML = message;
}
