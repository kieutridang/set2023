const fullNameInput = document.getElementById('fullname');
const userNameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('passwordConfirm');
const emailInput = document.getElementById('email');
console.log(fullNameInput, userNameInput, passwordInput, passwordConfirmInput, emailInput);
const logonUser = JSON.parse(localStorage.getItem("logonUser"));
if (logonUser?.userNameInput) {
    location.href = "index.html";
}

//B1: Redirect from Signup to Login:
function redirectToSignin() {
    location.href = "loginPage.html";
}

const submitButton = document.getElementById("submit-button");

//B2: Verify User Data
submitButton.addEventListener('click', function () {
    let userInfo = {
        fullNameInput: fullname.value,
        userNameInput: username.value,
        emailInput: email.value,
        passwordInput: password.value,
        passwordConfirmInput: passwordConfirmInput.value
    };
    let currentData = JSON.parse(localStorage.getItem('users')) || []

    localStorage.setItem('users', JSON.stringify(currentData));
    if (userInfo.userNameInput == username.value || userInfo.emailInput == email.value) {
        alert('Account already exists');
    } else {
        currentData.push(userInfo)}
        localStorage.setItem('users', JSON.stringify(currentData));
        window.location.href = "login.html";
    

    // window.location.href = "login.html";
});

