import {infoUserData, infoLoginData} from "./utils.js"
import {enableErrorMessage, disableErrorMessage, redirectPage} from "./utils.js"

const pwShowHide = document.querySelectorAll(".showHidePw");
const pwFieldsSignIn = document.querySelectorAll(".password");

/* Handle form login */
const loginEmailInput = document.getElementById("emailLogin");
const loginPassInput = document.getElementById("passwordLogin");
const loginForm = document.getElementById("btnLogin");
const cbRemember = document.getElementById("logCheck");

/* Handle error login form */ 
const emailErrLogin = document.getElementById("errEmailLogin");
const passErrLogin = document.getElementById("errPassLogin");

/* Handle remember account */
let isRemember = false; 

const errorCodeLogin = {
    emailError: "Email does not exist",
    passError: "Password does not exist"
};

function saveInfoLogin(email, password, isRemember) {
    let existingLogin = localStorage.getItem("infoLogin");

    let infoLogin = existingLogin ? JSON.parse(existingLogin) : {};

    infoLoginData.emailLogin = email;
    infoLoginData.passLogin = password;
    infoLoginData.isRemember = isRemember;
    infoLoginData.isLogin = true;

    infoLogin = infoLoginData;

    localStorage.setItem("infoLogin", JSON.stringify(infoLogin));

    console.log(infoLogin.emailLogin);
}

function handleFromLogin() {
    let isValidEmail = true;
    let isValidPass = true;

    let loginEmail = loginEmailInput.value.trim();
    let passLogin = loginPassInput.value.trim();

    let emailBuffer = [];
    let passBuffer = [];

    let existingData = localStorage.getItem("infoUser");
    let infoLogin = existingData ? JSON.parse(existingData) : [];

    infoLogin.map((e, index, infoLogin) =>{
        emailBuffer.push(infoLogin[index].email);
        passBuffer.push(infoLogin[index].password);
    });

    if (emailBuffer.indexOf(loginEmail) > -1) {
        isValidEmail = true;
        disableErrorMessage(loginEmailInput, emailErrLogin);
    } else {
        enableErrorMessage(loginEmailInput, emailErrLogin, errorCodeLogin.emailError); 
        isValidEmail = false;
    }

    if (passBuffer.indexOf(passLogin) > -1) {
        isValidPass = true;
        disableErrorMessage(loginPassInput, passErrLogin);
    } else {
        isValidPass = false;
        enableErrorMessage(loginPassInput, passErrLogin, errorCodeLogin.passError); 
    }

    if (isValidEmail && isValidPass) {
        saveInfoLogin(emailBuffer[emailBuffer.indexOf(loginEmail)], 
                      passBuffer[passBuffer.indexOf(passLogin)], 
                      isRemember);
    }

    return isValidEmail & isValidPass;
}

function handleRememberUser() {
    let existingLogin = localStorage.getItem("infoLogin");

    let infoLogin = existingLogin ? JSON.parse(existingLogin) : {};

    if (infoLogin.isRemember) {
        loginEmailInput.value = infoLogin.emailLogin;
        loginPassInput.value = infoLogin.passLogin;
    } else {
        loginEmailInput.value = "";
        loginPassInput.value = "";
    }
}

loginForm.addEventListener("click", function(e) {
    e.preventDefault();

    if (handleFromLogin()) {
        console.log("Login in success!");
        redirectPage("./todoPage.html");
    } else {
        console.log("Login in fail!");
    }
});

cbRemember.addEventListener("change", function(e) {
    e.preventDefault();

    if (cbRemember.checked) {
        console.log("checked");
        isRemember = true;
    } else {
        console.log("unchecked");
        isRemember = false;
    }
});

pwShowHide.forEach(eyeIcon =>{
    eyeIcon.addEventListener("click", () =>{
        pwFieldsSignIn.forEach(pwField =>{
            if (pwField.type === "password") {
                pwField.type = "text";

                pwShowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                });
            }  else {
                pwField.type = "password";

                pwShowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                });
            }
        });
    });
});

handleRememberUser();