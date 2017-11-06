'use strict';
/* By Ekaterina Khorina */

"use strict";

function ask(question, answer, ok, fail) {
    let result = prompt(question, '');
    if (result.toLowerCase() === answer.toLowerCase()) ok();
    else fail();
}

let user = {
    login: 'Василий',
    password: '12345',

    loginDone: function(result) {
        alert( this.login + (result ? ' вошёл в сайт' : ' ошибка входа') );
    },

    checkPassword: function() {
        ask("Ваш пароль?", this.password, this.loginDone.bind(this, true),this.loginDone.bind(this, false));
        // второе решение
        // let self = this;
        // ask("Ваш пароль?", this.password, () => self.loginDone(true), () => self.loginDone(false));
    }
};

let vasya = user;
user = null;
vasya.checkPassword();