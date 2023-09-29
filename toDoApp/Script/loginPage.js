function saveUsername(username) {
    localStorage.setItem('validUsername', username.value);
    input.innerHTLM = localStorage.getItem("validUsername");
};
let usernameInput = document.querySelector('input[type="text"]')
usernameInput.onchange = function(validUsername) {
  console.log(username.target.value);
}
