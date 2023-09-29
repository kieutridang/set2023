const fullname = document.getElementById("fullname_validate")
const email = document.getElementById("email_validate")
const username = document.getElementById("username_validate")
const phoneNumber = document.getElementById("phoneNumber_validate")
const password = document.getElementById("password_validate")
const btn = document.getElementById("button_validate")

btn.addEventListener('click', function () {
    let isValid = checkValidate();

    if (isValid) {
        alert('Đăng ký thành công!');
        var data = {
            fullname: fullname.value,
            username: username.value,
            email: email.value,
            password: password.value,
            phoneNumber: phoneNumber.value
        }

        localStorage.setItem('data', JSON.stringify(data));

        window.location.href = "login.html";
    }
});

const checkValidate = () => {
    let fullnameValue = fullname.value;
    let emailValue = email.value;
    let usernameValue = username.value;
    let phoneNumberValue = phoneNumber.value;
    let passwordValue = password.value;

    let isCheck = true;

    // fullname
    if (fullnameValue == '') {
        document.getElementById("checkFullname").innerHTML = "Họ tên không được để trống"
        isCheck = false;
    } else {
        //document.getElementById("checkFullname").innerHTML = ""
        //JSON.stringify(localStorage.setItem('fullname', fullnameValue))
    }

    // email
    if (emailValue == "") {
        document.getElementById("checkEmail").innerHTML = "Email không được để trống";
        isCheck = false;
    } else if (!isEmail(emailValue)){
        document.getElementById("checkEmail").innerHTML = "Email không hợp lệ";
        isCheck = false;
    } else {
        //JSON.stringify(localStorage.setItem('email', emailValue));
    }

    // phone number
    if (phoneNumberValue == "") {
        document.getElementById("checkPhoneNumber").innerHTML = "Số điện thoại không được để trống";
        isCheck = false;
    } else if (!isPhoneNumber(phoneNumberValue)){
        document.getElementById("checkPhoneNumber").innerHTML = "Số điện thoại không hợp lệ";
        isCheck = false;
    } else {
        //document.getElementById("checkFullname").innerHTML = ""
    }

    // username
    if (usernameValue == "") {
        document.getElementById("checkUsername").innerHTML = "Tên đăng nhập không được để trống";
        isCheck = false;
    } else {
        //JSON.stringify(localStorage.setItem('username', usernameValue))
    }

    //password
    if (passwordValue == "") {
        document.getElementById("checkPassword").innerHTML = "Mật khẩu không được để trống";
        isCheck = false;
    } else if (!isStrengPassword(passwordValue)){
        document.getElementById("checkPassword").innerHTML = "Mật khẩu không hợp lệ";
        isCheck = false;
    } else {
        //JSON.stringify(localStorage.setItem('password', passwordValue))
    }

    return isCheck;
}
const isEmail = (email) => { // Kiểm tra có @, .com không?
    return /^(.+)@(\S+)$/.test(email);
}

const isPhoneNumber = (phoneNumber) => { // Kiểm tra số Số điện thoại gồm 10 số nếu có nhập số 0 ở đầu tiên
    return /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/.test(phoneNumber);
}

const isStrengPassword = (password) => { // Kiểm tra có chứa số, ký tự đặc biệt và ít nhất 8 ký tự
    return /(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(.*[a-z]).{8}/.test(password);
};