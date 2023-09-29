import {infoUserData, infoLoginData} from "./utils.js"
import {enableErrorMessage, disableErrorMessage, redirectPage} from "./utils.js"

const userName = document.getElementById("name");
const btnLogout = document.getElementById("btnLogout");

/*Handle task*/ 
const tasksDiv = document.getElementById("lstTasks");

function renderTask() {
    tasksDiv.innerHTML = "";
    
    
}


function processRedirect() {
    let existingLogin = localStorage.getItem("infoLogin");
    let infoLogin = existingLogin ? JSON.parse(existingLogin) : {};

    if (!infoLogin.isLogin) {
        redirectPage("./index.html");
    }
}

function getInfoUser() {
    let existingLogin = localStorage.getItem("infoLogin");

    let infoLogin = existingLogin ? JSON.parse(existingLogin) : {};
    console.log("infoLogin", infoLogin.emailLogin);

    /* Get user name from email login */
    let existingData = localStorage.getItem("infoUser");

    let infoUser = existingData ? JSON.parse(existingData) : [];

    let emailBuffer = [];

    infoUser.map((e, index, infoUser) =>{
        emailBuffer.push(infoUser[index].email);
    });

    let indexFound = emailBuffer.indexOf(infoLogin.emailLogin);

    if (indexFound > -1) {
        userName.textContent = `Hello, ${infoUser[indexFound].userName}`;
    } else {
        userName.textContent = "";
    }
}

btnLogout.addEventListener("click", function(e){
    e.preventDefault();

    localStorage.removeItem("infoLogin");
    redirectPage("./index.html");
});

processRedirect();
getInfoUser();