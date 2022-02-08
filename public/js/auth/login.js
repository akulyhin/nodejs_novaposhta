const login_form = document.getElementById('login_form');
const success_message = document.getElementById('success_message');


const testHost = 'http://localhost:3031';
const workHost = 'https://ak-np.herokuapp.com';
const newServer = 'http://159.224.166.89';


// if (localStorage.getItem('token')) {
//     axios.get(`${workHost}/auth/auth`, {
//         headers: {
//             authorization: 'Bearer ' + localStorage.getItem('token')
//         }
//     })
//     .then(res => {
//         if (res.data.status === 'success') {
//             window.location.href = '/novaposhta';
//         }
//     })
//     .catch(err => {
//         console.log(err);
//     });
// }


let authRequest = '';

const email_input = document.getElementById('email_input');
const password_block = document.querySelector('.password-block');
const auth_message = document.querySelector('.auth-message');
const headH4 = document.querySelector('#login h4');

email_input.addEventListener('input', debounce((e) => {

    success_message.classList.remove('error');
    success_message.innerHTML = '';


axios.post(`/auth/getUser`, {
    "email": e.target.value
})
.then(res => {
    if (res.data.code === 200) {
        password_block.innerHTML = '';
        password_block.insertAdjacentHTML('afterbegin', `<div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon2"><i class="fas fa-unlock"></i></span>
        <input type="password" class="form-control" placeholder="password" name="password" aria-describedby="basic-addon2" required>
      </div><button class="btn btn-primary" type="submit">Войти</button>`);
      authRequest = 'login';
      auth_message.innerHTML = 'Ваш email есть в базе, введите пароль от своей учетной записи!';
      headH4.innerHTML = 'Авторизация';
    }

    else if (res.data.code === 404) {
        password_block.innerHTML = '';
        password_block.insertAdjacentHTML('afterbegin', `<div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon2"><i class="fas fa-unlock"></i></span>
        <input type="password" class="form-control" placeholder="password" name="password" aria-describedby="basic-addon2" required>
      </div><button class="btn btn-primary" type="submit">Регистрация</button>`);

      authRequest = 'register';
      auth_message.style.color = 'green';
      auth_message.innerHTML = 'Вашего email нет базе, мы Вас зарегистрируем, придумайте пароль!';
      headH4.innerHTML = 'Регистрация';
    }
    else {
        password_block.innerHTML = '';
        auth_message.innerHTML = 'Для авторизации или регистрации введите свой email';
        headH4.innerHTML = 'Авторизация';
    }
})
.catch(err => {
    console.log(err);
})

}, 200))

login_form.addEventListener('submit', function(e) {
    e.preventDefault();

    const {email, password} = this.elements;

    axios.post(`${workHost}/auth/${authRequest}`, {
        email: email.value,
         password: password.value       
    })
    .then(res => {
        if (res.data.user.token) {
            localStorage.setItem('token', res.data.user.token);
            window.location.href = '/novaposhta';
        }
    })
    .catch(err => {
        if (err.response.status === 401) {
            success_message.classList.add('error');
            success_message.innerHTML = 'Неверный пароль, повторите попытку!';
        }
    })
})
