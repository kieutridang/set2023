const button_back = document.getElementById('button_back')
const button_start = document.getElementById('button_start')
const button_time = document.getElementById('button_time')
const button_color = document.getElementById('button_color')
const button_i = document.getElementById('button_i')


// Add feature for button Back to Login
button_back.addEventListener('click', function () {
    if (button_back) {
        window.location.href = "../pages/login.html";
    }
});


// Add feature for button Start
button_start.addEventListener('click', function () {
    if (button_start) {
        window.location.href = "../pages/board.html";
    }
});


// Add feature for button Color


// Add feature for button Time
let isChecked = false;

button_time.addEventListener('click', () => {
    if(isChecked === false) {
        document.getElementById("index_time").innerHTML = 'Time: 30min';
        isChecked = !isChecked;
    } else {
        document.getElementById("index_time").innerHTML = 'Time: 15min';
        isChecked = !isChecked;
    }
})

// Add feature for button i

