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
submitButton.addEventListener('click',function (event) 
{
    event.preventDefault();
    console.log('Haha');
    redirectToSignin();
});

//B2: Verify User Data
submitButton.addEventListener('click', function () {
    let isValid = checkValidate();

    if (isValid); 
    let verifyData = {
    fullNameInput: fullname.value,
    userNameInput: username.value,
    emailInput: email.value,
    passwordInput: password.value,
    passwordConfirmInput: passwordConfirmInput.value
}
    localStorage.setItem('data', JSON.stringify(verifyData));

        window.location.href = "login.html";
})
