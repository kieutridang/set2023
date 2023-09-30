const userNameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
console.log(userNameInput, passwordInput);

//B1: Redirect from Signup to Login:
// function redirectToSignin() {
//     location.href = "loginPage.html";
// }

const submitButton = document.getElementById("submit-button");

//B2: Verify User Data
submitButton.addEventListener('click', function () {

  let oldData = JSON.parse(localStorage.getItem('users')) || []
  const existedUser = oldData.some((user) => {
    return (user.userNameInput === userNameInput.value && user.passwordInput === passwordInput.value)
  });
  if (existedUser) {
    alert("Dang nhap thanh cong!");
  }
  else {
    alert("Tai khoan khong ton tai!");
  }

  localStorage.setItem('users', JSON.stringify(oldData));

// window.location.href = "login.html";
});

// if (verifyData) = true {
//   alert('Login succe')
// }


