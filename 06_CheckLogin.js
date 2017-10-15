'use strict';
var login = prompt('Кто вы?', '');
if ((login === null)||(login === '')) {
    alert('Вход отменен');

} else if (login !== 'Админ') {
    alert('Я вас не знаю')

} else {
    var pass = prompt('Пароль?', '');

    if ((pass === null)||(pass === '')) {
        alert('Вход отменен');

    } else if (pass !== 'Чёрный Властелин') {
        alert('Пароль не верен')

    } else {
        alert('Добро пожаловать!')
    }
}