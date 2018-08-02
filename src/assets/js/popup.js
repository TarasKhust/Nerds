let link = document.querySelector('.button__feedback');
let popup = document.querySelector('.modal');
let close = document.querySelector('.modal__close');
let login = popup.querySelector('[name=username]');
let form = popup.querySelector('form');
let email = popup.querySelector('[name=email]');
let text = popup.querySelector('[name=text]');
let storage = localStorage.getItem('login');
let storageEmail = localStorage.getItem('email');

link.addEventListener('click', function (evt) {
    evt.preventDefault();
    popup.classList.add('modal-show');

    if (storage) {
        login.value = storage;
        email.value = storageEmail;
        text.focus();
    } else {
        login.focus();
    }

});

close.addEventListener('click', function (evt) {
    evt.preventDefault();
    popup.classList.remove('modal-show');
    popup.classList.remove('modal-error');

});

form.addEventListener('submit', function (evt) {
    if (!login.value || !email.value) {
        evt.preventDefault();
        popup.classList.remove("modal-error");
        popup.classList.add("modal-error");
    } else {
        localStorage.setItem('login', login.value);
        localStorage.setItem('email', email.value);
    }
});

window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
        if (popup.classList.contains("modal-show")) {
            popup.classList.remove("modal-show");
            popup.classList.remove('modal-error');
        }
    }

});
