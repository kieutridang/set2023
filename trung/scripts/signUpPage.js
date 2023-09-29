import {infoUserData} from "./utils.js"
import {enableErrorMessage, disableErrorMessage, redirectPage} from "./utils.js"

const container = document.querySelector(".container");
const pwShowHide = document.querySelectorAll(".showHidePw");
const pwFieldsSignUp = document.querySelectorAll(".password");

const btnSignup = document.getElementById("btnSignup");

/* Handle form register */ 
let fullNameInput = document.getElementById("fullName");
let emailInput = document.getElementById("email");
let userNameInput = document.getElementById("userName");
let passwordInput = document.getElementById("password");
let phoneNumberInput = document.getElementById("phoneNumber");

/* Handle error form register */
const fullNameError = document.getElementById("errFullName");
const emailError = document.getElementById("errEmail");
const userNameError = document.getElementById("errUserName");
const phoneNumberError = document.getElementById("errPhone");
const passwordError = document.getElementById("errPassword");

const emailExistError = document.getElementById("errEmail");
const userNameExist = document.getElementById("errUserName");


const errorCode = {
    fullName: "Enter a valid full name",
    email: "Enter a valid email",
    userName: "Enter a valid user name",
    phone: "Enter a valid phone number",
    password: "Enter a valid password",
    emailExist: "Email already exists",
    userNameExist: "User name already exists"
};

function handleFullName() {
    const fullName = fullNameInput.value.trim();
    const fullNamePattern = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;

    if (!fullNamePattern.test(fullName)) {
        enableErrorMessage(fullNameInput, fullNameError, errorCode.fullName);
        return false;
    }
    disableErrorMessage(fullNameInput, fullNameError);

    return true;
}

function handleEmail() {
    const email = emailInput.value.trim();
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!emailPattern.test(email)) {
        enableErrorMessage(emailInput, emailError, errorCode.email);
        return false;
    } 
    disableErrorMessage(emailInput, emailError);

    return true;
}

function handleUserName() {
    const userName = userNameInput.value.trim();
    const userNamePattern = /^[a-zA-Z0-9]+$/;

    if (!userNamePattern.test(userName)) {
        enableErrorMessage(userNameInput, userNameError, errorCode.userName);
        return false;
    }
    disableErrorMessage(userNameInput, userNameError);

    return true;
}

function handlePhoneNumber() {
    const phoneNumber = phoneNumberInput.value.trim();
    const phonePattern =  /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

    if (!phonePattern.test(phoneNumber)) {
        enableErrorMessage(phoneNumberInput, phoneNumberError, errorCode.phone);
        return false;
    }
    disableErrorMessage(phoneNumberInput, phoneNumberError);

    return true;
}

function handlePassword() {
    const password = passwordInput.value.trim();
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    
    if (!passwordPattern.test(password)) {
        enableErrorMessage(passwordInput, passwordError, errorCode.password);
        return false;
    }
    disableErrorMessage(passwordInput, passwordError);

    return true;
}

function checkExistingEmail() {
    let isCheckEmail = true;

    let existEmail = JSON.parse(localStorage.getItem("infoUser"));

    let email = emailInput.value.trim();

    if (existEmail) {
        let emailData = existEmail.map((e, i, existEmail) =>{
            return existEmail[i].email;
        });
    
        for (let i = 0; i < emailData.length; i++) {
            if (email === existEmail[i].email) {
                enableErrorMessage(emailInput, emailExistError, errorCode.emailExist);
                isCheckEmail = false;
                break;
            } else {
                isCheckEmail = true;
            }
        }
    }

    return isCheckEmail;
}

function checkExistingUserName() {
    let isCheckUserName = true;
    
    let existUserName = JSON.parse(localStorage.getItem("infoUser"));

    let userName = userNameInput.value.trim();
    console.info("Enter user name", userName);

    if (existUserName) {
        let userNameData = existUserName.map((e, i, existUserName) =>{
            return existUserName[i].userName;
        });

        for (let i = 0; i < userNameData.length; i++) {
            console.log("Buffer length userNameData - ", userNameData.length);
            if (userName === existUserName[i].userName) {
                isCheckUserName = false;
                enableErrorMessage(userNameInput, userNameError, errorCode.userNameExist);
                break;
            } else {
                isCheckUserName = true;
            }
        }
    }

    return isCheckUserName;
}

function handleFormSigup() {
    let isValidForm = true;
    
    isValidForm =  handleFullName();
    isValidForm &= handleEmail();
    isValidForm &= handleUserName();
    isValidForm &= handlePhoneNumber();
    isValidForm &= handlePassword();

    isValidForm &= checkExistingEmail();
    isValidForm &= checkExistingUserName();

    return isValidForm;
}

function saveInfoUser() {
    let fullNameInput = document.getElementById("fullName");
    let emailInput = document.getElementById("email");
    let userNameInput = document.getElementById("userName");
    let passwordInput = document.getElementById("password");

    let existingData = localStorage.getItem("infoUser");

    let infoUser = existingData ? JSON.parse(existingData) : [];

    infoUserData.fullName = fullNameInput.value;
    infoUserData.email = emailInput.value;
    infoUserData.userName = userNameInput.value;
    infoUserData.password = passwordInput.value;

    infoUser.push(infoUserData);

    localStorage.setItem("infoUser", JSON.stringify(infoUser));
}

function removeErrorMessage() {
    disableErrorMessage(fullNameInput, fullNameError);
    disableErrorMessage(emailInput, emailError);
}

pwShowHide.forEach(eyeIcon =>{
    eyeIcon.addEventListener("click", () =>{
        pwFieldsSignUp.forEach(pwField =>{
            if (pwField.type === "password") {
                pwField.type = "text";

                pwShowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                });
            } else {
                pwField.type = "password";

                pwShowHide.forEach(icon =>{
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                });
            }
        });
    });
});

btnSignup.addEventListener("click", () =>{
    if (handleFormSigup()) {    
        removeErrorMessage();
        if (confirm("Register success!")) {
            saveInfoUser();
            redirectPage("./index.html");
        } 
    } else {
        console.log("Signup failed!");
    }
});
