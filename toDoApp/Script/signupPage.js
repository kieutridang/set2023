const fullNameInput = document.getElementById('fullname');
const userNameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('passwordConfirm');
const emailInput = document.getElementById('email');
console.log(fullNameInput, userNameInput, passwordInput, passwordConfirmInput, emailInput);

//B1: Redirect from Signup to Login:
function redirectToSignin() {
    location.href = "loginPage.html";
}

const submitButton = document.getElementById("submit-button");

//B2: Verify User Data
submitButton.addEventListener('click', function () {
    let verifyData = {
        fullNameInput: fullname.value,
        userNameInput: username.value,
        emailInput: email.value,
        passwordInput: password.value,
        passwordConfirmInput: passwordConfirmInput.value
    }
    let oldData = JSON.parse(localStorage.getItem('users')) || []
    oldData.push(verifyData);
    localStorage.setItem('users', JSON.stringify(oldData));

    // window.location.href = "login.html";
});

