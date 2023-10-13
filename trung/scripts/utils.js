export let infoUserData = {
    "fullName": "",
    "email": "",
    "userName": "",
    "password": "",
};

export let infoLoginData = {
    "emailLogin": "",
    "passLogin": "",
    "isRemember": false,
    "isLogin": false
}

export function enableErrorMessage(field, error, messageError) {
    field.classList.add("err");
    error.innerHTML = messageError;
}

export function disableErrorMessage(field, idError) {
    field.classList.remove("err");
    idError.innerHTML = "";
}

export function redirectPage(linkPage) {
    window.location.replace(linkPage);
}

