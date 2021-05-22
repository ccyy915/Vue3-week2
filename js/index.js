// api
const apiUrl = "https://vue3-course-api.hexschool.io";
// login
const userName = document.querySelector('#username');
const userPassword = document.querySelector('#password');
const loginError = document.querySelector('#errorText');
const loginSubmit = document.querySelector('#login-submit');


function login(e) {
    e.preventDefault();
    let userNameVal = userName.value;
    let userPwVal = userPassword.value;
    const user = {
        "username": userNameVal,
        "password": userPwVal
    }
    if (userNameVal === "") {
        errorText(loginError, "Please fill up your name");
    } else if (userPwVal === "") {
        errorText(loginError, "Please fill up your password");
    } else {
        errorText(loginError, "");
        axios.post(`${apiUrl}/admin/signin`, user)
            .then(res => {
                if (!res.data.success) {
                    errorText(loginError, res.data.message);
                    return;
                } else {
                    alert(res.data.message);
                    const { token, expired } = res.data;
                    document.cookie = `hexToken=${token}, expires=${expired}`;
                    window.location.href = "https://ccyy915.github.io/Vue3-week2/dashboard.html";
                }
            }).catch(error => {
                console.error(error);
            })
    }
}

function errorText(target, text) {
    target.textContent = `${text}`;
}


loginSubmit.addEventListener('click', login)