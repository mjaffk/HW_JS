'use strict';

function foo () {
    console.log('FOO');
}

/**
 * декоратор, измерящий время РАБОТЫ функции
 * @param {Function} func
 * @return {Function}
 */
function timeDecorator (func) {
    return function (...args) {
        let timeStart = Date.now();
        let result = func.apply(this, args);
        console.log('Время выполнения функции ' + func.name + ': ' + (Date.now() - timeStart) + 'ms');
        return result;
    };
}


let timeLogFoo = timeDecorator(foo);

timeLogFoo();
