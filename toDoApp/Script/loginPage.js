const userNameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
console.log(userNameInput, passwordInput);
const welcome = document.getElementById("logonUser");
const logonUser = JSON.parse(localStorage.getItem("logonUser"));
if (logonUser?.userNameInput) {
    location.href = "index.html";
}

//B1: Redirect from Signup to Login:
// function redirectToSignin() {
//     location.href = "loginPage.html";
// }

const submitButton = document.getElementById("submit-button");

//B3: Verify User Data
submitButton.addEventListener('click', function () {

  let oldData = JSON.parse(localStorage.getItem('users')) || []
  const existedUser = oldData.find((user) => {
    return (user.userNameInput === userNameInput.value && user.passwordInput === passwordInput.value)
  });
  if (existedUser) {
    alert("Login successful!");
    localStorage.setItem('logonUser', JSON.stringify(existedUser));
    window.location.href = 'index.html';
  }
  else {
    alert("Account does not exist!");
  };

  localStorage.setItem('users', JSON.stringify(oldData));

// window.location.href = "login.html";
});

// }  
// B4: Save existed users info 
// submitButton.addEventListener('click', function () {
//   let currentData = JSON.parse(localStorage.getItem('users')) || []
//     const verifyUser = currentData.some((user) => {
//       return (user.userNameInput === userNameInput.value)
//   });
// if (newUser) {
//   localStorage.setItem('loginUsers', JSON.stringify(currentData))
  
// } else {
//   currentData.({"username": "userNameInput", "password": "passwordInput"})}
// });
// sessionStorage.setItem('loginUsers', JSON.stringify(currentData));

