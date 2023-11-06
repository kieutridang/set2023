const REGEX = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  username: /^(\w{2,10})$/,
  password: /^(?=.*?[\w])(?=.*?[0-9]).{8,}$/,
};

function validateRegExp(element, regExp, errorMessage) {
    const value = element.value.trim();
    let isValid = regExp.test(value);
  if (!isValid) {
    setErrorMessage(element, errorMessage);
    return false;
  }
  return true;
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

function validateEmpty(element) {
  const value = element.value.trim();
  if (!value) {
    setErrorMessage(element, "Required");
    return false;
  }
  return true;
}

function showNotifyServer(message) {
  const notify = document.querySelector(".notify");
  notify.style.display = "flex";
  notify.getElementsByClassName("notify__message")[0].innerHTML = message;
}

function closeNotifyServer() {
  const notify = document.querySelector(".notify");
  notify.style.display = "none";
}
