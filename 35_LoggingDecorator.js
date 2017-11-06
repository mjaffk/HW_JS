'use strict';
/* By Ekaterina Khorina */

let log = [];
let user = {
    name: 'Name',
    work: function (a) {
        return a + ' ' + this.name;
    },
    toString: () => 'user'
};

user.work = makeLogging(user.work, log);

user.work(1);
user.work(2);
console.log(user.work(3, 4, 5));

readLog(log);


function readLog(log) {
    for (let i = 0; i < log.length; i++) {
        console.log('Лог: ' + log[i]);
    }
}


/**
 * Возвращает обертку вокруг функции,
 * которая при каждом вызове записывает аргументы в log
 * @param func {Function} оборачиваемая функция
 * @param log - массив лога
 * @return {function(...[*]=)}
 */
function makeLogging(func, log) {
    return function (...args) {
        log.push(args);
        console.log(this.toString() + '.' + func.name + '(' + args.join(', ') + ')');
        return func.apply(this, args);
    };
}