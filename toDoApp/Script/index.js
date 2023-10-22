const welcome = document.getElementById("logonUser");
const logonUser = JSON.parse(localStorage.getItem("logonUser"));
const logout = document.getElementById("logout-button");
if (logonUser?.userNameInput) {
    welcome.innerHTML = `Welcome to my webpage, ${logonUser.fullNameInput}`;}
    else {
    alert("Please enter user info to sign in!")
    location.href = "loginPage.html";
};

logout.addEventListener('click', function () {
    localStorage.removeItem('logonUser');
    location.href = "loginPage.html";
});

